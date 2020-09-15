# Happenings API

An online platform that provide latest gist, entertainment, sport and politics new news what can not be found anywhere.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c7e3b4f654c7de71c882#?env%5Bhappening-api%5D=W3sia2V5IjoibG9jYWxfdXJsIiwidmFsdWUiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJlbmFibGVkIjp0cnVlfV0=)

## Technologies Used

- [NodeJS](https://nodejs.org/en/download/)
- [ExpressJS](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- [NodeJS](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Installing/Run locally

- Make sure you have `nodejs`, `postgres` installed.

- Clone or fork repo🤷‍♂

  ```bash
    - git clone https://github.com/ezesunrise/happeningsApi.git
    - cd happeningsApi
    - npm install
  ```

- Create a PostgreSQL database by running the command below in `psql`

  ```bash
    createdb -h localhost -p 5432 -U postgres <database-name>
  ```

- Create/configure `.env` environment with your credentials. A sample `.env.local` file has been provided to get you started. Make a duplicate of `.env.local` and rename to `.env`, then configure your credentials.

- Run `npm run dev` to start the server and watch for changes

## HTTP Requests

All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `POST` Create a resource
- `GET` Get a resource or list of resources
- `PATCH` Update a resource
- `DELETE` Delete a resource

For `POST` and `PATCH` requests, the body of your request may include a JSON payload.

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `401` `Unauthorized` The supplied API credentials are invalid
- `403` `Forbidden` The credentials provided do not have permissions to access the requested resource
- `404` `Not Found` An attempt was made to access a resource that does not exist in the API
- `500` `Server Error` An error on the server occurred

### Sample HTTP Response

- For a `success` response, the server will return a response of this format:

```
{
  "status": "success",
  "message": "success message"
  "data": { ... }
}
```
- For an `error` response, the server will return a response of this format:

```
{
  "status": "error",
  "error": {
    "message": "error message",
    "trace": {
      "statusCode": <status-code>
    }
  }
}
