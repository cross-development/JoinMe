using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using MediatR;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using Persistence;

namespace Application.Profiles.Queries;

public class GetProfile
{
    public class Query : IRequest<Result<UserProfileDto>>
    {
        public required string UserId { get; set; }
    }

    public class Handler(ApplicationDbContext dbContext, IUserAccessor userAccessor, IMapper mapper)
        : IRequestHandler<Query, Result<UserProfileDto>>
    {
        public async Task<Result<UserProfileDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profile = await dbContext.Users
                .ProjectTo<UserProfileDto>(mapper.ConfigurationProvider,
                    new { currentUderId = userAccessor.GetUserId() })
                .FirstOrDefaultAsync(user => user.Id == request.UserId, cancellationToken);

            return profile is not null
                ? Result<UserProfileDto>.Success(profile)
                : Result<UserProfileDto>.Failure("Profile not found", 404);
        }
    }
}