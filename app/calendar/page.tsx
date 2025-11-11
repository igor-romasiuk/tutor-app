"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, User, CalendarDays } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/store/store"
import { deleteLesson, updateLesson } from "@/lib/store/scheduleSlice"
import { getDaysArray } from "@/lib/utils/getDays"
import { getLessonsByDate, getLessonsInMonth } from "@/lib/utils/getLessons"
import { getMonthName, getNextMonth, getPrevMonth } from "@/lib/utils/monthNavigation"
import EditLessonModal from "@/components/EditLessonModal"
import { Lesson } from "@/types/lesson"
import PageContainer from "@/components/ui/PageContainer"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [editLesson, setEditLesson] = useState<Lesson | null>(null)

  const lessons = useSelector((state: RootState) => state.schedule.lessons)
  const students = useSelector((state: RootState) => state.students.students)
  const dispatch = useDispatch()

  const days = getDaysArray(currentDate)
  const lessonsInMonth = getLessonsInMonth(lessons, currentDate)
  const selectedDateSessions = getLessonsByDate(lessonsInMonth, selectedDate)
  const monthName = getMonthName(currentDate)

  const nextMonth = () => {
    setCurrentDate(getNextMonth(currentDate))
    setSelectedDate(null)
  }

  const prevMonth = () => {
    setCurrentDate(getPrevMonth(currentDate))
    setSelectedDate(null)
  }

  const handleDelete = (id: string) => dispatch(deleteLesson(id))
  const handleSaveEdit = (lesson: Lesson) => {
    dispatch(updateLesson(lesson))
    setEditLesson(null)
  }

  return (
    <PageContainer>
      <div className="flex items-center gap-3 mb-8">
        <CalendarDays className="w-7 h-7 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Calendar</h1>
      </div>
      <p className="text-gray-500 mb-10">
        Manage your upcoming lessons, track availability, and edit schedules.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT — MONTH GRID */}
        <Card className="p-6 lg:col-span-2 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">{monthName}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-3">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div
                key={day}
                className="text-center font-medium text-gray-500 text-sm py-1"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              const hasSessions =
                day && lessonsInMonth.some(l => new Date(l.date).getDate() === day)
              const isSelected = selectedDate === day

              return (
                <button
                  key={idx}
                  onClick={() => day && setSelectedDate(isSelected ? null : day)}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-all
                    ${
                      !day
                        ? "bg-transparent cursor-default"
                        : isSelected
                        ? "bg-blue-600 text-white shadow"
                        : hasSessions
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {day}
                  {hasSessions && <div className="text-xs mt-1">●</div>}
                </button>
              )
            })}
          </div>
        </Card>

        {/* RIGHT — LESSONS LIST */}
        <Card className="p-6 shadow-sm hover:shadow-md transition-shadow sticky top-8">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">
            {selectedDate
              ? `Sessions - ${monthName.split(" ")[0]} ${selectedDate}`
              : "Select a date"}
          </h3>

          {selectedDateSessions.length > 0 ? (
            <div className="space-y-4">
              {selectedDateSessions.map(session => {
                const student = students.find(s => s.id === session.studentId)
                return (
                  <div
                    key={session.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Clock className="w-4 h-4 text-blue-600" />
                        {session.startTime} - {session.endTime}
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {session.subject}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <User className="w-4 h-4 text-gray-500" />
                      {student?.name || "Unknown"}
                    </div>
                    <p className="text-xs text-gray-500">Notes: {session.notes}</p>

                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setEditLesson(session)
                          setIsOpenModal(true)
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleDelete(session.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : selectedDate ? (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 mb-4">No sessions scheduled</p>
              <Button className="w-full">Schedule Session</Button>
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-8">
              Click on a date to view sessions
            </p>
          )}
        </Card>

        {isOpenModal && (
          <EditLessonModal
            lesson={editLesson}
            onSave={handleSaveEdit}
            onClose={() => {
              setIsOpenModal(false)
              setEditLesson(null)
            }}
          />
        )}
      </div>
    </PageContainer>
  )
}
