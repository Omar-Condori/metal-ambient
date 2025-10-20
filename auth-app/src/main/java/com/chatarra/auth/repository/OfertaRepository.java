package com.chatarra.auth.repository;

import com.chatarra.auth.entity.Oferta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface OfertaRepository extends JpaRepository<Oferta, Long> {

    /**
     * Encuentra todas las ofertas de un vendedor específico
     */
    List<Oferta> findByVendedorIdOrderByFechaCreacionDesc(Long vendedorId);

    /**
     * Encuentra ofertas por estado (ÚNICA DEFINICIÓN)
     */
    List<Oferta> findByEstadoOrderByFechaCreacionDesc(Oferta.EstadoOferta estado);

    /**
     * Encuentra ofertas de un vendedor con un estado específico
     */
    List<Oferta> findByVendedorIdAndEstado(Long vendedorId, Oferta.EstadoOferta estado);

    /**
     * Cuenta las ofertas de un vendedor por estado
     */
    long countByVendedorIdAndEstado(Long vendedorId, Oferta.EstadoOferta estado);

    /**
     * Calcula el total vendido por un vendedor (ofertas VENDIDAS)
     */
    @Query("SELECT COALESCE(SUM(o.precioTotal), 0) FROM Oferta o WHERE o.vendedor.id = :vendedorId AND o.estado = 'VENDIDA'")
    BigDecimal calcularTotalVendidoPorVendedor(@Param("vendedorId") Long vendedorId);

    /**
     * Encuentra las ofertas más recientes de un vendedor (limitado)
     */
    List<Oferta> findTop5ByVendedorIdOrderByFechaCreacionDesc(Long vendedorId);
}