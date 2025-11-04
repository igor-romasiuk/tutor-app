import { useState } from "react"
import { addStudent } from "@/lib/store/studentsSlice"
import { useDispatch } from "react-redux"

export default function AddStudentModal({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [notes, setNotes] = useState('')
    const [errors, setErrors] = useState({name:'',email: '',phone: ''})

    const dispatch = useDispatch()

    const newStudent = {
        id: '',
        name,
        email,
        phone: Number(phone),
        notes,
        createdAt: new Date().toISOString()
    }

    const newErrors = {name:'',email: '',phone: '',notes: ''}

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose()
    }

    const validateForm = () =>  {
        if (!name.trim()) newErrors.name = "Name is required"
        if (!email.trim()) newErrors.email = "Email is required";
        if (!email.includes('@')) newErrors.email = "Email is invalid";
        if (!phone || !/^\d+$/.test(phone)) newErrors.phone = "Phone needs digits only"

        return newErrors
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const foundErrors = validateForm()

        if (foundErrors.name || foundErrors.email || foundErrors.phone) {
            setErrors(foundErrors)

            return
        }

        dispatch(addStudent(newStudent))

        onClose()

        setName('');
        setEmail('');
        setPhone('');
        setNotes('');
        setErrors({name:'',email: '',phone: ''});
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
        >
            <div className="relative w-full max-w-md mx-4 drop-shadow-2xl animate-pop-in">
                <div className="absolute top-0 left-0 w-full h-2 rounded-t-xl bg-gradient-to-r from-blue-500 via-sky-400 to-blue-400" />

                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 p-2 text-gray-400 hover:text-gray-700 focus:outline-none"
                    aria-label="Закрити"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <form
                    className="bg-white rounded-xl border border-gray-200 p-8 pt-8 shadow-lg w-full space-y-5 relative"
                    onClick={e => e.stopPropagation()}
                    action="post"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col items-center mb-2">
                        <span className="inline-block bg-blue-100 rounded-full p-3 mb-2">
                            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 14a4 4 0 10-8 0m8 0v2a4 4 0 01-4 4 4 4 0 01-4-4v-2m8 0a4 4 0 00-8 0"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center tracking-tight">Add Student</h2>
                    </div>
                    <div>
                        <label className="block text-base text-gray-700 mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            placeholder="Enter student's name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-md border focus:outline-none focus:ring-2 transition placeholder-gray-300 text-gray-900 bg-gray-50 ${errors.name ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-200'}`}
                        />
                        {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name}</span>}
                    </div>
                    <div>
                        <label className="block text-base text-gray-700 mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-md border focus:outline-none focus:ring-2 transition placeholder-gray-300 text-gray-900 bg-gray-50 ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-200'}`}
                        />
                        {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>}
                    </div>
                    <div>
                        <label className="block text-base text-gray-700 mb-1 font-medium">Phone</label>
                        <input
                            type="tel"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-md border focus:outline-none focus:ring-2 transition placeholder-gray-300 text-gray-900 bg-gray-50 ${errors.phone ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-200'}`}
                        />
                        {errors.phone && <span className="text-red-500 text-sm mt-1 block">{errors.phone}</span>}
                    </div>
                    <div>
                        <label className="block text-base text-gray-700 mb-1 font-medium">Notes</label>
                        <input
                            type="text"
                            placeholder="Optional notes for this student"
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 transition placeholder-gray-300 text-gray-900 bg-gray-50"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full py-2.5 mt-1 bg-gradient-to-r from-blue-500 via-sky-500 to-blue-400 shadow hover:from-blue-600 hover:to-blue-500 font-semibold text-white rounded-lg text-base transition-colors"
                    >
                        Close
                    </button>

                    <button
                        type="submit"
                        className="w-full py-2.5 mt-2 bg-gradient-to-r from-green-500 via-emerald-400 to-lime-400 shadow-lg font-semibold text-white text-base rounded-lg transition-all duration-200 hover:from-green-600 hover:to-green-400 focus:outline-none active:scale-95 border-none ring-2 ring-transparent focus:ring-green-300"
                    >
                        Add Student
                    </button>
                </form>
            </div>
        </div>
    )
}