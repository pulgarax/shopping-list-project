export function SearchListButton({ onButtonClick, item }) {
  return (
    <>
      <button onClick={() => onButtonClick(item._id)}>{item.name.de}</button>
    </>
  );
}
