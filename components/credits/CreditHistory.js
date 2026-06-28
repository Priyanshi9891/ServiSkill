"use client";

export default function CreditHistory({
  transactions,
}) {
  return (
    <div className="space-y-3">

      {transactions.map((item) => (
        <div
          key={item._id}
          className="bg-white p-4 rounded shadow"
        >
          <p>{item.reason}</p>

          <p>
            {item.type === "Earned"
              ? "+"
              : "-"}
            {item.amount}
          </p>
        </div>
      ))}

    </div>
  );
}