package com.chatarra.auth.service;

import com.chatarra.auth.dto.CrearOfertaDTO;
import com.chatarra.auth.dto.EstadisticasVendedorDTO;
import com.chatarra.auth.entity.Oferta;
import com.chatarra.auth.entity.Usuario;
import com.chatarra.auth.repository.OfertaRepository;
import com.chatarra.auth.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OfertaService {

    private final OfertaRepository ofertaRepository;
    private final UsuarioRepository usuarioRepository;

    /**
     * Crear una nueva oferta
     */
    @Transactional
    public Oferta crearOferta(Long vendedorId, CrearOfertaDTO dto) {
        log.info("Creando oferta para vendedor ID: {}", vendedorId);

        // Verificar que el vendedor existe
        Usuario vendedor = usuarioRepository.findById(vendedorId)
                .orElseThrow(() -> new RuntimeException("Vendedor no encontrado"));

        // Crear la oferta
        Oferta oferta = Oferta.builder()
                .vendedor(vendedor)
                .tipoMaterial(dto.getTipoMaterial())
                .cantidad(dto.getCantidad())
                .precioUnitario(dto.getPrecioUnitario())
                .descripcion(dto.getDescripcion())
                .ubicacion(dto.getUbicacion())
                .imagenUrl(dto.getImagenUrl())
                .estado(Oferta.EstadoOferta.PENDIENTE)
                .build();

        // El precio total se calcula automáticamente en @PrePersist
        Oferta ofertaGuardada = ofertaRepository.save(oferta);
        log.info("Oferta creada con ID: {}", ofertaGuardada.getId());

        return ofertaGuardada;
    }

    /**
     * Obtener todas las ofertas de un vendedor
     */
    @Transactional(readOnly = true)
    public List<Oferta> obtenerOfertasPorVendedor(Long vendedorId) {
        return ofertaRepository.findByVendedorIdOrderByFechaCreacionDesc(vendedorId);
    }

    /**
     * Obtener las últimas 5 ofertas de un vendedor
     */
    @Transactional(readOnly = true)
    public List<Oferta> obtenerUltimasOfertasVendedor(Long vendedorId) {
        return ofertaRepository.findTop5ByVendedorIdOrderByFechaCreacionDesc(vendedorId);
    }

    /**
     * Obtener estadísticas del vendedor para el dashboard
     */
    @Transactional(readOnly = true)
    public EstadisticasVendedorDTO obtenerEstadisticasVendedor(Long vendedorId) {
        log.info("Obteniendo estadísticas para vendedor ID: {}", vendedorId);

        long activas = ofertaRepository.countByVendedorIdAndEstado(vendedorId, Oferta.EstadoOferta.APROBADA);
        long pendientes = ofertaRepository.countByVendedorIdAndEstado(vendedorId, Oferta.EstadoOferta.PENDIENTE);
        long vendidas = ofertaRepository.countByVendedorIdAndEstado(vendedorId, Oferta.EstadoOferta.VENDIDA);
        long rechazadas = ofertaRepository.countByVendedorIdAndEstado(vendedorId, Oferta.EstadoOferta.RECHAZADA);

        BigDecimal totalVendido = ofertaRepository.calcularTotalVendidoPorVendedor(vendedorId);

        // Calcular promedio de venta
        BigDecimal promedioVenta = BigDecimal.ZERO;
        if (vendidas > 0) {
            promedioVenta = totalVendido.divide(BigDecimal.valueOf(vendidas), 2, RoundingMode.HALF_UP);
        }

        return EstadisticasVendedorDTO.builder()
                .ofertasActivas(activas)
                .ofertasPendientes(pendientes)
                .ofertasVendidas(vendidas)
                .ofertasRechazadas(rechazadas)
                .totalOfertas(activas + pendientes + vendidas + rechazadas)
                .totalVendido(totalVendido)
                .promedioVenta(promedioVenta)
                .build();
    }

    /**
     * Obtener una oferta por ID
     */
    @Transactional(readOnly = true)
    public Oferta obtenerOfertaPorId(Long id) {
        return ofertaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Oferta no encontrada con ID: " + id));
    }

    /**
     * Actualizar estado de una oferta (usado por el vendedor)
     */
    @Transactional
    public Oferta actualizarEstadoOferta(Long ofertaId, Long vendedorId, Oferta.EstadoOferta nuevoEstado) {
        Oferta oferta = obtenerOfertaPorId(ofertaId);

        // Verificar que la oferta pertenece al vendedor
        if (!oferta.getVendedor().getId().equals(vendedorId)) {
            throw new RuntimeException("No tienes permiso para modificar esta oferta");
        }

        oferta.setEstado(nuevoEstado);
        return ofertaRepository.save(oferta);
    }

    /**
     * Eliminar una oferta (solo si está PENDIENTE)
     */
    @Transactional
    public void eliminarOferta(Long ofertaId, Long vendedorId) {
        Oferta oferta = obtenerOfertaPorId(ofertaId);

        // Verificar que la oferta pertenece al vendedor
        if (!oferta.getVendedor().getId().equals(vendedorId)) {
            throw new RuntimeException("No tienes permiso para eliminar esta oferta");
        }

        // Solo permitir eliminar si está PENDIENTE
        if (oferta.getEstado() != Oferta.EstadoOferta.PENDIENTE) {
            throw new RuntimeException("Solo se pueden eliminar ofertas en estado PENDIENTE");
        }

        ofertaRepository.delete(oferta);
        log.info("Oferta eliminada con ID: {}", ofertaId);
    }

    /**
     * Obtener todas las ofertas (para admin)
     */
    @Transactional(readOnly = true)
    public List<Oferta> obtenerTodasLasOfertas() {
        return ofertaRepository.findAll();
    }

    /**
     * Aprobar/Rechazar oferta (solo admin)
     */
    @Transactional
    public Oferta cambiarEstadoOfertaAdmin(Long ofertaId, Oferta.EstadoOferta nuevoEstado) {
        Oferta oferta = obtenerOfertaPorId(ofertaId);
        oferta.setEstado(nuevoEstado);
        return ofertaRepository.save(oferta);
    }
}