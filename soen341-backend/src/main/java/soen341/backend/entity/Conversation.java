package soen341.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity // This tells Hibernate to make a table out of this class
@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString(exclude = "messages")
public class Conversation {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  private String user1;

  private String user2;

  private String role;

  @OneToMany(mappedBy = "conversation")
  @JsonManagedReference
  private List<Message> messages;
}
