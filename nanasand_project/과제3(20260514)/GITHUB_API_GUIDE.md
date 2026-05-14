# GitHub Finder - API 정리 문서

## 📋 프로젝트 개요

**GitHub Finder 앱**은 사용자명으로 GitHub 프로필과 저장소를 검색하는 웹 애플리케이션입니다.

---

## 🔍 GitHub REST API 정리

### 1️⃣ 사용자 정보 API

#### 목적
사용자의 기본 프로필 정보를 가져옵니다.

#### 요청 URL
```
GET https://api.github.com/users/{username}
```

#### 예시
```javascript
fetch('https://api.github.com/users/octocat')
  .then(response => response.json())
  .then(data => console.log(data));
```

#### 주요 응답 필드

| 필드명 | 타입 | 설명 | 사용 위치 |
|--------|------|------|-----------|
| `login` | string | 사용자명 | 프로필 매핑 정보 |
| `avatar_url` | string | 프로필 이미지 URL | 프로필 매핑 정보 |
| `name` | string | 실제 이름 | 프로필 매핑 정보 |
| `bio` | string | 소개글 | 프로필 매핑 정보 |
| `public_repos` | number | 공개 저장소 수 | 통계 매핑 정보 |
| `followers` | number | 팔로워 수 | 통계 매핑 정보 |
| `following` | number | 팔로잉 수 | 통계 매핑 정보 |
| `html_url` | string | GitHub 프로필 링크 | 외부 링크 |
| `created_at` | string | 계정 생성일 | 추가 정보 |
| `company` | string | 소속 회사 | 추가 정보 |
| `location` | string | 위치 | 추가 정보 |

#### 응답 예시
```json
{
  "login": "octocat",
  "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
  "name": "The Octocat",
  "bio": "GitHub's mascot",
  "public_repos": 8,
  "followers": 9000,
  "following": 9,
  "html_url": "https://github.com/octocat",
  "created_at": "2011-01-25T18:44:36Z"
}
```

#### 실패 상황

| 상태 코드 | 원인 | 처리 방법 |
|-----------|------|-----------|
| **404** | 존재하지 않는 사용자명 | "사용자를 찾을 수 없습니다." 메시지 표시 |
| **403** | API rate limit 초과 (인증 없이 시간당 60회) | "API 요청 한도를 초과했습니다." 메시지 표시 |
| **500** | GitHub 서버 오류 | "서버 오류가 발생했습니다." 메시지 표시 |
| **네트워크 오류** | 인터넷 연결 끊김 | "네트워크 오류가 발생했습니다." 메시지 표시 |

---

### 2️⃣ 저장소 목록 API

#### 목적
사용자의 공개 저장소 목록을 가져옵니다.

#### 요청 URL
```
GET https://api.github.com/users/{username}/repos
```

#### 쿼리 파라미터

| 파라미터 | 설명 | 기본값 | 사용 예시 |
|----------|------|--------|-----------|
| `sort` | 정렬 기준 (created, updated, pushed, full_name) | full_name | `sort=updated` |
| `direction` | 정렬 방향 (asc, desc) | asc | `direction=desc` |
| `per_page` | 페이지당 결과 수 (최대 100) | 30 | `per_page=10` |
| `page` | 페이지 번호 | 1 | `page=1` |

#### 권장 요청 URL
```
GET https://api.github.com/users/{username}/repos?sort=updated&per_page=10
```

#### 예시
```javascript
fetch('https://api.github.com/users/octocat/repos?sort=updated&per_page=10')
  .then(response => response.json())
  .then(data => console.log(data));
```

#### 주요 응답 필드

| 필드명 | 타입 | 설명 | 사용 위치 |
|--------|------|------|-----------|
| `name` | string | 저장소 이름 | 목록 매핑 정보 |
| `description` | string | 저장소 설명 | 목록 매핑 정보 |
| `html_url` | string | 저장소 GitHub 링크 | 외부 링크 |
| `stargazers_count` | number | 스타 수 | 목록 매핑 정보 |
| `language` | string | 주 사용 언어 | 목록 매핑 정보 |
| `updated_at` | string | 마지막 업데이트 시간 | 정렬 기준 |
| `fork` | boolean | fork 여부 | 필터링 |
| `forks_count` | number | fork 수 | 추가 정보 |
| `watchers_count` | number | watcher 수 | 추가 정보 |

#### 응답 예시
```json
[
  {
    "name": "Hello-World",
    "description": "My first repository on GitHub!",
    "html_url": "https://github.com/octocat/Hello-World",
    "stargazers_count": 1500,
    "language": "JavaScript",
    "updated_at": "2023-01-15T10:30:00Z",
    "fork": false
  },
  {
    "name": "Spoon-Knife",
    "description": "This repo is for demonstration purposes only.",
    "html_url": "https://github.com/octocat/Spoon-Knife",
    "stargazers_count": 12000,
    "language": "HTML",
    "updated_at": "2023-01-10T08:20:00Z",
    "fork": true
  }
]
```

#### 실패 상황

| 상태 코드 | 원인 | 처리 방법 |
|-----------|------|-----------|
| **404** | 존재하지 않는 사용자 | "저장소를 찾을 수 없습니다." 메시지 표시 |
| **403** | API rate limit 초과 | "API 요청 한도를 초과했습니다." 메시지 표시 |
| **500** | GitHub 서버 오류 | "서버 오류가 발생했습니다." 메시지 표시 |
| **빈 배열** | 저장소가 없는 사용자 | "공개 저장소가 없습니다." 메시지 표시 |

---

## 🛡️ 예외 처리 정리

### 필수 구현 기능 3: 예외 처리

#### 1. 빈 입력 값 검증
```javascript
if (!username || username.trim() === '') {
  showError('사용자명을 입력해주세요.');
  return;
}
```

#### 2. 404 에러 처리 (사용자 없음)
```javascript
if (response.status === 404) {
  showError('사용자를 찾을 수 없습니다. (404)');
  return;
}
```

#### 3. API Rate Limit 처리
```javascript
if (response.status === 403) {
  showError('API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.');
  return;
}
```

#### 4. 네트워크 오류 처리
```javascript
try {
  const response = await fetch(url);
  // ...
} catch (error) {
  showError('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
}
```

---

## 📊 API 호출 흐름도

```
사용자 입력
    ↓
빈 값 검증
    ↓
[API 1] 사용자 정보 요청
    ↓
성공? → YES → 프로필 렌더링
    ↓           ↓
    NO      [API 2] 저장소 목록 요청
    ↓           ↓
404 에러?   성공? → YES → 저장소 렌더링
    ↓           ↓
"사용자 없음"   NO
메시지 표시     ↓
            에러 메시지 표시
```

---

## 🔐 API 인증 (선택사항)

### Personal Access Token 사용
인증 없이는 시간당 60회 요청 제한이 있습니다. 더 많은 요청이 필요한 경우:

```javascript
fetch('https://api.github.com/users/octocat', {
  headers: {
    'Authorization': 'token YOUR_PERSONAL_ACCESS_TOKEN'
  }
})
```

**인증 시 제한**: 시간당 5,000회

---

## 📚 참고 자료

- [GitHub REST API 공식 문서](https://docs.github.com/en/rest)
- [Users API](https://docs.github.com/en/rest/users/users)
- [Repositories API](https://docs.github.com/en/rest/repos/repos)
- [Rate Limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)

---

## ✅ 체크리스트

- [x] 사용자 정보 API 이해
- [x] 저장소 목록 API 이해
- [x] 응답 필드 매핑 확인
- [x] 예외 처리 시나리오 파악
- [ ] 실제 구현 (index.html, style.css, script.js)
