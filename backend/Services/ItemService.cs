using backend.Models;

namespace backend.Services;

public class ItemService
{
    private readonly List<Item> _items = new()
    {
        new Item(1, "Sample Item 1", "This is the first sample item"),
        new Item(2, "Sample Item 2", "This is the second sample item"),
        new Item(3, "Sample Item 3", "This is the third sample item")
    };
    private int _nextId = 4;

    public IReadOnlyList<Item> GetAll() => _items.AsReadOnly();

    public Item? GetById(int id) => _items.FirstOrDefault(i => i.Id == id);

    public Item Create(string name, string description)
    {
        var item = new Item(_nextId++, name, description);
        _items.Add(item);
        return item;
    }

    public Item? Update(int id, string name, string description)
    {
        var index = _items.FindIndex(i => i.Id == id);
        if (index < 0) return null;

        var item = new Item(id, name, description);
        _items[index] = item;
        return item;
    }

    public bool Delete(int id)
    {
        var index = _items.FindIndex(i => i.Id == id);
        if (index < 0) return false;

        _items.RemoveAt(index);
        return true;
    }
}
