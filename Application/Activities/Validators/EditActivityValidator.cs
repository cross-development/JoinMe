using FluentValidation;
using Application.Activities.Commands;
using Application.Activities.DTOs;

namespace Application.Activities.Validators;

public class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDto>
{
    public EditActivityValidator() : base(command => command.ActivityDto)
    {
        RuleFor(command => command.ActivityDto.Id)
            .NotEmpty()
            .WithMessage("Id is required");
    }
}