

## Server-Side Programming & Node.js


# 2.6: Relational Databases & SQL


- Learning Goals
- Introduction
- What is a Database?
- Database Schema
- Relational Databases
- Structured Querying Language (SQL)
- Getting Started with PostgreSQL
- Creating Database Schema in PostgreSQL
- CRUD Operations in SQL
- SELECT Data in SQL (CRUD’s “READ”)
- UPDATE Data in SQL (CRUD’s “UPDATE”)
- DELETE (Deleting Data in SQL)
- Spotlight on AI
- Summary
- Resources
- Task
- Forum


#### Learning Goals


- Describe how a database interacts with a web application
- Design a database using a database schema
- Create a relational database using SQL


#### Introduction

Welcome back! In the previous Exercise, you learned all about CRUD operations for data management—CREATING new data, READING existing data, UPDATING existing data, and DELETING existing data. You also got right to work defining the endpoints for a REST API that will allow clients to send HTTP requests to perform CRUD operations on a server (your Achievement project).

In the example used throughout the previous Exercise, data for these requests was stored “in-memory,” meaning that the data object for storing data was included directly within the application itself (the array of students included in the code). Normally, however, data is stored in a separate, external database. The job of your REST API is to interact with this database (via the server) to ensure all CRUD operations are fulfilled.

In this Exercise, you’ll be looking into how you can store data for a web application in exactly this kind of database. In particular, you’ll be focusing on relational databases, which are the most standard type of databases. You’ll learn the basics of designing a relational database before looking into how you can execute CRUD operations in SQL, the standard language for querying relational databases.

The SQL database you create in this Exercise won’t be the database you end up integrating with your API for this Achievement. That's because, in the next Exercise, you'll be learning about a different type of database that is better suited to your tech stack and more common in modern applications. Since SQL (and an understanding of relational databases) is a requirement for many junior developer roles, it’s still important that you get some practice creating and manipulating data in a relational database. While this will mean creating two different databases (and ultimately not using one), you’ll at least be able to reuse the raw data you collect in this task to set up your non-relational database in the next one.

In Exercise 2.8: The Business Logic Layer (once your knowledge of databases is complete), you’ll begin integrating your non-relational database into the REST API you’ve already begun to build. By the time you’re finished with this Achievement, you’ll have a complete database and a REST API that allows clients to interact with the data in your database. Pretty cool, right?

Ready to get started? Then, let’s dive right in!


#### What is a Database?

The word “database” has already been used quite often throughout this Achievement. This is because databases are such an integral part of server-side programming. But what exactly is a database? Think of a database (or databases) as the brains of a server. Information on a website or app is stored inside of it, and users can request information from (or send information to) the database as they interact with that website or app.

Take an online store, for instance. You wouldn’t store product information for a store within the HTML of a website, rather, in the server’s database. This allows the products and information to be viewed across multiple pages (product lists, customer shopping carts, or emails sent to the customer upon purchase) or even edited, for instance, by sellers creating listings on marketplaces or auction sites.

Likewise, all the information about the site’s customers (email addresses, passwords, order history, and preferences) wouldn’t be stored in the site’s HTML but in a database, as well. When you log in to the store, you’re accessing your “chunk” of data from the database, which likely contains your name, username, password, addresses, and more. This is why you don’t need to type all your info in again when ordering something (and is also how large online stores like Amazon can personalize your experience on their sites).

Technically, a database could be something as simple as a text file. In practice, however, most modern databases are managed using a database management system (DBMS). The DBMS itself is stored on a separate “database server,” which is a dedicated computer that runs nothing but the DBMS and any related software.

How exactly does this layer of your web application fit with the rest? Let’s look back at the diagram from the first Exercise of this Achievement:

![Template showing the four layers of a web app, in order from client, to server, to business layer, to data layer. Under the client layer are: mobile browser, web browser, and application. Under the server layer are: web server. Under the business layer are: application and file system. Under the data layer are: database and external system.](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E1/web_app_four_layers_template.jpg)


###### Figure 1

In the previous Exercise, you defined the endpoints for your movies REST API that sits on a web server and routes HTTP requests from the client. As no data is being stored for this API just yet, there was nothing to perform CRUD operations on. That is where the data layer comes in that you see to the right of this diagram. The REST API converts the HTTP requests into the appropriate CRUD operations and transmits this to the data layer to request data or perform manipulations on the data in the database in this layer.

We looked at an example of how HTTP requests from the client correspond to appropriate CRUD operations via a students API in the previous Exercise. For example, we were able to GET/READ a list of all students stored by our students API. All the data we practiced manipulating for the students API was stored “in-memory” in the server, so was, in fact, missing the data layer you see above. However, most real-world applications (especially large ones) store their data in a database in the data layer of an application. This is because external databases allow you to persist (save) data between running instances of an application, whereas “in-memory” data is tied to one running instance of the application. If you were to stop or restart the application, the data would be reset.

Let’s look at an example to understand the difference between “in-memory” data and data stored in a database. Say you've created a recipe for a special chicken soup. If you keep the recipe only to yourself, it’s like storing data “in memory.” If you weren't home and someone came to borrow it from you, they'd be forced to go home empty-handed. However, if you were to write it down in your recipe book and let your family members access it, your parents, brother, sister, and friends would be able to access it even in your absence. Here, the recipe book acts like a database for you to store your recipe. Can you see the benefit of data stored in a database?

You’ll notice there's a layer between the web server and the data layer called the “business logic” layer. This layer maps the database to Node.js code, making it accessible to the web server. You’ll be looking into this in Exercise 2.8: The Business Logic Layer. Do note, however, that databases can exist independently of REST API apps—it’s possible to store and retrieve data from within them without a single line of Node.js code.


> TIP!
> In addition to the CRUD operations you’ve already learned about, databases also allow for the registering and monitoring of users, the enforcement of data security, the maintenance of data integrity (meaning that the data is accurate), the handling of concurrency (when multiple users are requesting data at the same time), and the recovery of backup data in case of a system failure. All of these are more advanced database skills that fall outside the scope of this course, but feel free to do more research yourself if interested.


#### Database Schema

Whenever you encounter a database as a developer, you’ll inevitably come across the term “schema.” A database schema is a plan or blueprint for how a database should be created. It defines the relationships between different sets of data and acknowledges any constraints on that data. The following image shows you a simple database schema with three tables: Albums, Genre, and Artists.

![A simple database schema with three tables](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E6/figure2.png)


###### Figure 2. Source: database.guide

How, then, should you go about defining a database schema for your own database?

The first thing you’ll want to think about are the types of things (or entities) you want to store data about. Then, you’ll want to define what types of information about those entities you want to store (i.e., their attributes).

This all feels a bit vague right now, so let’s use a concrete example to walk through this—and what better example to use than the sort of data you’ll be storing for your myFlix API? What kind of data, or entities, would you imagine you’d want to include in your myFlix database? Movies, no doubt! So movies would be your primary entity. And what about attributes? What type of information would you want to store for each movie?

First, you’d obviously want to store each movie’s title. You’d also probably want a description of the movie, as this would allow users of the myFlix app to see what each movie’s about. These are the two most basic attributes, but you can go even further. For instance, what about the genre of each movie? This would allow users to search for movies by genre. Or perhaps the director? And what about an image of the movie? Finally, say that you wanted to implement a “featured movie” feature that displays certain movies at the top of the page. If so, you’d need to include this information in the database, as well.

