# Sistema de Controle de Estoque Industrial

Sistema completo de gerenciamento de estoque para indústrias com **sugestões inteligentes de produção** baseadas em análise de disponibilidade de matérias-primas.

**Stack:** Spring Boot 4.0.2 + Java 21 + React 18 + PostgreSQL 16

---

## 🎯 Funcionalidades

- ✅ **CRUD Completo** de Produtos e Matérias-Primas
- ✅ **Gestão de Composições** (receitas de produtos)
- ✅ **Sugestões Inteligentes de Produção**
  - Analisa estoque disponível
  - Calcula quantidade máxima produzível
  - Prioriza produtos de maior valor
  - Calcula valor total de produção
- ✅ **Dashboard Interativo** com estatísticas em tempo real
- ✅ **Interface Responsiva** para desktop e mobile

---

## 🚀 Executando o Projeto

### Pré-requisitos

- Java 21+
- Node.js 18+
- Docker & Docker Compose
- Maven 3.8+

### 1. Iniciar o Banco de Dados

```bash
docker-compose up -d
```

### 2. Iniciar o Backend

```bash
./mvnw spring-boot:run
```

O backend estará disponível em: **http://localhost:8080**

### 3. Iniciar o Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em: **http://localhost:3000**

---

## 📊 Tecnologias Utilizadas

### Backend
- Spring Boot 4.0.2
- Spring Data JPA
- PostgreSQL 16
- Hibernate
- Jakarta Validation
- Lombok

### Frontend
- React 18
- React Router DOM
- React Hook Form
- Axios
- TailwindCSS 3
- Vite 7
- React Toastify

---

## 🔌 API Endpoints

### Produtos
- `GET /api/products` - Listar todos
- `GET /api/products/{id}` - Buscar por ID
- `GET /api/products/code/{code}` - Buscar por código
- `POST /api/products` - Criar novo
- `PUT /api/products/{id}` - Atualizar
- `DELETE /api/products/{id}` - Deletar

### Matérias-Primas
- `GET /api/raw-materials` - Listar todas
- `GET /api/raw-materials/{id}` - Buscar por ID
- `GET /api/raw-materials/code/{code}` - Buscar por código
- `POST /api/raw-materials` - Criar nova
- `PUT /api/raw-materials/{id}` - Atualizar
- `DELETE /api/raw-materials/{id}` - Deletar

### Composições
- `GET /api/products/{productId}/raw-materials` - Listar matérias-primas de um produto
- `POST /api/products/{productId}/raw-materials` - Adicionar matéria-prima
- `PUT /api/products/{productId}/raw-materials/{rawMaterialId}` - Atualizar quantidade
- `DELETE /api/products/{productId}/raw-materials/{rawMaterialId}` - Remover

### Sugestões de Produção 🎯
- `GET /api/production/suggestions` - Calcular sugestões baseadas no estoque

---

## 📦 Dados Iniciais

O sistema inclui dados de exemplo carregados automaticamente:

- 5 Produtos (móveis)
- 7 Matérias-primas
- Associações produto-matéria-prima
- Sequências de ID sincronizadas

---

## 🏗️ Arquitetura

```
inventory-system/
├── src/main/java/com/industry/inventory/
│   ├── config/           # Configurações (CORS)
│   ├── controller/       # Controllers REST
│   ├── dto/              # Data Transfer Objects
│   ├── exception/        # Tratamento de erros
│   ├── model/            # Entidades JPA
│   ├── repository/       # Spring Data Repositories
│   └── service/          # Lógica de negócio
└── frontend/
    ├── src/
    │   ├── components/   # Componentes reutilizáveis
    │   ├── pages/        # Páginas da aplicação
    │   ├── services/     # Serviços API
    │   └── utils/        # Utilitários
    └── public/
```

---

## 🐳 Configuração do Docker

### Banco de Dados PostgreSQL
- **Host:** localhost
- **Porta:** 5432
- **Database:** inventory_db
- **Usuário:** postgres
- **Senha:** senha123

### Comandos Úteis

```bash
# Parar o banco
docker-compose down

# Parar e remover dados
docker-compose down -v

# Ver logs
docker-compose logs -f
```

---

## 🧪 Testando a API

### Exemplo com cURL

```bash
# Listar produtos
curl http://localhost:8080/api/products

# Criar produto
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "code": "PROD006",
    "name": "Mesa de Centro",
    "value": 350.00
  }'

# Obter sugestões de produção
curl http://localhost:8080/api/production/suggestions
```

Endpoints GET também funcionam direto no navegador.

---

## 💡 Como Funciona

1. **Cadastre Produtos** com código, nome e valor
2. **Gerencie Matérias-Primas** e quantidades em estoque
3. **Defina Composições** indicando quais matérias-primas cada produto precisa
4. **Receba Sugestões** automáticas de produção baseadas no estoque atual

O sistema calcula em tempo real quais produtos podem ser fabricados e em qual quantidade máxima, priorizando itens de maior valor agregado.

---

## 📝 Sobre o Projeto

Este é um projeto de **teste técnico** desenvolvido para demonstração de habilidades em desenvolvimento full-stack, aplicando:

- Clean Architecture
- RESTful API Design
- Dependency Injection
- Repository Pattern
- DTO Pattern
- Component-Based Architecture
- Responsive Design
- Mobile-First Approach

---

## 👨‍💻 Desenvolvedor

**Erick Santos**

GitHub: [github.com/ercksantos](https://github.com/ercksantos)

---

## ⚖️ Licença

Este código foi desenvolvido para avaliação técnica em processo seletivo.

Todos os direitos reservados ao autor. Consulte [LICENSE](LICENSE) para detalhes.

Base Legal: Lei nº 9.610/98 (Lei de Direitos Autorais)
