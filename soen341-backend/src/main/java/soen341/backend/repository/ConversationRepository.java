package soen341.backend.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import soen341.backend.entity.Conversation;

@Repository
public interface ConversationRepository extends CrudRepository<Conversation, Integer> {
  boolean existsByUser1(String user1);

  boolean existsByUser2(String user2);

  Conversation findByUser1AndUser2(String sender, String receiver);

  List<Conversation> findByUser1OrUser2(String user1, String user2);
}
