const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const submitBtn = document.getElementById('submitBtn');
const daysResult = document.getElementById('days_result_span');
const monthsResult = document.getElementById('months_result_span');
const yearsResult = document.getElementById('years_result_span');

const onSubmit = (e) => {
    e.preventDefault();
    const inputDate = new Date(`${monthInput.value}/${dayInput.value}/${yearInput.value}`);
    const inputDay = inputDate.getDate();
    const inputMonth = inputDate.getMonth();
    const inputYear = inputDate.getFullYear();
    console.log({inputDay, inputMonth, inputYear, inputDate})

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    console.log({currentDate, currentYear, currentMonth, currentDay});

    let yearsOld = 0;
    const yearDiff = currentYear - inputYear;
    if (inputMonth < currentMonth) {
        yearsOld = yearDiff;
    } else if (inputMonth > currentMonth) {
        yearsOld = yearDiff - 1;
    } else {
        inputDay < currentDay ? yearsOld = yearDiff : yearsOld = yearDiff - 1;
    }
    yearsResult.innerText = yearsOld;

    let monthsOld = 0;
    if (inputMonth < currentMonth) {
        monthsOld = currentMonth - inputMonth;    
    } else if (inputMonth > currentMonth) {
        monthsOld = 12 - inputMonth + currentMonth;
    } else {
        monthsOld = inputDay > currentDay ? 11 : 0;
    }
    monthsResult.innerText = monthsOld;

    const daysOld = inputDay > currentDay ? currentDay : currentDay - inputDay;
    daysResult.innerText = daysOld;
}

// TODO: Validation
    // const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // if (currentYear % 4 === 0) {
    //     daysPerMonth[1] = 29;
    // }

submitBtn.addEventListener('click', onSubmit);