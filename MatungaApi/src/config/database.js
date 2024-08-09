const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // Use 'postgres' for PostgreSQL
    logging: false, // Disable logging; default: console.log
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Export the Sequelize instance to be used in other modules
module.exports = sequelize;
