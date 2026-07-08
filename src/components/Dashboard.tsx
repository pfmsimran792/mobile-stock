interface DashboardProps {
  totalProducts: number;
  totalStock: number;
  totalSold: number;
  totalAvailable: number;
  lowStockCount: number;
  outOfStockCount: number;
}

function Dashboard({
  totalProducts,
  totalStock,
  totalSold,
  totalAvailable,
  lowStockCount,
  outOfStockCount,
}: DashboardProps) {
  const cards = [
    {
      title: "Products",
      value: totalProducts,
      color: "bg-blue-500",
      icon: "📦",
    },
    {
      title: "Total Stock",
      value: totalStock,
      color: "bg-green-500",
      icon: "📱",
    },
    {
      title: "Sold",
      value: totalSold,
      color: "bg-purple-500",
      icon: "💰",
    },
    {
      title: "Available",
      value: totalAvailable,
      color: "bg-indigo-500",
      icon: "✅",
    },
    {
      title: "Low Stock",
      value: lowStockCount,
      color: "bg-yellow-500",
      icon: "⚠️",
    },
    {
      title: "Out of Stock",
      value: outOfStockCount,
      color: "bg-red-500",
      icon: "❌",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} text-white rounded-xl shadow-lg p-5`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div className="text-4xl">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;