﻿using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using MediatR;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<ActivityDto>>
    {
        public required string Id { get; set; }
    }

    public class Handler(ApplicationDbContext dbContext, IUserAccessor userAccessor, IMapper mapper)
        : IRequestHandler<Query, Result<ActivityDto>>
    {
        public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider,
                    new { currentUderId = userAccessor.GetUserId() })
                .FirstOrDefaultAsync(activity => activity.Id == request.Id, cancellationToken);

            return activity is not null
                ? Result<ActivityDto>.Success(activity)
                : Result<ActivityDto>.Failure("Activity not found", 404);
        }
    }
}
