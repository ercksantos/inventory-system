package com.industry.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductionSuggestionDTO {

    private Long productId;
    private String productCode;
    private String productName;
    private BigDecimal productValue;
    private BigDecimal maxQuantityProducible;
    private BigDecimal totalValue;
}
