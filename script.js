const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const submitBtn = document.getElementById('submitBtn');
const daysResult = document.getElementById('days_result_span');
const monthsResult = document.getElementById('months_result_span');
const yearsResult = document.getElementById('years_result_span');
const allInputs = document.querySelectorAll('.form_input');
const allLabels = document.querySelectorAll('.form_label');
const allErrorLabels = document.querySelectorAll('.form_input_error');
const allResultSpans = document.querySelectorAll('.result_span');

const setDefaultStyles = () => {
    allInputs.forEach((input, index) => {
        allLabels[index].style.color = 'var(--smokey-grey)';
        allErrorLabels[index].innerText = '';
        input.style.borderColor = 'var(--light-grey)';
    });
    allResultSpans.forEach((input, index) => {
        input.innerText = '- -';
    })
}

const validateForm = (e) => {
    let hasErrors = false;
    e.preventDefault();
    setDefaultStyles();
    
    const inputDay = parseInt(dayInput.value);
    const inputMonth = parseInt(monthInput.value);
    const inputYear = parseInt(yearInput.value);
    console.log({ inputDay, inputMonth, inputYear })

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    console.log({ currentDate, currentYear, currentMonth, currentDay });

    allInputs.forEach((input, index) => {
        if (!input.value) {
            allLabels[index].style.color = 'var(--light-red)';
            allErrorLabels[index].innerText = 'This field is required';
            allInputs[index].style.borderColor = 'var(--light-red)';
            hasErrors = true;
        }
        if (isNaN(input.value)) {
            allLabels[index].style.color = 'var(--light-red)';
            allErrorLabels[index].innerText = 'Must be a number';
            allInputs[index].style.borderColor = 'var(--light-red)';
            hasErrors = true;
        }
    })

    if (inputYear > currentYear) {
        document.getElementById('form_label_year').style.color = 'var(--light-red)';
        document.getElementById('form_error_year').innerText = 'Must be in the past';
        yearInput.style.borderColor = 'var(--light-red)';
        hasErrors = true;
    } else if (inputYear === currentYear && inputMonth > currentMonth) {
        document.getElementById('form_label_year').style.color = 'var(--light-red)';
        document.getElementById('form_error_year').innerText = 'Must be in the past';
        yearInput.style.borderColor = 'var(--light-red)';
        document.getElementById('form_label_month').style.color = 'var(--light-red)';
        document.getElementById('form_error_month').innerText = 'Must be in the past';
        monthInput.style.borderColor = 'var(--light-red)';
        hasErrors = true;
    } else if (inputYear === currentYear && inputMonth === currentMonth && inputDay > currentDay) {
        document.getElementById('form_label_year').style.color = 'var(--light-red)';
        document.getElementById('form_error_year').innerText = 'Must be in the past';
        yearInput.style.borderColor = 'var(--light-red)';
        document.getElementById('form_label_month').style.color = 'var(--light-red)';
        document.getElementById('form_error_month').innerText = 'Must be in the past';
        monthInput.style.borderColor = 'var(--light-red)';
        document.getElementById('form_label_day').style.color = 'var(--light-red)';
        document.getElementById('form_error_day').innerText = 'Must be in the past';
        dayInput.style.borderColor = 'var(--light-red)';
        hasErrors = true;
    }

    if (inputYear < 1) {
        document.getElementById('form_label_year').style.color = 'var(--light-red)';
        document.getElementById('form_error_year').innerText = 'Must be a valid year';
        yearInput.style.borderColor = 'var(--light-red)';
        hasErrors = true;
    }

    if (inputMonth > 12 || inputMonth < 1) {
        document.getElementById('form_label_month').style.color = 'var(--light-red)';
        document.getElementById('form_error_month').innerText = 'Must be a valid month';
        monthInput.style.borderColor = 'var(--light-red)';
        hasErrors = true;
    }

    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (inputYear % 4 === 0) {
        daysPerMonth[1] = 29;
    }
    for (let i = 0; i < 12; i++) {
        console.log(i)
        if (inputMonth - 1 === i) {
            console.log(inputMonth - 1)
            if (inputDay > daysPerMonth[i] || inputDay < 1) {
                document.getElementById('form_label_day').style.color = 'var(--light-red)';
                document.getElementById('form_error_day').innerText = 'Must be a valid day';
                dayInput.style.borderColor = 'var(--light-red)';
                hasErrors = true;
            }
        }
    }

    if (!hasErrors) calculateAge();
}

const calculateAge = () => {
    const inputDay = parseInt(dayInput.value);
    const inputMonth = parseInt(monthInput.value) - 1;
    const inputYear = parseInt(yearInput.value);
    console.log({ inputDay, inputMonth, inputYear })

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    console.log({ currentDate, currentYear, currentMonth, currentDay });

    let yearsOld = 0;
    const yearDiff = currentYear - inputYear;
    if (inputMonth < currentMonth) {
        yearsOld = yearDiff;
    } else if (inputMonth > currentMonth) {
        yearsOld = yearDiff - 1;
    } else {
        inputDay > currentDay ? yearsOld = yearDiff - 1 : yearsOld = yearDiff;
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

submitBtn.addEventListener('click', validateForm);