import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Button from './Button';

function AddRawMaterialForm({
  onSubmit,
  onCancel,
  availableRawMaterials = [],
  isLoading = false,
  initialData = null
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      rawMaterialId: '',
      requiredQuantity: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        rawMaterialId: '',
        requiredQuantity: ''
      });
    }
  }, [initialData, reset]);

  const isEditMode = !!initialData;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!isEditMode && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Matéria-Prima
          </label>
          <select
            {...register('rawMaterialId', {
              required: 'Matéria-prima é obrigatória',
              valueAsNumber: true
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma matéria-prima</option>
            {availableRawMaterials.map((rawMaterial) => (
              <option key={rawMaterial.id} value={rawMaterial.id}>
                {rawMaterial.code} - {rawMaterial.name} (Estoque: {rawMaterial.stockQuantity})
              </option>
            ))}
          </select>
          {errors.rawMaterialId && (
            <p className="text-red-500 text-xs mt-1">{errors.rawMaterialId.message}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantidade Necessária
        </label>
        <input
          type="number"
          step="0.01"
          {...register('requiredQuantity', {
            required: 'Quantidade é obrigatória',
            min: { value: 0.01, message: 'Quantidade deve ser maior que zero' },
            valueAsNumber: true
          })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: 25.50"
        />
        {errors.requiredQuantity && (
          <p className="text-red-500 text-xs mt-1">{errors.requiredQuantity.message}</p>
        )}
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
}

export default AddRawMaterialForm;
