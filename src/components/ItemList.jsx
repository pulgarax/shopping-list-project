import { useState, useEffect } from "react";
import { search } from "fast-fuzzy";
import { SearchListButton } from "./SearchListButton";
import { ActiveListButton } from "./ActiveListButton";

const ApiURL = "https://fetch-me.vercel.app/api/shopping/items";

export function ItemList() {
  const [shoppingList, setShoppingList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [activeList, setActiveList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

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
      ...shoppingList.filter((item) => item._id === buttonId),
    ]);
    setSearchList([]);
    setShoppingList(shoppingList.filter((item) => item._id !== buttonId));
    document.querySelector("#input").value = "";
  }

  function onSearchbarChange(searchInput) {
    setSearchList(
      search(searchInput, shoppingList, {
        keySelector: (item) => item.name.de,
      })
    );
    searchList.length === 0 ? setIsEmpty(false) : setIsEmpty(true);
  }

  function onActiveButtonClick(buttonId) {
    setActiveList(activeList.filter((item) => item._id !== buttonId));
    setShoppingList([
      ...shoppingList,
      ...activeList.filter((item) => item._id === buttonId),
    ]);
  }

  console.log("ActiveList: ", activeList);

  return (
    <>
      <ul>
        {activeList.map((item) => (
          <ActiveListButton
            item={item}
            key={item._id}
            onButtonClick={onActiveButtonClick}
          />
        ))}
      </ul>
      <input
        id="input"
        onChange={(e) => onSearchbarChange(e.target.value)}
        placeholder="Enter your search"
      ></input>
      {isEmpty && <p>No results found</p>}
      <ul>
        {searchList.map((item) => (
          <SearchListButton
            item={item}
            key={item._id}
            onButtonClick={onButtonClick}
          />
        ))}
      </ul>
    </>
  );
}
