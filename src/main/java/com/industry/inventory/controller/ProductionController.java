package com.industry.inventory.controller;

import com.industry.inventory.dto.ProductionSuggestionDTO;
import com.industry.inventory.service.ProductionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller REST para sugestões de produção
 * Endpoints disponíveis:
 * - GET /api/production/suggestions - Calcula quais produtos podem ser produzidos com o estoque atual
 */
@RestController
@RequestMapping("/api/production")
@RequiredArgsConstructor
public class ProductionController {

    private final ProductionService productionService;

    /**
     * Calcula sugestões de produção baseado no estoque disponível de matérias-primas
     * Retorna lista de produtos que podem ser produzidos, ordenados por valor (maior primeiro)
     * Cada sugestão inclui:
     * - Dados do produto
     * - Quantidade máxima que pode ser produzida
     * - Valor total da produção (quantidade * valor unitário do produto)
     *
     * @return Lista de sugestões de produção com status 200 (OK)
     */
    @GetMapping("/suggestions")
    public ResponseEntity<List<ProductionSuggestionDTO>> getProductionSuggestions() {
        List<ProductionSuggestionDTO> suggestions = productionService.calculateProductionSuggestions();
        return ResponseEntity.ok(suggestions);
    }
}
