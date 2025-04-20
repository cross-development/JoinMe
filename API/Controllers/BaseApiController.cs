using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Core;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    private IMediator? _mediator;

    protected IMediator Mediator => _mediator
        ??= HttpContext.RequestServices.GetService<IMediator>()
            ?? throw new InvalidOperationException("IMediator service is unavailable");

    protected ActionResult HandleResult<T>(Result<T> result)
    {
        return result switch
        {
            { IsSuccess: false, Code: StatusCodes.Status404NotFound } => NotFound(),
            { IsSuccess: true, Value: not null } => Ok(result.Value),
            _ => BadRequest(result.Error)
        };
    }
}
