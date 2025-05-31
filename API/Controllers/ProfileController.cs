using Microsoft.AspNetCore.Mvc;
using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Domain;

namespace API.Controllers;

public class ProfileController : BaseApiController
{
    [HttpPost("add-photo")]
    public async Task<ActionResult<Photo>> AddPhoto([FromForm] IFormFile file)
    {
        var result = await Mediator.Send(new AddPhoto.Command { File = file });

        return HandleResult(result);
    }

    [HttpGet("{userId}/photos")]
    public async Task<ActionResult<List<Photo>>> GetPhotosForUser(string userId)
    {
        var result = await Mediator.Send(new GetProfilePhotos.Query { UserId = userId });

        return HandleResult(result);
    }

    [HttpDelete("{photoId}/photos")]
    public async Task<ActionResult> DeletePhoto(string photoId)
    {
        var result = await Mediator.Send(new DeletePhoto.Command { PhotoId = photoId });

        return HandleResult(result);
    }

    [HttpPut("{photoId}/set-main-photo")]
    public async Task<ActionResult> SetMainPhoto(string photoId)
    {
        var result = await Mediator.Send(new SetMainPhoto.Command { PhotoId = photoId });

        return HandleResult(result);
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfileDto>> GetProfile(string userId)
    {
        var result = await Mediator.Send(new GetProfile.Query { UserId = userId });

        return HandleResult(result);
    }


    [HttpPut]
    public async Task<ActionResult<UserProfileDto>> UpdateProfile(EditProfile.Command command)
    {
        var result = await Mediator.Send(command);

        return HandleResult(result);
    }
}
