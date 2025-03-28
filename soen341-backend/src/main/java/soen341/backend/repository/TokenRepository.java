package soen341.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import soen341.backend.entity.Token;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {
    Optional<Token> findByToken(String token);
}
