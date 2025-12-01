"use client"

export interface Student {
  id: string
  first_name: string
  last_name: string
  cui: string
}

export interface Subject {
  id: string
  name: string
  code: string
}

export interface GradeDistribution {
  id: string
  name: string
  maxPoints: number
}

export interface PartialGrade {
  distributionId: string
  points: number
}

export interface GradingRecord {
  id: string
  studentId: string
  studentName: string
  subjectId: string
  subjectName: string
  maxScore: number
  distributions: GradeDistribution[]
  partialGrades: PartialGrade[]
  finalScore: number
  createdAt: Date
  updatedAt: Date
}

export interface SubjectConfigurationBySection {
  id: string
  levelId: string
  gradeId: string
  classroom: string
  subjectId: string
  subjectName: string
  maxScore: number
  distributions: GradeDistribution[]
  createdAt: Date
  updatedAt: Date
}

export interface GradingRecordBySection extends GradingRecord {
  levelId: string
  gradeId: string
  classroom: string
  configId: string
}
