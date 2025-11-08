import { useState } from "react"
import AddLessonModal from "./AddLessonModal"

export default function QuickActions() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Add New Student
        </button>
        <button
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Lesson
        </button>

        {isModalOpen && <AddLessonModal onClose={() => setIsModalOpen(!isModalOpen)} />}
      </div>
    </div>
  )
}
