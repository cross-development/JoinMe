using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using MediatR;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using Persistence;

namespace Application.Profiles.Queries;

public class GetFollowings
{
    public class Query : IRequest<Result<List<UserProfileDto>>>
    {
        public required string Predicate { get; set; } = "followers";
        public required string UserId { get; set; }
    }

    public class Handler(ApplicationDbContext dbContext, IUserAccessor userAccessor, IMapper mapper)
        : IRequestHandler<Query, Result<List<UserProfileDto>>>
    {
        public async Task<Result<List<UserProfileDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profiles = new List<UserProfileDto>();

            switch (request.Predicate)
            {
                case "followers":
                    profiles = await dbContext.UserFollowings
                        .Where(f => f.TargetId == request.UserId)
                        .Select(f => f.Observer)
                        .ProjectTo<UserProfileDto>(mapper.ConfigurationProvider,
                            new { currentUderId = userAccessor.GetUserId() })
                        .ToListAsync(cancellationToken);

                    break;

                case "following":
                    profiles = await dbContext.UserFollowings
                        .Where(f => f.ObserverId == request.UserId)
                        .Select(f => f.Target)
                        .ProjectTo<UserProfileDto>(mapper.ConfigurationProvider,
                            new { currentUderId = userAccessor.GetUserId() })
                        .ToListAsync(cancellationToken);

                    break;
            }

            return Result<List<UserProfileDto>>.Success(profiles);
        }
    }
}