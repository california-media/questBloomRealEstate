import React, { useState } from "react";

const PaymentPlans = ({ payment_plans }) => {
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

  const formatEOI = (plan) => {
    const payments = plan.Payments[0] || [];
    const ranges = payments.map((p) => `${p.Percent_of_payment}%`);
    return ranges.join(", ");
  };

  return (
    <div className="container-fluid ">
      <div className="row g-3">
        {plans.map((plan, index) => (
          <div key={index} className="col-md-6">
            <div
              className="card h-100"
              style={{
                border: "none",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
              }}
            >
              <div className="card-body" style={{ padding: "20px" }}>
                {/* Header with Icon and Title */}
                <div className="d-flex align-items-center mb-3">
                  <img
                    className="me-3"
                    src="/images/pie-chart.svg"
                    style={{
                      width: "35px",
                      height: "35px",
                      backgroundColor: "#ffc107",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  ></img>
                  <h4
                    className="mb-0 "
                    style={{
                      fontSize: "18px",
                      color: "#333333",
                      lineHeight: "1.2",
                    }}
                  >
                    {plan.Plan_name}
                  </h4>
                </div>

                {/* Payment Steps */}
                {plans.map((plan, index) => (
                  <div key={index}>
                    {/* Payment Steps */}
                    <div className="mb-2">
                      {plan.Payments.flat().map((payment, paymentIndex) => (
                        <div
                          key={paymentIndex}
                          className="d-flex justify-content-between align-items-center"
                          style={{
                            marginBottom:
                              paymentIndex === plan.Payments.flat().length - 1
                                ? "0"
                                : "12px",
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <span
                              className="fw-semibold me-2"
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                minWidth: "30px",
                              }}
                            >
                              {payment.Percent_of_payment}%
                            </span>
                            <span
                              style={{
                                fontSize: "14px",
                                color: "#777777",
                                fontWeight: "400",
                              }}
                            >
                              payment
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: "14px",
                              color: "#777777",
                              fontWeight: "400",
                              textAlign: "right",
                            }}
                          >
                            {payment.Payment_time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <hr className="text-muted h-1" />
                {/* EOI Section */}
                <div className="mb-1">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span
                      className="fw-semibold"
                      style={{
                        fontSize: "14px",
                        color: "#333333",
                      }}
                    >
                      EOI
                    </span>
                    <span
                      className="fw-semibold"
                      style={{
                        fontSize: "14px",
                        color: "#333333",
                      }}
                    >
                      {formatEOI(plan)}
                    </span>
                  </div>
                </div>

                {/* Conditions Section */}
                <div>
                  <div className="d-flex justify-content-between align-items-baseline">
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#777777",
                        fontWeight: "400",
                        lineHeight: "1.4",
                      }}
                    >
                      Conditions for the unit resale
                    </span>
                    <span
                      className="fw-semibold"
                      style={{
                        fontSize: "14px",
                        color: "#333333",
                        textAlign: "right",
                        marginLeft: "12px",
                      }}
                    >
                      {plan.months_after_handover > 0
                        ? `${plan.months_after_handover} months after handover`
                        : "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPlans;
