import React, { useState } from "react";

const PaymentPlans = ({ payment_plans }) => {
  const [activePlan, setActivePlan] = useState(0);
  const plans = payment_plans || [];

  if (!plans.length) {
    return (
      <div className="col-md-12">
        <div className="text-center py-4">
          <p>No payment plans available</p>
        </div>
      </div>
    );
  }

  // Helper function to get payment icon based on payment time
  //   const getPaymentIcon = (paymentTime) => {
  //     const timeText = paymentTime?.toLowerCase() || "";
  //     if (timeText.includes("booking")) return "📝";
  //     if (timeText.includes("construction")) return "🏗️";
  //     if (timeText.includes("handover")) return "🔑";
  //     if (timeText.includes("completion")) return "✅";
  //     return "💰";
  //   };

  // Helper function to get progress color based on order
  const getProgressColor = (order, totalSteps) => {
    const colors = ["#28a745", "#007bff", "#ffc107", "#dc3545", "#6f42c1"];
    return colors[(order - 1) % colors.length];
  };

  return (
    <div className="payment-plans-container">
      {/* Plan Tabs */}
      <div className="plan-tabs mb-4">
        <div className="d-flex flex-wrap gap-2">
          {plans.map((plan, index) => (
            <button
              key={index}
              className={`btn ${
                activePlan === index ? "btn-primary" : "btn-outline-primary"
              } plan-tab`}
              onClick={() => setActivePlan(index)}
              style={{
                borderRadius: "25px",
                padding: "8px 20px",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
            >
              {plan.Plan_name}
              {plan.months_after_handover > 0 && (
                <small
                  className="d-block"
                  style={{ fontSize: "11px", opacity: 0.8 }}
                >
                  {plan.months_after_handover} months after handover
                </small>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active Plan Details */}
      {plans[activePlan] && (
        <div className="active-plan">
          <div className="row">
            <div className="col-md-12">
              <div
                className="payment-plan-card"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "12px",
                  padding: "24px",
                  border: "1px solid #e9ecef",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 text-dark">
                    {plans[activePlan].Plan_name}
                  </h5>
                  {plans[activePlan].months_after_handover > 0 && (
                    <span
                      className="badge bg-info text-white"
                      style={{ borderRadius: "20px" }}
                    >
                      {plans[activePlan].months_after_handover} months
                      post-handover
                    </span>
                  )}
                </div>

                {/* Payment Steps */}
                <div className="payment-steps">
                  {plans[activePlan].Payments.map(
                    (paymentGroup, groupIndex) => (
                      <div key={groupIndex}>
                        {paymentGroup.map((payment, paymentIndex) => (
                          <div
                            key={paymentIndex}
                            className="payment-step mb-3"
                            style={{
                              backgroundColor: "white",
                              borderRadius: "10px",
                              padding: "20px",
                              border: "1px solid #e9ecef",
                              position: "relative",
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow =
                                "0 4px 12px rgba(0,0,0,0.1)";
                              e.currentTarget.style.transform =
                                "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.transform = "translateY(0)";
                            }}
                          >
                            <div className="d-flex align-items-center">
                              {/* Step Number & Icon */}
                              <div
                                className="step-indicator me-3"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                  backgroundColor: getProgressColor(
                                    payment.Order,
                                    plans[activePlan].Payments.length
                                  ),
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "white",
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                  flexShrink: 0,
                                }}
                              >
                                {payment.Order}
                              </div>

                              {/* Payment Details */}
                              <div className="payment-details flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start">
                                  <div>
                                    <h6 className="mb-1 text-dark d-flex align-items-center">
                                      {/* <span
                                        className="me-2"
                                        style={{ fontSize: "18px" }}
                                      >
                                        {getPaymentIcon(payment.Payment_time)}
                                      </span> */}
                                      {payment.Payment_time}
                                    </h6>
                                    <p
                                      className="mb-0 text-muted"
                                      style={{ fontSize: "14px" }}
                                    >
                                      Step {payment.Order} of{" "}
                                      {plans[activePlan].Payments.length}
                                    </p>
                                  </div>
                                  <div className="text-end">
                                    <div
                                      className="payment-percentage"
                                      style={{
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: getProgressColor(
                                          payment.Order,
                                          plans[activePlan].Payments.length
                                        ),
                                      }}
                                    >
                                      {payment.Percent_of_payment}%
                                    </div>
                                    <small className="text-muted">
                                      of total price
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-3">
                              <div
                                className="progress"
                                style={{ height: "6px", borderRadius: "3px" }}
                              >
                                <div
                                  className="progress-bar"
                                  style={{
                                    width: `${payment.Percent_of_payment}%`,
                                    backgroundColor: getProgressColor(
                                      payment.Order,
                                      plans[activePlan].Payments.length
                                    ),
                                    borderRadius: "3px",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>

                {/* Plan Summary */}
                <div
                  className="plan-summary mt-4 p-3"
                  style={{
                    backgroundColor: "#e3f2fd",
                    borderRadius: "8px",
                    border: "1px solid #bbdefb",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary">Total Payment:</span>
                    <span
                      className="fw-bold text-primary"
                      style={{ fontSize: "18px" }}
                    >
                      {plans[activePlan].Payments.reduce(
                        (total, group) =>
                          total +
                          group.reduce(
                            (groupTotal, payment) =>
                              groupTotal + parseInt(payment.Percent_of_payment),
                            0
                          ),
                        0
                      )}
                      %
                    </span>
                  </div>
                  <small className="text-muted mt-1 d-block">
                    Payment schedule spread across{" "}
                    {plans[activePlan].Payments.length} milestones
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .plan-tab:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          color: #f1f3f4 !important; /* Bootstrap primary blue */
        }
        .btn-primary.plan-tab {
          color: #fff !important; /* Text color for active tab */
        }
        .payment-step {
          transition: all 0.3s ease;
        }

        .step-indicator {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .progress {
          background-color: #f1f3f4;
        }
      `}</style>
    </div>
  );
};

export default PaymentPlans;
