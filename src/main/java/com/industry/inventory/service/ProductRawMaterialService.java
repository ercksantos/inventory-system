package com.industry.inventory.service;

import com.industry.inventory.dto.ProductRawMaterialRequestDTO;
import com.industry.inventory.dto.ProductRawMaterialResponseDTO;
import com.industry.inventory.exception.BusinessException;
import com.industry.inventory.exception.ResourceNotFoundException;
import com.industry.inventory.model.Product;
import com.industry.inventory.model.ProductRawMaterial;
import com.industry.inventory.model.RawMaterial;
import com.industry.inventory.repository.ProductRawMaterialRepository;
import com.industry.inventory.repository.ProductRepository;
import com.industry.inventory.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductRawMaterialService {

    private final ProductRawMaterialRepository productRawMaterialRepository;
    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;

    @Transactional
    public ProductRawMaterialResponseDTO addRawMaterialToProduct(Long productId, ProductRawMaterialRequestDTO requestDTO) {
        // Valida se o produto existe
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        // Valida se a matéria-prima existe
        RawMaterial rawMaterial = rawMaterialRepository.findById(requestDTO.getRawMaterialId())
                .orElseThrow(() -> new ResourceNotFoundException("Raw material not found with id: " + requestDTO.getRawMaterialId()));

        // Valida se a associação já existe
        if (productRawMaterialRepository.findByProductIdAndRawMaterialId(productId, requestDTO.getRawMaterialId()).isPresent()) {
            throw new BusinessException("Raw material '" + rawMaterial.getName() + "' is already associated with product '" + product.getName() + "'");
        }

        ProductRawMaterial productRawMaterial = new ProductRawMaterial();
        productRawMaterial.setProduct(product);
        productRawMaterial.setRawMaterial(rawMaterial);
        productRawMaterial.setRequiredQuantity(requestDTO.getRequiredQuantity());

        ProductRawMaterial saved = productRawMaterialRepository.save(productRawMaterial);
        return toResponseDTO(saved);
    }

    @Transactional
    public ProductRawMaterialResponseDTO updateRawMaterialQuantity(Long productId, Long rawMaterialId, ProductRawMaterialRequestDTO requestDTO) {
        // Valida se o produto existe
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }

        // Valida se a matéria-prima existe
        if (!rawMaterialRepository.existsById(rawMaterialId)) {
            throw new ResourceNotFoundException("Raw material not found with id: " + rawMaterialId);
        }

        // Busca a associação
        ProductRawMaterial productRawMaterial = productRawMaterialRepository
                .findByProductIdAndRawMaterialId(productId, rawMaterialId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Association not found between product id: " + productId + " and raw material id: " + rawMaterialId));

        productRawMaterial.setRequiredQuantity(requestDTO.getRequiredQuantity());

        ProductRawMaterial updated = productRawMaterialRepository.save(productRawMaterial);
        return toResponseDTO(updated);
    }

    @Transactional
    public void removeRawMaterialFromProduct(Long productId, Long rawMaterialId) {
        // Valida se o produto existe
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }

        // Valida se a matéria-prima existe
        if (!rawMaterialRepository.existsById(rawMaterialId)) {
            throw new ResourceNotFoundException("Raw material not found with id: " + rawMaterialId);
        }

        // Valida se a associação existe
        ProductRawMaterial productRawMaterial = productRawMaterialRepository
                .findByProductIdAndRawMaterialId(productId, rawMaterialId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Association not found between product id: " + productId + " and raw material id: " + rawMaterialId));

        productRawMaterialRepository.delete(productRawMaterial);
    }

    @Transactional(readOnly = true)
    public List<ProductRawMaterialResponseDTO> getRawMaterialsByProduct(Long productId) {
        // Valida se o produto existe
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }

        return productRawMaterialRepository.findByProductId(productId)
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductRawMaterialResponseDTO getAssociation(Long productId, Long rawMaterialId) {
        // Valida se o produto existe
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }

        // Valida se a matéria-prima existe
        if (!rawMaterialRepository.existsById(rawMaterialId)) {
            throw new ResourceNotFoundException("Raw material not found with id: " + rawMaterialId);
        }

        ProductRawMaterial productRawMaterial = productRawMaterialRepository
                .findByProductIdAndRawMaterialId(productId, rawMaterialId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Association not found between product id: " + productId + " and raw material id: " + rawMaterialId));

        return toResponseDTO(productRawMaterial);
    }

    // Método auxiliar para converter Entidade em DTO
    private ProductRawMaterialResponseDTO toResponseDTO(ProductRawMaterial productRawMaterial) {
        return new ProductRawMaterialResponseDTO(
                productRawMaterial.getId(),
                productRawMaterial.getProduct().getId(),
                productRawMaterial.getProduct().getCode(),
                productRawMaterial.getProduct().getName(),
                productRawMaterial.getRawMaterial().getId(),
                productRawMaterial.getRawMaterial().getCode(),
                productRawMaterial.getRawMaterial().getName(),
                productRawMaterial.getRequiredQuantity()
        );
    }
}
