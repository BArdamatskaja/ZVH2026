function NotFound() {
  return (
    <div
      className="stack"
      style={{ maxWidth: 720, margin: "0 auto" }}
    >
      <div className="card cardPad stack">
        <h1>404</h1>
        <p className="muted">Puslapis nerastas.</p>
        <div className="row">
          <a
            href="/"
            className="btn btn--primary"
          >
            Grįžti į pradžią
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
