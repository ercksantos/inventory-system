import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import RawMaterialForm from '../components/RawMaterialForm';
import rawMaterialService from '../services/rawMaterialService';
import { formatNumberBR } from '../utils/formatters';

function RawMaterials() {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRawMaterial, setEditingRawMaterial] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchRawMaterials();
  }, []);

  const fetchRawMaterials = async () => {
    setLoading(true);
    try {
      const data = await rawMaterialService.getAll();
      setRawMaterials(data);
    } catch (error) {
      toast.error(error.userMessage || 'Erro ao carregar matérias-primas');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (rawMaterial = null) => {
    setEditingRawMaterial(rawMaterial);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRawMaterial(null);
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (editingRawMaterial) {
        await rawMaterialService.update(editingRawMaterial.id, data);
        toast.success('Matéria-prima atualizada com sucesso!');
      } else {
        await rawMaterialService.create(data);
        toast.success('Matéria-prima criada com sucesso!');
      }
      handleCloseModal();
      fetchRawMaterials();
    } catch (error) {
      toast.error(error.userMessage || 'Erro ao salvar matéria-prima');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, rawMaterialName) => {
    if (!window.confirm(`Tem certeza que deseja excluir a matéria-prima "${rawMaterialName}"?`)) {
      return;
    }

    try {
      await rawMaterialService.remove(id);
      toast.success('Matéria-prima excluída com sucesso!');
      fetchRawMaterials();
    } catch (error) {
      toast.error(error.userMessage || 'Erro ao excluir matéria-prima');
    }
  };

  const getStockBadge = (quantity) => {
    let bgColor = '';
    let textColor = 'text-white';
    let label = '';

    if (quantity > 50) {
      bgColor = 'bg-green-600';
      label = 'Estoque Alto';
    } else if (quantity >= 10) {
      bgColor = 'bg-yellow-500';
      label = 'Estoque Médio';
    } else {
      bgColor = 'bg-red-600';
      label = 'Estoque Baixo';
    }

    return (
      <div className="flex items-center gap-2">
        <span className="font-medium">{formatNumberBR(quantity)}</span>
        <span className={`${bgColor} ${textColor} px-2 py-1 rounded text-xs font-medium`}>
          {label}
        </span>
      </div>
    );
  };

  const columns = [
    {
      header: 'Código',
      accessor: 'code'
    },
    {
      header: 'Nome',
      accessor: 'name'
    },
    {
      header: 'Quantidade em Estoque',
      render: (row) => getStockBadge(row.stockQuantity)
    },
    {
      header: 'Ações',
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenModal(row)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(row.id, row.name)}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Excluir
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Matérias-Primas</h1>
          <p className="text-sm text-gray-600 mt-1">
            {rawMaterials.length} {rawMaterials.length === 1 ? 'matéria-prima cadastrada' : 'matérias-primas cadastradas'}
          </p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          + Nova Matéria-Prima
        </Button>
      </div>

      {loading ? (
        <Loading message="Carregando matérias-primas..." />
      ) : (
        <Table
          columns={columns}
          data={rawMaterials}
          emptyMessage="Nenhuma matéria-prima cadastrada"
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingRawMaterial ? 'Editar Matéria-Prima' : 'Nova Matéria-Prima'}
      >
        <RawMaterialForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          initialData={editingRawMaterial}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}

export default RawMaterials;
