# GlowUp

- [Live Link (Firebase)](https://glowup-3efba.web.app)

## Overview
This project is a backend API for managing products, built using Node.js and Express.js. It provides endpoints for fetching, filtering, sorting, and paginating products. It also includes user authentication via Firebase.

## Features
- **Pagination**: Efficiently load products with pagination.
- **Search**: Search products by name.
- **Categorization**: Filter products by brand, category, and price range.
- **Sorting**: Sort products by price and date added.
- **Authentication**: User authentication using Firebase.

## Tech Stack
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Firebase for authentication
- CORS for cross-origin requests

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB instance (cloud or local)
- Firebase project for authentication

### Installation
1. Clone the repository:
   ```bash
   git clone <backend-repo-url>
   cd backend
2. Install dependencies:
``bash
Copy code
npm install

3. Configure environment variables:

Create a .env file in the root directory and add your environment variables:
PORT=8000
DB_USER=your_db_user
DB_PASS=your_db_password

4. Start the server:

``bash
Copy code
npm start

The server will be available at http://localhost:8000.

## Deployment
Deploy the application using services like Heroku, Vercel, or another cloud provider.
Ensure environment variables are set in your deployment settings.