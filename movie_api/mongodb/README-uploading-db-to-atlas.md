Dump local db to directory
`mongodump --db movieapi_mongodb --out ./mongo_backup`

Restore to atlas cluster
`mongorestore --uri "mongodb+srv://<username>:<password>@myflix-cluster.zxbvej4.mongodb.net" --db movieAPI ./mongo_backup/movieAPI`
