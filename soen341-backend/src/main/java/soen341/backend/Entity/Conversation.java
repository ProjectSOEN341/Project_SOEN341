package soen341.backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // This tells Hibernate to make a table out of this class
@AllArgsConstructor
@Data
@NoArgsConstructor
public class Conversation {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String user1;

    private String user2;

    private String role;


}
