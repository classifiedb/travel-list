import { useState } from "react"; //because we are using use State on here

export default function Form({ onAddItems }) {
  //we have a piece of state to use as the value for the input fields
  /** Technique of controlled elements has 3 stages (the idea is to keep the controlled states in sync with the dom elements)
   * 1. Define a piece of state
   * 2. Use the piece of state on the element we want to control (force it to take the state)
   * 3. Finally we update (with the "onChange" handler)
   */
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    // console.log(newItem);

    onAddItems(newItem); // this is how we lift up state (in this case to the app component)

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
