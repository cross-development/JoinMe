using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Application.Interfaces;
using Application.Profiles.DTOs;

namespace Infrastructure.Photos;

public class PhotoService : IPhotoService
{
    private readonly Cloudinary _cloudinary;

    public PhotoService(IOptions<CloudinarySettings> options)
    {
        var account = new Account
        {
            ApiKey = options.Value.ApiKey,
            ApiSecret = options.Value.ApiSecret,
            Cloud = options.Value.CloudName,
        };

        _cloudinary = new Cloudinary(account);
    }

    public async Task<PhotoUploadResultDto?> UploadPhoto(IFormFile file)
    {
        if (file.Length <= 0)
        {
            return null;
        }

        await using var stream = file.OpenReadStream();

        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Transformation = new Transformation().Height(500).Width(500).Crop("fill"),
            Folder = "join-me",
        };

        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        if (uploadResult.Error is not null)
        {
            throw new InvalidOperationException($"Photo upload failed: {uploadResult.Error.Message}");
        }

        return new PhotoUploadResultDto
        {
            PublicId = uploadResult.PublicId,
            Url = uploadResult.SecureUrl.AbsoluteUri,
        };
    }

    public async Task<string> DeletePhoto(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);

        var deleteResult = await _cloudinary.DestroyAsync(deleteParams);

        if (deleteResult.Error is not null)
        {
            throw new InvalidOperationException($"Photo delete failed: {deleteResult.Error.Message}");
        }

        return deleteResult.Result;
    }
}