using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Application.Interfaces;
using Domain;
using Persistence;

namespace Infrastructure.Security;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, ApplicationDbContext dbContext)
    : IUserAccessor
{
    public string GetUserId()
    {
        return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
               ?? throw new InvalidOperationException("No user found");
    }

    public async Task<User> GetUserAsync()
    {
        return await dbContext.Users.FindAsync(GetUserId()) ??
               throw new UnauthorizedAccessException("No user is logged in");
    }

    public async Task<User> GetUserWithPhotosAsync()
    {
        var userId = GetUserId();

        return await dbContext.Users
                   .Include(user => user.Photos)
                   .FirstOrDefaultAsync(user => user.Id == userId) ??
               throw new UnauthorizedAccessException("No user is logged in");
    }
}
