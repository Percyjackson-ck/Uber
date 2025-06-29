# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. Requires a valid email, password, and a fullname object containing a firstname (minimum 3 characters) and optionally a lastname.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional)
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

## Responses

| Status Code | Description                                   | Response Body Example                                  |
|-------------|-----------------------------------------------|--------------------------------------------------------|
| 201         | User registered successfully                  | `{ "token": "<jwt_token>", "user": { ...userData } }`  |
| 400         | Validation error (invalid/missing fields)     | `{ "errors": [ { "msg": "...", "param": "...", ... } ] }` |

## Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "609c1f2e8b1e8c0015b8c1f2",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

## Example Error Response

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 character long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

## Notes

- All fields are required except `fullname.lastname`.
- Passwords are securely hashed before storage.
- On success, a JWT token is returned for authentication.

---

# User Login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description

Authenticates a user with email and password. Returns a JWT token and user data on success.

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

## Responses

| Status Code | Description                                   | Response Body Example                                  |
|-------------|-----------------------------------------------|--------------------------------------------------------|
| 200         | Login successful                              | `{ "token": "<jwt_token>", "user": { ...userData } }`  |
| 400         | Validation error (invalid/missing fields)     | `{ "errors": [ { "msg": "...", "param": "...", ... } ] }` |
| 401         | Invalid email or password                     | `{ "message": "Invaild email" }` or `{ "message": "Invaild passowrd" }` |

## Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "609c1f2e8b1e8c0015b8c1f2",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

## Example Error Response

```json
{
  "message": "Invaild email"
}
```

or

```json
{
  "message": "Invaild passowrd"
}
```

## Notes

- Returns a JWT token for authenticated sessions.
- Password is never returned in the response.

---

# User Profile Endpoint Documentation

## Endpoint

`GET /users/profile`

## Description

Returns the authenticated user's profile information. Requires a valid JWT token (sent as a cookie or in the Authorization header).

## Authentication

- Requires authentication via JWT token.
- Token should be sent as a cookie named `token` or as a Bearer token in the `Authorization` header.

## Responses

| Status Code | Description                | Response Body Example                |
|-------------|----------------------------|--------------------------------------|
| 200         | Profile fetched successfully | `{ "_id": "...", "fullname": { "firstname": "...", "lastname": "..." }, "email": "..." }` |
| 401         | Unauthorized (no/invalid token) | `{ "message": "Not authorized, token failed" }` |

## Example Success Response

```json
{
  "_id": "609c1f2e8b1e8c0015b8c1f2",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

---

# User Logout Endpoint Documentation

## Endpoint

`GET /users/logout`

## Description

Logs out the authenticated user by blacklisting the current JWT token and clearing the authentication cookie.

## Authentication

- Requires authentication via JWT token.
- Token should be sent as a cookie named `token` or as a Bearer token in the `Authorization` header.

## Responses

| Status Code | Description                | Response Body Example                |
|-------------|----------------------------|--------------------------------------|
| 200         | Logout successful          | `{ "message": "Logged out" }`        |
| 401         | Unauthorized (no/invalid token) | `{ "message": "Not authorized, token failed" }` |

## Example Success Response

```json
{
  "message": "Logged out"
}
```

## Notes

- After logout, the JWT token is blacklisted and cannot be used again.
- The authentication cookie is cleared on the client.

---

# Captain Routes

All captain-related endpoints are prefixed with `/captains`.

## Available Endpoints

- `POST /captains/register` — Register a new captain (driver).
- `POST /captains/login` — Captain login with email and password.
- `GET /captains/profile` — Get the authenticated captain's profile (requires authentication).
- `GET /captains/logout` — Logout the captain and blacklist the token (requires authentication).

---

# Captain Registration Endpoint Documentation

## Endpoint

`POST /captains/register`

## Description

Registers a new captain (driver) in the system. Requires a valid email, password, fullname (with firstname and optional lastname), and vehicle details.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional)
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.capacity` (integer, required): Minimum 1.
- `vehicle.vehicleType` (string, required): One of `"car"`, `"motorcycle"`, or `"auto"`.

## Responses

| Status Code | Description                                   | Response Body Example                                  |
|-------------|-----------------------------------------------|--------------------------------------------------------|
| 201         | Captain registered successfully               | `{ "token": "<jwt_token>", "captain": { ...captainData } }`  |
| 400         | Validation error (invalid/missing fields)     | `{ "errors": [ { "msg": "...", "param": "...", ... } ] }` |
| 401         | Captain already exists                        | `{ "message": "Captain already exists" }`              |

## Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60a1f2e8b1e8c0015b8c1f2a",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## Example Error Response

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 character long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

or

```json
{
  "message": "Captain already exists"
}
```

## Notes

- All vehicle fields are required.
- Passwords are securely hashed before storage.
- On success, a JWT token is returned for authentication.

