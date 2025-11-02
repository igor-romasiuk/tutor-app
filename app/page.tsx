'use client'

import { useSelector } from 'react-redux'
import type { RootState } from '@/lib/store/store'
import StatisticCard from "./components/StatisticCard"
import { getWeekRange, findNextLesson, formatLessonDateTime } from '@/lib/utils/dateUtils'

export default function Home() {
  const students = useSelector((state: RootState) => state.students.students)
  const lessons = useSelector((state: RootState) => state.schedule.lessons)

  const { start: startOfWeek, end: endOfWeek } = getWeekRange()
  const todayDateStr = new Date().toISOString().split('T')[0]

  const lessonsThisWeek = lessons.filter(lesson => {
    const lessonDate = new Date(lesson.date)
    return lessonDate >= startOfWeek && lessonDate <= endOfWeek
  })

  const nextLesson = findNextLesson(lessons)
  const nextLessonText = nextLesson ? formatLessonDateTime(nextLesson.date, nextLesson.startTime) : 'None'
  const nextLessonStudent = nextLesson ? students.find(s => s.id === nextLesson.studentId)?.name || 'Student' : null
  const lessonsToday = lessons.filter(lesson => lesson.date === todayDateStr).length

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatisticCard title="Total Students" value={students.length} description="Registered in system" />
          <StatisticCard title="Lessons This Week" value={lessonsThisWeek.length} description="Scheduled this week" />
          <StatisticCard 
            title="Next Lesson" 
            value={nextLessonText} 
            description={nextLesson ? `With ${nextLessonStudent}` : 'No upcoming lessons'} 
          />
          <StatisticCard title="Lessons Today" value={lessonsToday} description="Scheduled for today" />
        </div>
      </section>
    </main>
  )
}