package soen341.backend.service;

import jakarta.mail.MessagingException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import soen341.backend.entity.Token;
import soen341.backend.entity.User;
import soen341.backend.object.AuthenticationRequest;
import soen341.backend.object.AuthenticationResponse;
import soen341.backend.object.EmailTemplateName;
import soen341.backend.object.RegistrationRequest;
import soen341.backend.repository.RoleRepository;
import soen341.backend.repository.TokenRepository;
import soen341.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final TokenRepository tokenRepository;
  private final EmailService emailService;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;

  @Value("${application.mailing.frontend.activation-url}")
  private String activationUrl;

  public void register(RegistrationRequest request) throws MessagingException {
    var userRole =
        roleRepository
            .findByName("USER")
            // todo - better exception handling
            .orElseThrow(() -> new IllegalStateException("ROLE USER was not initialized"));
    var user =
        User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .role("member")
            .password(passwordEncoder.encode(request.getPassword()))
            .accountLocked(false)
            .enabled(false)
            .roles(List.of(userRole))
            .build();
    userRepository.save(user);
    sendValidationEmail(user);
  }

  private void sendValidationEmail(User user) throws MessagingException {
    var newToken = generateAndSaveActivationToken(user);

    emailService.sendEmail(
        user.getEmail(),
        user.getFullName(),
        EmailTemplateName.ACTIVATE_ACCOUNT,
        activationUrl,
        newToken,
        "Account activation");
  }

  private String generateAndSaveActivationToken(User user) {
    // generate a token
    String generatedToken = generateActivationCode(6);
    var token =
        Token.builder()
            .token(generatedToken)
            .createdAt(LocalDateTime.now())
            .expiresAt(LocalDateTime.now().plusMinutes(15))
            .user(user)
            .build();
    tokenRepository.save(token);
    return generatedToken;
  }

  private String generateActivationCode(int length) {
    String characters = "0123456789";
    StringBuilder codeBuilder = new StringBuilder();
    SecureRandom secureRandom = new SecureRandom();
    for (int i = 0; i < length; i++) {
      int randomIndex = secureRandom.nextInt(characters.length()); // 0..9
      codeBuilder.append(characters.charAt(randomIndex));
    }
    return codeBuilder.toString();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    var auth =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    var claims = new HashMap<String, Object>();
    var user = ((User) auth.getPrincipal());
    claims.put("fullName", user.getFullName());
    var jwtToken = jwtService.generateToken(claims, user);
    return AuthenticationResponse.builder().token(jwtToken).build();
  }

  // @Transactional
  public void activateAccount(String token) throws MessagingException {
    Token savedToken =
        tokenRepository
            .findByToken(token)
            // todo exception has to be defined
            .orElseThrow(() -> new RuntimeException("Invalid Token"));
    if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
      sendValidationEmail(savedToken.getUser());
      throw new RuntimeException(
          "Activation token is expired. A new token has been sent to the same email address");
    }
    var user =
        userRepository
            .findById(savedToken.getUser().getId())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    user.setEnabled(true);
    userRepository.save(user);
    savedToken.setValidatedAt(LocalDateTime.now());
    tokenRepository.save(savedToken);
  }
}
