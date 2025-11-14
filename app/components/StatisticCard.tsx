type StatisticCardProps = {
    title: string
    value: string | number
    description?: string
  }
  
  export default function StatisticCard({ title, value, description }: StatisticCardProps) {
    return (
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
        <div className="text-3xl font-bold text-card-foreground mb-1 tracking-tight">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
      </div>
    )
  }
  