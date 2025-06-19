

## Server-Side Programming & Node.js


# 2.10: Data Security, Validation & Ethics


- Learning Goals
- Introduction
- Privacy Law and Ethics
- The Same-Origin Policy
- Cross-Origin Resource Sharing (CORS)
- HTTPS and SSL
- Hashing
- Cross-Site Scripting Attacks (XSS) and Content-Security Policy (CSP)
- Server-Side Input Validation
- Hosting Your API
- Uploading Your Database to MongoDB Atlas
- Connecting your Database to Your API on Heroku
- Final Testing on Postman
- Summary
- Resources
- Task
- Bonus Project
- Forum


#### Learning Goals


- Modify API to align with data security regulations
- Deploy API to online hosting service
- Deploy database to cloud-based database hosting platform


#### Introduction

Congratulations! You’ve reached the final Exercise in Achievement 2 of your Full-Stack Immersion course. Throughout this Achievement, you’ve added an entirely new repertoire to your bank of coding knowledge, learning how to go beyond the frontend, or client-side, of your application to create databases and server-side scripts in the backend. You now have a complete REST API you can call your own, along with a non-relational database in which to store the data for your app. Pretty cool!

In the next Achievement, you’ll learn how to create the frontend for your new myFlix app using nothing but JavaScript UI frameworks, which will give you a complete app, frontend and backend, and coded from scratch, that you’ll be able to add to your portfolio.

Before moving on, there’s one final step to look into, which is one you should never omit from the development process—ensuring data and web security considerations have been incorporated into your product and that you’re fulfilling your ethical responsibilities as a web developer. You’ve likely already heard a great deal about data breaches in the news, for instance, the Equifax data breach of 2017, in which 145 million customers’ personal data (including some credit card data) was stolen; or, the Cambridge Analytica scandal of 2018, where a British consulting firm was discovered to have used the data from millions of Facebook users’ personal profiles for political purposes.

Clearly, cybersecurity is a major concern. There will always be malicious entities trying to breach the security of web applications or websites that store data. In a world where technical fluency is on the up-and-up, how can you keep your applications safe? It’s the duty of developers to design and build applications that are not only secure but ethically responsible.

In the previous Exercise, you learned all about authentication and authorization—the most basic gateways through which content can be made accessible in web applications; however, there’s no such thing as foolproof security. Multiple layers of security have become the necessity, ensuring that even if one method is breached, there’s always a backup.

Think of this a bit like cars. When you go for a drive, you use both seatbelts and airbags: neither is guaranteed to protect you one hundred percent in the case of a car accident, but both combined are more likely to keep you safe. So, too, do you need to think in terms of multiple protection mechanisms when it comes to keeping your applications safe.

In this Exercise, you’ll dive first into privacy laws and how you can use a basic ethical framework for making decisions about privacy and data protection for your apps. Then, you’ll continue on into security mechanisms for the web, including the Same-Origin Policy and CORs, HTTPS and encryption, and password hashing. Finally, you’ll explore methods of incorporating input validation into your app on the server-side to protect your application and its users. You’ll wrap things up by researching hosting options for your API—which is what will allow your API to go public. Sound exciting? Then, let’s get started!


#### Privacy Law and Ethics

Let’s begin by taking a look at some ethical and legal guidelines pertinent to building web applications. In April 2016, in response to widespread concern about data privacy on the internet and what big companies are doing with users’ data, the European Union passed the General Data Protection Regulation (GDPR), which pertains to the processing of personal data of users within the EU (as well as regulations for companies based in an EU country, even if their users are outside the EU). While the GDPR regulations are EU based, it has become somewhat of an international standard for most application developers. Since the protections are for EU users in general, a company beyond the EU may still fall under the regulation’s scope. For example, imagine European users of a US-based ecommerce, social media, or travel application. The fines for not adhering to the regulations are steep enough that most companies in the US, for example, have adopted the standards to be on the safe side.

As a developer, it’s important that you understand privacy law and how it might affect the products you develop, not only as a purely legal matter, but also in terms of ethicality (i.e., creating products that help rather than hurt). You can use the GDPR as a framework for handling user data in all your products, no matter where they’re located.

In an ideal world, product managers would be in charge of making sure their products deal with data in a legal and ethical way, and developers would only be in charge of implementation. More often than not, however, these roles become blurred, making it the job of the developer to voice their concerns if they think a product is asking for unnecessary data, is collecting data without properly informing the user, or is lacking sufficient security. With that in mind, let’s go over the six general principles outlined in the GDPR:


##### 1. Lawfulness, Fairness, and Transparency

“Lawfulness,” here, simply means that all data must be in accordance with the guidelines of the GDPR. “Fairness” means that data must be collected truthfully and in good faith. “Transparency” refers to keeping users informed when and for what purposes their data is being collected. Mostly what this comes down to is displaying messages, similar to the one below, whenever you use cookies as part of your site or app:

![Message telling users that a site uses cookies for personalization, giving users the option to accept cookies or view cookie settings](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Cookies-warning-message.png)


###### Figure 1.

Two axioms that arguably fall under this are the right to access,  which means that once a user provides their data, they should always have access to it upon request, and the right to erasure, which means that a user has the right to ask for their data to be erased.


##### 2. Purpose Limitation

Organizations should only collect data for a specified, limited, and legitimate purpose. In other words, a company can’t say it’s collecting data for one thing (e.g., to populate a social network profile) but actually be collecting it for another purpose (e.g., to provide consulting firms) without explicitly informing its users.


##### 3. Data Minimization

Organizations shouldn’t collect more data than they need to meet their stated purposes. This ensures malicious entities can’t acquire extraneous information upon breaching your application’s security. It also makes it easier to maintain accurate data.


##### 4. Accuracy

All data should be up-to-date and accurate, and organizations should take reasonable steps to erase or rectify inaccurate data (e.g., by prompting users to update their data).


##### 5. Storage Limitation

Similarly, organizations shouldn’t retain personal user data any longer than is absolutely required. Data should be consistently reviewed to ensure its necessity. This also helps to keep data accurate.


##### 6. Integrity and Confidentiality

This guideline revolves around keeping data secure and confidential (i.e., not accessible by malicious entities). This is also what the rest of this Exercise will concern itself with. Keeping data secure usually involves encryption methods, which can protect data even if it’s stolen.

Now that you’ve had a look at some crucial guidelines for receiving and storing data within your application, let’s explore a few of the security mechanisms that are already in place, followed by those you can implement yourself to ensure protection of your application and its users.


#### The Same-Origin Policy

In this section, you’ll look into how you as a developer can keep your applications safe from malicious software, more specifically, by restricting domain access. But before exploring methods you can implement yourself, it’s important that you know what precautions are already in place—namely, the same-origin policy.

The same-origin policy is a feature within browsers that restricts cross-origin HTTP `GET` requests, in other words, `GET` requests from a different domain (or “origin”)


> Note: there are other measures to block cross-origin POST, PUT, and DELETE requests, but you’ll be exploring those later in this Exercise.

A website can additionally apply the same-origin policy to cookies and local data that it stores in the browser. By restricting this by default, browsers prevent any local data you’re storing (i.e., cookies) from being exposed to malicious websites. Why is this a good thing?

Well, let’s say you’re logged into Facebook. In order to be logged into Facebook, your browser needs to be storing Facebook cookies that contain your Facebook login information. While still logged in, you happen to navigate to a malicious website in a different tab of your browser. If there were no same-origin policy, that malicious website would have access to your Facebook cookies. Not only would it have access to your personal data, but it could also use that data (i.e., your username and password) to make requests to Facebook on your behalf, perhaps posting on your timeline, sending a message to your contacts, changing your privacy settings, or conducting other unwanted activity.

This sounds bad enough, but imagine, now, how this could pose even greater problems on other kinds of sites, for instance, your online banking portal. If a malicious website had access to cookies from your banking portal, it could access your online banking details and even transfer funds from your account.

Fortunately, however, the same-origin policy exists, meaning this kind of unwanted activity is prevented. This policy keeps your cookies away from malicious sites that would try to benefit from your personal information.

Unless otherwise specified, if you make a `GET` request from one domain to another domain, you’ll receive an error that looks something like this:


```js
No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin '...' is therefore not allowed access.
```

