"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, MapPin, User } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1))
  const [selectedDate, setSelectedDate] = useState<number | null>(null)

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array(firstDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

  const sessionsData: Record<
    number,
    Array<{ id: string; time: string; client: string; type: string; duration: string; location?: string }>
  > = {
    5: [
      { id: "1", time: "10:00 AM", client: "Sarah Johnson", type: "Tutoring", duration: "1h" },
      { id: "2", time: "2:00 PM", client: "Michael Chen", type: "Coaching", duration: "1h" },
    ],
    10: [
      { id: "3", time: "9:00 AM", client: "Emily Rodriguez", type: "Mentoring", duration: "1.5h", location: "Zoom" },
    ],
    15: [{ id: "4", time: "11:00 AM", client: "Design Project", type: "Freelance", duration: "2h" }],
  }

  const selectedDateSessions = selectedDate ? sessionsData[selectedDate] || [] : []

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
    setSelectedDate(null)
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
    setSelectedDate(null)
  }

  const formatter = new Intl.DateTimeFormat("uk-UA", {
    month: "long",
    year: "numeric",
  });
  const monthName = formatter.format(currentDate).replace(/^\w/, c => c.toUpperCase());

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground mt-2">Manage your sessions and schedule</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">{monthName}</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center font-semibold text-muted-foreground text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, idx) => {
                  const hasSessions = day && sessionsData[day]?.length > 0
                  const isSelected = selectedDate === day

                  return (
                    <button
                      key={idx}
                      onClick={() => day && setSelectedDate(isSelected ? null : day)}
                      className={`aspect-square p-2 rounded-lg font-semibold text-sm transition-colors ${
                        !day
                          ? "bg-transparent cursor-default"
                          : isSelected
                            ? "bg-primary text-primary-foreground"
                            : hasSessions
                              ? "bg-primary/20 text-foreground hover:bg-primary/30"
                              : "bg-secondary/30 text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {day}
                      {hasSessions && <div className="text-xs mt-1">●</div>}
                    </button>
                  )
                })}
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6 sticky top-8">
              <h3 className="font-bold text-foreground mb-4">
                {selectedDate ? `Sessions - ${monthName.split(" ")[0]} ${selectedDate}` : "Select a date"}
              </h3>

              {selectedDateSessions.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-4 bg-secondary/30 rounded-lg border border-border/50 hover:border-border transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold text-foreground text-sm">{session.time}</span>
                        </div>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          {session.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground mb-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {session.client}
                      </div>
                      {session.location && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {session.location}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">Duration: {session.duration}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs flex-1 text-destructive bg-transparent">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : selectedDate ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground mb-4">No sessions scheduled</p>
                  <Button className="w-full">Schedule Session</Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">Click on a date to view sessions</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
