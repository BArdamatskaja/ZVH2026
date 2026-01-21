package lt.techin.booksproject.controller;


import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lt.techin.booksproject.dto.BookCreateRequest;
import lt.techin.booksproject.entity.Book;
import lt.techin.booksproject.entity.Category;
import lt.techin.booksproject.repository.CategoryRepository;
import lt.techin.booksproject.service.BookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/v1/books")
@Getter
@Setter
@RequiredArgsConstructor
public class BookController {

    private static final Logger log = LoggerFactory.getLogger(BookController.class);
    private final BookService bookService;
    private final CategoryRepository categoryRepository;


    @PostMapping
    public Book createBook (@Valid @RequestBody BookCreateRequest bookCreateRequest) {
        return bookService.createBook(bookCreateRequest);
    }

    @GetMapping
    public ResponseEntity<List<Book>> getBooks (
            @RequestParam(required = false) Long categoryId, @RequestParam(required = false) String title) {
        return ResponseEntity.ok(bookService.getBooks(categoryId, title));
    }

    @GetMapping ("/{index}")
    public ResponseEntity<Book> getBook(@PathVariable("index") Long index){
        return ResponseEntity.ok(bookService.getBookById(index));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Book>> deleteBook (@PathVariable Long id){
        bookService.deleteBookById(id);
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @PutMapping("{id}")
    public ResponseEntity<Book> updateBook (@PathVariable Long id, @Valid @RequestBody BookCreateRequest updateRequest) {
   Book updatedBook = bookService.updateBook(id, updateRequest);
   return ResponseEntity.ok(updatedBook);
    }
}
