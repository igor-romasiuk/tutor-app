import { Lesson } from "@/types/lesson"

export const getLessonsInMonth = (lessons: Lesson[], date: Date): Lesson[] =>
  lessons.filter(
    l =>
      new Date(l.date).getMonth() === date.getMonth() &&
      new Date(l.date).getFullYear() === date.getFullYear()
  )

export const getLessonsByDate = (
  lessonsInMonth: Lesson[],
  selectedDate: number | null
): Lesson[] =>
  selectedDate
    ? lessonsInMonth.filter(l => new Date(l.date).getDate() === selectedDate)
    : []
