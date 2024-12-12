let transactions = [];

document.getElementById('transaction-form').addEventListener('submit', function (e) {
    e.preventDefault();
    addTransaction();
});

function addTransaction() {
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    if (amount === '' || description === '' || category === '') {
        alert('Please fill in all fields');
        return;
    }

    const transaction = {
        id: generateID(),
        amount: +amount,
        description,
        category
    };

    transactions.push(transaction);
    updateUI();
    document.getElementById('transaction-form').reset();
}

function generateID() {
    return Math.floor(Math.random() * 1000000);
}

function updateUI() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    let income = 0, expenses = 0;
    transactions.forEach(transaction => {
        const sign = transaction.amount > 0 ? '+' : '-';
        const item = document.createElement('li');
        item.classList.add(transaction.amount > 0 ? 'income' : 'expense');
        item.innerHTML = `
            ${transaction.description} (${transaction.category}) <span>${sign}₹${Math.abs(transaction.amount)}</span>
            <button onclick="deleteTransaction(${transaction.id})">x</button>
        `;
        transactionList.appendChild(item);

        if (transaction.amount > 0) {
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }
    });

    const total = income + expenses;
    document.getElementById('balance').innerText = `₹${total.toFixed(2)}`;
    document.getElementById('income').innerText = `₹${income.toFixed(2)}`;
    document.getElementById('expenses').innerText = `₹${Math.abs(expenses).toFixed(2)}`;
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateUI();
}