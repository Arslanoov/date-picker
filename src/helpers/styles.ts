import * as CSS from "csstype"

export const addStyles = (element: HTMLElement, styles: CSS.Properties = {}): void => {
  if (element) {
    // TODO: Remove try catch
    try {
      Object.assign(element.style, styles)
    } catch (e) { }
  }
}
