package soen341.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // This tells Hibernate to make a table out of this class
@AllArgsConstructor
@Data
@NoArgsConstructor
public class Participant {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  private String user;

  @ManyToOne
  @JoinColumn(name = "channel_id")
  @JsonBackReference
  private Channel channel;
}
