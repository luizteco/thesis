# Product Requests Server

This is the Express.js backend server for the product requests feature in the Thesis application.

## Features

- **API Endpoints** for managing product requests
- **Persistent Storage** using JSON file storage
- **CORS Support** for cross-origin requests
- **Like/Vote System** with client-based tracking

## Installation

```bash
npm install
```

## Running the Server

### Development Mode
```bash
npm run dev
```
Server will run on `http://localhost:3001` with auto-reload on file changes.

### Production Mode
```bash
npm start
```
Server will run on `http://localhost:3001` (or specify `PORT` environment variable).

## API Endpoints

### Get All Requests
**GET** `/api/requests`
- Returns all product requests sorted by likes and timestamp

**Response:**
```json
[
  {
    "id": "1704316800000",
    "name": "Product Name",
    "description": "Product description",
    "timestamp": 1704316800000,
    "likes": 5
  }
]
```

### Create Request
**POST** `/api/requests`
- Creates a new product request

**Request:**
```json
{
  "name": "Product Name",
  "description": "Product description"
}
```

**Response:** Returns the created request object with `id`, `timestamp`, and `likes: 0`

### Like/Unlike Request
**POST** `/api/requests/:id/like`
- Toggles like status for a request (adds/removes like based on clientId)

**Request:**
```json
{
  "requestId": "1704316800000",
  "clientId": "client_1234567890_abc123def"
}
```

**Response:**
```json
{
  "likes": 5,
  "userLiked": true
}
```

### Check User's Like Status
**GET** `/api/requests/:id/likes/:clientId`
- Checks if a specific user has liked a request

**Response:**
```json
{
  "userLiked": true
}
```

## Data Storage

Product requests and likes are stored in `requests-data.json`:
```json
{
  "requests": {
    "id": { "id", "name", "description", "timestamp" }
  },
  "likes": {
    "requestId-clientId": { "requestId", "clientId", "timestamp" }
  }
}
```

## Environment Variables

- `PORT` - Server port (default: 3001)

## Integration with Frontend

The frontend uses these environment-based API URLs:
- **Development**: `http://localhost:3001/api`
- **Production**: `/api` (expects reverse proxy setup)

For development, make sure both servers are running:
```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev
```

Or run both together:
```bash
npm run dev:all
```
