package soen341.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDTO {

  public String sender;
  public String receiver;
  public String body;
  public String timestamp;
}
