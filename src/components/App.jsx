import "./App.css";
import { Searchbar } from "./Searchbar";
import { FetchData } from "./ItemList";

function App() {
  return (
    <>
      <Searchbar />
      <FetchData />
      <div>Hello World</div>
    </>
  );
}

export default App;
