package soen341.backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity // This tells Hibernate to make a table out of this class
@AllArgsConstructor
@Data
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String sender;

    private String receiver;

    private String body;

    private String timestamp;

    //private Integer conversationId;
}