Dump local db to directory
`mongodump --db movieapi_mongodb --out ./mongo_backup`

Restore to atlas cluster
`mongorestore --uri "mongodb+srv://<username>:<password>@myflix-cluster.zxbvej4.mongodb.net" --db movieAPI ./mongo_backup/movieAPI`


# Running mongodb commands remotely
First, open the “Database Deployments” page to find your cluster, then click on the Connect button:

Click on shell | I have mongodb installed | run connection string in command line:
`
mongosh "mongodb+srv://myflix-cluster.zxbvej4.mongodb.net/" --apiVersion 1 --username oliveroliverio`

Enter password:

now you can run mongosh commands like you did locally