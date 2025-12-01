export interface TimeBlock {
  id: string
  startTime: string
  endTime: string
  blockNumber: number
}

export interface ScheduleEntry {
  id: string
  dayOfWeek: number
  blockNumber: number
  subjectId: string | null
  subjectName: string | null
  teacherId: string | null
  teacherName: string | null
}

export interface ClassroomSchedule {
  gradeLevel: string
  classroom: string
  schedule: ScheduleEntry[]
}

export interface Subject {
  id: string
  name: string
}
export interface EducationalLevel {
  id: string
  name: "Preescolar" | "Primaria" | "Secundaria"
  grades: Grade[]
}

export interface Grade {
  id: string
  number: number
  name: string
  classrooms: string[]
}

export interface GradeLevel {
  id: string
  name: string
  classrooms: string[]
}

export interface ScheduleValidation {
  isValid: boolean
  emptySlots: Array<{ day: string; block: number }>
  overlaps: Array<{ day: string; block: number }>
  errors: string[]
}
