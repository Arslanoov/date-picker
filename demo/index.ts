import "./index.scss"

import DatePicker from "../src/components/DatePicker"

const picker: DatePicker = new DatePicker({
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

picker.mount("#app")
