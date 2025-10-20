// src/main/java/com/chatarra/auth/entity/Oferta.java
package com.chatarra.auth.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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

    @ManyToOne(fetch = FetchType.EAGER) // ← EAGER para cargar el vendedor
    @JoinColumn(name = "vendedor_id", nullable = false)
    @JsonManagedReference // ← EVITA loop infinito en JSON
    private Usuario vendedor;

    @Column(nullable = false, length = 50)
    private String tipoMaterial;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal cantidad;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario;

    @Column(precision = 10, scale = 2)
    private BigDecimal precioTotal;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(length = 255)
    private String ubicacion;

    @Column(length = 500)
    private String imagenUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoOferta estado;

    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        if (estado == null) {
            estado = EstadoOferta.PENDIENTE;
        }
        // Calcular precio total
        if (cantidad != null && precioUnitario != null) {
            precioTotal = cantidad.multiply(precioUnitario);
        }
    }

    @PreUpdate
    protected void onUpdate() {
        // Recalcular precio total
        if (cantidad != null && precioUnitario != null) {
            precioTotal = cantidad.multiply(precioUnitario);
        }
    }

    public enum EstadoOferta {
        PENDIENTE,
        APROBADA,
        RECHAZADA,
        VENDIDA,
        CANCELADA
    }
}