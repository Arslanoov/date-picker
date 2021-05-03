import * as CSS from "csstype";
declare class WeekDayBox {
    private readonly weekDay;
    private element;
    constructor(weekDay: string);
    render(styles?: CSS.Properties): HTMLElement;
    get value(): string;
    get rendered(): HTMLElement | null;
}
export default WeekDayBox;
