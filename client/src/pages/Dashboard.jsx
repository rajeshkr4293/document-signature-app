import { useEffect, useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"

function Dashboard() {
  const [documents, setDocuments] = useState([])
  const [file, setFile] = useState(null)

  const fetchDocs = async () => {
    try {
      const res = await api.get("/docs")
      setDocuments(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchDocs()
  }, [])

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!file) return alert("Please select a file")

    const formData = new FormData()
    formData.append("file", file)

    try {
      await api.post("/docs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      setFile(null)
      fetchDocs()
    } catch (error) {
      console.error(error)
      alert("Upload failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Upload Section */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <form onSubmit={handleUpload} className="flex gap-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </form>
      </div>

      {/* Document Table */}
      <div className="bg-white rounded-xl shadow p-4">
        {documents.length === 0 ? (
          <p>No documents found</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">File Name</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {documents.map((doc) => (
                <tr key={doc._id} className="border-b hover:bg-gray-50">
                  <td className="py-2">
                    <Link
                      to={`/documents/${doc._id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {doc.fileName}
                    </Link>
                  </td>

                  <td className="py-2">
                    <span
                      className={
                        doc.status === "Signed"
                          ? "text-green-600 font-semibold"
                          : doc.status === "Rejected"
                          ? "text-red-600 font-semibold"
                          : "text-yellow-600 font-semibold"
                      }
                    >
                      {doc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>
    </div>
  )
}

export default Dashboard