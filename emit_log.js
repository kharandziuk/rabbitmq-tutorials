const faker = require('faker');

require('amqplib').connect('amqp://localhost').then(async(connection) => {
  const channel = await connection.createChannel()
  const exchange = 'logs'
  const msg = faker.name.firstName()

  channel.assertExchange(exchange, 'fanout', {
      durable: false
  });
  channel.assertExchange('logs', 'fanout', {durable: false})
  channel.publish(exchange, '', Buffer.from(msg));
  console.log(" [x] Sent '%s'", msg);
  setTimeout(function() {
        connection.close();
        process.exit(0)
  }, 500);
})

