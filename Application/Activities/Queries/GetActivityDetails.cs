using MediatR;
using Application.Core;
using Domain;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<Activity>>
    {
        public required string Id { get; set; }
    }

    public class Handler(ApplicationDbContext dbContext) : IRequestHandler<Query, Result<Activity>>
    {
        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.Id], cancellationToken);

            return activity == null
                ? Result<Activity>.Failure("Activity not found", 404)
                : Result<Activity>.Success(activity);
        }
    }
}
