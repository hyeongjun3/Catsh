import { ERROR_MESSAGES } from "@Constant/errorMessages";
import DeviceManager from "./deviceManager";
import { createVideoElement, loadMedia } from "@Utils/mediaExtension";

interface CanvasConfigure {
  width: number;
  height: number;
}

const CONSOLE_PREFIX = "[ShootingManager]";
export default class ShootingManager {
  private m_debugMode: boolean;

  private m_videoEl: HTMLVideoElement;
  private m_recordVideoEl: HTMLVideoElement;

  private m_deviceManager: DeviceManager;
  private m_canvasConfigure: CanvasConfigure;
  private m_animationFrameId: number;
  private m_drawCallbacks: (() => void)[];

  // initialize after setUp
  private m_canvasEl!: HTMLCanvasElement;
  private m_context!: CanvasRenderingContext2D;
  private m_mediaRecorder!: MediaRecorder;
  private m_videoName!: string;

  constructor() {
    this.m_deviceManager = new DeviceManager();
    this.m_canvasConfigure = { width: 1080, height: 1920 };
    this.m_videoEl = createVideoElement();
    this.m_recordVideoEl = createVideoElement();

    this.setCanvasConfigure(this.m_videoEl);

    this.m_animationFrameId = 0;
    this.m_drawCallbacks = [];

    this.m_debugMode = true;

    if (this.m_debugMode) {
      document.body.appendChild(this.m_videoEl);
      document.body.appendChild(this.m_recordVideoEl);
      this.m_recordVideoEl.controls = true;
    }
  }

  public setUp(
    canvasEl: HTMLCanvasElement,
    recordVideoSrc: string,
    name: string
  ) {
    console.debug(CONSOLE_PREFIX, "setup");
    // HJ TODO: cleanup이 맞을까?
    this.setUpCanvas(canvasEl);
    this.setUpVideo(recordVideoSrc);
    this.m_videoName = name;
  }

  public cleanUp() {}

  public async turnOnCam() {
    this.m_drawCallbacks = [];
    const stream = await this.m_deviceManager.getMediaStream();

    await loadMedia(this.m_videoEl, stream);
    this.m_videoEl.play();

    this.m_context.drawImage(this.m_videoEl, 0, 0);

    this.m_drawCallbacks.push(this.drawCam.bind(this));
    this.draw();
  }

  public async flipCamera() {
    await this.pause();
    this.m_deviceManager.flipCamera();
    return this.turnOnCam();
  }

  public async pause() {
    this.m_videoEl.pause();
    await this.m_deviceManager.pause();
    cancelAnimationFrame(this.m_animationFrameId);
  }

  // related to shooting
  public async shooting() {
    await this.m_recordVideoEl.play();
    this.m_drawCallbacks.push(this.drawRecordVideo.bind(this));
  }

  // related to recording
  public recording(onEnd: (blob: Blob) => void) {
    this.setUpRecorder(onEnd);
    this.m_mediaRecorder.start(500);
  }

  private draw() {
    const _draw = () => {
      this.m_drawCallbacks.forEach((cb) => cb());
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

  private setUpCanvas(canvasEl: HTMLCanvasElement) {
    this.m_canvasEl = canvasEl;
    this.setCanvasConfigure(this.m_canvasEl);
    const ctx = this.m_canvasEl.getContext("2d");
    if (!ctx) throw new Error(ERROR_MESSAGES.INVALID_PARAMETER);
    this.m_context = ctx;
    this.mirrorCanvas();
  }

  private async setUpVideo(src: string) {
    await this.setUpMedia(this.m_recordVideoEl, src);
  }

  private async setUpMedia(
    mediaEl: HTMLVideoElement | HTMLAudioElement,
    src: string
  ) {
    await loadMedia(mediaEl, src);

    const text = mediaEl instanceof HTMLVideoElement ? "video" : "audio";

    mediaEl.onerror = (e) => {
      console.debug(CONSOLE_PREFIX, `record ${text} error`, e);
    };

    mediaEl.onended = () => {
      console.debug(CONSOLE_PREFIX, `record ${text} end`);
      this.m_mediaRecorder.stop();
    };

    mediaEl.onplay = () => {
      console.debug(CONSOLE_PREFIX, `record ${text} play`);
    };
  }

  // the user interaction should be need to use audio context
  private setUpRecorder(onEnd: (blob: Blob) => void) {
    const mimeType = "video/webm";

    const videoTrack = this.m_canvasEl.captureStream().getVideoTracks()[0];

    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(this.m_recordVideoEl);
    const gainNode = audioCtx.createGain();
    const destination = audioCtx.createMediaStreamDestination();
    gainNode.gain.value = 1;
    source.connect(gainNode);
    // multiple output -> sound + recorder
    gainNode.connect(audioCtx.destination);
    gainNode.connect(destination);

    const audioTrack = destination.stream.getAudioTracks()[0];

    const stream = new MediaStream([videoTrack, audioTrack]);

    this.m_mediaRecorder = new MediaRecorder(stream, { mimeType: mimeType });

    const chunks: Blob[] = [];
    this.m_mediaRecorder.ondataavailable = (e) => {
      console.debug(CONSOLE_PREFIX, "recorder ondataavaialbe", e.data);
      chunks.push(e.data);
    };
    this.m_mediaRecorder.onstop = () => {
      console.debug(CONSOLE_PREFIX, "recorder onstop");
      const blob = new Blob(chunks, {
        type: mimeType,
      });
      onEnd(blob);
    };
    this.m_mediaRecorder.onerror = (e) => {
      console.debug(CONSOLE_PREFIX, "recorder error", e);
    };
    this.m_mediaRecorder.onpause = () => {
      console.debug(CONSOLE_PREFIX, "recorder pause");
    };
    this.m_mediaRecorder.onresume = () => {
      console.debug(CONSOLE_PREFIX, "recorder resume");
    };
    this.m_mediaRecorder.onstart = () => {
      console.debug(CONSOLE_PREFIX, "recorder start");
    };
  }

  private drawCam() {
    const { width, height } = this.m_canvasConfigure;
    this.m_context.drawImage(this.m_videoEl, 0, 0, width, height);
  }

  private drawRecordVideo() {
    const { width, height } = this.m_canvasConfigure;
    this.m_context.drawImage(this.m_recordVideoEl, 0, 0, width, height);
  }
}
