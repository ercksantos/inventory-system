# 🚀 Quick Start - Sistema de Controle de Estoque

Guia rápido para colocar o sistema funcionando em 5 minutos!

---

## Passo 1: Iniciar o Banco de Dados PostgreSQL

```bash
docker-compose up -d
```

✅ **Aguarde ~10 segundos** para o PostgreSQL inicializar completamente.

---

## Passo 2: Iniciar a Aplicação

```bash
./mvnw spring-boot:run
```

✅ **Aguarde** a mensagem: `Started InventorySystemApplication in X seconds`

---

## Passo 3: Testar a API

### Opção A: Teste Automatizado (Recomendado)

Em outro terminal, execute:

```bash
chmod +x test-api.sh
./test-api.sh
```

### Opção B: Teste Manual com curl

```bash
# Ver todos os produtos
curl http://localhost:8080/api/products

# Ver todas as matérias-primas
curl http://localhost:8080/api/raw-materials

# Ver sugestões de produção (FUNCIONALIDADE PRINCIPAL! 🎯)
curl http://localhost:8080/api/production/suggestions
```

### Opção C: Teste no Navegador

Abra no navegador:
- http://localhost:8080/api/products
- http://localhost:8080/api/raw-materials
- http://localhost:8080/api/production/suggestions

---

## 🎉 Pronto!

O sistema já está funcionando com **dados de exemplo**:
- ✅ 5 Produtos cadastrados
- ✅ 7 Matérias-primas com estoque
- ✅ Associações configuradas
- ✅ Cálculo de produção funcionando

---

## 📚 Próximos Passos

1. **Documentação Completa:** Leia o [README.md](README.md)
2. **Guia de Uso da API:** Consulte [API_USAGE_GUIDE.md](API_USAGE_GUIDE.md)
3. **Testar com Postman/Insomnia:** Use os exemplos do guia

---

## 🛑 Para Parar

### Parar a aplicação:
Pressione `Ctrl+C` no terminal da aplicação

### Parar o banco de dados:
```bash
docker-compose down
```

### Limpar tudo (apaga dados):
```bash
docker-compose down -v
```

---

## ⚡ Comandos Úteis

```bash
# Recompilar o projeto
./mvnw clean compile

# Executar testes
./mvnw test

# Gerar JAR executável
./mvnw package

# Ver logs do PostgreSQL
docker-compose logs -f postgres
```

---

## 🐛 Problemas Comuns

### Erro: "Connection refused" ao iniciar

**Solução:** Aguarde mais tempo para o PostgreSQL inicializar
```bash
docker-compose ps  # Verificar se está rodando
```

### Erro: "Port 8080 already in use"

**Solução:** Mude a porta no `application.properties`:
```properties
server.port=8081
```

### Erro: "Port 5432 already in use"

**Solução:** Você já tem PostgreSQL rodando. Pare-o ou mude a porta no `docker-compose.yml`

---

## 📞 API Base URL

```
http://localhost:8080
```

**Principais endpoints:**
- `/api/products` - Gerenciar produtos
- `/api/raw-materials` - Gerenciar matérias-primas
- `/api/products/{id}/raw-materials` - Associar matérias-primas
- `/api/production/suggestions` - **Sugestões de produção** 🎯

---

## ✨ Funcionalidade Destaque

### Sugestões Inteligentes de Produção

O sistema analisa automaticamente:
1. Quais produtos podem ser produzidos
2. Quantidade máxima baseada no estoque
3. Prioriza produtos de maior valor
4. Calcula valor total da produção

```bash
curl http://localhost:8080/api/production/suggestions
```

**Use isso para tomar decisões de produção!** 📊

---

**Dúvidas?** Consulte a documentação completa no [README.md](README.md)
