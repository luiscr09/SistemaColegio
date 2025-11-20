import { Save } from 'lucide-react'

interface ActionButtonsProps {
  isLoading: boolean
  isFormValid: string | boolean
  onSubmit: () => void
  onSubmitAndAddAnother: () => void
}

export default function ActionButtons({
  isLoading,
  isFormValid,
  onSubmit,
  onSubmitAndAddAnother,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-end sticky bottom-6">
      <button
        type="button"
        onClick={onSubmitAndAddAnother}
       
        className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Registrando...' : 'Registrar y Agregar Otro'}
      </button>
      <button
        type="button"
        onClick={onSubmit}
       
        className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
      >
        <Save className="w-4 h-4" />
        {isLoading ? 'Registrando...' : 'Guardar Registro'}
      </button>
    </div>
  )
}
