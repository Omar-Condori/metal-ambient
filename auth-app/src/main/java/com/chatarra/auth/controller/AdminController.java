// src/main/java/com/chatarra/auth/controller/AdminController.java
package com.chatarra.auth.controller;

import com.chatarra.auth.dto.UpdateRoleDTO;
import com.chatarra.auth.dto.UserDTO;
import com.chatarra.auth.entity.Oferta;
import com.chatarra.auth.service.AdminService;
import com.chatarra.auth.service.OfertaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173") // ← IMPORTANTE para desarrollo
public class AdminController {

    private final AdminService adminService;
    private final OfertaService ofertaService;

    // ========== GESTIÓN DE USUARIOS ==========

    /**
     * Obtener todos los usuarios
     * GET /api/admin/usuarios
     */
    @GetMapping("/usuarios")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    /**
     * Actualizar el rol de un usuario por ID
     * PUT /api/admin/usuarios/{id}/rol
     */
    @PutMapping("/usuarios/{id}/rol")
    public ResponseEntity<UserDTO> updateUserRole(
            @PathVariable Long id,
            @Valid @RequestBody UpdateRoleDTO updateRoleDTO
    ) {
        return ResponseEntity.ok(adminService.updateUserRole(id, updateRoleDTO.getNewRole()));
    }

    /**
     * Obtener un usuario por ID
     * GET /api/admin/usuarios/{id}
     */
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getUserById(id));
    }

    /**
     * Activar/Desactivar usuario
     * PUT /api/admin/usuarios/{id}/estado
     */
    @PutMapping("/usuarios/{id}/estado")
    public ResponseEntity<UserDTO> toggleUserStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body
    ) {
        Boolean activo = body.get("activo");
        return ResponseEntity.ok(adminService.toggleUserStatus(id, activo));
    }

    // ========== GESTIÓN DE OFERTAS ==========

    /**
     * Obtener todas las ofertas del sistema
     * GET /api/admin/ofertas
     */
    @GetMapping("/ofertas")
    public ResponseEntity<List<Oferta>> getAllOfertas() {
        return ResponseEntity.ok(ofertaService.obtenerTodasLasOfertas());
    }

    /**
     * Obtener una oferta específica
     * GET /api/admin/ofertas/{id}
     */
    @GetMapping("/ofertas/{id}")
    public ResponseEntity<Oferta> getOfertaById(@PathVariable Long id) {
        return ResponseEntity.ok(ofertaService.obtenerOfertaPorId(id));
    }

    /**
     * Cambiar estado de una oferta (ÚNICO ENDPOINT NECESARIO)
     * PUT /api/admin/ofertas/{id}
     * Body: { "estado": "APROBADA" | "RECHAZADA" | "VENDIDA" }
     */
    @PutMapping("/ofertas/{id}")
    public ResponseEntity<Oferta> cambiarEstadoOferta(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        String nuevoEstado = body.get("estado");
        Oferta.EstadoOferta estado = Oferta.EstadoOferta.valueOf(nuevoEstado.toUpperCase());
        Oferta oferta = ofertaService.cambiarEstadoOfertaAdmin(id, estado);
        return ResponseEntity.ok(oferta);
    }

    /**
     * Endpoints específicos por si los prefieres (OPCIONALES)
     */
    @PutMapping("/ofertas/{id}/aprobar")
    public ResponseEntity<Oferta> aprobarOferta(@PathVariable Long id) {
        Oferta oferta = ofertaService.cambiarEstadoOfertaAdmin(id, Oferta.EstadoOferta.APROBADA);
        return ResponseEntity.ok(oferta);
    }

    @PutMapping("/ofertas/{id}/rechazar")
    public ResponseEntity<Oferta> rechazarOferta(@PathVariable Long id) {
        Oferta oferta = ofertaService.cambiarEstadoOfertaAdmin(id, Oferta.EstadoOferta.RECHAZADA);
        return ResponseEntity.ok(oferta);
    }

    @PutMapping("/ofertas/{id}/vendida")
    public ResponseEntity<Oferta> marcarComoVendida(@PathVariable Long id) {
        Oferta oferta = ofertaService.cambiarEstadoOfertaAdmin(id, Oferta.EstadoOferta.VENDIDA);
        return ResponseEntity.ok(oferta);
    }
}