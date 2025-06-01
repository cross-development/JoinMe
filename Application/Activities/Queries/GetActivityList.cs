using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using MediatR;
using Application.Activities.DTOs;
using Application.Interfaces;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<List<ActivityDto>> { }

    public class Handler(ApplicationDbContext dbContext, IUserAccessor userAccessor, IMapper mapper)
        : IRequestHandler<Query, List<ActivityDto>>
    {
        public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await dbContext.Activities
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider,
                    new { currentUderId = userAccessor.GetUserId() })
                .ToListAsync(cancellationToken);
        }
    }
}