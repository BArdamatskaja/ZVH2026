import { useAuth } from "../components/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full border-b bg-white px-6 py-3 flex items-center justify-between">
      <div>📚 Books App</div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span>👤 {user.email}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </header>
  );
}
