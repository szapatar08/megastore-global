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
Open your prefered database manager tool and run the commands store in the file `DDL.sql`.

### And what about the MongoDB?
In this case we use an Atlas MongoDB Database that is store on the web, just have to make sure that your IP is on the list in the MongoDB Atlas website.

## Guide to the API
### Uploads
To upload a new file through a .CSV file you must know some important endpoints, all of this endpoints and made to make POST requests.:
- To upload data to the customers table you must follow this endpoint: `/api/upload/customers`.
- To upload data to the suppliers table you must follow this endpoint: `/api/upload/suppliers`.
- To upload data to the categories table you must follow this endpoint: `/api/upload/categories`.
- To upload data to the products table you must follow this endpoint: `/api/upload/products`.
- To upload data to the orders table you must follow this endpoint: `/api/upload/orders`.
- To upload data to the orders_products table you must follow this endpoint: `/api/upload/orders_products`.

### Orders
You can create, read, update and delete and order if you want, here are the endpoints:
- To read all the orders use a GET request to this endpoint: `http://localhost:3000/api/orders/`
- To read just one order use a GET request to this endpoint, adding the id where says id: `http://localhost:3000/api/orders/:id`
- To create a new order use a POST request to this endpoint, add as a JSON request the `cortumer_id` of the customer how's doing the order, also the `product_id` and the `quantity` of that product: `http://localhost:3000/api/orders/`
- To delete an order use a DELETE request to this endpoint, adding the id where says id: `http://localhost:3000/api/orders/:id`
- To update an order use a PUT request to this endpoint, adding the id where says id, the column want to change and its value: `http://localhost:3000/api/orders/:id/:column/:value`
