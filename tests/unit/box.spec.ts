import DateBox from "../../src/components/DateBox"

describe("date box",  () => {
  it("success creates", () => {
    const date = new Date("11.03.2021")
    const box = new DateBox(date)

    expect(box.value).toEqual(date)
  })

  it("renders", () => {
    const box = new DateBox(new Date())

    expect(box.rendered).toBeNull()

    box.render()

    expect(box.rendered).not.toBeNull()
  })

  it("formats dates", () => {
    const formatted = "3.11.2021"
    const date = new Date(formatted)

    expect(DateBox.formatDate(date)).toEqual(formatted)
  })
})
