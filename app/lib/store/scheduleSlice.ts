import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Lesson } from '@/types/lesson'

interface ScheduleState {
    lessons: Lesson[]
    loading: boolean
    error: string | null
}

const initialState: ScheduleState = {
    lessons: [],
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
        },
        updateLesson: (state, action: PayloadAction<Lesson>) => {
            const index = state.lessons.findIndex(
                student => student.id === action.payload.id
            )

            if (index !== -1) {
                state.lessons[index] = action.payload
            }
        },
        deleteLesson: (state, action: PayloadAction<string>) => {
            state.lessons = state.lessons.filter(
                lesson => lesson.id !== action.payload
            )
        }
    }
})

export const { addLesson, updateLesson, deleteLesson } = scheduleSlice.actions
export default scheduleSlice.reducer