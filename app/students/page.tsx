'use client'

import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/lib/store/store'
import StudentCard from '@/components/StudentCard'
import { useEffect, useState } from 'react'
import AddStudentModal from '@/components/AddStudentModal'
import { deleteStudent, updateStudent } from '@/lib/store/studentsSlice'
import { Student } from '@/types/student'
import EditStudentModal from '@/components/EditStudentModal'
import PageContainer from "@/components/ui/PageContainer"
import SectionTitle from "@/components/ui/SectionTitle"
import { Button } from "@/components/ui/button"

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
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchStudent])
  
  const filteredStudents = students.filter(student =>
    !debouncedQuery || student.name.trim().toLowerCase().includes(debouncedQuery)
  )

  const getLessonsCount = (studentId: string) =>
    lessons.filter(lesson => lesson.studentId === studentId).length

  const handleDelete = (id: string) => dispatch(deleteStudent(id))
  const handleEdit = (student: Student) => setEditStudent(student)
  const handleSaveEdit = (student: Student) => {
    dispatch(updateStudent(student))
    setEditStudent(null)
  }

  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Students</h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
            className="px-3 py-2 w-64 rounded-md border border-gray-300 shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              text-gray-700 placeholder-gray-400 transition"
          />
          <Button onClick={() => setShowModal(true)}>Add Student</Button>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center shadow-sm">
          <p className="text-lg text-gray-600 mb-3">No students yet</p>
          <p className="text-sm text-gray-400 mb-6">Get started by adding your first student</p>
          <Button onClick={() => setShowModal(true)}>Add First Student</Button>
        </div>
      ) : (
        <>
          <SectionTitle>All Students</SectionTitle>
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
        </>
      )}

      {showModal && <AddStudentModal onClose={() => setShowModal(false)} />}
      {editStudent && (
        <EditStudentModal
          student={editStudent}
          onSave={handleSaveEdit}
          onClose={() => setEditStudent(null)}
        />
      )}
    </PageContainer>
  )
}
