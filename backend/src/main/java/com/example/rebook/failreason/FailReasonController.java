package com.example.rebook.failreason;

import com.example.rebook.dtos.NewFailReasonDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/failReason")
public class FailReasonController {
    private final FailReasonService failReasonService;

    @Autowired
    public FailReasonController(FailReasonService failReasonService) {
        this.failReasonService = failReasonService;
    }

    @GetMapping(path = "/{id}")
    public Optional<FailReason> getById(@PathVariable Long id) {
        return failReasonService.getFailReasonById(id);
    }

    @PostMapping
    public void addNewFailReason(@RequestBody NewFailReasonDTO dto) {
        failReasonService.addNewFailReason(dto);
    }
}
