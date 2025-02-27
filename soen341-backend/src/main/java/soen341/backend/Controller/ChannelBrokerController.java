package soen341.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import soen341.backend.DTO.ChannelDTO;
import soen341.backend.DTO.ConversationDTO;
import soen341.backend.Entity.Channel;
import soen341.backend.Repository.ChannelRepository;

@Controller
public class ChannelBrokerController {

    @Autowired
    private ChannelRepository channelRepository;

    @MessageMapping("/channel/createInApp")
    @SendTo("/topic/channel/newChannels")
    public ChannelDTO transferConversation(ChannelDTO channelDTO)throws Exception{

        Channel channel = new Channel();

        channel.setName(channelDTO.getName());

        channel = channelRepository.save(channel);

        channelDTO.setId(channel.getId());

        return channelDTO;
    }

}
