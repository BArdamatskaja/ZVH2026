import Categories from "./components/Categories";
import { RouterProvider } from "react-router-dom";
import router from "./app/routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Categories />
    </>
  );
}

export default App;
