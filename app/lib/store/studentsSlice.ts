import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Student } from '@/types/student'

interface StudentState {
    students: Student[]
    loading: boolean
    error: string | null
}

const initialState: StudentState = {
    students: [],
    loading: false,
    error: null
}

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        addStudent: (state, action: PayloadAction<Student>) => {
            const newStudent = { ...action.payload}

            if (!newStudent.id || newStudent.id === '') {
                newStudent.id = Date.now().toString()
            }

            state.students.push(newStudent)
        },
        updateStudent: (state, action: PayloadAction<Student>) => {
            const index = state.students.findIndex(
                student => student.id === action.payload.id
            )

            if (index !== -1) {
                state.students[index] = action.payload
            }
        },
        deleteStudent: (state, action: PayloadAction<string>) => {
            state.students = state.students.filter(
                student => student.id !== action.payload
            )
        }
    }
})

export const { addStudent, updateStudent, deleteStudent } = studentsSlice.actions
export default studentsSlice.reducer