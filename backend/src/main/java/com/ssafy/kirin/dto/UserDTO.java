package com.ssafy.kirin.dto;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserDTO implements UserDetails {
    private Long id;
    private String name;
    private String nickname;
    private String profileImg;
    private String email;
//    private String password;
//    private Long walletId;
//    private Boolean isCeleb;

    // star
//    private String info;
//    private String coverImg;

//    private List<? extends GrantedAuthority> roles;

    // Security가 관리하는 UserDetails의 methods
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

//    @Override
//    public String getPassword() {
//        return password;
//    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return Long.toString(id);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
