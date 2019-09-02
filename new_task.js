require('amqplib').connect('amqp://localhost').then(async(connection) => {
  const channel = await connection.createChannel()
  const queue = 'task_queue';
  const msg = process.argv.slice(2).join(' ') || "Hello World!";

  channel.assertQueue(queue, {
      durable: true
  });
  channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true
  });
  console.log(" [x] Sent '%s'", msg);
  setTimeout(function() {
        connection.close();
        process.exit(0)
  }, 500);
})

