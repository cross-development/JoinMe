using AutoMapper;
using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
        CreateMap<CreateActivityDto, Activity>();
        CreateMap<EditActivityDto, Activity>();

        CreateMap<Activity, ActivityDto>()
            .ForMember(activityDto => activityDto.HostDisplayName, configExpression =>
                configExpression.MapFrom(activity => activity.Attendees.FirstOrDefault(attendee =>
                    attendee.IsHost)!.User.DisplayName))
            .ForMember(activityDto => activityDto.HostId, configExpression =>
                configExpression.MapFrom(activity => activity.Attendees.FirstOrDefault(attendee =>
                    attendee.IsHost)!.User.Id));

        CreateMap<ActivityAttendee, UserProfileDto>()
            .ForMember(userProfileDto => userProfileDto.DisplayName, configExpression =>
                configExpression.MapFrom(activityAttendee => activityAttendee.User.DisplayName))
            .ForMember(userProfileDto => userProfileDto.Bio, configExpression =>
                configExpression.MapFrom(activityAttendee => activityAttendee.User.Bio))
            .ForMember(userProfileDto => userProfileDto.ImageUrl, configExpression =>
                configExpression.MapFrom(activityAttendee => activityAttendee.User.ImageUrl))
            .ForMember(userProfileDto => userProfileDto.Id, configExpression =>
                configExpression.MapFrom(activityAttendee => activityAttendee.User.Id));

        CreateMap<User, UserProfileDto>();
    }
}