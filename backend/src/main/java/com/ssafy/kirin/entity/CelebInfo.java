package com.ssafy.kirin.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "celeb_info")
public class CelebInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String info;

    @Column(name = "cover_img")
    String coverImg;

//    public void setInfoAndCoverImg(String info, String coverImg){
//        this.info = info;
//        this.coverImg = coverImg;
//    }

    public void setInfo(String info){
        this.info = info;
    }
}
