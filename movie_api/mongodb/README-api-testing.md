
# Register new user
```bash
curl -X POST http://localhost:8080/users \
-H "Content-Type: application/json" \
-d '{"Username": "testuser", "Password": "testpassword", "Email": "test@example.com"}'
```

# Login to get token:
```bash
curl -X POST http://localhost:8080/users/login \
-H "Content-Type: application/json" \
-d '{"Username": "testuser", "Password": "testpassword"}'
```

# use protected endpoints with token:
```bash
curl -X GET http://localhost:8080/movies \
-H "Authorization: Bearer <token>"
```

