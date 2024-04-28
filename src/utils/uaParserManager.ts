import { IDevice, UAParser, UAParserInstance } from "ua-parser-js";

type DeviceType =
  | "mobile"
  | "tablet"
  | "smarttv"
  | "console"
  | "wearable"
  | "embedded";

const CONSOLE_PREFIX = "[UAParerManager]";

class UaParserManager {
  private static m_instance: UaParserManager;
  private m_parser: UAParserInstance;
  private m_device: IDevice | undefined;

  public static getInstance() {
    if (!this.m_instance) this.m_instance = new this();

    return this.m_instance;
  }

  constructor() {
    this.m_parser = new UAParser();
  }

  public getDeviceType() {
    return this.getDeivce().type as DeviceType;
  }

  private getDeivce() {
    if (!this.m_device) {
      this.m_device = this.m_parser.getDevice();
      console.debug(CONSOLE_PREFIX, "getDevice", this.m_device);
    }

    return this.m_device;
  }
}

const uaParserManager = UaParserManager.getInstance();
export default uaParserManager;
