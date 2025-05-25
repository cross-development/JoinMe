using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Core;
using Domain;
using Persistence;

namespace Application.Profiles.Queries;

public class GetProfilePhotos
{
    public class Query : IRequest<Result<List<Photo>>>
    {
        public required string UserId { get; set; }
    }

    public class Handler(ApplicationDbContext dbContext) : IRequestHandler<Query, Result<List<Photo>>>
    {
        public async Task<Result<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var photos = await dbContext.Users
                .Where(user => user.Id == request.UserId)
                .SelectMany(user => user.Photos)
                .ToListAsync(cancellationToken);

            return Result<List<Photo>>.Success(photos);
        }
    }
}