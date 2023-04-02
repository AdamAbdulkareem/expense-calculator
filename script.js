// Monthly Expenses Starts
var monthly_salary = document.querySelector(".monthly-salary-class");
var monthly_other = document.querySelector(".monthly-other-class");
var food = document.querySelector(".food-class");
var clothing = document.querySelector(".clothing-class");
var shelter = document.querySelector(".shelter-class");
var household = document.querySelector(".household-class");
var transportation = document.querySelector(".transportation-class");
var health = document.querySelector(".health-class");
var student_loan = document.querySelector(".student-loan-class");
var personal = document.querySelector(".personal-class");
var miscellaneous = document.querySelector(".miscellaneous-class");
var emergency_fund = document.querySelector(".emergency-fund-class");
var investments = document.querySelector(".investments-class");
var retirement = document.querySelector(".retirement-class");
// Monthly Expenses Ends

//percentage function begins

// +++Labels used by pieChart+++
var expenseArr = [
  "Housing",
  "Transport",
  "Savings",
  "Clothing",
  "Insurance",
  "Retirement",
];
// ++++backgroundColour use by pieChart++++
var expenseColor = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145",
  "#f11fff",
];
// +++triggers calcPercent function+++
housing.addEventListener("change", () => calcPercent(housing, salary));
transport.addEventListener("change", () => calcPercent(transport, salary));
savings.addEventListener("change", () => calcPercent(savings, salary));
clothing.addEventListener("change", () => calcPercent(clothing, salary));
insurance.addEventListener("change", () => calcPercent(insurance, salary));
retirement.addEventListener("mouseout", () => calcPercent(retirement, salary));

// +++Array that takes objectLiterals containing expenseName and value+++
var expensePercentArr = [];
// +++Array that contain expenseValue+++
var modifiedExpenseArr = [];

// +++Function that validates the input value of expenses begins+++
const calcPercent = (expense, salary) => {
  const expenseName = expense.name;
  const newSalary = parseInt(salary.value);
  const newAmount = parseInt(expense.value);
  if (newAmount < 0) {
    alert(`${expenseName.toUpperCase()} CAN'T TAKE A NEGATIVE VALUE`);
  }
  if (newAmount > newSalary) {
    alert(`${expenseName.toUpperCase()} EXPENSE IS GREATER THAN SALARY`);
  } else {
    const newObject = {};
    newObject["name"] = expense.name;
    newObject["value"] = newAmount;
    const found = expensePercentArr.findIndex(
      (obj) => obj["name"] === newObject["name"]
    );
    if (found == -1) {
      expensePercentArr.push(newObject);
    } else {
      expensePercentArr[found] = newObject;
    }
    loadGraph();
    counterFunction();
  }
};
// +++Function that validates the input value of expenses begins+++

if (modifiedExpenseArr.length === 0) {
  canvas.style.display = "none";
}

// +++Function which does the percentage calculation+++
const loadGraph = () => {
  modifiedExpenseArr = expensePercentArr.map((expense) => expense.value);
  var percentOfExpenseArr = modifiedExpenseArr.map((value) =>
    (percentValue = (value * 100) / salary.value).toFixed(2)
  );

  // +++PieChart dependency+++
  canvas.style.display = "block";
  return new Chart("my-chart", {
    type: "pie",
    data: {
      labels: expenseArr,
      datasets: [
        {
          backgroundColor: expenseColor,
          data: percentOfExpenseArr,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Percentage Of Expenses Base On Salary",
      },
    },
  });
};

// Monetary goal function (numbers of month) begins
getMonthBtn.addEventListener("click", () => calcGoalMonths());
function calcGoalMonths() {
  //  +++the below function test if number is float+++
  function isFloat(x) { return !!(x % 1); }
  // +++   +++
  const newMonetaryValue = parseInt(monetary.value);
  const newSavingsValue = parseInt(savings.value);
  goalMonths = newMonetaryValue / newSavingsValue;
  if (newMonetaryValue < newSavingsValue) {
    return alert("Monetary goal less than savings");
  } else if (Number.isInteger(goalMonths)) {
    displayMonths.innerHTML = goalMonths;
    monetaryValueIncrement.innerText = "0.00";
    return;
  } else if (isFloat(goalMonths) == true) {
    var incrementConversion = Math.ceil(
      (moneyIncrement = (goalMonths - parseInt(goalMonths)) * newSavingsValue)
    );
    displayMonths.innerHTML = parseInt(goalMonths);
    monetaryValueIncrement.innerHTML = incrementConversion;
    return;
  } else {
    console.log(savings.value);
    displayMonths.innerHTML = "0.00";
    monetaryValueIncrement.innerText = "0.00";
    return;
  }
}




var root = am5.Root.new("chartdiv");
root.setThemes([
  am5themes_Animated.new(root)
]);

var chart = root.container.children.push(am5percent.PieChart.new(root, {
  startAngle: 180,
  endAngle: 360,
  layout: root.verticalLayout,
  innerRadius: am5.percent(50)
}));

var series = chart.series.push(am5percent.PieSeries.new(root, {
  startAngle: 180,
  endAngle: 360,
  valueField: "value",
  categoryField: "category",
  alignLabels: false
}));

series.states.create("hidden", {
  startAngle: 180,
  endAngle: 180
});

series.slices.template.setAll({
  cornerRadius: 5
});

series.ticks.template.setAll({
  forceHidden: true
});

series.data.setAll([
  { value: 10, category: "Income Spent" },
  { value: 9, category: "Income Saved" },
  { value: 6, category: "Cash Balence" }
]);

series.appear(1000, 100);