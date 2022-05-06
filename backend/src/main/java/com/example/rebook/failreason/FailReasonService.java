package com.example.rebook.failreason;

import com.example.rebook.dtos.NewFailReasonDTO;
import com.example.rebook.exception.ResourceNotFoundException;
import com.example.rebook.member.Member;
import com.example.rebook.member.MemberRepository;
import com.example.rebook.transference.Transference;
import com.example.rebook.transference.TransferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FailReasonService {
    private final FailReasonRepository failReasonRepository;
    private final MemberRepository memberRepository;
    private final TransferenceRepository transferenceRepository;

    @Autowired
    public FailReasonService(FailReasonRepository failReasonRepository, MemberRepository memberRepository, TransferenceRepository transferenceRepository) {
        this.failReasonRepository = failReasonRepository;
        this.memberRepository = memberRepository;
        this.transferenceRepository = transferenceRepository;
    }

    public Optional<FailReason> getFailReasonById(Long failReasonId) {
        return failReasonRepository.findById(failReasonId);
    }

    public void addNewFailReason(NewFailReasonDTO dto) {
        Long fromMemberId = dto.getFromMemberId();
        Long toMemberId = dto.getToMemberId();
        Long transferenceId = dto.getTransferenceId();
        Transference transference = transferenceRepository.findById(transferenceId)
                .orElseThrow(() -> new ResourceNotFoundException("Transference with id " + transferenceId + " does not exists"));
        Member fromMember = memberRepository.findById(fromMemberId)
            .orElseThrow(() -> new ResourceNotFoundException("Member with id " + fromMemberId + " does not exists"));
        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new ResourceNotFoundException("Member with id " + toMemberId + " does not exists"));
        String reason = dto.getReason();
        FailReason failReason = new FailReason(transference, fromMember, toMember, reason);
        failReasonRepository.save(failReason);
    }
}
