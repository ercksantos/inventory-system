package com.industry.inventory.repository;

import com.industry.inventory.model.ProductRawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRawMaterialRepository extends JpaRepository<ProductRawMaterial, Long> {

    List<ProductRawMaterial> findByProductId(Long productId);

    @Query("SELECT prm FROM ProductRawMaterial prm WHERE prm.product.id = :productId AND prm.rawMaterial.id = :rawMaterialId")
    Optional<ProductRawMaterial> findByProductIdAndRawMaterialId(
            @Param("productId") Long productId,
            @Param("rawMaterialId") Long rawMaterialId
    );

    void deleteByProductIdAndRawMaterialId(Long productId, Long rawMaterialId);
}
