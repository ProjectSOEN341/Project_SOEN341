package soen341.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import soen341.backend.DTO.ChannelMessageDTO;
import soen341.backend.Entity.Channel;
import soen341.backend.Entity.ChannelMessage;
import soen341.backend.Repository.ChannelMessageRepository;
import soen341.backend.Repository.ChannelRepository;

@Controller
public class ChannelMessageController {
    @Autowired
    private ChannelMessageRepository channelMessageRepository;

    @Autowired
    private ChannelRepository channelRepository;

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

        channelMessageRepository.save(channelMessage);
        return channelMessageDTO;
    }
}
