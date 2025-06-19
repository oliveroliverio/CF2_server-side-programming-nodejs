# Installing Heroku CLI on macOS

## Prerequisites
- macOS
- [Homebrew](https://brew.sh/) package manager
- Terminal access

## Installation Steps

1. **Install Heroku CLI using Homebrew**
```bash
brew install heroku/brew/heroku

heroku --version
heroku login
```

2. Verify login: `heroku auth:whoami`

## common commnands
- Create new app: `heroku create app-name` or navigate to current project root and run `heroku create`
- Set remote: `heroku git:remote -a app-name`
- Deploy: `git push heroku main`
- View logs: `heroku logs --tail`
- Open app: `heroku open`
- List apps: `heroku apps`


After creating the Heroku app, you'll need to:

1. Set up environment variables in Heroku
2. Configure your MongoDB Atlas connection string
3. Make sure your Procfile (if you have one) points to the correct start command


## Troubleshooting


If you encounter issues:

Run `heroku update` to ensure latest version
Try `heroku login --interactive` for CLI-only login
Check `heroku status` for service availability
Documentation
For more information, visit Heroku Dev Center