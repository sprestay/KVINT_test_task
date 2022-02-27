const m = require('./mongo');
var amqp = require('amqplib/callback_api');


amqp.connect('amqp://rabbitmq', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'tasks';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.consume(queue, function(msg) {
            m.saveToDB(msg.content.toString());
        }, {
            noAck: true
        });
        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 500);
    });
});