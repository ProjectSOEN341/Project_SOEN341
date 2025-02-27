package soen341.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChannelMessageDTO {
    private Integer id;

    private String sender;

    private String body;

    private String timestamp;

    private Integer channelId;
}
