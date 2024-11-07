const { Sequelize } = require("sequelize");
require("dotenv").config();

// // Create a new Sequelize instance for MSSQL
// const sequelize = new Sequelize('Matunga', 'prathamesh', '12345678', {
//     host: 'DESKTOP-6D29MI3', // Generally, 'localhost' or the server's IP address
//     port: 1499,        // Default port for MSSQL
//     dialect: 'mssql',
//     logging: false, // Disable logging; default: console.log
// });

// // Test the database connection
// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection to the MSSQL database has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the MSSQL database:', err);
//     });

// // // Export the Sequelize instance to be used in other modules
// module.exports = sequelize;

// "noviusr1_Admin1",

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, // Generally, 'localhost' or the server's IP address
    port: process.env.DB_PORT, // Default port for MSSQL
    dialect: process.env.DB_DIALECT,
    logging: false, // Disable logging; default: console.log
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the MSSQL database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the MSSQL database:", err);
  });

// Export the Sequelize instance to be used in other modules
module.exports = sequelize;
