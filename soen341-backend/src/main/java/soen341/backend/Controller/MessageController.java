package soen341.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import soen341.backend.DTO.MessageDTO;
import soen341.backend.Entity.Message;
import soen341.backend.Repository.MessageRepository;

@Controller
public class MessageController {
    @Autowired
    private MessageRepository messageRepository;


    @MessageMapping("/hello/{name}")
    @SendTo("/topic/greetings/{name}")
    public MessageDTO greeting(@DestinationVariable String name, MessageDTO messageDTO) throws Exception {
        System.out.println(messageDTO);
        System.out.println();
        Message message = new Message();
        message.setSender(messageDTO.sender);
        message.setReceiver(messageDTO.receiver);
        message.setBody(messageDTO.body);
        message.setTimestamp(messageDTO.timestamp);
        messageRepository.save(message);
        return messageDTO;
    }
}
