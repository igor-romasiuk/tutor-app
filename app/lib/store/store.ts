import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from '@/lib/store/studentsSlice'
import scheduleReducer from '@/lib/store/scheduleSlice'

const store = configureStore({
    reducer: {
        students: studentsReducer,
        schedule: scheduleReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatсh = typeof store.dispatch
export default store