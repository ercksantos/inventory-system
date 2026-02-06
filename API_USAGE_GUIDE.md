# Guia de Uso da API - Sistema de Controle de Estoque

Este documento contém exemplos práticos de uso da API do sistema.

---

## 📋 Índice

1. [Gerenciamento de Produtos](#gerenciamento-de-produtos)
2. [Gerenciamento de Matérias-Primas](#gerenciamento-de-matérias-primas)
3. [Associação Produto-Matéria Prima](#associação-produto-matéria-prima)
4. [Sugestões de Produção](#sugestões-de-produção)
5. [Cenários de Uso](#cenários-de-uso)

---

## Gerenciamento de Produtos

### 1. Listar todos os produtos

```bash
curl http://localhost:8080/api/products
```

**Resposta esperada:**
```json
[
  {
    "id": 1,
    "code": "PROD001",
    "name": "Cadeira de Escritório",
    "value": 450.00
  },
  {
    "id": 2,
    "code": "PROD002",
    "name": "Mesa de Jantar",
    "value": 1200.00
  }
]
```

### 2. Buscar produto por ID

```bash
curl http://localhost:8080/api/products/1
```

### 3. Buscar produto por código

```bash
curl http://localhost:8080/api/products/code/PROD001
```

### 4. Criar novo produto

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "code": "PROD006",
    "name": "Mesa de Centro",
    "value": 350.00
  }'
```

**Resposta esperada (201 CREATED):**
```json
{
  "id": 6,
  "code": "PROD006",
  "name": "Mesa de Centro",
  "value": 350.00
}
```

### 5. Atualizar produto

```bash
curl -X PUT http://localhost:8080/api/products/6 \
  -H "Content-Type: application/json" \
  -d '{
    "code": "PROD006",
    "name": "Mesa de Centro Premium",
    "value": 450.00
  }'
```

### 6. Deletar produto

```bash
curl -X DELETE http://localhost:8080/api/products/6
```

**Resposta esperada:** 204 NO CONTENT

---

## Gerenciamento de Matérias-Primas

### 1. Listar todas as matérias-primas

```bash
curl http://localhost:8080/api/raw-materials
```

**Resposta esperada:**
```json
[
  {
    "id": 1,
    "code": "MAT001",
    "name": "Madeira de Pinus (m³)",
    "stockQuantity": 50.00
  },
  {
    "id": 2,
    "code": "MAT002",
    "name": "Tecido para Estofamento (m²)",
    "stockQuantity": 120.00
  }
]
```

### 2. Buscar matéria-prima por ID

```bash
curl http://localhost:8080/api/raw-materials/1
```

### 3. Buscar matéria-prima por código

```bash
curl http://localhost:8080/api/raw-materials/code/MAT001
```

### 4. Criar nova matéria-prima

```bash
curl -X POST http://localhost:8080/api/raw-materials \
  -H "Content-Type: application/json" \
  -d '{
    "code": "MAT008",
    "name": "Tinta Acrílica (litros)",
    "stockQuantity": 40.00
  }'
```

### 5. Atualizar estoque de matéria-prima

```bash
curl -X PUT http://localhost:8080/api/raw-materials/1 \
  -H "Content-Type: application/json" \
  -d '{
    "code": "MAT001",
    "name": "Madeira de Pinus (m³)",
    "stockQuantity": 75.00
  }'
```

### 6. Deletar matéria-prima

```bash
curl -X DELETE http://localhost:8080/api/raw-materials/8
```

---

## Associação Produto-Matéria Prima

### 1. Listar matérias-primas de um produto

```bash
curl http://localhost:8080/api/products/1/raw-materials
```

**Resposta esperada:**
```json
[
  {
    "id": 1,
    "product": {
      "id": 1,
      "code": "PROD001",
      "name": "Cadeira de Escritório",
      "value": 450.00
    },
    "rawMaterial": {
      "id": 1,
      "code": "MAT001",
      "name": "Madeira de Pinus (m³)",
      "stockQuantity": 50.00
    },
    "requiredQuantity": 0.15
  },
  {
    "id": 2,
    "product": {
      "id": 1,
      "code": "PROD001",
      "name": "Cadeira de Escritório",
      "value": 450.00
    },
    "rawMaterial": {
      "id": 2,
      "code": "MAT002",
      "name": "Tecido para Estofamento (m²)",
      "stockQuantity": 120.00
    },
    "requiredQuantity": 0.80
  }
]
```

### 2. Adicionar matéria-prima a um produto

```bash
curl -X POST http://localhost:8080/api/products/6/raw-materials \
  -H "Content-Type: application/json" \
  -d '{
    "rawMaterialId": 1,
    "requiredQuantity": 0.25
  }'
```

**Resposta esperada (201 CREATED):**
```json
{
  "id": 22,
  "product": {
    "id": 6,
    "code": "PROD006",
    "name": "Mesa de Centro",
    "value": 350.00
  },
  "rawMaterial": {
    "id": 1,
    "code": "MAT001",
    "name": "Madeira de Pinus (m³)",
    "stockQuantity": 50.00
  },
  "requiredQuantity": 0.25
}
```

### 3. Atualizar quantidade necessária

```bash
curl -X PUT http://localhost:8080/api/products/6/raw-materials/1 \
  -H "Content-Type: application/json" \
  -d '{
    "rawMaterialId": 1,
    "requiredQuantity": 0.30
  }'
