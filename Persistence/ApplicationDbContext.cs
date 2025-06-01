using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence;

public class ApplicationDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    public required DbSet<Photo> Photos { get; set; }
    public required DbSet<Comment> Comments { get; set; }
    public required DbSet<UserFollowing> UserFollowings { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ActivityAttendee>(entityBuilder =>
        {
            entityBuilder.HasKey(activityAttendee => new { activityAttendee.ActivityId, activityAttendee.UserId });

            entityBuilder.HasOne(activityAttendee => activityAttendee.User)
                .WithMany(user => user.Activities)
                .HasForeignKey(activityAttendee => activityAttendee.UserId);

            entityBuilder.HasOne(activityAttendee => activityAttendee.Activity)
                .WithMany(activity => activity.Attendees)
                .HasForeignKey(activityAttendee => activityAttendee.ActivityId);
        });

        builder.Entity<UserFollowing>(entityBuilder =>
        {
            entityBuilder.HasKey(userFollowing => new { userFollowing.ObserverId, userFollowing.TargetId });

            entityBuilder.HasOne(userFollowing => userFollowing.Observer)
                .WithMany(user => user.Followings)
                .HasForeignKey(userFollowing => userFollowing.ObserverId)
                .OnDelete(DeleteBehavior.Cascade);

            entityBuilder.HasOne(userFollowing => userFollowing.Target)
                .WithMany(user => user.Followers)
                .HasForeignKey(userFollowing => userFollowing.TargetId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        );

        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
            }
        }
    }
}