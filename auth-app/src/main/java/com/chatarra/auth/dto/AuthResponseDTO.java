package com.chatarra.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {

    private String token;
    private String tipo = "Bearer";
    private Long id;
    private String nombreCompleto;
    private String email;
    private String rol;  // ← NUEVO: Campo rol

    public AuthResponseDTO(String token, Long id, String nombreCompleto, String email, String rol) {
        this.token = token;
        this.id = id;
        this.nombreCompleto = nombreCompleto;
        this.email = email;
        this.rol = rol;  // ← NUEVO
    }
}