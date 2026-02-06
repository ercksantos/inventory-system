package com.industry.inventory.service;

import com.industry.inventory.dto.ProductRequestDTO;
import com.industry.inventory.dto.ProductResponseDTO;
import com.industry.inventory.exception.BusinessException;
import com.industry.inventory.exception.ResourceNotFoundException;
import com.industry.inventory.model.Product;
import com.industry.inventory.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional
    public ProductResponseDTO create(ProductRequestDTO requestDTO) {
        // Valida se o código já existe
        if (productRepository.existsByCode(requestDTO.getCode())) {
            throw new BusinessException("Product with code '" + requestDTO.getCode() + "' already exists");
        }

        Product product = new Product();
        product.setCode(requestDTO.getCode());
        product.setName(requestDTO.getName());
        product.setValue(requestDTO.getValue());

        Product savedProduct = productRepository.save(product);
        return toResponseDTO(savedProduct);
    }

    @Transactional(readOnly = true)
    public List<ProductResponseDTO> findAll() {
        return productRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductResponseDTO findById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return toResponseDTO(product);
    }

    @Transactional(readOnly = true)
    public ProductResponseDTO findByCode(String code) {
        Product product = productRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with code: " + code));
        return toResponseDTO(product);
    }

    @Transactional
    public ProductResponseDTO update(Long id, ProductRequestDTO requestDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        // Valida se o novo código já existe para outro produto
        if (!product.getCode().equals(requestDTO.getCode()) &&
            productRepository.existsByCode(requestDTO.getCode())) {
            throw new BusinessException("Product with code '" + requestDTO.getCode() + "' already exists");
        }

        product.setCode(requestDTO.getCode());
        product.setName(requestDTO.getName());
        product.setValue(requestDTO.getValue());

        Product updatedProduct = productRepository.save(product);
        return toResponseDTO(updatedProduct);
    }

    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }

        productRepository.deleteById(id);
    }

    // Método auxiliar para converter Entidade em DTO
    private ProductResponseDTO toResponseDTO(Product product) {
        return new ProductResponseDTO(
                product.getId(),
                product.getCode(),
                product.getName(),
                product.getValue()
        );
    }
}
