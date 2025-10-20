package com.chatarra.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal de la aplicación Spring Boot.
 *
 * Esta es la clase que inicia toda la aplicación.
 * Spring Boot escanea automáticamente todos los componentes
 * dentro del paquete com.chatarra.auth y sus subpaquetes.
 *
 * @SpringBootApplication es una anotación compuesta que incluye:
 * - @Configuration: Marca la clase como fuente de definiciones de beans
 * - @EnableAutoConfiguration: Habilita la configuración automática de Spring Boot
 * - @ComponentScan: Escanea componentes en el paquete actual y subpaquetes
 */
@SpringBootApplication
public class AuthApplication {

    /**
     * Método principal que inicia la aplicación Spring Boot.
     *
     * @param args Argumentos de línea de comandos (opcional)
     */
    public static void main(String[] args) {
        // Inicia el contexto de Spring Boot
        SpringApplication.run(AuthApplication.class, args);

        // Mensajes de confirmación en consola
        System.out.println("==============================================");
        System.out.println("✅ Aplicación iniciada exitosamente");
        System.out.println("📡 Servidor corriendo en: http://localhost:8080");
        System.out.println("📚 API Auth disponible en:");
        System.out.println("   - POST http://localhost:8080/api/auth/register");
        System.out.println("   - POST http://localhost:8080/api/auth/login");
        System.out.println("   - GET  http://localhost:8080/api/auth/test");
        System.out.println("   - GET  http://localhost:8080/api/auth/info");
        System.out.println("==============================================");
    }
}