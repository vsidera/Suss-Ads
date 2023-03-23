import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { useState } from "react";
import { loginAction } from "../../actions/login/loginAction";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // Init cookies
  const cookies = new Cookies();

  // Init user state
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const logout = () => {
    setUser(null);
    cookies.remove("jwt_authorization");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("THIS GETS HERE!!!!!!!!");
    const formValues = {
      username: username,
      password: password,
    };
    loginAction(formValues)
      .then((res) => {
        if (res.errors) {
          // setIsError(true);
          // setActionType('');
          // setErrorMsg(res.errors._error);
        } else {
          // setSuccess(true);
          // setActionType('');
          setTimeout(() => {
            navigate("/apps");
            // props.history.push('/sidebar');
          }, 1000);
        }
        // Schedule a logout function to run after one hour
        const logoutTimer = setTimeout(function () {
          // Remove the token and redirect the user to the login page
          localStorage.removeItem("token");
          localStorage.removeItem("loginTime");
          window.location.href = "/login";
        }, 60 * 60 * 1000); // one hour in milliseconds

        // Clear the logout timer if the user logs out manually
        // function logout() {
        //   clearTimeout(logoutTimer);
        //   localStorage.removeItem("key");
        //   localStorage.removeItem("loginTime");
        //   window.location.href = "/login";
        // }
      })
      .catch((err) => {
        // setIsError(true);
        // setErrorMsg('Network error');
      });
  };

  const login = (jwt_token) => {
    // Decode Token
    const decoded = jwt(jwt_token);

    // Set user state
    cookies.set("jwt_authorization", jwt_token, {
      expires: new Date(decoded.exp * 1000),
    });
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Suss Advertising
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                onClick={handleLogin}
                type="submit"
                class="w-full text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
