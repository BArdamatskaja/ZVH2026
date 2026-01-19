import Categories from "./components/Categories";
import Books from "./components/Books";
import { RouterProvider } from "react-router-dom";
import router from "./app/routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Categories />
      <Books />
    </>
  );
}

export default App;
