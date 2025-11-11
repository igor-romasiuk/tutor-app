"use client"

import { addLesson } from "@/lib/store/scheduleSlice"
import { RootState } from "@/lib/store/store"
import { Lesson } from "@/types/lesson"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ModalContainer } from "@/components/ui/ModalContainer"

export default function AddLessonModal({ onClose }: { onClose: () => void }) {
  const [selectedStudentId, setSelectedStudentId] = useState("")
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [subject, setSubject] = useState("")
  const [notes, setNotes] = useState("")

  const students = useSelector((state: RootState) => state.students.students)
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedStudentId || !date || !startTime || !endTime || !subject) {
      alert("Please fill in all required fields")
      return
    }

    const newLesson: Lesson = {
      id: "",
      studentId: selectedStudentId,
      date,
      startTime,
      endTime,
      subject,
      notes,
      status: "scheduled",
    }

    dispatch(addLesson(newLesson))
    onClose()
  }

  return (
    <ModalContainer title="Add Lesson" onClose={onClose}>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Student */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student *
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
          >
            <option value="">Select student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <input
            type="date"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time *
            </label>
            <input
              type="time"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time *
            </label>
            <input
              type="time"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject *
          </label>
          <input
            type="text"
            placeholder="Subject"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            placeholder="Optional notes"
            className="w-full min-h-[80px] rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 
                       hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 
                       transition shadow-sm"
          >
            Save Lesson
          </button>
        </div>
      </form>
    </ModalContainer>
  )
}
