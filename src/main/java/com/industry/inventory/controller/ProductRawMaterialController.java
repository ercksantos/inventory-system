package com.industry.inventory.controller;

import com.industry.inventory.dto.ProductRawMaterialRequestDTO;
import com.industry.inventory.dto.ProductRawMaterialResponseDTO;
import com.industry.inventory.service.ProductRawMaterialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST para gerenciamento da associação entre produtos e matérias-primas
 * Endpoints disponíveis:
 * - POST /api/products/{productId}/raw-materials - Adicionar matéria-prima ao produto
 * - DELETE /api/products/{productId}/raw-materials/{rawMaterialId} - Remover matéria-prima do produto
 * - PUT /api/products/{productId}/raw-materials/{rawMaterialId} - Atualizar quantidade necessária
 * - GET /api/products/{productId}/raw-materials - Listar matérias-primas do produto
 */
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductRawMaterialController {

    private final ProductRawMaterialService productRawMaterialService;

    /**
     * Adiciona uma matéria-prima a um produto com a quantidade necessária
     *
     * @param productId ID do produto
     * @param requestDTO Dados da matéria-prima e quantidade necessária
     * @return Associação criada com status 201 (CREATED)
     */
    @PostMapping("/{productId}/raw-materials")
    public ResponseEntity<ProductRawMaterialResponseDTO> addRawMaterialToProduct(
            @PathVariable Long productId,
            @Valid @RequestBody ProductRawMaterialRequestDTO requestDTO) {
        ProductRawMaterialResponseDTO response =
                productRawMaterialService.addRawMaterialToProduct(productId, requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Remove uma matéria-prima de um produto
     *
     * @param productId ID do produto
     * @param rawMaterialId ID da matéria-prima
     * @return Status 204 (NO_CONTENT) em caso de sucesso
     */
    @DeleteMapping("/{productId}/raw-materials/{rawMaterialId}")
    public ResponseEntity<Void> removeRawMaterialFromProduct(
            @PathVariable Long productId,
            @PathVariable Long rawMaterialId) {
        productRawMaterialService.removeRawMaterialFromProduct(productId, rawMaterialId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Atualiza a quantidade necessária de uma matéria-prima para um produto
     *
     * @param productId ID do produto
     * @param rawMaterialId ID da matéria-prima
     * @param requestDTO Nova quantidade necessária
     * @return Associação atualizada com status 200 (OK)
     */
    @PutMapping("/{productId}/raw-materials/{rawMaterialId}")
    public ResponseEntity<ProductRawMaterialResponseDTO> updateRawMaterialQuantity(
            @PathVariable Long productId,
            @PathVariable Long rawMaterialId,
            @Valid @RequestBody ProductRawMaterialRequestDTO requestDTO) {
        ProductRawMaterialResponseDTO response =
                productRawMaterialService.updateRawMaterialQuantity(productId, rawMaterialId, requestDTO);
        return ResponseEntity.ok(response);
    }

    /**
     * Lista todas as matérias-primas associadas a um produto
     *
     * @param productId ID do produto
     * @return Lista de matérias-primas com quantidades necessárias e status 200 (OK)
     */
    @GetMapping("/{productId}/raw-materials")
    public ResponseEntity<List<ProductRawMaterialResponseDTO>> getRawMaterialsByProduct(
            @PathVariable Long productId) {
        List<ProductRawMaterialResponseDTO> rawMaterials =
                productRawMaterialService.getRawMaterialsByProduct(productId);
        return ResponseEntity.ok(rawMaterials);
    }
}
