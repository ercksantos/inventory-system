#!/bin/bash

# Script de Teste da API do Sistema de Controle de Estoque
# Execute após iniciar a aplicação com: ./mvnw spring-boot:run

echo "=========================================="
echo "  TESTE DA API - INVENTORY SYSTEM"
echo "=========================================="
echo ""

BASE_URL="http://localhost:8080"

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para testar endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local data=$4

    echo -e "${BLUE}[TEST]${NC} $description"
    echo "Request: $method $endpoint"

    if [ -z "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo -e "${GREEN}✓ SUCCESS${NC} - HTTP $http_code"
    else
        echo -e "${RED}✗ FAILED${NC} - HTTP $http_code"
    fi

    if [ ! -z "$body" ]; then
        echo "Response: $body" | head -c 200
        echo "..."
    fi
    echo ""
    echo "---"
    echo ""
}

echo "Aguardando aplicação estar disponível..."
sleep 3

# TESTES DE PRODUTOS
echo -e "${BLUE}══════════════════════════════════════════${NC}"
echo -e "${BLUE}  TESTANDO ENDPOINTS DE PRODUTOS${NC}"
echo -e "${BLUE}══════════════════════════════════════════${NC}"
echo ""

test_endpoint "GET" "/api/products" "Listar todos os produtos"

test_endpoint "GET" "/api/products/1" "Buscar produto por ID"

test_endpoint "GET" "/api/products/code/PROD001" "Buscar produto por código"

# TESTES DE MATÉRIAS-PRIMAS
echo -e "${BLUE}══════════════════════════════════════════${NC}"
echo -e "${BLUE}  TESTANDO ENDPOINTS DE MATÉRIAS-PRIMAS${NC}"
echo -e "${BLUE}══════════════════════════════════════════${NC}"
echo ""

test_endpoint "GET" "/api/raw-materials" "Listar todas as matérias-primas"

test_endpoint "GET" "/api/raw-materials/1" "Buscar matéria-prima por ID"

test_endpoint "GET" "/api/raw-materials/code/MAT001" "Buscar matéria-prima por código"

# TESTES DE ASSOCIAÇÃO
echo -e "${BLUE}══════════════════════════════════════════${NC}"
echo -e "${BLUE}  TESTANDO ENDPOINTS DE ASSOCIAÇÃO${NC}"
echo -e "${BLUE}══════════════════════════════════════════${NC}"
echo ""

test_endpoint "GET" "/api/products/1/raw-materials" "Listar matérias-primas do produto 1"

# TESTE DE PRODUÇÃO (FUNCIONALIDADE PRINCIPAL)
echo -e "${BLUE}══════════════════════════════════════════${NC}"
echo -e "${BLUE}  TESTANDO SUGESTÕES DE PRODUÇÃO 🎯${NC}"
echo -e "${BLUE}══════════════════════════════════════════${NC}"
echo ""

test_endpoint "GET" "/api/production/suggestions" "Calcular sugestões de produção"

# TESTE DE CRIAÇÃO (Opcional - descomente se quiser testar criação)
# echo -e "${BLUE}══════════════════════════════════════════${NC}"
# echo -e "${BLUE}  TESTANDO CRIAÇÃO DE RECURSOS${NC}"
# echo -e "${BLUE}══════════════════════════════════════════${NC}"
# echo ""
#
# test_endpoint "POST" "/api/products" "Criar novo produto" \
#     '{"code":"PROD999","name":"Produto Teste","value":100.00}'
#
# test_endpoint "POST" "/api/raw-materials" "Criar nova matéria-prima" \
#     '{"code":"MAT999","name":"Material Teste","stockQuantity":50.00}'

echo ""
echo -e "${GREEN}=========================================="
echo -e "  TESTES CONCLUÍDOS!"
echo -e "==========================================${NC}"
echo ""
echo "Para testes mais detalhados, use ferramentas como:"
echo "  - Postman"
echo "  - Insomnia"
echo "  - curl (manual)"
echo ""
