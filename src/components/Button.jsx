export function Button({ onButtonClick, item }) {
  console.log("button-item", item);
  return (
    <>
      <button onClick={() => onButtonClick(item._id)}>{item.name.de}</button>
    </>
  );
}
