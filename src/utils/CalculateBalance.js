const CalculateBalance = (transactions) => {
  let income = 0;
  let expense = 0;

  transactions.forEach((tr) => {
    if (tr.type === "expense") {
      expense += parseFloat(tr.amount);
    } else if (tr.type === "income") {
      income += parseFloat(tr.amount);
    }
  });

  const balance = income - expense;
  return {
    balance: balance.toFixed(2),
    income: income.toFixed(2),
    expense: expense.toFixed(2),
  };
};

export default CalculateBalance;
