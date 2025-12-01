"use client"

import { useState } from "react"
import LevelSelector from "../components/grading/section/level-selector"
import GradeSelector from "../components/grading/section/grade-selector"
import ClassroomSelector from "../components/grading/section/classroom-selector"
import StudentsList from "../components/grading/section/students-list"
import DistributionConfig from "../components/grading/section/distribution-config"
import GradesTable from "../components/grading/section/grades-table"
import SubjectSelector from "../components/grading/section/subject-selector"

export default function GradingBySectionPage() {
  const [selectedLevel, setSelectedLevel] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("")
  const [selectedClassroom, setSelectedClassroom] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<{ id: string; name: string; code: string } | null>(null)
  const [step, setStep] = useState<"level" | "grade" | "classroom" | "subject" | "students" | "config" | "grades">(
    "level",
  )
  const [distributions, setDistributions] = useState<any[]>([])
  const [maxScore, setMaxScore] = useState(100)

  const educationalLevels = [
    { id: "preescolar", name: "Preescolar" },
    { id: "primaria", name: "Primaria" },
    { id: "secundaria", name: "Secundaria" },
  ]

  const gradesMap = {
    preescolar: [{ id: "pre-a", name: "Preescolar" }],
    primaria: Array.from({ length: 6 }, (_, i) => ({ id: `prim-${i + 1}`, name: `${i + 1}° Grado` })),
    secundaria: Array.from({ length: 5 }, (_, i) => ({ id: `sec-${i + 1}`, name: `${i + 1}° Año` })),
  }

  const classrooms = ["A", "B", "C", "D", "E"]

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId)
    setSelectedGrade("")
    setSelectedClassroom("")
    setSelectedSubject(null)
    setStep("grade")
  }

  const handleGradeSelect = (gradeId: string) => {
    setSelectedGrade(gradeId)
    setSelectedClassroom("")
    setSelectedSubject(null)
    setStep("classroom")
  }

  const handleClassroomSelect = (classroom: string) => {
    setSelectedClassroom(classroom)
    setSelectedSubject(null)
    setStep("subject")
  }

  const handleSubjectSelect = (subject: { id: string; name: string; code: string }) => {
    setSelectedSubject(subject)
    setStep("students")
  }

  const handleConfigComplete = (dists: any[], score: number) => {
    setDistributions(dists)
    setMaxScore(score)
    setStep("grades")
  }

  const levelName = educationalLevels.find((l) => l.id === selectedLevel)?.name || ""
  const gradeName = gradesMap[selectedLevel as keyof typeof gradesMap]?.find((g) => g.id === selectedGrade)?.name || ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Gestión de Calificaciones por Aula</h1>
          <p className="text-gray-600">
            Configura la estructura de evaluación por asignatura e ingresa las calificaciones de tus estudiantes
          </p>
        </div>

        {/* Pasos */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {["level", "grade", "classroom", "subject", "students", "config", "grades"].map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
                  step === s
                    ? "bg-sky-600 text-white"
                    : ["level", "grade", "classroom", "subject", "students", "config", "grades"].indexOf(step) > i
                      ? "bg-sky-200 text-sky-900"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {i + 1}. {s === "level" && "Nivel"}
                {s === "grade" && "Grado"}
                {s === "classroom" && "Aula"}
                {s === "subject" && "Asignatura"}
                {s === "students" && "Estudiantes"}
                {s === "config" && "Configurar"}
                {s === "grades" && "Calificaciones"}
              </div>
              {i < 6 && <div className="w-2 h-0.5 bg-gray-300 mx-1" />}
            </div>
          ))}
        </div>

        {/* Contenido */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          {step === "level" && <LevelSelector levels={educationalLevels} onSelect={handleLevelSelect} />}

          {step === "grade" && (
            <GradeSelector
              grades={gradesMap[selectedLevel as keyof typeof gradesMap] || []}
              onSelect={handleGradeSelect}
              onBack={() => setStep("level")}
              levelName={levelName}
            />
          )}

          {step === "classroom" && (
            <ClassroomSelector
              classrooms={classrooms}
              onSelect={handleClassroomSelect}
              onBack={() => setStep("grade")}
              gradeName={gradeName}
            />
          )}

          {step === "subject" && <SubjectSelector onSelect={handleSubjectSelect} onBack={() => setStep("classroom")} />}

          {step === "students" && (
            <StudentsList
              onContinue={() => setStep("config")}
              onBack={() => setStep("subject")}
              levelId={selectedLevel}
              gradeId={selectedGrade}
              classroom={selectedClassroom}
            />
          )}

          {step === "config" && (
            <DistributionConfig
              onComplete={handleConfigComplete}
              onBack={() => setStep("students")}
              subjectId={selectedSubject?.id}
              levelId={selectedLevel}
              gradeId={selectedGrade}
              classroom={selectedClassroom}
            />
          )}

          {step === "grades" && selectedSubject && (
            <GradesTable
              distributions={distributions}
              maxScore={maxScore}
              levelId={selectedLevel}
              gradeId={selectedGrade}
              classroom={selectedClassroom}
              onBack={() => setStep("config")}
            />
          )}
        </div>
      </div>
    </div>
  )
}
