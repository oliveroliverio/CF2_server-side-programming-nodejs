
## Server-Side Programming & Node.js


# 2.7: Non-Relational Databases & MongoDB


- Learning Goals
- Introduction
- Non-Relational Databases
- MongoDB Database
- Spotlight on AI
- Installing MongoDB
- Installing MongoDB Community Server (Mac)
- Installing MongoDB Community Server (Windows)
- Using Mongo Shell
- CRUD in MongoDB
- Summary
- Resources
- Task
- Forum


#### Learning Goals


- Create a non-relational database using MongoDB
- Query a MongoDB database using CRUD operations
- Compare SQL and NoSQL databases


#### Introduction

Welcome back! In the previous Exercise, you learned all about relational databases and how you can create one to store related data about movies and users for an API using PostgreSQL. In this Exercise, you’ll be using that same movie data again—only this time, you’ll be creating a non-relational database. You’ll start by exploring why non-relational databases are more common in modern web applications, as well as why a non-relational database would be a more suitable choice for your myFlix project. To build your non-relational, or “NoSQL,” database, you’ll use MongoDB, a commonly used database model for JavaScript tech stacks.

As mentioned in the previous Exercise, you’ll be able to use all the data you compiled for your PostgreSQL database again, this time in the MongoDB database you’ll be creating for your API, so don’t worry about having to come up with brand-new data. You’ll simply be organizing it in new, non-relational ways! Ready to get started?


#### Non-Relational Databases

While relational databases are good for establishing a standardized data set with consistent relationships, they can also be restrictive. The established schema is defined beforehand, therefore limiting the flexibility of the database and its ability to adapt to new requirements. Changing the schema for a database once it’s been defined would require modifying all the existing data in the database, making the process difficult and time-consuming.

One solution to this is to use a non-relational database instead. Non-relational databases are those that don’t use the “table and key” model you learned about in the previous Exercise. In fact, they don’t have any predefined schema or enforced “relationships” between the different types of data they store at all. This makes them simpler to create and alter.

You learned how to use the SQL language to set up your relational database in the previous Exercise. However, non-relational databases don’t require the use of SQL. For this reason, non-relational databases are often referred to as NoSQL, which stands for “Not only SQL.” Rather than using predefined relationships between tables (as is done with SQL), they use other mechanisms of data storage that aren’t as rigid—mainly in the fact that they don’t enforce foreign key relationships. Remember, a foreign key relationship defines the relationship between a data record in one table and data recorded in a different table.

What does a NoSQL database look like if it doesn't store data in tables? Well, there are a few different models of NoSQL databases out there:


- Key-Value Stores: These are the simplest kind of NoSQL database. Every item in the database is stored as a “key” (an attribute name) along with a “value.” Some examples include Riak and Berkeley DB.
- Document-Based Stores: These are similar to key-value stores but differ in that each key can have a “document” as its value. A document is a data structure that can contain its own embedded key-value pairs or nested documents. (You’ll be learning more about this later!) One example is MongoDB.
- Graph Stores: These databases use graph structures of interconnected nodes to store information about networks of data. Some examples include Neo4J and Giraph.
- Wide-Column Stores: These are similar to relational databases but differ in that the names and format of the columns can vary from row to row even within the same table. Some examples include Cassandra and HBase.

When using a NoSQL database, you need to think about what type of database best fits your project and the type of data you want to store. Fortunately, this first step has already been taken care of for your Achievement project—you’ll be using MongoDB, which uses the document structure to define data in a database. It’s also a great database to pair with JavaScript and Node.js!


##### SQL or NoSQL?

Before taking a closer look at MongoDB, let’s quickly compare the two types of databases you’ve now learned about—SQL and NoSQL—to get a better handle on when one might be more useful than the other.

As was mentioned in the previous Exercise, the power of relational databases lies in their maintenance of data integrity. With a relational database, data is standardized throughout your application with consistent relationships. This makes them a safe choice for applications that need to perform complicated queries. Typical use cases include online stores, banking systems, or large employee databases, which all deal with a large amount of complicated data. Ensuring the integrity of this data is critical for both the institutions and their users.


> Curious as to what a “complicated query” actually looks like? Check out this list of complex SQL queries and answers to see exactly what we mean.

As SQL has been the database “norm” for so long, it’s most often found in legacy systems (older code) that have to be maintained. The work involved in transitioning data from an SQL database to a NoSQL database is often not feasible or beneficial, meaning that, as a developer, you’d be more likely to encounter SQL databases when working for older or more established organizations.

The rigidity of relational databases often makes them incompatible with how more modern development teams function. New technological needs (as well as the introduction of agile development cycles) require more flexibility, which has led to a sharp rise in the popularity of NoSQL databases. The old SQL databases simply don't cut it anymore, at least not with all the faster applications on the market requiring large, changeable data sets.


> NOTE!
> NoSQL’s flexibility makes it a great choice for storing organic data with constantly changing requirements, for instance, customer data, social network traffic, and analytics (usage data for web applications).

In the end, SQL and NoSQL database models both have their pros and cons, and you’d need to choose carefully if ever given the opportunity to decide on one for a project. Fortunately, both SQL and NoSQL can be used with any dev stack, so your decision won’t have to be influenced by the languages you and the rest of your team are comfortable with. What’s more important is the type of data you want to store and what you’ll be doing with it.

In the previous Exercise, you developed a SQL database for storing the movie and user data for your myFlix app. In this Exercise, you’ll be looking at how you can do the same thing, only with a non-relational database.


> You won’t be using your relational database from the previous Exercise with the API you’ve been building throughout this Achievement. This doesn’t, however, mean that your work in the previous Exercise was all for nothing. As mentioned in the section above, SQL databases are still very common, and you’re likely to encounter SQL databases on the job. It’s important that you understand how they work, as well as how you can create and query your own. Approaching databases in this way will ensure you’re able to work with both relational and non-relational databases—a skill attractive to any hiring manager.


#### MongoDB Database

MongoDB is a popular NoSQL document database that was first developed in 2007. It’s often paired with the other technologies you’ve been using throughout Achievement 2 (and the ones you’ll learn to use in Achievement 3). In fact, what you’re using is actually a popular tech stack—the “MERN” stack—which includes MongoDB, Express, React, and Node.js, though you’ll also sometimes see the “MEAN” stack, where React is replaced with Angular.

Both the MERN and MEAN tech stacks heavily favor JavaScript. This is because MongoDB follows JavaScript syntax. That said, MongoDB can be used with other tech stacks, as well, and doesn’t have to be limited to JavaScript. Its high performance (fast querying of data) and scalability make it an attractive NoSQL database for a wide variety of projects and stacks.

Let’s start by taking a look at how MongoDB databases are structured.


> NOTE!
> While this section will be looking specifically at MongoDB, the structure will be very similar for other document databases such as DynamoDB, CouchDB, and Azure Cosmos DB.

