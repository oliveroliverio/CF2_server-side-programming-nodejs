
## Server-Side Programming & Node.js


# 2.1: Intro to Server-Side Programming


- Learning Goals
- Introduction
- Client-Side vs. Server-Side Programming
- Your Achievement Project: Building an API
- What is Node?
- Features of Node
- Node In Use
- Setting Up Your Development Environment
- Using the Terminal
- Installing Node
- Summary
- Resources
- Task
- Forum


#### Learning Goals


- Explain the difference between server-side and client-side development
- Navigate the terminal with basic commands
- Prepare your developer environment for programming using Node.js


#### Introduction

Welcome to the second Achievement of your Immersion course—an introduction to server-side programming! From creating a portfolio website in your Intro to Frontend Development course to coding a JavaScript application with an external API in the previous Achievement, you’ve already come a long way, and coding in general should feel a bit more natural to your fingers. You spent a lot of time on the client-side of JavaScript in the previous Achievement; now it’s time to dive even deeper and see just what it can do on the server-side of things.

By the same token, you’ll also be going one step further for your next Achievement project—from simply using an external API to building one from scratch, all by yourself. To do so, you’ll need to be well-versed in Node.js, Express, data storage and security, authentication, and authorization, each of which you’ll be learning in detail in this Achievement.

As server-side programming is considerably different to client-side, you’ll spend this first Exercise going over a new tool you’ll need to be familiar with—the terminal—as well as how to work with commands when working on server-side projects. You’ll also take your first look at Node.js, the environment you’ll be using to create your Achievement project. Ready to get started? Then, let’s see what server-side programming is all about!


> TIP!
>   Throughout this Exercise (and throughout the rest of this Achievement), you’ll see numerous screenshots demonstrating the concepts you'll need to learn and the tasks you’ll need to do as you master server-side programming. As you likely already know, programs display differently depending on the version being used and the operating system they're being used on, which means there will likely be variations between the screenshots and what you see on your own screen. Don’t be alarmed! The differences are usually very minor, and you can always go to your tutor if a certain step or function is giving you trouble.


#### Client-Side vs. Server-Side Programming

In the previous Achievement, you learned how you can use JavaScript to run code directly in the browser, which is known as client-side (frontend) development. In this Achievement, however, the focus will be on running JavaScript code “behind the scenes” on a server (backend). How much influence does the location have when it comes to development? Quite a bit, actually. Client-side and server-side programming are used for two vastly different purposes, with client-side code being used for user interaction (pressing a button, displaying a notification, etc.) and server-side code being used for server interaction (resource requests, data loading, etc).

A good way to look at your website or application is as though it were a supermarket. There’s the customer area of a supermarket, which is readily visible to everyone, and the employee area of a supermarket, to which only the staff are privy. What would be in the customer area? Shelves? Products? Cashiers? All of this represents the “customer side.” What would be in the employee area? A break room? Shelves of unboxed products? Offices? All of this would represent the “employee side.” Now, think back to web development. The images, text, forms, links, and everything else a user sees and interacts with in their browser make up the “client-side” of web development, while the parts they don't see, such as the database and business logic, make up the “server-side,” just like in a supermarket.

![Diagram of the relationship between client machine, server, and database, when an HTML request is being made](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E1/server_request_diagram.jpg)


###### Figure 1

“Server-side” is the general name for any operations that run on a server, usually generating content for web pages or an API. These can include tasks such as:


- Interacting with databases
- Interacting with files
- Interacting with other servers
- Structuring web applications
- Compiling web pages
- Processing user requests
- Analyzing data
- Communicating with users or administrators through a variety of means (email, SMS, etc.)

Server-side code can be written in any number of programming languages. Examples of popular server-side web languages include PHP, Python, Ruby, Scala, C# (pronounced C sharp), Java, and JavaScript (Node.js). All of these coding languages have full access to the server’s operating system, but it’s up to the developer to choose which one (and which version) they want to use, usually based on their own experience and skill in a language or the requirements of the project itself. In this Achievement, you’ll be focusing on using JavaScript and Node.js.


#### Your Achievement Project: Building an API

In order to master server-side programming throughout this Achievement, you’ll be building your own API (Application Programming Interface) from scratch to be used with a movie database app called “myFlix.”


##### Web Application Architecture

Before diving into APIs in more detail, let’s quickly take a look at the architecture of a complete web application to better demonstrate exactly what you’ll be building for your project, as well as how each component is related.

![Template showing the four layers of a web app, in order from client, to server, to business layer, to data layer. Under the client layer are: mobile browser, web browser, and application. Under the server layer is: web server. Under the business layer are: application and file system. Under the data layer are: database and external system.](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E1/web_app_four_layers_template.jpg)


###### Figure 2

Web app architecture is generally divided into four layers—the client layer, the server layer, the business logic layer, and the data layer.


- The client is what actually does the requesting. Usually, this is a device of some sort, for instance, your browser, laptop, or phone. It could also be a TV or app that lives in your car console. The requests made by the client usually follow a web protocol (HTTP/HTTPS, WS, FTP, etc.).
- The (web) server processes the request. The server will acknowledge that a request has been made, then wait for a response to send back to the client. For instance, say the client asks for a list of movies containing one particular actor. It does so by sending a request to the URL endpoint “http://myapi.com/movies/actor-name.” When the web server receives this URL, it understands that it’s an HTTP request, so it “forwards” it to the business logic layer.
- The business logic layer accepts requests from the web server and returns the necessary information back to the client (also via the web server). When the web server sends it the URL “http://myapi.com/movies/actor-name,” the business logic layer understands that the client is asking for movies with a particular actor and checks the database for the corresponding data. When it hears back from the database, the business logic layer either formats an HTML page with the results, or sends back the raw data to the client (via the web server). Fundamentally, this layer is what translates code between your application and your database using models.
- The data layer is generally the database. In some cases, it may be a file or another source of data, but for web applications, it’s almost always a database. The data layer’s sole job is to store and return data. It receives queries from the business logic layer that are written in a language it can read, then responds with the data that matches the query.

