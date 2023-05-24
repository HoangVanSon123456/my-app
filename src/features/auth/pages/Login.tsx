import LoginFrom from "../components/LoginFrom";

export default function Login() {
  return (
    <div>
      <div className="auth-wrapper auth-cover">
        <div className="auth-inner row m-0">
          <div className="mt-1">
            <a className="d-lg-flex" href="#">
              {/* <FaLeaf
                className="brand-logo"
                style={{
                  height: "50px",
                  width: "50px",
                  color: "16b821",
                  marginLeft: "40px",
                }}
              /> */}
              <h2
                className="brand-text"
                style={{
                  marginTop: "10px",
                  marginLeft: "4px",
                  color: "#457dde",
                }}
              >
                Quản Lý Điểm
              </h2>
            </a>
          </div>
          <div className="d-none d-lg-flex col-lg-8 align-items-center">
            <div className="w-100 d-lg-flex align-items-center justify-content-center">
              <img
                className="img-fluid"
                src="assets/images/logo/2286953.jpg"
                alt="Login V2"
                sizes="10"
              />
            </div>
          </div>
          <div className="d-flex col-lg-4 align-items-center auth-bg p-lg-5">
            <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
              <h2 className="card-title fw-bold mb-1">
                Welcome to Point Management 👋
              </h2>
              <p className="card-text mb-2">
                Please sign-in to your account and start the adventure
              </p>
              <LoginFrom />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
