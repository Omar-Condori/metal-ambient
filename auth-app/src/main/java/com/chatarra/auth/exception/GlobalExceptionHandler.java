package com.chatarra.auth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Manejador Global de Excepciones.
 *
 * Esta clase captura TODAS las excepciones que ocurren en los controladores
 * y las convierte en respuestas HTTP con formato JSON consistente.
 *
 * @RestControllerAdvice:
 * - Aplica a todos los @RestController de la aplicación
 * - Intercepta excepciones antes de que lleguen al cliente
 * - Permite centralizar el manejo de errores
 *
 * Flujo:
 * 1. Ocurre una excepción en un Controller
 * 2. Spring busca un @ExceptionHandler que coincida
 * 3. Se ejecuta el método correspondiente
 * 4. Se retorna una respuesta HTTP con el error formateado
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Maneja: UsuarioExistenteException
     * Cuándo: Se intenta registrar un email que ya existe
     * HTTP Status: 400 Bad Request
     *
     * Ejemplo de respuesta JSON:
     * {
     *   "timestamp": "2024-01-15T10:30:00",
     *   "status": 400,
     *   "error": "Bad Request",
     *   "mensaje": "El email ya está registrado",
     *   "path": "/api/auth/register"
     * }
     */
    @ExceptionHandler(UsuarioExistenteException.class)
    public ResponseEntity<ErrorResponse> manejarUsuarioExistente(
            UsuarioExistenteException ex,
            WebRequest request) {

        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", "")
        );

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    /**
     * Maneja: BadCredentialsException
     * Cuándo: Las credenciales de login son incorrectas
     * HTTP Status: 401 Unauthorized
     *
     * Esta excepción la lanza Spring Security cuando:
     * - El email no existe en la base de datos
     * - La contraseña no coincide con la almacenada
     *
     * Ejemplo de respuesta JSON:
     * {
     *   "timestamp": "2024-01-15T10:30:00",
     *   "status": 401,
     *   "error": "Unauthorized",
     *   "mensaje": "Email o contraseña incorrectos",
     *   "path": "/api/auth/login"
     * }
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> manejarCredencialesInvalidas(
            BadCredentialsException ex,
            WebRequest request) {

        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.UNAUTHORIZED.value(),
                "Unauthorized",
                "Email o contraseña incorrectos",
                request.getDescription(false).replace("uri=", "")
        );

        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    /**
     * Maneja: UsernameNotFoundException
     * Cuándo: No se encuentra un usuario en la base de datos
     * HTTP Status: 404 Not Found
     *
     * Ejemplo de respuesta JSON:
     * {
     *   "timestamp": "2024-01-15T10:30:00",
     *   "status": 404,
     *   "error": "Not Found",
     *   "mensaje": "Usuario no encontrado: juan@test.com",
     *   "path": "/api/auth/login"
     * }
     */
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> manejarUsuarioNoEncontrado(
            UsernameNotFoundException ex,
            WebRequest request) {

        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                "Not Found",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", "")
        );

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    /**
     * Maneja: MethodArgumentNotValidException
     * Cuándo: Fallan las validaciones de @Valid en los DTOs
     * HTTP Status: 400 Bad Request
     *
     * Esta excepción ocurre cuando:
     * - Un campo con @NotBlank está vacío
     * - Un email con @Email tiene formato inválido
     * - Un campo con @Size no cumple el tamaño requerido
     *
     * Extrae TODOS los errores de validación y los retorna en un mapa.
     *
     * Ejemplo de respuesta JSON:
     * {
     *   "timestamp": "2024-01-15T10:30:00",
     *   "status": 400,
     *   "error": "Bad Request",
     *   "errores": {
     *     "email": "El formato del email no es válido",
     *     "password": "La contraseña debe tener al menos 6 caracteres",
     *     "nombreCompleto": "El nombre completo es obligatorio"
     *   }
     * }
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> manejarValidacion(
            MethodArgumentNotValidException ex) {

        // Crear el mapa de respuesta
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("timestamp", LocalDateTime.now());
        respuesta.put("status", HttpStatus.BAD_REQUEST.value());
        respuesta.put("error", "Bad Request");

        // Extraer todos los errores de validación
        Map<String, String> errores = new HashMap<>();

        // Iterar sobre cada error de validación
        ex.getBindingResult().getAllErrors().forEach(error -> {
            // Obtener el nombre del campo que falló
            String campo = ((FieldError) error).getField();

            // Obtener el mensaje de error definido en las anotaciones
            String mensaje = error.getDefaultMessage();

            // Agregar al mapa de errores
            errores.put(campo, mensaje);
        });

        respuesta.put("errores", errores);

        return new ResponseEntity<>(respuesta, HttpStatus.BAD_REQUEST);
    }

    /**
     * Maneja: IllegalArgumentException
     * Cuándo: Se pasa un argumento inválido a un método
     * HTTP Status: 400 Bad Request
     *
     * Ejemplo de respuesta JSON:
     * {
     *   "timestamp": "2024-01-15T10:30:00",
     *   "status": 400,
     *   "error": "Bad Request",
     *   "mensaje": "El argumento proporcionado no es válido",
     *   "path": "/api/auth/register"
     * }
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> manejarArgumentoIlegal(
            IllegalArgumentException ex,
            WebRequest request) {

        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", "")
        );

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    /**
     * Maneja: Exception (cualquier otra excepción no capturada)
     * Cuándo: Ocurre un error inesperado no manejado específicamente
     * HTTP Status: 500 Internal Server Error
     *
     * Este es un "catch-all" (atrapa-todo) para errores no previstos.
     *
     * IMPORTANTE EN PRODUCCIÓN:
     * - NO mostrar stack traces completos al cliente
     * - Registrar el error completo en logs del servidor
     * - Mostrar un mensaje genérico al usuario
     *
     * Ejemplo de respuesta JSON:
     * {
     *   "timestamp": "2024-01-15T10:30:00",
     *   "status": 500,
     *   "error": "Internal Server Error",
     *   "mensaje": "Ha ocurrido un error inesperado. Por favor, contacta al administrador.",
     *   "path": "/api/auth/register"
     * }
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> manejarExcepcionGeneral(
            Exception ex,
            WebRequest request) {

        // Imprimir el stack trace completo en consola (solo en desarrollo)
        // En producción, deberías usar un sistema de logging como SLF4J
        System.err.println("ERROR NO MANEJADO:");
        ex.printStackTrace();

        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                "Ha ocurrido un error inesperado. Por favor, contacta al administrador.",
                request.getDescription(false).replace("uri=", "")
        );

        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}