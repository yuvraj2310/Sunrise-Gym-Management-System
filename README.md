# Gym Management System

This is a Gym Management System implemented using EJS, Node.js, and MongoDB. It uses the Express framework for handling HTTP requests, Mongoose for interacting with MongoDB, and Body Parser for parsing request bodies.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js:** [Download and Install Node.js](https://nodejs.org/)
- **MongoDB:** [Download and Install MongoDB](https://www.mongodb.com/try/download/community).

## Getting Started

### 1. Download Project

Download the zip file and extract all files.

### 2. Navigate to the project directory:

```bash
cd gym-management-system
```

### 3. Install dependencies:

Run the following commands to install project dependencies:

```bash
npm init
npm install express mongoose body-parser
```

### 4. Configure MongoDB:

- Start MongoDB connection (Install MongoDB if not installed).
- Update the MongoDB connection string in the `app.js` file with the database name you want:

```javascript
mongoose.connect('mongodb://127.0.0.1/### your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
```

### 5. Run the application:

```bash
node app.js
```

- The application will be accessible at [localhost:3000](http://localhost:3000).
