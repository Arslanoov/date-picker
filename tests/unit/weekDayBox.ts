import WeekDayBox from "../../src/components/WeekDayBox"

describe("week day box",  () => {
  it("success creates", () => {
    const value = "Mo"
    const box = new WeekDayBox(value)

    expect(box.value).toEqual(value)
  })

  it("renders", () => {
    const box = new WeekDayBox("Th")

    expect(box.rendered).toBeNull()

    box.render()

    expect(box.rendered).not.toBeNull()
  })
})
