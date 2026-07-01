export default function Login() {
  return (
    <section className="container auth-page">
      <form className="auth-card">
        <h1>Login</h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="btn btn-primary full-width" type="button">
          Login
        </button>
      </form>
    </section>
  );
}
