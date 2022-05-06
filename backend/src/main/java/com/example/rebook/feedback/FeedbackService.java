package com.example.rebook.feedback;

import com.example.rebook.dtos.NewFeedbackDTO;
import com.example.rebook.dtos.UpdateFeedbackDTO;
import com.example.rebook.exception.ResourceNotFoundException;
import com.example.rebook.member.Member;
import com.example.rebook.member.MemberRepository;
import com.example.rebook.transference.TransferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final MemberRepository memberRepository;
    private final TransferenceRepository transferenceRepository;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository, MemberRepository memberRepository, TransferenceRepository transferenceRepository) {
        this.feedbackRepository = feedbackRepository;
        this.memberRepository = memberRepository;
        this.transferenceRepository = transferenceRepository;
    }

    public List<Feedback> getAllFeedbackOfUser(Long userId) {
        return feedbackRepository.findByToMemberMemberId(userId);
    }

    public void addNewFeedback(NewFeedbackDTO dto) {
        Member fromMember = memberRepository.findById(dto.getFromUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + dto.getFromUserId() + " does not exists"));
        Member toMember = memberRepository.findById(dto.getToUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + dto.getToUserId() + " does not exists"));
        Feedback feedback = new Feedback(fromMember, toMember, new Timestamp(System.currentTimeMillis()),dto.getStar(), dto.getComment());
        feedbackRepository.save(feedback);
    }

    public Feedback updateFeedback(Long feedbackId, UpdateFeedbackDTO dto) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback with id " + feedbackId + " does not exists"));
        feedback.setStar(dto.getStar());
        feedback.setComment(dto.getComment());
        feedbackRepository.save(feedback);
        return feedback;
    }

    public void deleteFeedback(Long feedbackId) {
        feedbackRepository.deleteById(feedbackId);
    }
}
