using Microsoft.AspNetCore.Http;
using Application.Profiles.DTOs;

namespace Application.Interfaces;

public interface IPhotoService
{
    Task<PhotoUploadResultDto?> UploadPhoto(IFormFile file);
    Task<string> DeletePhoto(string publicId);
}