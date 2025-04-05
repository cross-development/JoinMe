using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        return await Mediator.Send(new GetActivityDetails.Query { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(Activity activity)
    {
        return await Mediator.Send(new CreateActivity.Command { Activity = activity });
    }

    [HttpPut]
    public async Task<ActionResult<Unit>> EditActivity(Activity activity)
    {
        return await Mediator.Send(new EditActivity.Command { Activity = activity });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Unit>> DeleteActivity(string id)
    {
        return await Mediator.Send(new DeleteActivity.Command { Id = id });
    }
}