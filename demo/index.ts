import "./index.scss"

import DatePicker from "../src"

const days: string[] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
const months: string[] = [
  "Январь", "Февраль", "Март",
  "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь",
  "Октябрь", "Ноябрь", "Декабрь"
]

const picker: DatePicker = new DatePicker( {
  currentDay: new Date(),
  onChange: (date: Date) => console.log(`Date: ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`),
  picker: {
    inputHeight: "25px"
  },
  header: {
    styles: {
      padding: "10px 0"
    }
  },
  content: {
    styles: {
      columnGap: "3px",
      rowGap: "3px",
      padding: "5px",
      border: "1px solid #2630eb"
    }
  },
  arrows: {
    styles: {
      fontSize: "23px",
      letterSpacing: "-2px"
    }
  },
  dateBox: {
    styles: {
      backgroundColor: "rgba(#eaeaea, .4)",
      border: "1px solid #9526eb"
    },
    todayStyles: {
      backgroundColor: "rgba(194, 137, 213, 0.58)",
      border: "1px solid #6d10b4"
    }
  },
  footer: {
    styles: {
      padding: "10px 0"
    }
  },
  todayButton: {
    enabled: true,
    text: "Сегодня",
    styles: {
      padding: "5px 15px",
      border: "1px solid #6d10b4",
      background: "transparent"
    }
  }
}, days, months)

picker.mount("#input", "#picker")
