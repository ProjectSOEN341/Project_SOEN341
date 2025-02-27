package soen341.backend.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import soen341.backend.Entity.Channel;
import soen341.backend.Entity.Conversation;

import java.util.List;
@Repository
public interface ChannelRepository extends CrudRepository<Channel, Integer> {
    Channel getChannelById(int id);


}
