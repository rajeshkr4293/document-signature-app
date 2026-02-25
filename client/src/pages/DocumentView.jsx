import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../services/api"

import { Document, Page, pdfjs } from "react-pdf"


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

function DocumentView() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [documentData, setDocumentData] = useState(null)
  const [auditLogs, setAuditLogs] = useState([])
  const [reason, setReason] = useState("")
  const [numPages, setNumPages] = useState(null)

  const fetchDocument = async () => {
    try {
      const res = await api.get("/docs")
      const doc = res.data.find(d => d._id === id)
      setDocumentData(doc)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAuditLogs = async () => {
    try {
      const res = await api.get(`/audit/${id}`)
      setAuditLogs(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchDocument()
    fetchAuditLogs()
  }, [id])

  const handleSign = async () => {
    try {
      await api.post("/signatures", {
        documentId: id,
        x: 120,
        y: 300,
        page: 1
      })

      fetchDocument()
      fetchAuditLogs()
    } catch {
      alert("Signing failed")
    }
  }

  const handleReject = async () => {
    if (!reason) return alert("Enter rejection reason")

    try {
      await api.post(`/docs/${id}/reject`, { reason })
      setReason("")
      fetchDocument()
      fetchAuditLogs()
    } catch {
      alert("Reject failed")
    }
  }

  const handleDownload = () => {
    window.open(`http://localhost:5000/api/docs/${id}/download`, "_blank")
  }

  if (!documentData) return <p className="p-6">Loading...</p>

  const fileUrl = `http://localhost:5000/${documentData.filePath.replace(/\\/g, "/")}`

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </button>

      {/* Top Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h1 className="text-2xl font-bold mb-4">
          {documentData.fileName}
        </h1>

        <p className="mb-4">
          Status:{" "}
          <span
            className={
              documentData.status === "Signed"
                ? "text-green-600 font-semibold"
                : documentData.status === "Rejected"
                ? "text-red-600 font-semibold"
                : "text-yellow-600 font-semibold"
            }
          >
            {documentData.status}
          </span>
        </p>

        {documentData.rejectionReason && (
          <p className="text-red-600 mb-4">
            Reason: {documentData.rejectionReason}
          </p>
        )}

        {documentData.status === "Pending" && (
          <div className="space-y-4">
            <button
              onClick={handleSign}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Sign Document
            </button>

            <div>
              <input
                type="text"
                placeholder="Rejection reason"
                className="border p-2 rounded w-full mb-2"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />

              <button
                onClick={handleReject}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        )}

        {documentData.status === "Signed" && (
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download Signed Document
          </button>
        )}
      </div>

      {/* PDF Preview */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold mb-4">PDF Preview</h2>

        <div className="border rounded flex justify-center">
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            <Page pageNumber={1} />
          </Document>
        </div>
      </div>

      {/* Audit Timeline */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Document Activity
        </h2>

        {auditLogs.length === 0 ? (
          <p>No activity found</p>
        ) : (
          <ul className="space-y-3">
            {auditLogs.map((log) => (
              <li
                key={log._id}
                className="border-l-4 border-blue-500 pl-4"
              >
                <p className="font-semibold">
                  {log.action}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(log.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}

export default DocumentView