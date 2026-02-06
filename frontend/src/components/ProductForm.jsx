import { useForm } from 'react-hook-form';
import Button from './Button';

function ProductForm({ onSubmit, onCancel, initialData = null, isLoading = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialData || {
      code: '',
      name: '',
      value: ''
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
          placeholder="Ex: PROD-001"
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
          placeholder="Ex: Cadeira Executiva"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Valor (R$)
        </label>
        <input
          type="number"
          step="0.01"
          {...register('value', {
            required: 'Valor é obrigatório',
            min: { value: 0.01, message: 'Valor deve ser maior que zero' },
            valueAsNumber: true
          })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: 350.00"
        />
        {errors.value && (
          <p className="text-red-500 text-xs mt-1">{errors.value.message}</p>
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

export default ProductForm;
