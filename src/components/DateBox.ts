class DateBox {
  private date: Date
  private element: HTMLElement | null

  constructor(date: Date) {
    this.date = date
    this.element = null
  }

  public render(): HTMLElement {
    const box = document.createElement("div")
    box.classList.add("a-date-picker__date")
    box.innerText = String(this.date.getDate())
    this.element = box
    return box
  }

  public get value(): Date {
    return this.date
  }

  public get rendered(): HTMLElement | null {
    return this.element
  }
}

export default DateBox
