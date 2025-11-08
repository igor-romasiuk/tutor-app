"use client"

import { addLesson } from "@/lib/store/scheduleSlice"
import { RootState } from "@/lib/store/store"
import { Lesson } from "@/types/lesson"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function AddLessonModal({ onClose }: { onClose: () => void }) {
    const [selectedStudentId, setSelectedStudentId] = useState('')
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [subject, setSubject] = useState("")
    const [notes, setNotes] = useState("")

    const students = useSelector((state: RootState) => state.students.students)
    const dispatch = useDispatch()

    const resetForm = () => {
        setSelectedStudentId("")
        setDate("")
        setStartTime("")
        setEndTime("")
        setSubject("")
        setNotes("")
    }

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
            status: 'scheduled'
        }

        dispatch(addLesson(newLesson))
        resetForm()
        onClose()
    }

    const handleClose = () => {
        resetForm()
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Lesson</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Student *</label>
                        <select
                            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            value={selectedStudentId}
                            onChange={(e) => setSelectedStudentId(e.target.value)}
                        >
                            <option value="">Select student</option>
                            {students.map((student) => (
                                <option value={student.id} key={student.id}>
                                    {student.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Date *</label>
                        <input
                            type="date"
                            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Start Time *</label>
                            <input
                                type="time"
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">End Time *</label>
                            <input
                                type="time"
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Subject *</label>
                        <input
                            type="text"
                            placeholder="Subject"
                            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                            placeholder="Optional notes"
                            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            Save Lesson
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
