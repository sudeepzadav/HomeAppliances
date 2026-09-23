import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import axiosInstance from "../Utils/axiosInstance";

type AuthProps = {
  setUser: (user: any) => void;
};

type AuthMode = "login" | "signup";
type Role = "Customer" | "Provider";

const Auth = ({ setUser }: AuthProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialMode: AuthMode = location.pathname === "/signup" ? "signup" : "login";
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("Customer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("Customer");
    setError("");
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const payload = isLogin
        ? { email, password }
        : { name, email, password, role };

      const res = await axiosInstance.post(endpoint, payload);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || `${isLogin ? "Login" : "Signup"} failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        
        <div className="flex mb-6 border rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`flex-1 p-2 font-medium transition ${
              isLogin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={`flex-1 p-2 font-medium transition ${
              !isLogin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            Register
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full border p-2 rounded mb-4"
                required
              />

              
              <div className="flex mb-4 border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setRole("Customer")}
                  className={`flex-1 p-2 text-sm font-medium ${
                    role === "Customer" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  I'm a Customer
                </button>
                <button
                  type="button"
                  onClick={() => setRole("Provider")}
                  className={`flex-1 p-2 text-sm font-medium ${
                    role === "Provider" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  I'm a Provider
                </button>
              </div>
            </>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border p-2 rounded mb-4"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 8 characters)"
            minLength={8}
            className="w-full border p-2 rounded mb-4"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => switchMode(isLogin ? "signup" : "login")}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;