While the same-origin policy is perfect for protecting users on the web, it does create a few unwanted problems when it comes to working with APIs. By restricting requests from one domain to another, it also prohibits domains from making requests to APIs on a different server (i.e., with a different origin/domain). For instance, think of a real-estate website. Oftentimes, these types of websites will load maps of houses by making requests to the Google Maps API; under the same-origin policy, these types of requests would be restricted, as the Google Maps API is located on a different domain/origin (“maps.google.com”) than the real-estate website.

You may be wondering why you haven’t experienced any problems when creating and testing your API, and that’s because you’ve only been making requests from your local domain (the domain labeled “localhost”). As your API is also hosted on your local domain, there’s no change in origin; thus, these requests aren’t restricted. If, however, you were to host your API on one domain and the frontend of your application on another, things would quickly become a lot more complicated. Likewise, if your API were hosted at “myflix.com,” and web pages from other applications started making API requests to your API, they’d experience their own issues.

All of this sounds like it would be a bit counter-productive, as applications frequently need to make requests to APIs from different providers (i.e., the real estate website mentioned above). Fortunately, there’s a solution!


#### Cross-Origin Resource Sharing (CORS)

The answer to these potentially pesky cross-origin restrictions is “Cross-Origin Resource Sharing,” otherwise known as CORS. What CORS does is extend HTTP requests, giving them new headers that include their domain. The receiving server can then identify where the request is coming from and allow or disallow the request from going through. The header for one of these cross-domain requests would look something like this:


```js
Origin: [domain]
```

When the server receives this request, it checks whether the included domain is allowed, then sends back an HTTP response with a new header of its own, indicating that the requesting domain was permitted:


```js
"Access-Control-Allow-Origin:  [list of permitted domains or a wildcard for all domains]"
```

For example, if an HTTP request were sent to a server from “test.com,” the server’s response could include either an asterisk, which allows access from all domains:


```js
Access-Control-Allow-Origin: *
```

Or, a list of specifically allowed domains, for instance:


```js
Access-Control-Allow-Origin: https://www.test.com http://www.test.com https://site.mdn.net http://site.mdn.net https://static.sitename.net http://static.sitename.net
```

But what does this mean for your myFlix API? Well, CORs allows you to control which domains have access to your API’s server. By controlling who has access to your API, you can keep it protected from malicious entities. This means that even if your frontend and API are hosted at different domains, the frontend will still be able to make requests to the API—all you have to do is list the origin for your frontend as an authorized domain.

All in all, CORs will be a great help in getting each part of your app up and running (and working politely with its counterparts), so let’s take a look at how you’d go about implementing it. It’s time to pay a visit to your old friend, Express!


##### CORS in Express

As your myFlix app was built using the MERN stack, you’ll need to implement CORS by way of Express (the “E” in “MERN”). Do note, however, that CORS can be integrated into any application regardless of the tech stack used.

