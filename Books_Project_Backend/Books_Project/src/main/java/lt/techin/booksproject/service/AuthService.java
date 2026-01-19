package lt.techin.booksproject.service;

import lt.techin.booksproject.dto.auth.LoginRequestDTO;
import lt.techin.booksproject.dto.auth.LoginResponseDTO;
import lt.techin.booksproject.dto.auth.RegisterRequestDTO;
import lt.techin.booksproject.dto.auth.RegisterResponseDTO;

public interface AuthService {
    RegisterResponseDTO register(RegisterRequestDTO request);
    LoginResponseDTO login(LoginRequestDTO request);
}
