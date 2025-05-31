using FluentValidation;
using Application.Profiles.Commands;

namespace Application.Profiles.Validators;

public class EditProfileValidator : AbstractValidator<EditProfile.Command>
{
    public EditProfileValidator()
    {
        RuleFor(profile => profile.DisplayName).NotEmpty();
    }
}