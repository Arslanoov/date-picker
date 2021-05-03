import { DatePickerConfig } from "../types"

import DateBox from "./DateBox"
import WeekDayBox from "./WeekDayBox";

class DatePicker {
  private readonly input: HTMLElement
  private readonly config: DatePickerConfig
  private readonly days: string[]
  private readonly months: string[]
  private readonly rendered: HTMLElement

  public constructor(input: HTMLElement, config: DatePickerConfig, days: string[], months: string[]) {
    this.input = input
    this.config = config
    if (days.length !== 7) {
      throw new TypeError("Days count should be 7")
    }
    this.days = days
    if (months.length !== 12) {
      throw new TypeError("Months count should be 12")
    }
    this.months = months
    this.rendered = document.createElement("div")
    this.init()
  }

  public init(): void {
    this.rendered.classList.add("a-date-picker")
    this.rendered.classList.add("a-date-picker_closed")
    this.renderBoxes()
  }

  public open(): void {
    this.rendered.classList.remove("a-date-picker_not-opened")
    this.rendered.classList.remove("a-date-picker_closed")
    this.rendered.classList.add("a-date-picker_opened")
  }

  public close(): void {
    this.rendered.classList.remove("a-date-picker_not-opened")
    this.rendered.classList.remove("a-date-picker_opened")
    this.rendered.classList.add("a-date-picker_closed")
  }

  public renderBoxes(): void {
    const wrapper = document.createElement("div")
    wrapper.classList.add("a-date-picker__content")

    for (let i = 0; i < this.days.length; i++) {
      const box = new WeekDayBox(this.days[i])
      wrapper.appendChild(box.render())
    }

    const daysCount = (new Date(
      this.config.currentDay.getFullYear(),
      this.config.currentDay.getMonth(),
      0
    )).getDate()
    for (let k = 0; k < daysCount + 1; k++) {
      const box = new DateBox(new Date(
        this.config.currentDay.getFullYear(),
        this.config.currentDay.getMonth(),
        k === 0 ? daysCount : k
      ))

      wrapper.appendChild(box.render())
    }

    this.rendered.appendChild(wrapper)
  }

  public mount(selector: string, wrapperSelector: string): void {
    const wrapper: HTMLElement | null = document.querySelector(wrapperSelector)
    const input: HTMLInputElement | null = document.querySelector(selector)
    if (wrapper && input) {
      wrapper.appendChild(this.rendered)
      input.addEventListener("focus", () => this.open())
      input.addEventListener("blur", () => this.close())
    }
  }

  public get currentDay(): Date {
    return this.config.currentDay
  }
}

export default DatePicker
