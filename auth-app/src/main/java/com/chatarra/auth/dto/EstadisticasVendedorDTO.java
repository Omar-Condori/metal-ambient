package com.chatarra.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EstadisticasVendedorDTO {
    // Contadores de ofertas por estado
    private Long ofertasActivas;      // APROBADA
    private Long ofertasPendientes;   // PENDIENTE
    private Long ofertasVendidas;     // VENDIDA
    private Long ofertasRechazadas;   // RECHAZADA
    private Long totalOfertas;        // Suma de todas

    // Métricas financieras
    private BigDecimal totalVendido;   // Suma de precio_total de ofertas VENDIDAS
    private BigDecimal promedioVenta;  // totalVendido / ofertasVendidas
}