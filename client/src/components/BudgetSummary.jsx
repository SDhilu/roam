
function BudgetSummary({ plan }) {
  if (!plan) {
    return null;
  }

  const difference = plan.budget - plan.estimatedTotal;
  const withinBudget = difference >= 0;

  const percentage = Math.min(
    100,
    (plan.estimatedTotal / plan.budget) * 100
  );

  return (
    <section className="budget-summary">
      <div className="budget-summary-top">
        <div>
          <p className="eyebrow">04 / YOUR BUDGET</p>
          <h2>Spend with a plan.</h2>
        </div>

        <span
          className={
            withinBudget ? "budget-status" : "budget-status over"
          }
        >
          {withinBudget ? "Within budget" : "Over budget"}
        </span>
      </div>

      <div className="budget-total">
        <span>Estimated trip cost</span>
        <strong>
          ${plan.estimatedTotal.toLocaleString("en-US")}
        </strong>
      </div>

      <div className="budget-progress-track">
        <div
          className="budget-progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="budget-numbers">
        <span>
          Budget: ${plan.budget.toLocaleString("en-US")}
        </span>

        <span>
          {withinBudget ? "Remaining" : "Over by"}: $
          {Math.abs(difference).toLocaleString("en-US")}
        </span>
      </div>

      <p className="budget-disclaimer">
        Planning estimate only. Actual trip expenses may differ
        significantly from these figures.
      </p>
    </section>
  );
}

export default BudgetSummary;
