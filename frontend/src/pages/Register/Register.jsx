import RegisterForm from "../../components/auth/RegisterForm";

export default function Register() {
  return (
    <div
      className="stack"
      style={{ maxWidth: 560, margin: "0 auto" }}
    >
      <div className="pageHeader">
        <h1>Registracija</h1>
        <p className="muted">Susikurk paskyrą.</p>
      </div>

      <div className="card cardPad">
        <RegisterForm />
      </div>
    </div>
  );
}
