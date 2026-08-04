# RentNest API Postman Documentation

This document provides a practical guide for testing the RentNest API in Postman.

## 1. Base URL

Set your Postman collection variable:

- Variable name: `Admin`
- Value: `http://localhost:9000`

If your server runs on a different port, replace it accordingly.

## 2. Authentication

Most protected routes require a Bearer token.

### Login flow
1. Register a user.
2. Login with the same credentials.
3. Copy the `accessToken` from the response.
4. Save it in the `token` collection variable.

### Headers
For protected requests:

- `Authorization: Bearer {{token}}`
- `Content-Type: application/json`

## 3. Response Format

All successful responses follow this structure:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation completed successfully",
  "data": {}
}
```

## 4. Environment / Variables

Create these variables in Postman:

| Variable | Example Value | Description |
|---|---|---|
| `Admin` | `http://localhost:9000` | Base API URL |
| `token` | `your_jwt_here` | JWT returned from login |

## 5. Auth Endpoints

### Register User
- Method: `POST`
- Endpoint: `/api/auth/register`
- Auth: No

Request body:

```json
{
  "name": "Adrita",
  "email": "adrita@gmail.com",
  "password": "Password@123",
  "phone": "+8801712345678",
  "image": "https://example.com/images/farhana.jpg",
  "role": "TENANT"
}
```

Allowed roles:
- `ADMIN`
- `LANDLORD`
- `TENANT`

### Login User
- Method: `POST`
- Endpoint: `/api/auth/login`
- Auth: No

Request body:

```json
{
  "email": "adrita@gmail.com",
  "password": "Password@123"
}
```

### Get Current User
- Method: `GET`
- Endpoint: `/api/auth/me`
- Auth: Required

## 6. Property Endpoints

### Get All Properties
- Method: `GET`
- Endpoint: `/api/properties`
- Auth: No

### Get Property By ID
- Method: `GET`
- Endpoint: `/api/properties/:id`
- Auth: No

### Create Property
- Method: `POST`
- Endpoint: `/api/landlord/properties`
- Auth: Required (`LANDLORD`)

Request body:

```json
{
  "title": "Beautiful Apartment",
  "description": "A very nice place to live.",
  "address": "123 Main St",
  "city": "New York",
  "rent": 150,
  "bedrooms": 2,
  "bathrooms": 1,
  "amenities": ["WiFi", "Parking"],
  "images": ["image1.jpg"],
  "categoryId": "category-id-here"
}
```

### Update Property
- Method: `PUT`
- Endpoint: `/api/landlord/properties/:id`
- Auth: Required (`LANDLORD`)

Example body:

```json
{
  "rent": 180
}
```

### Delete Property
- Method: `DELETE`
- Endpoint: `/api/landlord/properties/:id`
- Auth: Required (`LANDLORD`)

## 7. Category Endpoints

### Create Category
- Method: `POST`
- Endpoint: `/api/categories`
- Auth: Required (`ADMIN`)

Request body:

```json
{
  "name": "Flat"
}
```

### Get All Categories
- Method: `GET`
- Endpoint: `/api/categories`
- Auth: No

## 8. Rental Request Endpoints

### Create Rental Request
- Method: `POST`
- Endpoint: `/api/rentals`
- Auth: Required (`TENANT`)

Request body:

```json
{
  "propertyId": "property-id-here",
  "moveInDate": "2024-01-01T00:00:00.000Z",
  "duration": 12,
  "message": "I am interested in this property."
}
```

### Get Tenant Rental Requests
- Method: `GET`
- Endpoint: `/api/rentals`
- Auth: Required (`TENANT`)

### Get Rental Request Details
- Method: `GET`
- Endpoint: `/api/rentals/:id`
- Auth: Required (`TENANT`, `LANDLORD`, or `ADMIN`)

### Get Landlord Rental Requests
- Method: `GET`
- Endpoint: `/api/landlord/requests`
- Auth: Required (`LANDLORD`)

### Update Rental Request Status
- Method: `PATCH`
- Endpoint: `/api/landlord/requests/:id`
- Auth: Required (`LANDLORD`)

Example body:

```json
{
  "status": "APPROVED"
}
```

## 9. Review Endpoints

### Create Review
- Method: `POST`
- Endpoint: `/api/reviews`
- Auth: Required (`TENANT`)

Request body:

```json
{
  "propertyId": "property-id-here",
  "rating": 5,
  "comment": "Great place!"
}
```

## 10. Payment Endpoints

### Create Payment
- Method: `POST`
- Endpoint: `/api/payments/create`
- Auth: Required (`TENANT`)

Request body:

```json
{
  "rentalRequestId": "rental-request-id"
}
```

### Get Payment History
- Method: `GET`
- Endpoint: `/api/payments`
- Auth: Required (`TENANT`)

### Get Payment Details
- Method: `GET`
- Endpoint: `/api/payments/:id`
- Auth: Required (`TENANT`)

### Stripe Webhook
- Method: `POST`
- Endpoint: `/api/payments/webhook`
- Auth: No
- Use this for Stripe events in a real payment flow.

## 11. Admin Endpoints

### Get All Users
- Method: `GET`
- Endpoint: `/api/admin/users`
- Auth: Required (`ADMIN`)

### Update User Status
- Method: `PATCH`
- Endpoint: `/api/admin/users/:id`
- Auth: Required (`ADMIN`)

Example body:

```json
{
  "status": "BANNED"
}
```

### Get All Properties
- Method: `GET`
- Endpoint: `/api/admin/properties`
- Auth: Required (`ADMIN`)

### Get All Rentals
- Method: `GET`
- Endpoint: `/api/admin/rentals`
- Auth: Required (`ADMIN`)

## 12. Suggested Testing Order

1. Register a user
2. Login and save the token
3. Create a category (Admin)
4. Create a property (Landlord)
5. Create a rental request (Tenant)
6. Approve or reject it (Landlord)
7. Create a payment (Tenant)
8. Review the payment history

## 13. Common Status Codes

| Status | Meaning |
|---|---|
| `200` | Success |
| `201` | Created |
| `400` | Bad request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not found |
| `500` | Server error |

## 14. Notes

- Replace placeholder IDs such as `property-id-here` and `rental-request-id` with real values returned from previous requests.
- For protected routes, always send the Bearer token.
- If you want, the next step can be to convert this into a fully exported Postman collection with folder structure and example scripts.
