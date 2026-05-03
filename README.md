# 가계쀼 Boo-jet

<p align="center">
  <img src="./src/assets/Logo.png" alt="가계쀼 로고" width="120" />
</p>

<h3 align="center">부부와 개인이 함께 쓰는 KB 스타일 가계부 웹 애플리케이션</h3>

<p align="center">
  <a href="https://kbteampj-deploy-practice.vercel.app/auth/login">
    <strong>배포된 프로젝트 체험하기</strong>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Pinia-3.0-F7D336?style=flat-square&logo=vue.js&logoColor=111" alt="Pinia" />
  <img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Vercel-Frontend-000?style=flat-square&logo=vercel" alt="Vercel" />
</p>

<p align="center">
  <a href="#소개">소개</a> ·
  <a href="#팀원-소개">팀원 소개</a> ·
  <a href="#주요-기능">주요 기능</a> ·
  <a href="#기술-스택">기술 스택</a> ·
  <a href="#실행-방법">실행 방법</a> ·
  <a href="#배포-구조">배포 구조</a>
</p>

<br />

<p align="center">
  <img src="./src/assets/happy_sunglass_Character.png" alt="가계쀼 캐릭터" width="260" />
</p>

## 소개

**가계쀼**는 개인 가계부와 부부 공동 가계부를 함께 관리할 수 있는 웹 앱입니다.  
로그인, 회원가입, 거래 내역 관리, 카테고리별 지출 확인, 커플 연결, 공동 목표 관리까지 하나의 흐름으로 사용할 수 있도록 구성했습니다.

> Figma 기반 UI를 Vue 애플리케이션으로 구현하고, 현재 배포 환경에서는 Supabase REST API를 사용해 데이터를 저장하고 조회합니다.

## 👥 팀원 소개

| 이름 | GitHub | 주요 기여 |
| --- | --- | --- |
| 박성훈 | [@we5046](https://github.com/we5046) | 프로젝트 초기 환경 설정, GitHub 협업 흐름 정리, 로그인/회원가입/마이페이지 구현, 인증 Store 및 라우터 가드 구성, 사이드바 UI 개선, 사용자 편의 기능, 배포 및 Supabase 연동 환경 구성 |
| 허경민 | [@heokyeongmin390](https://github.com/heokyeongmin390) | 친구 탐색 및 환경설정 화면 구현, 사용자 플로우 개선, 프론트엔드 화면 구현 및 사용성 개선 |
| 조재훈 | [@7aeHoon](https://github.com/7aeHoon) | 홈 화면 및 가계부 주요 기능 구현, 가계부 요약/차트/캘린더/거래 내역 기능 구현, UI 컴포넌트 구현 및 페이지 완성도 개선 |
| 한승연 | [@3eungyeon](https://github.com/3eungyeon) | 부부가계부 기능 구현, 커플 매칭 및 커플 상세 화면 관련 기능 구현, 커플 데이터 흐름 개선 |

## 주요 기능

- **회원 관리**: 회원가입, 로그인, 세션 유지, 마이페이지 정보 수정
- **개인 가계부**: 수입/지출 등록, 수정, 삭제 및 거래 내역 조회
- **카테고리 분석**: 카테고리별 지출 비중과 월별 흐름 확인
- **커플 연결**: 사용자 검색, 커플 요청, 수락/취소/해제
- **부부 가계부**: 두 사용자의 거래 데이터를 함께 비교하고 관리
- **공동 목표**: 커플 목표 생성, 진행률 확인, 목표별 거래 연결
- **반응형 UI**: 데스크톱과 모바일 환경을 고려한 레이아웃

## 기술 스택

| 영역 | 사용 기술 |
| --- | --- |
| Frontend | Vue 3, Vite, Vue Router |
| State | Pinia |
| UI | Bootstrap, Font Awesome, Lucide Vue |
| Chart | Chart.js, vue-chartjs |
| API | Axios, Fetch |
| Database | Supabase |
| Deploy | Vercel |

## 프로젝트 구조

```txt
TeamProject/
  src/
    api/          # API 요청 함수와 Supabase REST 연동
    assets/       # 로고, 캐릭터, 프로필 이미지, 공통 스타일
    components/   # 화면 단위 UI 컴포넌트
    layouts/      # 인증/기본 레이아웃
    pages/        # 라우트 페이지
    router/       # Vue Router 설정
    service/      # 사용자 탈퇴 등 도메인 서비스
    stores/       # Pinia 상태 관리
  supabase/
    schema.sql    # Supabase 테이블 생성 및 초기 데이터 SQL
  db.json         # json-server용 예비 mock 데이터
  vercel.json     # Vercel SPA rewrite 설정
```

## 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. Supabase 설정

Supabase 프로젝트의 SQL Editor에서 `supabase/schema.sql`을 실행해 필요한 테이블을 생성합니다.

생성되는 주요 테이블은 다음과 같습니다.

```txt
users
transactions
categories
couples
coupleRequests
coupleGoals
```

### 3. 환경변수 설정

프로젝트 루트에 `.env` 파일을 만들고 Supabase URL과 publishable/anon key를 입력합니다.

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

`VITE_SUPABASE_URL`에는 `/rest/v1`을 붙이지 않아도 됩니다. 앱 코드에서 자동으로 Supabase REST API 주소를 구성합니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

## 사용 가능한 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | Vite 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run server` | `db.json` 기반 json-server 실행 |
| `npm run server-local` | `db.local.json` 기반 json-server 실행 |

## 배포 구조

이 프로젝트는 Vercel에 Vue/Vite 프론트엔드를 배포하고, 데이터 저장소로 Supabase를 사용합니다.

```txt
Vercel
  Vue/Vite Frontend
  https://kbteampj-deploy-practice.vercel.app/auth/login

Supabase
  Database
  REST API
```

### Vercel 설정

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Root Directory: TeamProject
```

환경변수:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Vite 환경변수는 빌드 시점에 번들에 반영됩니다. Vercel에서 환경변수를 수정했다면 반드시 새로 배포해야 합니다.

## 참고

`db.json`과 `json-server` 스크립트는 로컬 mock 테스트를 위해 남겨둔 예비 구성입니다. 현재 배포 환경에서는 `VITE_SUPABASE_URL`과 `VITE_SUPABASE_ANON_KEY`가 설정되어 있으면 Supabase REST API를 우선 사용합니다.

현재 앱은 학습용 프로젝트 흐름에 맞춰 Supabase publishable/anon key로 REST API를 직접 호출합니다. 실제 서비스로 확장할 경우 Supabase Auth, RLS 정책, 비밀번호 해시 처리, 서버 측 검증을 함께 적용해야 합니다.
