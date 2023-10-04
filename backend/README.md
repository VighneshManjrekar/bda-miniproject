# Backend API Documentation

This backend API provides various endpoints to retrieve data related to city-wise purchases, product-wise purchases, product average ratings, week-wise purchases, and daily sales.

## Getting Started

Before using the API, make sure to seed the database using the following command:

```bash
node seed
```

## Available Endpoints

### 1. Get All Data
- **Endpoint:** `/`
- **Method:** GET
- **Description:** Check server running status

### 2. City-wise Purchases
- **Endpoint:** `/city-wise-purchases`
- **Method:** GET
- **Description:** Get city-wise purchase data.

### 3. Product-wise Purchases
- **Endpoint:** `/product-wise-purchases`
- **Method:** GET
- **Description:** Get product-wise purchase data.

### 4. Product Average Ratings
- **Endpoint:** `/product-average-ratings`
- **Method:** GET
- **Description:** Get average ratings for each product.

### 5. Week-wise Purchases
- **Endpoint:** `/week-wise-purchases`
- **Method:** GET
- **Description:** Get week-wise purchase data.

### 6. Daily Sales
- **Endpoint:** `/daily-sales`
- **Method:** GET
- **Description:** Get daily sales data.

## How to Use

Make a GET request to the desired endpoint to get the corresponding data.

Example using curl:

```bash
curl http://localhost:your-port-number/endpoint
```

Replace `your-port-number` with the port where the server is running, and `endpoint` with the desired endpoint path.

## Response Format

The API returns data in JSON format.

Example response:

```json
[
  {"data": 23, "label": "Week 2"},
  {"data": 19, "label": "Week 3"},
  // ...
]
```

## Error Handling

- If the endpoint does not exist or the route is incorrect, the server will respond with a 404 Not Found error.
- If there is an internal server error, the server will respond with a 500 Internal Server Error.

## Dependencies

- Express.js
- MongoDB
- Mongoose

## Author

Vighensh Manjrekar
