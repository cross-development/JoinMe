using Microsoft.EntityFrameworkCore;
using MediatR;
using AutoMapper;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper.QueryableExtensions;
using Persistence;

namespace Application.Activities.Queries;

public class GetCommentList
{
    public class Query : IRequest<Result<List<CommentDto>>>
    {
        public required string ActivityId { get; set; }
    }

    public class Handler(ApplicationDbContext dbContext, IMapper mapper) : IRequestHandler<Query, Result<List<CommentDto>>>
    {
        public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var comments = await dbContext.Comments
                .Where(comment => comment.ActivityId == request.ActivityId)
                .OrderByDescending(comment => comment.CreatedAt)
                .ProjectTo<CommentDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Result<List<CommentDto>>.Success(comments);
        }
    }
}