import { useState, useEffect } from "react";
import { search } from "fast-fuzzy";
import { SearchListButton } from "./SearchListButton";
import { ActiveListButton } from "./ActiveListButton";

const ApiURL = "https://fetch-me.vercel.app/api/shopping/items";

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function ItemList() {
  const [shoppingList, setShoppingList] = useState(
    () => getLocalStorage("shoppingList") ?? []
  );
  const [searchList, setSearchList] = useState([]);
  const [activeList, setActiveList] = useState(
    () => getLocalStorage("activeList") ?? []
  );

  useEffect(() => {
    FetchData();
    async function FetchData() {
      try {
        const response = await fetch(ApiURL);
        const data = await response.json();
        if (shoppingList.length === 0) {
          setShoppingList(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    setLocalStorage("activeList", activeList);
    setLocalStorage("shoppingList", shoppingList);
  }, [activeList]);

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
      search(
        searchInput,
        shoppingList.filter(
          (item) =>
            !activeList.some((activeItem) => {
              activeItem._id === item._id;
            })
        ),
        {
          keySelector: (item) => item.name.de,
        }
      )
    );
  }
  function onActiveButtonClick(buttonId) {
    setActiveList(activeList.filter((item) => item._id !== buttonId));
    setShoppingList([
      ...shoppingList,
      ...activeList.filter((item) => item._id === buttonId),
    ]);
  }

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
      {searchList.length === 0 && <p>No results found</p>}
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
