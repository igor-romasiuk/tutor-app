import { ReactNode } from "react"

export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl font-semibold text-gray-800 mb-5 tracking-tight">
      {children}
    </h2>
  )
}
