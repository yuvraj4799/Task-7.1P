const mqtt = require('mqtt');
const mongoose = require('mongoose');

const brokerUrl = 'mqtt://broker.hivemq.com:1883';

// Import the Sensor model (assuming you have a Sensor model defined)
const Sensor = require('./models/sensor');

const topicLight = '/Light2/+';
const client = mqtt.connect(brokerUrl);

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://yuvrajbansal1905:BansalJi3396@cluster0.028pg1o.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.on('connect', () => {
    console.log(`MQTT connected for ${topicLight}`);
    client.subscribe(topicLight);
});

client.on('message', async (receivedTopic, message) => {
    console.log(`Received message from topic: ${receivedTopic}`);

    const topicParts = receivedTopic.split('/');
    const lightName = topicParts[1];
    const dataType = topicParts[2]; // Building, Floor, Room, or Status

    try {
        let sensor = await Sensor.findOne({ id: lightName }).exec();

        if (!sensor) {
            sensor = new Sensor({
                id: lightName,
                readings: {},
            });
        }

        // Update the specific reading type (Building, Floor, Room, or Status)
        sensor.readings[dataType] = message.toString();
        sensor.time = new Date();

        // Save the updated sensor document
        const savedSensor = await sensor.save();
        console.log(`Saved data to MongoDB: ${JSON.stringify(savedSensor)}`);
    } catch (error) {
        console.error(`Error saving data to MongoDB: ${error}`);
    }

    console.log('');
});

// Handle any errors
mongoose.connection.on('error', (error) => {
    console.error(`MongoDB connection error: ${error}`);
});

// Close the MongoDB connection when the application exits
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
    });
});
