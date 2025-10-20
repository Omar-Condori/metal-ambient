package com.chatarra.auth.service;

import com.chatarra.auth.dto.AuthResponseDTO;
import com.chatarra.auth.dto.LoginDTO;
import com.chatarra.auth.dto.RegistroDTO;
import com.chatarra.auth.entity.Usuario;
import com.chatarra.auth.exception.UsuarioExistenteException;
import com.chatarra.auth.repository.UsuarioRepository;
import com.chatarra.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Servicio que maneja la lógica de negocio para registro y login.
 *
 * @RequiredArgsConstructor - Lombok genera constructor con todos los campos 'final'
 * @Slf4j - Lombok proporciona el objeto 'log' para logging
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    /**
     * Registra un nuevo usuario en el sistema.
     *
     * Proceso:
     * 1. Verifica que el email no esté registrado
     * 2. Crea una nueva entidad Usuario
     * 3. Encripta la contraseña con BCrypt
     * 4. Asigna rol por defecto (VENDEDOR)
     * 5. Guarda el usuario en la base de datos
     * 6. Genera un token JWT automáticamente
     * 7. Retorna la respuesta con el token y datos del usuario
     *
     * @param registroDTO Datos del nuevo usuario (nombre, email, password)
     * @return AuthResponseDTO con token JWT y datos del usuario
     * @throws UsuarioExistenteException si el email ya está registrado
     */
    @Transactional
    public AuthResponseDTO registrar(RegistroDTO registroDTO) {
        log.info("Iniciando registro de usuario: {}", registroDTO.getEmail());

        // 1. Verificar si el email ya existe en la base de datos
        if (usuarioRepository.existsByEmail(registroDTO.getEmail())) {
            log.warn("Intento de registro con email existente: {}", registroDTO.getEmail());
            throw new UsuarioExistenteException("El email ya está registrado");
        }

        // 2. Crear nueva entidad Usuario
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombreCompleto(registroDTO.getNombreCompleto());
        nuevoUsuario.setEmail(registroDTO.getEmail());

        // 3. Encriptar la contraseña con BCrypt
        // BCrypt genera un hash único cada vez (incluye salt automáticamente)
        String passwordEncriptado = passwordEncoder.encode(registroDTO.getPassword());
        nuevoUsuario.setPassword(passwordEncriptado);

        // 4. Asignar rol por defecto (VENDEDOR)
        nuevoUsuario.setRol(Usuario.Rol.VENDEDOR);
        nuevoUsuario.setActivo(true);

        // 5. Guardar en la base de datos
        Usuario usuarioGuardado = usuarioRepository.save(nuevoUsuario);
        log.info("Usuario registrado exitosamente con ID: {} y rol: {}",
                usuarioGuardado.getId(), usuarioGuardado.getRol());

        // 6. Generar token JWT automáticamente después del registro
        // Esto permite que el usuario inicie sesión inmediatamente sin hacer login
        UserDetails userDetails = userDetailsService.loadUserByUsername(usuarioGuardado.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        // 7. Retornar respuesta con token y rol
        return new AuthResponseDTO(
                token,
                usuarioGuardado.getId(),
                usuarioGuardado.getNombreCompleto(),
                usuarioGuardado.getEmail(),
                usuarioGuardado.getRol().name()  // ← INCLUIR ROL
        );
    }

    /**
     * Autentica un usuario existente y genera un token JWT.
     *
     * Proceso:
     * 1. Autentica las credenciales con Spring Security
     * 2. Si las credenciales son correctas, genera un token JWT
     * 3. Obtiene los datos completos del usuario
     * 4. Retorna la respuesta con el token, datos del usuario y rol
     *
     * @param loginDTO Credenciales del usuario (email y password)
     * @return AuthResponseDTO con token JWT y datos del usuario
     * @throws BadCredentialsException si las credenciales son incorrectas
     */
    public AuthResponseDTO login(LoginDTO loginDTO) {
        log.info("Iniciando login para usuario: {}", loginDTO.getEmail());

        // 1. Autenticar con Spring Security
        // Este método lanza BadCredentialsException si las credenciales son incorrectas
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getEmail(),
                        loginDTO.getPassword()
                )
        );

        // 2. Si llega aquí, la autenticación fue exitosa
        log.info("Autenticación exitosa para: {}", loginDTO.getEmail());

        // 3. Cargar los detalles del usuario
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginDTO.getEmail());

        // 4. Generar token JWT
        String token = jwtUtil.generateToken(userDetails);

        // 5. Obtener información completa del usuario desde la base de datos
        Usuario usuario = usuarioRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 6. Retornar respuesta con token y rol
        return new AuthResponseDTO(
                token,
                usuario.getId(),
                usuario.getNombreCompleto(),
                usuario.getEmail(),
                usuario.getRol().name()  // ← INCLUIR ROL
        );
    }
}