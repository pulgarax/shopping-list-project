export function Button(onButtonClick, item) {
  return (
    <>
      {console.log(item)}
      <button onClick={() => onButtonClick(item._id)}>
        {item[0].name ? item[0].name.de : ""}
      </button>
    </>
  );
}
