# Mister Toy — Backend

A REST API for the Mister Toy shop, built with Node.js and Express.
Toys are stored in a JSON file (`data/toy.json`).

The frontend lives in a separate repo: [mr.toy-frontend](https://github.com/HorizonChess/mr.toy-frontend).

## Getting started

```bash
npm install
npm run dev        # Windows, http://localhost:3030
npm run dev:mac    # macOS / Linux
npm start          # without nodemon
```

CORS allows the Vite dev server at `localhost:5173` / `5174`.
When the frontend is built (`npm run build` in the frontend repo), its output goes to `public/`.
The server then serves the whole app from port 3030.

## API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/toy` | List toys (filtering and sorting via query params) |
| GET | `/api/toy/:toyId` | Get one toy (includes demo `msgs`) |
| POST | `/api/toy` | Add a toy |
| PUT | `/api/toy/:toyId` | Update a toy |
| DELETE | `/api/toy/:toyId` | Remove a toy |

### Query params for `GET /api/toy`

| Param | Example | Notes |
|---|---|---|
| `txt` | `?txt=car` | Case-insensitive name search |
| `inStock` | `?inStock=true` | `true` / `false`; omit for all |
| `labels` | `?labels[]=Baby&labels[]=Doll` | Toys that have **all** given labels |
| `sortBy` | `?sortBy=price` | `name`, `price` or `createdAt` (newest first) |

### Toy model

```json
{
  "_id": "t101",
  "name": "Talking Doll",
  "imgUrl": "https://robohash.org/Talking%20Doll?set=set4",
  "price": 123,
  "labels": ["Doll", "Battery Powered", "Baby"],
  "createdAt": 1759386400000,
  "inStock": true
}
```

On `POST` / `PUT` only `name`, `price`, `labels`, `inStock` (and `imgUrl` on create) are accepted.
Other fields in the body are ignored.

## Project structure

```
server.js              # express app, routes
services/
├── toy.service.js     # CRUD over data/toy.json
├── logger.service.js  # logs to console and logs/backend.log
└── util.service.js
data/toy.json          # the "database"
public/                # built frontend (generated)
```
