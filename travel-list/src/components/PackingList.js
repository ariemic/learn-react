import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  // function handleClearList() {
  //   items.map((item) => onDeleteItem(item.id));
  // }

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items.toSorted((a, b) => {
      if (a.description < b.description) return -1;
      if (a.description > b.description) return 1;
      return 0; // They are equal
    });
  if (sortBy === "packed")
    sortedItems = items.toSorted(
      (a, b) => -(Number(a.packed) - Number(b.packed))
    );

  console.log(sortedItems);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>clear list</button>
      </div>
    </div>
  );
}
