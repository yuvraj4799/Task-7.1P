const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');

const lightName = 'Light1'; // Replace with the actual name of the light
const topicBuilding = `/${lightName}/Building`;
const topicFloor = `/${lightName}/Floor`;
const topicRoom = `/${lightName}/Room`;
const topicStatus = `/${lightName}/Status`;

// Simulated data for Light 1
const building = 'Building A'; // Replace with actual building name
const floor = 'Floor 1'; // Replace with actual floor name
const room = 'Room 101'; // Replace with actual room name
let status = 'ON';

client.on('connect', () => {
    console.log('MQTT connected for Light 1');
    setInterval(() => {
        // Publish data to respective topics
        client.publish(topicBuilding, building);
        client.publish(topicFloor, floor);
        client.publish(topicRoom, room);
        client.publish(topicStatus, status);
    }, 5000); // Publish data every 5 seconds
});