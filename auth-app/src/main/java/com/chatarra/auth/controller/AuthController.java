package com.chatarra.auth.controller;

import com.chatarra.auth.dto.AuthResponseDTO;
import com.chatarra.auth.dto.LoginDTO;
import com.chatarra.auth.dto.RegistroDTO;
import com.chatarra.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controlador REST para endpoints de autenticación.
 *
 * Endpoints disponibles:
 * - POST /api/auth/register - Registrar nuevo usuario
 * - POST /api/auth/login - Autenticar usuario
 * - GET /api/auth/test - Verificar que la API está funcionando
 * - GET /api/auth/info - Información sobre la API
 *
 * @RestController - Indica que esta clase es un controlador REST
 * @RequestMapping - Define la ruta base para todos los endpoints
 * @CrossOrigin - Permite peticiones desde cualquier origen (necesario para frontend)
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")  // En producción, especifica el dominio del frontend
public class AuthController {

    private final AuthService authService;

    /**
     * Endpoint para registrar un nuevo usuario.
     *
     * URL: POST http://localhost:8080/api/auth/register
     *
     * Body (JSON):
     * {
     *   "nombreCompleto": "Juan Pérez",
     *   "email": "juan@test.com",
     *   "password": "123456"
     * }
     *
     * Respuesta exitosa (201 CREATED):
     * {
     *   "token": "eyJhbGciOiJIUzI1NiJ9...",
     *   "tipo": "Bearer",
     *   "id": 1,
     *   "nombreCompleto": "Juan Pérez",
     *   "email": "juan@test.com"
     * }
     *
     * @param registroDTO Datos del nuevo usuario
     * @return ResponseEntity con AuthResponseDTO
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> registrar(@Valid @RequestBody RegistroDTO registroDTO) {
        log.info("POST /api/auth/register - Registrando usuario: {}", registroDTO.getEmail());

        try {
            // Llamar al servicio para registrar el usuario
            AuthResponseDTO response = authService.registrar(registroDTO);

            log.info("Usuario registrado exitosamente: {}", registroDTO.getEmail());

            // Retornar respuesta con status 201 (CREATED)
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            // Las excepciones son manejadas por GlobalExceptionHandler
            log.error("Error al registrar usuario: {}", e.getMessage());
            throw e;
        }
    }

    /**
     * Endpoint para autenticar un usuario (login).
     *
     * URL: POST http://localhost:8080/api/auth/login
     *
     * Body (JSON):
     * {
     *   "email": "juan@test.com",
     *   "password": "123456"
     * }
     *
     * Respuesta exitosa (200 OK):
     * {
     *   "token": "eyJhbGciOiJIUzI1NiJ9...",
     *   "tipo": "Bearer",
     *   "id": 1,
     *   "nombreCompleto": "Juan Pérez",
     *   "email": "juan@test.com"
     * }
     *
     * @param loginDTO Credenciales del usuario
     * @return ResponseEntity con AuthResponseDTO
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginDTO loginDTO) {
        log.info("POST /api/auth/login - Usuario intentando login: {}", loginDTO.getEmail());

        try {
            // Llamar al servicio para autenticar el usuario
            AuthResponseDTO response = authService.login(loginDTO);

            log.info("Login exitoso para: {}", loginDTO.getEmail());

            // Retornar respuesta con status 200 (OK)
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            // Las excepciones son manejadas por GlobalExceptionHandler
            log.error("Error al autenticar usuario: {}", e.getMessage());
            throw e;
        }
    }

    /**
     * Endpoint de prueba para verificar que el servidor está funcionando.
     *
     * URL: GET http://localhost:8080/api/auth/test
     *
     * Respuesta:
     * "API de Autenticación funcionando correctamente"
     *
     * @return Mensaje de confirmación
     */
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        log.info("GET /api/auth/test - Test de conectividad");
        return ResponseEntity.ok("API de Autenticación funcionando correctamente ✅");
    }

    /**
     * Endpoint para obtener información sobre la API.
     *
     * URL: GET http://localhost:8080/api/auth/info
     *
     * Respuesta (JSON):
     * {
     *   "nombre": "API de Autenticación - Chatarra",
     *   "version": "1.0.0",
     *   "descripcion": "Sistema de autenticación con JWT",
     *   "endpoints": {
     *     "register": "POST /api/auth/register",
     *     "login": "POST /api/auth/login"
     *   }
     * }
     *
     * @return Mapa con información de la API
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> info() {
        log.info("GET /api/auth/info - Información de la API");

        Map<String, Object> info = new HashMap<>();
        info.put("nombre", "API de Autenticación - Chatarra");
        info.put("version", "1.0.0");
        info.put("descripcion", "Sistema de autenticación con JWT para plataforma de compra/venta de chatarra");

        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("register", "POST /api/auth/register");
        endpoints.put("login", "POST /api/auth/login");
        endpoints.put("test", "GET /api/auth/test");
        endpoints.put("info", "GET /api/auth/info");

        info.put("endpoints", endpoints);
        info.put("estado", "Operativo");

        return ResponseEntity.ok(info);
    }
}