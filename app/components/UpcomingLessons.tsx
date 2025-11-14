import type { Lesson } from '@/types/lesson'
import type { Student } from '@/types/student'
import { formatLessonDateTime } from '@/lib/utils/dateUtils'

type UpcomingLessonsProps = {
  lessons: Lesson[]
  students: Student[]
  limit?: number
}

export default function UpcomingLessons({ lessons, students, limit = 5 }: UpcomingLessonsProps) {
  if (lessons.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Upcoming Lessons</h3>
        <p className="text-muted-foreground text-sm">No upcoming lessons scheduled</p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Upcoming Lessons</h3>
      <div className="space-y-3">
        {lessons.slice(0, limit).map((lesson) => {
          const student = students.find(s => s.id === lesson.studentId)
          return (
            <div
              key={lesson.id}
              className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium text-card-foreground">
                    {formatLessonDateTime(lesson.date, lesson.startTime)}
                  </span>
                  <span className="text-sm text-muted-foreground">{lesson.endTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {student?.name || 'Unknown Student'}
                  </span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted">{lesson.subject}</span>
                </div>
                {lesson.notes && (
                  <p className="text-xs text-muted-foreground mt-1">{lesson.notes}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
