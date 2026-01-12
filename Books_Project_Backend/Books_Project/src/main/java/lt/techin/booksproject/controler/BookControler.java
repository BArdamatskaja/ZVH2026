package lt.techin.booksproject.controler;


import jakarta.validation.Valid;
import lt.techin.booksproject.dto.BookCreateRequest;
import lt.techin.booksproject.entity.Book;
import lt.techin.booksproject.service.BookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/books")
public class BookControler {

    private static final Logger log = LoggerFactory.getLogger(BookControler.class);
    private final BookService bookService;

    public BookControler (BookService bookService){
        this.bookService = bookService;
    }

    @PostMapping
    public Book createBook (@Valid @RequestBody BookCreateRequest bookCreateRequest) {
        Book book = new Book();
        book.setTitle(bookCreateRequest.getTitle());
        book.setDescription(bookCreateRequest.getDescription());
        book.setIsbn(bookCreateRequest.getIsbn());
        book.setPicture(bookCreateRequest.getPicture());
        book.setNumberOfPages(bookCreateRequest.getNumberOfPages());
book.getCategory().setId(bookCreateRequest.getId());
        return bookService.createBook(book);
    }

    @GetMapping
    public ResponseEntity<List<Book>> getBooks () {
        return ResponseEntity.ok(bookService.getAllBooks());
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
    public ResponseEntity<Book> updateBook (@PathVariable Long id, @RequestBody Book book) {
        Book bookFromDb = bookService.getBookById(id);
        bookFromDb.setTitle(book.getTitle());
        bookFromDb.setDescription(book.getDescription());
        bookFromDb.setIsbn(book.getIsbn());
        bookFromDb.setPicture(book.getPicture());
        bookFromDb.setNumberOfPages(book.getNumberOfPages());
        bookFromDb.getCategory().setId(book.getId());
        return ResponseEntity.ok(bookService.getBookById(id));
    }
}
