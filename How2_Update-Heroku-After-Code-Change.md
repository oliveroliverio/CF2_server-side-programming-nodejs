# How to Update Heroku After Code Changes

This guide explains the process of updating your Heroku deployment after making code changes to your application.

## Prerequisites

- Heroku CLI installed (`brew install heroku/brew/heroku` on macOS)
- Git installed
- Logged in to Heroku (`heroku login`)

## Step-by-Step Instructions

### 1. Commit your changes to Git

```bash
# Check which files have been modified
git status

# Add all modified files to staging
git add .

# Commit the changes with a descriptive message
git commit -m "Update error messages in authentication flow"
```

### 2. Push to Heroku

```bash
# Push directly to Heroku's main branch
git push heroku main
```

If you're working on a different branch:

```bash
# Push your current branch to Heroku's main branch
git push heroku your-branch-name:main
```

### 3. Verify the deployment

```bash
# Open your Heroku app in the browser
heroku open

# Check the logs for any errors
heroku logs --tail
```

### 4. Troubleshooting

If you encounter issues during deployment:

```bash
# Restart the Heroku dyno
heroku restart

# Check for build errors
heroku builds:info

# View detailed build logs
heroku builds:output
```

### 5. Additional Useful Commands

```bash
# Run a one-off command on Heroku
heroku run npm list

# Check your app's configuration variables
heroku config

# Set a new environment variable
heroku config:set KEY=value

# Scale your dynos
heroku ps:scale web=1
```

## Important Notes

- Heroku automatically runs your build scripts defined in `package.json`
- The application will restart after a successful deployment
- Remember to update your `.env` variables on Heroku if you've added new ones locally
- Database migrations should be handled separately if needed

## Checking Deployment Status

After pushing your changes, you can monitor the deployment status:

```bash
# View deployment status
heroku releases

# Rollback to a previous version if needed
heroku rollback
```

---
# Pushing a specific branch to Heroku

```bash
# Push your current branch to Heroku's main branch
git push heroku your-branch-name:feat/remove-auth-from-movies-endpoint
```
