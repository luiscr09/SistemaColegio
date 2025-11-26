import { CreditCard, User } from "lucide-react";
import Input from "../input";

interface PaymentFormProps {
  onCancel: () => void
}

export default function PaymentForm({ onCancel }: PaymentFormProps) {
  return (
    <form className="space-y-6">
      <div className="bg-sky-50 rounded-lg p-4 border border-sky-100 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="h-5 w-5 text-sky-600" />
          <h3 className="font-semibold text-foreground">Información del pago</h3>
        </div>
        <p className="text-sm text-muted-foreground">Completa los datos del pago</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre"
          name="name"
          placeholder="Nombre del profesor"
          required
        />

        <Input
          label="Apellido"
          name="lastname"
          placeholder="Apellido del profesor"
          required
        />
      </div>

      <Input
        label="Monto"
        name="amount"
        required
      />

      <Input
        label="Comentarios"
        name="address"
        placeholder="Notas del pago"
        required
      />

      <div className="flex gap-3 pt-6 border-t border-sky-100">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-sky-200 text-foreground rounded-lg hover:bg-sky-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg"
        >
          Guardar
        </button>
      </div>
    </form>
  )
}
