import { isLocalDesktop } from "@Utils/envExtension";
import uaParserManager from "@Utils/uaParserManager";

type FacingModeType = "user" | "environment" | "left" | "right";

// HJ TODO: class로 변환
const CONSOLE_PREFIX = "[Device Manager]";

export default class DeviceManager {
  private m_stream: MediaStream | undefined;
  private m_videoConstraint: MediaTrackConstraints;
  private m_facingMode: FacingModeType;
  private m_ratio: number;

  constructor() {
    this.m_facingMode = "user";
    this.m_videoConstraint = {
      frameRate: 30,
    };
    this.m_ratio = 9 / 16;
  }

  public async getMediaStream() {
    await this.pause();

    this.m_stream = await navigator.mediaDevices.getUserMedia({
      video: this.getVideoConstraint(),
    });

    return this.m_stream;
  }

  public async pause() {
    if (this.m_stream) {
      this.m_stream.getTracks().forEach((track) => track.stop());
    }
  }

  // you should call getMediaStream() after calling flipCamera()
  public flipCamera() {
    this.m_facingMode = this.m_facingMode === "user" ? "environment" : "user";
  }

  private getVideoConstraint() {
    const deviceType = uaParserManager.getDeviceType();
    if (deviceType === "mobile" && !isLocalDesktop()) {
      this.m_videoConstraint.facingMode = { exact: this.m_facingMode };
      this.m_videoConstraint.aspectRatio = { exact: 1 / this.m_ratio };
    } else {
      this.m_videoConstraint.aspectRatio = { exact: this.m_ratio };
    }
    console.debug(CONSOLE_PREFIX, `mobile type : ${deviceType}`);
    console.debug(CONSOLE_PREFIX, this.m_videoConstraint);

    return this.m_videoConstraint;
  }
}
