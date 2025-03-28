package soen341.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity // This tells Hibernate to make a table out of this class
@AllArgsConstructor
@Data
@NoArgsConstructor
public class Channel {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String name;

    @OneToMany(mappedBy = "channel")
    @JsonManagedReference
    private List<ChannelMessage> channelMessages;

    @OneToMany(mappedBy = "channel")
    @JsonManagedReference
    private List<Participant> participants;
}
