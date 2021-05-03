import * as CSS from "csstype"

export interface DatePickerConfig {
  currentDay: Date,
  picker: {
    styles?: CSS.Properties,
    inputHeight: string
  },
  header?: {
    styles?: CSS.Properties,
    arrowStyles?: CSS.Properties
  },
  content?: {
    styles?: CSS.Properties
  },
  arrows?: {
    // TODO: HTMLElement | string
    leftArrowContent?: string,
    rightArrowContent?:  string,
    styles: CSS.Properties
  },
  dateBox?: {
    styles?: CSS.Properties,
    todayStyles?: CSS.Properties,
  },
  weekdayBox?: {
    styles?: CSS.Properties,
  },
  footer?: {
    styles?: CSS.Properties
  },
  todayButton: {
    styles?: CSS.Properties,
    enabled: boolean,
    text?: string
  }
}
