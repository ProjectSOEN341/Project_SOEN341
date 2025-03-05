package soen341.backend.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import soen341.backend.Entity.Participant;

@Repository
public interface ParticipantRepository extends CrudRepository<Participant, Integer> {
    boolean existsByUserAndChannelId(String user, Integer channelId);
    void deleteByChannelId(Integer channelId);

}
