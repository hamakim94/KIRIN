#FROM openjdk:11-jdk
#VOLUME /tmp
#ARG JAR_FILE=build/libs/noning-0.0.1-SNAPSHOT.jar
#COPY ${JAR_FILE} app.jar
#EXPOSE 8080 # 이 컨테이너가 어떤 포트를 사용하는지
#ENTRYPOINT ["java","-jar","/app.jar"]

# open jdk java 17 버전의 환경을 구성
FROM openjdk:17-jdk
# build 시점에 활용되는 변수선언문 (target 폴더의 jar파일을 바라볼 것)
ARG JAR_FILE=build/libs/backend-0.0.1-SNAPSHOT.jar
# 이를 카피하여 app.jar 로 복사
COPY ${JAR_FILE} app.jar
# 이 컨테이너가 어떤 포트를 사용하는지
EXPOSE 8080
# 기존 jar 파일을 단순 실행
ENTRYPOINT ["java","-jar","/app.jar"]