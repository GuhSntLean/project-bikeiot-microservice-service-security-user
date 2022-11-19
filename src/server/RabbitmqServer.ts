import { Channel, Connection } from "amqplib";

class RabbitmqServer {
  private conn: Connection;
  private channel: Channel;

  async publishExchange(exchange: string, routingKey: string, message: string) {
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }
}
