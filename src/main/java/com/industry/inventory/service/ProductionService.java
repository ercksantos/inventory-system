package com.industry.inventory.service;

import com.industry.inventory.dto.ProductionSuggestionDTO;
import com.industry.inventory.model.Product;
import com.industry.inventory.model.ProductRawMaterial;
import com.industry.inventory.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductionService {

    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<ProductionSuggestionDTO> calculateProductionSuggestions() {
        List<Product> allProducts = productRepository.findAll();
        List<ProductionSuggestionDTO> suggestions = new ArrayList<>();

        for (Product product : allProducts) {
            // Verifica se o produto tem matérias-primas associadas
            if (product.getRawMaterials().isEmpty()) {
                continue;
            }

            // Calcula a quantidade máxima que pode ser produzida
            BigDecimal maxQuantity = calculateMaxQuantityProducible(product);

            // Se pode produzir pelo menos uma unidade, adiciona à lista de sugestões
            if (maxQuantity.compareTo(BigDecimal.ZERO) > 0) {
                BigDecimal totalValue = product.getValue().multiply(maxQuantity);

                ProductionSuggestionDTO suggestion = new ProductionSuggestionDTO(
                        product.getId(),
                        product.getCode(),
                        product.getName(),
                        product.getValue(),
                        maxQuantity,
                        totalValue
                );

                suggestions.add(suggestion);
            }
        }

        // Ordena por valor total decrescente (produtos de maior valor primeiro)
        suggestions.sort(Comparator.comparing(ProductionSuggestionDTO::getTotalValue).reversed());

        return suggestions;
    }

    /**
     * Calcula a quantidade máxima de um produto que pode ser produzida
     * com base no estoque disponível de matérias-primas
     */
    private BigDecimal calculateMaxQuantityProducible(Product product) {
        BigDecimal maxQuantity = null;

        // Para cada matéria-prima necessária, calcula quantas unidades podem ser produzidas
        for (ProductRawMaterial prm : product.getRawMaterials()) {
            BigDecimal stockQuantity = prm.getRawMaterial().getStockQuantity();
            BigDecimal requiredQuantity = prm.getRequiredQuantity();

            // Calcula quantas unidades do produto podem ser feitas com esta matéria-prima
            BigDecimal possibleQuantity = stockQuantity.divide(requiredQuantity, 0, RoundingMode.DOWN);

            // A quantidade máxima é limitada pela matéria-prima mais escassa
            if (maxQuantity == null || possibleQuantity.compareTo(maxQuantity) < 0) {
                maxQuantity = possibleQuantity;
            }
        }

        return maxQuantity != null ? maxQuantity : BigDecimal.ZERO;
    }
}
