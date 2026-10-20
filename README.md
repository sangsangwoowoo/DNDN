# 든든 (DNDN)

**일상은 편하게, 금융은 더 안전하게.**

든든은 시니어의 쉬운 금융 생활과 가족의 안심을 돕는 서비스입니다. 시니어와 보호자가 각자의 화면에서 금융 활동을 확인하고, 이상 거래 알림과 가족 소식을 함께 살펴볼 수 있도록 지원합니다.

## 주요 기능

- **시니어**
  - 큰 글씨와 음성 입력을 고려한 화면 및 AI 비서
  - 계좌 확인과 단계별 송금
  - 송금 위험 분석 및 보호자 확인 흐름
  - 음성·인지·걷기 활동 기록
  - 가족 소식과 알림 확인
- **보호자**
  - 시니어 금융 활동 알림과 리포트 확인
  - 가족 소식 작성 및 공유
  - 연결된 가족과 계좌·송금 관련 정보 확인

## 저장소 구성

| 경로 | 설명 |
| --- | --- |
| [`dndn-frontend/`](./dndn-frontend/) | Expo, React Native, TypeScript 기반 모바일 앱 |
| [`dndn-backend/`](./dndn-backend/) | Java 17, Spring Boot 기반 REST API |
| [`dndn-backend/db/dndn_db.sql`](./dndn-backend/db/dndn_db.sql) | MySQL 데이터베이스 및 테이블 생성 스크립트 |
| [`dndn-backend/db/dndn_mock.sql`](./dndn-backend/db/dndn_mock.sql) | 개발·확인용 초기 데이터 스크립트 |

## 기술 스택

- **Frontend:** Expo, React Native, Expo Router, TypeScript
- **Backend:** Java 17, Spring Boot, Spring Security, Spring Data JPA
- **Database:** MySQL
- **기타:** JWT 인증, Android Health Connect, 음성 인식·합성, Expo Notifications

## 시작하기

### 사전 준비

- Node.js와 npm
- Java 17
- MySQL
- Android 앱 실행 시 Android 개발 환경 (Android Studio 및 SDK)

### 1. 데이터베이스 준비

MySQL에서 `dndn_db` 데이터베이스와 테이블을 생성합니다.

```bash
mysql -u <사용자명> -p < dndn-backend/db/dndn_db.sql
```

> **주의:** `dndn_db.sql`은 기존 테이블을 삭제한 뒤 다시 생성합니다. 기존 데이터가 있는 DB에서는 실행하지 말고, 로컬 개발용 DB에서만 사용하거나 먼저 백업하세요. 필요하면 이후 `dndn_mock.sql`을 확인하고 개발용 초기 데이터를 추가하세요.

### 2. 백엔드 실행

백엔드에는 기본 `application.yml`이 포함되어 있지 않으므로, 실행 환경에 맞는 Spring 설정을 준비해야 합니다. MySQL 연결 정보(URL, 사용자명, 비밀번호)와 JWT 설정이 필요합니다.

```text
spring.datasource.url=jdbc:mysql://localhost:3306/dndn_db
spring.datasource.username=<사용자명>
jwt.secret=<충분히 긴 임의의 비밀키>
jwt.access-token-expiration=<밀리초 단위 만료 시간>
```

DB 비밀번호를 포함한 설정은 환경 변수나 로컬 전용 Spring 설정 파일로 제공하고, 비밀값은 저장소에 커밋하지 마세요. 설정을 준비한 뒤 백엔드 디렉터리에서 실행합니다.

```bash
cd dndn-backend
./gradlew bootRun
```

Windows에서는 `gradlew.bat bootRun`을 사용하세요. 테스트는 `./gradlew test` 또는 Windows의 `gradlew.bat test`로 실행할 수 있습니다.

### 3. 프론트엔드 실행

프론트엔드 디렉터리에 `.env` 파일을 만들고 백엔드의 기본 주소를 지정합니다.

```dotenv
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080
```

의존성을 설치하고 Expo 개발 서버를 시작합니다.

```bash
cd dndn-frontend
npm ci
npm start
```

필요한 플랫폼 명령은 다음과 같습니다.

```bash
npm run android
npm run ios
npm run web
```

실제 기기에서 실행할 때는 `localhost` 대신 기기에서 접근 가능한 개발 PC의 IP 주소를 사용하세요. iOS 네이티브 앱 빌드에는 macOS 개발 환경이 필요합니다.

## 개발 참고

- 프론트엔드 API 요청 주소는 `EXPO_PUBLIC_API_BASE_URL`을 사용합니다.
- 프론트엔드 린트: `cd dndn-frontend` 후 `npm run lint`
- Android Health Connect, 푸시 알림, 음성 인식 등은 기기 권한 및 플랫폼 설정이 필요할 수 있습니다.
- 개발·테스트 환경에서는 실제 금융 계정이나 민감한 개인 정보를 사용하지 마세요.
