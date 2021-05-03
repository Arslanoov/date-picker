class DateBox {
  private readonly date: Date
  private element: HTMLElement | null

  constructor(date: Date) {
    this.date = date
    this.element = null
  }

  public static formatDate(date: Date): string {
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
  }

  public render(): HTMLElement {
    const box = document.createElement("div")
    box.classList.add("a-date-picker__date")
    // TODO: Today date as parameter
    if (DateBox.formatDate(this.date) === DateBox.formatDate(new Date())) {
      box.classList.add("a-date-picker__date_today")
    }
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
