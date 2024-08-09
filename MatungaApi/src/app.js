const express = require('express');
const EmuReport = require('./models/EmuReport'); // Import the EmuReport model
const sequelize = require('./config/database'); // Import the Sequelize instance

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// API to retrieve data from EMUReportTable by filename
app.get('/api/emureport/:filename', async (req, res) => {
    const filename = req.params.filename;

    try {
        // Query the database to retrieve records based on the filename
        const emuReports = await EmuReport.findAll({
            where: {
                filename: filename // Adjust this line if you're filtering by a different column
            }
        });

        if (emuReports.length === 0) {
            return res.status(404).json({ message: 'No records found' });
        }

        res.json(emuReports);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    sequelize.authenticate().then(() => {
        console.log('Database connected...');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
});
