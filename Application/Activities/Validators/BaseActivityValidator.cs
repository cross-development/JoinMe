using FluentValidation;
using Application.Activities.DTOs;

namespace Application.Activities.Validators;

public class BaseActivityValidator<T, TDto> : AbstractValidator<T> where TDto : BaseActivityDto
{
    public BaseActivityValidator(Func<T, TDto> selector)
    {
        RuleFor(command => selector(command).Title)
            .NotEmpty()
            .WithMessage("Title is required")
            .MaximumLength(100)
            .WithMessage("Title must not exceed 100 characters");

        RuleFor(command => selector(command).Description)
            .NotEmpty()
            .WithMessage("Description is required")
            .MaximumLength(255)
            .WithMessage("Title must not exceed 255 characters");

        RuleFor(command => selector(command).Date)
            .GreaterThan(DateTime.UtcNow)
            .WithMessage("Date must be in the future");

        RuleFor(command => selector(command).Category)
            .NotEmpty()
            .WithMessage("Category is required");

        RuleFor(command => selector(command).Country)
            .NotEmpty()
            .WithMessage("Country is required");

        RuleFor(command => selector(command).City)
            .NotEmpty()
            .WithMessage("City is required");

        RuleFor(command => selector(command).Venue)
            .NotEmpty()
            .WithMessage("Venue is required");

        RuleFor(command => selector(command).Latitude)
            .NotEmpty()
            .WithMessage("Latitude is required")
            .InclusiveBetween(-90, 90)
            .WithMessage("Latitude must be between -90 and 90");

        RuleFor(command => selector(command).Longitude)
            .NotEmpty()
            .WithMessage("Longitude is required")
            .InclusiveBetween(-180, 180)
            .WithMessage("Longitude must be between -180 and 180");
    }
}