There’s one last piece of data you’ll want to include for each movie in your database, but it’s not an outward-facing attribute, rather, an inward-facing attribute. You’ll want to give each movie a unique ID. This ID won’t be visible to users of the myFlix app; instead, it will allow you, the creator of the database and the API, to easily reference a movie from elsewhere in the database. This can be an easy attribute to forget, as it’s not one your users will think about; it's an important one to remember, though, as it’ll be essential for organizing and manipulating the entries in your database.

Let’s go ahead and start organizing these entities and attributes in a table so you can more easily visualize them:


###### Figure 3

This is a great start! But it’s also where things start to get more complicated. For instance, these are all attributes of movies, but what if you wanted to store additional information about other entities, like directors? By including attributes about each director, you could allow your myFlix users to click on a director and load a page with their bio, and birth and death years. Or, say you wanted your users to be able to browse specific movie genres in search of a certain type of movie. To do this, you’d need to include attributes about each genre. And the list goes on! Let’s go ahead and add the “director” and “genre” entities to the table you’ve started, for a total of three entities:


###### Figure 4

Movies and their related topics aren’t the only entities you’ll need; your myFlix app will also require data about the users themselves. They need to be able to log in with a username and password, and you’ll likely want their email, as well. Other useful attributes could include birthdays (so you can recommend them more age-appropriate movies, etc.) and favorite movies (so you can give them better recommendations for other movies they might like). Let’s create a new Users entity and add in all of this information as attributes:


###### Figure 5

With that, you now have five different data entities to include in your database—movies, directors, genres, and users—and you have a pretty good idea as to what attributes you want to include for each entity, as well.

The next step is to begin defining how all this information is related. A key component of defining your database schema is describing the relationships between not only entities, but their attributes, as well. There are a few different ways you can approach these relationships, so let’s take a quick look at each one below:


##### One-to-One

A one-to-one relationship is one in which one item (whether entity or attribute) has only one instance of another item, and vice versa. As this sounds a little cryptic, let’s take a look at an example.

Think about your college database. Each college usually has one dean, so therefore the relationship between your college and the dean of your college is one to one.

![One-to-one relationship between a college and a dean](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E6/figure6.png)


###### Figure 6

