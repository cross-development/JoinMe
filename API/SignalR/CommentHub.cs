using Microsoft.AspNetCore.SignalR;
using MediatR;
using Application.Activities.Commands;
using Application.Activities.Queries;

namespace API.SignalR;

public class CommentHub(IMediator mediator) : Hub
{
    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var activityId = httpContext?.Request.Query["activityId"];

        if (string.IsNullOrEmpty(activityId))
        {
            throw new HubException("No activity with this id");
        }

        await Groups.AddToGroupAsync(Context.ConnectionId, activityId!);

        var result = await mediator.Send(new GetCommentList.Query { ActivityId = activityId! });

        await Clients.Caller.SendAsync("LoadComments", result.Value);
    }

    public async Task SendComment(AddComment.Command command)
    {
        var comment = await mediator.Send(command);

        await Clients.Group(command.ActivityId).SendAsync("ReceiveComment", comment);
    }
}