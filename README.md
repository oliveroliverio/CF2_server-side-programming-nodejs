# 2.2 Exercise Instructions
- use modules to complete tasks for building an API


# Exercise 2.2: Node.js Modules

## Tasks Overview

### Task 1: Create a Basic Web Server
1. Create a new directory called `2.2_node-modules`
2. Initialize a new Node.js project with `package.json`
3. Create a new file `server.js`
4. Using the built-in `http` module, create a basic web server that:
   - Listens on port 8080
   - Responds with "Welcome to my web server!" for all requests
5. Test your server by visiting `http://localhost:8080`

Git commit point: "Create basic web server using http module"

### Task 2: URL Module Implementation
1. Modify your `server.js` to:
   - Import the `url` module
   - Parse the incoming request URL
   - Display different messages for different paths (e.g., "/", "/about", "/contact")
2. Test different URLs in your browser

Git commit point: "Implement URL routing using url module"

### Task 3: Custom Module Creation
1. Create a new file `messageModule.js`
2. Implement functions that return different messages for each route
3. Export these functions using `module.exports`
4. Import and use this module in your `server.js`

Git commit point: "Create and implement custom message module"

### Task 4: Error Handling
1. Add error handling to your server
2. Create a "404 Not Found" response for undefined routes
3. Implement basic logging using the built-in `console` module

Git commit point: "Add error handling and basic logging"

## Testing Your Work
- Start your server using `node server.js`
- Test all routes in your web browser
- Verify error handling works for undefined routes
- Check console logs for request information

## Success Criteria
- Server successfully starts and listens on port 8080
- Different routes return different messages
- Custom module is properly implemented and used
- Error handling works for undefined routes
- Code is well-organized and commented

## Submission
1. Ensure all code is committed with descriptive messages
2. Your final directory structure should look like:
```
2.2_node-modules/
├── package.json
├── server.js
└── messageModule.js
```

## Tasks Implementation

### Task 1: Create a Basic Web Server
- `npm init -y`