Now, let’s return to your project. Each movie in your database has only one description. In the case of “Silence of the Lambs,” this could be “A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.” (Taken from the movie's IMDB page). Likewise, each description can only relate to one movie. Thus, “Silence of the Lambs” will only ever have the description above, and this same description will never be associated with any other movie.


##### One-to-Many

A one-to-many relationship is one in which one item has many of a second item, but the second item only has one of the first. Let’s go back to the example of your college database. Your college has a few professors, but the professors each belong to a single college. So the relationship between your college is one-to-many.

![One-to-many relationship between a college and its professors](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E6/figure7.png)


###### Figure 7

This relationship wouldn’t work for movies and their descriptions as it simply wouldn’t make sense for a movie to relate to multiple descriptions (and vice versa). It would, however, work perfectly for movie genres. Usually, a movie will only have one genre (at least, that’s how you’ll categorize movies for the sake of your API); however, a single genre would have more than just one movie. It would have many movies! So, in your database, you have a one-to-many relationship between genres and movies. To use the same example, “Silence of the Lambs” would have one genre—thriller. The thriller genre would, in contrast, have multiple movies, one of them being “Silence of the Lambs,” and others which could include “Friday the 13th,” “The Ring,” and “Sinister,” just to name a few.


##### Many-to-Many

A many-to-many relationship is one in which one item has many of a second item, and the second item also has many of the first. In your college database, the relationship between students and subjects is many-to-many. This is because one student can be enrolled in many subjects, and one subject can be taken by many students.

![Many-to-many relationship between students and subjects](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E6/figure8.png)


###### Figure 8

The best example of this type of relationship in your myFlix app would be between users and their favorite movies. Users can have many favorite movies; likewise, movies can have many users who’ve favorited them. For instance, the user “marshall_noventa” could add “Silence of the Lambs,” “The Towering Inferno,” and “Scamper the Penguin” to their favorite movies list. At the same time, “Silence of the Lambs” could have been added to the favorite movies list of not only “marshall_noventa,” but other users such as “generalSeptum,” “otto4kingzechs,” and “d00r.”

Though it goes beyond the scope of the current example, a database could also have many actors, and every actor would be in many movies.

To sum everything up, as you think about database schema, design, and management, you’ll want to keep these three things in mind:


1. What are the entities you’re keeping track of?
1. What are the attributes for each of these entities?
1. What are the relationships between the entities and attributes?


#### Relational Databases

Over the years, there have been several different models of databases, but the type that’s grown in the most prominence since the 1970s is the “relational database.” In relational databases, data is organized into tables, much like your average spreadsheet. Within each table, the relationships between that data and the data in other tables is defined and enforced. The power of relational databases is that they’re great for ensuring data integrity; in other words, data is standardized throughout your application with consistent relationships. This makes them a safe choice for performing complicated queries.


> Tip!
> The consistency, reliability, completeness, and accuracy of data throughout its entire life-cycle is called data integrity. Today, data is sometimes called the "new oil"—it's that valuable a resource. Therefore, it’s of utmost importance that everyone work toward maintaining the integrity of data. If you're interested in knowing more about data integrity, take a look at this article, "What is Data Integrity."

Each table in a relational database represents a single type of entity, for instance, a “customer,” a “product,” or, in the case of your myFlix app, a “movie.” Each row in a table represents a single record (or instance) of data. For example, each movie in your database would have its own row. Each row is then split into columns, with each column representing an attribute of the data record. This is where each of the movie attributes you defined above would come into play, with “ID,” “Title,” “Description,” “Genre,” “Director,” “Image URL,” and “Featured” each having their own column.

Each row (and therefore each record) in a table can be identified by its own unique key, also known as a primary key. This is the ID you already referenced above. Within each data record, any relationships to data recorded in other tables is also defined. Rows in a table can be linked to rows in other tables by adding a column for the ID of the linked row (such columns are known as foreign keys). For instance, you could add the ID for a specific genre to each applicable movie.

All of this will be easier to understand visually, so let’s go ahead and start organizing the data for your myFlix app. You’ll notice it looks like a standard table, and you’d be correct—that’s how relational databases work. (Though, as you’ll be learning in the next Exercise, it’s not how all databases work.) Each of the four entities you defined above (movies, directors, genres, and users) needs its own table, so go ahead and start with the “Movies” table.  The attributes already defined for the movies entity comprise:


- ID
- Title
- Description
- Genre
- Director
- Image path (URL)
- Featured (Y/N)

Thus, a sample table would look as follows:


###### Figure 9. Descriptions have been taken from IMDB

In this table, each row has a unique ID, or primary key, that not only ties the record to the table (“MovieID”) but is also used to identify each individual record. Every table has this ID in its leftmost column. If you wanted to retrieve all the stored data about “Silence of the Lambs,” for instance, you could use the MovieID “1.”

As discussed earlier, the movie title and description have a one-to-one relationship, so you don’t need to tie these items to any other entities. The same can be said for “ImagePath” (which simply supplies a filename of the movie cover) and “Featured” (which is simply a true/false value designating whether the movie is featured or not).

The genre and director, however, are entities of their own, and both of them (for the sake of your API) have a one-to-many relationship with movies in the database schema (each movie has one genre, but a genre can have many movies; likewise, each movie has one director, but a director can have many movies). Therefore, in the “Movies” table, you can add the unique ID for the relevant record in the “Genre” (GenreID) and “Director” (DirectorID) tables. These IDs are called foreign keys because they refer to data records in different tables.

Using foreign keys allows you to map each movie to a genre and director without having to include all of the information about that genre and director in the movie table itself. This information will still be stored in the “Genre” and “Director” tables respectively (and only linked to within the “Movies” table).

Let’s go ahead and create the “Genre” and “Director” tables so that your “Movies” table actually has information to link to:

Genre Table:


###### Figure 10. Descriptions have been taken from Wikipedia.

Director Table:


###### Figure 11. Descriptions have been taken from Wikipedia

With these two tables set up, you can better see how the relationships between all three tables work. The record with MovieID “1” (Silence of the Lambs) is tied to GenreID “1” (thriller) and DirectorID “1” (Jonathan Damme). MovieID “2” (The Lion King) is tied to GenreID “2” (animated) and DirectorID “3” (Rob Minkoff). MovieID “3” (Stuart Little) is tied to GenreID “3” (comedy) and DirectorID “3” (Rob Minkoff).

Note that whenever you’re defining a one-to-many relationship in your database schema, the foreign key should always be included in the table that’s on the “many” side of the relationship—which, in this case, is movies. This is because you only ever assign a single foreign key to a record. Adding a single GenreID to records in the “Movies” table makes more sense than adding a single MovieID to records in the “Genres” table (each movie only has one genre, but each genre will have many, many movies).

The last table left to lay out is the “Users” table, which will contain records for your different users. You defined the attributes that would be required for each user up above, so let’s go ahead and put them into a new table now:

Users Table:


###### Figure 12

Pretty simple, right? The expected information about each user is included in a table, along with a primary key for each user record. Where it gets a little trickier, however, is when you also include each user’s favorite movies. If you’ll remember from above, this was a many-to-many relationship, where each user has many favorites, and each movie is also favorited by many users. To handle this relationship, you’ll need a third table in addition to your “Users” and “Movies” tables—a junction table called “Users-Movies.”

Users-Movies Table:


###### Figure 13

Every record in the junction table represents a single user and a single favorite movie of that user. Because each user can have many favorite movies, and each favorite movie can have many users for whom it’s a favorite, you can use this table to encapsulate both. Notice how the user with a UserID of “1” (davidcohen2580) has two favorite movies: “Silence of the Lambs” (with a MovieID of “1”) and “The Lion King” (with a MovieID of “2”). The user with a UserID of “2” (larissamayer) also has “The Lion King” (with a MovieID of “2”) as one of her favorite movies.  Each of these user-movie combinations represents a single record in the table with a unique UserMovieID defined in the far-left column. This is how you can represent a many-to-many relationship via tables. With this third table, there’s no need to include a “Favorite Movies” column in your “Users” table or a “Favorited Movies” column in your “Movies” table; rather, everything is handled by the “Users-Movies” junction table.

Here, you can see how all of these tables are mapped together in a schema diagram, which makes it easier to visualize the relationships:

![Diagram showing the connections between IDs in the “Movies,” “Genres,” “Directors”, Users,” and “Users-Movies” tables](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E6/Graphic%20of%20ID%20connections%20between%20tables.jpg)


###### Figure 14


#### Structured Querying Language (SQL)

Now that you have the tables for your database laid out (and the relationships between those tables defined), it’s time to take a look at how you can query the data stored within them. After all, the data won’t do your users much good if it can’t be accessed.

SQL (“Structured Querying Language”) is a standardized language used to “query”—or perform operations on—data in relational databases. It was one of the first languages developed for a relational model and, since 1986, has become a standard of the American National Standards Institute, which regularly updates and enhances it. Its great power lies in its ability to access many data records with a single command.

SQL allows you to:


- Control access to data
- Define data types and the relationships among them
- Manipulate data, for instance, performing tasks such as inserting, updating, or deleting data occurrences (aka the “Create,” “Update,” and “Delete” of CRUD)
- Perform data queries, for instance, searching for information (aka the “Read” of CRUD) and making computations from read information

A few different companies have developed their own RDBMSs (relational database management systems) based on SQL, extending its functionality. Common ones include:


- mySQL, which is open source and often used with the LAMP (Linux/Apache/mySQL/PHP) stack
- SQL Server, which was developed by Microsoft (and is commonly used for .NET applications)
- PostgreSQL (also called “Postgres”), which is also open source and used with many stacks, including Node.js in the PREN stack (PostgreSQL, React, Express, Node.js)

In practice, these RDMSs and their corresponding languages have very similar functionality, making it easy to switch between them for more fundamental data requests. The differences between them become clearer at a far more advanced level not required for this course.

For the rest of this Exercise, you’ll be using PostgreSQL.


#### Getting Started with PostgreSQL

As mentioned in the previous section, PostgreSQL is an open source SQL database management system that’s incredibly versatile in terms of the server-side languages it can be used with. It contains many advanced features allowing for complex queries and high performance.


##### Installing PostgreSQL

To get started with PostgreSQL, first download the correct version for your device (Mac or Windows) from the [PostgreSQL download page](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads). Once the download is complete, you’ll need to run through the Installation Wizard:

![Installation wizard PostgreSQL](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E6/postgres.JPG)


###### Figure 15

Specify the folder on your computer where you want to install PostgreSQL. Feel free to keep the default location recommended by PostgreSQL unless you specifically want it elsewhere. You may also be asked to select which components to install. Go ahead and keep all of them selected except for the “Stack Builder” component!

Next, enter a password for the database superuser (you, the administrator) whose default username will be postgres:

![Screenshot of the PostgreSQL installer asking for a password for the database superuser (postgres)](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E6/PostgreSQL%20installer%20asking%20for%20password.png)


###### Figure 16

Next, you’ll need to enter the port for PostgreSQL. Go ahead and keep this at the default of 5432:

![Screenshot of the PostgreSQL installer asking for the port number the server should listen on](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E6/PostgreSQL%20installer%20asking%20for%20port%20number.png)


###### Figure 17

On the next screen, choose the default locale used by the database:

![Screenshot of the PostgreSQL installer asking for the locale to be used by the new database cluster and “Default locale” is selected](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E6/Default%20locale%20selected%20in%20PosgreSQL%20installer.png)


###### Figure 18

Once you click the Next button, the installation should begin. It may take a few minutes (and you may have to click through a few more confirmation screens first):

![Screenshot of the PostgreSQL installer actually installing PostgreSQL](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E6/Installing%20PostgreSQL.png)


###### Figure 19

Once the window indicates that the installation is complete, click the Finish button.


#### Creating Database Schema in PostgreSQL

Now that you’ve installed PostgreSQL, you’re ready to create some databases. Find the folder in which you installed PostgreSQL and launch the pgAdmin4 app. This is an interface for PostgreSQL that will open in your browser.


> pgAdmin Troubleshooting
> When opening pgAdmin4 after this first instance, you may encounter an error. This is a known error where pgAdmin4 opens normally the first time, but when the browser is closed and you attempt to open pgAdmin4 again, it doesn't open at all. To overcome this, you’ll need to terminate the process so that pgAdmin4 opens again.
> 
> Mac users can do so in their Activity Monitor by heading to Finder → Applications → Utilities → Activity Monitor or conducting a Spotlight search for “Activity Manager.”
> 
> PC users can do so in their Task Manager (Ctrl+Shift+Esc).
> 
> If you’re still having trouble getting pgAdmin4 to work, check out this troubleshooting blog post on common pgAdmin4 solutions. You could also try using pgAdmin3, the previous version of pgAdmin, as many developers find it easier to work with.

Once pgAdmin is open, if this is your first time opening pgAdmin, it may ask you to enter a new master password. Note that this is a different password from the one you entered while installing postgreSQL. Go ahead and enter a new master password, after which you’ll be taken to your dashboard. On the left-hand side, you should see a directory structure menu. Open up Servers → PostgreSQL. When you click on PostgreSQL (it might be a different name, but what matters here is the entry you find nested inside Servers), it will ask you to input the super user password you set during the installation process. Once you enter it, the databases will be unlocked. Now → Databases should be visible under PostgreSQL. Go ahead and click on it. You should see your default database, postgres, listed.

![Screenshot of the dashboard in PostgreSQL with the “postgres” database selected. A menu has been called from the database and “Create” is highlighted. An additional menu has been called from the “Create” option.](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E6/pgadmin_1.JPG)


###### Figure 20

You’re now going to create a new database. Right-click on Databases, hover over Create, and then click on Database… Give the database a name and a brief description, for example, “myFlixDB” with the description “This database stores information about movies and users of the myFlix app.” (Feel free to customize these!) Finally, click Save.

![Screenshot of creating a new database and description within PostgreSQL](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E6/pgadmin_2.JPG)


###### Figure 21

You should now see your new database listed in the directory structure on the left-hand side of the dashboard.

Next, it’s time to create your tables as per the database schemas you already laid out. To do so, right-click on your database, then select Query Tool. This should open up a screen divided in two—a top half where you can write “queries” using SQL and a bottom half that will display the output from running those queries.

To create a new table in PostgreSQL, you use a `CREATE TABLE` statement. The syntax follows this format:


```js
CREATE TABLE table_name (
  column_name TYPE column_constraint,
  table_constraint table_constraint
);
```

To create the `Genres` and `Directors` tables, you’d type the following:


```js
CREATE TABLE Genres (
  GenreID serial PRIMARY KEY,
  Name varchar(50) NOT NULL,
  Description varchar(1000)
);
CREATE TABLE Directors (
  DirectorID serial PRIMARY KEY,
  Name varchar(50) NOT NULL,
  Bio varchar(1000),
  Birthyear date,
  Deathyear date
);
```

Let’s take a closer look at this syntax before moving on. Remember from earlier that the “Genres” and “Directors” tables have the following attributes (represented as columns in each table):

Genres:


###### Figure 22

Directors:


###### Figure 23

If you compare this to the SQL code above, you can see that each row of commands corresponds to a column in the relevant table (and, therefore, an attribute of that data record). For example, the  rows in the SQL code creating the “Genres” table start with `GenreID`, `Name`, and `Description`.

After the title of each column comes the data type. Do you remember learning about data types in Achievement 1? While JavaScript supports only a few different types of data, PostgreSQL supports many, with some of the most common including boolean, char, varchar (a string of characters), integer (a number), date, array, and JSON. Let’s look at a few of the data types that have been assigned to attributes in the syntax above.

The “Bio” and “Name” columns in both the “Genres” and “Directors” tables have been assigned the data type `varchar`. This is the SQL equivalent of a string. If you look within the parentheses, you’ll see a number—50 for “Name” and 1000 for “Bio.” This is defining the character limit of the `varchar`. The “Name” column for both tables has been limited to 50 characters, but the “Bio” column in the “Directors” table can go up to 1,000 characters (`Bio varchar(1000)`).

Another data type that you may not be familiar with is `serial`. Above, you can see that it’s been assigned to both “GenreID” and “DirectorID.” What `serial` represents is an integer that automatically increments, or increases, in number. SQL assigns an integer of 1 to the first record that’s added to the table, an integer of 2 to the second record, an integer of 3 to the third record, and so on, all the way up to the last record in the table. This corresponds to what you did earlier when you assigned thrillers a GenreID of “1,” animations a GenreID of “2,” and comedies a GenreID of “3,” in that order (only now you won’t need to set them manually).

Notice that some of the specified attributes/columns for these tables have additional text after their data type is stated. This indicates a column constraint. A column constraint restricts the type of data that can be inserted for the attribute in a specified column in a database.

One column constraint is `PRIMARY KEY`. Stating this in a particular row in SQL indicates that the corresponding column in the table is a unique/primary key for the table. Another one is `NOT NULL`. When this is stated in a line of SQL, the corresponding column in the table isn’t allowed to be empty. In the code for the “Directors” table above, the “Name” column has been labeled `NOT NULL`, meaning that any new “Director” records must have a name.

Let’s go ahead and run the two SQL commands above to create the tables. Write the code into your pgAdmin4 query tool (the top-half of the interface). You can then run the command by clicking on the Play symbol marked in the following image (right next the square/stop icon). Alternatively, you can press F5 on the keyboard. This tells the code to “Execute.”

![pgAdmin4 query tool with the code to create the “Genres” and “Directors” tables written into the top-half and the message “Query returned successfully” in the bottom-half](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E6/pgadmin_3.jpg)


###### Figure 24

You should see the message “Query returned successfully” in the bottom-half of the screen (see the Messages tab); however, if you click on the Execute button (or press F5) again, you’ll receive an error indicating that the “relation” (another word for table) already exists.

Now, let’s look at how to create your “Movies” table:


```js
CREATE TABLE Movies (
  MovieId serial PRIMARY KEY,
  Title varchar(50) NOT NULL,
  Description varchar(1000),
  DirectorID integer NOT NULL,
  GenreID integer NOT NULL,
  ImageURL varchar(300),
  Featured boolean,
  CONSTRAINT GenreKey FOREIGN KEY (GenreID)
    REFERENCES Genres (GenreID),
  CONSTRAINT DirectorKey FOREIGN KEY (DirectorID)
    REFERENCES Directors (DirectorID)
);
```

Notice the lines that have been added at the bottom (even after all the columns have been defined)? These lines add additional constraints onto certain columns, turning them into foreign keys that refer to other tables. Let’s take a closer look!

With the following line:


```js
CONSTRAINT GenreKey FOREIGN KEY (GenreID)
  REFERENCES Genres (GenreID)
```

A constraint name, `GenreKey`, is being defined. (Note that you can give the constraint any name you like.) This puts a foreign key on the “GenreID” column of the “Movies” table (`FOREIGN KEY (GenreID)`) , which forces that column to refer to the “GenreID” column of the “Genres” table (`REFERENCES Genres (GenreID)`). This enforces the one-to-many relationship between the “Genres” table and the “Movies” table (remember, for the sake of your API, a movie can only be assigned one genre, but a genre can be assigned to many different movies).

This means that anytime you add a movie to the “Movies” table, it will need to be assigned a GenreID, which refers to a particular GenreID from the “Genres” table. If you tried to add a movie with a GenreID that hadn’t been defined in the “Genres” table, it would create an error.

The same logic follows for the `DirectorKey` constraint:


```js
CONSTRAINT DirectorKey FOREIGN KEY (DirectorID)
  REFERENCES Directors (DirectorID)
```

Here, a foreign key is being put on the “DirectorID” column of the “Movies” table, which forces that column to refer to the “DirectorID” column of the “Directors” table, just like with the genre above. This enforces the one-to-many relationship between the “Movies” table and the “Directors” table (remember, for the sake of your API, a movie can only be assigned one director, but a director can be assigned to many different movies).

Now that you have all your foreign key relationships defined, let’s go ahead and create the remaining tables.

Users Table:


```js
CREATE TABLE Users (
  UserID serial PRIMARY KEY,
  Username varchar(50) NOT NULL,
  Password varchar(50) NOT NULL,
  Email varchar(50) NOT NULL,
  Birth_date date
);
```

Users-Movies Table:


```js
CREATE TABLE User_Movies (
  UserMovieID serial PRIMARY KEY,
  UserID integer,
  MovieID integer,
  CONSTRAINT UserKey FOREIGN KEY (UserID)
    REFERENCES Users(UserID),
  CONSTRAINT MovieKey FOREIGN KEY (MovieID)
    REFERENCES Movies(MovieID)
);
```

Just as the constraints defined in the “Movies” table enforced the one-to-many foreign key relationships with the “Genres” and “Directors” tables, the constraints defined in “Users-Movies” above (and, indeed, the table itself!) enforce the many-to-many relationship between the “Users” table (users’ favorite movies) and the “Movies” table (movies favorited by users). The table title “Users-Movies“ was chosen to indicate the relationship between the data, though you could also name the table “FavoriteMovies.“ It's ultimately up to the developer to choose how to name each table, and make sure there is documentation to explain what data each table stores.

Once you’ve run all of these SQL scripts in your PostgreSQL query, you can open up the database on the left-hand side of the screen, navigate to Schema, then Public, and open up the Tables arrow. You should see a list of all the tables you’ve just created: “Genres,” “Directors,” “Movies,” Users,” and “Users-Movies.”

You can also check out the following video on how to create these tables!

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
7:11
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
      
      #wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset{font-size:14px;}
#wistia_chrome_51 #wistia_grid_112_wrapper div.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper span.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper label.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper fieldset.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper button.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper img.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper a.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper svg.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper p.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper a.w-css-reset{border:0;}
#wistia_chrome_51 #wistia_grid_112_wrapper h1.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper h2.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper h3.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper p.w-css-reset{margin:1.4em 0;}
#wistia_chrome_51 #wistia_grid_112_wrapper a.w-css-reset{display:inline;}
#wistia_chrome_51 #wistia_grid_112_wrapper span.w-css-reset{display:inline;}
#wistia_chrome_51 #wistia_grid_112_wrapper svg.w-css-reset{display:inline;}
#wistia_chrome_51 #wistia_grid_112_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_51 #wistia_grid_112_wrapper ol.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_51 #wistia_grid_112_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_51 #wistia_grid_112_wrapper ul:before.w-css-reset{display:none}
#wistia_chrome_51 #wistia_grid_112_wrapper ol:before.w-css-reset{display:none}
#wistia_chrome_51 #wistia_grid_112_wrapper li:before.w-css-reset{display:none}
#wistia_chrome_51 #wistia_grid_112_wrapper ul:after.w-css-reset{display:none}
#wistia_chrome_51 #wistia_grid_112_wrapper ol:after.w-css-reset{display:none}
#wistia_chrome_51 #wistia_grid_112_wrapper li:after.w-css-reset{display:none}
#wistia_chrome_51 #wistia_grid_112_wrapper label.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_51 #wistia_grid_112_wrapper button.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_51 #wistia_grid_112_wrapper img.w-css-reset{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset button::-moz-focus-inner{border: 0;}
      #wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree {font-size:14px;}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree div{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree span{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree label{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree fieldset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree button{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree img{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree a{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree svg{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree p{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree a{border:0;}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree h1{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree h2{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree h3{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree p{margin:1.4em 0;}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree a{display:inline;}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree span{display:inline;}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree svg{display:inline;}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree ol{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree ul:before{display:none}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree ol:before{display:none}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree li:before{display:none}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree ul:after{display:none}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree ol:after{display:none}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree li:after{display:none}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree label{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree button{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree img{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-tree  button::-moz-focus-inner{border: 0;}
      #wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-max-width-none-important{max-width:none!important}
      #wistia_chrome_51 #wistia_grid_112_wrapper .w-css-reset-button-important{border-radius:0!important;color:#fff!important;}
    #wistia_grid_112_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
#wistia_grid_112_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
#wistia_grid_112_above{position:relative;}
#wistia_grid_112_main{display:block;height:100%;position:relative;}
#wistia_grid_112_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_112_center{height:100%;overflow:hidden;position:relative;width:100%;}
#wistia_grid_112_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_112_top_inside{position:absolute;left:0;top:0;width:100%;}
#wistia_grid_112_top{width:100%;position:absolute;bottom:0;left:0;}
#wistia_grid_112_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
#wistia_grid_112_bottom{width:100%;position:absolute;top:0;left:0;}
#wistia_grid_112_left_inside{height:100%;position:absolute;left:0;top:0;}
#wistia_grid_112_left{height:100%;position:absolute;right:0;top:0;}
#wistia_grid_112_right_inside{height:100%;right:0;position:absolute;top:0;}
#wistia_grid_112_right{height:100%;left:0;position:absolute;top:0;}
#wistia_grid_112_below{position:relative;}

Congratulations! You’ve just set up your very first database, complete with tables and a logical schema to map everything together. The only problem? Your database doesn’t contain any data yet—it’s a bit of an empty shell right now. Which is exactly why it’s time to move on to how you can use CRUD operations to create, read, update, and delete data in your new database. Switching gears!


#### CRUD Operations in SQL

In the previous Exercise, you learned all about CRUD and how the four different CRUD operations are necessary when working with an API to send HTTP requests to a web server. Do you remember what each letter stands for?


- C: CREATE
- R: READ
- U: UPDATE
- D: DELETE

These operations can be applied to any “type” or “entity” of data and are normally executed by server-side code within the context of a REST API. You can also apply these operations directly to a database through handwritten SQL code. Remember—relational databases store entities of data in tables. This means that for each CRUD operation, you’ll be performing a CRUD transaction on a simple table.

In order to perform CRUD operations in PostgreSQL, you can use the Query Tool from the Tools menu.


##### INSERT Data in SQL (CRUD’s “CREATE”)

To create a new record in a table (remember—a record is a row of data in a table), you need to `INSERT` that data into the table. `INSERT` in SQL is the equivalent of the “CREATE” operation in CRUD. The `INSERT` command takes the following format:


```js
INSERT INTO table_name(column1, column2, …) VALUES(value1, value2, …);
```

As the above command may look a bit complicated at first, let’s walk through how you’d use it to insert a record into your “Genres” table. Say you wanted to add the “Thriller” genre to your “Genres” table. You could do so with the following command:


```js
INSERT INTO Genres(Name, Description) VALUES('Thriller', 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.');
```


> Note!
> If you use single quotes to wrap strings, and the string itself needs to contain an apostrophe (e.g., This is Fred’s bag), you’ll need to add another single quote right before the actual apostrophe so that PostgreSQL understands this is an apostrophe rather than the end of the string, for example:
> 
> INSERT INTO RandomTableName1(RandomColumnName1) >VALUES('This is Fred''s bag');

After the initial `INSERT INTO`, you include the name of the table, which, this case, would be “Genres.” In the parentheses that follow the table name, enter the names of the columns in which you want to insert your data. In this case, you’d want to insert data into the “Name” and “Description” columns. Following this is the actual data you want to enter, which goes between the parentheses after the `VALUES` keyword. Make sure you include each piece of data in the same order as you designated your columns. Here, for instance, you’d want to make sure you include the genre name, “Thriller,” first, followed by the description.

You’ll notice that only the “Name” and Description” columns for the thriller genre are being added, but not the “GenreID.” This is because the “GenreID” column has the data type `serial`. It will automatically update incrementally with each new record you insert, meaning you don’t need to assign anything yourself. Pretty handy!

Now that you’ve got the basic structure of the command down, let’s go ahead and insert a few more records, this time into the “Genres,” “Directors,” and “Movies” tables. Similar to JavaScript, you need to put a semicolon (;) after each SQL command to specify the end of the statement.


```js
INSERT INTO Genres(Name, Description) VALUES('Animated', 'Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.');
INSERT INTO Genres(Name, Description) VALUES('Comedy', 'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.');
INSERT INTO Directors(Name, Bio, Birthyear, Deathyear) VALUES('Jonathan Demme', 'Robert Jonathan Demme was an American director, producer, and screenwriter.', '1944-01-01', '2017-01-01');
INSERT INTO Directors(Name, Bio, Birthyear) VALUES ('Judd Apatow', 'Judd Apatow is an American producer, writer, director, actor and stand-up comedian.', '1967-01-01');
INSERT INTO Movies(Title, Description, GenreID, DirectorID,ImageUrl,Featured) VALUES('Silence of the Lambs','A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',1,1,'silenceofthelambs.png',True);
```

Remember that when inserting records into your “Movies” table, you must assign them a valid GenreID and DirectorID; otherwise, SQL will return an error, and the record won’t be added. This is because of the foreign keys you set up between the three tables, so be careful!


#### SELECT Data in SQL (CRUD’s “READ”)

In SQL, CRUD’s “READ” operation is called `SELECT`. On its own, the `SELECT` query can read data for all the records from a specified column (or columns) within a table. For instance, if you used the `SELECT` query together with the “Title” column, you’d receive the title of every movie stored within the table.

The `SELECT` query takes the following format:


```js
SELECT col1,col2,col3 FROM [table name]
```

If you wanted to run a query for reading the titles and descriptions of all the movies in your “Movies” folder, you could write:


```js
SELECT Title, Description FROM Movies
```

In addition, SQL provides a way to read the values from all columns in a table by using a `*` character:


```js
SELECT * FROM Movies
```

Try running that command in your PostgreSQL query tool. You should see the results at the bottom of the screen. As you’ve only inserted one movie into your database thus far (“Silence of the Lambs”), this will be the only movie displayed; if you had created more records, all of them would be displayed after entering this command.

![Screenshot showing the query tool in PostgreSQL with the SELECT command being used to query the titles and descriptions from all movies in the database. Only the title and description of Silence of the Lambs appear in the bottom-half of the screen.](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E6/pgadmin_4.jpg)


###### Figure 25


##### The WHERE Clause

In the above examples, you “read” from your “Movies” table, which returned the data from every record in the table. But what if you only wanted to read some of the records—in other words, only the records that meet certain conditions? Say, for example, you only wanted to read records with a GenreID of “1” (i.e., thrillers), or details of a particular movie by title. This is where the `WHERE` clause can come in handy.

The syntax of the `WHERE` clause is as follows:


```js
SELECT column_1, column_2 … column_n
  FROM table_name
  WHERE conditions;
```

The `WHERE` clause is added immediately after the table you want to read from. Where it says “conditions” is where you can filter the rows returned from the `SELECT` statement. If you wanted, for instance, to select the “Title,” “Description,” and “DirectorID” columns of all movies with a GenreID of “1” (thriller), you’d type:


```js
SELECT Title, Description, DirectorID
  FROM Movies
  WHERE GenreID = 1;
```

You could also use the `WHERE` clause if you wanted to query a particular movie by title. Say, for example, you want to `SELECT` all the data about the movie Silence of the Lambs. To do so, you can use the following syntax in SQL:


```js
SELECT *
  FROM Movies
  WHERE Title = 'Silence of the Lambs';
```

Note that the movie title here must be surrounded by single quotes or an error will be thrown.


##### The AND Logical Operator

What if you wanted to add multiple `WHERE` conditions? For example, say you wanted to select all movies with a GenreID of “1” and a DirectorID of “1”? For this, you can use the `AND` logical operator, which combines two conditions into a single query:


```js
SELECT Title, Description, DirectorID
  FROM Movies
  WHERE GenreID = 1 AND DirectorID = 1;
```

This code would require both conditions (`GenreID = 1` and `DirectorID = 1`) to be true after a `WHERE` clause.


#### UPDATE Data in SQL (CRUD’s “UPDATE”)

While the first two CRUD operations took slightly different syntaxes when translated to SQL (“CREATE” to `INSERT` and “READ” to `SELECT`), “UPDATE,” fortunately, doesn’t change at all—to update (or change) data in SQL, you use the similarly named `UPDATE` statement. It takes the following SQL syntax:


```js
UPDATE table
  SET column1 = value1,
    column2 = value2 ,...
  WHERE
  Condition;
```

Let’s break this down:


- Line 1: Following the UPDATE clause is the table in which you want to make the update.
- Lines 2 and 3: The second line begins with a SET clause. Within this clause are listed the columns whose values you want to change. You can use a comma (,) to separate the values. Any columns that aren’t included in the list retain their original values.
- Lines 4 and 5: Start the fourth line with the WHERE clause; then, beneath it, include any conditionals you want to include. If you leave out the WHERE clause entirely, every row in the table will be updated.

Let’s walk through an example. Say you wanted to update the wording in the “Description” column for the “Thriller” genre in order to add further details about the genre:


```js
UPDATE Genres
  SET Description='Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible.'
  WHERE GenreID = 1;
```


###### The description above has been abridged from the Wikipedia entry for “Thriller film.”

Here, you first specify that “Genres” is the name of the table you want to update. Following that is the `SET` keyword, which specifies the column you want to update (in this case, the “Description” column). The new content you want to put in that field is included after the name of the column and connected with a `=`. Finally, at the bottom is your `WHERE` clause, which has the conditional `GenreID = 1` (limiting the genre to “thriller”).


#### DELETE (Deleting Data in SQL)

Last but not least comes “DELETE.” Like “UPDATE,” SQL’s syntax for this operation boasts the same name as its CRUD equivalent, making it easier to remember. To delete data from a table, use the following SQL syntax:


```js
DELETE FROM table
  WHERE condition;
```

Though it's reasonably straightforward, let’s break down each part:


- Line 1: First, specify the table FROM which you want to DELETE data using the DELETE FROM clause.
- Line 2: Then, specify which rows to delete via the condition in the WHERE clause. The WHERE clause is optional; however, if you omit it, the DELETE statement will delete all rows in the table.
For example, if you were to type:


```js
DELETE FROM Movies
  WHERE GenreID = 1;
```

It would remove all movies with a GenreID of “1” (a.k.a. thrillers).

Be very careful when deleting data. Unless you’ve backed up your data, there’s no way to retrieve data you’ve deleted.

For more on working with CRUD we recommend checking out the following video:

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
12:20
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
      
      #wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset{font-size:14px;}
#wistia_chrome_54 #wistia_grid_134_wrapper div.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper span.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper label.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper fieldset.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper button.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper img.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper a.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper svg.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper p.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper a.w-css-reset{border:0;}
#wistia_chrome_54 #wistia_grid_134_wrapper h1.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper h2.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper h3.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper p.w-css-reset{margin:1.4em 0;}
#wistia_chrome_54 #wistia_grid_134_wrapper a.w-css-reset{display:inline;}
#wistia_chrome_54 #wistia_grid_134_wrapper span.w-css-reset{display:inline;}
#wistia_chrome_54 #wistia_grid_134_wrapper svg.w-css-reset{display:inline;}
#wistia_chrome_54 #wistia_grid_134_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_54 #wistia_grid_134_wrapper ol.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_54 #wistia_grid_134_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_54 #wistia_grid_134_wrapper ul:before.w-css-reset{display:none}
#wistia_chrome_54 #wistia_grid_134_wrapper ol:before.w-css-reset{display:none}
#wistia_chrome_54 #wistia_grid_134_wrapper li:before.w-css-reset{display:none}
#wistia_chrome_54 #wistia_grid_134_wrapper ul:after.w-css-reset{display:none}
#wistia_chrome_54 #wistia_grid_134_wrapper ol:after.w-css-reset{display:none}
#wistia_chrome_54 #wistia_grid_134_wrapper li:after.w-css-reset{display:none}
#wistia_chrome_54 #wistia_grid_134_wrapper label.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_54 #wistia_grid_134_wrapper button.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_54 #wistia_grid_134_wrapper img.w-css-reset{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset button::-moz-focus-inner{border: 0;}
      #wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree {font-size:14px;}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree div{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree span{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree label{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree fieldset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree button{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree img{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree a{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree svg{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree p{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree a{border:0;}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree h1{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree h2{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree h3{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree p{margin:1.4em 0;}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree a{display:inline;}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree span{display:inline;}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree svg{display:inline;}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree ol{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree ul:before{display:none}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree ol:before{display:none}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree li:before{display:none}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree ul:after{display:none}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree ol:after{display:none}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree li:after{display:none}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree label{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree button{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree img{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-tree  button::-moz-focus-inner{border: 0;}
      #wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-max-width-none-important{max-width:none!important}
      #wistia_chrome_54 #wistia_grid_134_wrapper .w-css-reset-button-important{border-radius:0!important;color:#fff!important;}
    #wistia_grid_134_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
#wistia_grid_134_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
#wistia_grid_134_above{position:relative;}
#wistia_grid_134_main{display:block;height:100%;position:relative;}
#wistia_grid_134_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_134_center{height:100%;overflow:hidden;position:relative;width:100%;}
#wistia_grid_134_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_134_top_inside{position:absolute;left:0;top:0;width:100%;}
#wistia_grid_134_top{width:100%;position:absolute;bottom:0;left:0;}
#wistia_grid_134_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
#wistia_grid_134_bottom{width:100%;position:absolute;top:0;left:0;}
#wistia_grid_134_left_inside{height:100%;position:absolute;left:0;top:0;}
#wistia_grid_134_left{height:100%;position:absolute;right:0;top:0;}
#wistia_grid_134_right_inside{height:100%;right:0;position:absolute;top:0;}
#wistia_grid_134_right{height:100%;left:0;position:absolute;top:0;}
#wistia_grid_134_below{position:relative;}


#### Spotlight on AI


##### Generate Mock Data to Populate a Database Using an AI

It’s always important to use realistic data to test that the app and database work together as expected. However, building this mock data from scratch is time-consuming, error-prone, and often even unrealistic. In a development environment, you’re often able to take a sample of data to begin testing, or even generate some real testing data yourself. For cases where this isn’t possible, AI can really help to generate realistic mock data for development projects.

AI tools excel at answering very specific and structured queries, which is convenient, as highly specified information is exactly what you need from your mocked data. By providing the AI tool with all the criteria your mocked data needs to meet, you can save yourself tons of time, getting you a more realistic product feel sooner.

Take a look at one of your mentors making use of ChatGPT for these purposes:

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
8:41
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
      
      #wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset{font-size:14px;}
#wistia_chrome_57 #wistia_grid_91_wrapper div.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper span.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper label.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper fieldset.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper button.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper img.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper a.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper svg.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper p.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper a.w-css-reset{border:0;}
#wistia_chrome_57 #wistia_grid_91_wrapper h1.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper h2.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper h3.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper p.w-css-reset{margin:1.4em 0;}
#wistia_chrome_57 #wistia_grid_91_wrapper a.w-css-reset{display:inline;}
#wistia_chrome_57 #wistia_grid_91_wrapper span.w-css-reset{display:inline;}
#wistia_chrome_57 #wistia_grid_91_wrapper svg.w-css-reset{display:inline;}
#wistia_chrome_57 #wistia_grid_91_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_57 #wistia_grid_91_wrapper ol.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_57 #wistia_grid_91_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_57 #wistia_grid_91_wrapper ul:before.w-css-reset{display:none}
#wistia_chrome_57 #wistia_grid_91_wrapper ol:before.w-css-reset{display:none}
#wistia_chrome_57 #wistia_grid_91_wrapper li:before.w-css-reset{display:none}
#wistia_chrome_57 #wistia_grid_91_wrapper ul:after.w-css-reset{display:none}
#wistia_chrome_57 #wistia_grid_91_wrapper ol:after.w-css-reset{display:none}
#wistia_chrome_57 #wistia_grid_91_wrapper li:after.w-css-reset{display:none}
#wistia_chrome_57 #wistia_grid_91_wrapper label.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_57 #wistia_grid_91_wrapper button.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_57 #wistia_grid_91_wrapper img.w-css-reset{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset button::-moz-focus-inner{border: 0;}
      #wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree {font-size:14px;}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree div{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree span{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree label{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree fieldset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree button{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree img{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree a{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree svg{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree p{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree a{border:0;}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree h1{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree h2{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree h3{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree p{margin:1.4em 0;}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree a{display:inline;}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree span{display:inline;}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree svg{display:inline;}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree ol{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree ul:before{display:none}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree ol:before{display:none}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree li:before{display:none}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree ul:after{display:none}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree ol:after{display:none}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree li:after{display:none}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree label{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree button{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree img{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-tree  button::-moz-focus-inner{border: 0;}
      #wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-max-width-none-important{max-width:none!important}
      #wistia_chrome_57 #wistia_grid_91_wrapper .w-css-reset-button-important{border-radius:0!important;color:#fff!important;}
    #wistia_grid_91_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
#wistia_grid_91_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
#wistia_grid_91_above{position:relative;}
#wistia_grid_91_main{display:block;height:100%;position:relative;}
#wistia_grid_91_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_91_center{height:100%;overflow:hidden;position:relative;width:100%;}
#wistia_grid_91_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_91_top_inside{position:absolute;left:0;top:0;width:100%;}
#wistia_grid_91_top{width:100%;position:absolute;bottom:0;left:0;}
#wistia_grid_91_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
#wistia_grid_91_bottom{width:100%;position:absolute;top:0;left:0;}
#wistia_grid_91_left_inside{height:100%;position:absolute;left:0;top:0;}
#wistia_grid_91_left{height:100%;position:absolute;right:0;top:0;}
#wistia_grid_91_right_inside{height:100%;right:0;position:absolute;top:0;}
#wistia_grid_91_right{height:100%;left:0;position:absolute;top:0;}
#wistia_grid_91_below{position:relative;}

As shown in this demo, you can stick to the following tips when using a generative AI tool to create mock data for development projects:


- Specify the type of database you need data for (e.g., an SQL database).
- Specify the table name for the table you want data for.
- Specify the language you want the response to be in (e.g., SQL for Node.js and Express syntax).
- Specify the structure for each of your data entries in this data table. What are the “column” titles, and what data type does the data for each of these columns require?
- Provide the AI tool with an example data entry to imitate.
- Specify the number of data entries you want.
- Check and adjust the data entries! Don’t just copy-paste before checking that the AI understood your request. Oftentimes, your data will need to meet specific criteria, so you should always review it before integrating it into your project.

If there are any additional requirements, integrate this into the prompt! For example, let’s say you’re creating a “students” table, and in this table you include information about “teacher_name”. You might want to specify something like “at least five students should have the same teacher_name” or “there are only two teachers for all of the students”.

![prompt describing mock data requirements](https://coach-courses-us.s3.amazonaws.com/public/courses/fullstack-immersion/A2/E6/RelationshipsSQL.png)


###### Figure 26. Here's an example prompt requiring the mock data for a "users" table and a "books" table to include 3 users and 10 books.

As you can see, this is a perfect use case for using AI to help you with your development tasks. Since you need to specify the data structure and criteria to the AI in order for it to mock useful results, using AI in this context doesn’t inhibit you from building a solid understanding of database structures yourself, nor from honing your ability to communicate them. It’s a perfect example of using AI as a utility tool to speed up mundane tasks so you can save your time and energy for more complex development problems.


##### Submitting Evidence

As you know by now, you’ll need to demonstrate how you collaborated with the AI to your instructor. This should include the following:


- A screen recording (or screenshots) demonstrating your prompts to the AI, and what the AI generated.
- An explanation of how you tailored the prompt to meet the task requirements, and any learning you had from this.
- An explanation of any errors or inaccuracies the AI generated, and the subsequent changes you had to make to improve the mocked data.


#### Summary

How are you feeling about databases? Are you starting to understand how they fit into the picture of a complete app (and more specifically, the app for your Achievement project)? No matter what site you visit on the internet nowadays, that site likely employs some sort of database that stores and organizes all of its data. Even CareerFoundry is built on a database—after all, how else would we be able to keep track of all our students, tutors, and mentors?

This Exercise was all about relational databases: databases that come in the form of tables. But relational databases aren’t the only type of database. In fact, the final database you’ll be building for your Achievement project won’t be a relational database at all, rather, a non-relational database built using MongoDB. That’s exactly what you’re going to be looking into in the next Exercise! For now, though, let’s practice everything you’ve learned about relational databases and using PostgreSQL and create a small database of your own!


#### Resources

If you’re curious to read more about the topics covered in this Exercise, then we recommend taking a look at the resources below. Note that this reading is optional and not required to complete the course.

Relational Databases:


- What is a Database?
- Relational Database: Defining Relationships Between Database Tables
- Relational vs. Non-Relational Databases: Which one is Right for You?

PostgreSQL:


- Installing PostgreSQL
- PostgreSQL vs. MySQL: Everything You Need to Know

Take the quiz to test your knowledge on this Exercise.


#### Task


- Direction
- Submission History

In this task, you’ll set up a relational database for use with an application that provides information about different movies to users. The database will store data about movies and the users of your application.

As a recap, here’s a list of your app’s key features as per your [project brief (PDF)](https://images.careerfoundry.com/public/courses/fullstack-immersion/Full-Stack%20Immersion%20A2%20Project%20Brief.pdf). Along with the schema diagram shared below, this should help you decide on the sort of data that will need to be stored in your database.


- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites

Part 1 Directions

In this part of the task, you'll create your database.


1. Create a script to set up the tables for your database schema, including all entities and attributes. You should have at least the following tables: Movies, Directors, Genres, Users, and Users-Movies.
1. Create a script to populate each of these tables using INSERT statements:


At least 10 movies, of which, at least 2 should have the same director, and at least 2 should have the same genre
At least 3 directors
At least 3 genres
At least 3 users
At least 3 user-movie pairs


> Bonus: Spotlight on AI
> While you must follow the same schema, you don’t have to use any of the actual data included in the example given in the Exercise. In fact, as a bonus step, you can follow the tips and instructions from the “Spotlight on AI” section of the Exercise to create mock data that meets the requirements of the schema listed here.

Part 2 Directions

The next few steps will involve querying the data in your database. Take a screenshot of each query, as well as its results, for your tutor to review.


1. Create a script to read (SELECT) a single genre from the genre table, by name. Once you have the ID of that genre, create a script to read (SELECT) all movies that are of the same genre.
1. Create a script to UPDATE the email address of a single user, by name.
1. Create a script to DELETE a certain movie from the database (make sure that you still have at least 2 that have the same director and at least 2 that have the same genre after performing the delete script).
1. Submit an exported copy of your PostgreSQL database (in SQL format) and a zip file of your query screenshots here for your tutor to review.


> Exporting Your PostgreSQL Database
> Exporting your PostgreSQL database into a single SQL file is very easy, and you can do it from directly inside pgAdmin. All you need to do is right-click on the database you want to export and select Backup. Here, you can select the name and path for the file you want to create. Make sure you select the PLAIN format, as this will export your database in plain SQL. Under Dump Options, turn on Use Column Inserts and Use Insert Commands, then hit the Backup button. That’s it!
> 
> If you’re using Windows and receive an error message while trying to export your PostgreSQL database saying that you need to set binary paths for PostgreSQL, please follow these instructions:
> 
> Click on the File button to open the dropdown menu, then choose Preferences. In the preferences window, select Path to open another dropdown menu, under which you'll choose Binary Paths. Then, in the PostgreSQL binary path section, enter the version of PostgreSQL you’re working with. Here’s an example of a path for reference: C:\Program Files\PostgreSQL\14\bin. 
> 
> You can find the path to the Bin under Program Files in your C drive or in your main hard disk partition. Under Program Files, click first on PostgreSQL, then on Version Number, and, finally, on Bin. Remember to save after inserting the path!

Bonus Task

Expand your database even further by adding yet another table to your database schema, or increasing the number of attributes associated with each movie or user. If you do add a new table, make sure that the foreign key relationships between your new table and the existing tables are correct. What data might you consider adding?


- A “movies” attribute to the “director” entity (one-to-many)
- A “release year” and/or “rating” attribute to the “movies” entity (both one-to-many)
- An “actors” attribute to the “movies” entity. Note that this would have a many-to-many relationship with the “movies” entity (an actor stars in many movies, a movie stars many actors)

Rubric

Refer to the categories below to see how to meet the requirements of the approved stage

![](https://cdn.careerfoundry.com/assets/rubrics/not_yet-c9fb80e521507759d546f847f8a65a00c66f2c8ec7ece4e37f98c25aa122778c.svg)


- Submission doesn’t include an SQL file, SQL file doesn’t contain data relevant to the project, or no zip file of screenshots has been included; OR
- Submission includes an SQL file and a zip folder of screenshots; BUT
- SQL file is missing data (e.g., not enough movies, directors, genres, etc.); OR
- Zip file doesn’t contain the required screenshots for all 4 queries

![](https://cdn.careerfoundry.com/assets/rubrics/almost_there-f4bb1c077a0a826e7d4e3ecb72859fc401d362d9bd49c0658f4fd85c4a047a87.svg)


- Submission includes an SQL file and a zip folder of screenshots; AND
- SQL file contains an SQL database of at least 9 movies since one of the movies is expected to be deleted (2 of which have the same director, 2 of which have the same genre), 3 directors, 3 genres, 3 users, and 3 user-movie pairs; BUT
- Zip file doesn’t contain the required screenshots for all 4 queries

![](https://cdn.careerfoundry.com/assets/rubrics/approved-7dfdcf59318cf52fcbd1333d8b71bf7a2bde35b6e0b753ac975349982495e0b4.svg)


- Submission includes an SQL file and a zip folder of screenshots; AND
- SQL file contains an SQL database of at least 9 movies since one of the movies is expected to be deleted (2 of which have the same director, 2 of which have the same genre), 3 directors, 3 genres, 3 users, and 3 user-movie pairs; AND
- Zip folder contains screenshots of at least 4 queries: 2 SELECT queries, 1 UPDATE query, and 1 DELETE query

Questions for this task

