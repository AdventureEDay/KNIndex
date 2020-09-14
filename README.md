# KNIndex
A comprehensive database of *k*-nucleotide physicochemical property values.

## Development
If you want to run these codes in the development environment, you should install **Node.js** (https://nodejs.org/en/download) and **MySQL** (https://www.mysql.com/downloads/) first on your machine.

After your Node.js environment and MySQL are ready, find out the location of the source code of KNIndex that you unpack and enter this directory in command line program. Then execute the command `npm install` to install all the dependencies of the project.

### Add data to MySQL database
Firstly, you should create a database. Then, add data to the database by loading SQL file [propertydb.sql](https://github.com/wyzhang0401/KNIndex/blob/master/properties/propertydb.sql).

### Start backend
Enter the server directory in the other command line program. To start backend, users need a file to configure MySQL database information, namely **data.base.conf.js**. Users can add the file according to **data.base.conf.js.example** we provided. Then execute the command `node index.js`. 

**Note**: If there are errors after executing the command `node index.js`, please consider executing the SQL statement (`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your password';`) to modify the encryption method for MySQL.

### Start web server
Type and excute the command `npm run serve` in the first command line program. After a while, KNIndex will start in your default browser.

## Compiles and minifies for production
```
npm run build
```
