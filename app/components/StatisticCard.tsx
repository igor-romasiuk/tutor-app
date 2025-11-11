type StatisticCardProps = {
    title: string
    value: string | number
    description?: string
  }
  
  export default function StatisticCard({ title, value, description }: StatisticCardProps) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
        <div className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">{value}</div>
        {description && <p className="text-xs text-gray-500 mt-2">{description}</p>}
      </div>
    )
  }
  