While each of these layers is separate and distinct, they each provide something in the chain that the others rely on and translate back. It’s a bit like ordering pizza over the phone. You start by dialing the pizza place (client layer). There, someone answers the phone and takes down your order (server layer). The order gets handed off to the kitchen, where it’s processed by the chefs (business logic layer). The chefs need to grab the requested ingredients for the pizza from their storage (data layer). The ingredients are given to the chefs, who build your pizza and send it back to the front of the store for delivery. The person who answered the phone (server layer) is also the person who brings your food to you (completing the client request with a response).

Generally speaking, the web server layer, business logic layer, and data layer are all considered to be on the server-side or backend. The web server and business logic layer are also sometimes combined into one, so the names might be used interchangeably. Remember that the client-side is anything related to the device/browser that an end user is interacting with, whereas the server-side is anything that isn’t the client (e.g., processing requests, gathering data, returning something to the client, etc.).


##### myFlix Application

For your Achievement project, you’ll be working on the three layers that make up the backend of an application as you build your API: the web server, business logic, and data layers. Once you’ve completed the backend for your project in this Achievement, you’ll move onto building the client layer in Achievement 3, where you’ll be exploring frontend frameworks. By the end of both Achievements, you’ll have an entire web application to show off in your portfolio. That’s quite the feat!

Let’s begin by looking at a few details to get you started on this Achievement’s project in particular. It will be an API for an app called “myFlix” in which users can search for and save information about movies. Movie and user data will be stored in a database (MongoDB), and access to that data will be provided via a REST API (also known as a “RESTful API”). You’ll be building this API using a combination of Node.js and Express.

Before moving on, go ahead and download the project brief. Though you won’t understand everything on it just yet, it can act as a convenient reference as you work through each of the Tasks in this Achievement of the course.


> Download your Achievement 2 project brief (PDF)

Note that there’s an element of flexibility in how you approach the brief. For example, you may want to focus on a particular type of movie (such as period films or superhero movies), and you’re free to name your project whatever you choose (you don’t have to call it “myFlix”). The important thing is making sure the functionality required in the brief is reflected in your project. If you have any questions about this, feel free to reach out to your mentor!

In Achievement 3, you’ll build the client-side for your application using a JavaScript UI library called React. Remember how certain languages and frameworks can come together to form a tech stack? For these two Achievements, you’ll be using the “MERN” stack popular amongst JavaScript developers (i.e., MongoDB, Express, React, and Node.js) to create your entire project!


##### What is an API?

In order to complete your project in this Achievement, you’ll need to take a more in-depth look at APIs—what they are, how they work, and the many components required to build them. You’ll cover most of this incrementally as you work through the Achievement and begin to define the components of your own API, but let’s take a quick glance at APIs now to give you a better idea as to what exactly you’ll be building.

An API (Application Programming Interface) is a set of communication protocols that allow one software system to plug into (receive information or use functionality from) another. While they can exist for any system, the one you’ll be building specifically uses the web to communicate, making it what’s called a web service.

REST(ful) APIs are built according to REST architecture. Don’t worry too much about this now as you’ll be learning all about REST and RESTful architecture later on in this Achievement. For now, just know that a REST API uses HTTP requests to receive, send, create, and delete data or files. In other words, via a REST API, a client is able to make changes to or access data from a database they otherwise don’t have access to.

Let’s take a look at an example. Here are some of the requests included in the Foursquare API:

![List of request methods and URL endpoints for requesting data about venues via the Foursquare API](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E1/Foursquare%20API%20requests.png)


###### Figure 3

The above table lists, describes, and provides the endpoint URL (e.g., “/details”, “/photos”, “/tips”, etc.) for each of the methods that can be used with the Foursquare API to request data and/or resources from Foursquare itself, for example, venue details, venue opening hours, and venue photos. This would be incredibly useful if you were a developer hoping to create an app that could interact with Foursquare. For instance, say you wanted to create a vacation planning app that can access and interact with Foursquare data to help users schedule meals out during a vacation. You could use the Foursquare API to send HTTP requests directly from your application to Foursquare, allowing your app to get data from Foursquare on different venues.

