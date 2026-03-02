# MegaStore Global
MegaStore Glabal if facing one big administrative crisis, they group all their data into a massive Excel, making it unorganize and inefficient.

Step by Step this is what we have to do to help them:
1. Analize and Normalize the database:
    - Give the DER to the company
2. Integrate all the data to the database via a CSV file.
3. Make a way to manage the information via an API:
    - Must use Express
4. Let the user search for data throught an API.
5. Create a log in MongoDB.

##  Why SQL instead of MongoDB?
In this case we need a solution that allow us to manage masive data without redundancy, to stop redundancy and better optimization we rather to use SQL as the elected database language.

## How to deploy the API?
First of all we have to inizialize the MySQL database in the server. For that we must have install docker, and run this command in the terminal:
```
  docker run --name megastore-global -p 3310:3306 -e MYSQL_ROOT_PASSWORD=mymegastoredatabase -d mysql
```
Open your prefered database manager tool and run the commands store in the file `DLL.sql`.

### And what about the MongoDB?
In this case we use an Atlas MongoDB Database that is store on the web, just have to make sure that your IP is on the list in the MongoDB Atlas website.
