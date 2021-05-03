import * as CSS from "csstype"

import { addStyles } from "../helpers/styles"

class WeekDayBox {
  private readonly weekDay: string
  private element: HTMLElement | null

  constructor(weekDay: string) {
    this.weekDay = weekDay
    this.element = null
  }

  public render(styles: CSS.Properties = {}): HTMLElement {
    const box = document.createElement("div")
    box.classList.add("a-date-picker__weekday")
    box.innerText = this.weekDay
    addStyles(box, styles)
    this.element = box
    return box
  }

  public get value(): string {
    return this.weekDay
  }

  public get rendered(): HTMLElement | null {
    return this.element
  }
}

export default WeekDayBox
