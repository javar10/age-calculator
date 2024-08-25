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
    const inputDate = new Date(`${inputMonth}/${inputDay}/${inputYear}`)
    console.log({inputDay, inputMonth, inputYear, inputDate})

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    console.log({currentDate, currentYear, currentMonth, currentDay});

    const totalSecondsDiff = Math.abs(currentDate - inputDate) / 1000;
    let totalDaysDiff = days_difference = Math.floor (totalSecondsDiff / (60 * 60 * 24)); 
    console.log({totalDaysDiff});

    let yearsOld = 0;
    while (totalDaysDiff > 365.25) {
        yearsOld++;
        totalDaysDiff -= 365.25;
    }
    yearsResult.innerText = yearsOld;


    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (currentYear % 4 === 0) {
        daysPerMonth[1] = 29;
    }

    let monthsOld = 0;
    let daysOld = 0;
    if (inputMonth > currentMonth + 1) {
        console.log({daysPerMonth})
        const inputToEnd = daysPerMonth.slice(inputMonth);
        console.log({inputToEnd})
        const startToCurrent = daysPerMonth.slice(0, currentMonth + 1);
        console.log({startToCurrent});
        const daysToCount = [...inputToEnd, ...startToCurrent];
        monthsOld = daysToCount.length;
        console.log({daysToCount});
        console.log({daysPerMonth});
    
        
        const daysPast = daysToCount.reduce((total, cur) => total + cur)
        console.log({daysPast})
    
        daysOld = totalDaysDiff % 1 === 0 ? Math.floor(totalDaysDiff - daysPast) : Math.floor(totalDaysDiff - daysPast) + 1;
        console.log({daysOld});

    } else if (inputMonth < currentMonth + 1) {
        const daysToCount = daysPerMonth.slice(inputMonth - 1, currentMonth);
        console.log({daysPerMonth})
        console.log({daysToCount});
        monthsOld = daysToCount.length;

        const daysPast = daysToCount.reduce((total, cur) => total + cur)
        console.log({daysPast})
    
        console.log({totalDaysDiff})
        daysOld = totalDaysDiff % 1 === 0 ? Math.floor(totalDaysDiff - daysPast) : Math.floor(totalDaysDiff - daysPast) + 1;
        console.log({daysOld});

    } else {
        monthsOld = inputDay > currentDay ? 11 : 0;
        daysOld = inputDay > currentDay ? currentDay : Math.floor(totalDaysDiff);
    }

    monthsResult.innerText = monthsOld;
    daysResult.innerText = daysOld;
}

submitBtn.addEventListener('click', onSubmit);