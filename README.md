# Sistema de Controle de Estoque Industrial

Sistema completo de gerenciamento de estoque para indústrias, controlando produtos, matérias-primas e sugestões inteligentes de produção.

Desenvolvido com **Spring Boot 4.0.2** e **Java 21**.

---

## 🚀 Tecnologias

- **Java 21**
- **Spring Boot 4.0.2**
- **Spring Data JPA**
- **PostgreSQL 16**
- **Hibernate**
- **Lombok**
- **Jakarta Validation**
- **Docker & Docker Compose**

---

## 📋 Pré-requisitos

- Java 21 ou superior
- Maven 3.8+
- Docker e Docker Compose

---

## 🐳 Configuração do Banco de Dados

O projeto utiliza PostgreSQL rodando em container Docker.

### Iniciar o banco de dados:
```bash
docker-compose up -d
```

### Parar o banco de dados:
```bash
docker-compose down
```

### Parar e remover volumes (apaga todos os dados):
```bash
docker-compose down -v
```

### Configurações do Banco:
- **Host:** localhost
- **Porta:** 5432
- **Database:** inventory_db
- **Usuário:** postgres
- **Senha:** senha123

---

## 🏃 Executando o Projeto

### 1. Iniciar o banco de dados:
```bash
docker-compose up -d
```

### 2. Compilar o projeto:
```bash
./mvnw clean compile
```

### 3. Executar a aplicação:
```bash
./mvnw spring-boot:run
```

### 4. Executar testes:
```bash
./mvnw test
```

A aplicação estará disponível em: **http://localhost:8080**

---

## 📊 Modelo de Dados

### Entidades:

#### **Product (Produto)**
- `id`: Long (PK, auto increment)
- `code`: String (único, obrigatório)
- `name`: String (obrigatório)
- `value`: BigDecimal (obrigatório, positivo)

#### **RawMaterial (Matéria-prima)**
- `id`: Long (PK, auto increment)
- `code`: String (único, obrigatório)
- `name`: String (obrigatório)
- `stockQuantity`: BigDecimal (obrigatório, >= 0)

#### **ProductRawMaterial (Associação)**
- `id`: Long (PK, auto increment)
- `product`: Product (FK, obrigatório)
- `rawMaterial`: RawMaterial (FK, obrigatório)
- `requiredQuantity`: BigDecimal (obrigatório, positivo)

---

## 🔌 Endpoints da API

### **Produtos**

#### Listar todos os produtos
```bash
GET /api/products
```

#### Buscar produto por ID
```bash
GET /api/products/{id}
```

#### Buscar produto por código
```bash
GET /api/products/code/{code}
```

#### Criar novo produto
```bash
POST /api/products
Content-Type: application/json

{
  "code": "PROD001",
  "name": "Cadeira de Escritório",
  "value": 450.00
}
```

#### Atualizar produto
```bash
PUT /api/products/{id}
Content-Type: application/json

{
  "code": "PROD001",
  "name": "Cadeira de Escritório Premium",
  "value": 500.00
}
```

#### Deletar produto
```bash
DELETE /api/products/{id}
```

---

### **Matérias-Primas**

#### Listar todas as matérias-primas
```bash
GET /api/raw-materials
```

#### Buscar matéria-prima por ID
```bash
GET /api/raw-materials/{id}
```

#### Buscar matéria-prima por código
```bash
GET /api/raw-materials/code/{code}
```

#### Criar nova matéria-prima
```bash
POST /api/raw-materials
Content-Type: application/json

{
  "code": "MAT001",
  "name": "Madeira de Pinus",
  "stockQuantity": 50.00
}
```

#### Atualizar matéria-prima
```bash
PUT /api/raw-materials/{id}
Content-Type: application/json

{
  "code": "MAT001",
  "name": "Madeira de Pinus Premium",
  "stockQuantity": 75.00
}
```

#### Deletar matéria-prima
```bash
DELETE /api/raw-materials/{id}
```

---

### **Associação Produto ↔ Matéria-Prima**

#### Listar matérias-primas de um produto
```bash
GET /api/products/{productId}/raw-materials
```

#### Adicionar matéria-prima a um produto
```bash
POST /api/products/{productId}/raw-materials
Content-Type: application/json

{
  "rawMaterialId": 1,
  "requiredQuantity": 0.15
}
```

#### Atualizar quantidade necessária
```bash
PUT /api/products/{productId}/raw-materials/{rawMaterialId}
Content-Type: application/json

{
  "rawMaterialId": 1,
  "requiredQuantity": 0.20
}
```

#### Remover matéria-prima de um produto
```bash
DELETE /api/products/{productId}/raw-materials/{rawMaterialId}
```

---

### **Sugestões de Produção** 🎯

#### Calcular sugestões de produção
```bash
GET /api/production/suggestions
```

**Retorna:** Lista de produtos que podem ser produzidos com o estoque atual, ordenados por valor (maior primeiro).

**Resposta exemplo:**
```json
[
  {
    "product": {
      "id": 5,
      "code": "PROD005",
      "name": "Sofá de 3 Lugares",
      "value": 2500.00
    },
    "maxQuantity": 18,
    "totalValue": 45000.00
  },
  {
    "product": {
      "id": 2,
      "code": "PROD002",
      "name": "Mesa de Jantar",
      "value": 1200.00
    },
    "maxQuantity": 100,
    "totalValue": 120000.00
  }
]
```

