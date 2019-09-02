require('amqplib').connect('amqp://localhost').then(async(connection) => {
  const channel = await connection.createChannel()
  const queue = 'task_queue';
  // This makes sure the queue is declared before attempting to consume from it
  channel.assertQueue(queue, {
    durable: true
  });

  channel.prefetch(1);
  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
  channel.consume(queue, function(msg) {
    const secs = msg.content.toString().split('').length - 1;

    console.log(" [x] Received %s", msg.content.toString());
    setTimeout(function() {
      console.log(" [x] Done");
      channel.ack(msg);
    }, secs * 1000);
  }, {
    // automatic acknowledgment mode,
    // see https://www.rabbitmq.com/confirms.html for details
    noAck: false
  });
})

