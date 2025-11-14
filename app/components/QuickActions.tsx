"use client"

import { useState } from "react"
import AddLessonModal from "./AddLessonModal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function QuickActions() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <Button className="w-full" variant="default">
          Add New Student
        </Button>
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setIsModalOpen(true)}>
          Add New Lesson
        </Button>
        {isModalOpen && <AddLessonModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </Card>
  )
}
