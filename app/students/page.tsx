'use client'

import { useSelector } from 'react-redux'
import type { RootState } from '@/lib/store/store'
import StudentCard from '@/components/StudentCard'

export default function StudentsPage() {
  const students = useSelector((state: RootState) => state.students.students)
  const lessons = useSelector((state: RootState) => state.schedule.lessons)

  const getLessonsCount = (studentId: string) => {
    return lessons.filter(lesson => lesson.studentId === studentId).length
  }

  const handleEdit = (studentId: string) => {
    console.log('Edit student:', studentId)
  }

  const handleDelete = (studentId: string) => {
    console.log('Delete student:', studentId)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Students</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Add New Student
        </button>
      </div>

      {students.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
          <p className="text-lg text-gray-500 mb-4">No students yet</p>
          <p className="text-sm text-gray-400 mb-6">Get started by adding your first student</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Add First Student
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              lessonsCount={getLessonsCount(student.id)}
              onEdit={() => handleEdit(student.id)}
              onDelete={() => handleDelete(student.id)}
            />
          ))}
        </div>
      )}
    </main>
  )
}