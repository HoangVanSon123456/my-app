import LoginFrom from "../components/LoginFrom";

export default function LoginPage() {
  return (
    <div className="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
      <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
        <h2 className="card-title fw-bold mb-1">Welcome to Admin 👋</h2>
        <p className="card-text mb-2">
          Please sign-in to your account and start the adventure
        </p>
        <LoginFrom />
      </div>
    </div>
  );
}
