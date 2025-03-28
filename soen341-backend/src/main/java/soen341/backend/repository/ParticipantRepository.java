package soen341.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import soen341.backend.entity.Participant;

@Repository
public interface ParticipantRepository extends CrudRepository<Participant, Integer> {
  boolean existsByUserAndChannelId(String user, Integer channelId);

  void deleteByChannelId(Integer channelId);
}
