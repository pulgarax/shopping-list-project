import { useState, useEffect } from "react";
import { search } from "fast-fuzzy";
import { Button } from "./Button";

const ApiURL = "https://fetch-me.vercel.app/api/shopping/items";

export function ItemList() {
  const [shoppingList, setShoppingList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [activeList, setActiveList] = useState([]);

  useEffect(() => {
    FetchData();
    async function FetchData() {
      try {
        const response = await fetch(ApiURL);
        const data = await response.json();
        setShoppingList(data.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  function onButtonClick(buttonId) {
    setActiveList([
      ...activeList,
      shoppingList.filter((item) => item._id === buttonId),
    ]);
    document.querySelector("#input").value = "";
  }

  function onSearchbarChange(searchInput) {
    setSearchList(
      search(searchInput, shoppingList, {
        keySelector: (item) => item.name.de,
      })
    );
  }

  return (
    <>
      <ul>
        {activeList.map((item) => (
          <li key={item[0]._id}>{item[0].name.de}</li>
        ))}
      </ul>
      <input
        id="input"
        onChange={(e) => onSearchbarChange(e.target.value)}
        placeholder="Enter your search"
      ></input>
      <ul>
        {searchList.map((item) => (
          <Button item={item} key={item._id} onButtonClick={onButtonClick} />
        ))}
      </ul>
    </>
  );
}
