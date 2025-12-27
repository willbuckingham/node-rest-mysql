# node-rest-mysql

A secure Node.js REST API boilerplate using Express and MySQL. Updated for 2025.

## Features

- ES Modules (ESM)
- MySQL2 with connection pooling and promise-based API
- Parameterized queries (SQL injection prevention)
- Input validation and sanitization (express-validator)
- Security headers (Helmet)
- CORS with whitelisted origins
- Rate limiting
- Environment-based configuration

## Requirements

- Node.js 18.11+ (for `--watch` support)
- MySQL or MariaDB

## Installation

1. Clone and install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

3. Configure your database credentials in `.env`:

   ```env
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=secret
   MYSQL_DATABASE=my_db
   MYSQL_PORT=3306
   PORT=3000
   CORS_ORIGIN=http://localhost:3000
   NODE_ENV=development
   ```

4. Set up your database with a `panos` table. See the included SQL file for reference.

## Usage

**Development** (with hot reload):

```bash
npm run dev
```

**Production**:

```bash
npm start
```

## API Endpoints

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | `/api/panoramas`      | Get all panoramas    |
| GET    | `/api/panoramas/:id`  | Get panorama by ID   |
| POST   | `/api/panoramas`      | Create new panorama  |
| PUT    | `/api/panoramas/:id`  | Update panorama      |
| DELETE | `/api/panoramas/:id`  | Delete panorama      |

## Project Structure

```text
├── app.js              # Express app configuration
├── server.js           # Server entry point
├── db.js               # MySQL connection pool
├── middleware/
│   ├── security.js     # Helmet, CORS, rate limiting
│   └── validate.js     # Input validation
├── routers/
│   └── panoramas.js    # Panorama routes
├── .env.example        # Environment template
└── package.json
```

## Security

- Parameterized queries prevent SQL injection
- Helmet sets secure HTTP headers
- CORS restricts allowed origins
- Rate limiting prevents abuse (100 req/15min)
- Input validation sanitizes all user input
- Error messages hide stack traces in production

## Future Improvements

- Add route list generation at `/api/`
- Support filtering, limiting, and sorting results
- Add panorama categories (routes and architecture)
- Add authentication (JWT or session-based)
- Add tests with Jest

## Resources

- [Express 4.x API](http://expressjs.com/en/4x/api.html)
- [MySQL2](https://github.com/sidorares/node-mysql2)
- [express-validator](https://express-validator.github.io/)
- [Helmet](https://helmetjs.github.io/)
- [Jest](https://jestjs.io/)
