require('amqplib').connect('amqp://localhost').then(async(connection) => {
  const channel = await connection.createChannel()
  const queue = 'hello'
  const msg = 'Hello world';
  channel.assertQueue(queue, { durable: false })
  channel.sendToQueue(queue, Buffer.from(msg));
  console.log(" [x] Sent %s", msg);
  setTimeout(function() {
        connection.close();
        process.exit(0)
  }, 500);
})

