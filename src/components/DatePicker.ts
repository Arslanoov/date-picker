import { DatePickerConfig } from "../types"

import DateBox from "./DateBox"
import WeekDayBox from "./WeekDayBox";

class DatePicker {
  private readonly input: HTMLElement
  private readonly config: DatePickerConfig
  private readonly days: string[]
  private readonly months: string[]
  private readonly rendered: HTMLElement
  private renderedBoxes: HTMLElement[]
  private wrapper: string | null

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
    this.renderedBoxes = []
    this.wrapper = null
    this.init()
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

  public get currentDay(): Date {
    return this.config.currentDay
  }

  public mount(selector: string, wrapperSelector: string): void {
    const wrapper: HTMLElement | null = document.querySelector(wrapperSelector)
    const input: HTMLInputElement | null = document.querySelector(selector)
    if (wrapper && input) {
      wrapper.appendChild(this.rendered)
      input.addEventListener("focus", () => this.open())
      wrapper.addEventListener("mouseleave", () => this.close())
      this.wrapper = wrapperSelector
    }
  }

  public prevMonth(): void {
    this.changeMonth(this.currentDay.getMonth() - 1)
  }

  public nextMonth(): void {
    this.changeMonth(this.currentDay.getMonth() + 1)
  }

  public changeMonth(newMonth: number): void {
    this.currentDay.setMonth(newMonth)
    this.rerenderHeader()
    this.rerenderBoxes()
  }

  private init(): void {
    this.rendered.classList.add("a-date-picker")
    this.rendered.classList.add("a-date-picker_closed")
    this.renderHeader()
    this.renderBoxes()
  }

  private renderHeader(): void {
    const header = document.createElement("div")
    const date = document.createElement("div")
    date.innerText = `${this.months[this.currentDay.getMonth()]} ${this.currentDay.getFullYear()}`

    header.classList.add("a-date-picker__header")
    header.appendChild(this.renderLeftArrow())
    header.appendChild(date)
    header.appendChild(this.renderRightArrow())

    this.rendered.appendChild(header)
  }

  private destroyHeader(): void {
    const header = document.querySelector(`${this.wrapper} .a-date-picker__header`)
    if (header) {
      header.remove()
    }
  }

  private rerenderHeader(): void {
    this.destroyHeader()
    this.renderHeader()
  }

  private renderLeftArrow(): HTMLElement {
    const arrow = this.renderArrow()
    arrow.classList.add("a-date-picker__arrow_left")
    arrow.innerText = "<---"
    arrow.addEventListener("click", () => this.prevMonth())
    return arrow
  }

  private renderRightArrow(): HTMLElement {
    const arrow = this.renderArrow()
    arrow.classList.add("a-date-picker__arrow_right")
    arrow.innerText = "--->"
    arrow.addEventListener("click", () => this.nextMonth())
    return arrow
  }

  private renderArrow(): HTMLElement {
    const arrow = document.createElement("div")
    arrow.classList.add("a-date-picker__arrow")
    return arrow
  }

  private rerenderBoxes(): void {
    this.destroyBoxes()
    this.renderBoxes()
  }

  private destroyBoxes(): void {
    const content = document.querySelector(`${this.wrapper} .a-date-picker__content`)
    // TODO: Finish, check is mounted
    if (content) {
      content.remove()
    }
  }

  private renderBoxes(): void {
    const wrapper = document.createElement("div")
    wrapper.classList.add("a-date-picker__content")

    for (let i = 0; i < this.days.length; i++) {
      const box = new WeekDayBox(this.days[i])
      const rendered = box.render()
      this.renderedBoxes.push(rendered)
      wrapper.appendChild(rendered)
    }

    const firstDate = (new Date(
      this.config.currentDay.getFullYear(),
      this.config.currentDay.getMonth(),
      0
    ))

    const daysCount = firstDate.getDate()
    for (let k = 0; k < daysCount + 1; k++) {
      const box = new DateBox(new Date(
        this.config.currentDay.getFullYear(),
        this.config.currentDay.getMonth(),
        k + 1
      ))

      const rendered = box.render()
      if (k === 0) {
        rendered.classList.add(`a-date-picker__date_${firstDate.getDay() + 1}`)
      }

      wrapper.appendChild(rendered)
    }

    this.rendered.appendChild(wrapper)
  }
}

export default DatePicker
