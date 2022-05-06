package com.example.rebook.failreason;

import com.example.rebook.member.Member;
import com.example.rebook.transference.Transference;

import javax.persistence.*;

@Entity
@Table
public class FailReason {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long failReasonId;

    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    @JoinColumn(name = "transference_id", referencedColumnName = "transferenceId")
    private Transference transference;

    @ManyToOne
    @JoinColumn(name = "from_member_id", referencedColumnName = "memberId")
    private Member fromMember;

    @ManyToOne
    @JoinColumn(name = "to_member_id", referencedColumnName = "memberId")
    private Member toMember;

    private String reason;

    public FailReason() {
    }

    public FailReason(Transference transference, Member fromMember, Member toMember, String reason) {
        this.transference = transference;
        this.fromMember = fromMember;
        this.toMember = toMember;
        this.reason = reason;
    }

    public Long getFailReasonId() {
        return failReasonId;
    }

    public void setFailReasonId(Long failReasonId) {
        this.failReasonId = failReasonId;
    }

    public Transference getTransference() {
        return transference;
    }

    public void setTransference(Transference transference) {
        this.transference = transference;
    }

    public Member getFromMember() {
        return fromMember;
    }

    public void setFromMember(Member fromMember) {
        this.fromMember = fromMember;
    }

    public Member getToMember() {
        return toMember;
    }

    public void setToMember(Member toMember) {
        this.toMember = toMember;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