---

## 🧪 Testando a API

### Exemplos com cURL:

#### 1. Listar todos os produtos:
```bash
curl http://localhost:8080/api/products
```

#### 2. Criar um produto:
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "code": "PROD006",
    "name": "Mesa de Centro",
    "value": 350.00
  }'
```

#### 3. Listar matérias-primas:
```bash
curl http://localhost:8080/api/raw-materials
```

#### 4. Obter sugestões de produção:
```bash
curl http://localhost:8080/api/production/suggestions
```

#### 5. Adicionar matéria-prima a um produto:
```bash
curl -X POST http://localhost:8080/api/products/1/raw-materials \
  -H "Content-Type: application/json" \
  -d '{
    "rawMaterialId": 1,
    "requiredQuantity": 0.15
  }'
```

---

## 📦 Dados Iniciais

O projeto inclui um arquivo `data.sql` que popula o banco automaticamente com dados de exemplo:

- **5 Produtos** (móveis como cadeiras, mesas, estantes, etc.)
- **7 Matérias-primas** (madeira, tecido, parafusos, cola, verniz, dobradiças, espuma)
- **Associações** entre produtos e matérias-primas com quantidades necessárias

Os dados são inseridos automaticamente na inicialização da aplicação.

---

## ⚠️ Tratamento de Erros

A API retorna respostas padronizadas para erros:

### Recurso não encontrado (404):
```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Product not found with id: 999",
  "path": "/api/products/999",
  "timestamp": "2026-02-05T20:30:00"
}
```

### Erro de validação (400):
```json
{
  "status": 400,
  "error": "Validation Failed",
  "message": "Invalid input data",
  "fieldErrors": [
    {
      "field": "value",
      "message": "Product value must be positive"
    }
  ],
  "path": "/api/products",
  "timestamp": "2026-02-05T20:30:00"
}
```

### Erro de negócio (400):
```json
{
  "status": 400,
  "error": "Business Rule Violation",
  "message": "Product with code PROD001 already exists",
  "path": "/api/products",
  "timestamp": "2026-02-05T20:30:00"
}
```

---

## 🏗️ Arquitetura do Projeto

```
src/main/java/com/industry/inventory/
├── config/              # Configurações (CORS)
├── controller/          # Controllers REST
├── dto/                 # Data Transfer Objects
├── exception/           # Exceções e handlers
├── model/               # Entidades JPA
├── repository/          # Repositories Spring Data
└── service/             # Regras de negócio
```

---

## ✅ Status do Desenvolvimento

- ✅ **Etapa 1:** Estrutura inicial e configuração
- ✅ **Etapa 2:** Modelo de dados (entidades)
- ✅ **Etapa 3:** DTOs e conversores
- ✅ **Etapa 4:** Repositories
- ✅ **Etapa 5:** Exception handling
- ✅ **Etapa 6:** Service - Product
- ✅ **Etapa 7:** Service - Raw Material
- ✅ **Etapa 8:** Service - Associação Produto-Matéria Prima
- ✅ **Etapa 9:** Service - Lógica de Produção
- ✅ **Etapa 10:** Controller - Product
- ✅ **Etapa 11:** Controller - Raw Material
- ✅ **Etapa 12:** Controller - Associação
- ✅ **Etapa 13:** Controller - Produção
- ✅ **Etapa 14:** Testes e Validação Final

**🎉 PROJETO CONCLUÍDO COM SUCESSO!**

---

## 🔧 Configurações Importantes

### application.properties

```properties
# Porta da aplicação
server.port=8080

# Banco de dados PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/inventory_db
spring.datasource.username=postgres
spring.datasource.password=senha123

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Inicialização de dados
spring.sql.init.mode=always
```

---

## 🎯 Funcionalidades Principais

1. **CRUD Completo** de Produtos e Matérias-primas
2. **Associação** entre Produtos e Matérias-primas (com quantidades)
3. **Cálculo Inteligente** de sugestões de produção:
   - Verifica quais produtos podem ser produzidos
   - Calcula quantidade máxima baseada no estoque
   - Prioriza produtos de maior valor
   - Calcula valor total da produção
4. **Validações** robustas em todos os endpoints
5. **Tratamento de Erros** padronizado e amigável
6. **Dados Iniciais** para facilitar testes

---

## 📝 Observações

- O Hibernate está configurado com `ddl-auto=update` para criar/atualizar tabelas automaticamente
- As queries SQL são exibidas no console (útil para debug)
- CORS configurado para aceitar requisições de qualquer origem
- Validações implementadas usando Jakarta Validation
- Código profissional, limpo e bem documentado em português

---

## 👨‍💻 Desenvolvimento

Sistema desenvolvido seguindo as melhores práticas do Spring Boot e padrões de arquitetura REST.

**Tecnologias e Conceitos Aplicados:**
- Clean Code
- RESTful API Design
- Dependency Injection
- Repository Pattern
- DTO Pattern
- Exception Handling
- Bean Validation
- JPA/Hibernate
- Docker Containers

---

## 📄 Licença

Este projeto é de código aberto e está disponível para uso educacional e comercial.

