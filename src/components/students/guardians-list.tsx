import { UserPlus } from 'lucide-react'
import GuardianCard from './guardian-card'
import { type GuardianData } from '../../views/student'

interface GuardiansListProps {
  guardians: GuardianData[]
  onGuardianChange: (id: string, field: keyof GuardianData, value: string) => void
  onRemoveGuardian: (id: string) => void
  onAddGuardian: () => void
  onSelectExisting: (existing: GuardianData, targetId: string) => void
}

export default function GuardiansList({
  guardians,
  onGuardianChange,
  onRemoveGuardian,
  onAddGuardian,
  onSelectExisting,
}: GuardiansListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Tutores</h2>
        </div>
        <button
          type="button"
          onClick={onAddGuardian}
          className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-medium"
        >
          <UserPlus className="w-4 h-4" />
          Añadir Otro Tutor
        </button>
      </div>

      <div className="space-y-4">
        {guardians.map((guardian, index) => (
          <GuardianCard
            key={guardian.id}
            guardian={guardian}
            index={index}
            totalGuardians={guardians.length}
            onGuardianChange={onGuardianChange}
            onRemoveGuardian={onRemoveGuardian}
            onSelectExisting={onSelectExisting}
          />
        ))}
      </div>
    </div>
  )
}
