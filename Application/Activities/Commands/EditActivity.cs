using AutoMapper;
using MediatR;
using Domain;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Unit>
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(ApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<Command, Unit>
    {
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.Activity.Id], cancellationToken)
                           ?? throw new Exception("Activity not found");

            mapper.Map(request.Activity, activity);

            await dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}