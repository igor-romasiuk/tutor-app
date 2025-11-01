import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from '@/lib/store/studentsSlice'
import scheduleReducer from '@/lib/store/scheduleSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            students: studentsReducer,
            schedule: scheduleReducer
        }
    })
}

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>
export type AppDispatch = ReturnType<typeof makeStore>['dispatch']