import { ReactNode } from "react"

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f9fafb] px-6 py-10">
      <div className="max-w-6xl mx-auto">{children}</div>
    </main>
  )
}
