import { Channel, connect, Connection } from "amqplib";

class RabbitmqServer {
  private conn: Connection;
  private channel: Channel;

  constructor(private uri: string) {}

  async start() {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publishExchange(exchange: string, routingKey: string, message: string) {
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }
}
