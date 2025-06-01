namespace Application.Profiles.DTOs;

public class UserProfileDto
{
    public required string Id { get; set; }
    public required string DisplayName { get; set; }
    public required string Bio { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsFollowing { get; set; }
    public int FollowersCount { get; set; }
    public int FollowingCount { get; set; }
}