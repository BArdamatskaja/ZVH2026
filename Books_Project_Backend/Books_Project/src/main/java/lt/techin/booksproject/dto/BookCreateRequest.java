package lt.techin.booksproject.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

//@Getter
//@Setter
public class BookCreateRequest {

    //private Long id;
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
    private Long numberOfPages;
    @NotNull
    private String categoryId;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Long getNumberOfPages() {
        return numberOfPages;
    }

    public void setNumberOfPages(Long numberOfPages) {
        this.numberOfPages = numberOfPages;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }
}
