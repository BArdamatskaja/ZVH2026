package lt.techin.booksproject.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lt.techin.booksproject.entity.Role;

@Getter
@AllArgsConstructor
public class LoginResponseDTO {
    private Long id;
    private String email;
    private Role role;
}
