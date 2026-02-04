# Inventory Management System
Sistema de controle de estoque para indústrias desenvolvido com Spring Boot 4.0.2 e Java 21.
## 🚀 Tecnologias
- **Java 21**
- **Spring Boot 4.0.2**
- **Spring Data JPA**
- **PostgreSQL 16**
- **Hibernate**
- **Lombok**
- **Docker & Docker Compose**
## 📋 Pré-requisitos
- Java 21 ou superior
- Maven 3.8+
- Docker e Docker Compose
## 🐳 Banco de Dados
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
## 🏃 Executando o Projeto
### Compilar:
```bash
./mvnw clean compile
```
### Executar:
```bash
./mvnw spring-boot:run
```
### Executar testes:
```bash
./mvnw test
```
A aplicação estará disponível em: `http://localhost:8080`
## 📊 Modelo de Dados
### Entidades:
#### Product (Produto)
- `id`: Long (PK)
- `code`: String (único)
- `name`: String
- `value`: BigDecimal
#### RawMaterial (Matéria-prima)
- `id`: Long (PK)
- `code`: String (único)
- `name`: String
- `stockQuantity`: BigDecimal
#### ProductRawMaterial (Associação)
- `id`: Long (PK)
- `product`: Product (FK)
- `rawMaterial`: RawMaterial (FK)
- `requiredQuantity`: BigDecimal
## 🔧 Status do Desenvolvimento
- ✅ Etapa 1: Estrutura inicial e configuração
- ✅ Etapa 2: Modelo de dados (entidades)
- ✅ Etapa 3: DTOs e conversores
- ✅ Etapa 4: Repositories
- ✅ Etapa 5: Exception handling
- ✅ Configuração Docker PostgreSQL
- ⏳ Etapa 6: Services (em andamento)
## 📝 Notas
- O Hibernate está configurado com `ddl-auto=update` para criar/atualizar as tabelas automaticamente
- As queries SQL são exibidas no console para debug (configurável em application.properties)
- CORS está configurado para aceitar requisições de qualquer origem no padrão `/api/**`
