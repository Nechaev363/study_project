'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItem = document.querySelectorAll('.income-items');
    

    start.disabled = true;
    
    

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    procentDeposit: 0,
    moneyDeposit: 0,
    start: function () {
        
        appData.budget = +salaryAmount.value;
        
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMoth();
        appData.getBudget();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.rangeChange();
        appData.showResult();
        appData.blocked();
        
    },
    
    blocked: function () {
        document.querySelectorAll('.data input[type=text]').forEach(function (item) {
            item.disabled = true;
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length == 3) {
            expensesPlus.style.display = 'none';
        }
        cloneExpensesItem.querySelectorAll('input').forEach(function (item) {
            item.value = '';
        });
    },

    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMoth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function () {
            incomePeriodValue.value = this.calcPeriod();
            
        });
        
    },
    getIncomeBlock: function () {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length == 3) {
            incomePlus.style.display = 'none';
        }
        cloneIncomeItem.querySelectorAll('input').forEach(function (item) {
            item.value = '';
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getIncome: function () {
        incomeItem.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    rangeChange: function () {
        let change = document.querySelector('.period-amount');
        change.textContent = periodSelect.value;
    },

    getInfoDeposit: function () {
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        if (appData.deposit) {
            appData.procentDeposit = +prompt('Какой годовой процент?');
            appData.moneyDeposit = +prompt('Какая сумма заложена?');
        }

    },
    getExpensesMoth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMoth: function () {
        return targetAmount.value / appData.budgetMonth;
    },
    getStatusIcome: function () {
        if (appData.budgetDay > 800) {
            return ('Высокий уровень дохода');
        } else if (appData.budgetDay > 300) {
            return ('Средний уровень дохода');
        } else if (appData.budgetDay > 300) {
            return ('Низкий уровень дохода')
        } else {
            return ('Что-то пошло не так!');
        }
     },
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    },
    getForStart: function () {
        salaryAmount.addEventListener('input', function(){
            if(salaryAmount.value.length > 0 ) {
                start.disabled = false;
            } else if(salaryAmount.value.length === 0 ) {
                start.disabled = true;
            } 
        });
    },
 reset: function () {
    document.querySelectorAll('.result input[type=text]').forEach(function (item) {
        item.disabled = true;
    });
    start.style.display = 'block';
    cancel.style.display = 'none';
 },
 getForReset: function () {
     cancel.addEventListener('click', function() {
         if(cancel.value.length > 0) {
             cancel.disabled = false;
         }
     })ж
 }
};
appData.getForStart();
appData.reset();
appData.getForReset();
cancel.addEventListener('click', appData.getBlockButton);
start.addEventListener('click', appData.start);
cancel.addEventListener('click', appData.reset);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.getIncomeBlock);
periodSelect.addEventListener('change', appData.rangeChange);

// console.log('Расходы за месяц: ' + appData.expenses);


// if (appData.getExpensesMoth() > 0) {
//     console.log("Цель будет достигнута за " + Math.ceil(appData.getTargetMoth()) + ' месяца');
// } else {
//     console.log("Цель не будет достигнута");
// }





// for (let key in appData) {
//     console.log("Наша программа включает в себя данные: " + key + ' - ' + appData[key]);

// }