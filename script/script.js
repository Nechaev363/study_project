'use strict';

let start = document.getElementById('start'),  
    cancel = document.getElementById('cancel'), 
    btnPlus = document.getElementsByTagName('button'), 
    incomePlus = btnPlus[0], 
    expensesPlus = btnPlus[1], 
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'), 
    targetValue = document.querySelector('.target-amount'),
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
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItem = document.querySelectorAll('.income-items'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');
    
    

     start.disabled = true; //кнопка рассчитать неактивна, пока поле инпута не заполнено
    
    


    const AppData = function () { 

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.expensesMonth = 0;
        this.addExpenses = [];
        this.deposit = false;
        this.procentDeposit = 0;
        this.moneyDeposit = 0;
    };
    AppData.prototype.start = function()  {
        
        this.budget = +salaryAmount.value; // перемення, в которую записывется месячный доход
        
        this.getExpenses(); 
        this.getIncome();
        this.getExpensesMoth();
        this.getInfoDeposit();
        this.getBudget();
        this.getAddInput();
        this.rangeChange();
        this.showResult();
        this.changePeriod();
        
        this.blocked();
        
    };
    AppData.prototype.blocked = function() { // метод делает неактивной кнопку рассчитать при нуловом значении импута обязательный доход
        document.querySelectorAll('.data input[type=text]').forEach((item) => { // разобрали все импуты
            item.disabled = true; // сделал их неактивными
        });
        start.style.display = 'none'; // кнопка рассчитать пропадает
        cancel.style.display = 'block'; // появляется кнопка сбросить
    };
    
      
    AppData.prototype.getExpenses = function() { // метод, который записывает данные Обязательные расходы
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value; //записывает наименование обязательных расходов
            let cashExpenses = item.querySelector('.expenses-amount').value; //записывает сумму обязательных расходов
            if (itemExpenses !== '' && cashExpenses !== '') { // создает условие, если и та и другая переменная не равна пустой строке
                this.expenses[itemExpenses] = cashExpenses; // тогда переменная expenses берет ключ itemExpenses и присваивает cashExpenses сумму. Получаем строку + сумму
            }
        });
    };
    AppData.prototype.showResult = function() { // метод включает в себя все расчеты 
        budgetMonthValue.value = this.budgetMonth; // значение budgetMonthValue.value присвоили budgetMonth
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalIncomeValue.value = this.addIncome.join(', ');
        additionalExpensesValue.value = this.addExpenses.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMoth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change',  () => { // показывает цифры при передвижении бегунка
        incomePeriodValue.value = this.calcPeriod();
            
        });
        
    };

    AppData.prototype.getAddInput = function() { 
        let addExpenses = additionalExpensesItem.value.split(','); 
        addExpenses.forEach((item) => {
        item = item.trim(); 
        if (item !== '') { 
        this.addExpenses.push(item);
        }
        });
        additionalIncomeItem.forEach((item) => {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
        this.addIncome.push(itemValue);
}
});
};
    
    AppData.prototype.addPlus = function(item, plus, element) { 
        let cloneIncomeItem = item[0].cloneNode(true); 
        item[0].parentNode.insertBefore(cloneIncomeItem, plus); 
        item = document.querySelectorAll(element);
        console.log(item.length);
        if (item.length == 3) { 
            plus.style.display = 'none';
        }
        cloneIncomeItem.querySelectorAll('input').forEach((elem) => { //сбрасыает импут на пустую строку
            elem.value = '';
        });
    };
    AppData.prototype.getIncome = function() { // метод, который записывает данные дополнительные расходы,  аналогично обязательным
        incomeItem.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });
        for (let key in this.income) { // incomeMonth присвоили сумму значений income[key]. key это все значения в income
            this.incomeMonth += +this.income[key];
    }
    
    };
    
    AppData.prototype.rangeChange = function() { // метод выводит на экран числовое изменениее ползунка
        const change = document.querySelector('.period-amount'); // взяли класс period-amount
        change.textContent = periodSelect.value; // задавал или получил текстовое содержимое элемента и его потомков
    };

    AppData.prototype.getInfoDeposit = function() { // записывет данные о депозите
        
        if ( this.deposit) {
            this.procentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }

    };
    AppData.prototype.getExpensesMoth = function() { //записывает сумму в expensesMonth из expenses
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    };
    AppData.prototype.getBudget = function() { // метод выпоняет рассчеты budgetMonth и budgetDay
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.procentDeposit)/12;
        this.budgetDay = this.budgetMonth / 30;
    };
    AppData.prototype.getTargetMoth = function() { // берет значение Цель и делит ее на месячный доход
        return targetValue.value / this.budgetMonth;
    };
    AppData.prototype.getStatusIcome = function() { // в методе есть условия, если определенный уровень дохода соответсвует условию, тогда выдает его уровень дохода
        if (this.budgetDay > 800) {
            return ('Высокий уровень дохода');
        } else if (this.budgetDay > 300) {
            return ('Средний уровень дохода');
        } else if (this.budgetDay > 300) {
            return ('Низкий уровень дохода');
        } else {
            return ('Что-то пошло не так!');
        }
     };
     AppData.prototype.calcPeriod = function() { // рассчитывает за какой период будет достигнута цель
        return  this.budgetMonth * periodSelect.value;
    };
    AppData.prototype.getForStart = function() { // задает условие кнопке рассчитать 
        salaryAmount.addEventListener('input', function(){
            if(salaryAmount.value.length > 0 ) { // если длина строки больше нуля
                start.disabled = false; // тогда кнопка заработает
            } else if(salaryAmount.value.length === 0) { // если равна нулевому значению
                start.disabled = true;// кнока не работает
            }
            
        });
    };
    AppData.prototype.reset = function() { // возвращает все имуты у устой строке и появлению кноки старт
    document.querySelectorAll('.result input[type=text]').forEach((item) => { // перебрал все значения имутов и
        item.value = '';// присвоил пустую строку
        start.disabled = true; // включил кнопку рассчитыть
    });
        document.querySelectorAll('.data input[type=text]').forEach((item) => {
        item.value = '';
        item.disabled = false;
    });
    start.style.display = 'block'; //появляется кнопка рассчитать
    cancel.style.display = 'none';// скрывается кнобка сбросить

    periodSelect.value = 1;
    
    this.rangeChange();// метод выводит на экран числовое изменениее ползунка
        //вернул ползунок в начальное значени
     // запустил функцию, котрая возвращает ползунок в начальное значени

};

