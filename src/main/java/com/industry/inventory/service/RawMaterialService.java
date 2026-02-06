package com.industry.inventory.service;

import com.industry.inventory.dto.RawMaterialRequestDTO;
import com.industry.inventory.dto.RawMaterialResponseDTO;
import com.industry.inventory.exception.BusinessException;
import com.industry.inventory.exception.ResourceNotFoundException;
import com.industry.inventory.model.RawMaterial;
import com.industry.inventory.repository.RawMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RawMaterialService {

    private final RawMaterialRepository rawMaterialRepository;

    @Transactional
    public RawMaterialResponseDTO create(RawMaterialRequestDTO requestDTO) {
        // Validate if code already exists
        if (rawMaterialRepository.existsByCode(requestDTO.getCode())) {
            throw new BusinessException("Raw material with code '" + requestDTO.getCode() + "' already exists");
        }

        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setCode(requestDTO.getCode());
        rawMaterial.setName(requestDTO.getName());
        rawMaterial.setStockQuantity(requestDTO.getStockQuantity());

        RawMaterial savedRawMaterial = rawMaterialRepository.save(rawMaterial);
        return toResponseDTO(savedRawMaterial);
    }

    @Transactional(readOnly = true)
    public List<RawMaterialResponseDTO> findAll() {
        return rawMaterialRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public RawMaterialResponseDTO findById(Long id) {
        RawMaterial rawMaterial = rawMaterialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Raw material not found with id: " + id));
        return toResponseDTO(rawMaterial);
    }

    @Transactional(readOnly = true)
    public RawMaterialResponseDTO findByCode(String code) {
        RawMaterial rawMaterial = rawMaterialRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Raw material not found with code: " + code));
        return toResponseDTO(rawMaterial);
    }

    @Transactional
    public RawMaterialResponseDTO update(Long id, RawMaterialRequestDTO requestDTO) {
        RawMaterial rawMaterial = rawMaterialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Raw material not found with id: " + id));

        // Validate if new code already exists for another raw material
        if (!rawMaterial.getCode().equals(requestDTO.getCode()) &&
            rawMaterialRepository.existsByCode(requestDTO.getCode())) {
            throw new BusinessException("Raw material with code '" + requestDTO.getCode() + "' already exists");
        }

        rawMaterial.setCode(requestDTO.getCode());
        rawMaterial.setName(requestDTO.getName());
        rawMaterial.setStockQuantity(requestDTO.getStockQuantity());

        RawMaterial updatedRawMaterial = rawMaterialRepository.save(rawMaterial);
        return toResponseDTO(updatedRawMaterial);
    }

    @Transactional
    public void delete(Long id) {
        if (!rawMaterialRepository.existsById(id)) {
            throw new ResourceNotFoundException("Raw material not found with id: " + id);
        }

        rawMaterialRepository.deleteById(id);
    }

    // Helper method to convert Entity to DTO
    private RawMaterialResponseDTO toResponseDTO(RawMaterial rawMaterial) {
        return new RawMaterialResponseDTO(
                rawMaterial.getId(),
                rawMaterial.getCode(),
                rawMaterial.getName(),
                rawMaterial.getStockQuantity()
        );
    }
}
