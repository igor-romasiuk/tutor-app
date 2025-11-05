import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Student } from '@/types/student'

interface StudentState {
    students: Student[]
    loading: boolean
    error: string | null
}

const testStudents: Student[] = [
    {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: 380501234567,
        notes: 'Quick learner, needs help with algebra',
        createdAt: '2024-01-15T10:00:00Z'
    },
    {
        id: '2',
        name: 'Emma Wilson',
        email: 'emma.wilson@example.com',
        phone: 380507654321,
        notes: 'Excellent student, preparing for exams',
        createdAt: '2024-01-20T14:30:00Z'
    },
    {
        id: '3',
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        phone: 380509876543,
        notes: 'Struggling with grammar, needs extra practice',
        createdAt: '2024-02-01T09:15:00Z'
    },
    {
        id: '4',
        name: 'Sophia Davis',
        email: 'sophia.davis@example.com',
        phone: 380503456789,
        notes: 'Advanced level, working on conversation skills',
        createdAt: '2024-02-10T11:00:00Z'
    }
]

const loadStudentsFromLocalStorage = () => {
    const studentsFromLocalStorage = localStorage.getItem('students')

    if (!studentsFromLocalStorage) {
        return testStudents
    }

    try {
        return JSON.parse(studentsFromLocalStorage)
    } catch (error) {
        return testStudents
    }
}

const initialState: StudentState = {
    students: loadStudentsFromLocalStorage(),
    loading: false,
    error: null
}

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        addStudent: (state, action: PayloadAction<Omit<Student, 'id'> & { id?: string }>) => {
            const newStudent = { ...action.payload}

            if (!newStudent.id || newStudent.id === '') {
                newStudent.id = Date.now().toString()
            }

            state.students.push(newStudent as Student)

            localStorage.setItem('students', JSON.stringify(state.students))
        },
        updateStudent: (state, action: PayloadAction<Student>) => {
            const index = state.students.findIndex(student => student.id === action.payload.id)

            if (index !== -1) {
                state.students[index] = action.payload
            }

            localStorage.setItem('students', JSON.stringify(state.students))
        },
        deleteStudent: (state, action: PayloadAction<string>) => {
            state.students = state.students.filter((student) => student.id !== action.payload)

            localStorage.setItem('students', JSON.stringify(state.students))
        }
    }
})

export const { addStudent, updateStudent, deleteStudent } = studentsSlice.actions
export default studentsSlice.reducer