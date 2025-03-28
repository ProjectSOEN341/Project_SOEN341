package soen341.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import soen341.backend.dto.UserDTO;
import soen341.backend.entity.User;
import soen341.backend.repository.UserRepository;

@RestController
@RequestMapping("/user")
public class UserController {
  @Autowired private UserRepository userRepository;

  @GetMapping("/{email}")
  public UserDTO getUserEmailAndRole(@PathVariable String email) {
    User tableUser = userRepository.findByEmail(email).orElse(null);
    UserDTO user = new UserDTO();
    if (tableUser != null) {
      user.setEmail(tableUser.getEmail());
      user.setRole(tableUser.getRole());
    }
    return user;
  }

  @PutMapping("/{email}/{role}")
  public void updateUserRole(@PathVariable String email, @PathVariable String role) {
    User user = userRepository.findByEmail(email).orElse(null);
    if (user != null && (role.equals("admin") || role.equals("member"))) {
      user.setRole(role);
      userRepository.save(user);
    }
    return;
  }
}
