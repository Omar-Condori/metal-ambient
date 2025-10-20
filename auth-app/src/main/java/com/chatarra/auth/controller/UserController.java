package com.chatarra.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

@RestController
@RequestMapping("/api/users") // ¡Nota la nueva ruta base!
public class UserController {

    /**
     * Endpoint protegido para obtener el perfil del usuario autenticado.
     *
     * URL: GET http://localhost:8081/api/users/me
     * Requiere: Token de autorización (Bearer Token)
     *
     * @param principal Objeto inyectado por Spring Security con los datos del usuario.
     * @return El nombre de usuario (email) del usuario autenticado.
     */
    @GetMapping("/me")
    public ResponseEntity<String> getCurrentUserProfile(Principal principal) {
        // Spring Security, gracias al token, ya sabe quién es el usuario.
        // El objeto 'principal' contiene esa información.
        // principal.getName() devuelve el 'username' que se usó para crear el token.
        return ResponseEntity.ok("El perfil solicitado pertenece a: " + principal.getName());
    }
}