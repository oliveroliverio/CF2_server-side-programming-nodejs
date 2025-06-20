# Connecting database to API on heroku
Connect to myflixdb | connect to your application | drivers | select Node.js | install driver: `npm install mongodb` | add connection string to application code (replace password with admin user) | copy connection string (CONNECTION_URI) to .env file | modify

Be sure to update the config vars on heroku to use the connection string from atlas
KEY: CONNECTION_URI
VALUE: <your-connection-string>

After that: `git push heroku main`, be sure make sure Atlas has all IP addresses whitelisted (0.0.0.0/0) in the Network Access settings (left tab).

test requests with heroku url (see .env)

```bash
curl -X POST https://myflix2-54ee4b2daeee.herokuapp.com/users \
-H "Content-Type: application/json" \
-d '{
  "username": "bethany_steinman",
  "password": "testPassword123",
  "email": "bethany.steinman@example.com",
  "birthDate": "1990-01-01"
}'
```