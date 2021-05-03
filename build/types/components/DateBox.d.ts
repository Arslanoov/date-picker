import * as CSS from "csstype";
declare class DateBox {
    private readonly date;
    private element;
    constructor(date: Date);
    static formatDate(date: Date): string;
    render(styles?: CSS.Properties, todayStyles?: CSS.Properties): HTMLElement;
    get value(): Date;
    get rendered(): HTMLElement | null;
}
export default DateBox;
