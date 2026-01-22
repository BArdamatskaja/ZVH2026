import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="appShell">
      <Header />
      <main className="appMain">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
