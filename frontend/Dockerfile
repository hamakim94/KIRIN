# nginx 이미지 사용
FROM nginx

# root에 app폴더 생성
RUN mkdir /app 

# work dir 고정 
WORKDIR /app

# work dir에 build 폴더 생성 /app/build
RUN mkdir ./build

# host pc의 현재 경로의 build 폴더를 workdir의 build폴더로 복사 
ADD ./build ./build 

# nginx의 default.conf를 삭제 
RUN rm /etc/nginx/conf.d/default.conf

# 80포트 오픈 
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]