In relational databases, data is organized into “tables” of “records” (where each row is one record). With MongoDB, on the other hand, data is organized into “collections” of “documents.” For instance, a table in a relational database represents a single type of data entity, and a record represents an instance of that entity. This is different in MongoDB, where it’s a collection that represents a single type of data entity and a document that represents a single instance of that entity. You can think of a collection as a physical file folder where you store different documents. This is a key difference in terminology as collections of documents in NoSQL databases (usually) look nothing like tables.

![Diagram showing relational versus document model](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E7/Relational%20vs%20document%20model.jpg)


###### Figure 1

The other major difference lies in syntax. In the previous Exercise, you used the SQL language to create and query your SQL database. MongoDB, instead, uses JavaScript object format for its documents (including JSON format, for instance, when wrapping a document's keys/properties within double quotes), which you should already be quite familiar with. This means you can use the same JavaScript you’ve been using since Achievement 1 to create and interact with your database. Pretty convenient!

All of this probably feels a bit abstract right now, so let’s start working through a concrete example. What would the document structure for your “myFlix” database look like, for instance? First, there’ll be the obvious terminology changes: your “Movies” table would become a “Movies” collection, and each of the records inside of it would become documents, with each one corresponding to a single movie.

A single document inside of your “Movies” collection could look something like this:


```js
{
  _id: 1,
  Title:"Silence of the Lambs",
  Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
  Genre: {
    Name: "Thriller",
    Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
  },
  Director: {
    Name: "Jonathan Demme",
    Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
    Birth: "1944",
    Death: "2017"
  },
  ImagePath: "silenceofthelambs.png",
  Featured: true
}
```

You can also write a document's keys with quotes if you like (similar to JSON format):


```js
{
  "_id": 1,
  "Title":"Silence of the Lambs",
  "Description": "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
  "Genre": {
    "Name": "Thriller",
    "Description": "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
  },
  "Director": {
    "Name": "Jonathan Demme",
    "Bio": "Robert Jonathan Demme was an American director, producer, and screenwriter.",
    "Birth": "1944",
    "Death": "2017"
  },

  "ImagePath": "silenceofthelambs.png",
  "Featured": true
}
```

Does this look familiar? It follows the JavaScript object syntax, which you should be well-versed in by now, and includes a set of keys (such as “Title”) paired with values (such as “Silence of the Lambs”).

Some keys have their own nested keys and values (called embedded documents). For example, the “Director” key has an embedded document as its value, which itself has “Name,” “Bio,” “Birth,” and “Death” keys, each with their own values. You can identify an embedded document by the curly braces (`{}`) surrounding the nested key-value pairs. They’ll also often be visibly indented in a JSON file:


```js
Director: {
  Name: "Jonathan Demme",
  Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
  Birth: "1944",
  Death: "2017"
}
```

You’ll notice this document for “Silence of the Lambs” includes the same information as the record for “Silence of the Lambs” in your relational database from the previous Exercise. But the way it’s set up looks entirely different. In a relational database, each table includes columns that relate to the required attributes for each record in the table. This limits each record to only those specified attributes, as defined in the database schema. With MongoDB, attributes are defined as sets of keys and values within the document itself.

This means that no attributes are enforced. There’s no standardized or required “format” that each movie document must take within your collection. For example, you could create another movie document set up with different attributes:


```js
{
  _id: 3424324,
  Title: "The Lion King",
  Description: "This Disney animated feature follows the adventures of the young lion Simba.",
  Genre: {
    Name: "Animated"
  },
  ReleaseYear: 1994,
  ImagePath: "thelionking.png",
  Featured: true,
  Actors: ["James Earl Jones", "Matthew Broderick"]
}
```

You’ll notice this new document for “The Lion King” differs from the “Silence of the Lambs” document in several ways:


- It’s missing a “Director” attribute.
- Its “Genre” attribute doesn’t contain a “Description” attribute.
- It contains additional attributes for “ReleaseYear” and “Actors.”

This is exactly what makes MongoDB (and other non-relational databases) so convenient: not every record in the database needs to be the same. They can have different attributes depending on the requirements of the individual document. In other words, the schema is dynamic.

Why would you want a dynamic schema? After all, wouldn’t it lead to messy data if every document were to have different attributes?

Well, a dynamic schema provides much greater flexibility. For instance, if you decided sometime after creating your database that you wanted to store additional data you hadn’t originally planned for (e.g., actors)—or remove data that you originally had planned for, such as descriptions—it’s easy to simply create a new schema without corrupting any of the original data. To do this in SQL, you’d have to modify not only a table but potentially all the data already stored in the table, as well, to ensure it adheres to your new schema. You can see how the MongoDB option would be considerably less painful.

Of course, this does lead to potential side effects, for instance, mismatched (messy) data. Some movies might have actors and a release year attribute while others don’t. For this reason, it’s still best practice to ensure your database adheres to a set of enforced standards shared between all documents in a collection. (Just because MongoDB lets you create wildly mismatched documents doesn’t mean you should!) In fact, you should strive for the same type of uniformity required in SQL databases even within your NoSQL databases. The difference here is that you have to ensure it in the logic of your app.

In the next Exercise, you’ll be looking into precisely this as you learn how you can use Mongoose to enforce a sense of uniformity for you. For now, though, simply know that the key advantage to using non-relational databases is the flexibility it provides for changing up your database if you need to (without having to perform complex modifications on your current database).


##### One-to-Many Relationships with MongoDB

The term embedded documents was introduced in the example given above. Embedded documents are used to represent one-to-many relationships between data entities. In relational databases, different data entities each have their own separate tables, and foreign keys are used to define one-to-many relationships. As non-relational databases lack tables, however, a different method needs to be employed.

Let’s look at one of these embedded documents in greater detail. Here’s the same document from above for “Silence of the Lambs.” This time, turn your focus to the “Genre” attribute:


```js
{
  _id: 1,
  Title: "Silence of the Lambs",
  Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
  Genre: {
    Name: "Thriller",
    Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
  },
  Director: {
    Name: "Jonathan Demme",
    Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
    Birth: "1944",
    Death: "2017"
  },
  ImagePath: "silenceofthelambs.png",
  Featured: true
}
```

In SQL, all the information about each entity (“Movies” and “Genres”) would be kept in separate tables. You’d have a “Genres” table, a “Movies” table, and a foreign key in the “Movies” table that refers to a record in the “Genres” table.

While it is possible to create relationships like this in non-relational databases (i.e., separate collections with foreign keys), there’s a more flexible way to do so—by embedding information directly within the document, as was done in the example above. This usually makes for fewer and/or simpler queries to the server.

For instance, say you wanted to learn more about the genre of the movie, “Silence of the Lambs.”  With SQL, you could do so in the following way.

First, query the “Movies” table to get the GenreID from the movie with the title “Silence of the Lambs” (`SELECT GenreID FROM Movies WHERE Title = 'Silence of the Lambs'`).  Then, once you have the GenreID (for the sake of this example, let’s say it’s “1”), query the “Genre” table (`SELECT * FROM Genre WHERE GenreID = 1`).

MongoDB simplifies this process. All information about the genre is stored as an embedded document within the movie document itself. This means that a single, simple query for data about “Silence of the Lambs” will deliver information about the movie’s genre along with it. (You’ll learn how to write this query later in this Exercise.)

This simplicity does, however, come with its disadvantages. For one, it could lead to a lot of duplication. If you had multiple movies with the same director, you’d have to include the same biographical information about the director in each movie document, leading to a lot of redundant code.

Even worse than sheer redundancy is the fact that you’d have to update potentially hundreds of documents to make a single change. If you wanted to add a new detail about a director, for instance, you’d have to add this detail to the document of every movie that the director directed.

Fortunately, there’s an easier, alternative route—references.

Using References

Similar to foreign keys in SQL, references in MongoDB allow you to create connections between documents in different collections. Let’s take another look at the document for “Silence of the Lambs,” which is located in the “Movies” collection:


```js
{
  _id: 1,
  Title: "Silence of the Lambs",
  Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
  Genre: 99998,
  Director: 2344,
  ImagePath: "silenceofthelambs.png",
  Featured: true
}
```

See those numbers next to the “Genre” and “Director” attributes? These are primary keys, and they point to documents in separate “Genres” and “Directors” collections. Here’s what the 99998 and 2344 primary keys might look like in their own respective collections:

Genres Collection


```js
Genre: {
  GenreID: 99998,
  Name: "Thriller",
  Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience…"
},
```

Directors Collection


```js
Director: {
  DirectorID: 2344,
  Name: "Jonathan Demme",
  Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
  Birth: "1944",
  Death: "2017"
}
```

The 99998 primary key refers to the “Thriller” document in the “Genres” collection, while the 2344 primary key refers to the “Jonathan Demme” document in the “Directors” collection. This allows you to reuse genres and directors across multiple movies without having to repeat the information each time, just like you did with foreign keys when working with SQL. Information will be easier to update, and there’ll be less risk of inconsistent data.

“Wait!” you may say. “Doesn’t this eliminate the main benefit of using MongoDB and its embedded documents in the first place?” And you wouldn’t be incorrect. Using primary keys like this makes it necessary to query both the “Movies” collection and the “Genres” collection, just like you’d do with SQL.

So, which approach is better—embedded documents or references?

The answer, like so many things in web development, is that it depends. There’s no hard-and-fast rule; however, if the relationship between your data is one to few, meaning one entity of data correlates to only a few of a second entity of data, embedding probably makes sense. For example, if your database stored information about content updates for blog posts, it would probably make more sense to embed the information about each content update within each blog post document. This is because each blog post would probably only have a few content updates. Likewise, if you were storing information about customers, you could embed the information about each address within each customer document (each customer likely wouldn’t have more than a few addresses, for instance).

If the relationship between the data is “one to squillions,” on the other hand, meaning that one entity of data correlates to many, many of a second entity of data, it would make more sense to use references. For example, if your database were for a logging system that logs all events on a single computer—potentially hundreds of thousands of events within a short time frame—it would make much less sense to use embedded documents; rather, you could have one collection with documents about computers, another collection with documents about transactions, and so on, where each “transaction” document has a foreign key that points to a “computer” document corresponding to the computer on which the transaction occurred.

Storing large amounts of data as an embedded document can also increase the time it takes for a query to be processed, as the document itself is larger. So, another reason to use the reference method might be to speed up the time it takes to query the data in the MongoDB database.

The differences between using embedded documents and references can be summarized as:


###### Figure 2

For your myFlix application, you won’t be working with an especially large data set, so you’ll be using a document structure that embeds your genre and director data within your individual movie documents (at least for this iteration, each genre and director will only have a few movies). If, in the future, you were to scale your application and increase the size of your data set, you may wish to switch over to the reference method instead.


##### Many-to-Many Relationships in MongoDB

Before we move on to setting up MongoDB for your project, let’s look into one last thing you’ll need to account for when creating your database. Remember that each of your myFlix users will be able to create a list of their favorite movies. As was discussed in the previous Exercise, this is a many-to-many relationship—each user has many favorite movies, and each movie has many users who’ve selected it as a favorite. Take a look at the following image:

![Many to many relationship between users and their favorite movies](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E7/figure3.png)


###### Figure 3

In SQL, you created this relationship via an intermediary table between movies and users called “Users-Movies” that stored both a UserID and a MovieID. This table then stored every match between a user and a favorite movie of that user.

While you could use a similar structure to recreate these relationships in MongoDB, you could also try something new—by creating an array of references. This array could be located in either (or both!) collections and could either take the form of a single movie with an array of references to users who like that movie or a single user with an array of references to movies that the user likes.

In your myFlix application, you’ll only need to fetch data from the user side—you’ll need to know all the movies that a certain user favorites but not all the users who’ve liked a certain movie. Thus, you’ll only need to create arrays within the “Users” collection (one inside of each user document). That’s not to say you couldn’t create arrays in the “Movies” collection, for instance, if you wanted to show all the users who’ve favorited a movie on that movie’s page—just that for the sake of your app, you don’t need to.

To put a concrete example to all of this explanation, let’s take a look at what a single user document within the “Users” collection might look like:


```js
{
  _id: 3424324,
  Username: "davidcohen2580",
  Password: "test123",
  Email:" davidcohen2580@gmail.com",
  Birthday: "09/10/1988",
  FavoriteMovies: [ 3424324, 43234, 23443 ]
}
```

First, make sure you understand what each of the different attributes above is referring to: the user’s name is “davidcohen2580,” their password is “test123,” and so on with the “Email” and “Birthday” attributes. The last attribute for this user, “FavoriteMovies,” is where the array discussed above has been added. There are three numbers located in this array. While you can’t tell what movies these numbers refer to just by looking at them, you can at least tell that this user has favorited three movies. If you were to cross-reference these numbers with the “Movies” collection, you’d be able to determine which movies they refer to. This is an easy way to create a list of multiple references for a single attribute!

Now that you’ve learned about a few different types of relationships and how to create them with MongoDB collections and documents, let's actually set up MongoDB and play around with some data!


#### Spotlight on AI

Generate mock data to populate a database using an AI

Just as we suggested in the previous task, you can use an AI tool of your choice to help mock the data for your non-relational database. You can try asking the AI to convert your data from Exercise 2.6 into a document-based structure, or you can make a new request to an AI tool like ChatGPT (or equivalent) to create new data for you that meets the task requirements.

Check out the following demo from one of your instructors, where you can see how to:


- Give context to the AI (e.g., you need mock data for a non-relational database using MongoDB);
- State the collection name (e.g., “users”);
- State the required properties within the collection, in order to generate the documents;
- State the number of documents you want to generate;
- Request a desired format or structure (e.g., an array).

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
3:25
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
      
      #wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset{font-size:14px;}
#wistia_chrome_23 #wistia_grid_29_wrapper div.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper span.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper label.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper fieldset.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper button.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper img.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper a.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper svg.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper p.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper a.w-css-reset{border:0;}
#wistia_chrome_23 #wistia_grid_29_wrapper h1.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper h2.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper h3.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper p.w-css-reset{margin:1.4em 0;}
#wistia_chrome_23 #wistia_grid_29_wrapper a.w-css-reset{display:inline;}
#wistia_chrome_23 #wistia_grid_29_wrapper span.w-css-reset{display:inline;}
#wistia_chrome_23 #wistia_grid_29_wrapper svg.w-css-reset{display:inline;}
#wistia_chrome_23 #wistia_grid_29_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_23 #wistia_grid_29_wrapper ol.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_23 #wistia_grid_29_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_23 #wistia_grid_29_wrapper ul:before.w-css-reset{display:none}
#wistia_chrome_23 #wistia_grid_29_wrapper ol:before.w-css-reset{display:none}
#wistia_chrome_23 #wistia_grid_29_wrapper li:before.w-css-reset{display:none}
#wistia_chrome_23 #wistia_grid_29_wrapper ul:after.w-css-reset{display:none}
#wistia_chrome_23 #wistia_grid_29_wrapper ol:after.w-css-reset{display:none}
#wistia_chrome_23 #wistia_grid_29_wrapper li:after.w-css-reset{display:none}
#wistia_chrome_23 #wistia_grid_29_wrapper label.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_23 #wistia_grid_29_wrapper button.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_23 #wistia_grid_29_wrapper img.w-css-reset{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset button::-moz-focus-inner{border: 0;}
      #wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree {font-size:14px;}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree div{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree span{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree label{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree fieldset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree button{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree img{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree a{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree svg{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree p{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree a{border:0;}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree h1{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree h2{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree h3{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree p{margin:1.4em 0;}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree a{display:inline;}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree span{display:inline;}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree svg{display:inline;}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree ol{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree ul:before{display:none}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree ol:before{display:none}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree li:before{display:none}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree ul:after{display:none}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree ol:after{display:none}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree li:after{display:none}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree label{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree button{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree img{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-tree  button::-moz-focus-inner{border: 0;}
      #wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-max-width-none-important{max-width:none!important}
      #wistia_chrome_23 #wistia_grid_29_wrapper .w-css-reset-button-important{border-radius:0!important;color:#fff!important;}
    #wistia_grid_29_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
#wistia_grid_29_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
#wistia_grid_29_above{position:relative;}
#wistia_grid_29_main{display:block;height:100%;position:relative;}
#wistia_grid_29_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_29_center{height:100%;overflow:hidden;position:relative;width:100%;}
#wistia_grid_29_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_29_top_inside{position:absolute;left:0;top:0;width:100%;}
#wistia_grid_29_top{width:100%;position:absolute;bottom:0;left:0;}
#wistia_grid_29_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
#wistia_grid_29_bottom{width:100%;position:absolute;top:0;left:0;}
#wistia_grid_29_left_inside{height:100%;position:absolute;left:0;top:0;}
#wistia_grid_29_left{height:100%;position:absolute;right:0;top:0;}
#wistia_grid_29_right_inside{height:100%;right:0;position:absolute;top:0;}
#wistia_grid_29_right{height:100%;left:0;position:absolute;top:0;}
#wistia_grid_29_below{position:relative;}

Note that you’ll likely need to experiment with some additional prompts to the AI in order for the task requirements to be met. For example, you could ask the AI to “Adjust the mocked data in the “movies” collection so that at least two of the movies have the same director, and at least two movie are the same genre.”

Finally, don’t forget to provide your instructor with evidence of how you’ve used AI along with your main submission for the task. This should include:


- Screenshots (or a screen recording) demonstrating your interaction with the AI;
- Any reflections on the quality of the data generated;
- An explanation of how you had to adjust either your prompts or the generated output (or both).


#### Installing MongoDB

Ready to install MongoDB? The instructions will be a bit different depending on if you’re using a Mac or a Windows machine. Regardless of your device, by the end of this section, you’ll have successfully installed the following:


- MongoDB Community Server: This is the Mongo server that interacts with incoming commands over the network, processes the commands, and stores data. You’ll be using the “community” edition, since it’s free and sufficient for your project, rather than the “enterprise” edition.
- MongoDB Shell (mongosh): This is where you run commands and make queries that will allow you to create and update a database.
- MongoDB Database Tools: MongoDB comes with a lot of important tools that can be used for various purposes in your project, for instance, exporting and importing your databases, which is useful for creating and sharing backups.


#### Installing MongoDB Community Server (Mac)

Step 1. To install MongoDB, you’ll need to install [Homebrew](https://brew.sh/), a package management system that makes installing software on Mac devices super simple. Before installing Homebrew, make sure that your macOS's version is at least High Sierra (10.13), as this is a minimum requirement for the installation. If you’re currently using an earlier version of macOS, you’ll need to [upgrade your OS](https://www.apple.com/macos/how-to-upgrade/) now.

Step 2. If you don’t already have Homebrew installed, head to the [Homebrew website](https://brew.sh/) and follow the instructions for installing it:

![Screenshot of Homebrew install page](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E7/Install%20Homebrew.png)


###### Figure 4.


- If you already have Homebrew installed, you’ll need to update it. To do so, type brew update into your terminal.
- If you don’t know whether you have Homebrew installed or not, type brew doctor in your terminal. If anything other than command not found is returned, you have Homebrew installed.

Step 3. Once Homebrew has finished installing, you’ll see “Installation successful” returned in your terminal.

Step 4. You might be asked to run a few additional commands to ensure Homebrew is added to your PATH. Follow the instructions in your terminal to complete these steps.

Step 5. Next, type `brew tap mongodb/brew` into your terminal to install the MongoDB custom "tap."

Step 6. With the tap installed, you can install the latest version of MongoDB via the command `brew install mongodb-community`.

Step 7. Finally, type `brew services start mongodb-community` into your terminal. This is what starts up the Mongo server. You’ll need to have the Mongo server running any time you want to interact with your database, view your myFlix app, or use the Mongo shell.

To stop running the Mongo server, enter the command `brew services stop mongodb-community` in your terminal.

What about the MongoDB Shell (mongosh) and MongoDB Database Tools? If you’re on a Mac, starting with MongoDB 4.4.1, these will be installed by default when you install MongoDB through Homebrew. The command `brew install mongodb-community` will install the latest available production release of the MongoDB Community Server, Mongo Shell, and MongoDB Database Tools.


> TIP!
> For extra help with installing MongoDB on a Mac, check out the Official MongoDB Software Homebrew Tap. You can also check the official MongoDB Community Edition installation guide.


#### Installing MongoDB Community Server (Windows)

Step 1. Download the latest version of MongoDB by heading over to the [official MongoDB download page](https://www.mongodb.com/try/download/community).

Step 2. Make sure that “Windows” is selected as the platform and “msi” (Microsoft Software Installer, for installing packages on Windows OSs) is selected as the package, then download it.

![MongoDB Windows download page](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E7/MongoDB%20Comm%20Server%20DL.png)


###### Figure 5.

Step 3. Run the installer. Go through it until you reach a screen asking you to Choose Setup Type. You’ll have two options: Complete and Custom. Go ahead and select Complete, then hit Next.

Step 4. In the next screen, you’ll be asked if you want to install MongoDB Compass, which is a graphical user interface (GUI) for MongoDB (similar to pgAdmin for PostgreSQL). You won’t be using this tool during this course because you’ll learn how to use MongoDB via its shell tool and later on via another web-based GUI, MongoDB Atlas. Skip the MongoDB Compass installation by unchecking the checkbox for Install MongoDB Compass.

Step 5. Complete the installation.

Step 6. Add the path (i.e., the location of the Mongo server binary (the bin folder)) to your PATH as a system environment variable. When you later open a command prompt and run a related command, the PATH variables will tell the OS where to look for files related to the program (see Figure 8 for how to locate the bin folder).


> Troubleshooting
> If you need to troubleshoot your installation, you may want to check the official MongoDB installation guide.


##### Install MongoDB Shell on Windows (mongosh)

To access the MongoDB Shell (`mongosh`), you’ll first have to install it. Let’s do that now.

Step 1. Start by heading over to the [MongoDB Shell](https://www.mongodb.com/try/download/shell) to install the appropriate mongosh version for your Windows OS.

Step 2. Make sure that “Windows (MSI)” is selected as the platform and “msi” is selected as the package, then download it.

![MongoDB Shell Download page](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E7/MongoDB%20Shell%20DL.png)


###### Figure 6.

Step 3. Click on the installer file, and follow the prompts to install mongosh.

Step 4. Add the path (i.e., the location of the Mongo server binary (the bin folder)) to your PATH as a system environment variable. When you later open a command prompt and run a related command, the PATH variables will tell the OS where to look for files related to the program (see Figure 8 for how to locate the bin folder).


> Troubleshooting: Can’t Install mongosh with “msi”?
> If you were unable to install Mongosh with the “msi” option, you can instead install via a .zip file. Follow these instructions:
> 
> 
> Start by heading over to the MongoDB Shell, and select “Windows” (without “msi”) as your platform to install the appropriate mongosh version for your Windows OS.
> Select “zip” from the package options. 
> Click download.
> Extract the zip files from the downloaded archive to the desired folder on your PC. Don’t forget the path to the folder.
> Add the path of the mongosh binary folder to the PATH in your system environment variable.

To be sure that you’ve accurately configured your PATH environment variable to locate mongosh, head to your terminal and enter the `mongosh –help` command. If you’ve accurately configured your PATH, you’ll get a response displaying a list of valid commands.


##### Install MongoDB Database Tools on Windows

MongoDB Database Tools aren't available in the default MongoDB installer you just used for your Windows OS. Instead, you’ll have to install them separately using the following instructions (which are similar to the steps you took to install `mongosh` earlier):

Step 1. Head over to the MongoDB [Database Tools download page](https://www.mongodb.com/try/download/database-tools).

Step 2. Make sure that “Windows” is selected in the Platform dropdown list and “msi” is selected in the Package dropdown list, then click Download.

![MongoDB Command Line Database Tools download page](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E7/MondoDB%20CLD%20tools%20DL.png)


###### Figure 7.

Step 3. Run the installer. Keep all the default settings.

Step 4. Add the path to the MongoDB Database Tools to the PATH in system environment variables. Figure 8 demonstrates how to do this.

[](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E7/2_7_add_to_Env_variables.gif)


###### Figure 8. (Click to Zoom)


#### Using Mongo Shell

Next, you need to start the Mongo shell, which will convert your command line tool into a shell that allows you to enter MongoDB database commands. Follow the relevant instructions for your system:


- Mac: 


Start the server with brew services start mongodb-community; 
Launch the shell by typing mongosh;
Quit the server with brew services stop mongodb-community.
- Windows: 


Open a new PowerShell terminal window;
Launch the shell by typing mongosh;
To quit the Mongo shell and return to the normal terminal, type quit().

The Mongo shell, once launched, allows you to type commands for performing CRUD operations on your data, similar to the way you typed SQL commands into the PostgreSQL admin interface query tool in the previous Exercise. Just remember that, with MongoDB, you’ll be writing your commands in JavaScript rather than SQL.


##### Showing Databases and Collections

Before diving into CRUD operations in MongoDB, let’s first go over some high-level commands you can execute in the Mongo shell. These can be typed directly in your terminal as you read along, so long as you’ve activated/launched the Mongo shell (as described in the previous section).

To see a list of all databases, type:

`show dbs`

If you type this command right after installing MongoDB, it should list a few databases that the system created by default, for instance, “admin” and “config” (which contains configuration information).

To see which database MongoDB is currently set to, type:

`db`

In Figure 9, you can see that MongoDB is currently set to the “test” database.

To either create a new database or switch to a different database, type:

`use [database name]`

If you type, for instance, `use cfDB` (and you haven’t created the “cfDB” database yet), MongoDB will create it for you, and “switch” to you being within this database. In the Figure 9 example, the database called `cfDB` was created.

![Screenshot showing MongoDB creating database and switching user to it automatically](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E7/test.png)


###### Figure 9.

To switch to another database, you can simply type `use [database name]` again. Then, the next time you type `use cfDB` (for instance, if you were working in a different database or had quit Mongo), the existing “cfDB” database will be opened (rather than a new one being created).


> Tip!
> Whatever you decide to name your database, be sure to keep a record of it as you’ll need it for the next Exercise!

To view all of the collections in your current database, type:

`db.getCollectionNames()`

If you haven’t created any collections yet, this will return an empty array (which you’ll learn how to populate in the next section).

The following table (Figure 10) summarizes the high-level commands you’ve just learned:


```js
show dbs
```


```js
db
```


```js
use [database name]
```


```js
db.getCollectionNames()
```


###### Figure 10

It’s now time to get into the real meat of the MongoDB pie—CRUD operations!


> Using the Mongo Shell
> In the Mongo shell, if a line ends with an opening bracket, whether it’s [, {, or (, (for example: var movies = {, if you were using ES5 language), and you press the Enter key, Mongo will understand that you haven't completed your command yet. The cursor will simply move to a new line without executing the command, and you’ll see three dots . . . at the beginning of the line. This will keep happening until you include a closing bracket and press Enter again. Take a look at the following animation for a better idea of what this looks like in practice:
> 
> 
> 
> Figure 11.

You've already learned a lot in this Exercise! It’s time for a tea break, after which you can start performing CRUD operations in MongoDB.


#### CRUD in MongoDB

In [Exercise 2.6: Relational Databases & SQL](https://careerfoundry.com/en/steps/relational-databases), you learned all about the logic behind creating data, reading data, updating data, and deleting data using records and tables in SQL. Now, you’re going to learn how to perform those same operations again—only this time, using documents and collections in MongoDB. Let’s get started!


##### Creating New Collections and Documents

Unlike in SQL, where you have to predefine your “tables” with schema before inserting any data into them, with MongoDB, you can create a new collection and insert data into it at the same time. An instance of data in MongoDB is referred to as a “document”. For example, a document would be a single movie in a “Movies” collection.

To get started, the JavaScript syntax for creating a new collection in MongoDB is as follows:

`db.createCollection("collectionName")`

The name of your collection should all be in lowercase. To create a collection for “movie” documents, for example, you can type:

`db.createCollection("movies")`

![Screenshot showing the creation of a movies collection](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E7/test%20movies.png)


###### Figure 12.

The JavaScript syntax for inserting a new document into a collection is:

`db.[collectionName].insertOne(document-to-insert)`

Very usefully, if the collection you’re inserting the document into doesn’t exist yet, this command will automatically create that collection, similar to how the `use [database name]` command from earlier automatically creates a new database if the specified database doesn’t exist yet. This means that if you want to immediately begin inserting documents into a brand new collection, you can skip the standalone `db.createCollection()` command.

Let’s say, for instance, that you wanted to create a new movie document within a collection called “movies.” In your MongoDB shell, type the following code (noting that the insertOne command comes right at the end):


> Tip!
> Copy-pasting the code will likely lead to syntax errors. It’s best that you type the code directly into your shell (you may want to first take a look at the “Apostrophes in MongoDB” note that follows the code, as it’s about writing multi-line commands similar to the one in the code).


```js
var movie1 = {
  Title: "Silence of the Lambs",
  Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
  Genre: {
    Name: "Thriller",
    Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
  },
  Director: {
    Name: "Jonathan Demme",
    Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
    Birth: "1944",
    Death: "2017"
  },
  ImagePath: "silenceofthelambs.png",
  Featured: true
}

db.movies.insertOne(movie1)
```


> Apostrophes in MongoDB
> If you use single quotes to wrap strings instead of double quotes, and the string itself needs to contain an apostrophe (e.g., This is Fred’s bag), you’ll need to prepend the actual apostrophe with a backslash \ so that MongoDB understands this is an apostrophe rather than the end of the string, for example:
> 
> let someRandomObject = {
>  Description: 'This is Fred\'s bag'
> }
> 
> db.someRandomTable.insertOne(someRandomObject)

As you can see, most of the code is simply the data for the document, which, in this case, is the movie details for “Silence of the Lambs” (along with embedded documents for the genre and director). Below the data comes the `insertOne` command, which is similar to the SQL `INSERT` syntax you learned in the previous Exercise. What this does is add a single document to the collection of your choice—in this case, the new “movies” collection you want to create.

As noted previously, documents in MongoDB don’t require any predefined schema, meaning that you could potentially add a document to the “movies” collection that included any variety of keys and values you wanted.

Also note that no ID was given for the document in the code. This is because MongoDB will automatically assign each document an ID when it adds it to the collection. Once you run the entire command, you should receive as a response JSON formatted like the following:


```js
{
  "acknowledged" : true,
  "insertedId" : ObjectId("5c3bd189515a081b363cb7e4")
}
```


> Note!
> If you manually added the _id key-value pair to the document you’re about to insert, Mongo will use that as the ID instead of generating one. The ID will be displayed as the value of insertedId when displaying the insertOne operation results.
> 
> Of key note to remember here—ObjectId("5c3bd189515a081b363cb7e4") is not the same as "5c3bd189515a081b363cb7e4".

All you need to worry about here is the “insertedId” property. This is what stores the ID that was automatically assigned to the item. You’ll need this ID later if you want to read/update/delete the item.

Next, let’s take a look at how to read/view the record you just added.


##### Reading Records

To read all documents from a certain collection, use the command:

`db.[collectionName].find()`

For instance, try typing `db.movies.find()`. This will locate the new “movies” collection you just created in the previous section, bringing up an array of all the documents. Currently, there’s only one document in your “movies” collection—the one for “Silence of the Lambs” that you added:


```js
{ "_id" : ObjectId("5c3bd189515a081b363cb7e4"), "Title" : "Silence of the Lambs", "Description" : "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.", "Genre" : { "Name" : "Thriller", "Description" : "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience." }, "Director" : { "Name" : "Jonathan Demme", "Bio" : "Robert Jonathan Demme was an American director, producer, and screenwriter.", "Birth" : "1944", "Death" : "2017" }, "ImagePath" : "silenceofthelambs.png", "Featured" : true }
```

You should see all the same information you added previously, only this time, with an additional `"_id" : ObjectId("5c3bd189515a081b363cb7e4")`. This was automatically assigned by MongoDB when it inserted the document.

If there were multiple records in the collection, `.find()` would show an array of all of the documents. However, if you only want to see the first document in a collection, you can use the following command:

`db.[collectionName].findOne()`.


##### Reading with Conditions

In the previous Exercise, you used a `WHERE` clause to specify that you wanted to extract a record for which only certain conditions were true (e.g., all movies with the “Thriller” genre). In MongoDB, you can do this in a similar fashion; only, instead of a `WHERE` clause, you use a `find()` function. Take a look at the following two syntaxes:

`db.[collectionName].find( [Condition] )`

`db.[collectionName].findOne( [Condition] )`

The first command would find all documents for which the condition applies. The second command would only find one. For instance, if you wanted to find just one movie document based on the movie’s title, you’d type the following:

`db.movies.findOne( { Title: "Silence of the Lambs" } )`

![Search based off individual movie title ](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E7/SOTL%20details.png)


###### Figure 13.

To find a certain document by its ID, you need to wrap the ID in an `ObjectID` constructor, as follows:

`db.movies.findOne( { _id: ObjectId("5c3bd189515a081b363cb7e4") })`

Remember that when you first inserted the document, the ID was returned in the response in the JSON. You can now use that ID to search for the document with `findOne`.

You can also query nested document structures. For example, if you wanted to find all the movies in a certain genre, you could use a nested structure for the condition, as follows:

`db.movies.find({ "Genre.Name": "Thriller" })`


> Note
> Make sure you’ve added quotes whenever you want to refer to nested keys, for instance, "Genre.Name" (here, both single and double quotes are allowed as it follows JavaScript object syntax rules). Writing it without quotes (e.g., db.movies.find({ Genre.Name: "Thriller" }))  will throw a syntax error upon executing the command.

This searches each movie document for a “Genre” key with a nested document that contains a name key with a value of “Thriller.” Only documents that contain that nested structure would be returned.

Be aware that `db.movies.find({ "Genre.Name": "Thriller" })` isn’t the same as `db.movies.find({ Genre: { Name: "Thriller" } })`. Although they may look similar at first glance, the second query will search for movie documents with a “Genre” key holding a nested document that exactly equals the document `{ Name: "Thriller" }` itself, which means that a movie in the following example (Silence of the Lambs) won’t match the query condition even though it has `Thriller` as its genre name. This is because the nested document assigned to `Genre` has an extra key-value of `Description: ...`.


```js
{
  Title: "Silence of the Lambs",
  Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
  Genre: {
    Name: "Thriller",
    Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
  },
  Director: {
    Name: "Jonathan Demme",
    Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
    Birth: "1944",
    Death: "2017"
  },
  ImagePath: "silenceofthelambs.png",
  Featured: true
}
```


##### Updating Records

If you need to add information to—or change the information of—a document, you need to update that document. The syntax for doing so is as follows:


```js
db.[Collection Name].update( [Condition for which records to update], [Update to make] )
```

For example, if you wanted to update a certain document in the movies collection with the ID “5c3bd189515a081b363cb7e4” and change the description from “A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer” to “A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer,” you could type the following (note that you’d need to replace the `ObjectID` here with the actual ID of the document in your own database, as every ID is unique):


```js
db.movies.updateOne(
  { _id: ObjectId("5c3bd189515a081b363cb7e4") },
  { $set: { Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer." } }
)
```

Please also note the use of `$set` to update a single field. Without it, the other fields would simply be removed and you would end up having a document with just the `_id` and `Description` fields.

After making a successful update, you should receive a message like the following:

`WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })`

If you receive a message such as `WriteResult({ "nMatched" : 0, "nUpserted" : 0, "nModified" : 0 })`, it means something went wrong. Remember to check that the ID matches, as this is where updates commonly go wrong.

Try making a change to one of your own documents, then check that the change has been made by reading the record again. For instance, to read the document that was just updated in the example just shown, you’d use the following command (though yours will be different as your ID will be different):

`db.movies.findOne( { _id: ObjectId("5c3bd189515a081b363cb7e4") })`

This should return your updated description.

$push

What if, however, you wanted to add something entirely new to one of your movie documents? For instance, let’s look back at the movie document for “Silence of the Lambs”:


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
    Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
    Birth: "1944",
    Death: "2017"
  },
  ImagePath: "silenceofthelambs.png",
  Actors: [ "Anthony Hopkins", "Jodie Foster" ],
  Featured: true
}
```

Take a look at the “Actors” attribute. Each individual actor in the movie has been stored in an array that’s been assigned to the “Actors” key. If you wanted to update the document by adding a new actor to its list of actors without having to update the entire array, you could use MongoDB’s `$push` command, which allows you to add a single value to the end of an array. It takes the syntax:


```js
db.[collectionName].update(
  [condition of which items to update],
    { $push: { name of key to add value to end of array] : [value to add to end of array ] } }
)
```

Let’s say you wanted to add the new actor “Kasi Lemmings” to the “Actors” attribute for “Silence of the Lambs.” You could type the following:


```js
db.movies.update(
  { _id: ObjectId("5c3bd189515a081b363cb7e4") },
  { $push: { Actors: "Kasi Lemmings" } }
)
```

However, if you had a separate “Actors” collection that held all of your actor documents (i.e., you were using the reference method rather than the embedding method), you’d have to employ a slightly different method. In this case, each movie document would still have an “Actors” attribute, but within the array for that attribute would be reference values rather than the actors’ names themselves. The “Silence of the Lambs” document, for instance, could look like this:


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
    Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
    Birth: "1944",
    Death: "2017"
  },
  ImagePath: "silenceofthelambs.png",
  Actors: [
    ObjectId("f56dgkof89adfdfadsfdsfdasf"),
    ObjectId("5c36das45daaw4f9a22917245")
  ],
  Featured: true
}
```

Pushing a new actor to this array is no longer as straightforward as adding a new name to the end; instead, you need to push the ID of the new actor. This means that, before you can add any new actors, you must first add them to your “Actors” collection so that you can obtain their ID. The syntax would look something like this:


```js
db.movies.update(
  { _id: ObjectId("5c3bd189515a081b363cb7e4") },
  { $push: { Actors: ObjectId("54435as4aafoop4554s5a") } }
)
```

In this way, you can use the `$push` function to push any type of data onto a key’s array within a document—strings, numbers, and even `ObjectId`s referring to documents in external collections.

Here’s another example. This time, let’s say you wanted to add a favorite movie to a user’s `FavoriteMovies` array:


```js
db.users.update(
  { Username: "Lilly" },
  { $push: { FavoriteMovies: ObjectId("5c3bd189515a081b363cb7e4") } }
)
```


> Note
> Whenever you want to reference an existing ID within the Mongo Shell, make sure to use ObjectId. For example, if you want to reference the ID "5c3bd189515a081b363cb7e4", you would write ObjectId("5c3bd189515a081b363cb7e4"), not "5c3bd189515a081b363cb7e4"; otherwise, it will be interpreted as a regular string rather than an ID.


##### Deleting Records

The last CRUD method to cover is the “D”: “DELETE.” To delete all the records from a collection that meet a certain condition, the command would be as follows:

`db.[collectionName].deleteOne([condition])`

Or

`db.[collectionName].deleteMany([condition])`

For instance, if you wanted to delete all movie documents from your “movies” collection that are in the “comedy” genre, you could run the following command:

`db.movies.deleteMany({ "Genre.Name": "Comedy" })`

Again, similar to the `find()` example, this query isn’t the same as `db.movies.deleteMany({ Genre: { Name: "Comedy" } })` for the exact reasons mentioned earlier.

As with SQL, be very careful when removing data from your collection. You can’t simply “undo” any deleted data!


#### Summary

Well done! In this Exercise, you learned how to set up the database layer for an app using MongoDB. You learned the benefits of using non-relational databases, as well as how you can use collections and documents to store data as keys and values (as opposed to the tables you learned how to manipulate with SQL). In the next Exercise, you’ll finally get to integrate your database with the rest of your app using business logic, tying everything you’ve built together. You’ll also explore how you can use Mongoose to maintain the flexibility of a non-relational database while maintaining consistency throughout your database. Your API will finally start to take shape!

But first, to this Exercise’s task, where you’ll be using what you’ve learned to create a new, non-relational database for your myFlix app!


#### Resources

If you’re curious to read more about the topics covered in this Exercise, then we recommend taking a look at the following resources. Note that this reading is optional and not required to complete the course.

SQL vs. NoSQL Databases


- Relational vs. Non-Relational Databases: Which One Is Right For You?
- Differences Between SQL and NoSQL

MongoDB


- MongoDB Documentation
- MongoDB Documentation: CRUD Operations
- 6 Rules of Thumb for MongoDB Schema Design
- Installing MongoDB Community Edition on macOS
- Installing MongoDB Community Edition on Windows

Take the quiz to test your knowledge on this Exercise.


#### Task


- Direction
- Submission History

In the previous Exercise, you created a relational (SQL) database schema that could be used for a movie API. That database contained data about movies, users, and related entities for your application, such as movie genres. In this task, you’re going to create a non-relational database to serve the same purpose.

To recap, here’s a list of the key features your app should contain, as per your [project brief (PDF)](https://images.careerfoundry.com/public/courses/fullstack-immersion/Full-Stack%20Immersion%20A2%20Project%20Brief.pdf). This should help you decide on the data you’ll need to store in your database.


- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister

Part 1: Creating Your Database

In this first part of the task, you'll create your database. You're welcome to use AI to help you with this step of the task, as you learned in the "Spotlight on AI" section of the Exercise.

Directions


1. Follow the instructions in the Exercise to install, configure, and run a MongoDB database. Remember, your database will be stored in a new “db” directory that’s separate from your project folder.
1. Add at least 10 movie documents to a “movies” collection. Note: Don't use placeholder values.


Use embedded documents to store information about genre, director, and additional attributes of your choice.
Make sure that the format is standardized between all documents in your collection.
At least 2 of the movies should have the same director, and at least 2 should have the same genre.
1. Add at least 5 user documents to a “users” collection.


The Birthday attribute should be stored as a Date data type. To create this field correctly, you should use the following format: Birthday: new Date("1985-02-19").
1. Use references to store a list of favorite movies for each user.

Part 2: Querying Your Database

The next few steps involve querying your database. For these, take screenshots of your terminal to show each query, along with its response. In total, you should have the following (you can include more than one query in a single screenshot):


- 3 “READ” queries and their responses;
- 3 “UPDATE” queries and their responses;
- A “DELETE” query and its response;
- A final “READ” query and its response.

Directions


1. First, write 3 "READ" queries:


One to read all the movies from the “movies” collection that match a certain name
One to read all the movies in the “movies” collection that have a certain genre
One to read all the documents that contain both a certain genre AND a certain director
1. Next, write 3 "UPDATE" queries:


One to update the description of a particular movie
One to update the bio of a certain director of multiple movies
One to add a certain movie to a particular user’s list of favorites
1. Finally, write a "DELETE" query to delete a certain user, by username.
1. After you run your update and delete queries, make sure you read the entire collection again to ensure you’ve made the proper modifications to the data.
1. Reopen your “documentation.html” file from Exercise 2.5: REST & API Endpoints and check that you have all the correct endpoints for the requests users can make to your database. If you need to write a few new endpoints, do so now.
1. Submit an exported copy of your MongoDB database (in JSON format) and the zip file of your queries and responses screenshots (3 “read” queries and their responses, 3 “update” queries and their responses, a “delete” query and its response, and a final “read” query and its response) here for your tutor to review.


> Exporting Your MongoDB Database
> Exporting your MongoDB database into a single JSON file is easy! After you're finished making your database, you need to quit the Mongo shell (the export command isn't available within the Mongo shell). You can quit the shell by typing in the command quit(). Once you're back in your normal terminal (but with the Mongo server still running), simply enter the following command for each one of your collections:
> 
> mongoexport -d name_of_database -c name_of_collection -o name_of_file.json
> 
> Make sure you replace your own data in the command. For instance, name_of_database should be the name of your database, name_of_collection should be the name of the collection (you need to run the command again for each one of your collections), and name_of_file.json is the name you want to give your new JSON file. If you don't specify a certain folder, it will output the new file into your current project directory folder. Give it a try!

Bonus Task

Expand your database even further by adding another collection or increasing the number of attributes associated with each movie or user. What data might you consider adding?


- An “Actors” attribute to documents in the “Movies” collection. Note that this would have a many-to-many relationship with each movie document (an actor stars in many movies, and a movie stars many actors).
- A “Movies” attribute to the “Director” entity (one-to-many)
- A “ReleaseYear” and/or “Rating” attribute to documents in the “Movies” collection (one-to-many)

Rubric

Refer to the categories below to see how to meet the requirements of the approved stage

![](https://cdn.careerfoundry.com/assets/rubrics/not_yet-c9fb80e521507759d546f847f8a65a00c66f2c8ec7ece4e37f98c25aa122778c.svg)


- Submission doesn’t include a JSON file, JSON file doesn’t contain data relevant to the project, or no zip file of screenshots has been included; OR
- Submission includes a JSON file and a zip folder of screenshots; BUT
- JSON file is missing data (e.g., not enough movies, directors, genres, etc.); OR
- Zip file doesn’t contain the required number of screenshots

![](https://cdn.careerfoundry.com/assets/rubrics/almost_there-f4bb1c077a0a826e7d4e3ecb72859fc401d362d9bd49c0658f4fd85c4a047a87.svg)


- Submission includes a JSON file and a zip folder of at least 16 screenshots of the following queries and their responses: 3 “READ” queries, 3 “UPDATE” queries, 1 “DELETE” query, and a final “READ” query; BUT
- JSON file contains issues; either the documents aren’t well-formatted or the file itself contains an error

![](https://cdn.careerfoundry.com/assets/rubrics/approved-7dfdcf59318cf52fcbd1333d8b71bf7a2bde35b6e0b753ac975349982495e0b4.svg)


- Submission includes a JSON file and a zip folder of screenshots; AND
- JSON file contains a MongoDB database of at least 10 movies without using placeholder values (2 of which have the same director, 2 of which have the same genre), and 4 (not 5, as one of the users is to be deleted) users (each of which has a list of favorite movies); AND
- Zip folder contains at least 16 screenshots of the following queries and their responses: 3 “READ” queries, 3 “UPDATE” queries, 1 “DELETE” query, and a final “READ” query

Questions for this task

Student Submissions

Check out recently submitted work by other students to get an idea of what’s required for this Task:

EVALUATION COMPLETE

![](https://coach-courses-us.s3.amazonaws.com/users/photos/thumb/51945.jpg?1660008090)

Vivek Maskara

Sep 27, 2024 at 10:41 PM

Hi Oliver,

Thanks for submitting the assignment.

Great job working with MongoDB. Your submission meets all the requirements of the task. Kudos for that.

I hope you are enjoying working through these assignments. These exercises will lay down the changes for the frontend application that you will be building in the next Achievement.

Things you did great:


- Nice job installing MongoDB and adding the movies DB to it.
- Created the dataset for movies and users.
- Ran the insert, update and delete queries and attached the required results, which are correct.

Checkout these resources for further reading:


- MERN Explained
- SQL to MongoDB Mapping Chart
- MongoDB Cheat Sheet
- Who Uses MongoDB?

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

