import { Data, geckos, GeckosServer, RawMessage, ServerChannel } from '@geckos.io/server';

import type { EncoderConfig } from './types.js';

export default class StreamingServer {
  private io!: GeckosServer;

  constructor(private authKey: string, private serverPort: number = 2030) {
    // Validate the parameters
    this.validateParams();
    // Start the server
    this.startServer();

    console.log('Streaming server started');
  }

  /**
   * Validate the parameters
   */
  private validateParams() {
    if (!this.authKey) throw new Error('AUTH_KEY is required');
    if (!this.serverPort) throw new Error('SERVER_PORT is required');
  }

  /**
   * Start the server
   */
  private startServer() {
    // Create a new geckos.io server
    this.io = geckos({
      label: 'casto-streaming-server',
      multiplex: true,
      authorization: this.authorize.bind(this),
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
      cors: {
        origin: '*',
      },
    });

    // Listen for new connections
    this.io.onConnection((channel) => {
      this.socketConnected(channel);

      channel.on('stream.start', this.streamStart.bind(this));
      channel.on('stream.stop', this.streamStop.bind(this));
      channel.onRaw(this.rawMessage.bind(this));
      channel.onDisconnect(this.socketDisconnected.bind(this));
    });

    // Start the server
    this.io.listen(this.serverPort);
  }

  /**
   * Authorize the socket connection
   * @param channel
   */
  async authorize(payload: string | undefined) {
    console.log('Authorize', payload);

    // Parse the payload
    const authKey = payload as string;

    // Check if the auth key is valid
    if (authKey !== this.authKey) return false;
    return true;
  }

  /**
   * Handle socket connection
   * @param channel
   */
  socketConnected(channel: ServerChannel) {
    console.log('Socket connected', channel);
  }

  /**
   * Handle socket disconnection
   */
  socketDisconnected() {
    console.log('Socket disconnected');
  }

  /**
   * Handle stream start
   * @param payload
   */
  streamStart(payload: Data) {
    const encoderConfig = payload as EncoderConfig;
    console.log('Stream started', encoderConfig);
  }

  /**
   * Handle stream stop
   */
  streamStop() {
    console.log('Stream stopped');
  }

  /**
   * Handle raw message
   * @param payload
   */
  rawMessage(payload: RawMessage) {
    console.log('Raw message received', payload);
  }
}
