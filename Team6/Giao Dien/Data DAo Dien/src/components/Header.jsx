import { useState } from "react";
import { loginUser, RegisterUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [name, setName] = useState(""); 
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [isLogin, setIsLogin] = useState(true); 

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);
      console.log("Login Successful:", data);

      localStorage.setItem("jwtToken", data.accessToken);
      alert("Login Successful!");
      navigate("/home"); 
    } catch (err) {
      setError(err.message || "Something went wrong during login.");
    } finally {
      setLoading(false);
    }
  };




  const handleSignUp = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError("");

    if (!image) {
      setError("Please upload a profile image.");
      setLoading(false);
      return;
    }

    try {
      // Gọi API đăng ký
      const data = await RegisterUser(email, password, image, name);
      console.log("Registration Successful:", data);

      alert("Sign Up Successful! You can now log in.");
      setIsLogin(true);
    } catch (err) {
      setError(err.message || "Something went wrong during sign up.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý thay đổi ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-[350px]">
        <div className="mb-6">
          <p className="text-center text-[30px] font-bold text-gray-800">
            Instagram
          </p>
        </div>

        {isLogin ? (
          <>
            <form className="flex flex-col" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "bg-gray-500" : "bg-[#77A7FF] hover:bg-blue-600"
                } text-white rounded-lg px-4 py-2 font-semibold text-sm transition`}
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </form>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <p className="mx-2 text-sm text-gray-500">OR</p>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="text-center">
              <p className="text-sm">
                Don t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-500 font-semibold"
                >
                  Sign up
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <form className="flex flex-col" onSubmit={handleSignUp}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="border border-gray-300 rounded-lg px-4 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "bg-gray-500" : "bg-[#77A7FF] hover:bg-blue-600"
                } text-white rounded-lg px-4 py-2 font-semibold text-sm transition`}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <p className="mx-2 text-sm text-gray-500">OR</p>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="text-center">
              <p className="text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-500 font-semibold"
                >
                  Log in
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
