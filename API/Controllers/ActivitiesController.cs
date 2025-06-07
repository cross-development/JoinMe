using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Activities.Commands;
using Application.Activities.Queries;
using Application.Activities.DTOs;
using Application.Core;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<PagedList<ActivityDto, DateTime?>>> GetActivities([FromQuery] ActivityParams activityParams)
    {
        var result = await Mediator.Send(new GetActivityList.Query { Params = activityParams });

        return HandleResult(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDto>> GetActivityDetail(string id)
    {
        var result = await Mediator.Send(new GetActivityDetails.Query { Id = id });

        return HandleResult(result);
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
    {
        var result = await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto });

        return HandleResult(result);
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult> EditActivity(EditActivityDto activityDto)
    {
        var result = await Mediator.Send(new EditActivity.Command { ActivityDto = activityDto });

        return HandleResult(result);
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        var result = await Mediator.Send(new DeleteActivity.Command { Id = id });

        return HandleResult(result);
    }

    [HttpPost("{id}/attend")]
    public async Task<ActionResult> Attend(string id)
    {
        var result = await Mediator.Send(new UpdateAttendance.Command { Id = id });

        return HandleResult(result);
    }
}