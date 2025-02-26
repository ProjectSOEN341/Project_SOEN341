package soen341.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import soen341.backend.DTO.ConversationDTO;
import soen341.backend.Entity.Conversation;
import soen341.backend.Repository.ConversationRepository;
import soen341.backend.Service.ConversationService;

import java.util.List;

@RestController
@RequestMapping("/direct-message")
public class ConversationController {
    @Autowired
    ConversationService conversationService = new ConversationService();

    @Autowired
    private ConversationRepository conversationRepository;

    @GetMapping("{username}")
    public List<Conversation> getConversation(@PathVariable String username) {
     return conversationRepository.findByUser1OrUser2(username,username);
    }

    @PostMapping(path = "/dm/createConversation")
    public void createConversation(@RequestBody ConversationDTO conversationDTO) {
        Conversation newConversation = new Conversation();

        newConversation.setUser1(conversationDTO.getUser1());
        newConversation.setUser2(conversationDTO.getUser2());

        conversationRepository.save(newConversation);


    }
}
