import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Lesson } from '@/types/lesson'

interface ScheduleState {
    lessons: Lesson[]
    loading: boolean
    error: string | null
}

const getDateString = (daysFromToday: number): string => {
    const date = new Date()
    date.setDate(date.getDate() + daysFromToday)
    return date.toISOString().split('T')[0]
}

const testLessons: Lesson[] = [
    {
        id: '1',
        studentId: '1',
        date: getDateString(0),
        startTime: '14:00',
        endTime: '15:00',
        subject: 'Mathematics',
        notes: 'Algebra basics',
        status: 'scheduled'
    },
    {
        id: '2',
        studentId: '2',
        date: getDateString(0),
        startTime: '16:00',
        endTime: '17:00',
        subject: 'English',
        notes: 'Grammar review',
        status: 'scheduled'
    },
    {
        id: '3',
        studentId: '3',
        date: getDateString(0),
        startTime: '18:00',
        endTime: '19:00',
        subject: 'English',
        notes: 'Speaking practice',
        status: 'scheduled'
    },
    {
        id: '4',
        studentId: '1',
        date: getDateString(2),
        startTime: '15:00',
        endTime: '16:00',
        subject: 'Mathematics',
        notes: 'Geometry',
        status: 'scheduled'
    },
    {
        id: '5',
        studentId: '4',
        date: getDateString(3),
        startTime: '10:00',
        endTime: '11:00',
        subject: 'English',
        notes: 'Conversation practice',
        status: 'scheduled'
    },
    {
        id: '6',
        studentId: '2',
        date: getDateString(4),
        startTime: '14:30',
        endTime: '15:30',
        subject: 'English',
        notes: 'Exam preparation',
        status: 'scheduled'
    },
    {
        id: '7',
        studentId: '3',
        date: getDateString(7),
        startTime: '16:00',
        endTime: '17:00',
        subject: 'English',
        notes: 'Writing skills',
        status: 'scheduled'
    },
    {
        id: '8',
        studentId: '4',
        date: getDateString(10),
        startTime: '11:00',
        endTime: '12:00',
        subject: 'English',
        notes: 'Advanced conversation',
        status: 'scheduled'
    }
]

const loadLessons = () => {
    const stored = localStorage.getItem('lessons')

    if (stored) {
        return JSON.parse(stored)
    }

    return testLessons
}

const initialState: ScheduleState = {
    lessons: loadLessons(),
    loading: false,
    error: null
}

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        addLesson: (state, action: PayloadAction<Lesson>) => {
            const newLesson = { ...action.payload}

            if (!newLesson.id || newLesson.id === '') {
                newLesson.id = Date.now().toString()
            }

            state.lessons.push(newLesson)
            localStorage.setItem('lessons', JSON.stringify(state.lessons))
        },
        updateLesson: (state, action: PayloadAction<Lesson>) => {
            const index = state.lessons.findIndex(
                student => student.id === action.payload.id
            )

            if (index !== -1) {
                state.lessons[index] = action.payload

                localStorage.setItem('lessons', JSON.stringify(state.lessons))
            }
        },
        deleteLesson: (state, action: PayloadAction<string>) => {
            state.lessons = state.lessons.filter(
                lesson => lesson.id !== action.payload
            )

            localStorage.setItem('lessons', JSON.stringify(state.lessons))
        }
    }
})

export const { addLesson, updateLesson, deleteLesson } = scheduleSlice.actions
export default scheduleSlice.reducer