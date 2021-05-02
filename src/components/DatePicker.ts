import { DatePickerConfig } from "../types"

class DatePicker {
  private readonly config: DatePickerConfig
  private readonly days: string[]
  private readonly months: string[]
  private readonly rendered: HTMLElement

  public constructor(config: DatePickerConfig, days: string[], months: string[]) {
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
  }

  public mount(selector: string): void {
    const element: HTMLElement | null = document.querySelector(selector)
    if (element) {
      element.appendChild(this.rendered)
    }
  }

  public get currentDay(): Date {
    return this.config.currentDay
  }
}

export default DatePicker
