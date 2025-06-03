

## Server-Side Programming & Node.js


# 2.2: Node.js Modules


- Learning Goals
- Introduction
- Node Modules
- Importing And Exporting Modules
- Built-In Node Modules
- HTTP Module (Web Server)
- Node.js Global Objects
- Node.js Debugger
- Summary
- Resources
- Task
- Forum


#### Learning Goals


- Use modules to complete tasks relevant to building an API, such as creating a web server and parsing a URL


#### Introduction

Hello again, and welcome to the second Exercise of Achievement 2, where you’ll dive deeper into Node.js, JavaScript’s backend runtime environment. In the previous Exercise, you were introduced to a few new tools you’ll be utilizing when working with server-side programming, as well as some basic but important commands for helping you navigate the terminal. Learning about multiple tools at the same time may feel a bit disjointed as there isn’t a great deal of context to tie everything together, but worry not—in this Exercise, things will start coming together. In fact, you can think of Node.js as the thread that will weave all these new tools and concepts into a full-stack development tapestry.

This Exercise will be your further induction into the world of Node.js, from learning what it is and how it works to its syntax and components. You'll be looking in particular at modules, which are the core to all of Node’s basic functionalities. Ready to go? Then, let’s get started!


#### Node Modules

Everything you can do in Node is dependent on a module. In fact, you could even say that modules are the “building blocks” of Node. A module contains a set of JavaScript files that include code for a specific purpose.

You should be fairly familiar with this concept of code-separation already. For instance, your CSS was kept in a different file than your HTML, and your JavaScript was kept in a different file than both of those. Separating your code into pieces like this makes it more readable and easy to maintain, as there’s no hunting through large files for a specific line of code. Instead, every chunk of code is divided up by purpose, which allows you to easily find and open the file for your specific needs.

This is the exact philosophy that Node modules are built on. Each Node module represents a very specific purpose, for instance, a module for creating a web server, a module for parsing URLs, and a module for interacting with file systems. You can “plug” these modules into your own app when you need them, much like the plug-and-play devices you can plug into your computer. A module in Node.js can be as small and simple as a single JavaScript file or as big and intricate as a whole set of JavaScript files (with the complex functionality to match), all of which can be reused throughout your app as many times as you want.

![Diagram of printers, scanners, and various storage devices plugged into a PC](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E2/Diagram%20of%20printers%2C%20scanners%20and%20various%20storage%20devices%20plugged%20into%20a%20computer.png)


###### Figure 1. Image source: Desk Decode


> Printers, scanners, monitors, speakers, cameras, and even storage devices can all be plugged into your computer or device when you need additional functionality. This is just like Node modules. When you need additional functionality in your app, you can import or “plug in” a module that has the functionality you need!

Another advantage to the module system is that each module has its own context, meaning it can’t interfere with other modules or pollute the global state. Remember back in Achievement 1 when you first learned about global/shared state?

In JavaScript, any variable declared outside of a function is a global variable, meaning that anything in the app can refer to and access it. Conversely, variables declared within functions are said to be local variables, meaning they only exist within that function and can’t be accessed from outside that function. The same concept applies here with Node modules: any variables declared within Node modules are only accessible within those same modules, so they won’t interfere or cause problems with any variables you’ve declared outside of the module (nor variables declared within other modules!).

Also, each module can be placed in a separate “.js” file within a separate folder to aid in the organization of your app (for example, an “account” folder to hold the balance, credit, and debit functions for a bank app).

There are three types of modules in Node.js:


- Built-In (Core) Modules: These are modules that come pre-compiled with Node.js. The purpose of built-in modules is to provide developers with often-occurring and repeating code sections that would, were they not available, be a tedious task to build anew. Some common built-in modules include HTTP, URL, EVENTS, and FILE SYSTEM.
- User-Defined (Local) Modules: User-defined modules are modules a developer creates for a specific purpose in their application. These are required when the built-in modules aren’t capable of fulfilling the functionality the developer desires.
- Third Party Modules: Third party (community-based) modules are modules created (usually) by other developers and are available to download and include in your application to provide functionality not available in the built-in modules. Popular modules include Express, Browserify, Mocha, Lodash, Nodemailer, Formidable, and ESLint.


> Check out W3Schools for a full list and details about all the different types of Node.js built-in modules.


#### Importing And Exporting Modules

Modules are like mini pieces of a whole JavaScript app, and they can include anything from functions to objects or even values (just like anything else written in JavaScript!). Before these functions, objects, or values can be used in your app, they need to be exported from the module. For instance, say you had a module for calculating sales tax—call it “salesTax.js.” Within that module is an actual function for calculating the sales tax, `calculateSalesTax()`. In order to use that function in your app, you’d need to first export `calculateSalesTax()` from the “salesTax.js” module.

Think of this a bit like baking a cake. The cake is made up of separate parts, for instance, the cake itself, as well as the frosting. You’ve got your kitchen set up and ready to go and you already know a little bit about cooking, but you need some help in the form of recipes, so you pull out your recipe book, Amazing Cake Recipes. You look through the book until you find what you want—a red velvet cake recipe for the cake and a cream cheese frosting recipe for the frosting—and you copy those from the book so they’re easier to use.

You then begin baking your cake, and whenever you need to refer to one of the recipes, you include them in your cake-baking routine. In this example, you represent the app (“main.js”), while the recipe book represents your module (“amazingCakeRecipes.js”), and the recipes themselves, which are within the recipe book file, represent the functions you’re exporting from the module (`redVelvetCakeRecipe()` and `creamCheeseFrosting()`) so that you can import them into your “main.js” app.

Within Node, there are two different ways of importing and exporting objects from your modules:


- require() and module.exports
- import and exports

The `require()` and `module.exports` pair is the original way of importing and exporting modules, while the `import` and `export` pair was introduced later in 2015 with ES6 as a new, easier way of importing and exporting modules. In this Exercise, you’ll mainly be focusing on the original pair—`require()` and `module.exports`, because everything you learn using ES5 will still work in ES6 — but we'll also look at the ES6 `import` and `export`. Let’s look at them in more detail.


