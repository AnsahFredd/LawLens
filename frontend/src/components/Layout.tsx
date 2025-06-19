import { Outlet, useLocation, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../auth/AuthContext";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  const { token, loading } = useAuth();

  if (loading) return null;

  const isAuthPage =
    path === "/" ||
    path === "/login" ||
    path === "/signup" ||
    path === "/reset-password";

  const showSignupLogin = path === "/";
  const showLoginButton = path === "/signup" || path === "/reset-password";
  const showOnlyLawLens = path === "/login";

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthPage ? (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#ccc] bg-white shadow-sm p-4 flex flex-wrap items-center justify-between">
          <div className="text-3xl font-bold flex-shrink-0">LawLens</div>

          {/* Landing page: show both signup and login buttons */}
          {showSignupLogin && (
            <div className="flex flex-wrap gap-3 mt-3 sm:mt-0">
              <Link
                to="/signup"
                className="bg-black text-white px-4 py-2 rounded text-center min-w-[140px]"
              >
                Create an account
              </Link>
              <Link
                to="/login"
                className="bg-blue-600 px-4 py-2 rounded text-white text-center min-w-[100px]"
              >
                Log in
              </Link>
            </div>
          )}

          {/* On signup and reset-password pages: login button only */}
          {showLoginButton && (
            <Link
              to="/login"
              className="bg-[#4080BF] text-white px-4 py-2 w-full sm:w-[130px] text-center rounded mt-3 sm:mt-0"
            >
              Login
            </Link>
          )}

          {/* On login page: no buttons */}

          {/* No other navbar here */}
        </nav>
      ) : (
        // Non-auth pages show regular navbar fixed below the header space
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#ccc] bg-white shadow-sm">
          <Navbar />
        </nav>
      )}

      <main className={`flex-grow ${isAuthPage ? "" : "p-6"} mt-[72px]`}>
        <Outlet />
      </main>

      {/* Show footer on non-auth pages */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;
