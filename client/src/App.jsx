import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import DocumentView from "./pages/DocumentView"
import ProtectedRoute from "./routes/ProtectedRoute"

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Document View */}
      <Route
        path="/documents/:id"
        element={
          <ProtectedRoute>
            <DocumentView />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App