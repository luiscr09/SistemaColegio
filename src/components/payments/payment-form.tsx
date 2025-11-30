import { CreditCard } from "lucide-react";
import Input from "../input";
import type { Payment, PaymentMethodProps, StudentPaymentProps } from "../../types/types";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { FieldSelect } from "../field-select";

interface PaymentFormProps {
  onCancel: () => void;
  payments: Payment[];
  student: StudentPaymentProps | null;
}

export default function PaymentForm({ onCancel, payments, student }: PaymentFormProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodProps[]>([]);

  useEffect(() => {
    const handleLoadPaymentMethods = async () => {
      const { data } = await supabase.from("payment_types").select("*");
      setPaymentMethods(data || []);
    };

    handleLoadPaymentMethods();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const month_name = formData.get("months") as string;
    const payment_type = formData.get("payment-methods") as string;
    const notes = formData.get("address") as string;
    const amount = student?.custom_monthly_fee;
    const student_id = student?.id;

    if (!student_id) {
      alert("No se encontró el estudiante.");
      return;
    }

    const MONTHS: Record<string, number> = {
      Enero: 1,
      Febrero: 2,
      Marzo: 3,
      Abril: 4,
      Mayo: 5,
      Junio: 6,
      Julio: 7,
      Agosto: 8,
      Septiembre: 9,
      Octubre: 10,
      Noviembre: 11,
      Diciembre: 12,
    };

    const monthNumber = MONTHS[month_name];

    if (!monthNumber) {
      alert("Mes inválido.");
      return;
    }

    const year = new Date().getFullYear();

    // Primer día del mes seleccionado
    const payment_date = new Date(year, monthNumber - 1, 1);

    const { error } = await supabase.from("payments").insert({
      student_id,
      amount,
      notes,
      payment_type,
      payment_date,
      status: true,
    });

    if (error) {
      console.error(error);
      alert("Error al guardar el pago");
      return;
    }

    alert("Pago registrado correctamente");
    onCancel();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="bg-sky-50 rounded-lg p-4 border border-sky-100 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="h-5 w-5 text-sky-600" />
          <h3 className="font-semibold text-foreground">Información del pago</h3>
        </div>
        <p className="text-sm text-muted-foreground">Completa los datos del pago</p>
      </div>

      {/* Mes */}
      <FieldSelect
        name="months"
        label="Mes"
        options={payments
          .filter((p) => !p.status)
          .map((p) => ({ id: p.month_name, label: p.month_name }))}
      />

      {/* Nombre y apellido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre"
          name="name"
          value={student?.first_name}
          readOnly
          required
        />

        <Input
          label="Apellido"
          name="lastname"
          value={student?.last_name}
          readOnly
          required
        />
      </div>

      {/* Forma de pago y monto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldSelect
          label="Forma de pagos"
          name="payment-methods"
          options={paymentMethods.map((pm) => ({ id: pm.id, label: pm.name }))}
        />

        <Input
          label="Monto"
          name="amount"
          value={student?.custom_monthly_fee}
          readOnly
          required
        />
      </div>

      {/* Notas */}
      <Input
        label="Comentarios"
        name="address"
        placeholder="Notas del pago"
      />

      {/* Botones */}
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
  );
}
