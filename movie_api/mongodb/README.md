# MongoDB Installation and Setup

### MongoDB Installation

1. Install dependencies:
```bash
# Install MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community

# Install MongoDB Compass (GUI)
brew install --cask mongodb-compass

# Install Mongosh (MongoDB Shell)
brew install mongosh

# Start MongoDB service
brew services start mongodb-community

# Install project dependencies
npm install
```

2. Configure MongoDB:
```bash
# Verify MongoDB is running
mongosh
```

3. Configure environment variables in `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/movieAPI
PORT=3000
JWT_SECRET=your_jwt_secret
```

4. Seed the database with initial data:
```bash
node movie_api/mongodb/utils/seedDatabase.js
```
or
```bash
npm run seed:mongodb
```

5. Start the server:
```bash
node movie_api/mongodb/server.js
```

6. Open MongoDB Compass and connect to the database:
- New Connection
- URI: mongodb://localhost:27017
- Connect

### MongoDB Atlas Setup (Cloud Database)

1. Create MongoDB Atlas account:
- Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Sign up for a free account
- Create a new project
- Build a database (free tier)

2. Configure Atlas Connection:
- Create a database user
- Add your IP to the IP Access List
- Get your connection string
- Replace `MONGODB_URI` in `.env` with Atlas connection string

3. Connect with MongoDB Compass:
- Copy connection string from Atlas
- Open MongoDB Compass
- Paste connection string
- Connect

### Common MongoDB Shell Commands

```bash
# Show all databases
show dbs

# Switch to database
use movieAPI

# Show collections
show collections

# Query documents
db.movies.find()
db.users.find()

# Pretty print results
db.movies.find().pretty()

# Count documents
db.movies.countDocuments()

# Find specific document
db.movies.findOne({ title: "Movie Title" })

# Exit MongoDB shell
exit
```

### Essential MongoDB CLI Commands

# Database Operations
```bash
# Start MongoDB shell
mongosh

# Show MongoDB version
mongosh --version

# Show current database
db

# List all databases
show dbs

# Create/Switch database
use database_name

# Drop database
db.dropDatabase()

# Show database stats
db.stats()
```

# Collection Operations
```bash
# List collections
show collections

# Create collection
db.createCollection("collection_name")

# Drop collection
db.collection_name.drop()

# Rename collection
db.collection_name.renameCollection("new_name")
```

# CRUD Operations
```bash
# Insert document
db.collection_name.insertOne({ field: "value" })

# Insert multiple documents
db.collection_name.insertMany([
  { field: "value1" },
  { field: "value2" }
])

# Find all documents
db.collection_name.find()

# Find with pretty printing
db.collection_name.find().pretty()

# Find with specific criteria
db.collection_name.find({ field: "value" })

# Find one document
db.collection_name.findOne({ field: "value" })

# Update one document
db.collection_name.updateOne(
  { field: "value" },
  { $set: { new_field: "new_value" }}
)

# Update many documents
db.collection_name.updateMany(
  { field: "value" },
  { $set: { new_field: "new_value" }}
)

# Delete one document
db.collection_name.deleteOne({ field: "value" })

# Delete many documents
db.collection_name.deleteMany({ field: "value" })
```

# Query Operations
```bash
# Count documents
db.collection_name.countDocuments()

# Limit results
db.collection_name.find().limit(5)

# Skip results
db.collection_name.find().skip(5)

# Sort results (1 ascending, -1 descending)
db.collection_name.find().sort({ field: 1 })

# Find distinct values
db.collection_name.distinct("field")

# Complex query with multiple conditions
db.collection_name.find({
  field1: "value1",
  field2: { $gt: 100 },
  field3: { $in: ["a", "b", "c"] }
})
```

# Index Operations
```bash
# Create index
db.collection_name.createIndex({ field: 1 })

# List indexes
db.collection_name.getIndexes()

# Drop index
db.collection_name.dropIndex("index_name")

# Drop all indexes
db.collection_name.dropIndexes()
```

# User Management
```bash
# Create user
db.createUser({
  user: "username",
  pwd: "password",
  roles: ["readWrite"]
})

# Show users
show users

# Drop user
db.dropUser("username")
```

# Backup and Restore
```bash
# Backup database (from terminal)
mongodump --db=database_name --out=backup_directory

# Restore database (from terminal)
mongorestore --db=database_name backup_directory/database_name
```

### Project Dependencies

- mongoose: MongoDB object modeling
- mongodb: MongoDB driver
- dotenv: Environment variable management

---

