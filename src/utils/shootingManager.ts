import { ERROR_MESSAGES } from "@Constant/errorMessages";
import DeviceManager from "./deviceManager";

interface CanvasConfigure {
  width: number;
  height: number;
}
export default class ShootingManager {
  private m_videoEl: HTMLVideoElement;
  private m_deviceManager: DeviceManager;
  private m_canvasConfigure: CanvasConfigure;
  private m_animationFrameId: number;
  private m_debugMode: boolean;

  private m_canvasEl!: HTMLCanvasElement;
  private m_context!: CanvasRenderingContext2D;

  constructor() {
    this.m_deviceManager = new DeviceManager();
    this.m_canvasConfigure = { width: 1080, height: 1920 };
    this.m_videoEl = document.createElement("video");
    this.setCanvasConfigure(this.m_videoEl);

    this.m_animationFrameId = 0;

    this.m_debugMode = false;
  }

  public setUp(canvasEl: HTMLCanvasElement) {
    this.m_canvasEl = canvasEl;
    this.setCanvasConfigure(this.m_canvasEl);
    const ctx = this.m_canvasEl.getContext("2d");
    if (!ctx) throw new Error(ERROR_MESSAGES.INVALID_PARAMETER);
    this.m_context = ctx;
    this.mirrorCanvas();
  }

  public async shooting() {
    const stream = await this.m_deviceManager.getMediaStream();

    await new Promise<void>((resolve) => {
      if (this.m_videoEl.readyState > 2) resolve();
      this.m_videoEl.onloadedmetadata = async () => {
        await this.m_videoEl.play();
        resolve();
      };
      this.m_videoEl.srcObject = stream;
    });

    if (this.m_debugMode) {
      document.body.appendChild(this.m_videoEl);
    }

    this.m_context.drawImage(this.m_videoEl, 0, 0);
    this.draw();
  }

  public async flipCamera() {
    await this.pause();
    this.m_deviceManager.flipCamera();
    return this.shooting();
  }

  public async pause() {
    this.m_videoEl.pause();
    await this.m_deviceManager.pause();
    cancelAnimationFrame(this.m_animationFrameId);
  }

  private draw() {
    const _draw = () => {
      const { width, height } = this.m_canvasConfigure;

      this.m_context.drawImage(this.m_videoEl, 0, 0, width, height);
      this.m_animationFrameId = requestAnimationFrame(() => _draw());
    };

    _draw();
  }

  private mirrorCanvas() {
    const { width } = this.m_canvasConfigure;
    this.m_context.translate(width, 0);
    this.m_context.scale(-1, 1);
  }

  private setCanvasConfigure(mediaEl: HTMLVideoElement | HTMLCanvasElement) {
    mediaEl.width = this.m_canvasConfigure.width;
    mediaEl.height = this.m_canvasConfigure.height;
  }
}
