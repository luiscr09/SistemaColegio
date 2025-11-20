import { useState } from 'react'
import { supabase } from '../lib/supabase'
import StudentForm from '../components/students/student-form'
import GuardiansList from '../components/students/guardians-list'
import ActionButtons from '../components/students/action-buttons'

export interface StudentData {
  first_name: string
  last_name: string
  cue_mined: string
  birth_date: string
  birth_certificate_number: string
  nationality: string
  current_grade: string
  previous_school: string
  address: string
}

export interface GuardianData {
  id: string
  full_name: string
  cedula: string
  phone: string
  email: string
  job_title: string
  work_phone: string
  address: string
  relationship_type: 'Padre' | 'Madre' | 'Tutor Legal'
  isExisting?: boolean
}

const initialStudent: StudentData = {
  first_name: '',
  last_name: '',
  cue_mined: '',
  birth_date: '',
  birth_certificate_number: '',
  nationality: '',
  current_grade: '',
  previous_school: '',
  address: '',
}

const initialGuardian: GuardianData = {
  id: '1',
  full_name: '',
  cedula: '',
  phone: '',
  email: '',
  job_title: '',
  work_phone: '',
  address: '',
  relationship_type: 'Padre',
}

export default function StudentRegistrationPage() {
  const [student, setStudent] = useState<StudentData>(initialStudent)
  const [guardians, setGuardians] = useState<GuardianData[]>([initialGuardian])
  const [isLoading, setIsLoading] = useState(false)

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddGuardian = () => {
    const newId = Math.max(...guardians.map((g) => parseInt(g.id)), 0) + 1
    setGuardians((prev) => [
      ...prev,
      {
        ...initialGuardian,
        id: newId.toString(),
      },
    ])
  }

  const handleRemoveGuardian = (id: string) => {
    if (guardians.length > 1) {
      setGuardians((prev) => prev.filter((g) => g.id !== id))
    }
  }

  const handleGuardianChange = (id: string, field: keyof GuardianData, value: string) => {
    setGuardians((prev) =>
      prev.map((guardian) =>
        guardian.id === id ? { ...guardian, [field]: value } : guardian
      )
    )
  }

  const handleSelectExistingGuardian = (existing: GuardianData, targetId: string) => {
    setGuardians((prev) =>
      prev.map((guardian) =>
        guardian.id === targetId ? { ...existing, id: targetId, isExisting: true } : guardian
      )
    )
  }

  const resetForm = () => {
    setStudent(initialStudent)
    setGuardians([initialGuardian])
  }

  const handleSubmit = async (addAnother: boolean = false) => {
    setIsLoading(true)

    try {
      // Llamar a la función RPC de Supabase para insertar estudiante y tutores
      const { error } = await supabase.rpc('create_student_with_parents', {
        p_cue_mined: student.cue_mined || null,
        p_birth_certificate_number: student.birth_certificate_number || null,
        p_first_name: student.first_name,
        p_last_name: student.last_name,
        p_birth_date: student.birth_date || null,
        p_parents: guardians.map(({id, isExisting, ...rest}) => rest), // Excluimos props internas
      })

      if (error) throw error

      alert('Estudiante y tutores guardados con éxito.')

      if (addAnother) {
        resetForm()
      }
    } catch (err) {
      console.error(err)
      alert('Error guardando los datos. Revisa la consola.')
    }

    setIsLoading(false)
  }

  const isFormValid =
    student.first_name &&
    student.last_name &&
    student.cue_mined &&
    student.birth_date &&
    student.nationality &&
    student.current_grade &&
    student.address &&
    guardians.every((g) => g.full_name && g.cedula && g.phone && g.email)

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Registro de Matrícula y Tutores</h1>
          <p className="text-gray-600 mt-2">Completa el formulario para registrar un nuevo estudiante en el sistema</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!isFormValid) return alert('Por favor complete todos los campos requeridos.')
            handleSubmit(false)
          }}
          className="space-y-6"
        >
          <StudentForm student={student} onStudentChange={handleStudentChange} />

          <GuardiansList
            guardians={guardians}
            onGuardianChange={handleGuardianChange}
            onRemoveGuardian={handleRemoveGuardian}
            onAddGuardian={handleAddGuardian}
            onSelectExisting={handleSelectExistingGuardian}
          />

          <ActionButtons
            isLoading={isLoading}
            isFormValid={isFormValid}
            onSubmit={() => handleSubmit(false)}
            onSubmitAndAddAnother={() => handleSubmit(true)}
          />
        </form>
      </div>
    </div>
  )
}
