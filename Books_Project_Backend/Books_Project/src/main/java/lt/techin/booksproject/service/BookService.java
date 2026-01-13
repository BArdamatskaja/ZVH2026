package lt.techin.booksproject.service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lt.techin.booksproject.entity.Book;
import lt.techin.booksproject.repository.BookRepository;
import lt.techin.booksproject.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;


    public Book createBook(Book book){
        return  bookRepository.save(book);
    }

    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    public Book getBookById (Long id){
        return  bookRepository.findById(id).get();
    }

    public List<Book> deleteBookById (Long id){
        bookRepository.deleteById(id);
        return bookRepository.findAll();
    }

    public Book updateBook (Long id, Book updateBook){
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));

        existingBook.setTitle(updateBook.getTitle());
        existingBook.setDescription(updateBook.getDescription());
        existingBook.setIsbn(updateBook.getIsbn());
        existingBook.setPicture(updateBook.getPicture());
        existingBook.setNumberOfPages(updateBook.getNumberOfPages());
        existingBook.getCategory().setId(updateBook.getId());

        return bookRepository.save(existingBook);
    }
}
