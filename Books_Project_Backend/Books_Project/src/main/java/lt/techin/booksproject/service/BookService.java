package lt.techin.booksproject.service;

import lombok.RequiredArgsConstructor;
import lt.techin.booksproject.dto.BookCreateRequest;
import lt.techin.booksproject.entity.Book;
import lt.techin.booksproject.entity.Category;
import lt.techin.booksproject.repository.BookRepository;
import lt.techin.booksproject.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;


    public Book createBook(BookCreateRequest createRequest) {
        Book book = new Book();
        book.setTitle(createRequest.getTitle());
        book.setDescription(createRequest.getDescription());
        book.setIsbn(createRequest.getIsbn());
        book.setPicture(createRequest.getPicture());
        book.setNumberOfPages(createRequest.getNumberOfPages());

        Category category = categoryRepository.findById(createRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        book.setCategory(category);

        return bookRepository.save(book);
    }

        public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    public Book getBookById (Long id){
        return  bookRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Book not found"));
    }

    public void deleteBookById (Long id){
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found with id: " + id);
        }

        bookRepository.deleteById(id);
    }

    public Book updateBook (Long id, BookCreateRequest updateRequest){
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));

        existingBook.setTitle(updateRequest.getTitle());
        existingBook.setDescription(updateRequest.getDescription());
        existingBook.setIsbn(updateRequest.getIsbn());
        existingBook.setPicture(updateRequest.getPicture());
        existingBook.setNumberOfPages(updateRequest.getNumberOfPages());

        Category category = categoryRepository.findById(updateRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        existingBook.setCategory(category);

        return bookRepository.save(existingBook);
    }
    public List<Book> getBooks(Long categoryId, String title) {
        boolean hasCategory = categoryId != null;
        boolean hasTitle = title != null && !title.trim().isEmpty();
        String t = hasTitle ? title.trim() : null;

        if (hasCategory && hasTitle) {
            return bookRepository.findByCategory_IdAndTitleContainingIgnoreCase(categoryId, t);
        }
        if (hasCategory) {
            return bookRepository.findByCategory_Id(categoryId);
        }
        if (hasTitle) {
            return bookRepository.findByTitleContainingIgnoreCase(t);
        }
        return bookRepository.findAll();
    }
}
