package com.chatarra.auth.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entidad que representa una oferta de chatarra realizada por un vendedor.
 */
@Entity
@Table(name = "ofertas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Oferta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Relación Many-to-One con Usuario (Vendedor)
     * Un vendedor puede tener muchas ofertas
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendedor_id", nullable = false)
    private Usuario vendedor;

    @Column(name = "tipo_material", nullable = false, length = 100)
    private String tipoMaterial; // Ej: "Hierro", "Aluminio", "Cobre", "Bronce"

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal cantidad; // Cantidad en kilogramos

    @Column(name = "precio_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario; // Precio por kg

    @Column(name = "precio_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioTotal; // cantidad * precioUnitario

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(length = 200)
    private String ubicacion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoOferta estado = EstadoOferta.PENDIENTE;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @CreationTimestamp
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @UpdateTimestamp
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    /**
     * Enum para los diferentes estados de una oferta
     */
    public enum EstadoOferta {
        PENDIENTE,    // Esperando aprobación del admin
        APROBADA,     // Aprobada por el admin, visible públicamente
        RECHAZADA,    // Rechazada por el admin
        VENDIDA,      // Ya fue vendida/completada
        CANCELADA     // Cancelada por el vendedor
    }

    /**
     * Método auxiliar para calcular el precio total automáticamente
     */
    @PrePersist
    @PreUpdate
    public void calcularPrecioTotal() {
        if (cantidad != null && precioUnitario != null) {
            this.precioTotal = cantidad.multiply(precioUnitario);
        }
    }
}