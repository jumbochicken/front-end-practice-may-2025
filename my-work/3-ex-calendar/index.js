/*
## 4. 日曆(萬年曆)

> 學習目標：for 迴圈、日期物件

請使用 for 迴圈製作一個表格，顯示目前這個月份的日曆表格。

提示：

1. 要得到某年的某個月有幾天，可以用`new Date(y, m, 0).getDate()`，例如 2009 年的 9 月就是使用`new Date(2009, 9, 0).getDate()`
2. Date 物件的`getDay()`可以得到 0-6 的值，代表是星期幾，其中 0 代表星期日
*/

let formDate = new Date();
const btnPrevMonth = document.querySelector('#btnPrevMonth');
const btnNextMonth = document.querySelector('#btnNextMonth');



btnPrevMonth.addEventListener("click", function() {
    formDate.setMonth(formDate.getMonth() - 1);
    console.log(formDate);
    main();
});

btnNextMonth.addEventListener('click', function() {
    formDate.setMonth(formDate.getMonth() + 1);
    console.log(formDate);
    main();
});


main();

function main () {
    // const theDate = new Date();
    const year = formDate.getFullYear();
    const month = formDate.getMonth() + 1; // getMonth() returns 0-11, so we add 1
    const daysInMonth = new Date(year, month, 0).getDate(); // get the number of days in the month
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // get the first day of the month (0-6)

    // showCalendarForm(year, month, daysInMonth, firstDayOfMonth);

    showCalendarFormUsingArray(year, month, daysInMonth, firstDayOfMonth);
}


//bad
function showCalendarForm(year, month, daysInMonth, firstDayOfMonth) {


    let calendarForm = '<table border="1">';
    calendarForm += `<tr><th colspan='7'>${year}年${month}月</th></tr>`;
    calendarForm += '<tr>';
    
    const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];

    // Add the days of the week header
    for (let i = 0; i < daysOfWeek.length; i++) {
        calendarForm += `<th>${daysOfWeek[i]}</th>`;
    }
    calendarForm += '</tr><tr>';

    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarForm += '<td></td>';
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendarForm += `<td>${day}</td>`;
        if ((day + firstDayOfMonth) % 7 === 0) {
            calendarForm += '</tr><tr>'; // Start a new row after every 7 days
        }
    }

    calendarForm += '</tr></table>';
    
    // document.write(calendarForm);

    // 將日曆插入到特定的容器中
    const calendarContainer = document.querySelector('#calendarContainer');
    calendarContainer.innerHTML = calendarForm;
}

function showCalendarFormUsingArray(year, month, daysInMonth, firstDayOfMonth){
    console.log('firstDayOfMonth', firstDayOfMonth);

    let calendarArray = makeCalendarArray(year, month, daysInMonth, firstDayOfMonth);

    
    let calendarForm = '<table border="1">';
    calendarForm += `<tr><th colspan='7'>${year}年${month}月</th></tr>`;
    calendarForm += '<tr>';
    
    const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];

    // Add the days of the week header
    for (let i = 0; i < daysOfWeek.length; i++) {
        calendarForm += `<th>${daysOfWeek[i]}</th>`;
    }
    calendarForm += '</tr><tr>';
    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < calendarArray.length; i++) {
        calendarForm += `<td>${calendarArray[i]}</td>`;
        if ((i + 1) % 7 === 0) {
            calendarForm += '</tr><tr>'; // Start a new row after every 7 days
        }
    }

    calendarForm += '</tr></table>';
    // 將日曆插入到特定的容器中
    const calendarContainer = document.querySelector('#calendarContainer');
    calendarContainer.innerHTML = calendarForm;

}

function makeCalendarArray(year, month, daysInMonth, firstDayOfMonth) {
    let contentArray = makeArray(daysInMonth);
    let prefixArray = makeArray(firstDayOfMonth, true);
    let postfixArray = makeArray((7 - (daysInMonth + firstDayOfMonth) % 7) % 7, true);

    console.log(contentArray);
    console.log(prefixArray);    
    console.log(postfixArray);

    return prefixArray.concat(contentArray).concat(postfixArray);
}

//old
function makeArray1(count, withEmpty = false) {
    let arr = [];
    for (let i = 0; i < count; i++) {
        if (withEmpty) {
            arr.push("&nbsp;");
            continue;
        } else {
            arr.push(i+1);
            continue;
        }
    }
    console.log('arr', arr);
    return arr;
}

function makeArray(count, withEmpty = false) {
    
    return Array(count).fill(0).map((_, i) => {
        if (withEmpty) {
            return "&nbsp;";
        } else {
            return i + 1;
        }
    });
}