'use client'

import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/lib/store/store'
import StudentCard from '@/components/StudentCard'
import { useEffect, useState } from 'react'
import AddStudentModal from '@/components/AddStudentModal'
import { deleteStudent, updateStudent } from '@/lib/store/studentsSlice'
import { Student } from '@/types/student'
import EditStudentModal from '@/components/EditStudentModal'


export default function StudentsPage() {
  const students = useSelector((state: RootState) => state.students.students)
  const lessons = useSelector((state: RootState) => state.schedule.lessons)
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [editStudent, setEditStudent] = useState<Student | null>(null)
  const [searchStudent, setSearchStudent] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchStudent.trim().toLowerCase())

      return clearTimeout(timeout)
    },300)
  }, [searchStudent])
  
  const filteredStudents = students.filter((student) => {
    if (!debouncedQuery) return true

    const filteredStudent = student.name.trim().toLowerCase()

    return filteredStudent.includes(debouncedQuery)
  })

  const getLessonsCount = (studentId: string) => {
    return lessons.filter(lesson => lesson.studentId === studentId).length
  }

  const handleDelete = (id: string) => {
    dispatch(deleteStudent(id))
  }

  const handleEdit = (student: Student) => {
    setEditStudent(student)
  }

  const handleSaveEdit = (student: Student) => {
    dispatch(updateStudent(student))

    setEditStudent(null)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Students</h1>

        <input
          type="text"
          placeholder='Search...'
          value={searchStudent}
          onChange={(e) => setSearchStudent(e.target.value)}
          className="w-64 px-3 py-2 border border-gray-300 rounded-lg shadow-sm
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
             text-gray-700 placeholder-gray-400 transition"
        />

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          onClick={() => setShowModal(true)}
        >
          Add New Student
        </button>

        {showModal && <AddStudentModal onClose={() => setShowModal(false)} />}
      </div>

      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
          <p className="text-lg text-gray-500 mb-4">No students yet</p>
          <p className="text-sm text-gray-400 mb-6">Get started by adding your first student</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Add First Student
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              lessonsCount={getLessonsCount(student.id)}
              onDelete={() => handleDelete(student.id)}
              onEdit={() => handleEdit(student)}
            />
          ))}
        </div>
      )}
        {editStudent && <EditStudentModal student={editStudent} onSave={handleSaveEdit} onClose={() => setEditStudent(null)} />}
    </main>
  )
}