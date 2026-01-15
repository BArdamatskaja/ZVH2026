package lt.techin.booksproject.service.impl;

import lt.techin.booksproject.dto.auth.RegisterRequestDTO;
import lt.techin.booksproject.dto.auth.RegisterResponseDTO;
import lt.techin.booksproject.entity.Role;
import lt.techin.booksproject.entity.User;
import lt.techin.booksproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lt.techin.booksproject.service.AuthService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @Override
    public RegisterResponseDTO register(RegisterRequestDTO request) {

        User user = User.builder()
                .email(request.getEmail())
                // TODO (ZVH2-52): replace with BCrypt hash
                .passwordHash(request.getPassword())
                .role(Role.USER)
                .build();

        User saved = userRepository.save(user);

        return new RegisterResponseDTO(saved.getId(), saved.getEmail(), saved.getRole());
    }
}
