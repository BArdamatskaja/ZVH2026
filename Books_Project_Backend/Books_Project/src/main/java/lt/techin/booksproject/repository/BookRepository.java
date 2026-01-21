package lt.techin.booksproject.repository;

import lt.techin.booksproject.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByCategory_Id(Long categoryId);
    List<Book> findByCategory_IdAndTitleContainingIgnoreCase(Long categoryId, String title);

}
