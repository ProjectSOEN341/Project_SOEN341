package soen341.backend.dto;

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
