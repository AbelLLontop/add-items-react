import "./App.css";
import Item from "./components/Item";
import { useItems } from "./hooks/useItems";
import { useSEO } from "./hooks/useSEO";
export type ItemId = `${string}-${string}-${string}-${string}-${string}`;
export interface Item {
  id: ItemId;
  timestamp: number;
  text: string;
}

// const INITIAL_ITEMS: Item[] = [
//   {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: "VideoGames",
//   },
//   {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: "Boks",
//   },
//   {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: "Series",
//   },
//   {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: "Movies",
//   },
// ];

function App() {
  const { items, addItem, removeItem } = useItems();
  useSEO({
    title: `[${items.length}] Technical Interview`,
    description: "Add and remove items from list",
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;
    addItem(input.value);
    input.value = "";
  };

  const createHandleRemoveItem = (id: ItemId) => () => {
    removeItem(id);
  };

  return (
    <main>
      <aside>
        <h1>Technical Interview</h1>
        <h2>Add and Remove items from list</h2>
        <form
          onSubmit={handleSubmit}
          aria-label="Add and remove items from list"
        >
          <label>
            Elemento a introducir:
            <input type="text" name="item" required placeholder="Videojuegos" />
          </label>
          <button>Add element to list</button>
        </form>
      </aside>
      <section>
        <h2>List of Elements</h2>
        {items.length === 0 ? (
          <p>
            <strong>There are not items in the list</strong>
          </p>
        ) : (
          <ul>
            {items.map((item) => {
              return (
                <Item
                  key={item.id}
                  text={item.text}
                  handleClick={createHandleRemoveItem(item.id)}
                />
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
