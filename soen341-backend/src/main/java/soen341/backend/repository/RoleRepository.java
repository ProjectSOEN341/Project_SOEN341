package soen341.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import soen341.backend.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Integer> {

    Optional<Role> findByName(String role);
}
