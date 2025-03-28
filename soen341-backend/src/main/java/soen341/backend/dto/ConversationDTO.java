package soen341.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConversationDTO {

    private String user1;

    private String user2;

    private int id;

    private String role;

    private MessageDTO[] messages;
}
