package lt.techin.booksproject.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1) DTO validation errors (@NotBlank, @Email, etc.)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(error.getField(), error.getDefaultMessage());
        }

        ApiErrorResponse response = new ApiErrorResponse(
                "VALIDATION_ERROR",
                "Validation failed",
                fieldErrors
        );

        return ResponseEntity.badRequest().body(response);
    }

    // 2) Duplicate email – service layer
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ApiErrorResponse> handleDuplicateEmail(DuplicateEmailException ex) {
        // IMPORTANT: message must be stable for FE (do NOT include email)
        ApiErrorResponse response = new ApiErrorResponse(
                "EMAIL_ALREADY_EXISTS",
                "Email already exists",
                Map.of("email", "This email is already registered")
        );

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    // 3) Duplicate email – DB constraint fallback
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiErrorResponse> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        ApiErrorResponse response = new ApiErrorResponse(
                "EMAIL_ALREADY_EXISTS",
                "Email already exists",
                Map.of("email", "This email is already registered")
        );

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }
}
