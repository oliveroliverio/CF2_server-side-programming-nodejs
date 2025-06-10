
## Server-Side Programming & Node.js


# 2.4: Web Server Frameworks & Express


- Learning Goals
- Introduction
- Server-Side Web Frameworks
- Express Framework
- Setting Up Express
- Request Routing with Express
- Middleware
- Resources Exposed by Web Servers
- Error Handling in Express
- Summary
- Resources
- Task
- Forum


#### Learning Goals


- Route HTTP requests using a web server framework
- Describe how Express can simplify the process of building an API using Node.js


#### Introduction

So far in your foray into server-side web development, you’ve learned about Node.js and how it allows you to use JavaScript on the backend, as well as how to use modules within Node.js to add further functionality to your own code. You’ve even looked at package managers, which can help you organize all those myriad modules you’ve added to your project. These steps have been in preparation for you to build your Achievement project—an API for storing and retrieving movie data.

While it’s possible to use Node.js by itself to create an API, it’s certainly not the most convenient or time-efficient solution. For this reason, you’ll be spending this Exercise looking into a quicker, more streamlined way of creating APIs using server-side web frameworks (and more specifically, one framework—Express). Ready to take your Node.js skills up one more notch? Then, let’s get started!


#### Server-Side Web Frameworks

You might remember the word “framework” first being used back in Intro to Frontend Development when you learned about CSS frameworks such as Bootstrap and Foundation. In software development, a framework provides a set of universal and reusable functions to streamline the building of a certain type of application. If the programming language is the raw lumber you’d use to construct a new table, then the programming framework would be the composite table pieces available for purchase on Amazon—the legs, the tabletop, the brackets, and so on. While you do still need to assemble the pieces yourself, you don’t have to build each individual piece from scratch, which saves you a lot of time. In this way, programming frameworks can help to expedite the development process.

Frameworks are available in both client-side and server-side development, providing different functions for making development processes more efficient and overall simplifying the steps required to create and maintain web applications. In Achievement 3, for example, you’ll be using the React framework on the client-side to develop the frontend for your myFlix application. In this Exercise, however, you’ll be focusing on server-side web frameworks and how they can be used on the backend to expedite server-side processes.

Server-side web frameworks are structured around backend logic, which generally includes features such as the ability to:


- Interact directly with HTTP requests and responses, including the ability to route requests appropriately, easily access data within requests, and serve static files and data as responses
- Simplify database access
- Render data, applying templating engines to HTML content

For your Achievement project, you’ll mainly be focusing on the first of these bullet points—interacting with HTTP requests and responses. The API you create will need to be able to interact with and respond to data requests about movies or users, returning the requested data to the client (which, in this case, is the “myFlix” app). These requests will be handled by a server-side web framework.

Every server-side language has its own (often many) programming frameworks. A few examples include:


- PHP: Laravel, CodeIgniter, CakePHP
- Python: Django, Flask
- Java: Springboot
- C#: ASP.NET
- Ruby: Ruby on Rails
- Node.js/JavaScript: Express.js

While it’s usually recommended that you learn the basics of a language before exploring one of its frameworks, in practice, there will likely be more times than you’d like where you have to interact with a brand-new codebase for a framework you want to use. This forces you to learn the characteristics of the framework and the native features of its programming language concurrently—a challenge, to say the least! In this Exercise, however, the framework you’ll be looking at employs a language you should be well familiar with by now: JavaScript and Node.js. You’ll discover not only how you can use the unique features of Express to create your own API, but a few of the features common to all server-side web frameworks, as well.


#### Express Framework

When you were first introduced to Node.js at the start of this Achievement, you learned that Node.js is an “open source runtime environment for executing JavaScript without a browser.” The keyword here is “environment”; Node.js allows you to run JavaScript in a server-side environment, rather than simply in the browser (which is on the client-side).

On its own, the Node.js environment doesn’t contain a great deal of useful functions for helping with the types of tasks you’d need to accomplish when working on server-side projects—handling HTTP requests, logging requests, serving static content, managing database access, and applying templating engines to HTML content, to name a few. While you can install modules using npm to incorporate add-on functionality into an application, each of these modules is usually isolated to a single piece of functionality (as opposed to a complete set of commonly required features to help structure an application).

