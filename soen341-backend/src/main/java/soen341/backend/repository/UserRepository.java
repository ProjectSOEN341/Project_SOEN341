package soen341.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import soen341.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByEmail(String email);
}
