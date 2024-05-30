import { ClientChannel, geckos, RawMessage } from '@geckos.io/client';

import type { EncoderConfig } from './types.js';

export default class StreamingClient {
  private channel!: ClientChannel;

  constructor(private authKey: string, private serverUrl: string) {
    this.channel = geckos({
      url: this.serverUrl,
      authorization: this.authKey,
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    });
  }

  async start(encoderConfig: EncoderConfig) {
    this.channel.emit('stream.start', encoderConfig);
  }

  async send(data: RawMessage) {
    this.channel.raw.emit(data);
  }

  async stop() {
    this.channel.emit('stream.stop');
  }
}
