using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MediatR;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using Domain;
using Persistence;

namespace Application.Activities.Commands;

public class AddComment
{
    public class Command : IRequest<Result<CommentDto>>
    {
        public required string Body { get; set; }
        public required string ActivityId { get; set; }
    }

    public class Handler(ApplicationDbContext dbContext, IUserAccessor userAccessor, IMapper mapper)
        : IRequestHandler<Command, Result<CommentDto>>
    {
        public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities
                .Include(activity => activity.Comments)
                .ThenInclude(activity => activity.User)
                .FirstOrDefaultAsync(activity => activity.Id == request.ActivityId, cancellationToken);

            if (activity is null)
            {
                return Result<CommentDto>.Failure("Could not find activity", 404);
            }

            var user = await userAccessor.GetUserAsync();

            var comment = new Comment
            {
                UserId = user.Id,
                ActivityId = activity.Id,
                Body = request.Body,
            };

            activity.Comments.Add(comment);

            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;

            return result ?
                Result<CommentDto>.Success(mapper.Map<CommentDto>(comment)) :
                Result<CommentDto>.Failure("Failed to add comment", 400);
        }
    }
}