This is where Express.js comes in—a server-side web framework for Node.js. Its authors describe it as a “fast, unopinionated, and minimalist framework.” Let’s break that down:


1. Express is “minimalist,” meaning that it provides only the core functions most commonly required without a lot of excess weight.
1. It’s “unopinionated,” meaning that it doesn’t guide or lock a developer into doing things in a certain way, instead, offering a great deal of flexibility.
1. It’s “fast,” meaning that it doesn’t slow down server processing times significantly from Node.js, which is already a fast language/environment.

With that in mind, let’s summarize how Express can help make Node.js development easier:


- Express simplifies Node.js syntax, making it easier to write server-side code.
- Express is used to create and maintain web servers as well as manage HTTP requests. Rather than using modules (e.g., the HTTP module), you can simply use Express to route requests/responses and interact with request data.

Because your project involves creating an API for a “myFlix” app, clients of your API will be making requests to it to either get or update data on your server about movies or users of “myFlix.” You’ll use Express.js to handle such requests.

Express.js isn’t the only server-side web framework built for Node.js—other popular ones include Koa.js, Meteor.js, and Sails.js—however, as Express is currently the most popular and best-documented of the Node.js frameworks, it makes the most sense to use it for your Achievement project. This is an important consideration you shouldn’t forget when it comes to choosing a framework—not due to any amount of “trendiness,” but simply because you can be assured better support and resources if you run into issues.


#### Setting Up Express

Express, as with most things JavaScript, can be incorporated into a project the same as you’d include a module. It’s technically a package (`express`), so you can use npm to install it, as you did in the task for the previous Exercise.

You’ve already set up a “package.json” file to manage the dependencies of your project. With Express installed, it, too, becomes a dependency of your project and will be listed in your “package.json” file. As you used no flags when installing the Express package, you indicated that it should be distributed along with the rest of your package once deployed, therefore listing it under the “dependencies” section of your “package.json” file. This is opposed to the `--save-dev` flag, which indicates the package will only be available during development and, therefore, listed under the “devDependencies” section of your “package.json” file.

You also created an “index.js” file, which, by default, fills the “main” field of your “package.json” file. To recap, this “index.js” is the entry point of your package and the file that will be read first when your package is imported externally. Thus, your “index.js” file is where all code execution for your project should begin.

Your folder structure should look like this:

![Folder structure displaying index.js and package.json files in Open Editors](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E4/figure1.png)


###### Figure 1

To import `express` into your package, add these two lines to the top of your “index.js” file:


```js
const express = require('express');
const app = express();
```

You should be familiar with the above syntax from using it to import the `http`, `url`, and `fs` modules in Exercise 2.2: Node.js Modules. The first line imports the `express` module locally so it can be used within the file. The second line declares a variable that encapsulates Express’s functionality to configure your web server. This new variable is what you’ll use to route your HTTP requests and responses.

With that out of the way, Express is installed and ready to go. Let’s see what it can do!


> TIP!
> If you get an error message while importing the Express package, check out this article on How to fix error TS7016.


#### Request Routing with Express

A web server is what processes requests and returns responses accordingly over HTTP (the Hypertext Transfer Protocol). You learned how to create a web server using the built-in Node.js `http` module back in Exercise 2.2: Node.js Modules. Remember the following code?


```js
const http = require('http');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Welcome to my book club!\n');
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');
```

The above code represents a fairly simple request/response process—any request to the web server set up on port 8080 will return the response “Welcome to my book club!” Try running this code and navigating to “localhost:8080/” in your browser. Do you receive the message? What if you were to navigate to “localhost:8080/books”. Do you see the same message? That’s because both of these addresses are located on port 8080. Currently, no matter what type of request is made or what URL is being accessed on port 8080, the server will always return the same response.

But what if you wanted requests to different URLs on the server to send different responses—with different types of data?  For example, what if you wanted a request to the root URL, “localhost:8080/”, to send back the response “Welcome to my book club!”; a request to “localhost:8080/documentation” to send back an HTML file with documentation; and a request to “localhost:8080/books” to return JSON data about a list of books?

One method would be to import more Node modules into your project. You could use the `http` module in conjunction with the `url` module to parse the request URL and send a response accordingly to the URL path as you did back in Exercise 2.2: Node.js Modules:


