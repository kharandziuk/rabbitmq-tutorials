require('amqplib').connect('amqp://localhost').then(async(connection) => {
  const channel = await connection.createChannel()
  const exchange = 'logs'

  channel.assertExchange(exchange, 'fanout', {
      durable: false
  });
  const queue = await channel.assertQueue('', {
    exclusive: true
  })
  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue.queue);
  channel.bindQueue(queue.queue, exchange, '');
  channel.consume(queue.queue, function(msg) {
    if(msg.content) {
      console.log(" [x] %s", msg.content.toString());
    }
  }, {
    noAck: true
  });
})
