package soen341.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import soen341.backend.DTO.MessageDTO;
import soen341.backend.Entity.Conversation;
import soen341.backend.Entity.Message;
import soen341.backend.Repository.ConversationRepository;
import soen341.backend.Repository.MessageRepository;
import soen341.backend.Service.ConversationService;

@Controller
public class MessageController {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    ConversationService conversationService = new ConversationService();

    @Autowired
    private ConversationRepository conversationRepository;


    @MessageMapping("/hello/{name}")
    @SendTo("/topic/greetings/{name}")
    public MessageDTO greeting(@DestinationVariable String name, MessageDTO messageDTO) throws Exception {
        System.out.println(messageDTO);
        System.out.println();
        Conversation savedConversation =null;
        if(!conversationService.doesConversationExist(messageDTO.sender, messageDTO.receiver)) {
            Conversation conversation = new Conversation();
            conversation.setUser1(messageDTO.sender);
            conversation.setUser2(messageDTO.receiver);
            savedConversation =conversationRepository.save(conversation);
        }
        else{
            savedConversation =
                    conversationRepository.findByUser1AndUser2(messageDTO.sender, messageDTO.receiver) != null ?
                            conversationRepository.findByUser1AndUser2(messageDTO.sender, messageDTO.receiver) :   conversationRepository.findByUser1AndUser2(messageDTO.receiver, messageDTO.sender);

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
