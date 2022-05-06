package com.example.rebook.member;

import com.example.rebook.book.Book;
import com.example.rebook.book.BookRepository;
import com.example.rebook.dtos.member.*;
import com.example.rebook.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final BookRepository bookRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository, BookRepository bookRepository) {
        this.memberRepository = memberRepository;
        this.bookRepository = bookRepository;
    }

    public List<Member> getMembers() {return memberRepository.findAll();}

    public Member getMemberById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member with id " + id + " does not exists"));
        return member;
    }

    public Optional<List<Book>> getBooksByMember(Long memberId) {
        return  bookRepository.findByMemberMemberId(memberId);
    }

    public LoginResponseDTO checkLogin(LoginRequestDTO dto) {
        String username = dto.getUsername();
        String password = dto.getPassword();
        LoginResponseDTO responseDTO = null;
        Optional<Member> memberOptional = memberRepository.checkLogin(username, password);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            Long memberId = member.getMemberId();
            String name = member.getName();
            String address = member.getAddress();
            Integer cityId = member.getCityId();
            Integer districtId = member.getDistrictId();
            Integer wardId = member.getWardId();
            String addressDetail = member.getAddressDetail();
            String email = member.getEmail();
            String phoneNumber = member.getPhoneNumber();
            responseDTO = new LoginResponseDTO(memberId, name, address, cityId, districtId, wardId, addressDetail, email, phoneNumber);
        }
        return responseDTO;
    }

    public boolean signup(SignUpDTO signUpDTO) {
        Optional<Member> memberOptional = memberRepository.findMemberByEmail(signUpDTO.getEmail());
        if (memberOptional.isPresent()) {
            return false;
        }
        Member member = new Member(
                signUpDTO.getUsername(),
                signUpDTO.getPassword(),
                signUpDTO.getFullName(),
                signUpDTO.getAddress(),
                signUpDTO.getCityId(),
                signUpDTO.getDistrictId(),
                signUpDTO.getWardId(),
                signUpDTO.getAddressDetail(),
                signUpDTO.getEmail(),
                signUpDTO.getPhoneNumber()
        );
        memberRepository.save(member);
        return true;
    }

    public boolean updateMemberInformation(Long memberId, UpdateMemberDTO dto) {
        boolean result = false;
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (memberOptional.isPresent()) {
            result = true;
            Member member = memberOptional.get();
            member.setName(dto.getName());
            member.setAddress(dto.getAddress());
            member.setCityId(dto.getCityId());
            member.setDistrictId(dto.getDistrictId());
            member.setWardId(dto.getWardId());
            member.setEmail(dto.getEmail());
            member.setPhoneNumber(dto.getPhoneNumber());
            memberRepository.save(member);
        }
        return result;
    }

    public boolean changePassword(Long memberId, ChangePasswordDTO dto) {
        boolean result = false;
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (memberOptional.isPresent() && memberOptional.get().getPassword().equals(dto.getOldPassword())) {
            result = true;
            Member member = memberOptional.get();
            member.setPassword(dto.getNewPassword());
            memberRepository.save(member);
        }
        return result;
    }
}