```js
const http = require('http'),
  url = require('url');

http.createServer((request, response) => {
  let requestURL = url.parse(request.url, true);
  if ( requestURL.pathname == '/documentation.html') {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Documentation on the bookclub API.\n');
  } else {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Welcome to my book club!\n');
  }

}).listen(8080);

console.log('My first Node test server is running on Port 8080.');
```

As was discussed earlier, one of the benefits of using Express is that it simplifies the Node.js syntax. Rather than importing and using modules, you could, instead, use the following (much simpler) code to do the trick:


```js
const express = require('express');
const app = express();

let topBooks = [
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling'
  },
  {
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien'
  },
  {
    title: 'Twilight',
    author: 'Stephanie Meyer'
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my book club!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/books', (req, res) => {
  res.json(topBooks);
});


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
```

This probably looks like quite a lot at first glance, so let’s take a closer look at the few pertinent lines of code:


```js
// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my book club!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/books', (req, res) => {
  res.json(topBooks);
});
```

These three `app.get` requests define the different URLs that requests can be sent to (also called endpoints or routes), as well as the different responses that should be returned for each URL. Each one takes the following structure:

`app.METHOD(PATH, HANDLER)`

The `app` here is an instance of `express()`. Remember above when you imported the `express` module and set it to the variable `app`? This is that same `app` variable. It currently encapsulates `express()` and all its functionalities, allowing you to use the framework within your app.

The next part of the request, “METHOD,” refers to an HTTP request method. There are multiple HTTP request methods, each of which specifies a different type of data transfer over the Hypertext Transfer Protocol. These methods include `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.


> TIP!
> You should remember GET and POST from Exercise 2.2: Node.js Modules, when you were first introduced to the http module. You’ll learn even more about them, as well as their cousins PUT and DELETE, in the next Exercise.

The three requests in the example all use the `GET` method (`app.get`). This is because they’re not posting or modifying any data on the server, rather, simply retrieving data.

Inside the parentheses of the request are “PATH” and “HANDLER.” “PATH” refers to a path on the server—in other words, the endpoint URL the request is targeting. The three endpoints in the example requests above are “/”, “/documentation”, and “/books”. “HANDLER,” on the other hand, is the function to be executed when the route is matched. You’ll learn more about this in a moment.

![Image showing a broken-down version of an app request, with the app, method, path, and handler labeled](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E4/Breakdown%20of%20an%20app%20request.jpg)


###### Figure 2

These requests simplify URL routing considerably. When using built-in Node modules, you need a lot of cumbersome logic to check the type and URL path of each request, whereas with Express, all you need is a single line for each URL endpoint.

Let’s take a closer look at “HANDLER” before moving on. As mentioned above, this is the callback function that’s executed when the route (or URL endpoint) is matched. It tells the server what kind of response to return in response to the request and takes the following format:


```js
(req, res) => {
  //logic here to send a response
}
```

The two parameters `req` and `res` contain data about the HTTP request (`req`) and allow you to control the HTTP response (`res`) respectively. Take a look at the first of the three example requests above:


```js
app.get('/', (req, res) => {
  res.send('Welcome to my book club!');
});
```


> Note!
> Don't get things mixed up! In Express, the names of the actual HTTP methods are written with lowercase letters—app.get(), app.post(), app.delete()—even though they’re referred to in caps when talking about them outside the context of Express code (as this is how they’re commonly referred to: GET, POST, DELETE).

Here, you can see that the URL endpoint is the root directory: “/”. Any request made to the root directory would call a handler function, which invokes a function on the “response,” or `res` object: `res.send('Welcome to my book club!')`.  This sends back the message “Welcome to my book club!” as text in the body of your HTTP response. This is essentially the same thing you did in your original (non-Express) Node.js code a few Exercises ago:


```js
response.writeHead(200, {'Content-Type': 'text/plain'});
response.end('Welcome to my book club!\n');
```

In this code, you had to construct a “header” for the HTTP response—in other words, a collection of additional information that’s sent alongside the response—that specified the `Content-Type` of the HTTP response as `text/plain`. By using `res.send()`, however, there’s no need to manually create this header as Express constructs it for you.


> TIP!
> If you're interested, check out MDN web docs to learn more about HTTP headers.

The `res.send()` function is versatile in that it can send responses containing different types of data—strings, objects, you name it. Express will read whatever data you pass it as a parameter and choose the data type accordingly. Express also offers a few other response functions that are more specific in terms of what type of response they send. The second and third requests above are both examples of this: `res.sendFile()` and `res.json()`. These return a file or JSON response respectively. Take a look at the other types of responses you can send in the table below:


```js
res.download()
```


```js
res.end()
```


```js
res.json()
```


```js
res.redirect()
```


```js
res.render()
```


```js
res.send()
```


```js
res.sendFile()
```


```js
res.sendStatus()
```


###### Figure 3

You can check out this [routingExpress repl](https://repl.it/@CFCurriculum/routingExpress) to practice request routing with Express. Feel free to modify the code to see different results.


#### Middleware

Express’s true power comes from something referred to as “middleware.” Middleware is the term used to describe functions that exist, as you might guess from the name, in the middle of your application’s request-response lifecycle. Think of them like extra functions you can tack on that allow you to perform actions for each request.

Every middleware function has access to (and is able to modify) the request object (data about the request to the server), as well as the response object (data about the response that the server will send back). In addition, middleware functions can be provided with what’s called a “next” callback—it calls the next middleware function in line. You should include this callback in all your middleware functions aside from the very last one in your request.

Each of the three requests in the example above included a middleware function (the `app.get()` function actually calls its own middleware function inside of it). Take a look at the diagram below for a better look:

![Diagram showing an app.get function with a function(req, res, next) function inside of it and all the various parts labeled](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E4/figure3.png)


###### Figure 4. Middleware diagram from the Express documentation

Here, you can see the same `app.get()` function as the example requests had, and inside of that function is yet another function—the middleware function `function(req, res, next)`. On its own, however, the logic above doesn’t actually do anything (neither the `req` argument nor the `res` are being utilized), so let’s, instead, think of an example where middleware would actually come in useful. For instance, let’s say you wanted to console log the URL of every request that comes into the server. With middleware, you could write a function (call it “myLogger”) that does this for you:


```js
const express = require('express'),
const app = express();

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

