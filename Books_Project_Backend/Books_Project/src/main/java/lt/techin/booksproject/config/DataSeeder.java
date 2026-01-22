package lt.techin.booksproject.config;

import lombok.RequiredArgsConstructor;
import lt.techin.booksproject.entity.Book;
import lt.techin.booksproject.entity.Category;
import lt.techin.booksproject.repository.BookRepository;
import lt.techin.booksproject.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final CategoryRepository categoryRepository;
    private final BookRepository bookRepository;

    @Bean
    CommandLineRunner seedDatabase() {
        return args -> {

            if (categoryRepository.count() > 0) {
                return; // jau seeded
            }

            Category fantasy = categoryRepository.save(new Category("Fantasy"));
            Category classics = categoryRepository.save(new Category("Classics"));
            Category selfHelp = categoryRepository.save(new Category("Self-help"));
            Category sciFi = categoryRepository.save(new Category("Sci-Fi"));


            bookRepository.save(buildBook(
                    "Harry Potter and the Philosopher's Stone",
                    "A fantasy novel about a young wizard discovering his destiny.",
                    "9780747532699",
                    223,
                    "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",
                    fantasy
            ));

            bookRepository.save(buildBook(
                    "1984",
                    "A dystopian novel about surveillance and totalitarianism.",
                    "9780452284234",
                    328,
                    "https://covers.openlibrary.org/b/isbn/9780452284234-L.jpg",
                    classics
            ));

            bookRepository.save(buildBook(
                    "Dune",
                    "A science fiction epic about politics and power.",
                    "9780441172719",
                    412,
                    "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
                    sciFi
            ));

            bookRepository.save(buildBook(
                    "Atomic Habits",
                    "A motivational book about habits and success.",
                    "9780735211292",
                    320,
                    "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
                    selfHelp
            ));
        };
    }

    private Book buildBook(
            String title,
            String description,
            String isbn,
            int pages,
            String picture,
            Category category
    ) {
        Book book = new Book();
        book.setTitle(title);
        book.setDescription(description);
        book.setIsbn(isbn);
        book.setNumberOfPages(pages);
        book.setPicture(picture);
        book.setCategory(category);
        return book;
    }
}
