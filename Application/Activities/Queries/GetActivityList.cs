using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using MediatR;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<Result<PagedList<ActivityDto, DateTime?>>>
    {
        public required ActivityParams Params { get; set; }
    }

    public class Handler(ApplicationDbContext dbContext, IUserAccessor userAccessor, IMapper mapper)
        : IRequestHandler<Query, Result<PagedList<ActivityDto, DateTime?>>>
    {
        public async Task<Result<PagedList<ActivityDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = dbContext.Activities
                .OrderBy(activity => activity.Date)
                .Where(activity => activity.Date >= (request.Params.Cursor ?? request.Params.StartDate))
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.Params.Filter))
            {
                query = request.Params.Filter switch
                {
                    "isGoing" => query.Where(activity => activity.Attendees
                        .Any(attendee => attendee.UserId == userAccessor.GetUserId())),
                    "isHost" => query.Where(activity => activity.Attendees
                        .Any(attendee => attendee.IsHost && attendee.UserId == userAccessor.GetUserId())),
                    _ => query
                };
            }

            var projectedActivities = query.ProjectTo<ActivityDto>(mapper.ConfigurationProvider,
                new { currentUderId = userAccessor.GetUserId() });

            var activities = await projectedActivities
                .Take(request.Params.PageSize + 1)
                .ToListAsync(cancellationToken);

            DateTime? nextCursor = null;

            if (activities.Count > request.Params.PageSize)
            {
                nextCursor = activities.Last().Date;
                activities.RemoveAt(activities.Count - 1); // Remove the last item to fit the page size
            }

            var result = new PagedList<ActivityDto, DateTime?>
            {
                Items = activities,
                NextCursor = nextCursor
            };

            return Result<PagedList<ActivityDto, DateTime?>>.Success(result);
        }
    }
}