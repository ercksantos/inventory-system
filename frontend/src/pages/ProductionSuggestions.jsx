import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Card from '../components/Card';
import Loading from '../components/Loading';
import productionService from '../services/productionService';
import { formatCurrency, formatNumberBR } from '../utils/formatters';

function ProductionSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateSuggestions = async () => {
    setLoading(true);
    setHasCalculated(false);
    try {
      const data = await productionService.getSuggestions();
      // Ordenar por valor total (maior primeiro)
      const sorted = data.sort((a, b) => {
        const totalA = a.maxQuantity * a.productValue;
        const totalB = b.maxQuantity * b.productValue;
        return totalB - totalA;
      });
      setSuggestions(sorted);
      setHasCalculated(true);
      toast.success('Sugestões calculadas com sucesso!');
    } catch (error) {
      toast.error(error.userMessage || 'Erro ao calcular sugestões');
      setHasCalculated(true);
    } finally {
      setLoading(false);
    }
  };

  const getTotalProductionValue = () => {
    return suggestions.reduce((total, suggestion) => {
      return total + (suggestion.maxQuantity * suggestion.productValue);
    }, 0);
  };

  const getPriorityBadge = (totalValue) => {
    let bgColor = '';
    let textColor = 'text-white';
    let label = '';

    if (totalValue >= 10000) {
      bgColor = 'bg-green-600';
      label = 'Alta Prioridade';
    } else if (totalValue >= 5000) {
      bgColor = 'bg-yellow-500';
      label = 'Média Prioridade';
    } else {
      bgColor = 'bg-blue-600';
      label = 'Baixa Prioridade';
    }

    return (
      <span className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-xs font-medium`}>
        {label}
      </span>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sugestões de Produção</h1>
          <p className="text-gray-600 text-sm mt-1">
            Análise inteligente de produtos que podem ser produzidos com o estoque atual
          </p>
        </div>
        <Button onClick={calculateSuggestions} disabled={loading}>
          {loading ? 'Calculando...' : hasCalculated ? 'Atualizar Sugestões' : 'Calcular Sugestões'}
        </Button>
      </div>

      {loading && <Loading message="Calculando sugestões de produção..." />}

      {!loading && hasCalculated && suggestions.length > 0 && (
        <>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Valor Total de Produção Possível</p>
                <p className="text-3xl font-bold mt-1">{formatCurrency(getTotalProductionValue())}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Produtos Disponíveis</p>
                <p className="text-3xl font-bold mt-1">{suggestions.length}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((suggestion) => {
              const totalValue = suggestion.maxQuantity * suggestion.productValue;
              return (
                <Card key={suggestion.productId} className="hover:scale-105 transition-transform">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {suggestion.productName}
                      </h3>
                      <p className="text-sm text-gray-500">{suggestion.productCode}</p>
                    </div>
                    {getPriorityBadge(totalValue)}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Valor Unitário</span>
                      <span className="font-medium text-gray-800">
                        {formatCurrency(suggestion.productValue)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Quantidade Máxima</span>
                      <span className="font-medium text-gray-800">
                        {formatNumberBR(suggestion.maxQuantity)} unidades
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 bg-blue-50 rounded-lg px-3 mt-4">
                      <span className="text-sm font-semibold text-blue-900">Valor Total</span>
                      <span className="text-lg font-bold text-blue-900">
                        {formatCurrency(totalValue)}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {!loading && hasCalculated && suggestions.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Nenhum Produto Pode Ser Produzido
          </h3>
          <p className="text-gray-600 mb-4">
            O estoque atual de matérias-primas não é suficiente para produzir nenhum produto.
          </p>
          <p className="text-sm text-gray-500">
            Verifique o estoque de matérias-primas ou ajuste as composições dos produtos.
          </p>
        </div>
      )}

      {!loading && !hasCalculated && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Pronto para Calcular Sugestões
          </h3>
          <p className="text-gray-600 mb-6">
            Clique no botão "Calcular Sugestões" para analisar quais produtos podem ser produzidos com o estoque atual.
          </p>
          <Button onClick={calculateSuggestions}>
            Calcular Sugestões
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductionSuggestions;
