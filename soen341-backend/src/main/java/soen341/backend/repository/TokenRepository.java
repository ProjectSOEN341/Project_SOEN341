package soen341.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import soen341.backend.entity.Token;

public interface TokenRepository extends JpaRepository<Token, Integer> {
  Optional<Token> findByToken(String token);
}
