import { useState } from "react"

export default function AddStudentModal({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [notes, setNotes] = useState('')

    return (
        <form action="post">
            <p>Name</p>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

            <p>Email</p>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <p>Phone</p>
            <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>

            <p>Notes</p>
            <input type="text" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)}/>

            <button type="button" onClick={onClose}>Close</button>
        </form>
    )
}