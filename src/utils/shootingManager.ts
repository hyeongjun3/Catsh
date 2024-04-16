import DeviceManager from "./deviceManager";

export default class ShootingManager {
  private m_videoEl: HTMLVideoElement;
  private m_deviceManager: DeviceManager;

  constructor() {
    this.m_deviceManager = new DeviceManager();
  }

  public setUp(videoEl: HTMLVideoElement) {
    this.m_videoEl = videoEl;
  }

  public async shooting() {
    const stream = await this.m_deviceManager.getMediaStream();
    this.m_videoEl.onloadedmetadata = () => {
      this.m_videoEl.play();
    };
    this.m_videoEl.srcObject = stream;
  }

  public pause() {
    this.m_videoEl.pause();
    this.m_deviceManager.pause();
  }
}
