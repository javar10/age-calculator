const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const submitBtn = document.getElementById('submitBtn');
const daysResult = document.getElementById('days_result_span');
const monthsResult = document.getElementById('months_result_span');
const yearsResult = document.getElementById('years_result_span');

const onSubmit = (e) => {
    e.preventDefault();
    const inputDay = dayInput.value;
    const inputMonth = monthInput.value;
    const inputYear = yearInput.value;
    console.log({inputDay, inputMonth, inputYear})

    const date = new Date();
    console.log(date);

    const currentDay = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    console.log({currentDay, currentMonth, currentYear});

    daysResult.innerText = currentDay - inputDay;
    monthsResult.innerText = currentMonth - inputMonth;
    yearsResult.innerText = currentYear - inputYear;

}

submitBtn.addEventListener('click', onSubmit);