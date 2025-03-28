package soen341.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import soen341.backend.entity.ChannelMessage;

@Repository
public interface ChannelMessageRepository extends CrudRepository<ChannelMessage, Integer> {
    void deleteByChannelId(Integer channelId);
}
