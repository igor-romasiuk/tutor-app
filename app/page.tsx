'use client'

import { useSelector } from 'react-redux'
import type { RootState } from '@/lib/store/store'
import StatisticCard from "./components/StatisticCard"
import UpcomingLessons from "./components/UpcomingLessons"
import QuickActions from "./components/QuickActions"
import { getWeekRange, findNextLesson, formatLessonDateTime, getUpcomingLessons } from '@/lib/utils/dateUtils'
import PageContainer from "@/components/ui/PageContainer"
import SectionTitle from "@/components/ui/SectionTitle"
import { useEffect, useState } from "react"

export default function Home() {
  const students = useSelector((state: RootState) => state.students.students)
  const lessons = useSelector((state: RootState) => state.schedule.lessons)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  let statsSection = <span className="sr-only">Loading stats…</span>

  if (mounted) {
    const { start: startOfWeek, end: endOfWeek } = getWeekRange()
    const todayDateStr = new Date().toISOString().split('T')[0]
    const lessonsThisWeek = lessons.filter(l => {
      const lessonDate = new Date(l.date)
      return lessonDate >= startOfWeek && lessonDate <= endOfWeek
    })
    const nextLesson = findNextLesson(lessons)
    const nextLessonText = nextLesson ? formatLessonDateTime(nextLesson.date, nextLesson.startTime) : 'None'
    const nextLessonStudent = nextLesson ? students.find(s => s.id === nextLesson.studentId)?.name || 'Student' : null
    const lessonsToday = lessons.filter(l => l.date === todayDateStr).length
    const upcomingLessons = getUpcomingLessons(lessons, 5)

    statsSection = (
      <>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2">
            <UpcomingLessons lessons={upcomingLessons} students={students} />
          </div>
          <QuickActions />
        </div>
      </>
    )
  }

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-gray-900 mb-10 tracking-tight">Dashboard</h1>
      <section className="mb-12">
        <SectionTitle>Statistics</SectionTitle>
        {statsSection}
      </section>
    </PageContainer>
  )
}
