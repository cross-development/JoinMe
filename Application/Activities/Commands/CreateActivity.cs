using AutoMapper;
using MediatR;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using Domain;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler(ApplicationDbContext dbContext, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();

            var activity = mapper.Map<Activity>(request.ActivityDto);

            dbContext.Activities.Add(activity);

            var attendee = new ActivityAttendee
            {
                UserId = user.Id,
                ActivityId = activity.Id,
                IsHost = true
            };

            activity.Attendees.Add(attendee);

            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;

            return !result
                ? Result<string>.Failure("Failed to create the activity", 400)
                : Result<string>.Success(activity.Id);
        }
    }
}