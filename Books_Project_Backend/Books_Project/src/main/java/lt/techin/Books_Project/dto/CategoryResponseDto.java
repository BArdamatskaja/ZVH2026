package lt.techin.Books_Project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryResponseDto {
    private Long id;
    private String name;
    private Long bookId;
}
