[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10029066&assignment_repo_type=AssignmentRepo)

# 자리있어? : 경기도 광역버스 잔여 좌석 예측 시스템

![B_S_11](https://github.com/kookmin-sw/capstone-2023-29/assets/105616772/f3039ed4-e014-478d-bae8-d893b2e2f893)


## 1. 프로젝트 소개

### 1) 프로젝트 설명
2022년 말 경기도 광역 버스의 입석이 실질적으로 금지 됨으로 경기도 광역버스를 타고 출퇴근 하는 사람들이 많은 불편함에 처하게 되었습니다. 입석이 금지된 현재, 다수의 사람들이 불안한 출퇴근 혹은 등하교에 노출 되었다고 볼 수 있습니다. 많은 사람들의 이러한 불안함 혹은 불편함을 해결하고자 프로젝트가 시작되었습니다. 

저희의 서비스 "자리있어?"는 이러한 불편함을 겪고 계시는 분들의 불편함을 해소해드리고자 합니다.
경기도 버스 포털에서 현재 좌석 수를 알려주는 API를 통해 직접 크롤링하여 데이터를 수집해, 예측모델을 설계하였습니다. "자리있어?"는 학습으로 얻어진 모델을 통해 예측한 잔여 좌석 값을 사용자에게 제공합니다. 

### 2) ABSTRACT
At the end of 2022, standing on Gyeonggi-do wide-area buses was practically prohibited, causing many people to commute by Gyeonggi-do wide-area buses. Now that standing seats are prohibited, many people are exposed to anxious commuting or commuting to and from school. The project was launched to address this anxiety or discomfort of many people.

Our service **"Any Seats?"** wants to relieve the inconvenience of those who are experiencing this inconvenience.
We designed a predictive model by collecting data by crawling directly through an API that informs the current number of seats on the Gyeonggi-do bus portal. "Any Seats?" provides the user with the residual seat values predicted by the model obtained from the learning.


### 3) 기술 소개

#### DATA CRAWLING
<img width="800" alt="image" src="https://github.com/kookmin-sw/capstone-2023-29/assets/105616772/2cbd6916-c932-413a-b2c7-fdd3d55c1975">

#### MODEL TRAINING
<img width="800" alt="image" src="https://github.com/kookmin-sw/capstone-2023-29/assets/105616772/1af6f91b-693f-43c6-96e3-112e3e4bbadd">


### 4) 프로젝트 구성도

<img width="800" alt="image" src="https://github.com/kookmin-sw/capstone-2023-29/assets/105616772/acc08218-3f20-498c-8e80-641e45d0f0cb">


### 5) 프로젝트 포스터
<img width="800" alt="image" src="https://github.com/kookmin-sw/capstone-2023-29/assets/105616772/b119e6ef-c30d-4656-b315-04366a9fd0f8">


## 2. 프로젝트 실행 화면
![시연 사진1](https://github.com/kookmin-sw/capstone-2023-29/assets/105616772/88fd2f5e-8669-4de7-a613-d73c2937c4fd)
![시연사진2](https://github.com/kookmin-sw/capstone-2023-29/assets/105616772/2e8f592d-b6ef-4e13-8c6e-944585a26aa3)



## 3. 프로젝트 사용법

![image](https://github.com/kookmin-sw/capstone-2023-29/assets/105616772/6ab08b68-6f08-45bd-b299-aa748e236072)

1. QR코드를 촬영하여 홈페이지에 접속 
2. 모바일로 홈 화면에 추가하기를 통하여 홈 화면에 자리있어 아이콘이 추가 됨
3. 회원가입 및 로그인
4. 평소에 사용하는 버스 및 정류장을 검색 후 즐겨찾기에 추가
5. 즐겨찾기 화면에서 해당 탭을 터치하면, 해당 버스의 예측 좌석 수를 보여주게 됨

## 4. 팀 소개

- 백소양 
  - 학번 : **0092
  - 역할 : 팀장, 데이터 분석 및 모델 개발

- 서기선
  - 학번 : **1624
  - 역할 : 데이터 분석 및 모델 개발

- 최승준
  - 학번 : **1699
  - 역할 : DB관리, 백엔드 개발

- 이정안
  - 학번 : **1293
  - 역할 : 프론트엔드 개발