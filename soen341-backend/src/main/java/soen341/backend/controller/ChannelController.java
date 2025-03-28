package soen341.backend.controller;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import soen341.backend.dto.ChannelDTO;
import soen341.backend.entity.Channel;
import soen341.backend.repository.ChannelMessageRepository;
import soen341.backend.repository.ChannelRepository;
import soen341.backend.repository.ParticipantRepository;

@RestController
@RequestMapping("/channel")
public class ChannelController {
  @Autowired private ChannelRepository channelRepository;

  @Autowired private ParticipantRepository participantRepository;

  @Autowired private ChannelMessageRepository channelMessageRepository;

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

  @DeleteMapping("/{id}")
  @Transactional
  public void deleteChannel(@PathVariable int id) {
    participantRepository.deleteByChannelId(id);
    channelMessageRepository.deleteByChannelId(id);

    channelRepository.deleteById(id);
  }
}
