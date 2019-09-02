const args = process.argv.slice(2);

if (args.length == 0) {
    console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
    process.exit(1);
}
require('amqplib').connect('amqp://localhost').then(async(connection) => {
  const channel = await connection.createChannel()
  const exchange = 'direct_logs';

  channel.assertExchange(exchange, 'direct_logs', {
      durable: false
  });
  const queue = await channel.assertQueue('', {
    exclusive: true
  })
  console.log(' [*] Waiting for logs. To exit press CTRL+C');
  channel.bindQueue(queue.queue, exchange, '');
  args.forEach(function(severity) {
    channel.bindQueue(q.queue, exchange, severity);
  });
  channel.consume(q.queue, function(msg) {
    console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
  }, {
    noAck: true
  });
})
