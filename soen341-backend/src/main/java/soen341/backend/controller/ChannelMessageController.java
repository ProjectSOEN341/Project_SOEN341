package soen341.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import soen341.backend.dto.ChannelMessageDTO;
import soen341.backend.entity.Channel;
import soen341.backend.entity.ChannelMessage;
import soen341.backend.repository.ChannelMessageRepository;
import soen341.backend.repository.ChannelRepository;

@Controller
public class ChannelMessageController {
  @Autowired private ChannelMessageRepository channelMessageRepository;

  @Autowired private ChannelRepository channelRepository;

  @MessageMapping("/channel/sendMessage")
  @SendTo("/topic/channel")
  public ChannelMessageDTO sendMessage(ChannelMessageDTO channelMessageDTO) {
    ChannelMessage channelMessage = new ChannelMessage();

    channelMessage.setBody(channelMessageDTO.getBody());
    channelMessage.setSender(channelMessageDTO.getSender());
    channelMessage.setTimestamp(channelMessageDTO.getTimestamp());

    Channel channel = channelRepository.getChannelById(channelMessageDTO.getChannelId());
    channelMessage.setChannel(channel);

    System.out.println(channelMessageDTO.getChannelId());

    ChannelMessage c = channelMessageRepository.save(channelMessage);
    channelMessageDTO.setId(channelMessage.getId());
    return channelMessageDTO;
  }

  @MessageMapping("/message/deleteInApp")
  @SendTo("/topic/message/deleteMessage")
  public ChannelMessageDTO deleteMessage(ChannelMessageDTO channelMessageDTO) throws Exception {

    return channelMessageDTO;
  }

  @DeleteMapping("/direct-message/{id}")
  public void deleteMessage(@PathVariable int id) {
    channelMessageRepository.deleteById(id);
  }
}
