# Connecting database to API on heroku
Connect to myflixdb | connect to your application | drivers | select Node.js | install driver: `npm install mongodb` | add connection string to application code (replace password with admin user) | copy connection string (CONNECTION_URI) to .env file | modify

Be sure to update the config vars on heroku to use the connection string from atlas
KEY: CONNECTION_URI
VALUE: <your-connection-string>

After that: `git push heroku main`