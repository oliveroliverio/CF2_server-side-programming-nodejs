# run server
node server.js

# test server
node test.js


# install testing packages
`npm install --save-dev jest supertest`

# running without shutting down and restarting server
- add `dev: nodemon server.js` to `package.json`
- run `npm run dev`