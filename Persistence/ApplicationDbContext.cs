﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence;

public class ApplicationDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ActivityAttendee>(entityBuilder => entityBuilder
            .HasKey(activityAttendee => new { activityAttendee.ActivityId, activityAttendee.UserId }));

        builder.Entity<ActivityAttendee>()
            .HasOne(activityAttendee => activityAttendee.User)
            .WithMany(user => user.Activities)
            .HasForeignKey(activityAttendee => activityAttendee.UserId);

        builder.Entity<ActivityAttendee>()
            .HasOne(activityAttendee => activityAttendee.Activity)
            .WithMany(activity => activity.Attendees)
            .HasForeignKey(activityAttendee => activityAttendee.ActivityId);
    }
}