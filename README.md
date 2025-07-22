# Elysia Boilerplate

A starter kit for building web applications with Elysia.js, Bun, and Prisma.

## Features

- **Elysia.js:** A fast and friendly web framework for Bun.
- **Bun:** A fast JavaScript runtime, bundler, transpiler, and package manager.
- **Prisma:** A modern database toolkit for type-safe database access.
- **Authentication:** User registration, login, OTP verification, and password reset functionality.
- **Email Service:** Sending emails using Nodemailer and BullMQ for queue management.
- **S3 Bucket Service:** Uploading and managing files on S3-compatible storage.
- **User Profile Management:** Updating profile information and changing passwords.
- **Attachment Management:** Uploading and associating files with users.
- **Validation:** Request body validation using Elysia's built-in validation.
- **Swagger Documentation:** API documentation generated using `@elysiajs/swagger`.
- **Docker Support:** Docker and Docker Compose files for easy development and deployment.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)
- Docker (optional, for database and other services)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  Install dependencies:

    ```bash
    bun install
    ```

3.  Set up environment variables:
    - Create a `.env` file based on `.env.example` and fill in the required values.
    - Configure database connection, JWT secret, Redis, email, and S3 settings.

### Development

1.  Start the development server:

    ```bash
    bun run dev
    ```

2.  Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

3.  Access the Swagger documentation at [http://localhost:3000/docs](http://localhost:3000/docs).

### Docker

1.  To run the application using Docker Compose, execute:

    ```bash
    docker-compose up --build
    ```

2.  Access the application at [http://localhost:3000](http://localhost:3000).

### Key Technologies

- **Elysia.js:** `src/index.ts`, `src/app.routes.ts`
- **Prisma:** `src/database/prisma/schema.prisma`, `src/database/db.ts`
- **Authentication:** `src/modules/auth/*`
- **Email Service:** `src/services/email/*`, `src/queues/*`, `src/worker/*`
- **S3 Bucket Service:** `src/services/s3-bucket/*`

### Database Migrations

To run database migrations, use the following command:

```bash
bunx prisma migrate dev
```

### Seeding the Database

To seed the database with initial data, use the following command:

```bash
bunx prisma db seed
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for any bugs, feature requests, or suggestions.