##### Importing Modules with require()

The `require()` function is what allows you to add a module to your app. This is done in two steps. First, you need to pass the module you want to import into the `require()` function as its argument. Then, you set that whole function to a variable in your code (usually the same name as the module itself). Setting it as a variable allows you to easily access the module’s functions or objects using dot notation. Let’s look at an example.

Node comes with a built-in module called `os`, which stands for “operating system.” Within the `os` module are a variety of OS-related functions, for instance, a function for returning the type of operating system Node is currently being run on, a function for returning the hostname of the operating system, and a function for returning the CPU architecture of the operating system, among others. Let’s say, for the sake of example, you wanted to use the `type()` function to return the type of operating system. The first thing you’d need to do is require the `os` module, as that’s where the `type()` function is located. You’d pass the `os` module into `require()` and set it to a new variable, also called `os`. Then, you’d access the `type()` function within `os` via dot notation. Take a look below:


```js
const os = require('os');

console.log('type : ' + os.type());
```

As mentioned above, the first line of code is simply requiring the `os` module and setting it to a new variable, `os`. Always remember—a module must be required before you can use that module's functionality in your app. For lack of a better word, it’s required.

After the `require()` function, a `console.log()` function is called. Within that console.log is a string, `type :`, and the `type()` function, which is being accessed through the variable `os` via dot notation. When executed, this console.log would print the following to the console (if the current operating system was Linux):

`type : Linux`

