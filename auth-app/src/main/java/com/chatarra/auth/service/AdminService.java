// src/main/java/com/chatarra/auth/service/AdminService.java
package com.chatarra.auth.service;

import com.chatarra.auth.dto.UserDTO;
import com.chatarra.auth.entity.Usuario;
import com.chatarra.auth.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService {

    private final UsuarioRepository usuarioRepository;

    /**
     * Obtener todos los usuarios
     */
    @Transactional(readOnly = true)
    public List<UserDTO> getAllUsers() {
        return usuarioRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtener un usuario por ID
     */
    @Transactional(readOnly = true)
    public UserDTO getUserById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
        return convertToDTO(usuario);
    }

    /**
     * Actualizar el rol de un usuario
     */
    @Transactional
    public UserDTO updateUserRole(Long userId, String newRole) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userId));

        Usuario.Rol rol = Usuario.Rol.valueOf(newRole.toUpperCase());
        usuario.setRol(rol);

        Usuario usuarioActualizado = usuarioRepository.save(usuario);
        log.info("Rol actualizado para usuario {}: {}", usuario.getEmail(), newRole);

        return convertToDTO(usuarioActualizado);
    }

    /**
     * Activar/Desactivar usuario
     */
    @Transactional
    public UserDTO toggleUserStatus(Long userId, Boolean activo) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userId));

        usuario.setActivo(activo);
        Usuario usuarioActualizado = usuarioRepository.save(usuario);

        log.info("Estado actualizado para usuario {}: {}", usuario.getEmail(), activo ? "Activo" : "Inactivo");

        return convertToDTO(usuarioActualizado);
    }

    /**
     * Convertir entidad Usuario a DTO
     */
    private UserDTO convertToDTO(Usuario usuario) {
        return UserDTO.builder()
                .id(usuario.getId())
                .nombreCompleto(usuario.getNombreCompleto())
                .email(usuario.getEmail())
                .rol(usuario.getRol().name())
                .activo(usuario.getActivo())
                .fechaRegistro(usuario.getFechaRegistro())
                .build();
    }
}