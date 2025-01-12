import Guides from "@scena/guides";

class Guide {
  private static m_instance: Guide;

  public static getInstance() {
    if (!this.m_instance) {
      this.m_instance = new Guide();
    }

    return this.m_instance;
  }

  constructor() {}

  private renderHorizon() {
    const containerEl = document.createElement("div");
    containerEl.classList.add("ruler", "ruler-horizon");
    document.body.appendChild(containerEl);

    const horizonGuide = new Guides(containerEl, {
      type: "horizontal",
    });

    let scrollX = 0;
    let scrollY = 0;
    window.addEventListener("resize", () => {
      horizonGuide.resize();
    });

    window.addEventListener("wheel", (e) => {
      scrollX += e.deltaX;
      scrollY += e.deltaY;

      horizonGuide.scrollGuides(scrollY);
      horizonGuide.scroll(scrollX);
    });

    let info: DragInfoToolTip;

    horizonGuide.on("dragStart", (e) => {
      info = new DragInfoToolTip();
      info.move(e.clientX, e.clientY, "horizon");
    });

    horizonGuide.on("drag", (e) => {
      info.move(e.clientX, e.clientY, "horizon");
    });

    horizonGuide.on("dragEnd", (e) => {
      info.destroy();
    });
  }

  private renderVertical() {
    const containerEl = document.createElement("div");
    containerEl.classList.add("ruler", "ruler-vertical");
    document.body.appendChild(containerEl);

    const verticalGuide = new Guides(containerEl, {
      type: "vertical",
    });

    let scrollX = 0;
    let scrollY = 0;
    window.addEventListener("resize", () => {
      verticalGuide.resize();
    });

    window.addEventListener("wheel", (e) => {
      scrollX += e.deltaX;
      scrollY += e.deltaY;

      verticalGuide.scrollGuides(scrollY);
      verticalGuide.scroll(scrollX);
    });

    let info: DragInfoToolTip;

    verticalGuide.on("dragStart", (e) => {
      info = new DragInfoToolTip();
      info.move(e.clientX, e.clientY, "vertical");
    });

    verticalGuide.on("drag", (e) => {
      info.move(e.clientX, e.clientY, "vertical");
    });

    verticalGuide.on("dragEnd", (e) => {
      info.destroy();
    });
  }

  render() {
    this.renderHorizon();
    this.renderVertical();
  }
}

export class DragInfoToolTip {
  constructor(public infoEl = document.createElement("div")) {
    this.initStyle();
    document.body.appendChild(this.infoEl);
  }

  private initStyle() {
    this.infoEl.style.position = "absolute";
    this.infoEl.style.top = "0px";
    this.infoEl.style.left = "left";
    this.infoEl.style.zIndex = "9999";
    this.infoEl.style.color = "white";
  }

  public move(x: number, y: number, direction: "horizon" | "vertical") {
    this.infoEl.style.transform = `translate(${x}px, ${y}px)`;
    const text = direction === "horizon" ? `${y}px` : `${x}px`;
    this.infoEl.textContent = text;
  }

  public destroy() {
    document.body.removeChild(this.infoEl);
    this.infoEl.remove();
  }
}

export const guides = Guide.getInstance();
