import './Button.css'
export function SearchListButton({ onButtonClick, item }) {

  return (
    <>
      <button className="SearchButton" onClick={() => onButtonClick(item._id)}>{item.name.de}</button>
    </>
  );
}
