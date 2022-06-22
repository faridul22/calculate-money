// function for get input
function getInputValue(ExpenseItem) {
    const expenseInput = document.getElementById(ExpenseItem + '-input');
    const expenseText = expenseInput.value;
    const expenseAmount = parseFloat(expenseText);
    return expenseAmount;
};

// function for Error message 
function getError(inputId, errorType, balance) {
    const inputValue = getInputValue(inputId);
    const stringError = document.getElementById(errorType + '-stringError');
    const negativeNumError = document.getElementById(errorType + '-negativeError');
    const insufficientBalance = document.getElementById(balance + '-insufficient');
    if (inputValue < 0) {
        insufficientBalance.style.display = 'none';
        stringError.style.display = 'none';
        negativeNumError.style.display = 'block';
        return
    }
    if (isNaN(inputValue)) {
        insufficientBalance.style.display = 'none';
        negativeNumError.style.display = 'none';
        stringError.style.display = 'block';

    }
    else {
        stringError.style.display = 'none';
        negativeNumError.style.display = 'none';
        insufficientBalance.style.display = 'none';
    }
}

// function for Calculate total expense
function calculateTotalExpense(isIncreasing, isDecreasing, isPercent) {
    const incomeAmount = getInputValue('income');
    const foodExpense = getInputValue('food');
    const rentExpense = getInputValue('rent');
    const clothesExpense = getInputValue('clothes');
    const savingInput = getInputValue('save');
    if (incomeAmount < 0 || foodExpense < 0 || rentExpense < 0 || clothesExpense < 0 || savingInput < 0) {
        return
    }
    if (isIncreasing == true) {
        const totalExpenseAmount = foodExpense + rentExpense + clothesExpense;
        return totalExpenseAmount;
    }
    if (isDecreasing == true) {
        const totalExpenseAmount = foodExpense + rentExpense + clothesExpense;
        const balanceAmount = incomeAmount - totalExpenseAmount;
        return balanceAmount;
    }
    if (isPercent == true) {
        const savingAmount = savingInput / 100;
        const totalSaving = incomeAmount * savingAmount;
        return totalSaving;
    }
}

// event handler for calculate button
document.getElementById('calculate-btn').addEventListener('click', function () {
    getError('income', 'income', 'expense');
    getError('food', 'food', 'expense');
    getError('rent', 'rent', 'expense');
    getError('clothes', 'clothes', 'expense');
    const incomeAmount = getInputValue('income');
    const insufficientBalance = document.getElementById('expense-insufficient');
    const totalExpenseAmount = calculateTotalExpense(true, false, false);
    const balanceAmount = calculateTotalExpense(false, true, false);
    if (isNaN(incomeAmount)) {
        return
    }
    if (incomeAmount < totalExpenseAmount) {
        insufficientBalance.style.display = 'block';
        return
    }
    if (totalExpenseAmount > 0 || balanceAmount > 0) {
        document.getElementById('balance').innerText = balanceAmount;
        document.getElementById('total-expenses').innerText = totalExpenseAmount;
        return
    }
});



// Event handler for saving button
document.getElementById('saving-btn').addEventListener('click', function () {
    const totalSaving = calculateTotalExpense(false, false, true);
    const balance = document.getElementById('balance');
    const balanceAmount = parseFloat(balance.innerText);
    const remainingBalance = balanceAmount - totalSaving;
    getError('save', 'save', 'save');
    if (remainingBalance < 0) {
        document.getElementById('save-insufficient').style.display = 'block';
        return
    }
    // change on the html
    if (totalSaving > 0 || remainingBalance > 0) {
        document.getElementById('saving-amount').innerText = totalSaving;
        document.getElementById('remaining-balance').innerText = remainingBalance;
    }
});