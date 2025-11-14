"use client"

import { useState } from "react"
import { addStudent } from "@/lib/store/studentsSlice"
import { useDispatch } from "react-redux"
import { ModalContainer } from "@/components/ui/ModalContainer"

export default function AddStudentModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" })
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = { name: "", email: "", phone: "" }
    if (!name.trim()) newErrors.name = "Name is required"
    if (!email.includes("@")) newErrors.email = "Invalid email"
    if (!/^\d+$/.test(phone)) newErrors.phone = "Digits only"

    if (newErrors.name || newErrors.email || newErrors.phone) {
      setErrors(newErrors)
      return
    }

    dispatch(
      addStudent({
        id: "",
        name,
        email,
        phone: Number(phone),
        notes,
        createdAt: new Date().toISOString(),
      })
    )
    onClose()
  }

  return (
    <ModalContainer title="Add Student" onClose={onClose}>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <InputField label="Name" value={name} onChange={setName} error={errors.name} />
        <InputField label="Email" value={email} onChange={setEmail} error={errors.email} />
        <InputField label="Phone" value={phone} onChange={setPhone} error={errors.phone} />
        <InputField label="Notes" value={notes} onChange={setNotes} />

        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:bg-muted transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition shadow-sm"
          >
            Add Student
          </button>
        </div>
      </form>
    </ModalContainer>
  )
}

function InputField({
  label,
  value,
  onChange,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-muted-foreground mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border px-3 py-2.5 bg-input focus:ring-2 outline-none transition ${
          error
            ? "border-destructive focus:ring-destructive"
            : "border-border focus:ring-primary focus:border-primary"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
