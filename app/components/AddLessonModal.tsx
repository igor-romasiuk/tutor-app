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
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Student *
          </label>
          <select
            className="w-full rounded-lg border border-border bg-input px-3 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition"
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

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Date *
          </label>
          <input
            type="date"
            className="w-full rounded-lg border border-border bg-input px-3 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Start Time *
            </label>
            <input
              type="time"
              className="w-full rounded-lg border border-border bg-input px-3 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              End Time *
            </label>
            <input
              type="time"
              className="w-full rounded-lg border border-border bg-input px-3 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Subject *
          </label>
          <input
            type="text"
            placeholder="Subject"
            className="w-full rounded-lg border border-border bg-input px-3 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Notes
          </label>
          <textarea
            placeholder="Optional notes"
            className="w-full min-h-[80px] rounded-lg border border-border bg-input px-3 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:bg-muted transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition shadow-sm"
          >
            Save Lesson
          </button>
        </div>
      </form>
    </ModalContainer>
  )
}