```

### 4. Remover matéria-prima de um produto

```bash
curl -X DELETE http://localhost:8080/api/products/6/raw-materials/1
```

**Resposta esperada:** 204 NO CONTENT

---

## Sugestões de Produção

### Calcular sugestões de produção

Este é o **endpoint mais importante** do sistema! Ele analisa o estoque disponível e retorna quais produtos podem ser produzidos.

```bash
curl http://localhost:8080/api/production/suggestions
```

**Resposta esperada:**
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
  },
  {
    "product": {
      "id": 4,
      "code": "PROD004",
      "name": "Armário de Cozinha",
      "value": 890.00
    },
    "maxQuantity": 62,
    "totalValue": 55180.00
  },
  {
    "product": {
      "id": 3,
      "code": "PROD003",
      "name": "Estante para Livros",
      "value": 680.00
    },
    "maxQuantity": 83,
    "totalValue": 56440.00
  },
  {
    "product": {
      "id": 1,
      "code": "PROD001",
      "name": "Cadeira de Escritório",
      "value": 450.00
    },
    "maxQuantity": 150,
    "totalValue": 67500.00
  }
]
```

**Como interpretar:**
- Lista ordenada por **valor do produto** (maior primeiro)
- `maxQuantity`: quantidade máxima que pode ser produzida com o estoque atual
- `totalValue`: valor total se produzir todas as unidades possíveis
- Produtos sem matérias-primas suficientes **não aparecem** na lista

---

## Cenários de Uso

### Cenário 1: Cadastrar um novo produto completo

```bash
# 1. Criar o produto
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "code": "PROD007",
    "name": "Banco de Madeira",
    "value": 280.00
  }'

# 2. Adicionar matéria-prima 1 (Madeira)
curl -X POST http://localhost:8080/api/products/7/raw-materials \
  -H "Content-Type: application/json" \
  -d '{
    "rawMaterialId": 1,
    "requiredQuantity": 0.20
  }'

# 3. Adicionar matéria-prima 2 (Parafusos)
curl -X POST http://localhost:8080/api/products/7/raw-materials \
  -H "Content-Type: application/json" \
  -d '{
    "rawMaterialId": 3,
    "requiredQuantity": 15.00
  }'

# 4. Adicionar matéria-prima 3 (Verniz)
curl -X POST http://localhost:8080/api/products/7/raw-materials \
  -H "Content-Type: application/json" \
  -d '{
    "rawMaterialId": 5,
    "requiredQuantity": 0.15
  }'
```

### Cenário 2: Atualizar estoque e verificar produção

```bash
# 1. Verificar estoque atual de madeira
curl http://localhost:8080/api/raw-materials/1

# 2. Atualizar estoque (chegou mais madeira)
curl -X PUT http://localhost:8080/api/raw-materials/1 \
  -H "Content-Type: application/json" \
  -d '{
    "code": "MAT001",
    "name": "Madeira de Pinus (m³)",
    "stockQuantity": 100.00
  }'

# 3. Recalcular sugestões de produção
curl http://localhost:8080/api/production/suggestions
```

### Cenário 3: Verificar composição de um produto

```bash
# Ver todas as matérias-primas necessárias para produzir o Sofá
curl http://localhost:8080/api/products/5/raw-materials
```

### Cenário 4: Buscar produto específico

```bash
# Por código (mais comum em sistemas industriais)
curl http://localhost:8080/api/products/code/PROD001

# Por ID
curl http://localhost:8080/api/products/1
```

---

## Tratamento de Erros - Exemplos

### Erro 1: Produto não encontrado (404)

```bash
curl http://localhost:8080/api/products/999
```

**Resposta:**
```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Product not found with id: 999",
  "path": "/api/products/999",
  "timestamp": "2026-02-05T20:30:00"
}
```

### Erro 2: Validação de dados (400)

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "code": "PROD001",
    "name": "",
    "value": -100.00
  }'
```

**Resposta:**
```json
{
  "status": 400,
  "error": "Validation Failed",
  "message": "Invalid input data",
  "fieldErrors": [
    {
      "field": "name",
      "message": "Product name is required"
    },
    {
      "field": "value",
      "message": "Product value must be positive"
    }
  ],
  "path": "/api/products",
  "timestamp": "2026-02-05T20:30:00"
}
```

### Erro 3: Código duplicado (400)

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "code": "PROD001",
    "name": "Produto Duplicado",
    "value": 100.00
  }'
```

**Resposta:**
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

## Dicas de Uso

### 1. Usando com Postman

Importe a coleção de endpoints criando uma nova collection com as seguintes URLs base:
- **Base URL:** `http://localhost:8080`
- **Headers:** `Content-Type: application/json`

### 2. Usando com Insomnia

Crie um novo workspace e adicione os endpoints listados neste guia.

### 3. Testando no navegador

Endpoints GET podem ser testados diretamente no navegador:
- http://localhost:8080/api/products
- http://localhost:8080/api/raw-materials
- http://localhost:8080/api/production/suggestions

### 4. Formato dos dados

- Todos os valores numéricos devem ter **2 casas decimais**
- Códigos são **case-sensitive** (PROD001 ≠ prod001)
- IDs são gerados automaticamente pelo banco

---

## Fluxo Completo de Uso

```
1. Cadastrar Produtos
   ↓
2. Cadastrar Matérias-Primas
   ↓
3. Associar Matérias-Primas aos Produtos
   ↓
4. Consultar Sugestões de Produção
   ↓
5. Atualizar Estoque conforme necessário
   ↓
6. Reconsultar Sugestões de Produção
```

---

**📝 Observação:** Todos os exemplos assumem que a aplicação está rodando em `http://localhost:8080`. Se você alterou a porta no `application.properties`, ajuste os exemplos conforme necessário.
