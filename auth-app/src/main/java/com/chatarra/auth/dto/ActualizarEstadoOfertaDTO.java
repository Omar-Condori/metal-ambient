package com.chatarra.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para actualizar el estado de una oferta (usado por admin)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActualizarEstadoOfertaDTO {

    @NotBlank(message = "El estado es obligatorio")
    private String nuevoEstado; // PENDIENTE, APROBADA, RECHAZADA, VENDIDA, CANCELADA
}