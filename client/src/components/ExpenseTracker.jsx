
import { useState } from "react";

const expenseCategories = [
  "Accommodation",
  "Food",
  "Transport",
  "Activities",
  "Shopping",
  "Other",
];

function ExpenseTracker({
  expenses,
  onAddExpense,
  onDeleteExpense,
}) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toLocaleDateString("en-CA"),
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const amount = Number(form.amount);

    if (!form.title.trim()) {
      setError("Enter a description for this expense.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }

    if (!form.date) {
      setError("Choose the date of the expense.");
      return;
    }

    onAddExpense({
      title: form.title.trim(),
      amount,
      category: form.category,
      date: form.date,
    });

    setForm((current) => ({
      ...current,
      title: "",
      amount: "",
    }));

    setError("");
  }

  const totalSpent = expenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0
  );

  return (
    <section className="expense-section">
      <div className="trip-section-heading">
        <p className="eyebrow">05 / REAL-WORLD SPENDING</p>
        <h2>Where your money goes.</h2>
        <p>Keep track of what you actually spend on your journey.</p>
      </div>

      <div className="expense-total">
        <span>Total recorded expenses</span>
        <strong>
          ${totalSpent.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </strong>
      </div>

      <form className="expense-form" onSubmit={handleSubmit}>
        <label className="trip-field">
          Expense description
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Hotel for two nights"
            maxLength={100}
            required
          />
        </label>

        <div className="expense-form-grid">
          <label className="trip-field">
            Amount (USD)
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              placeholder="45.00"
              required
            />
          </label>

          <label className="trip-field">
            Category
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {expenseCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="trip-field expense-date-field">
            Expense date
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        {error && (
          <p className="trip-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="trip-primary-button">
          Add expense <span>+</span>
        </button>
      </form>

      <div className="expense-list">
        <h3>Recorded expenses</h3>

        {expenses.length === 0 ? (
          <p className="saved-trips-empty">
            No expenses yet. Add your first expense above.
          </p>
        ) : (
          expenses
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((expense) => (
              <article className="expense-item" key={expense.id}>
                <div className="expense-item-icon">
                  {expense.category === "Accommodation"
                    ? "⌂"
                    : expense.category === "Food"
                      ? "◒"
                      : expense.category === "Transport"
                        ? "↗"
                        : expense.category === "Activities"
                          ? "✳"
                          : "＋"}
                </div>

                <div className="expense-item-info">
                  <h4>{expense.title}</h4>
                  <p>
                    {expense.category} · {expense.date}
                  </p>
                </div>

                <strong className="expense-item-amount">
                  ${Number(expense.amount).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>

                <button
                  type="button"
                  className="expense-delete-button"
                  onClick={() => onDeleteExpense(expense.id)}
                  aria-label={`Delete ${expense.title}`}
                  title="Delete expense"
                >
                  ×
                </button>
              </article>
            ))
        )}
      </div>
    </section>
  );
}

export default ExpenseTracker;
