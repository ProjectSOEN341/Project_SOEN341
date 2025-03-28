package soen341.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import soen341.backend.entity.Message;

@Repository
public interface MessageRepository extends CrudRepository<Message, Integer> {}
