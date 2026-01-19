package lt.techin.booksproject.config;

import lt.techin.booksproject.entity.Role;
import lt.techin.booksproject.entity.User;
import lt.techin.booksproject.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            // ADMIN demo user
            if (!userRepository.existsByEmail("admin@demo.lt")) {
                User admin = User.builder()
                        .email("admin@demo.lt")
                        .passwordHash(passwordEncoder.encode("Admin123!"))
                        .role(Role.ADMIN)
                        .build();

                userRepository.save(admin);
            }

            // USER demo user
            if (!userRepository.existsByEmail("user@demo.lt")) {
                User user = User.builder()
                        .email("user@demo.lt")
                        .passwordHash(passwordEncoder.encode("User123!"))
                        .role(Role.USER)
                        .build();

                userRepository.save(user);
            }
        };
    }
}
