package com.green.Shop_answer.util;

import com.green.Shop_answer.item.vo.ImgVO;
import com.green.Shop_answer.item.vo.ItemVO;
import org.apache.tomcat.util.http.fileupload.UploadContext;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

//첨부 파일과 관련된 기능
public class FileUploadUtil {

    //파일 업로드
    //static은 객체 생성 후 호출 하기도 전에 기능 실행하기 때문애
    //객체 생성없이 바로 쓸 수 있다.
    public static ImgVO fileUpload(MultipartFile uploadFile){
        ImgVO imgVO = null;

        //input 태그에 파일을 선택했을 때만 첨부기능 실행
        if(!uploadFile.isEmpty()){
            //imgVO 객체 생성
           imgVO = new ImgVO();

            //업로드 될 경로
            String uploadPath = "/Users/hk.kim/Documents/GitHub/workspace/workspace_spring/Shop_answer/src/main/resources/static/upload/";


            // 디렉터리 생성 여부 확인
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs(); // 디렉터리 생성
            }

            //첨부될 파일명(내가 선택한 원본 파일명)
            String originFileName = uploadFile.getOriginalFilename();

            //첨부될 파일명을 랜덤하게 생성하기
            String uuid = UUID.randomUUID().toString();

            //주의! 확장자 추출
            int dotIndex = originFileName.lastIndexOf(".");
            String extension = originFileName.substring(dotIndex);

            String attachedFileName = uuid + extension;

            //첨부될 파일 생성
            File file = new File(uploadPath + attachedFileName);
            //첨부기능 실행
            try {
                uploadFile.transferTo((file));
                System.out.println("파일 저장 경로: " + file.getAbsolutePath());

                //첨부된 파일 정보를 imgVO에 저장
                imgVO.setOriginFileName(originFileName);
                imgVO.setAttachedFileName(attachedFileName);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }

        }


        return imgVO;
    }
}
