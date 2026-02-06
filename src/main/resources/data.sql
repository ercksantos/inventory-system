-- Script para popular o banco de dados com dados iniciais
-- Este arquivo é executado automaticamente pelo Spring Boot na inicialização

-- Limpar dados existentes (opcional, para ambiente de desenvolvimento)
DELETE FROM product_raw_material;
DELETE FROM raw_material;
DELETE FROM product;

-- Inserir Produtos
INSERT INTO product (id, code, name, value) VALUES
(1, 'PROD001', 'Cadeira de Escritório', 450.00),
(2, 'PROD002', 'Mesa de Jantar', 1200.00),
(3, 'PROD003', 'Estante para Livros', 680.00),
(4, 'PROD004', 'Armário de Cozinha', 890.00),
(5, 'PROD005', 'Sofá de 3 Lugares', 2500.00);

-- Inserir Matérias-Primas
INSERT INTO raw_material (id, code, name, stock_quantity) VALUES
(1, 'MAT001', 'Madeira de Pinus (m³)', 50.00),
(2, 'MAT002', 'Tecido para Estofamento (m²)', 120.00),
(3, 'MAT003', 'Parafusos (unidades)', 5000.00),
(4, 'MAT004', 'Cola para Madeira (litros)', 30.00),
(5, 'MAT005', 'Verniz (litros)', 25.00),
(6, 'MAT006', 'Dobradiças (unidades)', 200.00),
(7, 'MAT007', 'Espuma para Estofamento (m³)', 15.00);

-- Associar Matérias-Primas aos Produtos

-- PROD001: Cadeira de Escritório (valor: 450.00)
INSERT INTO product_raw_material (id, product_id, raw_material_id, required_quantity) VALUES
(1, 1, 1, 0.15),  -- 0.15 m³ de madeira
(2, 1, 2, 0.80),  -- 0.80 m² de tecido
(3, 1, 3, 20.00), -- 20 parafusos
(4, 1, 7, 0.05);  -- 0.05 m³ de espuma

-- PROD002: Mesa de Jantar (valor: 1200.00)
INSERT INTO product_raw_material (id, product_id, raw_material_id, required_quantity) VALUES
(5, 2, 1, 0.50),  -- 0.50 m³ de madeira
(6, 2, 3, 40.00), -- 40 parafusos
(7, 2, 4, 0.50),  -- 0.50 litros de cola
(8, 2, 5, 0.30);  -- 0.30 litros de verniz

-- PROD003: Estante para Livros (valor: 680.00)
INSERT INTO product_raw_material (id, product_id, raw_material_id, required_quantity) VALUES
(9, 3, 1, 0.35),  -- 0.35 m³ de madeira
(10, 3, 3, 30.00), -- 30 parafusos
(11, 3, 4, 0.30),  -- 0.30 litros de cola
(12, 3, 5, 0.20);  -- 0.20 litros de verniz

-- PROD004: Armário de Cozinha (valor: 890.00)
INSERT INTO product_raw_material (id, product_id, raw_material_id, required_quantity) VALUES
(13, 4, 1, 0.80),  -- 0.80 m³ de madeira
(14, 4, 3, 60.00), -- 60 parafusos
(15, 4, 4, 0.60),  -- 0.60 litros de cola
(16, 4, 5, 0.40),  -- 0.40 litros de verniz
(17, 4, 6, 8.00);  -- 8 dobradiças

-- PROD005: Sofá de 3 Lugares (valor: 2500.00)
INSERT INTO product_raw_material (id, product_id, raw_material_id, required_quantity) VALUES
(18, 5, 1, 0.25),  -- 0.25 m³ de madeira (estrutura)
(19, 5, 2, 6.00),  -- 6.00 m² de tecido
(20, 5, 3, 50.00), -- 50 parafusos
(21, 5, 7, 0.80);  -- 0.80 m³ de espuma

-- Resetar as sequences para próximos inserts
ALTER SEQUENCE product_id_seq RESTART WITH 6;
ALTER SEQUENCE raw_material_id_seq RESTART WITH 8;
ALTER SEQUENCE product_raw_material_id_seq RESTART WITH 22;
