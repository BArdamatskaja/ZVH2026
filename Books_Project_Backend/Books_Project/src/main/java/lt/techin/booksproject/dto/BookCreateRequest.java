package lt.techin.booksproject.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookCreateRequest {

    private Long id;
    @NotNull
    private String title;
    private String description;
    @NotNull
//    @Pattern(
//            regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
//            message = "Invalid ISBN format"
//    )
    private String isbn;
    private String picture;
    private Integer numberOfPages;
    @NotNull
    private Long categoryId;

}
