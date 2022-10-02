# node 이미지 사용 
FROM node:16.15.0 as build-stage 

# 명령어를 실행할 디렉터리
WORKDIR /usr/src/app

# package*.json에 등록되어있는 라이브러리들을 npm install으로 설치
COPY package*.json ./
RUN npm install 

# 프로젝트 폴더를 이미지에 복사, npm run build를 통해 build폴더에 빌드한 프로젝트(static 파일)가 저장됨
COPY . . 
RUN npm run build 



# nginx 이미지 사용
FROM nginx

# # nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# 아까 빌드했던 파일들을 nginx의 서비스 폴더인 /usr/share/nginx/html으로 복사
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

# 80포트 오픈하고 nginx 실행
EXPOSE 80

# nginx를 백그라운드에서 실행하는 컨테이너를 실행
ENTRYPOINT ["nginx", "-g", "daemon off;"]
