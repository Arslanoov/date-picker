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
    const picker: DatePicker = new DatePicker(
      document.createElement("input"), {
      currentDay,
      onChange: () => {},
      picker: {
        inputHeight: "25px"
      },
      todayButton: {
        enabled: false
      }
    }, correctDays, correctMonths)

    expect(picker.currentDay).toEqual(currentDay)
  })

  it("fails to create picker: invalid days count",  () => {
    const create = () => new DatePicker(document.createElement("input"),{
      currentDay: new Date(),
      onChange: () => {},
      picker: {
        inputHeight: "25px"
      },
      todayButton: {
        enabled: false
      }
    }, ["Пн", "Вт", "Ср"], correctMonths)

    expect(create).toThrow(TypeError)
  })

  it("fails to create picker: invalid months count",  () => {
    const create = () => new DatePicker(document.createElement("input"),{
      currentDay: new Date(),
      onChange: () => {},
      picker: {
        inputHeight: "25px"
      },
      todayButton: {
        enabled: false
      }
    }, correctDays, ["Январь"])

    expect(create).toThrow(TypeError)
  })

  it("changes months, picks today date", () => {
    const currentDay = new Date("05.03.2021")
    const picker: DatePicker = new DatePicker(
      document.createElement("input"), {
        currentDay,
        onChange: () => {},
        picker: {
          inputHeight: "25px"
        },
        todayButton: {
          enabled: false
        }
      }, correctDays, correctMonths)

    expect(picker.currentDay.getMonth()).toEqual(4)

    picker.prevMonth()

    expect(picker.currentDay.getMonth()).toEqual(3)

    picker.nextMonth()

    expect(picker.currentDay.getMonth()).toEqual(4)

    picker.nextMonth()

    expect(picker.currentDay.getMonth()).toEqual(5)

    picker.today()

    expect(picker.currentDay.getMonth()).toEqual((new Date()).getMonth())
  })
})
