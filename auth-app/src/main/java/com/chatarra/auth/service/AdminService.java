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

    @Transactional(readOnly = true)
    public List<UserDTO> getAllUsers() {
        log.info("📋 Obteniendo todos los usuarios");
        List<UserDTO> users = usuarioRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        log.info("✅ Se encontraron {} usuarios", users.size());
        return users;
    }

    @Transactional(readOnly = true)
    public UserDTO getUserById(Long id) {
        log.info("🔍 Obteniendo usuario con ID: {}", id);
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
        return convertToDTO(usuario);
    }

    @Transactional
    public UserDTO updateUserRole(Long userId, String newRole) {
        log.info("👤 Actualizando rol del usuario {} a {}", userId, newRole);

        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userId));

        Usuario.Rol rol = Usuario.Rol.valueOf(newRole.toUpperCase());
        usuario.setRol(rol);

        Usuario usuarioActualizado = usuarioRepository.save(usuario);
        log.info("✅ Rol actualizado: {} -> {}", usuario.getEmail(), newRole);

        return convertToDTO(usuarioActualizado);
    }

    @Transactional
    public UserDTO toggleUserStatus(Long userId, Boolean activo) {
        log.info("🔄 Cambiando estado del usuario {} a {}", userId, activo);

        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userId));

        usuario.setActivo(activo);
        Usuario usuarioActualizado = usuarioRepository.save(usuario);

        log.info("✅ Estado actualizado: {} -> {}", usuario.getEmail(), activo ? "Activo" : "Inactivo");

        return convertToDTO(usuarioActualizado);
    }

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