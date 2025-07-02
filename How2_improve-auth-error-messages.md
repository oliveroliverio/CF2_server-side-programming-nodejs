# How to Improve Authentication Error Messages

This document details the changes made to improve authentication error messages in the movie API application and how these changes were deployed to Heroku.

## Files Changed

1. `/movie_api/mongodb/passport.js`
   - Modified the error messages in the LocalStrategy authentication flow
   - Changed from generic "Incorrect username or password" messages to more specific error messages

## Changes Made

### In passport.js

Original code:
```javascript
if (!user) {
    console.log('User not found');
    return callback(null, false, {
        message: 'Incorrect username or password.',
    });
}

const isValid = await user.validatePassword(password);
if (!isValid) {
    console.log('Invalid password');
    return callback(null, false, {
        message: 'Incorrect username or password.',
    });
}
```

Updated code:
```javascript
if (!user) {
    console.log('User not found');
    return callback(null, false, {
        message: 'User not found.',
    });
}

const isValid = await user.validatePassword(password);
if (!isValid) {
    console.log('Invalid password');
    return callback(null, false, {
        message: 'Invalid password.',
    });
}
```

## Reason for Changes

The original error messages were intentionally vague for security reasons (not revealing whether the username or password was incorrect). However, for this application, we've decided to provide more specific error messages to improve user experience while understanding the security implications.

## Deployment Process

### Commands Used

```bash
# Check the status of files
git status

# Add the modified files to staging
git add movie_api/mongodb/passport.js

# Commit the changes
git commit -m "Update authentication error messages for better UX"

# Push to Heroku from feature branch
git push heroku feat/remove-auth-from-movies-endpoint:main

# Open the deployed app in browser
heroku open
```

### Deployment Notes

1. We were working on a feature branch `feat/remove-auth-from-movies-endpoint`
2. We encountered a non-fast-forward error when trying to push directly to Heroku's main branch
3. We resolved this by using the syntax `git push heroku feat/remove-auth-from-movies-endpoint:main`
4. The deployment was successful (v14 released to Heroku)

## Testing the Changes

To test these changes, attempt to log in with:

1. A non-existent username - should see "User not found" message
2. A correct username but incorrect password - should see "Invalid password" message
3. Correct credentials - should successfully log in and receive a JWT token

## Security Considerations

While more specific error messages improve user experience, they can potentially aid attackers in determining valid usernames. In a production environment with stricter security requirements, consider reverting to more generic error messages.

