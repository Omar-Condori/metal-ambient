package com.chatarra.auth.repository;

import com.chatarra.auth.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repositorio para acceder a la tabla de usuarios.
 * Spring Data JPA genera automáticamente la implementación.
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /**
     * Busca un usuario por su email.
     * @param email El email del usuario
     * @return Optional con el usuario si existe
     */
    Optional<Usuario> findByEmail(String email);

    /**
     * Verifica si existe un usuario con el email dado.
     * @param email El email a verificar
     * @return true si existe, false si no
     */
    boolean existsByEmail(String email);
}