---

# Captain Login Endpoint Documentation

## Endpoint

`POST /captains/login`

## Description

Authenticates a captain with email and password. Returns a JWT token and captain data on success.

## Request Body

```json
{
  "email": "jane.smith@example.com",
  "password": "yourpassword"
}
```

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

## Responses

| Status Code | Description                                   | Response Body Example                                  |
|-------------|-----------------------------------------------|--------------------------------------------------------|
| 200         | Login successful                              | `{ "token": "<jwt_token>", "captain": { ...captainData } }`  |
| 400         | Validation error (invalid/missing fields)     | `{ "errors": [ { "msg": "...", "param": "...", ... } ] }` |
| 401         | Invalid email or password                     | `{ "message": "Invalid email" }` or `{ "message": "Invalid password" }` |

## Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60a1f2e8b1e8c0015b8c1f2a",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## Example Error Response

```json
{
  "message": "Invalid email"
}
```

or

```json
{
  "message": "Invalid password"
}
```

---

# Captain Profile Endpoint Documentation

## Endpoint

`GET /captains/profile`

## Description

Returns the authenticated captain's profile information. Requires a valid JWT token (sent as a cookie or in the Authorization header).

## Authentication

- Requires authentication via JWT token.
- Token should be sent as a cookie named `token` or as a Bearer token in the `Authorization` header.

## Responses

| Status Code | Description                | Response Body Example                |
|-------------|----------------------------|--------------------------------------|
| 200         | Profile fetched successfully | `{ "captain": { ...captainData } }` |
| 401         | Unauthorized (no/invalid token) | `{ "message": "Not authorized, token failed" }` |

## Example Success Response

```json
{
  "captain": {
    "_id": "60a1f2e8b1e8c0015b8c1f2a",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

# Captain Logout Endpoint Documentation

## Endpoint

`GET /captains/logout`

## Description

Logs out the authenticated captain by blacklisting the current JWT token and clearing the authentication cookie.

## Authentication

- Requires authentication via JWT token.
- Token should be sent as a cookie named `token` or as a Bearer token in the `Authorization` header.

## Responses

| Status Code | Description                | Response Body Example                |
|-------------|----------------------------|--------------------------------------|
| 200         | Logout successful          | `{ "message": "Logout suncessfull" }`        |
| 401         | Unauthorized (no/invalid token) | `{ "message": "Not authorized, token failed" }` |

## Example Success Response

```json
{
  "message": "Logout suncessfull"
}
```

## Notes

- After logout, the JWT token is blacklisted and cannot be used again.
- The authentication cookie is cleared on the client.

---

# Ride Routes

All ride-related endpoints are prefixed with `/rides`.

## Available Endpoints

- `POST /rides/create` — Request a new ride.
- `GET /rides/get-fare` — Get fare estimate for a ride.

---

## Ride Request

### Endpoint

`POST /rides/create`

### Description

Allows a user to request a new ride by providing pickup and destination addresses and vehicle type.

### Request Body

```json
{
  "pickup": "MG Road, Bangalore",
  "destination": "Majestic, Bangalore",
  "vehicleType": "car"
}
```

- `pickup` (string, required): Pickup address (min 3 characters).
- `destination` (string, required): Destination address (min 3 characters).
- `vehicleType` (string, required): One of `"auto"`, `"car"`, `"motorcycle"`.

### Responses

| Status Code | Description                                   | Response Body Example                                  |
|-------------|-----------------------------------------------|--------------------------------------------------------|
| 201         | Ride requested successfully                   | `{ "user": "...", "pickup": "...", "destination": "...", "opt": "...", "fare": 120 }` |
| 400         | Validation error (invalid/missing fields)     | `{ "errors": [ ... ] }`                                |

### Example Success Response

```json
{
  "user": "609c1f2e8b1e8c0015b8c1f2",
  "pickup": "MG Road, Bangalore",
  "destination": "Majestic, Bangalore",
  "opt": "123456",
  "fare": 120
}
```

### Example Error Response

```json
{
  "errors": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "body"
    }
  ]
}
```

---

## Get Fare Estimate

### Endpoint

`GET /rides/get-fare?pickup=...&destination=...`

### Description

Returns the fare estimate for a ride between the given pickup and destination addresses.

### Query Parameters

- `pickup` (string, required): Pickup address (min 3 characters).
- `destination` (string, required): Destination address (min 3 characters).

### Responses

| Status Code | Description                                   | Response Body Example                                  |
|-------------|-----------------------------------------------|--------------------------------------------------------|
| 200         | Fare fetched successfully                     | `{ "fare": 120 }`                                      |
| 400         | Validation error (invalid/missing fields)     | `{ "errors": [ ... ] }`                                |

### Example Success Response

```json
{
  "fare": 120
}
```

### Example Error Response

```json
{
  "errors": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "query"
    }
  ]
}
```
