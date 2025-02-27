package soen341.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import soen341.backend.DTO.ChannelDTO;
import soen341.backend.DTO.ConversationDTO;
import soen341.backend.Entity.Channel;
import soen341.backend.Entity.Conversation;
import soen341.backend.Repository.ChannelRepository;
import soen341.backend.Repository.ConversationRepository;

import java.util.List;

@RestController
@RequestMapping("/channel")
public class ChannelController {
    @Autowired
    private ChannelRepository channelRepository;

    @PostMapping(path = "/createChannel")
    public void createConversation(@RequestBody ChannelDTO channelDTO) {
        Channel newChannel = new Channel();

        newChannel.setName(channelDTO.getName());

        channelRepository.save(newChannel);
    }

    @GetMapping("/retrieveAllChannel")
    public @ResponseBody Iterable<Channel> getAllChannel() {
        return channelRepository.findAll();
    }
}
