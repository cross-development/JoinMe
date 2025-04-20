using Application.Activities.Commands;
using Application.Activities.Dtos;

namespace Application.Activities.Validators;

public class CreateActivityValidator
    : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
{
    public CreateActivityValidator() : base(command => command.ActivityDto)
    {

    }
}