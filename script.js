"strict mode";
//current date
const currentDate = new Date();
const year = currentDate.getFullYear();
let month = currentDate.getMonth() + 1;
let day = currentDate.getDate();

//option
let mikroOpt = document.querySelector("#mikro-opt");

//constant numbers and data that we will be need through the code
const MINSALERY = Math.round(86075 / 2);
const INCOMETAXAMOUNT = 0.21;
// const mounthlyMinSalary = 68000;
let selaryArr = [];
let sum = 0;
const months = [
  "Հունվար",
  "Փետրվար",
  "Մարտ",
  "Ապրիլ",
  "Մայիս",
  "Հունիս",
  "Հուլիս",
  "Օգոստոս",
  "Սեպտեմբեր",
  "Հոկտեմբեր",
  "Նոյեմբեր",
  "Դեկտեմբեր",
];

//result filds
const averageMonthlyIncome = document.querySelector("#show-month-incom");
const averageDailyIncome = document.querySelector("#show-daily-incom");
const theEstimatedAmountOfTheBenefit = document.querySelector("#show-npast");
const incomeTax = document.querySelector("#show-ekamtayin-hark");
const benefitsPayable = document.querySelector("#show-vjarman-entaka-npast");

// date filds
let startDate = document.querySelector("#date-start");
let endDate = document.querySelector("#date-end");

//needs opitimization
month < 10 ? (month = `0${month}`) : month;
day < 10 ? (day = `0${day}`) : day;
document.querySelector("#date-start").value = `${year}-${month}-${day}`;

//displaydate function
const displayDate = function () {
  let startDate1 = new Date(startDate.value);
  let endDate1 = new Date(endDate.value);
  let month = startDate1.getMonth();
  let year = startDate1.getFullYear();
  const numOfDays = document.querySelector("#num-of-days");
  const diffTime = Math.abs(endDate1 - startDate1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  numOfDays.value = diffDays;

  for (let i = 1; i <= months.length; i++) {
    month === 0 ? year-- : year;
    month === 0 ? (month = months.length) : month;
    month--;
    document.querySelector(`.year${i}`).innerHTML = year;
    document.querySelector(`.month${i}`).innerHTML = months[month];
  }
};

//ismikro function
function isMikro() {
  averageMonthlyIncome.value = MINSALERY;
  averageDailyIncome.value = Math.round(MINSALERY / 30.4);
  theEstimatedAmountOfTheBenefit.value = Math.round(
    (MINSALERY / 30.4) * document.querySelector("#num-of-days").value
  );
  incomeTax.value = 5000;
  benefitsPayable.value = Math.round(
    theEstimatedAmountOfTheBenefit.value - incomeTax.value
  );
}

//isn't mikro func
function isNotMikro() {
  if (
    Math.round(sum / 12) > MINSALERY &&
    Math.round(sum / 12) < MINSALERY * 2 * 15
  ) {
    averageMonthlyIncome.value = Math.round(sum / 12);
  }
  if (Math.round(sum / 12) > MINSALERY * 2 * 15) {
    averageMonthlyIncome.value = MINSALERY * 2 * 15;
  }
  if (Math.round(sum / 12) < MINSALERY) {
    averageMonthlyIncome.value = MINSALERY;
  }

  averageDailyIncome.value = Math.round(averageMonthlyIncome.value / 30.4);
  theEstimatedAmountOfTheBenefit.value = Math.round(
    (averageMonthlyIncome.value / 30.4) *
      document.querySelector("#num-of-days").value
  );

  incomeTax.value = Math.round(
    (averageMonthlyIncome.value / 30.4) * 140 * INCOMETAXAMOUNT
  );
  benefitsPayable.value = Math.round(
    theEstimatedAmountOfTheBenefit.value - incomeTax.value
  );
}

//check option and call the function
function optional() {
  sum = 0;

  const saleryArr = document.querySelectorAll(".salery");
  saleryArr.forEach((salery) => (sum += +salery.value));
  document.querySelector(".sum").innerHTML = sum;

  displayDate();
  if (sum > 0) {
    mikroOpt.value === "yes" ? isMikro() : isNotMikro();
  }
  //sum > 0 ? (mikroOpt.value === "yes" ? isMikro() : isNotMikro()) : " ";
}

displayDate();
