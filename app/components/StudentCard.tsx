import type { Student } from '@/types/student'

type StudentCardProps = {
  student: Student
  lessonsCount?: number
  onEdit?: () => void
  onDelete?: () => void
}

export default function StudentCard({ student, lessonsCount = 0, onEdit, onDelete }: StudentCardProps) {
  const formatPhone = (phone: number) => {
    const s = phone.toString()
    return s.length === 10 ? `${s.slice(0,3)} ${s.slice(3,6)} ${s.slice(6,9)} ${s.slice(9)}` : s
  }

  const truncateNotes = (notes: string, maxLength: number = 80) =>
    notes.length <= maxLength ? notes : notes.slice(0, maxLength) + '...'

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
        {lessonsCount > 0 && (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
            {lessonsCount} {lessonsCount === 1 ? 'lesson' : 'lessons'}
          </span>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Email:</span>
          <span className="text-sm text-gray-900">{student.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Phone:</span>
          <span className="text-sm text-gray-900">{formatPhone(student.phone)}</span>
        </div>
        {student.notes && (
          <div className="pt-2">
            <p className="text-xs text-gray-500 mb-1">Notes:</p>
            <p className="text-sm text-gray-700">{truncateNotes(student.notes)}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
        <button
          onClick={onEdit}
          className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
