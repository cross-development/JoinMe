﻿using Microsoft.EntityFrameworkCore;
using MediatR;
using Domain;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<List<Activity>> { }

    public class Handler(ApplicationDbContext dbContext) : IRequestHandler<Query, List<Activity>>
    {
        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await dbContext.Activities.ToListAsync(cancellationToken);
        }
    }
}