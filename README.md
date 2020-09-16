# KNIndex
A comprehensive database of *k*-nucleotide physicochemical property values.

## Introduction
We deposited all physicochemical property values, as well as the corresponding literatures, into a MySQL database. We implemented the backend system using JavaScript with node.js script engine and the Express framework. The frontend was implemented using JavaScript with the Vue framework. We developed the project on **Windows10 platform**, using the code editor [Visual Studio Code](https://code.visualstudio.com/).

## Development
If you want to run these codes in the development environment, you should install **Node.js** (https://nodejs.org/en/download) and **MySQL** (https://www.mysql.com/downloads/) first on your machine.

After your Node.js environment and MySQL are ready, find out the location of the source code of KNIndex that you unpack and enter this directory in command line program. Then execute the command `npm install` to install all the dependencies of the project.

### Add data to MySQL database
Firstly, you should create a database. Then, add data to the database by loading SQL file [propertydb.sql](https://github.com/wyzhang0401/KNIndex/blob/master/properties/propertydb.sql).

### Start backend
Enter the `server` directory in the other command line program. To start backend, users need a file to configure MySQL database information, namely **data.base.conf.js**. Users can add the file according to **data.base.conf.js.example** we provided. Then execute the command `node index.js`. 

### Start web server
Type and excute the command `npm run serve` in the first command line program. After a while, KNIndex will start in your default browser.

### Please note
- If there are errors after executing the command `node index.js` when you start backend, please consider executing the SQL statement (`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your password';`) to modify the encryption method for MySQL and make sure your MySQL service is enabled.
- If you want to reconfigure the Vue, please see [Configuration Reference](https://cli.vuejs.org/config/).
- If you have changed the listening port of [backend](https://github.com/wyzhang0401/KNIndex/blob/master/server/index.js), please reconfigure **devServer.proxy** option in [vue.config.js](https://github.com/wyzhang0401/KNIndex/blob/master/vue.config.js) accordingly. Otherwise there will be an error: **Failed to load resource: the server responded with a status of 500 (Internal Server Error)**.

## Production
If you want to deploy the project to your own server when there are no problems in the development environment, you would need to excute `npm run build` in the root directory to get the `dist` folder firstly. And then configure the running environment on the server.

### Steps for production
1. Install **Node.js** and **MySQL** on the server.
2. Create a database and add data to the database by loading SQL file [propertydb.sql](https://github.com/wyzhang0401/KNIndex/blob/master/properties/propertydb.sql).
3. Create a new directory (e.g. `knindex`) on the server.
4. Upload the `dist` folder, `server` folder and `package.json` file to `knindex` directory.
5. Execute the command `npm install` to install all the dependencies in the `knindex` directory.
6. Install and configure **Nginx**.
7. You can install **PM2** to manager your node process. 
8. Type and execute the command `pm2 start index.js` in the `server` folder to start the project.

### Please note
- If the program does not start properly, please running commands `pm2 list` and `pm2 show 0` (where 0 represents the process id) to view error messages.