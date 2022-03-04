const ApiURL = "https://fetch-me.vercel.app/api/shopping/items";

export async function FetchData() {
  const response = await fetch(ApiURL);
  const data = await response.json();
  console.log(data.data);
}
