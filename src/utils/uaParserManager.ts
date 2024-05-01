import { IDevice, IOS, UAParser, UAParserInstance } from "ua-parser-js";

type DeviceType =
  | "mobile"
  | "tablet"
  | "smarttv"
  | "console"
  | "wearable"
  | "embedded";

type OsType =
  | "Android"
  | "AIX"
  | "Amiga OS"
  | "Android[-x86]"
  | "Arch"
  | "Bada"
  | "BeOS"
  | "BlackBerry"
  | "CentOS"
  | "Chromium OS"
  | "Contiki"
  | "Fedora"
  | "Firefox OS"
  | "FreeBSD"
  | "Debian"
  | "Deepin"
  | "DragonFly"
  | "elementary OS"
  | "Fuchsia"
  | "Gentoo"
  | "GhostBSD"
  | "GNU"
  | "Haiku"
  | "HarmonyOS"
  | "HP-UX"
  | "Hurd"
  | "iOS"
  | "Joli"
  | "KaiOS"
  | "Linpus"
  | "Linspire"
  | " Linux"
  | "Mac OS"
  | "Maemo"
  | "Mageia"
  | "Mandriva"
  | "Manjaro"
  | "MeeGo"
  | "Minix"
  | "Mint"
  | "Morph OS"
  | "NetBSD"
  | "NetRange"
  | "NetTV"
  | "Nintendo"
  | "OpenBSD"
  | "OpenVMS"
  | "OS/2"
  | "Palm"
  | "PC-BSD"
  | "PCLinuxOS"
  | "Plan9"
  | "PlayStation"
  | "QNX"
  | "Raspbian"
  | "RedHat"
  | "RIM Tablet OS"
  | "RISC OS"
  | "Sabayon"
  | "Sailfish"
  | "SerenityOS"
  | "Series40"
  | "Slackware"
  | "Solaris"
  | "SUSE"
  | "Symbian"
  | "Tizen"
  | "Ubuntu"
  | "Unix"
  | "VectorLinux"
  | "Viera"
  | "watchOS"
  | "WebOS"
  | "Windows Phone"
  | "Windows Mobile";

const CONSOLE_PREFIX = "[UAParerManager]";

class UaParserManager {
  private static m_instance: UaParserManager;
  private m_parser: UAParserInstance;
  private m_device: IDevice | undefined;
  private m_os: IOS | undefined;

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

  public getOsName() {
    return this.getOs().name as OsType;
  }

  private getOs() {
    if (!this.m_os) {
      this.m_os = this.m_parser.getOS();
    }

    return this.m_os;
  }
}

const uaParserManager = UaParserManager.getInstance();
export default uaParserManager;
