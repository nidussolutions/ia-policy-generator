# Users API

The Users API allows you to manage user accounts and their associated data.

## User Operations

### Create User

```bash
POST /api/users
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "secure-password",
  "name": "John Doe",
  "phone": "+1234567890"
}
```

Response:
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "+1234567890",
  "createdAt": "2024-01-20T12:00:00Z"
}
```

### Get User

```bash
GET /api/users/:id
```

Response:
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "+1234567890",
  "createdAt": "2024-01-20T12:00:00Z",
  "lastLogin": "2024-01-20T12:00:00Z"
}
```

### Update User

```bash
PUT /api/users/:id
```

Request body:
```json
{
  "name": "John Smith",
  "phone": "+1987654321"
}
```

### Delete User

```bash
DELETE /api/users/:id
```

## Code Examples

### Node.js

```javascript
const LegalForge = require('legalforge-sdk');

const client = new LegalForge({
  apiKey: 'your-api-key'
});

// Create user
const user = await client.users.create({
  email: 'user@example.com',
  password: 'secure-password',
  name: 'John Doe'
});

// Get user
const user = await client.users.get('user-id');

// Update user
await client.users.update('user-id', {
  name: 'John Smith'
});

// Delete user
await client.users.delete('user-id');
```

### Python

```python
from legalforge import Client

client = Client(api_key='your-api-key')

# Create user
user = client.users.create(
    email='user@example.com',
    password='secure-password',
    name='John Doe'
)

# Get user
user = client.users.get('user-id')

# Update user
client.users.update('user-id', name='John Smith')

# Delete user
client.users.delete('user-id')
```

## User Authentication

### Login

```bash
POST /api/auth/login
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "secure-password"
}
```

Response:
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Password Reset

```bash
POST /api/auth/reset-password
```

Request body:
```json
{
  "email": "user@example.com"
}
```

### Change Password

```bash
POST /api/auth/change-password
```

Request body:
```json
{
  "currentPassword": "old-password",
  "newPassword": "new-password"
}
```

## User Sites

### List User Sites

```bash
GET /api/users/:id/sites
```

Response:
```json
{
  "sites": [
    {
      "id": "site-id",
      "name": "My Website",
      "domain": "example.com"
    }
  ]
}
```

### Add Site to User

```bash
POST /api/users/:id/sites
```

Request body:
```json
{
  "name": "New Website",
  "domain": "newexample.com",
  "language": "en"
}
```

## User Documents

### List User Documents

```bash
GET /api/users/:id/documents
```

Response:
```json
{
  "documents": [
    {
      "id": "doc-id",
      "type": "privacy_policy",
      "site": "example.com"
    }
  ]
}
```

## User Activity

### Get Activity Log

```bash
GET /api/users/:id/activity
```

Response:
```json
{
  "activities": [
    {
      "action": "document.created",
      "timestamp": "2024-01-20T12:00:00Z",
      "details": {
        "documentId": "doc-id",
        "type": "privacy_policy"
      }
    }
  ]
}
```

## Error Handling

Common error responses:

```json
{
  "error": "user_not_found",
  "message": "User not found"
}
```

```json
{
  "error": "invalid_email",
  "message": "Invalid email format"
}
```

```json
{
  "error": "password_too_weak",
  "message": "Password does not meet requirements"
}
```

## Webhooks

User-related webhook events:

- `user.created`
- `user.updated`
- `user.deleted`
- `user.login`

Example webhook payload:
```json
{
  "event": "user.created",
  "data": {
    "userId": "user-id",
    "email": "user@example.com",
    "timestamp": "2024-01-20T12:00:00Z"
  }
}
```

## Rate Limits

- Free tier: 50 requests/hour
- Pro tier: 500 requests/hour
- Enterprise: Custom limits

## Best Practices

1. User Management
- Validate email addresses
- Enforce strong passwords
- Monitor login attempts

2. Security
- Hash passwords
- Implement MFA
- Regular security audits

3. Data Protection
- Follow GDPR guidelines
- Implement data retention
- Secure data transfer

## Support

Need help with users?
- Check our [FAQ](../faq/README.md)
- Join our [Discord](https://discord.gg/legalforge)
- Email: support@legalforge.com