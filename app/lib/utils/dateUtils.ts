import type { Lesson } from '@/types/lesson'

export const getWeekRange = () => {
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - today.getDay())
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return { start, end }
}

export const findNextLesson = (lessons: Lesson[]) => {
  const now = new Date()
  return lessons
    .filter(lesson => new Date(`${lesson.date}T${lesson.startTime}`) > now)
    .sort((a, b) => 
      new Date(`${a.date}T${a.startTime}`).getTime() - 
      new Date(`${b.date}T${b.startTime}`).getTime()
    )[0]
}

export const formatLessonDateTime = (date: string, time: string) => {
  return `${new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' })} ${time}`
}
