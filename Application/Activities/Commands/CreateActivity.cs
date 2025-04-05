using MediatR;
using Domain;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<string>
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(ApplicationDbContext dbContext) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            dbContext.Activities.Add(request.Activity);

            await dbContext.SaveChangesAsync(cancellationToken);

            return request.Activity.Id;
        }
    }
}