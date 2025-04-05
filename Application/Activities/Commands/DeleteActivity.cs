using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest<Unit>
    {
        public required string Id { get; set; }
    }

    public class Handler(ApplicationDbContext dbContext) : IRequestHandler<Command, Unit>
    {
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.Id], cancellationToken) ??
                           throw new Exception("Cannot find activity");

            dbContext.Remove(activity);

            await dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}