app.use(myLogger);

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
```

By invoking the `app.use()` function on the `myLogger()` middleware function before specifying the routes for the root path (“/”) and the sub-URL (“/secreturl”), you’re designating that `myLogger()` should be called with every request—all requests to the root URL and “/secreturl”. By using middleware to apply the same logic to all requests, you eliminate the need for each route to boast its own separate `console.log` statement. If you were to run this code now, then browse both of the URLs (root and “/secreturl”), the URL would be logged to the terminal each time.

Great! This eliminates the need for a lot of potentially redundant code, especially when writing copious request functions. But let’s push it even further. Let’s say that, in addition to the `console.log` middleware function already included, you also want your requests to send back responses that include the timestamp of the request. You could code this like so:


```js
const express = require('express');
const app = express();

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(myLogger);
app.use(requestTime);

app.get('/', (req, res) => {
  let responseText = 'Welcome to my app!';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.get('/secreturl', (req, res) => {
  let responseText = 'This is a secret url with super top-secret content.';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);

});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
```

To see how it works you can check out this [middleWare repl](https://repl.it/@CFCurriculum/middleWare). Practice until you feel confident about Express middleware functions.

In the above code, in addition to the `myLogger()` middleware function previously included, another middleware function, `requestTime()` has been added. This function adds a property to the request object that’s been set to the timestamp of the request. When the code is run,  `myLogger()` will be called first. Then, because it includes a `next` callback, the next middleware function, `requestTime()` will be run. As `requestTime()` also includes a `next` callback, it will, in turn, be called by whichever of the two routes (“/” or “/secreturl”) corresponds to the current request.

The routes themselves contain logic to send back their own, appropriate response; however, both are able to access `requestTime()` as the middleware function ensures it’s stored within the request object. (Likewise, both routes will also log the request to the terminal thanks to the `myLogger()` function.)

In this way, middleware functions can be “chained,” where each one takes the request and response object, then either returns a response or calls the next middleware function in the stack.

![Diagram requested showing the journey of a request through four different middlewares (Middleware A through Middleware C) and ending with a response.](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E4/Journey%20of%20a%20request%20through%20middleware.jpg)


###### Figure 5

In practice, there are some common middleware functions—logging, user authentication, JSON parsing, static file serving, and app routing—that are routinely called in a certain order, as shown below:

![Diagram showing the common hierarchy of middleware functions in an HTTP request: in order from logging, to user authentication, JSON parsing, static file serving, and app routing.](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E4/Hierarchy%20of%20middleware%20functions%20in%20an%20HTTP%20request.jpg)


###### Figure 6

You’ll find this exact hierarchy in many apps on the market; however, not all apps need each of these functions. In cases like this, you can “skip” certain levels. For instance, if you only need logging, user authentication, and app routing in your application, you should include only those functions, in that order. Do note, though, that you wouldn’t be able to jump from logging to app routing to user authentication. This is because app routing should always be the last step in the app’s lifecycle.

Note that app routing is required in any Express application, so you’ll need to define it in your myFlix application. Along with app routing, you’ll also need to define one middleware function for logging your request, and another one for authenticating your users. The order in which you should do so is as follows:


1. Logging
1. User authentication
1. App routing

Note that app routing is rarely a single function, rather, multiple functions depending on the number of routes you want to specify for your app. You’ll learn more about user authentication later in this Achievement.


##### Logging with Morgan

In the example above, a custom middleware function called `myLogger()` was used to log the request URL to the terminal. In practice, you’d usually use a preexisting library as your logging middleware, as it would be equipped to log any and all information that you could want about a request.

One such logging middleware for Express is called Morgan. As with most things Node.js, it can be found in the npm package registry. You can install it as follows:


```js
$ npm install morgan
```

Using Morgan is fairly straightforward. Take a look at the code below, where Morgan is first imported locally (the line `const morgan = require('morgan');`), then passed into the `app.use()` function:


```js
const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
```

To see this example in action, you can check out this [morganExample repl](https://repl.it/@CFCurriculum/morganExample).

Remember that the `app.use()` function is how you invoke your middleware function. Here, rather than invoking the `myLogger()` custom function as was demonstrated before, Morgan will be invoked instead: `app.use(morgan('common'));`. The `common` parameter here specifies that requests should be logged using Morgan’s “common” format, which logs basic data such as IP address, the time of the request, the request method and path, as well as the status code that was sent back as a response. While this isn’t the only parameter you can use with Morgan (you can also specifically [configure the info you want to log](https://www.npmjs.com/package/morgan/v/1.1.1)), “common” will usually be sufficient for your purposes.

If you try running the code above, then navigate to “localhost:8080/secreturl” in your browser, you should see a line logged to the terminal that looks like this:

`::1 - - [30/Nov/2018:05:43:09 +0000] "GET /secreturl HTTP/1.1" 200 51`

This somewhat complex mishmash of information is what Morgan returns as part of its “common” format console logging. It contains the date and time of the request (`[30/Nov/2018:05:43:09 +0000]`), the request method (`GET`), the URL path (`/secreturl`), the response code (`200`), as well as the number of characters of the response that was sent back (`51`).


> TIP!
> Appending Morgan logs to a file
> 
> const express = require('express'),
>   morgan = require('morgan'),
>   fs = require('fs'), // import built in node modules fs and path 
>   path = require('path');
> 
> const app = express();
> // create a write stream (in append mode)
> // a ‘log.txt’ file is created in root directory
> const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
> 
> // setup the logger
> app.use(morgan('combined', {stream: accessLogStream}));
> 
> app.get('/', (req, res) => {
>   res.send('Welcome to my app!');
> });
> 
> app.get('/secreturl', (req, res) => {
>   res.send('This is a secret url with super top-secret content.');
> });
> 
> app.listen(8080, () => {
>   console.log('Your app is listening on port 8080.');
> });
> 
> In the previous code, the node built-in modules ‘fs’ and ‘path’ are imported;fs.createWriteStream is used to create a write stream; and path.join appends it to a ‘log.txt’ file. You can view the logs from the this code by going to the created log.txt file in your root folder. For more information, check out fs.createWriteStream(path[, options]).


#### Resources Exposed by Web Servers

In general, web servers can “expose,” or provide access to, two types of resources—files and data. You should already be familiar with files, for instance, HTML files, CSS files, JavaScript files, JPEG files, MP3 files, and so on. When you type a URL into your browser (e.g., “[www.google.com](https://www.google.com/)”), the browser requests an HTML file from the server, which is then returned as a response (e.g., the Google homepage). Subsequently, the browser will request all the embedded resources within that HTML file, for instance, a linked CSS file, a linked JavaScript file, and any images within the document, all of which will be returned by the server and rendered accordingly.

In addition to exposing files, web servers can also expose raw data—encapsulated in formats such as JSON and XML—by way of an API, which is exactly what you’ll be doing in your Achievement project.

A second way to categorize resources, regardless of whether they’re “files” or “data,” is according to whether they’re static or dynamic. A static resource never changes, no matter who requests it or when. When you created your portfolio website in Intro to Frontend Development, for example, each page within it was a static resource. Take a look at the [Cartlidges Quality Meats](http://cartlidgesqualitymeats.com/) website. All the pages in this website are static. They have already been created once, and the same information will be served to anyone visiting the web pages.

A dynamic resource, on the other hand, is one that’s created at the time of its request. If you were to navigate to someone’s profile on LinkedIn at the URL “https://www.linkedin.com/in/david1111/”, the server would look into its database, pull up the data for the user “david1111,” then construct an HTML page on the fly from that data. This is how all websites with user-generated content are created. The content is stored as bits and pieces in a database until a request to the page is made, whereby the content is pieced together to create a complete and comprehensive page for the user to peruse.

Think about it—if your Facebook page was a static (rather than dynamic) resource, someone would need to be working around the clock, quickly coding an entirely new, unchanging HTML document each and every time you updated your profile or uploaded an image. Talk about an exercise in futility!


##### Serving Static Files

In Exercise 2.2: Node.js Modules, you wrote code to parse a URL using the `url` module, then read a corresponding file using the `fs` module, before sending back the content as a response. Express makes this process simpler. You already learned about the `res.sendFile()` function earlier in this Exercise. It can be used to return a static reply in response to a request. But what if you wanted to send many static files all at once, for instance, every file that needs to be loaded on a web page? You certainly wouldn’t want to write a separate `res.sendFile()` function for every single file. To do so would result in a long list of requests like this:


```js
app.get('/index.html', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});

