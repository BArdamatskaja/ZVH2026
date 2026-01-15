package lt.techin.booksproject.dto.auth;

import lt.techin.booksproject.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RegisterResponseDTO {
    private Long id;
    private String email;
    private Role role;
}
