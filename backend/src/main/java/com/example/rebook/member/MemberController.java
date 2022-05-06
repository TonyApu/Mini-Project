package com.example.rebook.member;

import com.example.rebook.book.Book;
import com.example.rebook.dtos.member.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/members")
public class MemberController {
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    public List<Member> getMembers() {
        return memberService.getMembers();
    }

    @GetMapping("/{id}")
    public Member getMemberById(@PathVariable Long id) {
        return memberService.getMemberById(id);
    }

    @PostMapping("/signup")
    public boolean signup(@RequestBody SignUpDTO signUpDTO) {
        return memberService.signup(signUpDTO);
    }

    @PutMapping("/update")
    public boolean updateMemberInformation(@RequestParam Long memberId, @RequestBody UpdateMemberDTO dto) {
        return memberService.updateMemberInformation(memberId, dto);
    }

    @PutMapping("/changePassword")
    public boolean changePassword(@RequestParam Long memberId, @RequestBody ChangePasswordDTO dto) {
        return memberService.changePassword(memberId, dto);
    }

    @GetMapping("/books")
    public Optional<List<Book>> getBooksByMember(@RequestParam Long memberId) {
        return memberService.getBooksByMember(memberId);
    }

    @PostMapping("/login")
    public LoginResponseDTO checkLogin(@RequestBody LoginRequestDTO loginRequestDTO) {
        return memberService.checkLogin(loginRequestDTO);
    }
}
