
function BudgetSummary({ plan }) {
  if (!plan) {
    return null;
  }

  const estimatedTotal = Number(plan.estimatedTotal || 0);
  const budget = Number(plan.budget || 0);

  const actualSpent = (plan.expenses || []).reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0
  );

  const estimatedRemaining = budget - estimatedTotal;
  const actualRemaining = budget - actualSpent;

  const estimatedPercentage =
    budget > 0 ? Math.min(100, (estimatedTotal / budget) * 100) : 0;

  const actualPercentage =
    budget > 0 ? Math.min(100, (actualSpent / budget) * 100) : 0;

  return (
    <section className="budget-summary">
      <div className="budget-summary-top">
        <div>
          <p className="eyebrow">06 / BUDGET OVERVIEW</p>
          <h2>Your money, in perspective.</h2>
        </div>
      </div>

      <div className="budget-comparison-grid">
        <div className="budget-comparison-card">
          <span>YOUR TOTAL BUDGET</span>
          <strong>${budget.toLocaleString("en-US")}</strong>
        </div>

        <div className="budget-comparison-card">
          <span>PLANNED ESTIMATE</span>
          <strong>
            ${estimatedTotal.toLocaleString("en-US")}
          </strong>

          <div className="budget-progress-track">
            <div
              className="budget-progress-fill"
              style={{ width: `${estimatedPercentage}%` }}
            />
          </div>

          <p>
            {estimatedRemaining >= 0 ? "Estimated remaining" : "Estimated over"}:
            {" "}${Math.abs(estimatedRemaining).toLocaleString("en-US")}
          </p>
        </div>

        <div className="budget-comparison-card">
          <span>ACTUAL EXPENSES</span>
          <strong>
            ${actualSpent.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>

          <div className="budget-progress-track">
            <div
              className="budget-progress-fill actual-progress"
              style={{ width: `${actualPercentage}%` }}
            />
          </div>

          <p>
            {actualRemaining >= 0 ? "Budget remaining" : "Over budget"}:
            {" "}${Math.abs(actualRemaining).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      <p className="budget-disclaimer">
        These figures are planning estimates and manually recorded expenses,
        not live travel prices. Record expenses as you travel to keep
        the actual-spending figure up to date.
      </p>
    </section>
  );
}

export default BudgetSummary;
