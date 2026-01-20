package lt.techin.booksproject.service.impl;

import lt.techin.booksproject.dto.auth.LoginRequestDTO;
import lt.techin.booksproject.dto.auth.LoginResponseDTO;
import lt.techin.booksproject.dto.auth.RegisterRequestDTO;
import lt.techin.booksproject.dto.auth.RegisterResponseDTO;
import lt.techin.booksproject.entity.Role;
import lt.techin.booksproject.entity.User;
import lt.techin.booksproject.exception.DuplicateEmailException;
import lt.techin.booksproject.repository.UserRepository;
import lt.techin.booksproject.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public RegisterResponseDTO register(RegisterRequestDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException(request.getEmail());
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(hashedPassword)
                .role(Role.USER)
                .build();

        User saved = userRepository.save(user);

        return new RegisterResponseDTO(saved.getId(),
                saved.getEmail(),
                saved.getRole()
        );
}
    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        return new LoginResponseDTO(
                user.getId(),
                user.getEmail(),
                user.getRole()
        );
    }
}
