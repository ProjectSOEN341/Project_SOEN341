package soen341.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import soen341.backend.DTO.ChannelDTO;
import soen341.backend.Entity.Channel;
import soen341.backend.Entity.Participant;
import soen341.backend.Repository.ChannelRepository;
import soen341.backend.Repository.ParticipantRepository;

import java.util.Optional;

@RestController
@RequestMapping("/participant")
public class ParticipantController {
    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private ChannelRepository channelRepository;

    @PostMapping(path = "/addParticipantToChannel/{Id}/{User}")
    public void addParticipantToChannel( @PathVariable int Id, @PathVariable String User) {
        Participant newParticipant = new Participant();

        newParticipant.setUser(User);

        Channel channel = new Channel();

        channel = channelRepository.findById(Id).orElse(null);

        if (channel == null) {
            return;
        }

        newParticipant.setChannel(channel);

        participantRepository.save(newParticipant);
    }

    @GetMapping(path = "/hasJoined/{Id}/{User}")
    public boolean hasJoined( @PathVariable int Id, @PathVariable String User) {
        return participantRepository.existsByUserAndChannelId(User, Id);
    }

}
