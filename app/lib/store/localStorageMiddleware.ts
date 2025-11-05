import { MiddlewareAPI } from '@reduxjs/toolkit'
import type { UnknownAction, Dispatch } from '@reduxjs/toolkit'

export const localStorageMiddleware = (store: MiddlewareAPI) => {
    return (next: Dispatch<UnknownAction>) => {
        return (action: UnknownAction) => {
            const result = next(action)

            const actionsToSync = [
                'students/addStudent',
                'students/updateStudent',
                'students/deleteStudent'
            ]

            if (actionsToSync.includes(action.type)) {
                if (typeof window !== 'undefined') {
                    try {
                        const state = store.getState()
                        
                        localStorage.setItem('students', JSON.stringify(state.students.students))
                    } catch (error) {
                        console.error(error)
                    }
                }
            }

            return result
        }
    }
}