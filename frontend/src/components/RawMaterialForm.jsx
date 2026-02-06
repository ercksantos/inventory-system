import { useForm } from 'react-hook-form';
import Button from './Button';

function RawMaterialForm({ onSubmit, onCancel, initialData = null, isLoading = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialData || {
      code: '',
      name: '',
      stockQuantity: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Código
        </label>
        <input
          type="text"
          {...register('code', {
            required: 'Código é obrigatório',
            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
          })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: MAT-001"
        />
        {errors.code && (
          <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome
        </label>
        <input
          type="text"
          {...register('name', {
            required: 'Nome é obrigatório',
            minLength: { value: 3, message: 'Mínimo 3 caracteres' }
          })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: Madeira de Pinus"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantidade em Estoque
        </label>
        <input
          type="number"
          step="0.01"
          {...register('stockQuantity', {
            required: 'Quantidade é obrigatória',
            min: { value: 0, message: 'Quantidade não pode ser negativa' },
            valueAsNumber: true
          })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: 150.50"
        />
        {errors.stockQuantity && (
          <p className="text-red-500 text-xs mt-1">{errors.stockQuantity.message}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 justify-end pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading} fullWidth className="sm:w-auto">
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={isLoading} fullWidth className="sm:w-auto">
          {isLoading ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
}

export default RawMaterialForm;
