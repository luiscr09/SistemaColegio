import { type StudentData } from '../../views/student'

interface StudentFormProps {
  student: StudentData
  onStudentChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export default function StudentForm({ student, onStudentChange }: StudentFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Datos del Estudiante</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={student.first_name}
            onChange={onStudentChange}
            placeholder="Juan"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
            Apellido
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={student.last_name}
            onChange={onStudentChange}
            placeholder="Pérez García"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label htmlFor="cue_mined" className="block text-sm font-medium text-gray-700 mb-2">
            CUE (Código Único de Estudiante)
          </label>
          <input
            type="text"
            id="cue_mined"
            name="cue_mined"
            value={student.cue_mined}
            onChange={onStudentChange}
            placeholder="45123456"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            value={student.birth_date}
            onChange={onStudentChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label htmlFor="birth_certificate_number" className="block text-sm font-medium text-gray-700 mb-2">
            Número de Certificado de Nacimiento
          </label>
          <input
            type="text"
            id="birth_certificate_number"
            name="birth_certificate_number"
            value={student.birth_certificate_number}
            onChange={onStudentChange}
            placeholder="ABC-123-456"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
          />
        </div>

        

        

        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={student.address}
            onChange={onStudentChange}
            placeholder="Calle Principal 123, Apto 4B"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            required
          />
        </div>
      </div>
    </div>
  )
}
