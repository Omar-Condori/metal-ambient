package com.chatarra.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// DTO para mostrar la información de un usuario de forma segura
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String nombreCompleto;
    private String email;
    private String rol;
    private boolean activo;
    private LocalDateTime fechaRegistro;
}
