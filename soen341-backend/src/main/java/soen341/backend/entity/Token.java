package soen341.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Token {
  @Id @GeneratedValue private Integer id;
  private String token;
  private LocalDateTime createdAt;
  private LocalDateTime expiresAt;
  private LocalDateTime validatedAt;

  @ManyToOne
  @JoinColumn(name = "userId", nullable = false)
  private User user;
}
