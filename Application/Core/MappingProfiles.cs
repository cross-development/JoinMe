using AutoMapper;
using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        string? currentUserId = null;

        CreateMap<Activity, Activity>();

        CreateMap<CreateActivityDto, Activity>();

        CreateMap<EditActivityDto, Activity>();

        CreateMap<Activity, UserActivityDto>();

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
                configExpression.MapFrom(activityAttendee => activityAttendee.User.Id))
            .ForMember(userProfileDto => userProfileDto.FollowersCount, configExpression =>
                configExpression.MapFrom(activityAttendee => activityAttendee.User.Followers.Count))
            .ForMember(userProfileDto => userProfileDto.FollowingCount, configExpression =>
                configExpression.MapFrom(activityAttendee => activityAttendee.User.Followings.Count))
            .ForMember(userProfileDto => userProfileDto.IsFollowing, configExpression =>
                configExpression.MapFrom(activityAttendee => activityAttendee.User.Followers.Any(userFollowing =>
                    userFollowing.ObserverId == currentUserId)));

        CreateMap<User, UserProfileDto>()
            .ForMember(user => user.FollowersCount, configExpression =>
                configExpression.MapFrom(user => user.Followers.Count))
            .ForMember(user => user.FollowingCount, configExpression =>
                configExpression.MapFrom(user => user.Followings.Count))
            .ForMember(user => user.IsFollowing, configExpression =>
                configExpression.MapFrom(user => user.Followers.Any(userFollowing => userFollowing.ObserverId == currentUserId)));

        CreateMap<Comment, CommentDto>()
            .ForMember(commentDto => commentDto.UserId, configExpression =>
                configExpression.MapFrom(comment => comment.User.Id))
            .ForMember(commentDto => commentDto.DisplayName, configExpression =>
                configExpression.MapFrom(comment => comment.User.DisplayName))
            .ForMember(commentDto => commentDto.ImageUrl, configExpression =>
                configExpression.MapFrom(comment => comment.User.ImageUrl));
    }
}