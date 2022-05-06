package com.example.rebook.reminder;

import com.example.rebook.dtos.ActiveReminderDTO;
import com.example.rebook.dtos.NewReminderDTO;
import com.example.rebook.dtos.UpdateReminderDTO;
import com.example.rebook.dtos.notification.ReminderNotificationDTO;
import com.example.rebook.member.Member;
import com.example.rebook.member.MemberRepository;
import com.example.rebook.notification.NotificationService;
import com.example.rebook.transference.Transference;
import com.example.rebook.transference.TransferenceRepository;
import com.example.rebook.transference.TransferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReminderService {
    private final ReminderRepository reminderRepository;
    private final MemberRepository memberRepository;
    private final TransferenceRepository transferenceRepository;
    private final TransferenceService transferenceService;
    private final NotificationService notificationService;

    @Autowired
    public ReminderService(ReminderRepository reminderRepository, MemberRepository memberRepository,
                           TransferenceRepository transferenceRepository, @Lazy TransferenceService transferenceService, NotificationService notificationService) {
        this.reminderRepository = reminderRepository;
        this.memberRepository = memberRepository;
        this.transferenceRepository = transferenceRepository;
        this.transferenceService = transferenceService;
        this.notificationService = notificationService;
    }

    public Reminder addNewReminder(NewReminderDTO dto) {
        Long firstMemberId = dto.getFirstMemberId();
        Long secondMemberId = dto.getSecondMemberId();
        Member firstMember = memberRepository.getById(firstMemberId);
        Member secondMember = memberRepository.getById(secondMemberId);
        Reminder reminder = new Reminder(firstMember, secondMember);
        reminderRepository.save(reminder);
        return reminder;
    }

    public boolean isExistedReminder(Long firstMemberId, Long secondMemberId) {
        List<Optional<Reminder>> reminderFromAtoB = reminderRepository.findByFirstMember_MemberIdAndSecondMember_MemberId(firstMemberId, secondMemberId);
        List<Optional<Reminder>> reminderFromBtoA = reminderRepository.findByFirstMember_MemberIdAndSecondMember_MemberId(secondMemberId, firstMemberId);
        boolean result = false;
        List<Optional<Reminder>> combineList = new ArrayList<>();
        combineList.addAll(reminderFromAtoB);
        combineList.addAll(reminderFromBtoA);

        for (Optional<Reminder> reminder : combineList) {
            if (reminder.isPresent()) {
                Reminder existed = reminder.get();
                if (existed.getStatus() == null || (existed.getStatus() != null && existed.getStatus().equals("Pending"))) {
                    result = true;
                    break;
                }
            }
        }

        return result;
    }

    public Optional<Reminder> getReminderFromAtoB(Long firstMemberId, Long secondMemberId) {
        List<Optional<Reminder>> reminderFromAtoB = reminderRepository.findByFirstMember_MemberIdAndSecondMember_MemberId(firstMemberId, secondMemberId);
        List<Optional<Reminder>> reminderFromBtoA = reminderRepository.findByFirstMember_MemberIdAndSecondMember_MemberId(secondMemberId, firstMemberId);

        List<Optional<Reminder>> combineList = new ArrayList<>();
        combineList.addAll(reminderFromAtoB);
        combineList.addAll(reminderFromBtoA);

        for (Optional<Reminder> reminder : combineList) {
            if (reminder.isPresent()) {
                Reminder existed = reminder.get();
                if (existed.getStatus() == null || (existed.getStatus() != null && existed.getStatus().equals("Pending"))) {
                    return Optional.of(existed);
                }
            }
        }

        return Optional.empty();
    }

    public void addTransferenceToReminder(Long reminderId, Long transferenceId) {
        Reminder reminder = reminderRepository.getById(reminderId);
        Transference transference = transferenceRepository.getById(transferenceId);
        if (reminder.getTransferenceList() == null) {
            reminder.setTransferenceList(new ArrayList<>());
        }
        reminder.getTransferenceList().add(transference);
        reminderRepository.save(reminder);
    }

    public void activeReminder(ActiveReminderDTO dto) {
        Long firstMemberId = dto.getFirstMemberId();
        Long secondMemberId = dto.getSecondMemberId();
        Optional<Reminder> reminder = getReminderFromAtoB(firstMemberId, secondMemberId);
        if (reminder.isPresent()) {
            Reminder existedReminder = reminder.get();
            existedReminder.setLocation(dto.getLocation());
            existedReminder.setTimestamp(Timestamp.valueOf(dto.getTime()));
            existedReminder.setActive(true);
            existedReminder.setStatus("Pending");
            Reminder savedReminder = reminderRepository.save(existedReminder);
            notificationService.newReminderNotification(new ReminderNotificationDTO(savedReminder.getReminderId(), firstMemberId, secondMemberId));
        } else {
            Reminder newReminder = addNewReminder(new NewReminderDTO(firstMemberId, secondMemberId));
            newReminder.setLocation(dto.getLocation());
            newReminder.setTimestamp(Timestamp.valueOf(dto.getTime()));
            newReminder.setActive(true);
            newReminder.setStatus("Pending");
            Reminder savedReminder = reminderRepository.save(newReminder);
            Long newReminderId = savedReminder.getReminderId();
            transferenceService.updateOtherTransferenceReminder(firstMemberId, secondMemberId, newReminderId);
            notificationService.newReminderNotification(new ReminderNotificationDTO(newReminderId, firstMemberId, secondMemberId));
        }
    }

    // user hủy reminder
    public void deactivateReminder(Long reminderId, Long memberId) {
        Reminder reminder = reminderRepository.getById(reminderId);
        reminder.setActive(false);
        reminder.setStatus("Deactivate");
        Reminder savedReminder = reminderRepository.save(reminder);
        Long firstMemberId = savedReminder.getFirstMember().getMemberId();
        Long secondMemberId = savedReminder.getSecondMember().getMemberId();

        if (!firstMemberId.equals(memberId)) {
            Long tempMemberId = firstMemberId;
            firstMemberId = secondMemberId;
            secondMemberId = tempMemberId;
        }
        notificationService.cancelReminderNotification(new ReminderNotificationDTO(savedReminder.getReminderId(), firstMemberId, secondMemberId));
    }

    // không hiển thị reminder khi quá thời gian đã hẹn
    public void updateTimeoutReminder(Long reminderId) {
        Reminder reminder = reminderRepository.getById(reminderId);
        reminder.setActive(false);
        reminder.setStatus("Timeout");
        reminderRepository.save(reminder);
    }

    public void updateReminder(UpdateReminderDTO dto) {
        Reminder reminder = reminderRepository.getById(dto.getReminderId());
        reminder.setLocation(dto.getLocation());
        reminder.setTimestamp(Timestamp.valueOf(dto.getTime()));
        reminderRepository.save(reminder);
    }


    public List<Reminder> getAll() {
        return reminderRepository.findAll();
    }
}
