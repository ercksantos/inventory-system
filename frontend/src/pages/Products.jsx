import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import ProductForm from '../components/ProductForm';
import productService from '../services/productService';
import { formatCurrency } from '../utils/formatters';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      toast.error(error.userMessage || 'Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        await productService.update(editingProduct.id, data);
        toast.success('Produto atualizado com sucesso!');
      } else {
        await productService.create(data);
        toast.success('Produto criado com sucesso!');
      }
      handleCloseModal();
      fetchProducts();
    } catch (error) {
      toast.error(error.userMessage || 'Erro ao salvar produto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, productName) => {
    if (!window.confirm(`Tem certeza que deseja excluir o produto "${productName}"?`)) {
      return;
    }

    try {
      await productService.remove(id);
      toast.success('Produto excluído com sucesso!');
      fetchProducts();
    } catch (error) {
      toast.error(error.userMessage || 'Erro ao excluir produto');
    }
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
      header: 'Valor',
      render: (row) => formatCurrency(row.value)
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
          <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
          <p className="text-sm text-gray-600 mt-1">
            {products.length} {products.length === 1 ? 'produto cadastrado' : 'produtos cadastrados'}
          </p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          + Novo Produto
        </Button>
      </div>

      {loading ? (
        <Loading message="Carregando produtos..." />
      ) : (
        <Table
          columns={columns}
          data={products}
          emptyMessage="Nenhum produto cadastrado"
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProduct ? 'Editar Produto' : 'Novo Produto'}
      >
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          initialData={editingProduct}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}

export default Products;
