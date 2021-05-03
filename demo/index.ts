import "./index.scss"

import DatePicker from "../src"

const picker: DatePicker = new DatePicker(document.querySelector("#input") as HTMLElement, {
  currentDay: new Date()
}, ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"], [
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
])

picker.mount("#input", "#picker")
