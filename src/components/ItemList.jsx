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
    setActiveList(shoppingList.filter((item) => item._id === buttonId));
  }

  function onSearchbarChange(searchInput) {
    setSearchList(
      search(searchInput, shoppingList, {
        keySelector: (item) => item.name.de,
      })
    );
  }
  console.log(searchList);
  return (
    <>
      <ul>
        {activeList.map((item) => (
          <li key={item._id}>{item.name.de}</li>
        ))}
      </ul>
      <input
        onChange={(e) => onSearchbarChange(e.target.value)}
        placeholder="Enter your search"
      ></input>
      <ul>
        {searchList.map((item) => (
          <Button item={item} onButtonClick={onButtonClick} key={item._id} />
        ))}
      </ul>
    </>
  );
}
