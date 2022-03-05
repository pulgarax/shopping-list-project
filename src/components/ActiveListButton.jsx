export function ActiveListButton({ onButtonClick, item }) {
  return (
    <>
      <button onClick={() => onButtonClick(item._id)}>{item.name.de}</button>
    </>
  );
}
