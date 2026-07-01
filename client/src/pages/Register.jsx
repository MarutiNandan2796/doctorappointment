export default function Register() {
  return (
    <section className="container auth-page">
      <form className="auth-card">
        <h1>Create account</h1>
        <input type="text" placeholder="Full name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="btn btn-primary full-width" type="button">
          Create account
        </button>
      </form>
    </section>
  );
}
