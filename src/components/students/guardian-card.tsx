import { useState } from 'react'
import { Trash2, Search } from 'lucide-react'
import GuardianSearch from './guardian-search'
import { type GuardianData } from '../../views/student'

interface GuardianCardProps {
  guardian: GuardianData
  index: number
  totalGuardians: number
  onGuardianChange: (id: string, field: keyof GuardianData, value: string) => void
  onRemoveGuardian: (id: string) => void
  onSelectExisting: (existing: GuardianData, targetId: string) => void
}

export default function GuardianCard({
  guardian,
  index,
  totalGuardians,
  onGuardianChange,
  onRemoveGuardian,
  onSelectExisting,
}: GuardianCardProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Tutor {index + 1}</h3>
        {totalGuardians > 1 && (
          <button
            type="button"
            onClick={() => onRemoveGuardian(guardian.id)}
            className="inline-flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition font-medium text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        )}
      </div>

      <GuardianSearch
        guardianId={guardian.id}
        searchOpen={searchOpen}
        onSearchOpenChange={setSearchOpen}
        onSelectExisting={onSelectExisting}
      />

      {guardian.isExisting && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-sm text-green-700">Tutor seleccionado del sistema</div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre Completo
          </label>
          <input
            type="text"
            value={guardian.full_name}
            onChange={(e) => onGuardianChange(guardian.id, 'full_name', e.target.value)}
            placeholder="Carlos García López"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cédula de Identidad
          </label>
          <input
            type="text"
            value={guardian.cedula}
            onChange={(e) => onGuardianChange(guardian.id, 'cedula', e.target.value)}
            placeholder="12.345.678"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono Personal
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-4 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-700 font-medium text-sm">
              +505
            </span>
            <input
              type="tel"
              value={guardian.phone}
              onChange={(e) => onGuardianChange(guardian.id, 'phone', e.target.value)}
              placeholder="99 123 456"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            value={guardian.email}
            onChange={(e) => onGuardianChange(guardian.id, 'email', e.target.value)}
            placeholder="correo@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profesión/Ocupación
          </label>
          <input
            type="text"
            value={guardian.job_title}
            onChange={(e) => onGuardianChange(guardian.id, 'job_title', e.target.value)}
            placeholder="Ingeniero"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono de Trabajo
          </label>
          <input
            type="tel"
            value={guardian.work_phone}
            onChange={(e) => onGuardianChange(guardian.id, 'work_phone', e.target.value)}
            placeholder="+505 99 999 999"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dirección
          </label>
          <input
            type="text"
            value={guardian.address}
            onChange={(e) => onGuardianChange(guardian.id, 'address', e.target.value)}
            placeholder="Calle Principal 123"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Relación
          </label>
          <select
            value={guardian.relationship_type}
            onChange={(e) =>
              onGuardianChange(guardian.id, 'relationship_type', e.target.value as GuardianData['relationship_type'])
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
          >
            <option value="Padre">Padre</option>
            <option value="Madre">Madre</option>
            <option value="Tutor Legal">Tutor Legal</option>
          </select>
        </div>
      </div>
    </div>
  )
}
