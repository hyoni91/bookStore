package com.green.Shop_answer.admin.Controller;


import com.green.Shop_answer.admin.Service.AdminService;
import com.green.Shop_answer.admin.vo.SearchVO;
import com.green.Shop_answer.item.vo.CategoryVO;
import com.green.Shop_answer.item.vo.ImgVO;
import com.green.Shop_answer.item.vo.ItemVO;
import com.green.Shop_answer.member.vo.MemberVO;
import com.green.Shop_answer.util.FileUploadUtil;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.naming.Name;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api_admin")
public class AdminController {

    @Resource(name = "adminService")
    private AdminService adminService;

    @GetMapping("/categoryList")
    public List<CategoryVO> getCategoryList(){
        return adminService.categoryList();
    }

    //item 등록
    //첨부파일이 포함된 데이터가 전달되면 자바에서 데이터를 받는 문법도 달라진다.
    //첨부파일이 함께 전달되면 @RequestBody 어노테이션을 작성하지 않는다. (from으로 넘어오기때문)
    //MutipartFile사용법
    //@RequestParam("전달되는 첨부파일 데이터명")  MultipartFile mainImg
    @PostMapping("/insertItem")
    public void insetItem(ItemVO itemVO
                            , @RequestParam("mainImg") MultipartFile mainImg
                            , @RequestParam("subImg") MultipartFile subImg){

        System.out.println("item============================"+itemVO);


        // 파일 업로드
        //메인이 되는 이미지 첨부 후 첨부된 원본 파일명, 첨부된 파일명을 리턴 받음
        ImgVO mainImgVO = FileUploadUtil.fileUpload(mainImg);
        mainImgVO.setIsMain("Y");

        //서브가 되는 이미지 첨부 후 첨부된 원본 파일명, 첨부된 파일명을 리턴 받음
        ImgVO subImgVO = FileUploadUtil.fileUpload(subImg);
        subImgVO.setIsMain("N");


        //등록한 상품의 item_code조회
        int nextItemCode = adminService.getNextItemCode();

        //ItemVO에 조회한 item_code 저장
        itemVO.setItemCode(nextItemCode);

        //아이템 등록
        adminService.insetItem(itemVO);

        //----------itemVO 객체에 저장된 빈값의 정보를 전부 저장-------------------//
        //1. imgVO를 여러개 저장할 수 있는 List생성
            List<ImgVO> imgList = new ArrayList<>();
        //2. imgList에 첨부된 이밎 정보 저장
        imgList.add(mainImgVO);
        imgList.add(subImgVO);
        //3. itemVO에 imgList 저장
        itemVO.setImgList(imgList);


        //아이템의 이미지 등록(아이템 등록시 들고 있던 data도 함께 넘겨야한다.)
        adminService.insertImgs(itemVO);

        System.out.println("Received mainImg: " + mainImg.getOriginalFilename());
        System.out.println("Received subImg: " + subImg.getOriginalFilename());
        System.out.println("Saving files...");

    }

    //모든 유저 정보조회
    @PostMapping("/selectAllUser")
    List<MemberVO> selectAllUser(@RequestBody SearchVO searchVO){
        System.out.println("============================="+ searchVO);
        return  adminService.memberSelect(searchVO);
    }

    //유저 상세 정보
    @GetMapping("/userInfo/{memId}")
    MemberVO userInfo(@PathVariable("memId") String memId){
        return adminService.userInfo(memId);
    }
}

