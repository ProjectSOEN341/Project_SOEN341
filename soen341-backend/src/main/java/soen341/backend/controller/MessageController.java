package soen341.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import soen341.backend.dto.ConversationDTO;
import soen341.backend.dto.MessageDTO;
import soen341.backend.entity.Conversation;
import soen341.backend.entity.Message;
import soen341.backend.repository.ConversationRepository;
import soen341.backend.repository.MessageRepository;
import soen341.backend.service.ConversationService;

@Controller
public class MessageController {
  @Autowired private MessageRepository messageRepository;

  @Autowired ConversationService conversationService = new ConversationService();

  @Autowired private ConversationRepository conversationRepository;

  @MessageMapping("/dm/{name}")
  @SendTo("/topic/dm/{name}")
  public ConversationDTO transferConversation(
      @DestinationVariable String name, ConversationDTO conversation) throws Exception {
    return conversation;
  }

  @MessageMapping("/hello/{name}")
  @SendTo("/topic/greetings/{name}")
  public MessageDTO greeting(@DestinationVariable String name, MessageDTO messageDTO)
      throws Exception {
    System.out.println(messageDTO);
    System.out.println();
    Conversation savedConversation = null;
    if (!conversationService.doesConversationExist(messageDTO.sender, messageDTO.receiver)) {
      Conversation conversation = new Conversation();
      conversation.setUser1(messageDTO.sender);
      conversation.setUser2(messageDTO.receiver);
      savedConversation = conversationRepository.save(conversation);
    } else {
      savedConversation =
          conversationRepository.findByUser1AndUser2(messageDTO.sender, messageDTO.receiver) != null
              ? conversationRepository.findByUser1AndUser2(messageDTO.sender, messageDTO.receiver)
              : conversationRepository.findByUser1AndUser2(messageDTO.receiver, messageDTO.sender);
    }

    Message message = new Message();
    message.setSender(messageDTO.sender);
    message.setReceiver(messageDTO.receiver);
    message.setBody(messageDTO.body);
    message.setTimestamp(messageDTO.timestamp);
    message.setConversation(savedConversation);
    messageRepository.save(message);
    return messageDTO;
  }
}
