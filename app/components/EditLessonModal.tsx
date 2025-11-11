"use client"

import { useState, useEffect } from "react"
import { Lesson } from "@/types/lesson"
import { ModalContainer } from "@/components/ui/ModalContainer"

export default function EditLessonModal({
  lesson,
  onSave,
  onClose,
}: {
  lesson: Lesson | null
  onSave: (lesson: Lesson) => void
  onClose: () => void
}) {
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [subject, setSubject] = useState("")
  const [notes, setNotes] = useState("")
  const [status, setStatus] = useState<Lesson["status"]>("scheduled")

  useEffect(() => {
    if (lesson) {
      setDate(lesson.date)
      setStartTime(lesson.startTime)
      setEndTime(lesson.endTime)
      setSubject(lesson.subject)
      setNotes(lesson.notes)
      setStatus(lesson.status)
    }
  }, [lesson])

  if (!lesson) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...lesson, date, startTime, endTime, subject, notes, status })
    onClose()
  }

  return (
    <ModalContainer title="Edit Lesson" onClose={onClose}>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input label="Date" type="date" value={date} onChange={setDate} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Start Time" type="time" value={startTime} onChange={setStartTime} />
          <Input label="End Time" type="time" value={endTime} onChange={setEndTime} />
        </div>
        <Input label="Subject" value={subject} onChange={setSubject} />
        <Input label="Notes" value={notes} onChange={setNotes} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Lesson["status"])}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </ModalContainer>
  )
}

const Input = ({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
    />
  </div>
)