You can quickly and easily integrate CORS into your myFlix API via the `cors` module. More information can be found in the [npm CORS package registry entry](https://www.npmjs.com/package/cors), but for now, let’s go ahead and simply install it. To do so, run the following command in your terminal:


```js
npm install cors
```

Once installed, you’ll need to include the following code in your “index.js” file in order to use CORS within your application. Make sure to add it right before `let auth = require('./auth')(app);` and ensure that it’s before any route middleware:


```js
const cors = require('cors');
app.use(cors());

/* rest of code goes here*/
```

The above code specifies that your app (defined elsewhere in the file by `const app = express();`) uses CORS. By default, it will set the application to allow requests from all origins; however, if you want only certain origins to be given access, you’ll need to replace `app.use(cors());` with the following code:


```js
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));
```

The above code creates a list of allowed domains within the variable `allowedOrigins`, then compares the domains of any incoming request with this list and either allows it (if the domain is on the list) or returns an error (if the domain isn’t on the list).

As a general rule, you should only allow requests from domains that need your API. For instance, if your application’s frontend were hosted separately from the API, you’d want to ensure the domain hosting your frontend was granted access. The fewer domains that have access to your API, the more secure it (and the data it provides access to) will be. For this reason, it’s usually considered bad practice to use an asterisk `*` to grant access to all domains.


#### HTTPS and SSL

Now that you know how to restrict and allow access to your API from different domains/origins, let’s take a look at another security measure you can take to protect your applications and the users that interact with them: HTTPS. When you browse sites on the internet, you may have noticed that some websites use the prefix “http”, while others use the prefix “https”. In fact, sometimes when you try to open a site using the “http” prefix, you’ll be automatically redirected to a version of the site that uses the “https” prefix. The CareerFoundry web application you’re using right now even prevents users from opening links that lead to “http” domains.

What’s this “https” business all about? Well, it all started because communication over regular “http” connections wasn’t secure. Normal “http” requests are sent in plain text format—in other words, unencrypted text. If a malicious entity were to intercept them, they’d have complete access to all of the information contained within. This is especially dangerous in public WiFi spaces such as airports and coffee shops, where persons of nefarious intent can more easily intercept these requests, putting any data you might fill in on websites (credit card information, your name and address, etc.) at risk.

With the “https” prefix, messages sent between the browser and the domain are encrypted using a security protocol called Secure Sockets Layer, or SSL. Requests that have been encrypted using SSL can’t be read without an encryption key. This keeps any data inside safe from prying eyes, even if the requests themselves happen to be intercepted. An SSL certificate is required to create an SSL connection. Oftentimes, if you host your website or web application on a server, the hosting provider will include (for a price) an SSL certificate as part of its hosting package. Registering one requires information about the identity of your website and your company.

When the SSL certificate is created, two cryptographic keys (i.e., codes used for encryption) are also created: a private key and a public key.

Whenever you open an “https” website in your browser (e.g., “[https://www.amazon.com](https://www.amazon.com/)”), the first thing your browser does is look up the domain of the website to obtain its IP address. Next, your browser will attempt to establish a secure connection to the website by requesting a copy of the website’s SSL certificate; if received, your browser will review said SSL certificate to ensure it’s been signed by a trusted issuer, that it hasn’t expired, that it conforms to required security standards, and that it matches the domain of the requested website. The SSL certificate will contain its public key—a publicly accessible piece of information used to encrypt any data being sent to the website.

When the browser confirms that the website can be trusted, it creates a second key called a “symmetric session key.” It then uses the public key to encrypt the session key, before sending along the session key in its request to the web server. The web server then uses its private key to decrypt the session key, before sending back an acknowledgement to the client. All future communication between the client and server will thus be encrypted using the session key (which only the client and the web server have, since the session key itself was encrypted), ensuring that the connection is secure. The initial process of establishing this connection is somewhat humorously referred to as the “SSL handshake.”

Your myFlix application is currently hosted locally, so you won’t need to register an SSL certificate for it; however, once you decide to host your app online, you need to keep in mind the importance of HTTPS and SSL, especially for websites and applications that collect sensitive data (e.g., financial and medical information).


#### Hashing

So far in this Exercise, you’ve heard a lot about encryption, for instance, encrypting data traveling between a browser and a web server. But what does that mean? Encryption is the process of turning data into a series of unreadable characters, which can then be decrypted, or reversed back to their original form, by way of a key. This ensures data can only be read by those with the proper permission (i.e., those with the key).

Hashing, on the other hand, is the process of turning data into a string of text or numbers that (with a good hashing algorithm) can’t be turned back into the original string. Once the data has been hashed, it’s no longer accessible to anyone. But when would this be useful? After all, what good would data be if it can’t be read or accessed?

There are actually more uses for this than you’d think. For instance, whenever you log in to a website or app, you input your password. This password is usually hashed. When you first register, the password you provide is hashed, then placed into the database on the server. Then, every time you log in, the password you provide is also hashed. This hashed password is compared to the hashed password in the database, and if they match, you’re allowed to log in. This keeps your password data from ever being seen by anyone, even the creators of the app or website. It ensures that, no matter what, no one will ever know your password except you. (This is why you’ll sometimes get warning emails from companies, reminding you that they’ll never ask you for your password, and that any correspondence that does is likely a scam.)

Your myFlix application, too, will allow users to register with a username and password (along with other user information such as an email and birthday). Users then use this same username and password combination every time they log in. In Node.js, you can use a module called `bcrypt` to hash users’ passwords and compare hashed passwords every time users log in in order to ensure a more secure login authentication process. To install `bcrypt`, run this command in your terminal:

`npm install bcrypt`


> TIP!
> If you're having trouble getting bcrypt installed, especially on Ubuntu Linux, try installing bcryptjs instead (simply substitute "bcryptjs" in place of "bcrypt" in the terminal installation command). Make sure you update it in your code, as well!

Import the module into your “models.js” file, as this is where you’ll be using it:


```js
const bcrypt = require('bcrypt');
```

You’ll then need to add the additional two functions to your “Users” schema (beneath the `userSchema` declaration: `let userSchema = mongoose.Schema({...});`). The first function you’ll want to add is a `hashPassword` function, which is what does the actual hashing of submitted passwords. The second function, `validatePassword`, is what compares submitted hashed passwords with the hashed passwords stored in your database.


```js
let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};
```


> CAREFUL!
> Don't use arrow functions when defining instance methods. validatePassword is an example of an instance method, a method that can be called on each object/document created (each individual object/document). Arrow functions bind the this keyword to the object that owns that function, which in this case, is userSchema.methods—not user, even when validatePassword is being called on user within the line: if(!!user.validatePassword(password)){. Functions defined using the regular way, however, ("function(){...}" rather than "() => {...}"), will always refer to the object where the function has been called on. This is why validatePassword in user.validatePassword(password) will have its this value (pay attention to this.password in the code above) referring to the actual user document rather than userSchema.methods.
> 
> You can learn more about this in the Mongoose documentation. You may also want to learn more about Arrow Functions, particularly, the “What about this?” section.

You’ll next need to adjust the relevant endpoint in the “index.js” file of your REST API. Currently, all `POST` requests for adding new users to your database must include data about the user—including a password. Thus, you need to modify that endpoint to hash the password before storing it, using the `hashPassword` function you just added to the model above. Take a look at the code below. The key lines of code you’ll want to focus on are `let hashedPassword`, on the second line, and the new `Password: hashedPassword` line in the `.then` method:


```js
app.post('/users', async (req, res) => {
  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) {
      //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});
```

In your “passport.js” file, you can then add additional callback code (`} if (!user.validatePassword(password)) { ...`) to `LocalStrategy` in order to validate any password a user enters:


```js
passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      console.log(`${username} ${password}`);
      await Users.findOne({ Username: username })
      .then((user) => {
        if (!user) {
          console.log('incorrect username');
          return callback(null, false, {
            message: 'Incorrect username or password.',
          });
        }
        if (!user.validatePassword(password)) {
          console.log('incorrect password');
          return callback(null, false, { message: 'Incorrect password.' });
        }
        console.log('finished');
        return callback(null, user);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
      })
    }
  )
);
```

Thus, when combined, the two snippets of code above (the one in your `POST` endpoint and the one in your “passport.js” file):


1. Hash any password entered by the user when registering before storing it in the MongoDB database (Users.hashPassword(req.body.Password) in your POST endpoint).
1. Hash any password entered by the user when logging in before comparing it to the password stored in MongoDB (user.validatePassword(password)) in LocalStrategy within your “passport.js” file).

It’s important to note that the users you’ve entered into the database before this code change will no longer be able to log in. As such, you should create new users through the API itself (using Postman) so that the password you send in the request body of the `app.post('/users',...)` endpoint gets hashed before being stored in the database. If you use the mongo shell, you’ll store the original password—not the hashed version of it. This means that when a user tries to log in, the API will hash the password, then compare it with the original password, and the comparison will always fail. On the other hand, if you inserted a user through the API, the password entered in the request body would  be hashed and then stored in the database, so that whenever the user tried to log in, the inputted password would be hashed and compared to what’s been stored in the database (comparing a hash to a hash rather than a hash to an original).


#### Cross-Site Scripting Attacks (XSS) and Content-Security Policy (CSP)

Now that you’ve looked into a few ways you can keep your users’ data more secure, let’s take a slight turn and explore a few of the reasons you need to keep your users’ data secure, namely, malicious attacks on your site or app. For instance, did you know about a type of attack that can take place on the frontend of your app? This attack, called a cross-site scripting attack, or “XSS attack,” involves the injection of malicious JavaScript code into a website or web application. It takes place on the client-side, in the user’s browser, and can lead to all sorts of pesky problems if allowed to occur.

XSS attacks could include:


- Making HTTP requests to another site using your identity (e.g., from your cookies, as mentioned earlier). For example, they could transfer money from your bank account or send spam to your contacts.
- Injecting links into a page that direct you to a similar-looking site. This new site could ask you to submit personal and/or financial information, which would then be submitted not to the legitimate site, but straight to the attacker’s database.
- Infecting your computer with malware.

There’s a great deal of harm that an XSS attack can cause, especially with how creative they’ve become in recent years. How can you protect yourself and your users against them in your own apps? Well, to start, there are a few measures you can take right within your JavaScript itself:


- Validating user input: This involves checking that all input from users contains only expected characters. Correctly formatted input fields minimize the possibility of malicious code being entered, as it’s not likely a code snippet will be able to pass a more rigid formatting check. You’ll be exploring a few of these techniques later on in this Exercise.
- Escaping data: This involves ensuring all data your app receives is secure before rendering it (i.e., disallowing certain characters, such as < brackets, which can designate script tags and inject JavaScript into a web page).

But there is yet another possibility, similar to the CORs method you learned for restricting domains above. It’s called a “Content-Security-Policy,” or CSP, and it’s attached to the HTTP header of a web page to control which domains your web application allows to load content onto its frontend. By limiting your frontend to trusted domains and their resources, so, too, can you limit the risk of cross-site scripting attacks.

For example, if you were embedding images hosted on a different domain into your site or app, you could configure a CSP to ensure only images from trusted domains could be embedded. Or, if you know that you’re not going to embed any content from a different domain at all, you could restrict all content, only permitting content from the domain your app is hosted on. The code for this would look like:


```js
Content-Security-Policy: default-src 'self'
```

Let’s take a look at how this would work. For lack of a better name, let’s assume a malicious site, “i-am-evil.com,” has a URL that serves a large frontend JavaScript program that automatically installs onto the computer of any user that opens the site. If the user then goes on to visit other sites, this program may use an XSS attack on those sites, causing them to include and execute the JavaScript page.

For instance, say the user visited a page of their online banking system. The program could potentially load onto the bank site, collecting any data that the user enters, such as their name and password. If the bank site had a `default-src 'self'` policy, however, the browser would refuse to load the external script, as it would have originated from a different domain, thus protecting the user.

CSP is something that doesn’t apply specifically to your myFlix API. Nor does it apply to any specific API, for that matter. This is because CSP applies to client-side development, making it something you need to consider when building the frontend of your myFlix application. There are, however, still some measures you can take on the server-side to protect against XSS—namely, input validation, which you’ll be exploring in just a moment.


##### Cross-Site Request Forgery

Another type of attack is called a Cross-Site Request Forgery, or “CSRF,” attack, and it’s when a hacker adopts a user’s identity to perform an action on a website they’re logged into without their consent. Because the web app believes the user is trustworthy (since they’ve already logged in), it will do whatever the hacker tells it to do, which could be anything from posting on their social network feed to transferring funds illicitly. This type of attack can be done using `POST`, `PUT`, or `DELETE` requests.

One way of protecting against CSRF is via a special type of web token called a CSRF token. This token is used to ensure that the requester is safe.


##### SQL Injection

Yet another type of attack is called an SQL injection attack. In this type of attack, nefarious SQL statements are provided to an application (e.g., submitted through a form), which can then be used to expose or alter data in the web application. SQL injection attacks can occur if an application doesn’t properly “sanitize” inputs provided by the user, meaning that they don’t strip away anything that could be SQL code. A hacker could, for example, enter SQL code into a form that would instruct the site’s database to return all of its stored usernames and passwords. If the app didn’t validate user input to ensure no SQL code was present, it would be vulnerable.

SQL injection is only a risk for applications running an SQL database in their data layer; however, similar types of attacks can occur with applications using NoSQL databases, as well. As with SQL injection, the best way to address this type of attack is by validating user input on the server-side, only this time, checking for code that’s of the same type as your database. For your myFlix app, you used MongoDB to set up a JSON database, so you’d want to ensure you’re taking precautions against potential JSON attacks. You’ll be setting up server-side validation for your myFlix app in just a minute.

Now that you’ve explored the kinds of security risks your app (and its users) may encounter, it’s time to turn your focus towards preventing such risks, so let’s go ahead and implement a security mechanism into your application: server-side input validation.


#### Server-Side Input Validation

Throughout this Exercise, you’ve learned about the importance of validation as a protection mechanism against certain types of attacks, including cross-site scripting and SQL (or other database) injection. Validation is the process of ensuring that anything a user inputs, such as parameters passed to your API endpoints, follows the correct format. By validating inputs, you can minimize the risk of those inputs containing malicious scripts. This acts not only as a security measure, it also prevents bugs, as it ensures you’re only storing expected types of data within your database.

Back in Achievement 1, you first broached validation in the form of real-time form validation—a type of input validation that’s implemented on the client-side using JavaScript. This type of validation is important as a means of giving users feedback (i.e., they can know right away if they need to change something in their input rather than having to wait until they try to submit); however, as a means of securing your application, it’s nowhere near sufficient—attackers can simply alter the frontend code of a web page to bypass this validation mechanism.

Therefore, you need to implement some form of input validation on the server-side, as well. This will ensure only accepted characters and formats make their way into your database. Imagine if a malicious entity made a request to your application’s login endpoint, passing a username of `david123<script>[Do something bad]</script>`. With no input validation implemented, this username would be accepted and added to your database, where it has the potential to harm your application. You can prevent this by implementing logic that checks for and bans certain characters.

How do you know which characters and formats to allow and which to reject? While there aren’t any hard and fast rules, there are a number of recommended guidelines. For example:


- For usernames, only alphanumeric characters (letters and digits) should be allowed. This prevents inputs like the one above (with the <script> tags). Ideally, though, you should still allow non-English characters, such as ë, to accommodate international users of your application.
- For integers, only inputs of the numbers 0 through 9 should be allowed.
- For passwords, all characters should be allowed, but often a minimum character count is required, along with a selection of numbers, lowercase, and uppercase characters..
- For email addresses, there are more complicated rules you can implement, for instance, requiring an @ character and ensuring each part of a normal email address is present (you’ll remember first learning about this back in Exercise 1.7: Complex UI Elements in JS).
- For a date, such as a birthday, you can require it be written in an exact date format, for instance, DD.MM.YYYY

You already learned how to add many of these validation options on the frontend using JavaScript packages (or libraries) in the previous Achievement. Now, let’s look at how you can implement these same validation methods on the backend using Node.js/Express.


##### Server-Side Validation for myFlix

There are a number of JavaScript libraries you can use when it comes to adding validation to a Node.js/Express application, but for the purpose of this Exercise, you’re going to be looking into a specific one called “express validator.” The express validator library offers a variety of validation methods for different types of inputted data.

The first thing you’ll need to do, as always, is install the library (it is a package, after all!), so go ahead and type the following into your terminal:


```js
npm install express-validator
```

Then, make sure you import the library into the files that will use it, which, in your case, would be your “index.js” file. Go ahead and require it there:


```js
const { check, validationResult } = require('express-validator');
```

The library will also need to be available within your URL endpoints, which means you’ll need to include your new validator as middleware to the routes that require validation. In use, the validator library takes the following format:


```js
check([field in req.body to validate], [error message if validation fails]).[validation method]();
```

For example, if you wanted to ensure that a user input field called “Username” within the body of an HTTP request contained only alphanumeric characters, you could write:


```js
check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric()
```

The library facilitates a host of different validation methods. A few of the more commonly used ones include notEmpty, which specifies that a field must contain characters; isAlphanumeric, which specifies that a field can only contain letters and numbers; and isEmail, which specifies that a field must be formatted as an email address.

There are also others like:


```js
contains(), //check if value contains the specified value
equals(), //check if value equals the specified value
isAlpha()
isAlphanumeric()
isAscii()
isBase64()
isBoolean()
isCurrency()
isDecimal()
isEmpty()
isFQDN(), //is a fully qualified domain name?
isFloat()
isHash()
isHexColor()
isIP()
isIn(), //check if the value is in an array of allowed values
isInt()
isJSON()
isLatLong()
isLength()
isLowercase()
isMobilePhone()
isNumeric()
isPostalCode()
isURL()
isUppercase()
isWhitelisted(), //checks the input against a whitelist of allowed characters
//check the documentation for more https://express-validator.github.io/docs/validation-chain-api.html
```

Let’s go ahead and take a look at the validator library in action within one of your endpoints, and more specifically, your new user registration endpoint (your POST request to the “/users” endpoint). You’ll notice that the only new thing that’s been added are a few lines of code at the beginning that checks the body of the HTTP request (appropriately called check):


```js
app.post('/users',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], async (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });
```

In the above code, validation logic has been added to a few important fields: username, password, and email. The validation code first ensures that the fields actually contain something (as each field is required); then, it checks that the data within follows the correct format. After these five checkBody functions comes the error-handling function, which puts any errors that occurred into a new variable that’s sent back to the user in a JSON object as an HTTP response:


```js
// check the validation object for errors
let errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(422).json({ errors: errors.array() });
}
```

If an error occurs, the rest of the code will not execute, keeping your database safe from any potentially malicious code. In addition, the client is notified of the error, which will allow them to fix it and resubmit their data if it was, in fact, a harmless mistake.

You can and should use validation for endpoints where data could be entered via the body of an HTTP request. Your myFlix application has at least two endpoints that require data in their bodies (adding a new user and updating an existing user), both of which will require a validation code.

Now that you’ve explored the final security mechanisms you’ll be implementing in your app, it’s time to switch gears for the final time in this Achievement. After all, your API won’t do much good just sitting on your computer. You need to host it!


#### Hosting Your API

Back in your Intro to Frontend Development course, you learned all about hosting websites and setting up your own domain. At the time, we referred you to convenient hosting providers such as GoDaddy, DreamHost, and HostGator. This traditional type of hosting provider generally provides two categories of hosting: shared hosting, in which your website shares a server with other customers’ websites, and dedicated hosting, in which your website is hosted on its own server.

Shared hosting comes with its drawbacks: performance may suffer as the server is shared by multiple clients, and you (as a customer) don’t have full control over the server. This is opposed to dedicated hosting, which is generally more expensive, but has better performance and control. Even with dedicated servers, however, large businesses oftentimes need to purchase multiple servers as their web traffic grows. This can lead to wasted costs, especially if their traffic were to ever slow down again in the future.

To solve this, certain tech conglomerates including Amazon, Google, and Microsoft now offer customers the ability to rent out their own servers on an as-needed basis. This arrangement is called Infrastructure as a Service (IaaS), or, as you might know it better, “cloud infrastructure.” When hosting your website or application on an IaaS provider such as Amazon Web Services (AWS), you don’t need to manage your own server, as it’s handled by the provider.

A Platform as a Service (Paas) model goes even further than IaaS—it offers not only servers and storage on an as-needed basis, but also an operating system and tools to help you build and deploy your application. These cloud and platform services are often referred to as cloud computing or serverless programming.

In a future Achievement, you’ll learn more about serverless programming and its benefits. For now, however, you’ll simply learn how you can use a PaaS provider called Heroku to host your myFlix API. This will make your API publicly accessible via the internet instead of just a local application on your computer.


##### Hosting with Heroku


> TIP!
> After you complete the following steps, your app and database will be live on the web for other people to use and access. Thanks to all the authentication and authorization procedures you've put in place in the last two Exercises, no unauthorized entities should be able to make changes to your app or database; if you hadn't, however, malicious entities could possibly access your data and make changes, either in the form of an (unfunny) joke or because they want to collect user data. As part of this last Exercise of the Achievement, your mentor will check to ensure that they can't make any unauthorized changes to your app or database. This is something important to keep in mind whenever you host projects online in the future!

As mentioned above, your API is still only hosted on your local server (localhost), which is why it's only visible to you and can’t actually be used by anyone else. To rectify this, you need to configure and deploy your page to a remote PaaS provider. While you have a few different options when it comes to PaaS providers for your API, the most popular choice amongst web developers tends to be Heroku. It’s also perfect for your purposes now as they offer a limited free plan that’s great for developers who are just starting out and want to get experience using the service. Let’s now walk through how you can get your API deployed to Heroku.


> Perk: GitHub for Education and Heroku Access
> As a CareerFoundry student, you're eligible for a GitHub Education account. This gives you free access to GitHub’s Student Developer Pack, which offers discounts and free access to an awesome array of developer tools and services. 
> 
> Through this Student Developer Pack, you can use important Heroku features and services (which you'll need for this task and your myFlix project) for free. If you're interested, you can learn more about Heroku's offering for registered GitHub students.
> 
> If you're having trouble signing up for the Github Education account or the Heroku Student Developer Pack, please read through the following Tutorial for GitHub Education and Heroku Student Pack


- Sign up for a free Heroku account.
- Follow the guidelines shared earlier for accessing Heroku’s offering for GitHub Education students.
- Install the Heroku Toolbelt. Only complete the steps listed on the “Set up” page (i.e., the initial installation, the Heroku login command in your terminal, and checking your version of Node, npm, and Git).
- Update your “package.json” file to include a “start” script. To do so, open your “package.json” file in your text editor and under the scripts section, add the following code: "start": "node index.js". If you already have a “test” script listed, you can either replace it with your new “start” script or add your start script underneath it (though make sure you add a comma at the end of the “test” script to separate them).
- Update your app.listen(); function in your “index.js” file. Currently, you have the listening port hardcoded to 8080. Now that people other than you will be using your app, you need to allow this port to change if necessary. This is done by way of process.env.PORT, which looks for a pre-configured port number in the environment variable, and, if nothing is found, sets the port to a certain port number. Go ahead and replace your current app.listen(); function with the following code:


> const port = process.env.PORT || 8080;
> app.listen(port, '0.0.0.0',() => {
>  console.log('Listening on Port ' + port);
> });


- Save all the changes you’ve made to your files and commit/push the changes to your GitHub repository using GitHub Desktop.
- Open the terminal and navigate to your project folder. Once inside it, create an app on Heroku by running the command heroku create from your project directory. This command creates a new empty project in Heroku with a randomly assigned name and URL, such as “http://warm-wave-1943.herokuapp.com.”
- Send your application to Heroku using Git in the terminal. You’ll do so using a Git command called git push. The command you’ll want to enter is git push heroku main. This command tells Heroku to grab a copy of your committed code and use it to deploy your site on Heroku.
- Once this command is finished, the server will restart with the latest code and your site will be launched.


> TROUBLESHOOTING!
> If you encounter errors while trying to set up and push to your Heroku app, try doing a web search for the error message, as there are likely to be many others who’ve run into the same errors as you. One common error you may run into yourself is “'heroku' does not appear to be a git repository” when trying to push to heroku main. This can happen sometimes if you don’t immediately push your local repository after creating a new Heroku app. Try repeating the heroku create command, then immediately pushing using the git push heroku main command.
> 
> You should also pay close attention to the output of the git push heroku main command—warnings can generally be ignored in the output, but anything with “FATAL” or “ERROR” is an issue that needs to be addressed. If your app was deployed successfully, but your endpoints don't work as expected, you can also run heroku logs in the terminal to see the last 50 lines of output. Again, you’re looking for something that reads “FATAL” or “ERROR.”

Once you push to Heroku, the URL to your site will be generated instantly—it will be displayed in your terminal, or you can copy it from the Heroku dashboard. You can already navigate to the assigned URL in your browser to open your app there. But there’s still more that needs to be done. For instance, now that your app is up and running, you can manage it straight through Heroku. Head on over to your [Heroku dashboard](https://dashboard.herokuapp.com/) where you should see a list of your apps (though you currently only have one). Click on your app to open the app dashboard. From here, you can change a wide variety of settings for your app, for instance, the name of your website. Let’s do so now.

Click on the “Settings” tab to change your website URL, then save the changes.

![Heroku settings tab, where there’s an option to change your URL](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Heroku-url-change.png)


###### Figure 2.

Before the change will take place, however, you need to update your Git remote (see the warning in Figure 2). So, next, run the following commands in your terminal (make sure you replace “new_address” with the new address you actually want to give your app!):


```js
git remote rm heroku
heroku git:remote -a new_address
```

![Updating the Git remote in the terminal](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Terminal-update-git-remote.png)


###### Figure 3.

This seems like quite a few steps for such a simple change. Is there a way to do this entirely in the terminal (without using the dashboard)? There sure is! Try typing the following code in your terminal, once again trading out “new_name” and “old_name” for the actual new and original names of your app:


```js
heroku apps:rename new_name --app old_name
```

![Updating app name in terminal](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Terminal-update-app-name.png)


###### Figure 4.

And there you have it! You can now access endpoints that don’t use the database, for instance, a `/` endpoint that displays a welcome message. However, any other API endpoints won't work right away on Heroku (e.g., accessing `/movies`, `/users`, etc.) as the database is only accessible locally on your computer as specified in “index.js”:


```js
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });
```

You need to upload the database somewhere online, then let the online API on Heroku access that online database by replacing the localhost database URI provided to `mongoose.connect` with the URI of the online database you’re about to create. This is exactly what you’ll be doing in the second half of this Exercise.


> Alternative Hosting
> If, for any reason, you’re unable to redeem your GitHub Education perk and Heroku services, you can host your backend using an alternative tool. We suggest two options:
> 
> 
> Option 1: Render. Check out these step-by-step instructions on switching from Heroku to Render to host your API (on the CareerFoundry Forum). 
> Option 2: Vercel. Check out these step-by-step instructions on how to deploy your Node project on Vercel.


#### Uploading Your Database to MongoDB Atlas

Of course, your API is only one half of the backend to your myFlix app—you also need to host your database! Once your database is online, you’ll be able to connect it to your API on Heroku, ensuring that the entire backend of your project is online and ready to be used in tandem with a client app. Pretty exciting!

The service you’ll be using to host your database is called MongoDB Atlas. You can actually create databases and collections directly from within MongoDB Atlas, as well, but since you already created yours locally using MongoDB, you’ll need to import the JSON files you exported back in [Exercise 2.7: Non-Relational Databases & MongoDB](https://careerfoundry.com/en/steps/nonrelational-databases) onto a MongoDB Atlas “cluster.” Let’s walk through the steps.

You’ll first need to [sign up for a MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register).

![MongoDB Atlas signup page](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-signup-page-sml.png)


###### Figure 5.

Once you’ve registered a new account and verified your email address, you’ll be directed to the following screen, welcoming you to Atlas and asking about your project:

![Atlas welcome screen, with several initial questions](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-welcome-sml.png)


###### Figure 6.

On this screen, simply select the options that best describe your use of MongoDB Atlas: learning, exploring, JavaScript.

Next are the pages that walk you through setting up your first MongoDB Atlas cluster. Think of a cluster as your own personal web space where you can host your databases. Within a cluster, you can create multiple databases, and within each database, you can create multiple collections.

![Atlas set up page, with M0 free option selected](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-m0.png)


###### Figure 7.

Select the free plan on this page—make sure that M0 Cluster is selected (the one labeled as “FREE”).

Fortunately, MongoDB Atlas provides free sandbox accounts that you can use as an aspiring developer. The free account is all you’ll need for this project.

If you ever want to launch your app in the wild, however, you’ll eventually probably need to upgrade to a paid account.


> MongoDB Atlas Credits
> As you know, you’re eligible for access to a GitHub Education account. With this, you can benefit from the perks available in their Student Developer Pack. One of these perks is the availability of MongoDB Atlas credits. If you haven’t signed up for GitHub Education yet, go ahead now via the GitHub card in the “Perks” tab of your settings area and explore the MongoDB perk but the Student Developer Pack.

Next, choose a cloud provider, your region, and name your cluster.


- Cloud providers: Cloud providers are powerful remote servers that offer their computational power along with a wide variety of services, one of which is hosting databases. We recommend you choose AWS, as it’s the most widely used cloud provider.
- Regions: Each region is the location of a server (or group of servers). Pick a region that’s in the same country as—or the one that’s closest to—the location of your Heroku app server. You can find your Heroku app server’s location by clicking on the Settings tab within the app's dashboard. This will ensure there are minimal delays between your Heroku server and the database server, which can help optimize the user experience.
- Name: Name it whatever you want! In the following example, the name “myFlixDB” has been used, but since you may want to use this cluster for other databases in the future, feel free to use a more general name.

![Cluster name input field](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-cluster-name.png)


###### Figure 8.

Hit Create, and you’ll be redirected to the “Security Quickstart” page of your new MongoDB Atlas dashboard. With this done, your cluster has been deployed. You’ll work through the options on the “Security Quickstart” page in the next section.

![Atlas Security Quickstart page](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-security-quickstart.png)


###### Figure 9.


> Seeing Something Different?
> There’s a chance you’ll see a different signup flow. For example, you might see the options in Figure 10: 
> 
> 
> 
> Figure 10.
> 
> If so, this is just a condensed version of the options in Figure 7. In this case, choose “Auto Setup” and the free version will be selected, along with a database. You’ll just need to name your cluster.


##### Creating A Database User

Now that the cluster’s been deployed, you need to create a database user to access stored data in your database as well as data that will be added later on. If it isn’t selected by default already, click on the large Username and Password option under the question “How would you like to authenticate your connection?”. You’ll see an auto-generated username and password. if you’re satisfied with the generated credentials, you can use them. If not, you can change them to your desired username or password. Next, click on the green Create User button:

![Security username and password setup](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-username-password.png)


###### Figure 11.

Now, you have a new database user that you’ll use to authenticate connections to your database!


> Seeing something different?
> You might see a slightly different interface depending on your signup method. Nonetheless, whatever you’re seeing should be asking you to set up your database user with some credentials (username and password). Do this and you’ll be ready to move on to the next step.


##### Whitelisting IP Addresses on Atlas

To import the local database data you have on your machine (the collection files exported back in Exercise 2.7) into the remote cluster, you need a way for your machine to communicate with that remote cluster on Atlas. You can do this by whitelisting your IP address in Atlas. Whitelisting an IP address tells Atlas to authorize the machine at that IP to perform actions on the cluster remotely.

To do this, you’ll be taken to a screen asking “Where would you like to connect from?”. Your own IP address should have been automatically added.

![IP address setup](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-ip-setup.png)


###### Figure 12.

However, in this course, you want to allow access from any machine—not just your own. Allowing this access will be useful later on when you want to connect your Heroku API server to the database on Atlas. So, select the Network Access Page link text in the “Add entries to your IP Access List” section of the set-up flow (Figure 12). This will open the “Network Access” page in a new tab in your browser.

From the “Network Access” page, click the green ADD IP ADDRESS button (on the right-hand side):

![Network access page, showing “Add IP Adress” button](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-network-access.png)


###### Figure 13.

A popup will appear asking you to “Add IP Access List Entry”. All you need to do here is click the ALLOW ACCESS FROM ANYWHERE button, then hit Confirm.

![IP modal with “Allow Access From Anywhere” button circled](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-ip-access.png)


###### Figure 14.

A notice will appear informing you that Atlas is currently deploying this change. Wait until it disappears. You can then return to the “Security Quickstart” page. Refresh the page, and you’ll see the “access from anywhere” code (0.0.0.0/0) listed in your IP Access List. Now, the setup process is complete, and you can click on the Finish and Close button.

Congratulations! Your machine can now access the database hosted on Atlas. You’ll be taken to your “Database Deployments” page. It’s now time to import the local collection files you exported in Exercise 2.7.


##### Importing Local Collection Data into the Remote Database

Before learning how to import the local collection files, it’s worth pointing out the sample data provided by MongoDB. These sample datasets can give valuable insights and help you make informed decisions on how to structure your own movie data. Though you already have your data collections locally, it’s important to know how to access the available sample data from MongoDB, as this will help hasten your development process in future projects.

Loading Sample Data

Let’s first take a look at how you can load sample datasets into your database. From your “Database Deployment” dashboard, click on [**Load Sample Dataset”](https://www.mongodb.com/docs/guides/atlas/sample-data/), and wait for it to load the sample data set (keep in mind that this might take a while). You can view the loaded samples of the available data set by clicking on Browse Collections.

In the following image, the “samplemflix” database contains collections that are equivalent to the “movies” and “users” collections that you’ve created locally. If you click on **samplemflix**, you’ll see that it contains various collections (e.g., comments, movies, sessions, theaters, and users) and similar properties. For example, both contain a “title” key (which is a `string` type) and a “plot” (which is a `string` type, and an alternative to the “description” in your local version), among others.

You’ll notice a key difference is that “genre” and “director” are `array` types in the sample data, whereas they are `object` types in your local collections.

![Screenshot of sample data provided by MongoDB](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-sample-dataset.png)


###### Figure 15.

You won’t be using this sample data for your project in this Achievement, since you’ve already set up your models and business logic to fit your app. However, having an idea of how to make use of sample data sets—such as this MongoDB “sample_mflix” data set—will always come in handy when creating an app from scratch in the future. Developers often use dummy or sample data sets to fasten the development process and to also help identify redundancy, duplications, and coding errors, among other possible issues that need to be addressed before deployment.


##### Importing Local movies and users Collections

Since you won’t be using the sample data, you’ll now import your database from Exercise 2.7 using the command line. To do so, navigate to your “Database Deployments” page (by clicking on Database under the DEPLOYMENT section in the left-hand sidebar), then click on the "..." button (Figure 16). From the dropdown menu that appears, select Command Line Tools:

![Screensht of the ellipses “...” button](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-ellipses.png)


###### Figure 16.

The next screen contains options for importing the data into your cluster. If you scroll down, you’ll find the “Data Import and Export Tools” section, where you’ll see a command that starts with `mongoimport`. Copy the command (but don’t paste it into the terminal just yet—you still need to alter it a little bit).

![Data Import and Export Tools section](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-data-import.png)


###### Figure 17.

Paste the command in your code editor or in a text editor, as directly modifying long commands in the terminal can be very frustrating at times. The required changes are highlighted in the green text in Figure 17. These are:


- <PASSWORD>: The password of the newly created user.
- <DATABASE>: The name of the new database you’ll create; set it to myFlixDB (the specified database will automatically be created if it’s not on Atlas already).
- <COLLECTION>: The name of the new collection to be created on Atlas; make sure to use the same collection names you used locally (open a new terminal and run db.getCollectionNames() if you forgot the names).
- <FILETYPE>: Set it to json.
- <FILENAME>: The path of the exported file on your machine.

Here’s an example of an adjusted command:


```js
mongoimport --uri mongodb+srv://myFlixDBadmin:12345@myflixdb.dcdfl.mongodb.net/myFlixDB --collection movies --type json --file ../exported_collections/movies.json
```

Make sure you don’t copy the above command into your own terminal. It won’t work, as it first needs to be modified for your own project.


> Note
> If your password contains the “@” special character, replace it with “%40”, as such characters have to be URL encoded.

Once you’ve replaced these elements, you can run the finalized command in the terminal to import the data into the new database on the remote cluster. To do this, open the terminal and navigate to the folder containing the database (e.g., “exported_collections” alongside the root folder). Then, run the command.

You’ll know if the import was successful if you get an “imported X document(s)” message. “X” here represents the number of imported documents from the file.

![Terminal showing successful import message](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Terminal-import-success.png)


###### Figure 18.

Alternatively, you can view your current collections in the remote database by clicking the Browse Collections button on the “Database Deployments” page:

![Screenshot showing “Browse Collections” button on “Database Deployments” page](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-browse-collections.png)


###### Figure 19.

There, you’ll find a list of the collections that you’ve just imported. Click on any of them to view their documents.

![View of imported collections](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-imported-collections.png)


###### Figure 20.

Well done. You now know how to import data from your local database into the remote MongoDB Atlas database. You can use this `mongoimport` command for every exported collection file.


> Recap
> Here are the steps to import your collection (JSON file) at a glance: 
> 
> 
> Create a cluster.
> Create a database user.
> Add your IP address to the IP access list.
> From command line tools, copy and edit the data import command.
> Run the command in your terminal.
> Make sure the collection has been imported by browsing the collections in your MongoDB cloud.


##### Running MongoDB Shell Commands Remotely

Now that your machine is authorized to communicate with the online database, you can run regular MongoDB commands on your collections if you ever need to. This is similar to how you were running MongoDB commands using the `mongosh` shell while the MongoDB service is running in the background on your computer.

First, open the “Database Deployments” page to find your cluster, then click on the Connect button:

![“Connect” button on “Database Deployments” page](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-connect-button.png)


###### Figure 21.

A window will appear presenting three options. Select Shell:

![Connect window, with Shell option circled](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-shell-option.png)


###### Figure 22.

The next screen will have instructions for installing MongoDB Shell. You already have this, so select I have the Mongo Shell installed and choose your Mongo Shell version as instructed. Don't close the popup just yet!

![Shell install settings page](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-shell-install.png)


###### Figure 23.

Now, copy the command under the second step and paste it into your terminal, then hit Enter. Afterward, you’ll be prompted to enter the password for the database user you created earlier in this Exercise (remember, when entering your password, make sure all special characters are [URL encoded](https://www.mongodb.com/docs/atlas/troubleshoot-connection/#special-characters-in-connection-string-password)). Hit Enter again, and you should see a screen in your terminal like this:

![Terminal view after running commands](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Terminal-post-commands.png)


###### Figure 24.

Notice that this command is the same `mongosh` command you used before. Now, however, additional arguments have been supplied into it (the host and the remote user's username) while the MongoDB service is being run on Atlas remotely.

Once connected, you’ll be able to run commands that will be executed remotely and will affect your remote database right from your machine, for example, `db.movies.find();`. Do note, however, that you may experience lag. This is because you’re using a remote shell. Don’t worry as it’s perfectly normal.


#### Connecting your Database to Your API on Heroku

You now have your API online by way of Heroku and your database online by way of MongoDB Atlas, but they still can’t communicate with each other as they’re not connected. Let’s fix that!

To connect your API with your database, you’ll need to add a new line of code into your app’s “index.js” file. If you’ll remember from [Exercise 2.8: The Business Logic Layer](https://careerfoundry.com/en/course/full-stack-immersion/exercise/business-logic), you added the following line of code to connect to your database (currently located on your local computer) via Mongoose:


```js
mongoose.connect('mongodb://localhost:27017/dbname', { useNewUrlParser: true, useUnifiedTopology: true });
```

Now that your database is located online, you need to change this code, directing it, instead, to your new MongoDB Atlas database. One tip, here, is to actually add the code for both your local database and your online database and simply comment out the one you don’t want to use at the time. This makes it easy to switch back and forth between your local and online databases as the need arises (e.g., for testing purposes).

Go ahead and comment out your current `mongoose.connect();` function, then copy-paste it onto a new line. Delete the URI to your local database from inside this new copy-pasted line of code: `mongodb://localhost:27017/dbname`. You need to replace this URI with the URI for your online database. To get this URI, head back over to your cluster on the “Database Deployments” page in MongoDB Atlas, and open up the Connect interface again (Figure 21).

You previously used this interface to get the command for connecting to your database through the Mongo shell.  Now, however, you want to connect your app to MongoDB Atlas. For this, you need to select the “Drivers” option (under “Connect to your application”).

![“Drivers” option circled within the Connect interface](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-drivers-connect.png)


###### Figure 25.

This will present you with a new modal to set up the connection to your app with the MongoDB Driver. Here, you’ll find the new database connection URI (also known as the “Connection String”) in the third step:

![Screenshot of connection modal, with connection string circled](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Atlas-connection-string.png)


###### Figure 26.

Click on the Copy button to copy this URI and paste it into the new `mongoose.connect();` function you just created in your “index.js” file. Make sure you go in and replace `<PASSWORD>` with your actual database user password, and the database name that’s after `mongodb.net/` and right before `?retryWrites=true` with the name of your actual database (the same database name you used in the `mongoimport` command previously). When you’re done, you should have something that looks like this in your `index.js` file (if your username were “kay”, your password were “myRealPassword”, and the name of your database were “myFlixDB”:


```js
mongoose.connect('mongodb+srv://kay:myRealPassword@myflixdb-jvame.mongodb.net/myFlixDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
```

Important! Don't copy the connection URI in the above code snippet! It’s only included as an example. There are other parts of the connection URI that might be different from the one you need to use, for instance, the password, cluster name, and more.

The updated `mongoose.connect(...)` code should successfully connect to your online database if the changes are pushed to Heroku (but don’t do so just yet!). However, since you’ll want to push all the changes you made to GitHub, too, the connection URI will be exposed to whoever views the repository. This means that theoretically, anyone could use your database and manipulate the data there (because all the necessary credentials are included in your connection URI). To avoid this problem, you can use environment variables.


##### Environment Variables

Environment variables are similar to those you define in any programming language, except that they’re not limited to the context of your Node.js server application (in this case, your myFlix API). Instead, they reside in the context of the operating system that’s hosting the server application.

You can think of them as:


- Special global variables that can be accessed by any application you have on that operating system (even if coded in a different programming language such as PHP, Java, etc.)
- Variables that can be set without explicitly defining them in the project files (e.g., in “index.js”: let x = '123')

In Node.js, you can access environment variables using `process.env.[variable]` where `[variable]` is the name of the actual variable. First, however, let's define the variable on Heroku (as that’s where you’ll be connecting to your online database).

Open the dashboard of your API application on Heroku. There, open the Settings tab and click the Reveal Config Vars button:

![Reveal Config Vars](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Heroku-reveal-config-vars.png)


###### Figure 27.

Notice how Heroku is referring to environment variables as “Config Variables.” Don’t panic! These are still environment variables. Heroku is just referring to how it uses these variables. This button will bring up a pair of input fields (`KEY`, `VALUE`):

![Key and Value fields](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Heroku-config-vars-empty.png)


###### Figure 28.

In the KEY field, type `CONNECTION_URI`, which is the name of the variable you’ll use to refer to the connection URI. You can use a different name if you like. Just keep in mind that the name is case sensitive. This is the name you’ll use in place of `[variable]` in `process.env.[variable]` (i.e., `process.env.CONNECTION_URI`).

Next, copy-paste your connection URI into the VALUE field. Ensure your connection URI has your actual password and database name, then click the Add button:

[](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Heroku-config-vars-filled.png)


###### Figure 29 (Click to Zoom)

Back in your “index.js” file, replace the connection URI string with `process.env.CONNECTION_URI` (or whatever you named your environment variable):


```js
mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
```

Now, your connection URI will never be exposed in your “index.js” file. This is much more secure!

Save your “index.js” file, then commit and push the changes to your GitHub repository in GitHub Desktop. Once finished, push everything to Heroku (`git push heroku main`).

Once Heroku has finished deploying your new build, your API will be live! Head back to your Heroku dashboard and click on Open App in the top-right corner:

[](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Heroku-open-app.png)


###### Figure 30. (Click to Zoom)

This will launch your app in a new browser window. It may take a few seconds to get your app up and running, but once it does, you should see the default message you set for your “/” endpoint.

You’ve just successfully connected your Heroku API to your MongoDB Atlas database! Now, you can make requests to the API hosted on Heroku using Postman. Do remember, of course, that you need to add the JWT token as well, similar to what you did previously.


> Troubleshooting!
> If your Heroku app gives you an error or doesn’t seem to be working, you can check your app’s log for an idea of what the error might be. Under the More menu in the top right corner, click View logs, which will display your app’s log file. Here, you can check out what your app is trying to do each step of the way and where any errors might be occurring. Doing a web search for the error message in question will usually bring up plenty of inquiries and solutions from other developers, which can help you solve whatever issue is holding back your app.

![Heroku interface with the Open App menu displayed and an arrow pointing at the View logs option](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Heroku-view-logs.png)


###### Figure 31.


> If you don’t want to go through your Heroku dashboard, you can also check your log in the terminal via the command: heroku logs --tail. The --tail part of this command tells Heroku to run a continuous log (from which you can exit by hitting Ctrl + C). If you only want to output the last 50 lines, you can enter the command without the --tail.

Do note that all data pulled from your database is still being displayed in plain JSON, so it probably doesn’t look all that pretty in your browser. This is exactly what you’ll be working on in the next Achievement—creating a new UI for your app using React that will display all the data from your database in an easy-to-read, aesthetically pleasing interface.


#### Final Testing on Postman

Go ahead and open Postman, but this time, set the URL for your requests to that of your Heroku app. For instance, try to add a new user to your online database. Select `POST` for the type of request, select the “/users” endpoint for your Heroku URL, then add a JSON object in the request body (making sure it’s set to raw and JSON):

[](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/2.10/Postman-request-body.png)


###### Figure 32. (Click to Zoom)

So long as everything’s working between your API and database, you should receive a JSON object back as a response, representing the new user you just added (which should also have been given a new ID). You can test logging in as a new user to get a JWT token, which can be used to access any protected endpoints.


#### Summary

Congratulations! You’ve just finished the second Achievement of your Full-Stack Immersion Course, putting you one step closer to becoming a full-stack fiend on the keyboard. Think back to everything you’ve done so far—you started out learning basic HTML and CSS in your Intro to Frontend Development course, then moved on to JavaScript in the first Achievement of your Full-Stack Immersion course, rounding out your frontend knowledge. Then, in this Achievement, you took your JavaScript skills one step further, this time, on the backend. So far, you’ve built a portfolio site, an interactive JavaScript app that can communicate with an external API, and your own API/database combination. That’s quite the feat! And there’s more to come.

This Achievement was all about the backend, or server-side, of the development process. You learned how you can use JavaScript and Node.js to create an API that can communicate between an app and a database, as well as how you can use MongoDB to create your own non-relational database to go with it! In the next Achievement, you’ll continue working on your myFlix app, only this time, creating the frontend that your end users will interact with. Rather than using HTML and CSS like you learned before, you’ll be using a new tool: a JavaScript UI framework called React. With every Achievement comes something new to learn and explore!

Before moving on, however, let’s put the finishing touches on your app’s backend by implementing CORS, password hashing, and data validation, then, finally, hosting your app and database online for the world to see and use!


#### Resources

If you’re curious to read more about the topics covered in this Exercise, then we recommend taking a look at the resources below. Note that this reading is optional and not required to complete the course.

CORS:


- Mozilla CORS Documentation
- Form Validation with Express.js
- Compare InstantSSL Certificates
- Using CORS in Express

Attacks on the Web:


- Web Application Vulnerabilities

Validating with Express:


- Web Form Validation: Best Practices and Tutorials
- Express Validator
- Express Validator Legacy API
- Validating Input in Express

Hashing:


- Hashing Passwords with Node.js and Bcrypt

GDPR and Data Privacy:


- The GDPR: Understanding the 6 Data Protection Principles
- GDPR - A Practical Guide for Developers
- Data Protection and Privacy Law for Developers

Hosting Your API:


- Traditional vs. PaaS Hosting

Guides


- Tutorial for GitHub Education and Heroku Student Pack

Take the quiz to test your knowledge on this Exercise.


#### Task


- Direction
- Submission History

In this Exercise, you learned about data ethics and web security—both issues of great importance to developers designing apps. With that in mind, let’s go ahead and implement some security mechanisms into your myFlix app.

You’ll also need to deploy your API to the cloud PaaS (Platform as a Service) platform Heroku, deploy your database to the cloud-based database hosting platform MongoDB Atlas, and make sure all these moving parts of your app are synced up to work perfectly together. Then, that’s a wrap!


> Perk: GitHub for Education and Heroku Access
> As a CareerFoundry student you're eligible for a GitHub Education account. This gives you free access to their Student Developer Pack, which offers discounts and free access to an awesome array of developer tools and services. 
> 
> Through this Student Developer Pack, you can use important Heroku features and services (which you'll need for this task and your myFlix project) for free. If you're interested, you can learn more about Heroku's offering for registered GitHub students.  
> 
> Head to the Perks tab in your Settings area of the CareerFoundry platform for information on how to redeem this perk.
> From the GitHub Student Developer Pack, you’ll see additional perks for MongoDB Atlas. It’s not required for the task, but exploring these perks may be useful for you as you learn more about databases and backend systems.

Directions:

Step 1. Implement CORS into your app, ensuring that all domains are allowed to make requests to your API.

Step 2. Add password hashing to your user schema and integrate it into the login and registration HTTP handlers to ensure that passwords aren’t stored in your database without first being hashed.
    - Use Postman to register a new user and log in as that user, taking screenshots of the results to ensure that the password hashing is working.

Step 3. Add data validation to any endpoint that’s expecting data in the request body (most likely just your endpoints for creating and updating user data). Only validate data that’s been formatted as expected. If entered data doesn’t meet the requirements, an error message should be sent as an HTTP response back to the client.
    - Use Postman to test your data validation by making requests to the endpoints you updated, using both valid and invalid data to ensure your code is working. Take screenshots of the results.

Step 4. Push any changes to your GitHub repository.

Step 5. Deploy your application to Heroku following the instructions in the Exercise (don’t forget to add a new “start” script to your “package.json” file and make sure that your port isn’t hardcoded).

Step 6. Upload your database to MongoDB Atlas following the instructions in the Exercise.

Step 7. Connect your Heroku application to your MongoDB Atlas database by adding the new connection URI to your “index.js” file with the use of environment variables. Then, push your changes to Heroku and test that your Heroku app loads and can connect to your database.

Step 8. Test your endpoints in Postman to ensure that everything is working correctly between your app and database (in particular, your `POST` and `PUT` endpoints).


- If you get an empty array when testing the “/movies” endpoint, it could be because a test database was created by default. This  sometimes occurs while using the free tier of MongoDB. To check, head to the “Deployment” section in MongoDB cloud. There, click on Database, then on Browse Collections. If the “test” database was created, you’ll see it here (like in Figure 33). If this is the case for you, revisit the “Importing Local movies and users Collections” section of the Exercise, but this time use the “test” database as the destination.

![Screenshot showing that default test database was created.](https://coach-courses-us.s3.amazonaws.com/public/courses/fullstack-immersion/A2/2.10/default-test-database.png)


###### Figure 33. Image showing a “test” database created by default in MongoDB

Step 9. Push your changes to GitHub.

Step 10. Submit a link to your public API and your updated GitHub repository here for your mentor to review.


> prepare your portfolio
> At the end of the program, you'll prepare and submit your final portfolio, so collecting your project deliverables and reflecting on your work as you go will save a ton of time. Remember: you don't have to submit this to your mentor until the end of the program.
> 
> If you haven't already, start a running text document and add reflections on your project for this Achievement, including the following:
> 
> 1) A brief description of the project. You can use the Achievement 2 project brief (PDF) or your README file as inspiration. In your description, try also to reflect on your work by answering the following questions (you don't need too much detail; the key points are fine):
> 
> 
>   What was your role for this project and what tasks did you face?
>   What decisions did you take and why? What were the consequences?
>   If you could, what would you do differently?
>   What lessons did you learn during this project?
> 
> 
> 2) A screenshot to represent the project.
> 
> 3) A link to the project’s GitHub repository.
> 
> 4) A link to the live, hosted version of your app (if possible). If you don’t have a live version, include screenshots that show the app’s functionality or a recording of your app in use.
> 
> 5) A list of the technologies used for each project (React, CSS etc. — again, you can pull this from your README file).
> 
> 6) Any other relevant materials you created for the project; for example, user flows, user stories, and/or a Kanban board. Be sure to explain how you worked with these materials during the project.


#### Bonus Project

CareerFoundry collaborated with the team at Slack to develop a project brief for a Slack app. The brief is exclusive to CareerFoundry Web Development students and an opportunity to work on yet another project for your web development portfolio.

You can access the full project brief here: [Full-Stack Immersion Slack Project Brief (PDF)](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/Full-Stack_Immersion_SLACK_Project%20Brief.pdf). The brief includes details on the project objective, users, and requirements, as well as instructions on how to build the Slack application. If you get stuck, reach out to the CareerFoundry Web Development community on Slack—they're always happy to help!


> Please complete our brief Exercise Feedback survey to share your thoughts on the Spotlight on AI sections in this Achievement. Your feedback is valuable and helps us improve our curriculum.

Rubric

Refer to the categories below to see how to meet the requirements of the approved stage

![](https://cdn.careerfoundry.com/assets/rubrics/not_yet-c9fb80e521507759d546f847f8a65a00c66f2c8ec7ece4e37f98c25aa122778c.svg)


- {"One or more of the following hasn’t been completed or contains errors in the code"=>"1) CORS implementation, 2) password hashing, or 3) data validation; AND"}
- App hasn’t been successfully deployed to Heroku, or the database hasn’t been successfully deployed to MongoDB Atlas, or the two haven’t been successfully integrated

![](https://cdn.careerfoundry.com/assets/rubrics/almost_there-f4bb1c077a0a826e7d4e3ecb72859fc401d362d9bd49c0658f4fd85c4a047a87.svg)


- CORS has been properly implemented and allows all domains to make requests; AND
- Password hashing has been integrated for all passwords for login and registration; AND
- Data validation has been integrated into all data-receiving endpoints; BUT
- App hasn’t been successfully deployed to Heroku, or database hasn’t been successfully deployed to MongoDB Atlas, or the two haven’t been successfully integrated

![](https://cdn.careerfoundry.com/assets/rubrics/approved-7dfdcf59318cf52fcbd1333d8b71bf7a2bde35b6e0b753ac975349982495e0b4.svg)


- CORS has been properly implemented and allows all domains to make requests; AND
- Password hashing has been integrated for all passwords for login and registration; AND
- Data validation has been integrated into all data-receiving endpoints; AND
- Environment variables are utilized to hide the online database's connection URI; AND
- App has been deployed to Heroku, the database has been deployed to MongoDB Atlas, and the two have been integrated
- Proper authentication and authorization has been employed in your app (mentor can't make unauthorized changes to app)

Questions for this task

Student Submissions

Check out recently submitted work by other students to get an idea of what’s required for this Task:

300 MB limit, File types allowed: jpg, png, pdf, txt