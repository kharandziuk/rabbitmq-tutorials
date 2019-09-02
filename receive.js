require('amqplib').connect('amqp://localhost').then(async(connection) => {
  const channel = await connection.createChannel()
  const queue = 'hello'
  const msg = 'Hello world';
  channel.assertQueue(queue, { durable: false })
  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
  await channel.consume(queue, function(msg) {
    console.log(" [x] Received %s", msg.content.toString());
  }, {
    noAck: true
  });
})

