# Chill Gamer Server API

## Live API Endpoint
[Visit API Endpoint](https://your-server-api-url)

## Overview
This server powers the Chill Gamer application by managing game reviews, user authentication, and watchlist data. It provides secure and efficient endpoints to handle CRUD operations for reviews and user interactions.

## Features
- **Secure Authentication**: Integrates with Firebase Authentication for user management.
- **CRUD Operations**:
  - Create, read, update, and delete reviews.
  - Manage the watchlist for logged-in users.
- **Protected Endpoints**: Validates user authentication tokens for protected routes.
- **Sorting and Filtering**: Supports sorting by rating/year and filtering by genre.
- **Optimized Queries**: Uses MongoDB's aggregation framework for efficient data retrieval.

## API Routes
- `/reviews`:
  - `GET /`: Retrieve all reviews with optional sorting/filtering.
  - `GET /:id`: Retrieve details of a specific review.
  - `POST /`: Add a new review (authenticated).
  - `PUT /:id`: Update an existing review (authenticated).
  - `DELETE /:id`: Delete a review (authenticated).
- `/watchlist`:
  - `GET /`: Retrieve the user's watchlist.
  - `POST /`: Add a game to the watchlist.
  - `DELETE /:id`: Remove a game from the watchlist.

## Technologies Used
- Node.js with Express.js
- MongoDB (via Mongoose)
- Firebase Admin SDK for authentication
- dotenv for environment variable management

## Deployment
- Server-side hosted on: Vercel

## Instructions
1. Clone this repository.
2. Install dependencies: `npm install`.
3. Add `.env` file with the following: