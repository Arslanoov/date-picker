# TS Date Picker

Install

    npm i ts-date-picker

Setup

    const picker: DatePicker = new DatePicker({
        currentDay: new Date(),
        onChange: handler,
        picker: {
            inputHeight: ...
        },
        (header/content/arrows/dateBox/footer): {
            styles: {
                // Your custom styles
            }
        },
        todayButton: {
            enabled: true,
            text: "Today",
            styles: {
                // Styles
            }
        }
    }, daysList[], monthsList[])
    
    picker.mount("#input", "#wrapper")

Demo

    npm run demo
