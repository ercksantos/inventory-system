package com.industry.inventory.controller;

import com.industry.inventory.dto.RawMaterialRequestDTO;
import com.industry.inventory.dto.RawMaterialResponseDTO;
import com.industry.inventory.service.RawMaterialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST para gerenciamento de matérias-primas
 * Endpoints disponíveis:
 * - POST /api/raw-materials - Criar nova matéria-prima
 * - GET /api/raw-materials - Listar todas as matérias-primas
 * - GET /api/raw-materials/{id} - Buscar matéria-prima por ID
 * - GET /api/raw-materials/code/{code} - Buscar matéria-prima por código
 * - PUT /api/raw-materials/{id} - Atualizar matéria-prima
 * - DELETE /api/raw-materials/{id} - Deletar matéria-prima
 */
@RestController
@RequestMapping("/api/raw-materials")
@RequiredArgsConstructor
public class RawMaterialController {

    private final RawMaterialService rawMaterialService;

    /**
     * Cria uma nova matéria-prima no sistema
     *
     * @param requestDTO Dados da matéria-prima a ser criada
     * @return Matéria-prima criada com status 201 (CREATED)
     */
    @PostMapping
    public ResponseEntity<RawMaterialResponseDTO> create(@Valid @RequestBody RawMaterialRequestDTO requestDTO) {
        RawMaterialResponseDTO response = rawMaterialService.create(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Lista todas as matérias-primas cadastradas
     *
     * @return Lista de matérias-primas com status 200 (OK)
     */
    @GetMapping
    public ResponseEntity<List<RawMaterialResponseDTO>> findAll() {
        List<RawMaterialResponseDTO> rawMaterials = rawMaterialService.findAll();
        return ResponseEntity.ok(rawMaterials);
    }

    /**
     * Busca uma matéria-prima por ID
     *
     * @param id ID da matéria-prima
     * @return Matéria-prima encontrada com status 200 (OK)
     */
    @GetMapping("/{id}")
    public ResponseEntity<RawMaterialResponseDTO> findById(@PathVariable Long id) {
        RawMaterialResponseDTO response = rawMaterialService.findById(id);
        return ResponseEntity.ok(response);
    }

    /**
     * Busca uma matéria-prima por código
     *
     * @param code Código da matéria-prima
     * @return Matéria-prima encontrada com status 200 (OK)
     */
    @GetMapping("/code/{code}")
    public ResponseEntity<RawMaterialResponseDTO> findByCode(@PathVariable String code) {
        RawMaterialResponseDTO response = rawMaterialService.findByCode(code);
        return ResponseEntity.ok(response);
    }

    /**
     * Atualiza os dados de uma matéria-prima existente
     *
     * @param id ID da matéria-prima a ser atualizada
     * @param requestDTO Novos dados da matéria-prima
     * @return Matéria-prima atualizada com status 200 (OK)
     */
    @PutMapping("/{id}")
    public ResponseEntity<RawMaterialResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody RawMaterialRequestDTO requestDTO) {
        RawMaterialResponseDTO response = rawMaterialService.update(id, requestDTO);
        return ResponseEntity.ok(response);
    }

    /**
     * Remove uma matéria-prima do sistema
     *
     * @param id ID da matéria-prima a ser removida
     * @return Status 204 (NO_CONTENT) em caso de sucesso
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        rawMaterialService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
