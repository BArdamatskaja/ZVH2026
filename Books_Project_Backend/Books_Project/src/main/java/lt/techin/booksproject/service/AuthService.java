package lt.techin.booksproject.service;

import lt.techin.booksproject.dto.auth.RegisterRequestDTO;
import lt.techin.booksproject.dto.auth.RegisterResponseDTO;

public interface AuthService {
    RegisterResponseDTO register(RegisterRequestDTO request);
}
