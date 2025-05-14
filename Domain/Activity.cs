﻿namespace Domain;

public class Activity
{
    // Activity props
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public DateTime Date { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public bool IsCanceled { get; set; }

    // Location props
    public required string Country { get; set; }
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }

    // Navigation props
    public ICollection<ActivityAttendee> Attendees { get; set; } = [];
}