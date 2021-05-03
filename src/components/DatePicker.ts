import { addStyles } from "../helpers/styles"

import { DatePickerConfig } from "../types"

import DateBox from "./DateBox"
import WeekDayBox from "./WeekDayBox"

class DatePicker {
  private readonly config: DatePickerConfig
  private readonly days: string[]
  private readonly months: string[]
  private readonly rendered: HTMLElement
  private wrapper: string | null

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
      wrapper.addEventListener("mouseleave", () => {
        this.close()
        input.blur()
      })
      input.addEventListener("focus", () => this.open())
      this.wrapper = wrapperSelector
    }
  }

  public prevMonth(): void {
    this.changeMonth(this.currentDay.getMonth() - 1)
  }

  public nextMonth(): void {
    this.changeMonth(this.currentDay.getMonth() + 1)
  }

  public today(): void {
    this.config.currentDay = new Date()
    this.rerender()
  }

  public changeMonth(newMonth: number): void {
    this.currentDay.setMonth(newMonth)
    this.rerender()
  }

  public rerender(): void {
    this.rerenderHeader()
    this.rerenderBoxes()
    this.rerenderFooter()
  }

  private init(): void {
    this.rendered.classList.add("a-date-picker")
    this.rendered.classList.add("a-date-picker_closed")
    this.rendered.classList.remove("a-date-picker_not-opened")
    addStyles(this.rendered, {
      ...this.config.picker?.styles,
      top: this.config.picker.inputHeight
    })
    this.rerender()
  }

  // Header

  private renderHeader(): void {
    const header = document.createElement("div")
    const date = document.createElement("div")
    date.innerText = `${this.months[this.currentDay.getMonth()]} ${this.currentDay.getFullYear()}`

    header.classList.add("a-date-picker__header")
    header.appendChild(this.renderLeftArrow())
    header.appendChild(date)
    header.appendChild(this.renderRightArrow())

    addStyles(header, this.config.header?.styles)

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

  // Arrows

  private renderLeftArrow(): HTMLElement {
    const arrow = this.renderArrow()
    arrow.classList.add("a-date-picker__arrow_left")
    arrow.innerText = this.config.arrows?.leftArrowContent || "<---"
    arrow.addEventListener("click", () => this.prevMonth())
    return arrow
  }

  private renderRightArrow(): HTMLElement {
    const arrow = this.renderArrow()
    arrow.classList.add("a-date-picker__arrow_right")
    arrow.innerText = this.config.arrows?.rightArrowContent || "--->"
    arrow.addEventListener("click", () => this.nextMonth())
    return arrow
  }

  private renderArrow(): HTMLElement {
    const arrow = document.createElement("div")
    arrow.classList.add("a-date-picker__arrow")
    addStyles(arrow, this.config.arrows?.styles)
    return arrow
  }

  // Footer
  private renderFooter(): void {
    const footer = document.createElement("div")
    footer.classList.add("a-date-picker__footer")
    addStyles(footer, this.config.footer?.styles)

    if (this.config.todayButton.enabled) {
      const todayButton = document.createElement("button")
      todayButton.classList.add("a-date-picker__today-button")
      todayButton.addEventListener("click", () => this.today())
      todayButton.innerText = this.config.todayButton.text || ""

      addStyles(todayButton, this.config.todayButton.styles)

      footer.appendChild(todayButton)
    }

    this.rendered.appendChild(footer)
  }

  private destroyFooter(): void {
    const element = document.querySelector(`${this.wrapper} .a-date-picker__footer`)
    if (element) {
      element.remove()
    }
  }

  private rerenderFooter(): void {
    this.destroyFooter()
    this.renderFooter()
  }

  // Boxes

  private rerenderBoxes(): void {
    this.destroyBoxes()
    this.renderBoxes()
  }

  private destroyBoxes(): void {
    const content = document.querySelector(`${this.wrapper} .a-date-picker__content`)
    if (content) {
      content.remove()
    }
  }

  private renderBoxes(): void {
    const wrapper = document.createElement("div")
    wrapper.classList.add("a-date-picker__content")
    addStyles(wrapper, this.config.content?.styles)

    for (let i = 0; i < this.days.length; i++) {
      const box = new WeekDayBox(this.days[i])
      wrapper.appendChild(box.render(this.config.weekdayBox?.styles))
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

      const rendered = box.render(this.config.dateBox?.styles, this.config.dateBox?.todayStyles)
      if (k === 0) {
        rendered.classList.add(`a-date-picker__date_${firstDate.getDay() + 1}`)
      }

      rendered.addEventListener("click", () => this.config.onChange(box.value))

      wrapper.appendChild(rendered)
    }

    this.rendered.appendChild(wrapper)
  }
}

export default DatePicker
