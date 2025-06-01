namespace Domain;

public class UserFollowing
{
    // The person who is following another user
    public required string ObserverId { get; set; }
    public User Observer { get; set; } = null!;

    // The person being followed
    public required string TargetId { get; set; }
    public User Target { get; set; } = null!;
}