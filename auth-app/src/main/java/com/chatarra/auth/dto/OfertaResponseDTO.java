package com.chatarra.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO para respuesta de oferta (con información completa)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OfertaResponseDTO {

    private Long id;
    private Long vendedorId;
    private String vendedorNombre;
    private String tipoMaterial;
    private BigDecimal cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal precioTotal;
    private String descripcion;
    private String ubicacion;
    private String estado;
    private String imagenUrl;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
}