app.get('/images/headerImage.jpg', (req, res) => {
  res.sendFile('public/images/headerImage.jpg', { root: __dirname });
});

app.get('/javascript/main.js', (req, res) => {
  res.sendFile('public/javascript/main.js', { root: __dirname });
});
```

Fortunately, Express provides a solution for this—the `express.static()` function:


```js
app.use(express.static('public'));
```

This function automatically routes all requests for static files to their corresponding files within a certain folder on the server (in this case, the “public” folder). With this function in place, if someone were to request, for instance, the “index.html” file, Express would automatically route that request to send back a response with the “public/index.html” file. Likewise, a request for “javascript/main.js” would be routed to send back the “public/javascript/main.js” file. This eliminates the need to manually  write out individual routes for each static file inside the public folder, saving you a lot of coding time.


> TIP!
> app.use(express.static('public')); is a shorthand for app.use('/', express.static('public')); This means that you can customize the URL/path at which you want to serve your static files, for example:
> 
> app.use('/myAwesomeStaticFiles', express.static('public'));
> 
> For a refresher on how to create a folder via the terminal, check out the Using the Terminal section of Exercise 2.1: Intro to Server Side Programming.

With the API you’re building for your Achievement project, your primary concern won’t be exposing static assets but, rather, data about movies and users. You’ll still, however, be able to use the `express.static()` function to expose the “documentation.html” page from your server—a cleaner solution than using modules, like you did in Exercise 2.2: Node.js Modules.

Although there are many effective [documentation generation tools](https://medium.com/technical-writing-is-easy/api-documentation-solutions-d3719af2780f), at this stage, writing your own documentation helps you learn how to explain your API better.


#### Error Handling in Express

As always in programming, it’s important to create code that can handle unanticipated errors. Fortunately, Express.js helps out again in this regard by allowing you to create “error-handling” middleware functions. They operate in the same way as other middleware functions barring one exception: they take four arguments instead of three (`err`, `req`, `res`, `next`). The first of these parameters, `err`, allows you to receive information about whatever unexpected error brought you to the current handler. For example, you could use the following:


```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

