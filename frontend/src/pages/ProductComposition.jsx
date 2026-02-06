import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import AddRawMaterialForm from '../components/AddRawMaterialForm';
import productService from '../services/productService';
import rawMaterialService from '../services/rawMaterialService';
import productRawMaterialService from '../services/productRawMaterialService';
import { formatNumberBR } from '../utils/formatters';

function ProductComposition() {
  const [products, setProducts] = useState([]);
  const [allRawMaterials, setAllRawMaterials] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [productRawMaterials, setProductRawMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRawMaterial, setEditingRawMaterial] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchAllRawMaterials();
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      fetchProductRawMaterials();
    } else {
      setProductRawMaterials([]);
    }
  }, [selectedProductId]);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      toast.error(error.userMessage || 'Erro ao carregar produtos');
    }
  };

  const fetchAllRawMaterials = async () => {
    try {
      const data = await rawMaterialService.getAll();
      setAllRawMaterials(data);
    } catch (error) {
      toast.error(error.userMessage || 'Erro ao carregar matérias-primas');
    }
  };

  const fetchProductRawMaterials = async () => {
    setLoading(true);
    try {
      const data = await productRawMaterialService.getByProduct(selectedProductId);
      setProductRawMaterials(data);
    } catch (error) {
      toast.error(error.userMessage || 'Erro ao carregar composição do produto');
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value);
  };

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setEditingRawMaterial(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (rawMaterial) => {
    setIsEditMode(true);
    setEditingRawMaterial({
      rawMaterialId: rawMaterial.rawMaterialId,
      requiredQuantity: rawMaterial.requiredQuantity
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingRawMaterial(null);
  };

  const getAvailableRawMaterials = () => {
    const usedIds = productRawMaterials.map(prm => prm.rawMaterialId);
    return allRawMaterials.filter(rm => !usedIds.includes(rm.id));
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await productRawMaterialService.updateQuantity(
          selectedProductId,
          editingRawMaterial.rawMaterialId,
          { requiredQuantity: data.requiredQuantity }
        );
        toast.success('Quantidade atualizada com sucesso!');
      } else {
        await productRawMaterialService.addToProduct(selectedProductId, data);
        toast.success('Matéria-prima adicionada com sucesso!');
      }
      handleCloseModal();
      fetchProductRawMaterials();
    } catch (error) {
      toast.error(error.userMessage || 'Erro ao salvar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (rawMaterialId, rawMaterialName) => {
    if (!window.confirm(`Tem certeza que deseja remover "${rawMaterialName}" deste produto?`)) {
      return;
    }

    try {
      await productRawMaterialService.removeFromProduct(selectedProductId, rawMaterialId);
      toast.success('Matéria-prima removida com sucesso!');
      fetchProductRawMaterials();
    } catch (error) {
      toast.error(error.userMessage || 'Erro ao remover matéria-prima');
    }
  };

  const columns = [
    {
      header: 'Código',
      accessor: 'rawMaterialCode'
    },
    {
      header: 'Nome',
      accessor: 'rawMaterialName'
    },
    {
      header: 'Quantidade Necessária',
      render: (row) => <span className="font-medium">{formatNumberBR(row.requiredQuantity)}</span>
    },
    {
      header: 'Estoque Disponível',
      render: (row) => <span>{formatNumberBR(row.stockQuantity)}</span>
    },
    {
      header: 'Ações',
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenEditModal(row)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Editar Qtd
          </button>
          <button
            onClick={() => handleRemove(row.rawMaterialId, row.rawMaterialName)}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Remover
          </button>
        </div>
      )
    }
  ];

  const selectedProduct = products.find(p => p.id === parseInt(selectedProductId));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Composição de Produtos</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecione um Produto
        </label>
        <select
          value={selectedProductId}
          onChange={handleProductChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione um produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.code} - {product.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProductId && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedProduct?.name}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Este produto precisa de <span className="font-semibold">{productRawMaterials.length}</span> matéria{productRawMaterials.length !== 1 ? 's' : ''}-prima{productRawMaterials.length !== 1 ? 's' : ''} diferente{productRawMaterials.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Button
              onClick={handleOpenAddModal}
              disabled={getAvailableRawMaterials().length === 0}
            >
              + Adicionar Matéria-Prima
            </Button>
          </div>

          {loading ? (
            <Loading message="Carregando composição..." />
          ) : (
            <Table
              columns={columns}
              data={productRawMaterials}
              emptyMessage="Nenhuma matéria-prima associada a este produto"
            />
          )}
        </>
      )}

      {!selectedProductId && (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-500">Selecione um produto para visualizar e gerenciar sua composição</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditMode ? 'Editar Quantidade' : 'Adicionar Matéria-Prima'}
      >
        <AddRawMaterialForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          availableRawMaterials={getAvailableRawMaterials()}
          isLoading={isSubmitting}
          initialData={editingRawMaterial}
        />
      </Modal>
    </div>
  );
}

export default ProductComposition;
