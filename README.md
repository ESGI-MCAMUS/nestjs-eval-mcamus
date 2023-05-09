# NestJS eval mcamus

## Start project
Use Docker to start the project

```bash
docker compose build
docker compose up
```

## Init database
```bash
docker exec nestjs-eval-mcamus-nestjs-eval-mcamus-1 npx prisma db push
```

## Swagger

You can access a swagger to this URL: http://localhost:3000/api

## HTTP tests

HTTP tests can be found under the folder `http` at the root of the project