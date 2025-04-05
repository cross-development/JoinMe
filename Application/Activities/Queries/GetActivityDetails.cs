using MediatR;
using Domain;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Activity>
    {
        public required string Id { get; set; }
    }

    public class Handler(ApplicationDbContext dbContext) : IRequestHandler<Query, Activity>
    {
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.Id], cancellationToken)
                           ?? throw new Exception("Activity not found");

            return activity;
        }
    }
}
