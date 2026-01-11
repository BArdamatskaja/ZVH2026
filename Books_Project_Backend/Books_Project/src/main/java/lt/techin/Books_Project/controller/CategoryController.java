package lt.techin.Books_Project.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.techin.Books_Project.dto.CategoryRequestDto;
import lt.techin.Books_Project.dto.CategoryResponseDto;
import lt.techin.Books_Project.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/books/categories")
@RequiredArgsConstructor
public class CategoryController {

 private final CategoryService categoryService;

 @PostMapping
 @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponseDto createCategory(@RequestBody @Valid CategoryRequestDto dto) {
     return categoryService.createCategory(dto);
    }

    @GetMapping
    public List<CategoryResponseDto> getAllCategories() {
     return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public CategoryResponseDto getCategoryById(@PathVariable Long id) {
     return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public CategoryResponseDto updateCategory(@PathVariable Long id, @RequestBody @Valid CategoryRequestDto dto) {
     return categoryService.updateCategory(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategory(@PathVariable Long id) {
     categoryService.deleteCategory(id);
    }
}
