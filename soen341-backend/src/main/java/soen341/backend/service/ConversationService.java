package soen341.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soen341.backend.repository.ConversationRepository;

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
