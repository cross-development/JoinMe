﻿using AutoMapper;
using MediatR;
using Application.Activities.DTOs;
using Application.Core;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler(ApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.ActivityDto.Id], cancellationToken);

            if (activity is null)
            {
                return Result<Unit>.Failure("Activity not found", 404);
            }

            mapper.Map(request.ActivityDto, activity);

            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;

            return !result
                ? Result<Unit>.Failure("Failed to update the activity", 400)
                : Result<Unit>.Success(Unit.Value);
        }
    }
}