"use client"

import { useState, useEffect } from "react"
import { Student } from "@/types/student"
import { ModalContainer } from "@/components/ui/ModalContainer"

export default function EditStudentModal({
  student,
  onSave,
  onClose,
}: {
  student: Student
  onSave: (s: Student) => void
  onClose: () => void
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    setName(student.name)
    setEmail(student.email)
    setPhone(student.phone.toString())
    setNotes(student.notes)
  }, [student])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...student, name, email, phone: Number(phone), notes })
    onClose()
  }

  return (
    <ModalContainer title="Edit Student" onClose={onClose}>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <InputField label="Name" value={name} onChange={setName} />
        <InputField label="Email" value={email} onChange={setEmail} />
        <InputField label="Phone" value={phone} onChange={setPhone} />
        <InputField label="Notes" value={notes} onChange={setNotes} />

        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </ModalContainer>
  )
}

const InputField = ({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
    />
  </div>
)
