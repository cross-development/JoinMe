using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;

namespace API.Controllers;

public class ActivitiesController(ApplicationDbContext dbContext) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await dbContext.Activities.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        var activity = await dbContext.Activities.FindAsync(id);

        if (activity is null)
        {
            return NotFound();
        }

        return Ok(activity);
    }
}