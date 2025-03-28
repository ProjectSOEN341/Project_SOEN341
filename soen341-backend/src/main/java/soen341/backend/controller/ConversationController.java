package soen341.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import soen341.backend.dto.ConversationDTO;
import soen341.backend.entity.Conversation;
import soen341.backend.repository.ConversationRepository;
import soen341.backend.service.ConversationService;

@RestController
@RequestMapping("/direct-message")
public class ConversationController {
  @Autowired ConversationService conversationService = new ConversationService();

  @Autowired private ConversationRepository conversationRepository;

  @GetMapping("{username}")
  public List<Conversation> getConversation(@PathVariable String username) {
    return conversationRepository.findByUser1OrUser2(username, username);
  }

  @PostMapping(path = "/dm/createConversation")
  public void createConversation(@RequestBody ConversationDTO conversationDTO) {
    Conversation newConversation = new Conversation();

    newConversation.setUser1(conversationDTO.getUser1());
    newConversation.setUser2(conversationDTO.getUser2());

    conversationRepository.save(newConversation);
  }
}
