
## Server-Side Programming & Node.js


# 2.8: The Business Logic Layer


- Learning Goals
- Introduction
- Business Logic Layer
- Data Modeling in Mongoose
- Configuring Your Schema and Models with Mongoose
- Querying Mongoose Models
- Summary
- Resources
- Task
- Forum


#### Learning Goals


- Integrate a database with an API using business logic


#### Introduction

Welcome back! In the previous Exercise, you set up your MongoDB database. Congratulations! You now know how to create two types of databases: relational and non-relational. In this Exercise, you’ll go one step further, learning about a concept called modeling, which can help you ensure the data in your non-relational database remains consistent. This modeling takes place in the business logic layer of an application, which is a bit like a translator for your application code and the database layer. For your myFlix application, you’ll be using a tool called Mongoose to do this job, translating between your Node.js application and your MongoDB database layer. This is where the complete backend of your app will finally start to come together!

Excited? Then, let’s get started!


#### Business Logic Layer

In the Achievement thus far, you’ve covered how to work with Node.js, how to create URL endpoints for your HTTP requests, how to build and query a relational database, and how to build and query a non-relational database. Through it all, you’ve followed the diagram below to discover how the four different layers make up a complete web application. You should be fairly familiar with it by now:

![Template showing the four layers of a web app, in order from client, to server, to business layer, to data layer. Under the client layer are: mobile browser, web browser, and application. Under the server layer is: web server. Under the business layer are: application and file system. Under the data layer are: database and external system.](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E1/web_app_four_layers_template.jpg)


###### Figure 1

In this second Achievement of your Full-Stack Immersion course, you’re only covering the backend, which includes the server, business logic, and data layers. In the next Achievement, you’ll work on completing the client layer, which is everything the user sees and interacts with. You’ve already covered the web server, which is where the code for your API sits, and you just recently finished up exploring the data layer, which is where your database sits. But what about the “business logic” layer that lies between those two? This is where the “business logic,” “domain logic,” or “application logic” interprets the rules for how data can be created, updated, and deleted, turning it into code that can actually be used by your web application.

Think of it this way: your data layer contains low level operations for managing your database. These operations are encoded in either SQL or NoSQL depending on the type of database you employ. But how is the server (and, subsequently, the client) supposed to read this database? After all, a web server can’t read SQL. This is where the business logic layer comes in. It’s what interprets your database commands and operations into something the web server can read and act on.

