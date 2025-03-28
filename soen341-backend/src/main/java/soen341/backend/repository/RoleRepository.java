package soen341.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import soen341.backend.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

  Optional<Role> findByName(String role);
}
