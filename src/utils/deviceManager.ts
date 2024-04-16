export default class DeviceManager {
  private m_stream: MediaStream | undefined;

  constructor() {}

  public async getMediaStream() {
    if (!this.m_stream) {
      this.m_stream = await navigator.mediaDevices.getUserMedia({
        video: { frameRate: 30, aspectRatio: 9 / 16 },
      });
    }

    return this.m_stream;
  }

  public async pause() {
    if (this.m_stream) {
      this.m_stream.getTracks().forEach((track) => track.stop());
    }
  }
}
