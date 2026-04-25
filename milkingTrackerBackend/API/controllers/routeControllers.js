const Milk = require('../../Database/milkSchema.js');

const storeMilkData = async (req, res) => {
    try {
        const { quantity, startTime, endTime, duration } = req.body;

        // Validate input
        if (!quantity || !startTime || !endTime || !duration) {
            return res.status(400).json({
                message: 'Missing required fields'
            });
        }

        // Create new record with user reference
        const newMilkRecord = new Milk({
            user: req.user.id,
            quantity,
            startTime,
            endTime,
            duration
        });

        const data = await newMilkRecord.save();

        res.status(201).json({
            message: 'Milk data stored successfully',
            data
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

//  Get Milk Data (Only logged-in user's data)
const getMilkData = async (req, res) => {
    try {
        const milkdata = await Milk.find({ user: req.user.id });

        if (milkdata.length === 0) {
            return res.status(404).json({
                message: 'No Data Found'
            });
        }

        res.status(200).json({
            message: 'User Data fetched successfully',
            data: milkdata
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

module.exports = { storeMilkData, getMilkData };           