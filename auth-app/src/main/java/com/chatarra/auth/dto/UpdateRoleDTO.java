package com.chatarra.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

// DTO para la petición de cambio de rol
@Data
public class UpdateRoleDTO {
    @NotBlank(message = "El nuevo rol no puede estar vacío")
    private String newRole;
}
