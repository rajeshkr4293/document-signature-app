 **Document Signature App**

A secure, full-stack digital document signing platform inspired by DocuSign and Adobe Sign.

This application allows users to upload PDF documents, digitally sign them, reject them with reason, download immutable signed copies, and track complete document activity with audit logs.

Built using the MERN stack with production-style architecture.

---

 **Live Demo**

Frontend: Coming Soon
Backend API: Coming Soon

---

 **Project Objective**

The goal of this project was to build a real-world SaaS-style document signing system that demonstrates:

Secure authentication

Document lifecycle management

Server-side PDF manipulation

Audit logging

Status-based workflows

Enterprise backend architecture

This is not a basic CRUD project — it models real digital document systems used in LegalTech, HR platforms, and enterprise SaaS.

---

 **Features
 Authentication & Security**

JWT-based login & registration

Password hashing using bcrypt

Protected API routes

Role-based document access

Secure middleware validation

---

 **Document Management**

PDF upload using Multer

Owner-based document access

Status lifecycle:

Pending

Signed

Rejected

Rejection reason tracking

Conditional download access

---

 **Digital Signature System**

Server-side PDF modification using pdf-lib

Signature coordinates stored in database

Signed PDF generation

Immutable signed output

Downloadable signed documents

---

 **Audit Trail System**

Upload tracking

Signing tracking

Download tracking

IP address logging

Timestamped activity

Frontend timeline display

---

**Frontend UI**

React (Vite)

Tailwind CSS

Dashboard view

Document details page

Status badges

Audit timeline

Protected routes

Clean SaaS-style layout

---

 **Architecture Overview**
Backend

Node.js

Express

MongoDB (Mongoose)

JWT Authentication

Middleware-based security

RESTful API design

Frontend

React

Axios

Tailwind CSS

React Router

PDF Handling

PDF-Lib for server-side document editing

---

**Document Lifecycle Flow**

User registers & logs in

User uploads PDF document

Document status → Pending

User can:

Sign document

Reject with reason

Signed document is generated

Audit logs track all actions

Signed file becomes downloadable

---

**API Endpoints**

Auth

POST /api/auth/register

POST /api/auth/login

---

**Documents**

POST   /api/docs/upload

GET    /api/docs

GET    /api/docs/:id/download

POST   /api/docs/:id/reject

---

**Signatures**

POST /api/signatures

---

**Audit**

GET /api/audit/:docId

---

**What This Project Demonstrates**

Enterprise-style SaaS architecture

Secure authentication flows

File handling & PDF manipulation

Middleware-based logging

Stateful workflow management

Full-stack integration

Production-style project structuring

---

**Final Statement**

This project showcases the ability to design and implement enterprise-grade backend logic, secure document handling, and production-style SaaS workflows using modern web technologies.

