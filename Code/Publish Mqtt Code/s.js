const mqtt = require('mqtt');
const brokerUrl = 'mqtt://broker.hivemq.com:1883';

// Define the topics for lights
const topicLight = '/Light2/+';
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
    console.log(`MQTT connected for ${topicLight}`);
    client.subscribe(topicLight);
});

client.on('message', (receivedTopic, message) => {
    console.log(`Received message from topic: ${receivedTopic}`);

    const topicParts = receivedTopic.split('/');
    const lightName = topicParts[1];

    // Handle different message types based on the topic using if-else conditions
    if (receivedTopic.endsWith('/Building')) {
        console.log(`Building for ${lightName}: ${message.toString()}`);
    } else if (receivedTopic.endsWith('/Floor')) {
        console.log(`Floor for ${lightName}: ${message.toString()}`);
    } else if (receivedTopic.endsWith('/Room')) {
        console.log(`Room for ${lightName}: ${message.toString()}`);
    } else if (receivedTopic.endsWith('/Status')) {
        console.log(`Status for ${lightName}: ${message.toString()}`);
    } else {
        console.log(`Message is: ${message.toString()}`);
    }
    console.log('');
});