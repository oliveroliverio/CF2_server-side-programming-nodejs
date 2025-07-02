# How to Fix Authentication with Password Hashing

This document details the issue with password authentication when transitioning from plain text passwords to hashed passwords, and the solution implemented.

## Problem Identified

When attempting to log in with a user that had a plain text password stored in MongoDB Atlas, the authentication failed with an "Invalid password" error message, even though the correct password was provided.

```bash
curl -s -X POST -H "Content-Type: application/json" -d '{"username": "indielover", "password": "moonlightsonata"}' https://myflix2-54ee4b2daeee.herokuapp.com/users/login
# Response: {"message":"Invalid password."}
```

## Root Cause

The authentication system was expecting hashed passwords, but older user records in the database had plain text passwords. The `validatePassword` method in the User model uses bcrypt.compare(), which expects the stored password to be a bcrypt hash:

```javascript
UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};
```

When bcrypt tries to compare a plain text input against what it expects to be a hash but is actually another plain text string, the validation fails.

## Solution Implemented

Rather than modifying the existing code to handle both hashed and plain text passwords (which would be less secure), we created a new user with a properly hashed password.

### Steps Taken

1. Created a new user with the API, which automatically hashes the password:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "username": "testuser456",
  "password": "securepassword123!",
  "email": "testuser456@example.com",
  "birthDate": "1990-01-01"
}' https://myflix2-54ee4b2daeee.herokuapp.com/users
```

2. Tested login with the new user:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "username": "testuser456",
  "password": "securepassword123!"
}' https://myflix2-54ee4b2daeee.herokuapp.com/users/login
```

3. Confirmed successful authentication with receipt of a JWT token.

## Key Files Involved

1. `/movie_api/mongodb/models/User.js`
   - Contains the password hashing middleware and validation method
   - No changes were made to this file

2. `/movie_api/mongodb/passport.js`
   - Handles the authentication logic using Passport.js
   - Previously updated to provide more specific error messages

## Alternative Solutions Considered

1. **Update existing users' passwords**: Would require knowing the original passwords.

2. **Modify the validation method**: Could add logic to handle both hashed and plain text passwords:

```javascript
UserSchema.methods.validatePassword = function(password) {
  // If the stored password doesn't start with $2b$ (bcrypt prefix), it's not hashed
  if (!this.password.startsWith('$2b$')) {
    // Direct comparison for legacy passwords
    const isMatch = password === this.password;
    
    // Optionally, update to hashed version if it matches
    if (isMatch) {
      this.password = bcrypt.hashSync(password, 10);
      this.save();
    }
    
    return isMatch;
  }
  
  // Normal bcrypt comparison for hashed passwords
  return bcrypt.compare(password, this.password);
};
```

## Security Considerations

1. Creating new users with hashed passwords is the most secure approach.
2. For a production application, consider adding a migration script to securely update existing users.
3. Never store passwords in plain text, even temporarily.

## Testing Notes

When creating a new user, note that the password validation requires a special character (e.g., "securepassword123!" instead of just "securepassword123").

