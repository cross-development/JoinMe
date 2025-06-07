namespace Application.Core;

public class PaginationParams<TCursor>
{
    private const int MaxPageSize = 50;

    private int _pageSize;

    public TCursor? Cursor { get; set; }

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
    }
}