# 기린

## Develop Rules

#### branch

```
master -> develop -> FE_develop -> feat-frontend/기능명
	          -> BE_develop -> feat-backend/기능명
                  -> BC_develop -> feat-domain/기능명
```

- master
    - develop
        - BE_develop
        - FE_develop
        - BC_develop

#### merge

- 각 파트 maintainer들만 각 파트에 대한 merge 권한을 가짐. 

```
FE/BE/BC/DOCS_날짜_merge : Merge branch "시작 브랜치" into "도착 브랜치"  

```

- maintainer가 아닌 개발자들은 mr

```
FE/BE/BC/DOCS_날짜_mr : Merge branch "시작 브랜치" into "도착 브랜치"  
```

#### commit 메시지

```
FE/BE/BC/DOCS_날짜_개발한(중인)기능: 개발 내용 (진행중/ 완료/ 수정 완료/ 수정 진행중) 
```

#### commit 주의사항 및 규칙
```
- 수정 전 git pull 받고 시작하기 
- 수정 전 git branch 잘 확인하기 
- git add . 사용 금지 
- 관련 있는 코드들끼리만 commit (commit 메세지 잘 쓰기)
```

## Code style

#### 이름규칙

| Domain | Frontend                                                     | Backend |
| ------ | ------------------------------------------------------------ | ------- |
|        | 1. Component 파일명: Pascal case<br />2. Non-component 파일명: Camel case <br />3. 속성명: Camel case<br />4. 변수명: Camel case, 숫자/ 특수문자 사용 가능<br />5. CSS 파일명: component 이름과 동일하게<br />6. jsx, js을 js로 통일 | **db** <br />1. db table, 속성명: snake case <br /><br /> **back server** <br />1. class, interface명(파일명): Pascal case <br />2. 디렉토리명: Camel case <br />3. 변수명: Camel case <br />4. controller단 메소드명: 도메인+접미사(동사) <br />5. 나머지 메소드명: 동사+도메인|

- Boolean 타입의 변수 작명규칙 
  : is 접두사 사용 -> (ex) isExist 

- 들여쓰기 (indent)  
  : 4 space 방식  

- 작은따옴표(')를 사용할 건지, 큰따옴표(")를 사용할 건지 
  : 큰따옴표(") 사용

**Backend**

- Repository return type(Collection API 제외)은 Optional로 
  - orElseThrow 예외처리하기 
  - ifPresentOrElse, ifPresent

이외 https://naver.github.io/hackday-conventions-java/ 참고

## Git Branch Command

#### 원격 저장소 갱신

```
git remote update
```

#### 원격 저장소 갱신(브랜치 삭제까지 포함)

```
git remote update --prune
```

#### branch 전체 목록 조회(빨간 것이 원격저장소)

```
git branch -a
```

#### branch 바꾸기

branch 변경 + 파일 복원

```
git checkout {브랜치명}
```

branch만 변경

```
git switch {브랜치명}
```

파일만 복원

```
git restore {파일명}
```

#### branch 생성 (각 Dev 브랜치에서 생성할 것)

#### ex) BE는 BE Develop에서 생성)
```
git branch {브랜치명}    <= 로컬에 브랜치 생성 하는 것
git checkout -b {브랜치명} <= 로컬에 브랜치 생성함과 동시에 브랜치 바꾸기
```

#### branch 푸쉬(로컬-> 원격) (주로 이렇게 쓸 것)
```
git push origin {브랜치명}
```
