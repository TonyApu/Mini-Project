package com.example.rebook.reminder;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {
    List<Optional<Reminder>> findByFirstMember_MemberIdAndSecondMember_MemberId(Long firstMemberId, Long secondMemberId);
}
