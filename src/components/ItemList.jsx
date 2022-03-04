import { useState, useEffect } from "react";

const ApiURL = "https://fetch-me.vercel.app/api/shopping/items";

export function ItemList() {
  const [shoppingList, setShoppingList] = useState([]);

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

  console.log(shoppingList);

  return (
    <ul>
      {shoppingList.map((item) => (
        <li>{item.name.de}</li>
      ))}
    </ul>
  );
}