Many apps use what’s called an Object Relational Mapper (ORM) for their business logic layer, which is a system that maps the logic from a relational database (SQL) to business logic. A common ORM for Node.js is [Sequelize](http://docs.sequelizejs.com/), which can be used to map PostgreSQL and other SQL databases to Node.js code.

While you did create a database using PostgreSQL, the database you’re actually going to use for your app isn’t SQL but, instead, a non-relational database created in MongoDB. For this reason, you’ll need a different tool—one called Mongoose. Mongoose is an ODM (Object Document Mapper). It’s similar in purpose to an ORM, but differs in that it can be used with MongoDB document architecture instead of SQL.

Let’s recap quickly before moving on:


- The business logic layer contains “logic” for converting code from the data layer (SQL or MongoDB) into something usable by the rest of your application.
- The tools often used for this purpose are called ODMs (or ORMs). Think of them a bit like online translators, translating from one language into another. Because your database speaks a different language to the rest of your app, you need a translator to translate the operations before they can be understood, thus fully integrating your data layer with the rest of your application.


#### Data Modeling in Mongoose

In the previous Exercise, you explored the benefits of MongoDB and learned how to create a MongoDB database. One of those benefits was the fact that non-relational databases such as MongoDB don’t enforce attributes and relationships between data via a predefined schema. For example, you could have two movie documents in the same “Movies” collection that store different data attributes (via JSON object “keys”). Remember the “Silence of the Lambs” document from the previous Exercise? It stored data on the title, description, genre, director, image path, and whether or not the movie was “featured”:


```js
{
  _id: ObjectId("5c3bd189515a081b363cb7e4"),
  Title: "Silence of the Lambs",
  Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
  Genre: {
    Name: "Thriller",
    Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
  },
  Director: {
    Name: "Jonathan Demme",
    Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter."
  },
  ImagePath: "silenceofthelambs.png",  
  Featured: true
}
```

Unlike relational databases, there’s nothing forcing this movie document to contain the attributes that it does, nor any other movie document in the “Movies” collection for that matter. For example, you could have a different movie document in the same “Movies” collection that doesn’t have a “Director” attribute, but which does contain additional “Actors” and “ReleaseYear” attributes (like “The Lion King” example you looked at in the previous Exercise).

The fact that MongoDB allows you to enter data without following a certain format doesn’t mean that you shouldn’t still strive for data consistency. For one, you need to consider your users. In order for your application to work properly (i.e., for it to return the data users are expecting through your API), you need to keep your data as consistent as possible. For example, if your API allows users to see details about movies, you can expect that users will want to know the name of the director, actors, description, etc. Hence, you have to store all of that information for each movie.

As mentioned in the previous section, Mongoose (and other ODMs and ORMs) allows you to enforce uniformity in your data from the application-side, ensuring that all data follows a specified format. It acts as a translation service between the database layer and the rest of the application. It’s also designed for asynchronous environments (which, as you’ll remember, is a feature of the Node.js runtime environment).


#### Configuring Your Schema and Models with Mongoose

The term “modeling” was used earlier in terms of working with Mongoose. This is because, in Mongoose, everything revolves around models. A model is a class that constructs documents according to a specified schema, similar to how a table in SQL specifies all the properties, data types, and other settings (e.g., if they’re required) for the data it stores. A model specifies what data to store and how to store it for each document in a collection. This whole process is often referred to as business logic.

Models in Mongoose are written using Node and Express, but before diving straight into the necessary syntax, note that your models should be kept in a separate file in your project, for instance, a “models.js” file. Keeping your models modularized like this (separate from your “index.js” file) makes it easier to find and make changes to them in the future (similar to the way each of your Node modules is in its own separate file in its own separate folder).

Configuring Mongoose

Mongoose is installed as a local project dependency just like many of the other JavaScript packages you’ve installed for your project. In order for Mongoose to work:


- Navigate to your project directory in your terminal
- Execute npm install mongoose (or npm install mongoose --save)

Note that you need to already have MongoDB running before you do this (see the previous Exercise for instructions on how to configure and run MongoDB if you’d like a refresher).


> Before moving on, take a look at your “package.json” file to check that Mongoose has been installed correctly!

Next, you need to `require();` the Mongoose package. On the first line of your “models.js” file, type the following:


```js
const mongoose = require('mongoose');
```

You’re now ready to get started! Let’s begin with an example. Type the following code into your “models.js” file. We strongly advise that that you don’t copy-paste, as this will give you more experience with actually writing new code. We’ll be working through it over the next few sections.


```js
let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
```

Let’s break this code down over the next few sections.


##### Defining the Schema

After importing the package into your “models.js” file, you need to define the “schema.” In the previous Exercise, you created collections for both movies and users; thus, in the code above, a schema has been defined for documents in the “Movies” collection (`let movieSchema = mongoose.Schema(`) and documents in the “Users” collection (`let userSchema = mongoose.Schema(`) in order to keep documents in both collections uniform.


> Note that we’ve added an additional “Actors” attribute to your “Movies” collection for the purpose of this example.

In Mongoose, your schema is defined through a set of keys and values that will dictate the format for documents of a certain collection. The syntax is as follows:


```js
let <collectionSchema> = mongoose.<Schema>({
  Key: {Value},
  Key: {Value},
  Key: {
    Key: Value,
    Key: Value
  }
});
```

The keys and values can follow a number of different formats. Let’s take a look at some options.

1. Data Type

The most simple and common Mongoose schema includes only keys and values. The keys correspond to fields, and the values correspond to data types. The data type could be a number, string, boolean, or date, among other data types. You can see the different [Mongoose data types](https://mongoosejs.com/docs/schematypes.html) here.

Let’s take a look at an example from `userSchema`. The fourth key-value pair in the schema is `Birthday: Date`. This means that, where documents in this schema have a `Birthday` key, the field for this key must be populated with a value of the data type `Date`.

You’ll find other examples of this format throughout `userSchema`. For instance, at the bottom, you’ll find an `ImagePath` key with a value of `String`, as well as a `Featured` key with a value of `Boolean` (which, in this case, would indicate whether the movie is featured or not).


```js
ImagePath: String,
Featured: Boolean
```

2. Required

This is similar to the first format but differs in that the field for the key has an additional “required” property assigned to it. This indicates that the field is required for all documents that follow this schema, and it ensures that the key, as well as the type of data it stores as its value, will be uniform for all documents in the collection.

For example, the line `Username: {type: String, required: true}` in `userSchema` means that each user document must have a `Username` field, and the value of that `Username` field must be a `String`. This same format is used to enforce the `Password` and `Email` keys in the `userSchema`, as well as the `Title` and `Description` keys in `movieSchema`.

3. Subdocuments

With this longer format, nested data is introduced. Here, one key can correspond to an embedded subdocument of key-value pairs. Let’s take a look at an example from `movieSchema`:


```js
Director: {
  Name: String,
  Bio:String
},
```

Here, the field for the `Director` key is populated by a value. This value is actually a subdocument containing keys for the director’s `Name` and `Bio`, both of which have a value of `String`.

The `Genre` key for `movieSchema` is another example of the subdocument format, where the value for the `Genre` key is a subdocument containing genre details such as `Name` and `Description`, both with a value of `String`.


> Note
> Note that it’s just as important to use the correct data types for the keys in your subdocuments as it is for your documents. For example, if your director subdocument has a Birthday key, the value will be the Date data type.

4. Arrays

The next format is that of a key and an array, with the array containing values of a certain data type. You can recognize this format by way of the square brackets surrounding the data type: `[Data Type]`. For example, check out the `Actors` key in `movieSchema`. The line `Actors: [String]` means that all movie documents would have an `Actors` key whose value would be an array of strings.

5. Reference

The last format to look at is the reference format. Remember the concept of reference from the previous Exercise? That same idea comes into play here, where a key is defined and its value is set as a piece of data from a different collection.

This can be seen in the example above in `userSchema`. The `FavoriteMovies` key within `userSchema` contains an array of IDs that each refer to a document within the “db.movies” collection. This is done by way of the `ref` attribute:


```js
FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
```

This states that the `FavoriteMovies` field within each user document will contain an array (`[]`) of `mongoose.Schema.Types.ObjectId` IDs. These IDs reference the “db.movies” collection (`ref: 'Movie'`). We use the singular “Movie” because that is the name of the model which links the `movieSchema` to its database collection (you will see how this works below).

6. Mongoose’s .populate method

Let’s take another look at the `FavoriteMovies` key. As already stated, the reference method is being used to link your “Users” collection with your “Movies” collection. Every user has multiple favorite movies, and you refer to them through an array of IDs, each of which corresponds to a movie document.

Mongoose, however, provides a way to “populate” one collection with an array of embedded documents from another collection. Rather than the `FavoriteMovies` key in your user documents containing an array of IDs for movie documents, the `FavoriteMovies` key could contain an array of actual movie documents, all embedded within each user document.

As described in the previous Exercise, the advantage of using embedded data over reference lies in the simplicity it brings to querying the database. In the example above, rather than having to first query the “Users” collection to determine the IDs of a specific user’s favorite movies, then querying the “Movies” collection to find the corresponding information for each movie in the list, you can write a single query to pull information about the user along with their favorite movies.


> You can learn more about this option and how to integrate it into your business logic in the official Mongoose documentation for the populate method, or this Medium article: Mongoose's Model.Populate().

Now that you know how to define different formats for the data in both `userSchema` and `movieSchema`, let’s look at how to create the models themselves.


##### Creation of the Models

Once you’ve defined your schemas, you need to create models that use the schemas you’ve defined. These models will be used in your main “index.js” file to enforce attributes as you create, update, and delete certain documents in your database. The key pieces of code you need to add to your “models.js” file are as follows:


```js
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
```

This will create collections called “db.movies” and “db.users” within the MongoDB database you created in the previous Exercise (they’re actually stored in your “/data/db” directory, but you won’t need to access them through this file directly). Keep an eye on your capital letters and plurals here—any titles you pass through will come out on the other side as lowercase and pluralized. For instance, above, the titles `Movie` and `User` will create collections called “db.movies” and “db.users”, respectively. Similarly, if you were to pass `Book`, it would create a collection called “db.books.”


##### Exporting the Models

As you created your models in a separate file (“models.js”), you now need to export them in order to then import them into your “index.js” file (just as you had to export elements from a module using `module.exports` before you could import them into your app using `require`). Once the models are imported into your “index.js” file, your API endpoints can make use of them in order to query the MongoDB database according to the schema you defined.

The last two lines of the code in your “models.js” file are what export your models:


```js
module.exports.Movie = Movie;
module.exports.User = User;
```

This will let you then import these models into your “index.js” file (which you’ll do in just a moment).


##### Integrating Mongoose with a REST API

The next step is to integrate Mongoose into your REST API, which will allow your REST API to perform CRUD operations on your MongoDB data. Let’s go back to your “index.js” file and add the following lines of code to the top of the file:


```js
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
```

These lines require the Mongoose package and your “models.js” file, as well as the Mongoose models you defined in your “models.js” file, so they can be used in your project. “Models.Movie” and “Models.User” refer to the model names you defined in the “models.js” file.

You’ll also want to add the following line:


```js
mongoose.connect('mongodb://localhost:27017/dbname', { useNewUrlParser: true, useUnifiedTopology: true });
```

Replace `dbname` with the name of the database you created in the previous Exercise, (e.g., `myFlixDB`). This allows Mongoose to connect to that database so it can perform CRUD operations on the documents it contains from within your REST API. With that, the integration between your REST API and your database layer is complete—congratulations!

Now that you have your schema and models configured (and your API and database have been integrated), it's time to start querying your database!


> Note
> According to Mongoose documentation, if the connection fails on your machine, try replacing “localhost” with “127.0.0.1”.


#### Querying Mongoose Models

In the previous Exercise, you learned how to make direct MongoDB queries on collections and documents to perform CRUD operations on data. For example, the syntax to read all movies with a genre of thriller was:


```js
db.movies.find({ "Genre.Name": "Thriller" })
```

This code, however, was code you ran through your MongoDB shell. It wasn’t code written as part of your application itself. This wouldn’t work very well in an application! You want everything to be done automatically, which is exactly what Mongoose allows you to do.

With Mongoose, you can query your database from within your application. It does so by way of the models you just created. In other words, Mongoose doesn’t query your actual database—it queries the models. These commands are then automatically translated into MongoDB logic behind the scenes, which is what does the actual database querying. Think back to the translator analogy from earlier. Say you’re talking to your friend who lives in China, but you can’t speak Mandarin, so you use a translation app. You “query” the translation app with your request: “Hello!” The translation app translates this request into Mandarin automatically, then sends the translated request to your friend: “你好!” Your friend is able to read this translated request and respond appropriately, just like your database is able to read the translated request from Mongoose and respond appropriately.

![Diagram displaying how Mongoose translates code between a Node.js application, Mongoose models and MongoDB](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E8/Mongoose%20translating%20code.jpg)


###### Figure 2

How does all of this work?

In previous versions (before 7.x), Mongoose functions were implemented in such a way that they could either accept callbacks or return promises. Promises and callbacks are both features of asynchronous programming, which you first learned about in Achievement 1 of this course. Furthermore, both methods were correct and possible.

However, from version 7.x onwards, Mongoose functions avoid callbacks.

First, let's look at the callbacks that you should try to avoid. A Mongoose function would previously have, as one of their parameters, a callback function that takes whatever data is returned by the MongoDB query in response to their request.

Let’s look at a concrete example. The following is a Mongoose function for “finding” movie data for movies with a genre of “Thriller”:


```js
Movies.find({ 'Genre.Name': 'Thriller' }, (err, movies) => {
  // Logic here
});
```


> Note!
> Referring to fields within nested documents, as in 'Genre.Name', requires quotes (both ' and " are allowed).

As you can see, the first part of the Mongoose query looks pretty similar to a MongoDB query (e.g., `db.movies.find()`). But instead of querying the “Movies” collection in your database (`db.movies`), you’re querying the `Movie` model that you created in the previous section (`const Movies = Models.Movie;`). This model acts as a representation of the underlying database data for the “Movies” collection.

Next is a condition for narrowing down which movies you want to read ( `{ 'Genre.Name':'Thriller' }`). Here, as the second parameter of the `find` method, you see a callback function that takes a parameter representing the data returned by the Mongoose query (`(err, movies) => {...}`). Within that callback, you can do anything you want with this data, including sending it back to the client as a response (you’ll see an example of this in the next section).

Now, let’s take a look at the promise-based syntax, which is the up-to-date and recommended way to approach Mongoose functions. This promise-based syntax can be used to avoid passing callbacks to mongoose functions:


```js
Movies.find({ 'Genre.Name':'Thriller' })
  .then((movies) => {
    // Logic here
  })
  .catch((err) => {
    // Logic here
  });
```

A promise represents the (eventual) result of an asynchronous operation. It does this by way of ES6’s `.then()` method, which is called once the operation has finished. It always takes one of three states:


- Pending: The promise is waiting and may transition to either fulfilled or rejected.
- Fulfilled: The promise has been resolved successfully with a value.
- Rejected: The promise has been resolved with an error.


> TIP!
> Check out Mozilla's .then () documentation to learn more about this method.

Both versions of the syntax use two different types of asynchronous programming methods; one is a more outdated approach (callbacks), and one is the recommended approach (promises). Using asynchronous code, such as promises, to route your requests calls for a slightly different method from the synchronous method you used earlier on in the Achievement, but is something that will be coming up again and again throughout this course!

Back in Exercise 2.5: REST & API Endpoints, you retrieved a list of students from a hardcoded array for the example “Students” API. The data was stored “in-memory,” and the code that you wrote to retrieve the list of students ran synchronously.


```js
app.get('/students', async (req, res) => {
  res.json(Students);
});
```

In the following example, the code is performing the same operation. However, the data is stored externally, and the code is running asynchronously with the use of `.then()` for promises to handle the request.


```js
app.get('/students', async (req, res) => {
  Students.find().then(users => res.json(users));
});
```

Here are some of the common Mongoose querying functions:


- Model.deleteMany()
- Model.deleteOne()
- Model.find()
- Model.findById()
- Model.findByIdAndDelete()
- Model.findByIdAndRemove()
- Model.findByIdAndUpdate()
- Model.findOne()
- Model.findOneAndDelete()
- Model.findOneAndRemove()
- Model.findOneAndUpdate()
- Model.replaceOne()
- Model.updateMany()
- Model.updateOne()

As you can see, many of these functions have the same names as their corresponding MongoDB methods, and they represent essentially the same functionality; however, these functions are meant to be run on Mongoose models rather than on the database itself.

Now, let’s take a closer look at a few of these querying functions (and from within the context of your REST API). This will allow you to begin using them in your Achievement project!


##### “CREATE” in Mongoose

Back in Exercise 2.5, you created a URL endpoint for creating a new user, which looked something like this:


```js
app.post('/users', async (req, res) => {
  res.send('Successful POST request creating a new user');
});
```


> Important! Using body-parser
> 
> Double-check your code and make sure that body-parser is being imported and that its middleware is being used (if you haven't already since Exercise 2.5).
> 
> If you’re using a version of Express below 4.16
> 
> To install the body-parser package, run: npm install --save body-parser
> 
> To import body-parser, make sure that the line const bodyParser = require('body-parser'); is added at the top where you require/import other packages, such as express. 
> 
> Then, add app.use(bodyParser.json()); and app.use(bodyParser.urlencoded({ extended: true }));, right after const app = express();. Also make sure that both lines appear before any other endpoint middleware (app.get, app.post, etc.).
> 
> If you’re using a version of Express above 4.16
> 
> If you have installed Express version 4.16 or above, you don’t need to install body-parser separately as middleware—it will already be installed along with your Express package.
> 
> If this is the case for you, you only need to add the following lines to import body-parser into your project: 
> app.use(express.json()); and  app.use(express.urlencoded({ extended: true }); , (inserted after const app = express()).

At the time, you didn’t include any actual logic for creating a new user in your database. You just indicated what would happen with “Successful POST request creating a new user.” This is because you didn’t have a database yet (or even know what your database would be storing and how). Now that you do have a database, in addition to your overlaying Mongoose models, you can use the logic you’ve defined to `POST` a new user. Written into your “index.js” file (as this is where you defined the endpoints for your API), the code for your POST request would look something like the following. Note that this will replace your complete `app.post('/users', (req, res) => {});` function:


```js
//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});
```

That's a lot of code to take in, so let’s break it down into parts. First, you need to check if a user with the username provided by the client already exists. You do this using Mongoose’s `findOne` command:


```js
Users.findOne({ Username: req.body.Username })
```

The `findOne` command was introduced in the previous Exercise as a MongoDB command. Here, it’s being used in a similar manner, but instead of querying the database, you’re querying the “Users” model using Mongoose. If the given username does exist (`if (user))`), then you send back the appropriate response to the client:


```js
return res.status(400).send(req.body.Username + ' already exists ');
```

If the user doesn’t exist, you use Mongoose’s `create` command to “CREATE” the new user, as follows:


```js
Users
  .create({
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
  })
```

The `create` command takes an object, where each key in the object corresponds to a certain field specified in the schema (from your “models.js” file) and each value is set to a value that you receive from the request body (via `req.body`). Remember that `req.body` is the request that the user sends. In this case, it would be the user data that the user has entered to create a new user. In this way, you create a new user document with the `Username` set to `req.body.Username`, the `Password` set to `req.body.Password`, the `Email` set to `req.body.Email`, and the `Birthday` set to `req.body.Birthday`. This allows you to collect all of the information from the HTTP request body, use Mongoose to populate a user document, then add it to the database.

In essence, what Mongoose is doing here is translating Node.js code into a MongoDB command that runs behind the scenes to insert a record into your “Users” collection. Instead of a database administrator writing an `INSERT` command manually, your application uses Mongoose’s `create` command on the model to execute this database operation on MongoDB automatically.

After the document is created, a callback takes the document you just added as a parameter. Note that this callback function is within the promise and not on the Mongoose function, because—as discussed earlier—it’s advised that you don’t pass a callback to a Mongoose function. Here, this new document is given the name “user,” but you could name it anything you want:


```js
.then((user) => { res.status(201).json(user) });
```

Within this callback, you then send a response back to the client that contains both a status code and the document (called “user”) you just created (`res.status(201).json(user)`). This gives the client feedback on the transaction, letting them know that it’s been completed.

At the end of the `POST` command comes the error-handling function—an important but easy-to-forget catch-all in case your command runs into an error:


```js
.catch((error) => {
  console.error(error);
  res.status(500).send('Error: ' + error);
});
```


> Here, the ES6 function .catch is used for error-handling. For more on using the .catch function in your own code, check out the Mozilla .catch() documentation.

The `.catch` function will “catch” any problems that Mongoose encounters while running the `create` command. This could include, for instance, if any of the required parameters for creating a new “User” object (according to the schema defined in “models.js”) weren’t found in the `req.body`. You can test this in Postman by sending a `POST` request to your “/users” endpoint with a JSON object in the body that has a `Username` and `Password` key but not an `Email` key (which is required as per the defined model). If everything has been implemented correctly, this should lead to an error.

[](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E8/Postman%20returning%20an%20error%20after%20POST%20request.png)


###### Figure 3 (Click Image to Zoom)

On the other hand, if you test the request in Postman and include all the required parameters (`Username`, `Password`, and `Email`), you should receive a response with the “User” document you just inserted, including its `_id`.

[](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E8/Postman%20returning%20User%20document%20created%20via%20the%20POST%20request.png)


###### Figure 4 (Click Image to Zoom)


##### READ in Mongoose

Next, let’s try to “READ” data about your users. Start by writing a `GET` request for all of your users:


```js
// Get all users
app.get('/users', async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
```

Just like when using the `find()` function in MongoDB, the `find()` function in Mongoose will grab data on all documents within a collection, which, in this case, is all the users in the “Users” collection. Rather than querying `db.users.find()`, you query `Users.find()`, as you’re not querying the database itself, rather, the `Users` model. As no conditions have been given for the query, data for all the documents will be returned (as opposed to only certain documents). Also, as always, an error-handling function has been added at the end to catch any errors that may occur. If so, the server will send back the message “Error: [name of error].”

Most of the time, however, you’ll only want to get information for a specific document, so let’s write a `GET` request to get information on a specific user based on their username:


```js
// Get a user by username
app.get('/users/:Username', async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
```

Here, rather than the `find()` function, you use the `findOne()` function, as you only want information on one user. This, however, requires a condition. After all, Mongoose needs to know which specific user to return. This is similar to the `WHERE` clause you used in SQL to specify a criteria for narrowing down your search results, as well as to the`db.[Collection Name].findOne( [Condition] )` command you used in native MongoDB syntax.

The Mongoose syntax for this is slightly different than both of these methods, but still similar enough that you should be able to understand it without much hassle. In order to “READ” a user by their username, you need to pass, as a parameter, an object that contains the criteria by which you want to find that user, which, in this case, is their username.


```js
Users.findOne({ Username: req.params.Username })
```

After the document is created, you then send a response back to the client with the user data (document) that was just read. The parameter for this callback, which is named “users” in the example (though it could be called anything), refers, by default, to the document that was just read.


```js
.then((users) => {
  res.json(users)
})
```

Finally, you handle any errors that may have occurred using the `catch()` function:


```js
.catch((error) => {
  console.error(error);
  res.status(500).send('Error: ' + error);
});
```

To test this, make a request to the “/users” endpoint in Postman. But this time, add the username of the user you inserted in the previous “CREATE” section at the end of the URL. You should see that same data returned as a response:

[](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E8/Testing%20the%20GET%20command%20in%20Postman.png)


###### Figure 5 (Click Image to Zoom)


##### UPDATE in Mongoose

Remember that “UPDATING” data means changing existing data in some way. To update data through Mongoose, you can use Mongoose’s `findOneAndUpdate` method directly on the model. The syntax is as follows:


```js
[Model name].findOneAndUpdate([ condition for which documents to update],

{ $set: [ an object that includes which fields to update and what to update them to ] },

[ optional { new: true } The ‘new’ is set to ‘true’ because you want to specify that the newly modified document is returned, not the old/original document. ] ],


}
```

Let’s try this out with some of the data in your “Users” collection. First, let’s update the username of a specific user:


```js
// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(‘Error: ’ + err);
  })

});
```

In this code, you’re updating all users with a certain username—`Users.findOneAndUpdate({ Username : req.params.Username },`—then using `$set` to specify which fields in the user document you’re updating. The new values you’re setting each of these specific fields to is, once again, extracted from the request body (meaning that they come from a request sent by the user).


```js
$set:
{
  Username: req.body.Username,
  Password: req.body.Password,
  Email: req.body.Email,
  Birthday: req.body.Birthday
}
```

The third parameter you’ll see is `{ new: true }`. This simply specifies that, in the proceeding callback, you want the document that was just updated to be returned.

Next is the promise `then()` method. This method does the following:


1. Accepts the returned document that’s just been updated as a callback (here it's called updatedUser).
1. Sends the document as a JSON response to the client (here, it’s called updatedUser).

The `catch()` method comes after the `then()` method. This accepts a callback object that represents any errors that might have occurred (here, it’s called `err`):


```js
.then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(‘Error: ’ + err);
  })
```

You’ll notice the syntax here aligns with how callbacks and errors were handled in the preceding examples. The examples all use ES6’s `.then` and `.catch` functions, with `.then` handling the callback for the document that was created, read, updated, or deleted by Mongoose, and with `.catch` handling the error.

Next, let’s take a look at the code for updating a user’s list of favorite movies. What would you write if you wanted to add a new movie to a user’s list of favorites?


```js
// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(‘Error: ’ + err);
  });
});
```

In this method, as with MongoDB, the `$push` function is being used to add a new movie ID onto the end of the `FavoriteMovies` array:


```js
$push: { FavoriteMovies: req.params.MovieID }
```

Test these methods in Postman just as was done with “CREATE” and “READ” above, to see what response you get.

There’s one more operator you should be aware of: `$addToSet`. This operator behaves similarly to `$push`, only with one major difference—if the element you want to add is already in the array, it won’t be added. Do keep in mind, however, that it won’t throw an error if the element you’re trying to add is already there. It will still indicate that the update operation was successful even though nothing has been modified.

Conversely, if you wanted to remove elements from an array, for instance, removing a movie ID from a user’s `FavoriteMovies` array in the “Allow users to remove a movie from their list of favorites” endpoint, the code would be exactly the same as when you add a movieID, only using the `$pull` operator instead of the `$push` operator. Also, make sure to use `app.delete` for it because it’s about “deleting” data.


##### DELETE in Mongoose

Finally, let’s look at the Mongoose code for removing or deleting data. How might you “DELETE” a user by their username? Take a look at the following code:


```js
// Delete a user by username
app.delete('/users/:Username', async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
```

The syntax here is very similar to the “UPDATE” method you walked through earlier; only, here, rather than `findOneAndUpdate`, the `findOneAndRemove` function is being used to delete the one user that matches the condition (`{ Username: req.params.Username }`).

In the callback method that follows (after `.then`), you then check whether a document with the searched-for username even exists. If this document isn’t found, the appropriate response is sent back to the user. If it is found, a response is still sent back, but this time, telling the user that the username was deleted.

Just like with the other methods you’ve already learned, at the end is the ever-present error-handling callback. Don’t forget to include this in all of your CRUD operations!

Make sure you give the “DELETE” method a test in Postman. Test out both a successful request and a request that will lead to an error. This ensures that your code is working properly!

To see some of the endpoints in action you can check out the following video:

Click for sound
  @keyframes VOLUME_SMALL_WAVE_FLASH {
    0% { opacity: 0; }
    33% { opacity: 1; }
    66% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes VOLUME_LARGE_WAVE_FLASH {
    0% { opacity: 0; }
    33% { opacity: 1; }
    66% { opacity: 1; }
    100% { opacity: 0; }
  }

  .volume__small-wave {
    animation: VOLUME_SMALL_WAVE_FLASH 2s infinite;
    opacity: 0;
  }

  .volume__large-wave {
    animation: VOLUME_LARGE_WAVE_FLASH 2s infinite .3s;
    opacity: 0;
  }
9:08
        @media (prefers-reduced-motion: no-preference) {
          @keyframes w-control-bar-fade-in {
            0% {
              opacity: 0;
              transform: translateX(50%) translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateX(50%) translateY(0px);
            }
          }
        }
      
      #wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset{font-size:14px;}
#wistia_chrome_23 #wistia_grid_43_wrapper div.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper span.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper label.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper fieldset.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper button.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper img.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper a.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper svg.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper p.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper a.w-css-reset{border:0;}
#wistia_chrome_23 #wistia_grid_43_wrapper h1.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper h2.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper h3.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper p.w-css-reset{margin:1.4em 0;}
#wistia_chrome_23 #wistia_grid_43_wrapper a.w-css-reset{display:inline;}
#wistia_chrome_23 #wistia_grid_43_wrapper span.w-css-reset{display:inline;}
#wistia_chrome_23 #wistia_grid_43_wrapper svg.w-css-reset{display:inline;}
#wistia_chrome_23 #wistia_grid_43_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_23 #wistia_grid_43_wrapper ol.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_23 #wistia_grid_43_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_23 #wistia_grid_43_wrapper ul:before.w-css-reset{display:none}
#wistia_chrome_23 #wistia_grid_43_wrapper ol:before.w-css-reset{display:none}
#wistia_chrome_23 #wistia_grid_43_wrapper li:before.w-css-reset{display:none}
#wistia_chrome_23 #wistia_grid_43_wrapper ul:after.w-css-reset{display:none}
#wistia_chrome_23 #wistia_grid_43_wrapper ol:after.w-css-reset{display:none}
#wistia_chrome_23 #wistia_grid_43_wrapper li:after.w-css-reset{display:none}
#wistia_chrome_23 #wistia_grid_43_wrapper label.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_23 #wistia_grid_43_wrapper button.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_23 #wistia_grid_43_wrapper img.w-css-reset{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset button::-moz-focus-inner{border: 0;}
      #wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree {font-size:14px;}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree div{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree span{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree label{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree fieldset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree button{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree img{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree a{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree svg{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree p{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree a{border:0;}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree h1{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree h2{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree h3{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree p{margin:1.4em 0;}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree a{display:inline;}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree span{display:inline;}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree svg{display:inline;}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree ol{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree ul:before{display:none}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree ol:before{display:none}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree li:before{display:none}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree ul:after{display:none}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree ol:after{display:none}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree li:after{display:none}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree label{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree button{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree img{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-tree  button::-moz-focus-inner{border: 0;}
      #wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-max-width-none-important{max-width:none!important}
      #wistia_chrome_23 #wistia_grid_43_wrapper .w-css-reset-button-important{border-radius:0!important;color:#fff!important;}
    #wistia_grid_43_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
#wistia_grid_43_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
#wistia_grid_43_above{position:relative;}
#wistia_grid_43_main{display:block;height:100%;position:relative;}
#wistia_grid_43_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_43_center{height:100%;overflow:hidden;position:relative;width:100%;}
#wistia_grid_43_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_43_top_inside{position:absolute;left:0;top:0;width:100%;}
#wistia_grid_43_top{width:100%;position:absolute;bottom:0;left:0;}
#wistia_grid_43_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
#wistia_grid_43_bottom{width:100%;position:absolute;top:0;left:0;}
#wistia_grid_43_left_inside{height:100%;position:absolute;left:0;top:0;}
#wistia_grid_43_left{height:100%;position:absolute;right:0;top:0;}
#wistia_grid_43_right_inside{height:100%;right:0;position:absolute;top:0;}
#wistia_grid_43_right{height:100%;left:0;position:absolute;top:0;}
#wistia_grid_43_below{position:relative;}


> TIP!
> After adding new code for each endpoint/CRUD operation, make sure to restart the Node server (node index.js) before testing the endpoints in Postman!


#### Summary

In this Exercise, you learned all about the business logic layer, as well as how you can use Mongoose to integrate business logic into your app by mapping your database to models you can use within your REST API methods. You started by creating a “models.js” file that contains models for keeping the data in your database consistently formatted. Then, you used Mongoose to interact with these models, writing a new series of CRUD operations that ensure requests coming from the client (and messages sent back) align with how you want to store your data. This is essential when using a non-relational database!

Once you complete the steps in the task for this Exercise, you’ll have completed a functional version of your API that’s able to receive requests, make the appropriate alterations to the database (using the business logic), and send responses accordingly. In the final Exercises for this Achievement, you’ll learn about some more features that are important for building APIs, from authentication and authorization to data security and data validation. However, for all intents and purposes, by the end of this task, you’ll have a working API—congratulations!


#### Resources

If you’re curious to read more about the topics covered in this Exercise, then we recommend taking a look at the resources below. Note that this reading is optional and not required to complete the course.

Business Logic Layer:


- Sequelize

Mongoose:


- Mongoose Data Types
- Mongoose's Model.Populate
- Mozilla's .catch() Documentation
- Mozilla's .then() Documentation
- Populate in Mongoose
- Queries in Mongoose
- Using a Database with Mongoose

Take the quiz to test your knowledge on this Exercise.


#### Task


- Direction
- Submission History

In this task, you’ll define the models for your MongoDB database and write business logic for your API and database using Mongoose.

Directions:

Part 1

First, create the schema for your database using Mongoose models, making sure they can be used by the rest of your application.


1. Create a new file called “models.js” in your project directory.
1. Create the models for your “Movies” schema and “Users” schema using Mongoose. These should be based on the database you defined in the previous Exercise (including attributes, data types, and any other other formatting).
1. Export these models from your “models.js” file using module.exports.
1. Import your “models.js” file into your main “index.js” file, integrating the models with the rest of your application.

Part 2

Back in Exercise 2.5, you created request methods to match each of the requirements for your API project (listed below), each with a URL endpoint and request method type:


- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister

In your “documentation.html” file, you documented what each method would do, what type of data it would take, and what type of data it would send back as a response. At the time, this was pretty hypothetical, given that you didn’t yet have the underlying database or models in place. Now, however, you have your Mongoose models, so you can update this documentation.


1. First, using your “Users” and “Movies” models, fill in each request method with the Mongoose logic you just wrote to make the request methods functional.
1. As you do so, be sure to update your documentation with more accurate information about the format of the data (if any), the method that’s expected in its body (with an example), and what data the method will be sending back as a response (with an example).


For example, a method to update user info would be expecting a JSON object with data about what data in the user document should be updated.
1. After you implement each method, test it in Postman with sample data and share a screenshot of the result.
1. Push your changes to GitHub.
1. Create a zip file of your project repository on your computer.
1. Submit a link to your project directory (including your “documentation.html” file), the zip file of your repository, and a zip file of your Postman screenshots here for review.

Bonus Task

Take some time to explore how you might integrate your SQL database with your API. Earlier in the Exercise, the ORM [Sequelize](http://docs.sequelizejs.com/) was mentioned. This is a tool commonly used to integrate Node.js with SQL databases. Check it out!

Rubric

Refer to the categories below to see how to meet the requirements of the approved stage

![](https://cdn.careerfoundry.com/assets/rubrics/not_yet-c9fb80e521507759d546f847f8a65a00c66f2c8ec7ece4e37f98c25aa122778c.svg)


- Submission doesn’t include a link to the GitHub repo or a zipped folder of screenshots, or it includes a GitHub repo not related to the project; OR
- GitHub repo has been submitted and includes an updated “documentation.html” file, but not all endpoints have been documented and may also be missing some required information; AND
- A zipped folder of screenshots has been included, but not every endpoint has been tested

![](https://cdn.careerfoundry.com/assets/rubrics/almost_there-f4bb1c077a0a826e7d4e3ecb72859fc401d362d9bd49c0658f4fd85c4a047a87.svg)


- GitHub repo has been submitted and includes a “documentation.html” file; AND
- All endpoints have been updated, but some of the required information is missing or could be expanded upon; AND
- A zipped folder of screenshots showing the response of each endpoint being tested in Postman has also been submitted

![](https://cdn.careerfoundry.com/assets/rubrics/approved-7dfdcf59318cf52fcbd1333d8b71bf7a2bde35b6e0b753ac975349982495e0b4.svg)


- GitHub repo has been submitted and includes an updated “documentation.html” file with Mongoose logic added for every endpoint, expected methods for every request body, and the type of data that will be returned for every request (including examples); AND
- A zipped folder of screenshots showing the response of each endpoint being tested in Postman has also been submitted

Questions for this task

Student Submissions

Check out recently submitted work by other students to get an idea of what’s required for this Task:

EVALUATION COMPLETE

![](https://coach-courses-us.s3.amazonaws.com/users/photos/thumb/51945.jpg?1660008090)

Vivek Maskara

Oct 01, 2024 at 11:24 PM

Hi Oliver,

Thanks for submitting the assignment.

It looks great and meets all the requirements of the task. I hope that with exercise you got an idea about how to create Mongoose models for your database and use them to create APIs.

Things you did great:


- Nice job implementing the schemas and integrating them with your existing APIs.
- Great job testing all the APIs using Postman.

Everything looks great.

Checkout these resources for further reading:


- Video: Populating Queries with Mongoose: Creating a REST API with Node.js
- Mongoose JS Query Cheat Sheet
- Best Practices and Common Beginner Mistakes for Mongoose in Node.js

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

Oliver Oliverio  Submitted Something for Task 2.8

Oct 01, 2024 at 05:05 PM

submitting task 2.8

Note, to access api-docs:  `http://localhost:8080/api-docs/`


