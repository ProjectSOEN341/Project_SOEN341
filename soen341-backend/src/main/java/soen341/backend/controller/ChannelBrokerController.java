package soen341.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import soen341.backend.dto.ChannelDTO;
import soen341.backend.entity.Channel;
import soen341.backend.repository.ChannelRepository;

@Controller
public class ChannelBrokerController {

  @Autowired private ChannelRepository channelRepository;

  @MessageMapping("/channel/createInApp")
  @SendTo("/topic/channel/newChannels")
  public ChannelDTO transferConversation(ChannelDTO channelDTO) throws Exception {

    Channel channel = new Channel();

    channel.setName(channelDTO.getName());

    channel = channelRepository.save(channel);

    channelDTO.setId(channel.getId());

    return channelDTO;
  }

  @MessageMapping("/channel/deleteInApp")
  @SendTo("/topic/channel/deleteChannels")
  public ChannelDTO deleteConversation(ChannelDTO channelDTO) throws Exception {

    return channelDTO;
  }
}
