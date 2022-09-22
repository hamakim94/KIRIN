# # nginx 이미지 사용
# FROM nginx

# # root에 app폴더 생성
# RUN mkdir /app 

# # work dir 고정 
# WORKDIR /app

# # work dir에 build 폴더 생성 /app/build
# RUN mkdir ./build

# # host pc의 현재 경로의 build 폴더를 workdir의 build폴더로 복사 
# ADD ./build ./build 

# # nginx의 default.conf를 삭제 
# RUN rm /etc/nginx/conf.d/default.conf

# # 80포트 오픈 
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

# node 이미지 사용 
FROM node:16.15.0

# 명령어를 실행할 디렉터리
WORKDIR /var/lib/jenkins/workspace/Kirin_front/frontend

# 로컬 디텍터리에서 읽어들인 컨텍스트로부터 이미지에 파일을 복사
COPY package*.json ./

# 이미지를 만들기 위해서 컨테이너 내부에서 명령어 실행 
RUN npm install 

COPY . . 

RUN npm run build 


# nginx 이미지 사용
FROM nginx

# # nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
# RUN rm -rf /etc/nginx/conf.d
# COPY conf /etc/nginx

# 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
COPY --from=build-stage /var/lib/jenkins/workspace/Kirin_front/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# 80포트 오픈하고 nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]