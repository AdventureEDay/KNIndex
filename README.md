# KNIndex
A comprehensive database of k-nucleotide physicochemical property values

## Project setup
If you want to run these codes in the development environment, you should install **Node.js** and **MySQL** first on your machine.

After your Node.js environment and MySQL are ready, find out the location of the source code of KNIndex that you unpack and enter this directory in command line program. Then execute the command `npm install`.

### Add data to MySQL database
Firstly, you should create a database named as **propertydb**. Then, add data to the database by loading SQL file [propertydb.sql](https://github.com/wyzhang0401/KNIndex/blob/master/properties/propertydb.sql).

### Compiles and hot-reloads for development
Type and excute the command `npm run serve`. After a while, KNIndex will start in your default browser.

### Start backend
Type and excute the command `cd server` to enter the server directory. To start backend, users need a file to configure MySQL database information, namely **data.base.conf.js**. Users can add the file according to **data.base.conf.js.example** we provided. Then execute the command `node index.js`. 

### Compiles and minifies for production
```
npm run build
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
