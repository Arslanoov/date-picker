import DatePicker from "../../src/components/DatePicker"

const correctDays: string[] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
const correctMonths: string[] = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
]

describe("date picker",  () => {
  it("success create", () => {
    const currentDay = new Date()
    const picker: DatePicker = new DatePicker({
      currentDay
    }, correctDays, correctMonths)

    expect(picker.currentDay).toEqual(currentDay)
  })

  it("fails to create picker: invalid days count",  () => {
    const create = () => new DatePicker({
      currentDay: new Date()
    }, ["Пн", "Вт", "Ср"], correctMonths)

    expect(create).toThrow(TypeError)
  })

  it("fails to create picker: invalid months count",  () => {
    const create = () => new DatePicker({
      currentDay: new Date()
    }, correctDays, ["Январь"])

    expect(create).toThrow(TypeError)
  })
})
