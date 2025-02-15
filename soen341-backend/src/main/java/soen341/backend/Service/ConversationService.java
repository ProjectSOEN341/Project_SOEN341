package soen341.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soen341.backend.Entity.Conversation;
import soen341.backend.Repository.ConversationRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConversationService {
    @Autowired
    private ConversationRepository conversationRepository;

    public boolean doesConversationExist(String receiver,String sender){ {
        return ((conversationRepository.existsByUser1(receiver) && conversationRepository.existsByUser2(sender))||
                (conversationRepository.existsByUser1(sender) && conversationRepository.existsByUser2(receiver)));
    }


}

}
