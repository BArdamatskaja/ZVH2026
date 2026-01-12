package lt.techin.booksproject.service;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.techin.booksproject.dto.CategoryMapper;
import lt.techin.booksproject.dto.CategoryRequestDto;
import lt.techin.booksproject.dto.CategoryResponseDto;
import lt.techin.booksproject.entity.Category;
import lt.techin.booksproject.repository.BookRepository;
import lt.techin.booksproject.repository.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final BookRepository bookRepository;

    public CategoryResponseDto createCategory(CategoryRequestDto dto) {
        if (categoryRepository.existsByName(dto.getName())) {
            throw new RuntimeException("Category with this name already exists");
        }
        Category category = CategoryMapper.toEntity(dto);
        return CategoryMapper.toDto(categoryRepository.save(category));
    }

public List<CategoryResponseDto> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(CategoryMapper::toDto)
                .toList();
}
public CategoryResponseDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        return CategoryMapper.toDto(category);
}
public CategoryResponseDto updateCategory(Long id, @Valid CategoryRequestDto dto) {
        Category updated = categoryRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        updated.setName(dto.getName());
        return CategoryMapper.toDto(categoryRepository.save(updated));
}
public void deleteCategory(Long id) {
        if(!categoryRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        categoryRepository.deleteById(id);
}
}
