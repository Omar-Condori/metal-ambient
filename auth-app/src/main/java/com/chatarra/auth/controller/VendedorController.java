package com.chatarra.auth.controller;

import com.chatarra.auth.dto.CrearOfertaDTO;
import com.chatarra.auth.dto.EstadisticasVendedorDTO;
import com.chatarra.auth.entity.Oferta;
import com.chatarra.auth.entity.Usuario;
import com.chatarra.auth.repository.UsuarioRepository;
import com.chatarra.auth.service.OfertaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller para las funciones del Dashboard del Vendedor
 */
@RestController
@RequestMapping("/api/vendedor")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('VENDEDOR', 'ADMIN')")
public class VendedorController {

    private final OfertaService ofertaService;
    private final UsuarioRepository usuarioRepository;

    /**
     * Obtener estadísticas del vendedor para el dashboard
     * GET /api/vendedor/estadisticas
     */
    @GetMapping("/estadisticas")
    public ResponseEntity<EstadisticasVendedorDTO> obtenerEstadisticas(Authentication authentication) {
        Long vendedorId = obtenerIdUsuarioAutenticado(authentication);
        EstadisticasVendedorDTO estadisticas = ofertaService.obtenerEstadisticasVendedor(vendedorId);
        return ResponseEntity.ok(estadisticas);
    }

    /**
     * Crear una nueva oferta
     * POST /api/vendedor/ofertas
     */
    @PostMapping("/ofertas")
    public ResponseEntity<Oferta> crearOferta(
            @Valid @RequestBody CrearOfertaDTO dto,
            Authentication authentication
    ) {
        Long vendedorId = obtenerIdUsuarioAutenticado(authentication);
        Oferta oferta = ofertaService.crearOferta(vendedorId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(oferta);
    }

    /**
     * Obtener todas las ofertas del vendedor
     * GET /api/vendedor/ofertas
     */
    @GetMapping("/ofertas")
    public ResponseEntity<List<Oferta>> obtenerMisOfertas(Authentication authentication) {
        Long vendedorId = obtenerIdUsuarioAutenticado(authentication);
        List<Oferta> ofertas = ofertaService.obtenerOfertasPorVendedor(vendedorId);
        return ResponseEntity.ok(ofertas);
    }

    /**
     * Obtener las últimas 5 ofertas del vendedor
     * GET /api/vendedor/ofertas/recientes
     */
    @GetMapping("/ofertas/recientes")
    public ResponseEntity<List<Oferta>> obtenerOfertasRecientes(Authentication authentication) {
        Long vendedorId = obtenerIdUsuarioAutenticado(authentication);
        List<Oferta> ofertas = ofertaService.obtenerUltimasOfertasVendedor(vendedorId);
        return ResponseEntity.ok(ofertas);
    }

    /**
     * Obtener una oferta específica por ID
     * GET /api/vendedor/ofertas/{id}
     */
    @GetMapping("/ofertas/{id}")
    public ResponseEntity<Oferta> obtenerOferta(
            @PathVariable Long id,
            Authentication authentication
    ) {
        Long vendedorId = obtenerIdUsuarioAutenticado(authentication);
        Oferta oferta = ofertaService.obtenerOfertaPorId(id);

        // Verificar que la oferta pertenece al vendedor
        if (!oferta.getVendedor().getId().equals(vendedorId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(oferta);
    }

    /**
     * Cancelar una oferta (cambiar estado a CANCELADA)
     * PUT /api/vendedor/ofertas/{id}/cancelar
     */
    @PutMapping("/ofertas/{id}/cancelar")
    public ResponseEntity<Oferta> cancelarOferta(
            @PathVariable Long id,
            Authentication authentication
    ) {
        Long vendedorId = obtenerIdUsuarioAutenticado(authentication);
        Oferta oferta = ofertaService.actualizarEstadoOferta(id, vendedorId, Oferta.EstadoOferta.CANCELADA);
        return ResponseEntity.ok(oferta);
    }

    /**
     * Eliminar una oferta (solo si está PENDIENTE)
     * DELETE /api/vendedor/ofertas/{id}
     */
    @DeleteMapping("/ofertas/{id}")
    public ResponseEntity<Void> eliminarOferta(
            @PathVariable Long id,
            Authentication authentication
    ) {
        Long vendedorId = obtenerIdUsuarioAutenticado(authentication);
        ofertaService.eliminarOferta(id, vendedorId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Método auxiliar para obtener el ID del usuario autenticado
     * Extrae el email del token JWT y busca el usuario en la BD
     */
    private Long obtenerIdUsuarioAutenticado(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + email));

        return usuario.getId();
    }
}