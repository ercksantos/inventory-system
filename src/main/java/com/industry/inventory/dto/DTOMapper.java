package com.industry.inventory.dto;

import com.industry.inventory.model.Product;
import com.industry.inventory.model.ProductRawMaterial;
import com.industry.inventory.model.RawMaterial;

public class DTOMapper {

    // Mapeadores de Product
    public static ProductResponseDTO toProductResponseDTO(Product product) {
        if (product == null) {
            return null;
        }
        return new ProductResponseDTO(
                product.getId(),
                product.getCode(),
                product.getName(),
                product.getValue()
        );
    }

    public static Product toProductEntity(ProductRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        Product product = new Product();
        product.setCode(dto.getCode());
        product.setName(dto.getName());
        product.setValue(dto.getValue());
        return product;
    }

    public static void updateProductFromDTO(Product product, ProductRequestDTO dto) {
        if (product != null && dto != null) {
            product.setCode(dto.getCode());
            product.setName(dto.getName());
            product.setValue(dto.getValue());
        }
    }

    // Mapeadores de RawMaterial
    public static RawMaterialResponseDTO toRawMaterialResponseDTO(RawMaterial rawMaterial) {
        if (rawMaterial == null) {
            return null;
        }
        return new RawMaterialResponseDTO(
                rawMaterial.getId(),
                rawMaterial.getCode(),
                rawMaterial.getName(),
                rawMaterial.getStockQuantity()
        );
    }

    public static RawMaterial toRawMaterialEntity(RawMaterialRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setCode(dto.getCode());
        rawMaterial.setName(dto.getName());
        rawMaterial.setStockQuantity(dto.getStockQuantity());
        return rawMaterial;
    }

    public static void updateRawMaterialFromDTO(RawMaterial rawMaterial, RawMaterialRequestDTO dto) {
        if (rawMaterial != null && dto != null) {
            rawMaterial.setCode(dto.getCode());
            rawMaterial.setName(dto.getName());
            rawMaterial.setStockQuantity(dto.getStockQuantity());
        }
    }

    // Mapeadores de ProductRawMaterial
    public static ProductRawMaterialResponseDTO toProductRawMaterialResponseDTO(ProductRawMaterial prm) {
        if (prm == null) {
            return null;
        }
        return new ProductRawMaterialResponseDTO(
                prm.getId(),
                prm.getProduct().getId(),
                prm.getProduct().getCode(),
                prm.getProduct().getName(),
                prm.getRawMaterial().getId(),
                prm.getRawMaterial().getCode(),
                prm.getRawMaterial().getName(),
                prm.getRequiredQuantity(),
                prm.getRawMaterial().getStockQuantity()
        );
    }
}