Note that these aren’t all the endpoints in the Foursquare API—only a small handful specifically related to receiving data about different venues. Other endpoints include those for posting information about venues, adding a new venue (“/add”), or posting pictures of a venue (“/photos/add”). You can check out the complete list of endpoints in the [Foursquare API official documentation](https://developer.foursquare.com/reference/api-explorer-overview).

Now, let’s take a look at another example: the [Google Calendar API](https://developers.google.com/calendar/v3/reference/).

![List of request methods and URL endpoints for interacting with the Google Calendar API to update users’ calendars](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E1/Google%20Calendar%20API%20request%20methods%20and%20URL%20endpoints.png)


###### Figure 4

The above table lists, describes, and provides the URLs (or endpoints) for each of the methods that can be used with the Google Calendar API to request data and/or resources from Google Calendar itself. Just like with the Foursquare API above, this would be useful if you were a developer hoping to create an app that could interact with Google Calendar. For instance, say you wanted to create a task management app that can access and interact with a user’s Google Calendar on their phone, automatically creating entries based on the projects the user schedules within the app. You could use the Google Calendar API to send HTTP requests directly to Google Calendar, allowing your app to create, read, update, or delete entries in the user’s calendar.

For your own API project, you’ll design and document your own API similar to how the Google Calendar and Foursquare APIs were documented above. You’ll also write the JavaScript code needed to go along with it to fulfill the objective for your project. Again, don’t be concerned if you aren’t familiar with any of the tools mentioned; you’ll be learning about all of them in great detail as you progress through this Achievement.

Now that you have a better idea as to what this Achievement is all about, let’s get started!


#### What is Node?

The words “Node” and “Node.js” keep getting passed around in the text, but what exactly is Node.js, and where does it fit in with server-side programming (and, perhaps most importantly, how will you use it to build your REST API)? Let’s take a look.

Node.js, often referred to simply as Node, is an “open source runtime environment for executing JavaScript without a browser.” As that’s quite a mouthful, let’s break it down into parts. “Open source” simply means that the original source code is free to use, alter, or redistribute (as opposed to commercial software that costs money to use and can’t be altered or redistributed). A runtime environment (RTE), refers to a location on a computer where a program or app can be executed (“run”) and which allows that program to access the resources (libraries, system variables, etc.) that it needs to function. RTEs are an essential part of programming as they provide an “environment” for developers to test out their apps and software.

One of the most important things to remember is that Node itself is not a programming language, rather, an environment within which you can write apps using JavaScript. Node is what allows JavaScript apps to be executed directly on operating systems (OS) like macOS, Microsoft Windows, and Linux, rather than simply in the browser.


> Node.js = Runtime Environment + JavaScript

Node also brings with it a rich library of JavaScript modules. These modules provide useful functionality you can include when creating your API. Think of modules as a way of organizing your code into separate parts with limited responsibilities. These functional and organizational perks simplify the development of web apps using Node.js to a great extent, making them a crucial component in working with Node. You’ll be looking into what kinds of modules there are and what they can do in more detail in the next Exercise.

In server-side programming, it’s Node that parses JavaScript code into something the server can understand, similar to how, in frontend programming, JavaScript code is run through the browser’s built-in JavaScript engine in order to parse it into something the browser can understand and execute.


> In Google Chrome, the built-in JavaScript engine is called V8. The creator of Node, Ryan Dahl, took the V8 engine and wrapped it in a C++ program he called Node, creating a runtime environment that could be used outside the browser: Node.js. This allows developers to work with JavaScript outside of the browser and use it for server-side tasks, as well.


#### Features of Node

Let’s take a moment to explore some of Node’s key features to see why it’s become so popular amongst developers—and why you’ll be using it to work on your own project in this Achievement!

Super Fast: Built on Google Chrome's V8 JavaScript Engine, Node compiles and executes JavaScript at very fast speeds.

Asynchronous and Event-Driven: One of the great things about Node is that it’s asynchronous. Remember back in Achievement 1 when you learned about Ajax, callbacks, and event listeners? The same concept of asynchronicity that allowed you to program click events and other user-prompted interactions applies in Node. Unlike a synchronous language such as PHP, JavaScript doesn’t wait for an asynchronous task to return before handling the next request.

Think of this a bit like a restaurant: In a synchronous restaurant (like PHP), a waiter would go to one table, take an order, go to the kitchen, then wait for the order to be filled before returning it to the table and starting the process over again with a new table. In an asynchronous restaurant (like JavaScript), on the other hand, the waiter can go to a table, take an order, and drop it off at the kitchen without having to wait for it to be filled. They’re then free to go to the next table and take the next order. This significantly increases the speed at which the restaurant (and, in turn, the code) functions.

Single-Threaded but Highly Scalable: Node uses a Single-Threaded Event Loop Model to handle multiple concurrent clients. The main event loop is single-threaded, meaning that only one line of code can be executed at any given time. While this may seem to be a weakness in JavaScript, it makes up for it by using an event loop. Most of the background workers (I/O) run on separate threads. If a request is intended to take a long time, Node sends that request in an event loop and goes on to handle the next request in the call stack. As soon as the pending request is done processing, it tells Node, and the response is rendered.

The event loop is a bit like the restaurant’s back counter, where dishes are placed once they’re finished being prepared so the waiter knows to deliver them to their respective tables. Once Node requests have been completed, they’re added to the event loop, after which Node “delivers” them to their corresponding functions.

The event mechanism helps the server respond in a non-blocking way. (Blocking is when the execution of additional JavaScript in the Node.js process must wait until a non-JavaScript operation completes.) This makes the server highly scalable compared to traditional servers, which create limited threads to handle requests. Node.js uses a single-threaded program, and that same program can provide service to a much larger number of requests than traditional servers like the Apache HTTP Server.


> TIP!
>   If you’re still having a hard time understanding the above explanations about single-threaded, non-blocking, and event loops, check out this video: How Node.js works. It re-explains much of the above information using graphics and audio, which can really help if you’re having trouble visualizing how Node works!

License: Node.js is released under the [MIT License](https://raw.githubusercontent.com/joyent/node/v0.12.0/LICENSE), which is a permissive free software license originating from the Massachusetts Institute of Technology (MIT). As a permissive license, it puts only very limited restriction on reuse and has, therefore, excellent license compatibility.

Node can be used to build complete backend services—for instance, the REST API you’ll start building shortly. Let’s take a look, now, at some real-world examples of Node.js in use.


#### Node In Use

Many well-known companies use Node to build applications such as social media apps, video and text chat engines, real-time tracking apps, online games, and collaboration tools. These include AWS, Netflix, LinkedIn, Walmart, Trello, Uber, PayPal, Medium, eBay, NASA, and Groupon, just to name a few.

In general, Node is well-suited for command line applications (like [AWS CLI](https://aws.amazon.com/cli/)—the Universal Command Line Interface for Amazon Web Services), single page applications, JSON-API-based applications (such as your own project), data-streaming applications, I/O-bound applications, and data-intensive real-time applications (DIRT).


> TIP!
>   See Nine Famous Apps Built with Node.js for examples of apps built with Node. Many technology pundits claim that in a short time, Node will be the de facto runtime environment for many more big brands.

That’s not to say that Node is suited for all applications. For instance, Node wouldn’t be a good choice for CPU-intensive applications (CPU-bound applications) that demand a great deal of computational power—games, graphics editors (Photoshop), meteorology programs, or other scientific applications, among others.

When it comes to generating dynamic page content; creating, opening, reading, writing, deleting, and closing files on the server; collecting form data; or adding, deleting, and modifying data in your database, Node can provide you with the platform to accomplish your objectives.

However, note that Node can also be used in both server-side and client-side scenarios. A number of tools that are used to automate frontend development tasks have been built in Node.js. In essence, however, Node was developed to allow JavaScript to be used on the server-side, giving developers the advantage of being able to use a single language (JavaScript) for both the client- and server-side of web applications. For you, this means you can continue working with the coding language you mastered in Achievement 1 to build the server-side (Achievement 2) and client-side (Achievement 3) for your next application.


#### Setting Up Your Development Environment

Before moving on to installing Node, let’s first take a look at some tools you’ll need as a Node developer. You’ll need a command line interface to interact with Node and the underlying operating system, as well as an integrated development environment.


> Operating Systems
>   Throughout this Exercise, you’ll spend a lot of time navigating different operating systems (e.g., macOS, Linux, and Windows). As a reminder, an operating system (OS) is what stands between you (or any other user of a computer) and your device (the physical hardware). The operating system of a device is what allows you to interact with your device and complete tasks.
>
>   For more on operating systems, as well as the top three in the industry today, check out the following resource: Understanding Operating Systems.
>
>   In job interviews, you may come across questions on operating systems, since they're such a crucial aspect of the user experience. You can check out the following resources about commonly asked interview questions on operating systems:
>
>
>   5 Common Operating System Interview Questions
>   Top 50 Operating System Interview Questions


##### The Shell

When you work in server-side programming, you use a special program—also called a UI (user interface)—to run commands against the OS. In computer terms, this special program is called a shell. Shells generally use something called a CLI (command line interface), which gives you a prompt to execute commands. This program is all text-input-driven, meaning you complete tasks using text through your keyboard rather than by clicking around.

Before the computer mouse came into existence, the only way people could interact with an operating system at all was via the keyboard. Commands would be typed into a CLI, and the computer would execute them. Since then, the GUIs (graphical user interfaces) you’re familiar with today (desktops, clickable folders, start menus, etc.) have become the norm for day-to-day activities across the board. The shell is useful in development because you can type any number of almost infinite commands into it depending on what you’re working on. Interfacing with the OS via the “normal” menus-and-mouse approach can’t be applied here.

The shell takes a little getting used to, but it’s a crucial program for development, and we’ll be walking you through it every step of the way. By the end of the Achievement, typing shell commands will feel as natural as using your mouse!

macOS Devices:

On Macs, the CLI for your shell is called the “terminal.” To access the terminal on macOS, open your “Applications” folder, select the “Utilities” folder, and from there, click the “Terminal” app. As this can be a bit of a grind to open every time, you may want to add it to your dock for easy access.

![Screenshot of how to access the Terminal on a macOS device](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E1/How%20to%20access%20the%20Terminal%20on%20macOS%20screenshot.png)


###### Figure 5

Alternatively, you can simply use [Spotlight](https://support.apple.com/en-us/HT204014), a macOS feature that allows you to quickly locate applications on your device. All you need to do is hit “Cmd + Space,” type in “terminal,” and hit “Enter.”


> Want something with a few more features?
>   A lot of Mac developers use a third party terminal called “iTerm2” instead of the built-in OS one. It offers more customization options, as well as some nicer features, such as being able to have multiple tabs open at once. Any commands listed for the terminal will also work in iTerm2. To download iTerm2, simply go to the iTerm2 site.

Windows Devices:

The built-in CLI on Windows machines is called the “Command Prompt” (CMD) or “Windows PowerShell”; both interface with the Windows operating system. For this course, you’ll be using Windows PowerShell, since it offers more powerful tools than CMD. Its commands are also somewhat similar to those in MacOS and Linux terminals.

You can find Windows PowerShell by running a search for “PowerShell” in your Search bar. Once you find it, you can open it in multiple ways:

![PowerShell running options](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E2/powershell_1.jpg)


###### Figure 6

In this course, you’ll only be interested in two of these (notice the highlighted options in the image above):


- Open: Unless there’s a need to use the second option, always use this one.
- Run as Administrator: Some applications and configuration adjustments require PowerShell to be run as administrator.


> Note!
>   Windows users need to enable the running of scripts on PowerShell. Scripts are, essentially, a group/batch/list of commands to be run all at once. To enable them, open PowerShell by clicking Run as Administrator, then run this command (copy it into your PowerShell, then hit Enter):
>
>   Set-ExecutionPolicy RemoteSigned -scope CurrentUser -Force
>
>   Close your PowerShell window, then open a new one without running it as administrator (i.e., the way you should use PowerShell most of the time).

Once you open up the shell of your Mac/Windows OS, you’ll find, well, not much. CLIs aren’t exactly the most intuitive of interfaces, and that blank screen can be a bit overwhelming (which is one of the reasons computers didn’t really take off until GUIs came into being). Never fear, though, as you’ll soon know everything you need to know in order to work with the shell and interact with your device’s operating system.

As everything discussed so far has been pretty new, let’s quickly recap: The shell allows you to access the OS of your computer. Developers interact with a CLI to access the shell. The terminal and Windows Powershell apps on Macs and PCs respectively are CLIs that allow you to interact with the shell. For the rest of this course, however, the CLI will be referred to as the terminal. While it may have a different name depending on your operating system, most developers use this name when referring to their CLI.

![Diagram showing the flow from the device to the OS, Shell, BASH, then the user](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E1/diagram_shell.jpg)


###### Figure 7

With all that new terminology out of the way, let’s move on to actually using what you’ve learned!


#### Using the Terminal

The quickest way to learn something is simply to start using it, and it’s no different with the terminal. Now that you’ve got yours open, let’s talk a bit about how it works before inputting some commands of your own.

The first thing you should know is that you need to use the right language when interacting with the terminal. Try typing a few random characters on the command line now and hit “Enter.” What happens? An error, no doubt, and more specifically, the “command not found” error. When you receive this error, it means that your command didn’t go through, either because you mistyped something, or because what you typed simply isn’t a command. Let’s fix that by learning a few basic commands now.


##### Navigating Between Directories

Now that you’re in a program that doesn’t recognize mouse movements, how do you interact with files and navigate folders (also referred to as directories)? There are a few commands that will help you with that:


- cd (change directory)
- ls (list structure)
- pwd (print working directory)

It’s one thing to know a few commands, but another thing entirely to actually use them, especially in such a new environment as the terminal, so let’s walk through a short activity that will have you up and writing terminal commands in no time.


- In the terminal, type cd ~ and hit “Enter.” This symbol, ~, is a shortcut that will take you directly back to the home directory. This home directory may be located somewhere different depending on your computer’s folder structure, your OS, or even how your computer was originally set up. On Windows, running cd ~ will open your user folder (e.g., “C:\Users\John, C:\Users\Sally”).
- Type pwd and hit “Enter” to see the full path of your current location. This may look something like “/Users/hgwells” or “/home.”


> Note!
>   On Mac, file paths use the forward slash / (e.g., “/Users/hgwells”). On Windows, however, paths use the backward slash \ (e.g., “C:\Users\hgwells”). In PowerShell, though, you can still use forward slashes / when your command needs to specify a path. For example, if you’re in the “Users” folder and your Windows username is “John,” you could navigate to your “Documents” folder by typing cd John/Documents or cd John\Documents. Having said that, we still recommend using the backward slash for Windows as it’s standard across the OS. This way, you’ll avoid any potential issues.


- Type ls and hit “Enter.” This will show you all of the files and folders contained in your current directory.


  If you're using Windows PowerShell and you want to get to your “Documents” folder, type cd ~ to open your current Windows user folder . From here, you'll be able to access your “Downloads” folder, your “Documents” folder, your “Pictures” folder, and more. For now, type cd Documents. This is where you'll want to create your folder for your course project so that it's easy to find in your File Explorer.
- Pick one of the folder names listed in your terminal. For example, maybe you see a “Documents” folder. Type cd Documents (or cd “Some Folder” depending on what folder you see) to enter the “Documents” folder. The terminal is case-sensitive, so it won’t understand cd documents if the folder name is “Documents.”
- Type pwd again to see the full path of the new directory you’re in. It might be something like “Users/hgwells/Documents.”
- To move back one level out of the “Documents” folder, type cd ... The two dots, here, tell the terminal to move up one level in your directory structure. (To move up two folder levels, type cd ../...)

What you’re doing is essentially the same as when you click in and out of folders in your file manager, only now you’re doing it with your keyboard. Though it may feel awkward at this point in time, the more you use the command line, the more intuitive it will become.


##### Creating a File

Now that you know how to navigate in and out of folders, you need to know how to create folders and files. After all, simply moving around won’t get you very far in server-side development!

Let’s start with two more commands:


- mkdir (make directory)
- touch (or New-Item for PowerShell)

Similar to above, let’s walk through a short activity so you can see these new commands in action:


1. If you're on a Mac, back in your terminal, cd back to the root directory (cd ~), then type mkdir careerfoundry and hit “Enter.” This command creates a new folder in the current directory. A good way to remember it is “mkdir” → “make directory.”


  If you're using Windows PowerShell, make sure that you’re inside the “Documents” folder, then type mkdir careerfoundry and hit Enter.
1. Type ls to make sure you really did create a new folder called “careerfoundry.”
1. Type cd careerfoundry to move into your new “careerfoundry” folder.
1. If you typed ls here, nothing would be returned, as the folder is empty.
1. Let’s make a new file so the folder is no longer empty. If you’re using a Mac, type touch test.js. This creates a new JavaScript file called “test.js.” For PowerShell, the same thing can be done using the New-Item command followed by the file name, like so: New-Item test.js.
1. Run ls now and you’ll see the new file you just added.


  Note: When creating new files in the terminal, the file extension is very important. The file you just created is a JavaScript file. In the future, however, you’ll be operating with HTML files, CSS files, text files, and more, so always make sure you give your new file the correct file extension.
1. There are also hidden files in various folders. These are prefaced with a . at the beginning of the file name. Let’s cd ~ back to the root if you're on a Mac, or to the logged-in Windows user’s folder if you’re on Windows, and see if you can find any hidden files. For Mac users, you can see hidden files with a flag set on the ls command—ls -a—which tells the computer to run the ls command but return all of the files (not just the normally visible ones). On Windows PowerShell, you can list all files and folders, including the hidden ones, by appending -Force to the command. Go ahead and test ls -Force inside your “C:\Users[YOUR_USER]” folder. One of the hidden folders in Windows is “AppData”—you won't be able to see it if you run the ls command without appending it with -Force.
1. Now that you know what hidden files look like, let’s cd back into the “careerfoundry” folder and touch a hidden file: touch .hidden_file. Note that hidden files don’t have to have a file extension. On Windows, however, it’s a little tricky to create a new hidden file. To do so, you input the following command: (New-Item .hidden_file).Attributes += 'Hidden'. To avoid getting into too much detail, just know that this command creates a file and adds “Hidden” to its attributes.
1. Try out ls and ls -a (or ls -Force on PowerShell) to check which files you can see and which ones you can’t in this folder.

![Screenshot showing a list of recently executed commands](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E1/History%20command%20screenshot.png)


###### Figure 8


##### Other File and Directory Commands

Before moving on, let’s cover a few more crucial commands for creating and maintaining files and directories via the terminal command line:


```js
mv /directory1/filename1 /directory2/filename1
```


```js
mv directory1\filename1 directory2\filename1
```


```js
mv
```


```js
mv filename1 filename2
```


```js
rmdir
```


```js
find filename
```


```js
ls -recurse -filter "filename"
```


```js
cp /directory1/filename /directory2/
```


```js
cp directory1\filename1 directory2
```


```js
rm filename
```


###### Figure 9

Of course, there’s more to do in the command line than simply move around between your folders and create files. The list covered in this section is only the tip of the iceberg when it comes to terminal commands. To see more of what’s available, type `help` right within the terminal. Not sure what a specific command does? Type `help` followed by the command name. If you’d prefer a web-based guide, check out this [cheat sheet of popular terminal commands](https://learntocodewith.me/command-line/unix-command-cheat-sheet/).

To help you visualize all this, we've provided video walkthroughs on working with the terminals in macOS (first video) and Windows (second video). Note that the Windows version uses command prompt rather than PowerShell, but the commands and basic processes are still the same.

![Using The Terminal (macOS)](https://embed-ssl.wistia.com/deliveries/035c5dcceae9844578e5ce7c1fc6af8c86fbdc35.webp?image_crop_resized=1152x720)

![Using The Terminal (Windows)](https://embed-ssl.wistia.com/deliveries/3e9fb3593490a162ff244353ef3f106f4a48e18d.webp?image_crop_resized=1152x720)


##### Additional Terminal Tips

Before you get started using the terminal for your Achievement project, let’s go over a few more tips for navigating this latest addition to your toolbox:

Case:

If you’re on a Mac, always remember that commands are case-sensitive. This means they need to be in the correct case (`cd` rather than `cD` or `CD`) or they won’t be recognized. The names of files and directories are also case-sensitive; for instance, “Documents” rather than “documents.”

Spacing:

Spacing is important when it comes to writing commands—without the proper spacing, your commands won’t work. Always ensure there’s a space between your command and the file or directory name. Also, if your folder name itself has a space in it, put quotes around the entire name, like this: `cd \"Folder Name"` (Note: Windows PowerShell doesn't need the slash: `cd "Folder Name"`).

You can put quotes around filenames with spaces, as well, but note that adding spaces into file and folder names is generally considered bad practice and can cause problems down the line. If you need to include multiple words in a filename, it’s best to use hyphens or underscores.

History:

Another cool thing you can do is press the up key on your keyboard to cycle through your recently executed commands. To see your full history, simply type `history`. You can even rerun a command from your history by typing `!` followed by the line number of the command in your history. PowerShell users can use the `-count` flag like this: `history -count 5`. This command will get the last five commands.

Permissions:

Mac Users: In some cases, you’ll want to distinguish between the different access permissions granted to different users of your CLI. `sudo`, which stands for “super user do,” will run a command with root/administrator permissions. (Do note, however, that using `sudo` all the time isn’t best practice. It’s better to set the appropriate permissions on the folder or file you want to run commands against.)

Autocomplete:

The last thing you’ll want to know how to use is autocomplete (which is also a big time-saver). If you hit the “Tab” button after typing the first few characters of your command or filename, the rest will be added for you automatically. This is extremely useful as it keeps you from having to memorize complete file and command names and helps you input faster, to boot.

With some of the crucial commands and best practices for using the terminal covered, let’s move on to the last thing you need to have set up in order to get started with your Achievement project—your IDE!


##### Integrated Development Environments

So far in this course, you’ve been using the text editor of your choice for coding and working on your projects. Text editors are usually one component in a bundle of development tools packaged to expedite your work: Integrated Development Environments (IDEs). IDEs provide many additional benefits when it comes to working on server-side projects, which is why, in this next section, you’ll learn how to take even further advantage of these functionalities when working on your Achievement project.

Developers will often use the first basic text editor or Integrated Development Environment (IDE) with which they’re comfortable. For example, a Vim user will often only use [Vim](https://www.vim.org/), while a VSCode user will often use only [VSCode](https://code.visualstudio.com/). Same with [WebStorm](https://www.jetbrains.com/webstorm/), [Notepad++](https://notepad-plus-plus.org/), [BBEdit](https://www.barebones.com/products/bbedit/), or any of the other IDEs out there.


> For more on IDEs, check out this Youtube video: “What is an IDE?”

As mentioned above, an IDE is a software application that comprises all the tools developers need to build and maintain a working program. IDEs typically offer the following key features:


- A source code editor, usually with context-aware code completion, bracket matching, and syntax highlighting to help speed up your coding and prevent bugs.
- Build automation tools (e.g., a compiler and tester)
- An integrated debugger
- Version control integration with GitHub (allowing you to perform Git commands directly from the IDE)

Many IDEs also offer auto-documentation (to help developers understand how and why code was created), (function) libraries, and support for automated refactoring.

Overall, IDEs can lead to increased productivity, as developers no longer have to configure or switch between different tools to write code, compile, debug, etc. Keep in mind, however, that for new developers, the raft of features offered by an IDE can present a steep learning curve and the risk of over-reliance on code completion, which can hinder the learning of a new language.

There are single and multi-language IDEs, which, as their names suggest, support either one or multiple programming languages. Examples of IDEs that support JavaScript/Node.js include VSCode, IntelliJ, IDEA, and WebStorm.

For the rest of this course, you’ll use your chosen IDE. It’s recommended that you continue with VSCode, as it’s currently a popular tool in the industry.

Check out this [Node.js tutorial in Visual Studio Code](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial) and this video on how to [Learn Visual Studio Code in 7 min](https://www.youtube.com/watch?v=B-s71n0dHUk) if you need help!


> Code Quality Tools
>   Whether you choose a basic text editor or an IDE in the future, make sure it can be integrated with a JavaScript Code Quality Tool: ESLint, Flow, JSHint, or JSLint. This will ensure the quality of your code is always high.


#### Installing Node

To install Node, you’ll be using a version management tool called nvm (Node Version Manager) to install a specific and reliable version of Node. This tool will allow you to easily upgrade (and downgrade if necessary) your version of Node to the latest LTS (long-term support) version. To install nvm:


##### MacOS Users:


- Create an Apple Developer Account.
- Open the App Store and make sure that you’re signed in with the Apple Developer account you’ve just created (you should see a Sign In button in the bottom-left corner of the App Store window).
- Look for Xcode on the App Store and download it (Xcode contains software development tools produced by Apple). Once downloaded, open it to start the installation wizard, then complete the installation process. Verify that Xcode is installed by launching it (its icon is a blueprint with a hammer on top of it). If you see the welcome screen, then you’re good to go.
- Now, open the terminal and run xcode-select --install to install additional command line tools for Xcode needed for installing nvm (Node Version Manager) and eventually NodeJS. You’ll be asked to enter your system user account password (not the developer account password).
- Once the installation is done, check what shell is being used by your terminal. The shell type is displayed on the title bar when you open it:


  If it says “bash”: run touch ~/.bash_profile
  If it says “zsh”: run touch ~/.zshrc
- Close all opened terminal windows, then open a new one.
- Visit nvm’s GitHub repository page and scroll down to the “Installing and Updating” section. Execute one of the commands (one uses curl, while the other uses wget) in the terminal.
- Close the terminal, then open a new one. Test whether nvm has successfully been installed by running command -v nvm. You should get nvm logged in a new line.
  Run nvm install lts/* or nvm install --lts. This will install the latest LTS version of Node. If neither command works, run nvm ls-remote to display a list of available Node versions, as shown in the following image, then install the latest version that has “LTS” next to it. For example, you can see “v18.17.1 (Latest LTS: Hydrogen).” To install it, run nvm install 18.17.1. (Note: This is just an example! LTS might have a different version number by the time you’re reading this. Make sure you install whatever you see is the latest). Now, you have the latest LTS version of Node installed.

![Versions in the terminal](https://coach-courses-us.s3.amazonaws.com/public/courses/fullstack-immersion/A2/2.1/mac-node-versions.png)


###### Figure 10


- Run nvm alias default lts/* or nvm alias default [version number you installed] if lts/* didn't work (e.g., nvm alias default 18.17.1). This will set the default Node to be the one you’ve just installed.
- Close the current terminal one more time and open a new one. Then, test whether Node is installed by running node -v. You should see the version of the currently installed Node.
- If you ever want to upgrade/downgrade your version of Node, redo the last three steps. Whatever version you install, make sure to run nvm alias default [the installed version] to set it as your default version of Node, since nvm allows you to have multiple Node versions installed at the same time. You can explore nvm by visiting its GitHub repository. The same link also includes all the instructions and details you need to troubleshoot installing nvm and NodeJS.


> Troubleshooting Xcode Installation
>   Depending on the MacOS version you’re using, you might experience a delay when installing Xcode. This is due to compatibility issues between certain versions of Xcode and certain versions of MacOS. However, this is a great opportunity to flex your troubleshooting skills! To help you get started, check out this stackoverflow thread, where you’ll find many insights on how to resolve the problem for different combinations of Xcode and MacOS. If you’re still unable to resolve the issue, speak to your tutor or your peers in the forum.


##### Windows Users:


- Make sure that your Windows OS is up to date. Go to Settings → Update & Security and install any available updates.

With your Windows OS updated, you’ll have two different options for installing node:


- Option 1: Download the provided version (1.1.11 at the time of writing).
- Option 2 (recommended): Visit the repository and download the latest released version.

Option 1
  Download the nvm-windows installer for a fixed version of node by clicking on the following link (note that clicking this link will immediately initiate a download of the .zip file!):


- nvm Windows installer.

Option 2
  You can also look for newer releases to download to your device. In the README section of this [NVM for Windows GitHub page](https://github.com/coreybutler/nvm-windows#readme), you’ll find a Download Now! button.

![Download button for latest Node.js version manager for Windows](https://coach-courses-us.s3.amazonaws.com/public/courses/fullstack-immersion/A2/2.1/nvm-windows-download-button.png)


###### Figure 11

Clicking this button will open information about the latest release, including a list of “Assets”. From this list, download the `nvm-setup.zip` file.

![NVM setup assets for Windows devices](https://coach-courses-us.s3.amazonaws.com/public/courses/fullstack-immersion/A2/2.1/windows-nvm-setup-asset.png)


###### Figure 12

Regardless of the option you chose, you can proceed with installing nvm-windows.


- Install nvm-windows (leave everything as it is while going through the setup screens).
- Close all PowerShell windows and open a new one, then run nvm list available. You should see a table of the newest node versions:

![Windows nvm versions](https://coach-courses-us.s3.amazonaws.com/public/courses/fullstack-immersion/A2/2.1/windows-nvm-versions.png)


###### Figure 13


- Install the newest version under the “LTS” column (which stands for Long Term Support) that appears in your PowerShell. For example, according to Figure 13, the version you’d want to install is 18.17.1. To install it, you’d run the command: nvm install 18.17.1; however, as there might be a newer version when you’re reading these instructions, you’ll need to check for yourself what the newest version is.
- Run the command: nvm use <installed version>. If the version you just installed was “18.17.1,” for example, you’d run the command: nvm use 18.17.1. If Windows asks you for permission, then allow it.

For more information, you can check out the [nvm-windows documentation](https://github.com/coreybutler/nvm-windows) on GitHub.


##### Node.js repl Terminal

Node comes with its own CLI shell program called the repl (a.k.a., Node Console). “repl” stands for “Read Eval Print Loop,” and it represents an interactive interface for entering commands and receiving a response from the system. It’s a quick and easy way to execute simple JavaScript code without having to create a JavaScript file (or interact with JavaScript in the browser like you’ve done in earlier Exercises). As you progress through this Achievement, you’ll use the repl to test snippets of code to aid your understanding.

To launch the repl, open the terminal and type `node` as shown below. This is all you need to do to start typing commands into the repl, and you’ll know you’ve successfully launched the repl when the prompt changes to a `>`.

![Screenshot of the terminal with the `node` command invoked and the prompt having been changed to a >.](https://coach-courses-us.s3.amazonaws.com/public/courses/fullstack-immersion/A2/2.1/launch-node-repl.png)


###### Figure 14

You can now test pretty much any Node.js / JavaScript expression you’d like. For example, if you type `100 + 200`, it will immediately display `300` in a new line.

![Screenshot of the terminal with the equation 100 + 200 entered at the prompt and the repl replying with 300.](https://coach-courses-us.s3.amazonaws.com/public/courses/fullstack-immersion/A2/2.1/expression-node-repl.png)


###### Figure 15

You can also use the `+` operator to concatenate strings (i.e., join strings end-to-end); or, you can define variables and perform a number of operations on them (see [JavaScript Operators Reference](https://www.w3schools.com/jsref/jsref_operators.asp)).

![Screenshot of the terminal with two variables defined as the strings Hello and World, and another string defined as the first string, plus a space, plus the second three. Below everything is a console log command that logs the third string to the repl, which, in this case, is the phrase Hello World.](https://coach-courses-us.s3.amazonaws.com/public/courses/fullstack-immersion/A2/2.1/operator-node-repl.png)


###### Figure 16


> TIP!
>   When writing multiline JavaScript expressions or functions, simply hit “Enter” to start a new line. The repl terminal will display three dots (...), meaning that you can continue your code on the next line (and it won’t try to run the code until you’re finished). To escape from continuity mode, simply type .break or press “Ctrl-c.”

You can execute an external JavaScript file with the command `node fileName`. Let’s start by creating a small, simple test file:


1. Open your “test.js” file with your IDE and add the code console.log('Hello, Node!'); at the top. (If you’re having difficulty figuring out where the “careerfoundry” folder is in order to find your “test.js” file, go back to your terminal and type pwd to see the directory structure.)
1. Save the file and exit your IDE.
1. Back in the repl terminal, type .load test.js. This will add your code to the repl session.
1. Type console.log('Goodbye'); in the repl terminal.
1. You can capture this new “Goodbye” console log code and save it into the file by typing .save test.js.
1. Type .exit to get out of the repl session and head back to your regular terminal.
1. Run the file you just edited in the repl in your terminal by typing node test.js.

![Screenshot showing the command node test.js being run and the resulting “Hello World!” and “Goodbye” being displayed](https://coach-courses-us.s3.amazonaws.com/public/courses/fullstack-immersion/A2/2.1/execute-file-node-repl.png)


###### Figure 17

Did the words “Hello, Node!” and “Goodbye.” just pop up in your console? Great! The `node` command you used parsed the JavaScript inside your “test.js” file and executed it within the shell (just like the code would be executed in your browser if you were working with frontend JavaScript, like you did in Exercise 1.9).

In essence, you can execute any Node.js/JavaScript code in the Node shell (repl). Below, you’ll find a few additional repl commands you may find useful:


```js
.load fileName
```


```js
.save fileName
```


```js
.exit
```


```js
_
```


```js
(10 + 20) / 3
```


```js
_
```


```js
.help
```


```js
.break
```


```js
.clear
```


###### Figure 18

Using these commands in the repl will allow you to easily execute the code you need for your project as you work through this Achievement.


#### Summary

In this Exercise, you took your first look at some of the new tools and concepts you’ll be dealing with in the world of server-side (backend) development. This is a big step from the frontend code you’ve been focusing on so far in your Full-Stack Web Development Program.

You not only learned how you can navigate your computer without relying on the visual cues of a GUI, but also completely new concepts such as the “shell” and the terminal, as well as how they work, from navigating between directories to executing basic commands. You then dove into Node.js, what it is, and how to install it, before having a go at using the Node command line: the repl.

In the next Exercise, you’ll build on what you learned by diving deeper into Node, learning all about how to run JavaScript on a server using modules. For now, though, let’s put what you learned into practice by installing your IDE, installing Node, creating a JavaScript file, and running through a few text examples.


#### Resources

If you’re curious to read more about the topics covered in this Exercise, then we recommend taking a look at the resources below. Note that this reading is optional and not required to complete the course.

APIs:


- Video: REST API Concepts and Examples
- Foursquare API
- Google Calendar API

Node.js:


- Video: How Node.js Works
- What is Node and When Should I Use It?
- Nine Famous Apps Built with Node.js
- Mastering the Node.js repl
- JavaScript Operators Reference

Installing NVM and Node:


- NVM GitHub Repository
- nvm-windows GitHub Repository

Operating Systems and the Terminal:


- Understanding Operating Systems
- Cheat Sheet of Popular Terminal Commands
- How to Set Linux Permissions on Files and Folders

Course-Specific Tutorials and Tools:


- Installing a Linux subsystem on your Windows Machine
- Download Visual Studio Code
- Node.js

Take the quiz to test your knowledge on this Exercise.


#### Task


- Direction
- Submission History

In the first task for Achievement 2, you’ll install everything explored in the Exercise and try out a few basic commands to get started with your new developer tools. While you’ll only be practicing here, it’s important that you become more familiar with these tools, as you’ll need them to complete your Achievement project.

Directions:


1. Install your chosen IDE. The following links include instructions for Mac, Linux, and Windows: Visual Studio Code and Sublime Text. Make sure to switch to your operating system first in the linked page.
1. Install Node according to the instructions provided in the Exercise.
1. Execute the following command in the terminal. The command checks that the Node software has been installed correctly and which version has been installed.


  node -v
1. Using the terminal, set up your project directory for this Achievement.


  Create a project directory called “movie_api”.
  With in this directory, create a JavaScript file called “test.js”.
1. In your IDE, open up your “test.js” file.


  Add a console log that outputs a message to this file. For example, “Hello Node!” or something similar.
  Save the file and exit your IDE.
1. Open up your terminal again and start the Node.js REPL.
1. Load your “test.js” file.


  Add a console log message in the REPL terminal. For example, console.log('Goodbye.'); (or a similar message).
  Save these REPL changes to your “test.js” file.
  Exit the REPL.
1. Run node test.js in your terminal. The expected message should be returned.
1. Take a screenshot of the terminal that shows all the commands you’ve just executed in steps 3, 4, 6, 7, and 8 (don’t worry about 5!). This can include any errors or mistakes you resolved throughout the process.
1. Upload your screenshot (if you want to submit multiple screenshots, add them to a single zip folder or PDF file) here for your tutor to review. Feel free to share additional thoughts or ask questions on your submission page.

Rubric

Refer to the categories below to see how to meet the requirements of the approved stage

![](//cdn.careerfoundry.com/assets/rubrics/not_yet-c9fb80e521507759d546f847f8a65a00c66f2c8ec7ece4e37f98c25aa122778c.svg)


- Submission doesn’t include evidence of any of the required installations or commands; OR
- Installations and commands have been attempted; however, a number of steps are missing or incomplete

![](//cdn.careerfoundry.com/assets/rubrics/almost_there-f4bb1c077a0a826e7d4e3ecb72859fc401d362d9bd49c0658f4fd85c4a047a87.svg)


- All installations and commands have been completed; however, one or more of the outputs is incorrect or has some unresolved errors

![](//cdn.careerfoundry.com/assets/rubrics/approved-7dfdcf59318cf52fcbd1333d8b71bf7a2bde35b6e0b753ac975349982495e0b4.svg)


- All installations and commands have been completed; When “node -v” is run in the terminal the Node version is displayed; A test.js file has been created in the “movie_api” directory using the terminal; When “node test.js” is run in the terminal, the expected message is returned

Questions for this task

Student Submissions

Check out recently submitted work by other students to get an idea of what’s required for this Task:

EVALUATION COMPLETE

![](https://coach-courses-us.s3.amazonaws.com/users/photos/thumb/51945.jpg?1660008090)

Vivek Maskara

Sep 03, 2024 at 10:25 PM

Hi Oliver,

Thanks for submitting the assignment.

Welcome to the backend. I hope you enjoyed learning a little bit about server-side programming.

The assignment looks great and contains all the screenshots with the required information. Congrats on getting the assignment approved.

Checkout these resources for further reading:


- 7 of the Best Code Playgrounds
- Command Line Games
- CMD Challenge
- Command Line Cheat Sheet
- Video—What is Vim and Why Should I Learn It

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

Oliver Oliverio  Submitted Something for Task 2.1

Sep 03, 2024 at 12:40 PM

submitting task 2.1


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

