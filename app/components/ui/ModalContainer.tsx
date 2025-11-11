"use client"

import React from "react"

export const ModalContainer = ({
  title,
  children,
  onClose,
}: {
  title: string
  children: React.ReactNode
  onClose: () => void
}) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="relative bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center tracking-tight">
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}
