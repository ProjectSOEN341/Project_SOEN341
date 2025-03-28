package soen341.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import soen341.backend.entity.Channel;

@Repository
public interface ChannelRepository extends CrudRepository<Channel, Integer> {
  Channel getChannelById(int id);
}
