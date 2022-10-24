### docker compose up --build
### phpmyadmin localhost:3306 root root
### app_user.sql импортировать в бд webapi

# Auth

```shell
POST /api/admin/login
```

```typescript
interface Request {
    name: string,
    password: string
}
```

```typescript
interface Response {
    success: boolean,
    data: {
        token: string
    }
}
```

# User management

```shell
GET '/api/admin/settings/users' {"authorization": "Bearer <token>"}
```

```typescript
interface Request {
    name: string,
    password: string
}
```

```typescript
interface Response {
    success: boolean,
    data: {
        rows: Array<{
            id: number,
            name: string,
            password: string
        }>
    }
}
```

```shell
POST '/api/admin/settings/users' {"authorization": "Bearer <token>"}
```

```typescript
interface Request {
    name: string,
    password: string
}
```

```typescript
interface Response {
    success: boolean,
    data: {
        id: number
    }
}
```

```shell
PUT '/api/admin/settings/users/:id' {"authorization": "Bearer <token>"}
```

```typescript
interface Request {
    name: string,
    password: string
}
```

```typescript
interface Response {
    success: boolean,
    data: {}
}
```

```shell
DELETE '/api/admin/settings/users/:id' {"authorization": "Bearer <token>"}
```

```typescript
interface Response {
    success: boolean,
    data: {}
}
```