This code would execute every time an error occurs in your code (that hasn’t already been handled elsewhere). Information about the current error would be logged to the terminal using `err.stack`, which is a property of the `error` parameter for the middleware function. Error-handling middleware should always be defined last in a chain of middleware, after all other instances of `app.use()` and route calls (e.g., after `app.get()`, `app.post()`, etc.) but before `app.listen()`, for example:


```js
const bodyParser = require('body-parser'),
  methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
  // logic
});
```

You can check out the above code in this [errorHandling repl](https://repl.it/@CFCurriculum/errorHandling).

Even for something as small as the myFlix API that you’re building for your Achievement project, you should always incorporate an error-handling middleware function. It will work as a catch-all on the off-chance that something unexpectedly breaks in your code.


> TIP!
> Don’t worry if bodyParser and methodOverride in the code above are unfamiliar to you. You’ll be looking at them in the next Exercise!


#### Summary

Are you starting to feel like a backend developer yet? By this point, you’ve probably realized just how different server-side programming is from client-side programming. While you might be using the same language to write the code itself (JavaScript), the type of code and the thought processes you use to write it have been turned completely on their heads.

Don’t worry if you're not feeling entirely comfortable with things yet. There’s still plenty of time to keep practicing, and the more you learn about servers and Node.js, the easier it will become.

In this Exercise, you added yet another tool to your server-side toolkit: Express. Express is a bit like a simplifier for Node.js, allowing you to write shorter, more concise code and more easily send HTTP requests back and forth between client and server. This will come in handy for your myFlix API Achievement project.

In fact, in the next Exercise, you’ll be looking even more in-depth at a few common HTTP methods before using them to take your first big step towards completing your project. Before that, however, let’s make sure you have a good grasp on using Express.js and Morgan in the task!


#### Resources

If you’re curious to read more about the topics covered in this Exercise, then we recommend taking a look at the resources below. Note that this reading is optional and not required to complete the course.

Server-Side Web Frameworks:


- Overview of Server-Side Web Frameworks

Express:


- Express
- What are the Benefits of Express Over Plain Node.js?
- Installing Express
- Basic Routing in Express
- Routing in Express
- Writing Middleware For Use in Express Apps
- Using Template Engines With Express
- Serving Static Files in Express

Take the quiz to test your knowledge on this Exercise.


#### Task


- Direction
- Submission History

For this task, you’re going to refactor your code from Exercise 2.2 using the Express framework to handle some of the same functionality—not only routing HTTP requests but also logging and serving static files, just as you did with the HTTP, URL, and File System modules. Additionally, you’ll implement an error handler using Express.

Directions:

Step 1

Before you begin, make sure you have the correct folder structure and filenames in your project directory. Your project directory should, at this point, contain the following files (if you’re missing pieces, add them now using your terminal):


1. “index.js” (the main JavaScript file of your app; this is where you require your various modules and routes)
1. “package.json” (this is where all your installed modules are listed)
1. “package-lock.json” (this is where all your installed modules and their versions are listed)
1. “node_modules” folder (this is where all the individual folders for your modules are stored)
1. “public” folder containing a “documentation.html” file (this is where you will document your API)

![Folder structure displaying index.js and package.json files in Open Editors](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E4/figure6.png)


###### Figure 7

Step 2


1. Follow the instructions to require express in your “index.js” file.
1. Using the Express routing syntax discussed earlier in the Exercise, create an Express GET route located at the endpoint “/movies” that returns a JSON object containing data about your top 10 movies.
1. Create another GET route located at the endpoint “/” that returns a default textual response of your choosing.


Test this by running your project from the terminal and navigating to your URL endpoints in a browser. Make sure the correct data response is displayed.
1. Use express.static to serve your “documentation.html” file from the public folder (rather than using the http, url, and fs modules).


If you run your project from the terminal, you should be able to navigate to “localhost:[portnumber]/documentation.html”. Test that the correct file loads in your browser.
1. Use the Morgan middleware library to log all requests (instead of using the fs module to write to a text file).


Try navigating to a few pages in your browser and test that the correct information is logged to the terminal.
1. Create an error-handling middleware function that will log all application-level errors to the terminal.
1. Create a zip file of your project repository on your computer.
1. Upload the zip file and share the link to your repository here, then submit both items to your tutor for review. Feel free to share additional thoughts or ask questions along with your submission.

Rubric

Refer to the categories below to see how to meet the requirements of the approved stage

![](https://cdn.careerfoundry.com/assets/rubrics/not_yet-c9fb80e521507759d546f847f8a65a00c66f2c8ec7ece4e37f98c25aa122778c.svg)


- Submission doesn’t include a link to the GitHub repo or includes a GitHub repo not related to the project; OR
- GitHub repo has been submitted, but “index.js” is missing more than one of the required components (e.g., no GET routes have been created, “documentation.html” file is still being served via `http`, `url`, and `fs` modules, and no middleware functions have been created)

![](https://cdn.careerfoundry.com/assets/rubrics/almost_there-f4bb1c077a0a826e7d4e3ecb72859fc401d362d9bd49c0658f4fd85c4a047a87.svg)


- GitHub repo has been submitted, but “index.js” is missing one of the required components (e.g., not all GET routes have been created, “documentation.html” file is still being served via `http`, `url`, and `fs` modules, Morgan hasn’t been used to replace the `fs` module, no error-handling function); OR
- All required components are included in “index.js” but one or more errors exist in the code

![](https://cdn.careerfoundry.com/assets/rubrics/approved-7dfdcf59318cf52fcbd1333d8b71bf7a2bde35b6e0b753ac975349982495e0b4.svg)


- GitHub repo has been submitted complete with well-written, error-free “index.js” file that:
- Requires “express”;
- Contains 2 GET routes: one that returns a JSON object and one that returns a text response;
- Serves a “documentation.html” file using express.static;
- Logs all requests using Morgan; AND
- Contains an error-handling middleware function

Questions for this task

Student Submissions

Check out recently submitted work by other students to get an idea of what’s required for this Task:

EVALUATION COMPLETE

![](https://coach-courses-us.s3.amazonaws.com/users/photos/thumb/51945.jpg?1660008090)

Vivek Maskara

Sep 11, 2024 at 06:24 PM

Hi Oliver,

Thanks for submitting the assignment.

Great job on this submission. Nice job working with the Express web server. It's awesome to see you progressing quickly with the API development.

Things you did great:


- Added the correct folder structure asked in the assignment
- Used express to define your various endpoints, which are giving correct results if URL is visited
- Added static to serve documentation.html
- Added a middleware to catch the errors
- API is returning the list of movies.

Glad to see you get hands-on with creating APIs.

Checkout these resources for further reading:


- The Most Important Things to Log in Your Application Software
- Importance of Logging in Your Applications, Start Logging Today
- What is an API? A Simple, Non-Technical Explanation
- APIs 101—What Exactly is an API?

Great job!

Feel free to drop me a message if you have any follow up questions.

Best,
Vivek


- Plant 1
    Created with Sketch.
- Plant 2
    Created with Sketch.
- Plant 3
    Created with Sketch.
- Plant 4
    Created with Sketch.

Approved

![Lauren, Sarah, Korina, CareerFoundry Student Advisor](https://images.careerfoundry.com/public/team/student_advisors_july_2020.jpg)

Student Advisors

How was Vivek’s feedback throughout this exercise?

Does this feedback help you understand what you did well and how you can improve?

How motivated do you feel after receiving the feedback from your tutor/mentor?

Did your mentor or tutor respond within the expected timeframe? (24hrs for tutors; 48 hrs for mentors)

![](https://coach-courses-us.s3.amazonaws.com/users/photos/thumb/67730.jpg?1721412873)

Oliver Oliverio  Submitted Something for Task 2.4

Sep 11, 2024 at 05:34 PM

submitting task 2.4.  No link to upload zip file.  But github repo is up to date and completed for this task.


#### Forum

The Forum is a place to ask questions about the Exercise and share resources with other students. To share feedback on the Exercise content directly with the CareerFoundry team, please click on the “Give us feedback!” button at the end of the Exercise.


###### Help us improve this course! Please take a moment to answer some questions about this Exercise:

Is the instruction in this Exercise clear and straightforward?

How confident do you feel in your ability to apply the skills learned in this Exercise in the workplace?

How likely would you be to recommend the tools/resources provided in this Exercise to a friend or colleague?

Any comments you'd like to add?




- 
- Don't share with my mentor

AI Explain

Make note


#### Are you sure?

This will remove your upload from the submission


#### Feedback

Let us know what you think about this Exercise!


#### Thank you!

Your feedback ensures we can continue to make our courses the best they can be.


#### Sorry, an Error Occurred. Please Try Again.