AppData.prototype.getForReset = function() { // при нажатии кнопки сбросить 
     cancel.addEventListener('click', function() {
         if(cancel.value.length > 0) {
             cancel.disabled = false;// делает ее активной
         }
     });
 };
 AppData.prototype.changePeriod = function() { // метод сбрасываает ползунок
    const change = document.querySelector('.period-amount');
    change.innerHTML = periodSelect.value;
 };
 AppData.prototype.eventsListeners = function () { 
    depositCheck.addEventListener('change', () =>{
        if(depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = 'true';
            depositBank.addEventListener('change', function() {
               let selectIndex = this.options[this.selectedIndex].value;
               if(selectIndex === 'other') {
                   depositPercent.style.display = 'inline-block';
                   depositPercent.value = '';
               }else {
                   depositPercent.style.display = 'none';
                   depositPercent.value = selectIndex;
               }
            });
        }else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositAmount.value = '';
            this.deposit = 'false';
        }
    
    });
};

const appData = new AppData();
appData.getForStart();
appData.reset();
appData.getForReset();
appData.eventsListeners();



cancel.addEventListener('click', appData.getBlockButton); // вешаем обрабочик события на cancel. Объект, который принимает уведомление, когда событие указанного типа произошло в данной случае через клик
start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));

expensesPlus.addEventListener('click', function (){
    appData.addPlus(expensesItems, expensesPlus, '.expenses-items');
});
incomePlus.addEventListener('click', function (){
    appData.addPlus(incomeItem, incomePlus, '.income-items');
});

periodSelect.addEventListener('change', appData.rangeChange);
    