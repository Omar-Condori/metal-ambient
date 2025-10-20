package com.chatarra.auth.exception;

/**
 * Excepción personalizada que se lanza cuando se intenta registrar
 * un usuario con un email que ya existe en la base de datos.
 *
 * Esta es una excepción de tipo RuntimeException (unchecked),
 * lo que significa que no necesita ser declarada en el método con 'throws'.
 *
 * Ejemplo de uso:
 *
 * if (usuarioRepository.existsByEmail(email)) {
 *     throw new UsuarioExistenteException("El email ya está registrado");
 * }
 */
public class UsuarioExistenteException extends RuntimeException {

    /**
     * Constructor que recibe solo un mensaje de error.
     *
     * @param mensaje Descripción del error (ej: "El email ya está registrado")
     */
    public UsuarioExistenteException(String mensaje) {
        super(mensaje);
    }

    /**
     * Constructor que recibe un mensaje y la causa original del error.
     * Útil cuando esta excepción envuelve otra excepción.
     *
     * @param mensaje Descripción del error
     * @param causa La excepción original que causó este error
     */
    public UsuarioExistenteException(String mensaje, Throwable causa) {
        super(mensaje, causa);
    }
}