You can check out the code example in the [()requireExample repl](https://repl.it/@CFCurriculum/requireExample).

Now, let’s take a look at a more complex example. Another commonly used built-in Node module is the `fs` module, which refers to the file system (you’ll be covering this in more detail later). Within this module is the `readFile()` function, which allows the app to, as you might expect, read a file.

Let’s say that you wanted to use the `readFile()` function to read a file called “file.txt” within your application folder. First, you’d need to require the `fs` module, as that’s where the `readFile()` function is located. To do so, you’d pass the `fs` module into `require()` and set it to a new variable, also called `fs`. Then, you’d access the `readFile()` function within the `fs` variable via dot notation (`fs.readFile`). This is illustrated in this [second ()requireExample repl](https://repl.it/@CFCurriculum/require2Example).

Just like in the previous example, the first line of code here is simply requiring the `fs` module and setting it to a new variable, `fs`. Next comes the code for using the `readFile()` function (which is inside the `fs` module). You start by specifying the new variable you just declared, `fs`, then use dot notation to use its function, `readFile()`. Within the parentheses that follow this are the arguments you’re passing onto the `readFile()` function. The arguments it expects are:


1. a path to the file you want to read (“./file.txt”)
1. additional options such as the character encoding set, which, in this case, is “utf-8”
1. a callback function that will be called once the file has been read

This callback function is necessary whenever you’re using the `readFile()` function in the `fs` module, as Node needs to be able to throw an error and terminate the function if the file can’t be read.

Now that you’ve seen the `require()` function in action, let’s quickly look at another point you need to be aware of when it comes to using it. The most important thing to remember is that the argument you include within your `require()` function needs to be formatted differently depending on the type of module you’re requiring.

For built-in modules and third party modules, the argument is simply the name of the module: `let module = require('module_name');` where “module_name” is the name of the built-in module. For example:


```js
const fs = require('fs');
```


> Note!
> While the format for requiring built-in modules and third party modules is the same, there is one difference between them you’ll want to be aware of; it's that third party modules must be installed first. You’ll be learning more about this in the next Exercise.

For user-defined modules, however, the argument needs to be the path of that module in the file system. For example:


```js
const myNodeModule = require('./my-node-module.js');
```

Always keep this in mind when writing your `require()` functions; otherwise they won’t work properly.

Now that you’ve taken a look at how you can import modules and their functionalities into your app, let’s switch gears and learn how to export functionalities from their modules (a requirement if you’re going to be using them). This is done via the `module.exports` statement. Let’s take a look!


##### Exporting with module.exports

The `module.exports` statement is used to export functions, objects, or primitive values from a module so that they can be used by other programs with the `require()` statement. This is sometimes referred to as “exposing” the function/object/value. If you think back to the cake analogy, this is the function that purchases your ingredients from the store so that you can use them in your batter and icing. You’re exporting the essential components you’ll need for the parts of your cake (i.e., your modules).

Let’s look at a concrete example. In this example, there are two files: “circles.js” and “main.js.” Let's assume that the following code would be located in the “circle.js” file, which would be included with your app:


```js
// circle.js
let PI = 3.14159265359;
module.exports.area = (radius) => Math.pow(radius, 2) * PI;
module.exports.circumference = (radius) => 2 * radius * PI;
```

In the code above, the area and circumference functions have been exported from the “circle.js” module via two `module.exports` statements. First, the variable PI is defined, but it’s only accessible within the “circle.js” module itself. As you can see in the code, it’s being used to help export the area and circumference functions.

Once these two functions have been exported by the statements above, they can then be “consumed”  via the `require()` function in another file. For instance, this is the code you could add to your “main.js” file:


```js
// main.js
const circle = require('./circle.js');

let r = 3;
console.log(`Circle with radius ${r} has
  area: ${circle.area(r)}
  circumference: ${circle.circumference(r)}`);
```


> Note!
> The backtick character (`) is another way to define strings. It allows you to directly inject expressions between ${ and } into a string without the need to concat using the + operator. Also, hitting Enter in the middle of the string will count as a new line (similar to if you’d included a \n). For instance, the following code:
>
> console.log(`Circle with radius ${r} has
>  area: ${circle.area(r)}
>  circumference: ${circle.circumference(r)}`);
>
> Is equivalent to:
>
> console.log('Circle with radius ' + r + ' has\n  area: ' + circle.area(r) + '\n  circumference: ' + circle.circumference(r));
>
> This is known as Template Strings or Template Literals.

The first line in the code above declares a variable, `circle`, then requires the “circle.js” module. This allows “main.js” to access any functions that were exported in the “circle.js” module, which, as you already know from above, are the area and circumference functions. Below that, it declares a new variable, r, which is set to the value 3, which it then plugs into both the area and circumference functions before printing the entire phrase to the console:


> Circle with radius 3 has
> area: 28.27433388231
> circumference: 18.849555921540002

One other important thing to note about the above code is that the module name (“circle.js”) was prefixed with a `./` within the `require()` function. This is because “circle.js” is a local file located in the same folder as the “main.js” file, and you need to use a relative path to point to it. You first learned about relative paths back in Intro to Frontend Development when linking between pages of your portfolio website. While you already took a look at the `../` notation for moving up a folder within a hierarchy, this single-dot `./` notation is probably new. The `./` notation is used when linking files in the same folder as the original file. Additionally, remember that when linking files two, three, or even four folders up from the original file, you can keep appending additional `../`s (e.g., `../../../circle.js`).


> Tip!
> Some things to keep in mind when using a relative path:
>
>
> Use./ notation when linking files in the same folder as the original file
> Use ../ notation for moving up a folder within a hierarchy
> Keep appending additional ../s when linking files two, three, or even four folders up from the original file

You can check out the code example in this [module.exports repl](https://repl.it/@CFCurriculum/moduleexports). Play around with the code until you're confident about importing and exporting modules with `require()` and `module.exports`.


> Note!
> If you don’t specify the file extension (i.e., if you simply used “circle” instead of “circle.js”), the first thing Node will try to resolve is a “.js” file. If it can’t find a “.js” file with that name, it will look for a “.json” file and parse it as a JSON text file. If neither of these are found, it will look for a binary “.node” file.
>
> Though Node has this system, it’s best practice to always specify a file extension when requiring anything other than “.js” files, as this helps to eliminate ambiguity.

Don't let this confuse you. Importing other modules into the file/module you’re working on (remember, a module is literally a JavaScript file!) doesn't mean that you can't export things from that same file. For example, say you wanted “main.js” to also export a random object. You could write the code as follows:


```js
// main.js
const circle = require('./circle.js');

let r = 3;
console.log(`Circle with radius ${r} has
  area: ${circle.area(r)}
  circumference: ${circle.circumference(r)}`);
module.exports.myAwesomeObject = {
  a: 1,
  b: 2
};
```

Here, not only has the “circle.js” module been imported, but an object has also been exported within the same file. Now, whenever you `require` the “main.js” module in another file/module, you’ll be importing an object that contains `myAwesomeObject` object.


##### Importing and Exporting with import and export

You've already looked at how to import and export modules using `require()` and `module.exports`. Thankfully, ES6 has introduced a different way of exporting and importing Node modules that makes everything quite a bit more straightforward: `import` and `export`.

The default statement of importing a module is:

`import {export1, export2} from "module-name";`

Here, the two “exports” refer to the exports to be imported, and “module-name” refers to the module to import from, which is often a relative or absolute path to the “.js” file containing that module.

Let’s take the same example from above where you created the "circle.js" file and export the `area` and `circumference` functions using `export` instead of `module.exports`:


```js
const PI = 3.14159265359;
export function area(radius) { return radius ** 2 * PI; }
export function circumference(radius) { return 2 * radius * PI; }
```

Here, the `export` keyword was used to export both functions. You can then import the module with the following:


```js
import { area, circumference } from "./circle.js";

let r = 3;

console.log(`Circle with radius ${r} has
  area: ${area(r)};
  circumference: ${circumference(r)}`);
```

One more thing to remember when working with ES6 modules is to let the browser know that you're using a module. To do so, create an "index.html" file and add the line `<script type="module" src="main.js"></script>`, assuming here that your ".js" file is named "main.js."

To see this in action, you can check out this [Import and Export repl](https://repl.it/@CFCurriculum/ImportAndExport).


##### Module Wrapper

The last thing you’ll want to look at before changing gears to the built-in modules themselves is the concept of wrapping. Before a module's code is executed, Node.js will wrap that code in a function wrapper, which looks like the following:


```js
(function (exports, require, module, __filename, __dirname) {
  // Your module code ...
});
```

Why is this? Well, as mentioned above, JavaScript developers should always do their best to avoid polluting the global state or using the same variables across their code. In JavaScript, any variables defined outside of a function have a global state. Too many global variables can lead to issues down the line, as they could possibly be overwritten or misconstrued (as opposed to local variables within functions that can’t be accessed or referred to outside of their functions). For instance, if you were to use a variable within a function that was created outside of that function, the value may not be what you expect.

Polluting the global state simply means declaring too many unnecessary global variables.  A module wrapper, which is an IIFE (Immediately Invoked Function Expression), helps with exactly this. It keeps local variables scoped to the module they originated from, which keeps them from polluting the global scope.

By wrapping your module, Node.js achieves a few things:


- It keeps top-level variables (defined with var, const, or let) scoped to the module rather than the global object.
- It provides a number of variables that seem global but that are actually specific to the module, such as:


The module and exports objects, which are used to export values from the module.
The variables __filename and __dirname, which contain the module's absolute filename and directory path.

The variables `__filename` and `__dirname` provide the full path to the current file and directory respectively and are already defined. The latter excludes the filename and only prints out the directory path; for instance, for the `./circle.js` module shown above, the `__filename` and `__dirname` could be something like this:


- __filename: “/User/adrian/code/circle.js”
- __dirname: “/User/adrian/code”

There’s nothing you need to do with the module wrapper—just know that it’s there and what it’s doing to your code!

With that, you should have a basic understanding of the built-in `require`, `module.exports`, `__filename`, and `__dirname` functions and objects. None of these will do you much good, though, without knowing about a few of the modules you’ll actually be able to use them with. It’s time to switch gears!


> Tip!
> You've learned a lot about Node modules and how to import and export them. Try to take a tea break or a short walk before starting the next section, where you'll get into built-in node modules.


#### Built-In Node Modules

At the beginning of this Exercise, you learned that Node comes with a number of built-in modules for expediting your development work. Below, you’ll explore a number of these built-in modules in more detail.

First, let’s do a quick review of callbacks. If you’ll remember from Achievement 1, callbacks are pieces of code that are called when something asynchronous happens (in other words, something outside the normal flow of the code). You learned earlier that Node runs asynchronously, so you can imagine the callback would be a fairly essential part of working with Node.

Think of a callback as the asynchronous version of a function—a function that’s only called when the server sends back a response. Using the restaurant example from the previous Exercise, a callback would be the instructions given to the waiter on what to do once the kitchen (server) has finished preparing food for a table.

Why is this so important? Because Node modules are entirely made up of different “callbacks,” or functions, you can use for interacting with the server in various ways. Let’s look into some of the most commonly used modules now: HTTP, file system, and URL.


#### HTTP Module (Web Server)

Node.js has a built-in module called HTTP, which can be used to create a web (HTTP) server that “listens” to server ports and gives a response back to the client. If you take a look at the diagram at the beginning of [Exercise 2.1: Introduction to Server-Side Programming](https://careerfoundry.com/en/steps/intro-to-server-side), the web server is within the second layer, called the Server layer, interacting with both the client and the business layer.


> Recap! What’s a Web Server?
>
> Web servers are computers that deliver (serve) web pages. They handle HTTP requests sent by the HTTP client (web browser on your computer) and return web pages in response. Web servers usually deliver HTML documents along with images, style sheets, and scripts. Every web server has an Internet Protocol (IP) address, as well as (usually) a domain name.
>
> Servers can also make their services available to the internet by way of ports (open doors that can be used to access a web server). Web clients can, therefore, connect to a specific service at a specific IP address and on a specific port.
>
> Think of this a bit like ordering take-out. You order the food to your home address, but depending on where you live, you may tell the delivery person to deliver the food to your back door, front door, a side door, or whichever “port” you desire.
>
> When you enter the URL "https://www.wellsfargo.com/index.html" in your browser, this sends a request to the “wellsfargo.com” web server. The server then fetches the specific page, “index.html,” and sends it to your browser via the port you specified.

The HTTP module allows Node.js to transfer data using the Hypertext Transfer Protocol (HTTP). As you learned back in your Intro to Frontend Development Course, HTTP is the underlying protocol used by the World Wide Web. It defines how messages are formatted and transmitted, as well as what actions web servers and browsers should take in response to various commands.

Below are the two most widely used HTTP methods. You already encountered them in the previous Achievement when you dove into HTTP methods.


- GET: This method is used to request information from a server. Typically, a server responds with content you can view on your browser (e.g., clicking a link to see the homepage of a site).
- POST: This method is used to send information to a server. The server may respond with an HTML page or redirect you to another page in the app once it’s processed your data (e.g., filling out and submitting a sign-up form).

HTTP is called a “stateless protocol” because each method (command) is executed independently, without any knowledge of the methods that came before it.

Now that you’re building your own app, you also need to have your own web server. You'll be running one locally on your own machine to respond to browser requests that route responses to and from files on your computer as you develop and work on the site functionality. Once you deploy your app, you'll use an external service to run your web server that points to versions of your files on a publicly accessed server so that other people (your users) can view and interact with your website.


##### Creating a Web Server using Node’s http Module

While your outward-facing app may be the most user-friendly app in the world and full of fancy bells and whistles, it won’t get very far without a web server keeping it chugging behind the scenes. In fact, without a web server, your app won’t even be able to connect to the internet!

As a recap from earlier, Node.js applications need to have at least three parts:


1. A server, which will listen for requests from the client.
1. Modules, which are functions you want to use in your app, for instance, JavaScript libraries such as Lodash.
1. Requests and responses, which travel back and forth between the client and the server.

In light of this, let’s take a look at how you can create your own simple web server using Node.js.

When creating a Node application, the first thing you’ll want to do is import the HTTP module. For this, you use the `require()` function you learned about above.

First, create a new file called “server.js”. Open it in your IDE and add the following code:


```js
const http = require('http');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello Node!\n');
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');
```

The first line of code creates a variable called `http`, then assigns to it an instance of the HTTP module. This is what imports the HTTP module and allows you to use its function `createServer()`.


> Var, Let & Const
> In ES5 and earlier versions of JS, var is used to specify a variable. It acts similar to let with the only difference being that var is scoped to the nearest function rather than the nearest block of code. This can lead to unexpected side effects, especially in longer functions. For example, you may create a variable to store the user’s name; then, in another block, you store their name and age. Maybe you even get tempted to use this variable to store something completely different, like a URL, in another block. To mitigate this side effect, ES6 introduced let and const.
>
> As you already know quite well by this point, you can use let to specify a variable. let is scoped to the nearest block, in other words, anything contained within curly braces, like a function, for-loop, if-block, or other similar constructions.
>
> In addition to let, there’s the const variable, which works like let in that it’s scoped to the nearest block, but differs in that it can’t be given a new value. It’s essentially a variable whose value can never change (hence its name “constant,” or const). If, for example, you set a username using const, you’d never be able to change that username again. Let’s take a look at an example:
>
> let a = 1;
> const b = 2;
> a = 3;
> b = 4; // Will throw an error!

Following this, the `createServer()` function is called on the new `http` variable you’ve created. Within this function is yet another function that has two arguments—`request` and `response`. This function will be called every time an HTTP request is made against that server, which is why it’s called the request handler.

![Diagram showing an HTTP request going from the user to the client to the server, and an HTTP response being returned from the server to the client to the user](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E2/Request%20handler.jpg)


###### Figure 2

Within this function are two additional lines of code: the first tells the server to add a header to the response it sends back (along with the HTTP code “200”), and the second ends the response and sends back the message “Hello Node!”

At the end of this function, the server is set to listen for requests on port 8080 using the `listen()` function. Port 80 is the standard port for HTTP, but you can use any number you want with the following caveat: the port number must be greater than 1024. This is because ports lower than this are reserved by the operating system.

![Color-coded diagram of the HTTP module being used to create a new web server running on port 8080.](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E2/Diagram%20of%20an%20HTTP%20module%20being%20used%20to%20create%20a%20new%20web%20server.png)


###### Figure 3

Every time an HTTP request hits the server, Node will call this request handler function to deal with the transaction, using the `request` argument as the request sent to the server and the `response` argument as the response the server returns. In order to do this, Node needs to be listening for a request, which is exactly what the `listen` method on the `server` object is doing. In most cases, all you'll need to pass to `listen` is the port number you want the server to listen on (which, in this case, is 8080).

Once you’ve added this code, save your “server.js” file and open your terminal. Your JavaScript file is ready to create the server, but first you need to execute the file using Node. Remember that to run your JavaScript file in Node, you need to type (in the terminal) `node` followed by the name of the file. Do so now with your “server.js” file, and you should see something similar to the following screens:

![Screenshot of both a code editor and the terminal open, with the “server.js” code visible in the code editor and being executed to create a new server in the terminal.](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E2/Atom%20displaying%20server.js%20code%20and%20terminal%20window%20executing%20code.png)


###### Figure 4

You’ll know right away if your file was executed successfully because of the console log you added: “My first Node test server is running on Port 8080.” If you see this below your `node server.js` command, it means your server should be up and running, so let’s go test it.

Head over to your browser and type the IP address for your new server, “http://127.0.0.1:8080/”, into the URL bar. (“127.0.0.1” is simply the loopback IP address of your computer. Here, you’re essentially creating a connection between your browser and your own computer server on the 8080 port.) Your browser should respond by displaying the following:

![Screenshot of the browser directed to 127.0.0.1:8080 and the words “Hello Node!” displayed on screen](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E2/Browser%20directing%20to%20IP%20address%20and%20screen%20displaying%20Hello%20Node.png)


###### Figure 5

On your screen, you should see the words “Hello Node!” This is because of the `response.end()` function you called at the end of your request handler. Seeing the words “Hello Node!” here means that the server heard your request and sent back a response.

In summary, the HTTP module can create an HTTP server that listens to server ports and transfers data over the Hypertext Transfer Protocol (HTTP). Creating a server is that easy! Pretty cool, right?


> TIP!
> You can also open a Node repl, require the http module const http = require('http');, then type http followed by a period and hit “TAB” to see the available functions of the http module.


##### URL Module

The next module you’ll want to be familiar with is the `url` module. The `url` module provides utilities for URL resolution and parsing; in other words, it splits up a web address (URL string) into readable parts. A URL string is a structured string containing multiple meaningful components (host, pathname, search). When parsed, a URL object is returned containing properties for each of these components.

Let’s look at an example:


```js
const url = require('url');
let addr = 'http://localhost:8080/default.html?year=2017&month=february';
let q = new URL(addr,  'http://localhost:8080');

console.log(q.host); // returns 'localhost:8080'
console.log(q.pathname); // returns '/default.html'
console.log(q.search); // returns '?year=2017&month=february'

let qdata = q.query; // returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); // returns 'february'
```

The first line of the code requires the `url` module (which is necessary no matter which module you’re using). It assigns the module to a variable called `url`. In the next line, a new variable is declared, `addr`, which is assigned a string. The string happens to be a URL. This is the URL you’re going to parse.

Following this is yet another new variable declaration. This variable, `q`, passes two arguments: `addr` (which is the URL) and `true` (don’t worry too much about this for now). It passes two arguments: `addr` (which is the URL) and `true` (don’t worry too much about this for now). This is what will do the actual parsing, but in order to see the results, you’ll need to create some console logs. The three console logs below each return a different part of the parsed URL: the host (`q.host`), the pathname (`q.pathname`), and the serialized portion (`q.search`), which is everything after the question mark in the URL.

While these console logs are great in that they let you see each part of the parsed URL, you won’t be able to actually do anything with that data. For this, you’ll need to declare another variable, which is what happens another line down. Here, a new variable, `qdata`, is declared. Then, it’s assigned the `query` function off of the `q` variable. This returns a formatted object with the year and month included in the URL (`{ year: '2017', month: 'february' }`), which allows you to specifically target the month in the following console log (`qdata.month`).


> TIP!
> Note that query values are always strings. Even the year 2017 from the example will be a string. In order to do math operations with query values, you first need to convert them to numbers with parseInt().

Every request to a web server is made via URL. This is why the `url` module is so essential. In order for your API to understand what’s being requested, it needs to be able to parse the URL and use the information inside of it to “read” the request and conduct the appropriate response in return.

The example shown above used a static URL, but most of the time, you’ll want your API to be parsing user-generated URLs (e.g., a URL typed into the browser bar or a URL generated via a request made from an app). In these cases, you can use the `request.url` property to grab the URL straight from the request object itself. The syntax for this would be largely the same as above, only, instead of a static URL being assigned to the `addr` variable, you’d assign the `request.url` property:


```js
let addr = request.url;
let q = new URL(addr,  'http://localhost:8080');
```

Note that `request.url` is only available within the `http` module, which means you’ll need to start combining modules in order to use it (in this instance, `http` with the `URL` class from the [WHATWG URL API](https://nodejs.org/api/url.html#the-whatwg-url-api)). You’ll learn more about combining modules later on in this Exercise.


##### File System Module

The next module is the `fs`, or file system, module that was introduced earlier as an example in the `require` and `import` sections. It takes the following syntax:


```js
const fs = require("fs");

fs.readFile('input.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('File content: ' + data.toString());
});
```

The file system module is one of the most important modules when it comes to Node as it involves managing file input and output. Its functions come in both synchronous and asynchronous versions; you should always use the asynchronous version in your code so as to not block the rest of your code from executing. The first parameter of the module is for detecting errors, while the second parameter is for the successful completion of the module.

Then, the callback function passes two additional arguments, `err` and `data`, where `err` is an error object and `data` is the contents of the file. The callback first checks if an error object has been defined, which only happens if `readFile()` experiences a problem locating or reading the “file.txt” file. If an error object has been defined, the function “throws” an exception. This `throw err;` immediately stops the execution of the current function (i.e., the statements after `throw` won't be executed), and the program terminates.

While there are many functions in the file system module, the most important ones include the following (asynchronous) functions:


- open() // Opens a file
- close() // Closes a file
- update() // Updates a file
- truncated() // Truncates (clears) a file
- read() // Reads the content of a file
- write() // Writes content to a file
- rename() // Renames a file
- appendFile() // Appends something to a file's content rather than overwriting it


##### Using Multiple Modules in the Same File

So far, you’ve used each of these modules one at a time, but like the cake example from earlier, you don’t need just frosting or cake, you need both. You need the `url` module to parse the typed URL from the user, and the `fs` module to return the appropriate file as a response. These modules can be stacked at the top of your file. For instance, say you have a “documentation.html” file on your server that you want to serve to users that send a request to the “/documentation” URL. You could use the following code:


```js
const http = require('http'),
  fs = require('fs'),
  url = require('url');
```

The first thing to do is the variable declarations at the top. This is a great shortcut to quickly set up multiple variables at once. All you have to do is give the kind of variable you want (`let`/`const`/`var`), then use commas and new lines to delineate each individual variable you want to declare. Be sure to include a semicolon at the end!


```js
http.createServer((request, response) => {
  let addr = request.url,
    q = new URL(addr, 'http://localhost:8080'),
    filePath = '';
```

After the variable declarations comes the server creation. The `http` module is being used here to create a new server (refer back to the section on `http` if you need a refresher), but within this, you’ll notice a few new extra things, as well. First, a new variable `addr` has been declared, which has been assigned the function `request.url`. Remember from above that using `request.url` allows you to get the URL from the request (which, in this case, is the first argument of the `createServer()` function: `http.createServer((request, response)`.

After this, the `new URL` class is being used on the new `addr` variable, and the results of that are being set to a new variable, `q`. On the next line, a new variable, `filePath` is declared, but it's set to an empty string. This will be where you store the path of the file; however, right now, it's just acting as an empty container, as you'll be piecing the file path together and placing it in your empty variable in the next `if-else` statement.


```js
if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

}).listen(8080);
console.log('My test server is running on Port 8080.');
```

Jump to that `if-else` statement now. The first thing you'll see is the statement that checks what the exact pathname of the entered URL is: `q.pathname.includes('documentation')`. Remember that `q` is where you stored the parsed URL from your user. Here, dot notation is being used to access the `pathname` of `q`. (The pathname is the part that comes immediately after the first “/” in the URL, for instance: “http://localhost.8080/students”.) After this, you'll see a new function, `includes()`. This function does what you might expect—returning whether or not a variable includes a specific value or string. In this case, `includes()` is being used to check whether the `pathname` of `q` (the URL) includes the words “documentation”. If it does, it pieces together `__dirname` and “/documentation.html”, adding them as a complete path name to the currently empty `filePath` variable you already declared. Remember that `__dirname` is a module-specific variable that provides the path to the current directory. This simply ensures that the file path is complete and accurate.

If `pathname` doesn't include “documentation”, the `if-else` statement returns “index.html” instead, given that it exists. This ensures that, if the user makes a request to a URL that doesn't exist on your server, they'll simply be returned to your main page.

But the code isn’t done yet! After fetching and parsing the URL, it’s time to bring the file system module into play. The `fs` module uses its `readfile()` function (again, accessed via dot notation) to grab the appropriate file from the server. How does it know which file to grab? Because the first argument given to it is the `filePath` variable with the full pathname of the URL you fetched and parsed! In this way, you used the `http` module to set up the server, the `url` module to grab and read a URL request sent by the user, then the `fs` module to send back the appropriate file.

For instance, say a user of your transport app wanted to download the schedule for the trains in their area. They’d press a button on the app, which would create an HTTP `GET` request. This request would be in the form of a URL, probably something like “http://localhost:8080/chicago_train_schedule/”. Behind the scenes, the `url` module would read this URL and grab the “chicago_train_schedule” part at the end, which it would hand over to the `fs` module. The `fs` module would grab the corresponding file for “chicago_train_schedule” and send it back to the user, who would be able to download and view it.

It’s always good practice to have a log of recent requests made to your server. This can be helpful in so many ways, for instance, it can be used to debug your code, track the most visited URLs, and more. Go ahead and create an empty text file (e.g., “log.txt”) in your project folder. You’ll be populating this file dynamically through the code. Whenever a request is made to the server, you’ll add the visited URL, as well as the timestamp at which the request was received:


```js
const http = require('http'),
  fs = require('fs'),
  url = require('url');

http.createServer((request, response) => {
  let addr = request.url,
    q = new URL(addr, 'http://' + request.headers.host),
    filePath = '';

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });

  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

}).listen(8080);
console.log('My test server is running on Port 8080.');
```

All you have to do is use the `appendFile()` method of the `fs` module. The `appendFile();` function takes three arguments: the file name in which you want to append your new information, the new information to be appended, and an error-handling function. Above, you can see that the file name is “log.txt”. This means that the new information you're including in the second argument will be appended at the end of the “log.txt” file. If you look at the second argument, you'll see the information that's being appended: a log of the URL that was entered and the time that the request was made. This is done above by piecing together strings with variables. The `addr` variable would be the URL that the user entered (note in the next section where `let addr = request.url` is used to get the request URL), while the `new Date()` function grabs the current time.

You might notice that when testing the code, then make any request using the browser to `http://localhost:8080`, the server will add two entries for each time, one for the actual request, while the other is an automated request done by the browser itself trying to fetch the favicon which is currently absent from your project (favicon is the icons which appears next to the title in the browser's tab), nothing to worry about here, this is just the default behaviour for many browsers.


> TIP!
> You can use the \n character within a string to quickly and easily create a line break within that string. In the code above, for instance, a line break is added between the URL and timestamp logs, and two line breaks are added at the end. This will make your log file much easier to read, as all the logged URL requests won't be on the same line!

Don’t worry if all of that still sounds like a lot of different things you don’t know yet—the rest of this Achievement will be devoted to creating that entire behind-the-scenes process (including a lot more about URL requests and how to handle them)! For now, just know that the `url` and `fs` modules can be used in this way to read and respond to URL requests on the server.


> You’ll notice there isn’t much in the way of error-handling in the code above. This is because the focus was on using the http, url, and fs modules rather than creating an effective error-handling system. In a real-world scenario, you’d want to return a missing page warning—the infamous 404 error code—if the file requested wasn’t found. You’ll be learning more about how to do this in a later Exercise!


##### Choosing Modules

You should now be familiar with the three most common built-in Node modules: `http`, `url`, and `fs`. Of course, there are many other Node modules out there—some of which will come in handy for your Achievement project. This list of [20 Essential Node Modules](https://www.creativebloq.com/features/20-nodejs-modules-you-need-to-know) is a great place to start expanding your knowledge. Another way to find relevant modules quickly without having to scour through long lists of modules is to simply do a web search related to what you want to do with the words “node module” tacked on.

When it comes to choosing modules to work with, you need to think of the function you want to perform. If one of the built-in modules works with your function and purpose, use that. If none of the built-in modules or third party modules match your use case, you’ll need to build your own. To walk through an example, check out this [tutorial on creating Node modules](https://docs.npmjs.com/getting-started/creating-node-modules).

Now that you’ve learned some of the key modules you’ll be using in your own Node applications, let’s take a look at two other crucial components of Node: global objects and the Node.js Debugger.


> It’s time for another tea break. Try to take a short rest before moving onto the final sections.


#### Node.js Global Objects

Node.js global objects are available to all Node modules (built-in or custom). They don’t need to be explicitly included in your application; rather, you can use them directly. These objects are modules, functions, strings, and objects themselves, as explained below.

The objects listed here are specific to Node.js. There are a number of [built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) that are part of the JavaScript language itself, which are also globally accessible to Node modules.


- Buffer
- clearImmediate()
- clearInterval()
- clearTimeout()
- console
- global
- process
- setImmediate()
- setInterval()
- setTimeout()

The above objects are available in all Node modules (global). The following variables (which have already been discussed), however, are not (though they appear to be). They exist only in the scope of modules:


- __dirname
- __filename
- exports
- module
- require()


> Try It!
> To get the hang of what each of these objects are for, try them out on a test file in your repl. For example, you can try the Buffer global object with the code below to import ‘buffer’, and log the content of the buffer array to the console.
>
> import { Buffer } from 'buffer';

const bufs = Buffer.from([1, 2, 3, 4]);

for (const buf of bufs) {
  console.log(buf);
}
```


#### Node.js Debugger

Node.js provides a built-in non-graphic debugging tool that can be used on all platforms. It provides different commands for debugging Node.js applications, which are accessible via a [V8 Inspector](https://nodejs.org/docs/latest-v9.x/api/debugger.html#debugger_v8_inspector_integration_for_node_js), as well as a built-in debugging client. While the built-in Node.js debugging client isn’t a full-fledged debugger, simple step and inspection are both possible (much like you did in Exercise 1.9).


> Recap: What’s Debugging?
> As a developer, you don’t want bugs in your code. Bugs are unplanned quirks that simply “happen” within your code, usually to the detriment of your app. The most difficult (and most frustrating) part of dealing with bugs is figuring out why they’re occurring. This is known as debugging.

Debugging tools (usually called “debuggers”) help developers identify and fix bugs that pop up in their code. They run the code, reproducing the conditions under which the bug first occurred. Then, when the bug occurs again, they stop the execution of the code in its tracks. Some debuggers can go in from here and analyze the code in this “paused state” to determine the cause of the error. Other less robust debuggers require the developer themselves to go in and search the code for the error. Either way, this ability to view the state of the code at the exact time of the error makes it much easier to locate and solve bugs.

To start the Node.js Debugger, launch Node.js in the terminal, then use the `inspect` argument followed by the path to your JavaScript file:


```js
node inspect myscript.js
```

The `inspect` argument is the built-in argument for the debugger. You can use it whenever you want to debug a file. Once the debugger has launched, you should see the confirmation “Debugger attached” followed by the code included in your file. At the end, you’ll see the prompt `debug>`, which will let you type further debugging commands.

![Screenshot of the Terminal with the node inspect command being used on the test.js file and the resulting debug code popping up](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E2/Terminal%20with%20node%20inspect%20command%20being%20used.png)


###### Figure 6

You can also use the `debugger;` statement. Adding `debugger;` directly into the code in a file will enable a breakpoint (an intentional stopping or pausing place in a program) at that position in the code:


```js
setTimeout(() => {
  debugger; // execution will pause on this line

  console.log('world');
}, 1000);

console.log('hello');
```

The `next` command steps to the next line; the `cont` continues execution; the `step` steps in; the `out` steps out; and the `pause` command pauses running code. Hitting “Enter” without typing a command will repeat the previous debugger command. Type `help` to see what other commands are available or see the full [list of debugger commands](https://nodejs.org/docs/latest-v9.x/api/debugger.html) on the Node.js website.


#### Summary

Whew! That was a lot to cover in one Exercise. You took an in-depth look at how you can use different Node modules—`http`, `url`, and `fs`—to complete a number of tasks relevant to server-side development. For example, you learned how to create a web server using the HTTP module. You also took a close look at the specific syntax needed for using different Node modules in a server-side JavaScript project. If you’re still feeling a bit uneasy about Node, take some time to review the Exercise, reach out to your Tutor, and check out the links in the resource section.

Get ready to switch gears slightly in the next Exercise as you shift your focus to packages and package managers, which will be an important component of your student project for this Achievement. For now, though, let’s practice what you’ve learned by using some of the modules you explored in this Exercise.


#### Resources

If you’re curious to read more about the topics covered in this Exercise, then we recommend taking a look at the resources below. Note that this reading is optional and not required to complete the course.

Node Documentation and Community:


- Node.js Official Website
- Node.js GitHub
- Node.js Community Conference

Template Strings in JavaScript:


- Template Strings

Using Node Modules:


- Node.js Built-In Modules
- JavaScript Transpilers: What They Are and Why We Need Them
- A Simple Intro to JavaScript Imports and Exports
- JavaScript Import Statements
- JavaScript — WTF is ES6, ES8, ES2017, ECMAScript…?
- 20 Essential Node.js Modules
- Creating Node.js Modules
- Standard Built-In Objects
- Node.js Debugger: V8 Inspector
- Node.js Debugger Documentation
- The Difference Between Module.Exports and Exports
- Building a Node.js Server: Breakdown
- Using the HTTP, URL, and File System Modules Together

Take the quiz to test your knowledge on this Exercise.


#### Task


- Direction
- Submission History

In this task, you’ll use built-in Node modules to perform various tasks for your project. You’ll be using and combining the `http`, `url`, and `fs` modules to return files to the user and log requests.

Directions:


1. Using the terminal, create a “documentation.html” file within your “movie_api” directory. This will contain instructions for other developers on how to use the API you’re building. You can add whatever instructions you think might be helpful, and you'll continue to update this document as you go along. For now, let’s include a title for your API, as well as a basic intro paragraph on what the API does. You can refer back to the Achievement 2 project brief (PDF) at this stage as needed.
1. Within your project directory, create a “server.js” file that imports the http module and listens for requests on port 8080.
1. Now, import the url module at the top of your “server.js” file.
1. For incoming requests, parse the request.url to determine if the URL contains the word “documentation” (request is one of the objects passed to createServer's callback function; it contains the request data, such as the requested URL). If it does, return the “documentation.html” file to the user; otherwise return the “index.html” file. For a real-time glance at what this should look like, refer to this GIF demonstrating how to start up the server and navigate to different pages.
1. Create a “log.txt” file in your project directory.
1. For all requests coming in to your “server.js” file, use the fs module to log both the request URL and a timestamp to the “log.txt” file. For another demonstration of what this should look like, refer to this GIF of checking the log file after navigating to each page.
1. Your “movie-api” project directory should have the following:


A “test.js” file
A “index.html” file
A “documentation.html” file
A “server.js” file. It imports the http module, the fs module and the url module
A “log.txt” file
1. Open GitHub and create a new repository for your project.
1. Push your local project directory to GitHub. For help with how to do this using the terminal, check out GitHub Help: Adding an Existing Project Using the Command Line.
1. Open your GitHub repo in your browser to check that it correctly reflects the work you did in this Task.
1. Create a zip file of your project repository on your computer.
1. Upload the zip file and share the link to your repository here, then submit both items to your tutor for review. Feel free to share additional thoughts or ask questions along with your submission.

Rubric

Refer to the categories below to see how to meet the requirements of the approved stage

![](https://cdn.careerfoundry.com/assets/rubrics/not_yet-c9fb80e521507759d546f847f8a65a00c66f2c8ec7ece4e37f98c25aa122778c.svg)


- Submission doesn’t include a link to the GitHub repo or includes a GitHub repo not related to the project; OR
- Submission is missing one or more of the required documents-“server.js”, “documentation.html,” “log.txt”; OR
- Submission includes a “server.js” file but  is missing one or more of the imported modules (http, url, fs); OR
- Submission includes a “documentation.html” file but it is empty or missing a title or basic description of the API

![](https://cdn.careerfoundry.com/assets/rubrics/almost_there-f4bb1c077a0a826e7d4e3ecb72859fc401d362d9bd49c0658f4fd85c4a047a87.svg)


- Submission includes all the relevant files but the code has syntax errors or doesn’t return the desired response to the user; OR
- The desired response is sent to the user but the “log.txt” file is missing the URL or timestamp (or both)

![](https://cdn.careerfoundry.com/assets/rubrics/approved-7dfdcf59318cf52fcbd1333d8b71bf7a2bde35b6e0b753ac975349982495e0b4.svg)


- Submission includes all of the following:
- A “server.js” file with the correct imported modules (http, url, fs) that is free of code errors and returns the desired responses
- A “documentation.html” file with a brief description of the API
- A “log.txt” file that includes the requested URL and timestamp

Questions for this task

Student Submissions

Check out recently submitted work by other students to get an idea of what’s required for this Task:

EVALUATION COMPLETE

![](https://coach-courses-us.s3.amazonaws.com/users/photos/thumb/51945.jpg?1660008090)

Vivek Maskara

Sep 03, 2024 at 10:25 PM

Hi Oliver,

Thanks for submitting the assignment.

The project setup looks great and meets all the requirements of the task. Nice job setting up the NodeJS repo.

Things you did great:


- Created server.js file with the right configurations.
- Added log.txt file with timestamp and URL details.
- Added documentation.html file with a detailed description of the API.

As you progress further with the NodeJS app development, you will learn more about wrting REST APIs and integrating it with MongoDB database. I am sure you will enjoy working through this Achievement.

Checkout these resources for further reading:


- Node.js CodePens
- Glitch
- GSA Example API Docs

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

Oliver Oliverio  Submitted Something for Task 2.2

Sep 03, 2024 at 06:18 PM

submitting task 2.2.  There's no link to upload zip file...


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