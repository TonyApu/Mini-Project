package com.example.rebook.dtos;

public class NewFailReasonDTO {
    private Long transferenceId;
    private Long fromMemberId;
    private Long toMemberId;
    private String reason;

    public NewFailReasonDTO() {}

    public NewFailReasonDTO(Long transferenceId, Long fromMemberId, Long toMemberId, String reason) {
        this.transferenceId = transferenceId;
        this.fromMemberId = fromMemberId;
        this.toMemberId = toMemberId;
        this.reason = reason;
    }

    public Long getTransferenceId() {
        return transferenceId;
    }

    public void setTransferenceId(Long transferenceId) {
        this.transferenceId = transferenceId;
    }

    public Long getFromMemberId() {
        return fromMemberId;
    }

    public void setFromMemberId(Long fromMemberId) {
        this.fromMemberId = fromMemberId;
    }

    public Long getToMemberId() {
        return toMemberId;
    }

    public void setToMemberId(Long toMemberId) {
        this.toMemberId = toMemberId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
