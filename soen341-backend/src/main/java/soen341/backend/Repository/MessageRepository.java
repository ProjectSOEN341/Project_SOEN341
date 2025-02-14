package soen341.backend.Repository;

import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;
import soen341.backend.Entity.Message;

import java.util.UUID;

@Repository
public interface MessageRepository extends CrudRepository<Message, Integer>{
}
