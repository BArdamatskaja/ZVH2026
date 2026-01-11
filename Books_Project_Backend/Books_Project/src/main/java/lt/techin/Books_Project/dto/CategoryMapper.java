package lt.techin.Books_Project.dto;

import lt.techin.Books_Project.entity.Category;

public class CategoryMapper {
    public static Category toEntity(CategoryRequestDto dto) {
        Category category = new Category();
        category.setName(dto.getName());
        return category;
    }

    public static CategoryResponseDto toDto(Category category) {
        CategoryResponseDto dto = new CategoryResponseDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        return dto;
    }
}
