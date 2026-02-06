import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../components/Card';
import Button from '../components/Button';
import Loading from '../components/Loading';
import productService from '../services/productService';
import rawMaterialService from '../services/rawMaterialService';
import productionService from '../services/productionService';
import { formatCurrency } from '../utils/formatters';

function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    rawMaterials: 0,
    productionValue: 0,
    availableProducts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [products, rawMaterials, suggestions] = await Promise.all([
        productService.getAll(),
        rawMaterialService.getAll(),
        productionService.getSuggestions()
      ]);

      const totalProductionValue = suggestions.reduce((total, s) =>
        total + (s.maxQuantityProducible * s.productValue), 0
      );

      setStats({
        products: products.length,
        rawMaterials: rawMaterials.length,
        productionValue: totalProductionValue,
        availableProducts: suggestions.length
      });
    } catch (error) {
      toast.error('Erro ao carregar estatísticas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Produtos',
      description: 'Gerencie o catálogo de produtos',
      icon: '📦',
      color: 'from-blue-500 to-blue-600',
      path: '/products'
    },
    {
      title: 'Matérias-Primas',
      description: 'Controle seu estoque de matérias-primas',
      icon: '🧱',
      color: 'from-green-500 to-green-600',
      path: '/raw-materials'
    },
    {
      title: 'Composição',
      description: 'Defina receitas dos produtos',
      icon: '🔧',
      color: 'from-purple-500 to-purple-600',
      path: '/composition'
    },
    {
      title: 'Produção',
      description: 'Sugestões inteligentes de produção',
      icon: '🎯',
      color: 'from-orange-500 to-orange-600',
      path: '/production'
    }
  ];

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-10 text-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Sistema de Controle de Estoque Industrial
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-6">
              Solução completa para gerenciamento inteligente de estoque, matérias-primas e produção
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-3">Sobre o Sistema</h2>
              <p className="text-blue-50 leading-relaxed mb-4">
                Este sistema foi desenvolvido para otimizar o controle de estoque industrial,
                permitindo cadastro de produtos e matérias-primas, definição de composições (receitas)
                e cálculo inteligente de sugestões de produção baseado no estoque disponível.
              </p>
              <p className="text-blue-50 leading-relaxed">
                Com análise automática de viabilidade, o sistema identifica quais produtos podem
                ser produzidos, calcula a quantidade máxima possível e prioriza itens de maior
                valor agregado, auxiliando na tomada de decisões estratégicas de produção.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold">Projeto de Teste</h3>
              </div>
              <p className="text-blue-50 text-sm leading-relaxed mb-4">
                Este é um projeto de teste técnico desenvolvido para demonstração de habilidades em desenvolvimento full-stack.
              </p>
              <div className="border-t border-white/20 pt-4">
                <p className="text-blue-100 text-sm font-medium mb-2">Desenvolvido por:</p>
                <p className="text-white font-semibold mb-3">Erick Santos</p>
                <a
                  href="https://github.com/ercksantos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Ver GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Loading message="Carregando dashboard..." />
      ) : (
        <>
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Visão Geral</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">Total de Produtos</p>
                    <p className="text-3xl font-bold text-blue-900">{stats.products}</p>
                    <p className="text-xs text-blue-600 mt-1">cadastrados</p>
                  </div>
                  <div className="text-4xl">📦</div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600 mb-1">Matérias-Primas</p>
                    <p className="text-3xl font-bold text-green-900">{stats.rawMaterials}</p>
                    <p className="text-xs text-green-600 mt-1">em estoque</p>
                  </div>
                  <div className="text-4xl">🧱</div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600 mb-1">Produtos Disponíveis</p>
                    <p className="text-3xl font-bold text-purple-900">{stats.availableProducts}</p>
                    <p className="text-xs text-purple-600 mt-1">para produção</p>
                  </div>
                  <div className="text-4xl">✅</div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600 mb-1">Valor Potencial</p>
                    <p className="text-2xl sm:text-3xl font-bold text-orange-900">
                      {formatCurrency(stats.productionValue)}
                    </p>
                    <p className="text-xs text-orange-600 mt-1">de produção</p>
                  </div>
                  <div className="text-4xl">💰</div>
                </div>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Acesso Rápido</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  onClick={() => navigate(action.path)}
                >
                  <div className={`bg-gradient-to-r ${action.color} text-white rounded-lg p-4 mb-4 text-center text-5xl group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(action.path);
                    }}
                  >
                    Acessar →
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 sm:p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Como Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Cadastre Produtos</h3>
                  <p className="text-gray-600 text-sm">
                    Registre todos os produtos que sua indústria fabrica com código, nome e valor.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Gerencie Matérias-Primas</h3>
                  <p className="text-gray-600 text-sm">
                    Mantenha controle atualizado das matérias-primas e suas quantidades em estoque.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Defina Composições</h3>
                  <p className="text-gray-600 text-sm">
                    Configure as receitas dos produtos indicando quais matérias-primas são necessárias.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Receba Sugestões</h3>
                  <p className="text-gray-600 text-sm">
                    O sistema calcula automaticamente quais produtos podem ser fabricados e em qual quantidade.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-blue-50 rounded-xl p-6 sm:p-8 border border-blue-100 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Pronto para Começar?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Experimente calcular sugestões de produção e descubra o potencial produtivo
              com base no seu estoque atual.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/production')}
              className="shadow-lg"
            >
              Ver Sugestões de Produção →
            </Button>
          </section>
        </>
      )}
    </div>
  );
}

export default Home;
