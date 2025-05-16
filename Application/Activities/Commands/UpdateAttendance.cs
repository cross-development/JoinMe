using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Core;
using Application.Interfaces;
using Domain;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateAttendance
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, ApplicationDbContext dbContext)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities
                .Include(activity => activity.Attendees)
                .ThenInclude(activityAttendee => activityAttendee.User)
                .FirstOrDefaultAsync(activity => activity.Id == request.Id, cancellationToken);

            if (activity is null)
            {
                return Result<Unit>.Failure("Activity not found", 404);
            }

            var user = await userAccessor.GetUserAsync();

            var attendance = activity.Attendees.FirstOrDefault(attendee => attendee.UserId == user.Id);

            var isHost = activity.Attendees.Any(attendee => attendee.UserId == user.Id && attendee.IsHost);

            if (attendance is not null && isHost)
            {
                activity.IsCanceled = !activity.IsCanceled;
            }
            else if (attendance is not null)
            {
                activity.Attendees.Remove(attendance);
            }
            else
            {
                activity.Attendees.Add(new ActivityAttendee
                {
                    UserId = user.Id,
                    Activity = activity,
                    IsHost = false,
                });
            }

            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;

            return !result
                ? Result<Unit>.Failure("Failed to update attendance", 400)
                : Result<Unit>.Success(Unit.Value);
        }
    }
}