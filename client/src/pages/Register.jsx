import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post("/auth/register", form)
      alert("Registered successfully")
      navigate("/")
    } catch (error) {
      alert(error.response?.data?.message || "Error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register