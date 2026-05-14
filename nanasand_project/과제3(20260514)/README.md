# GitHub Finder: GitHub User Explorer
# 깃허브 파인더: 깃허브 사용자 검색기

![GitHub](https://img.shields.io/badge/GitHub-REST%20API-181717?style=flat-square&logo=github)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

> **"Even if AI writes the code, the final decision is made by the developer."**  
> AI는 강력한 도구이지만, 코드의 품질과 방향성을 결정하는 것은 개발자의 몫입니다.

---

## 📋 프로젝트 소개

**GitHub Finder**는 GitHub REST API를 활용하여 사용자 정보를 검색하고 표시하는 웹 애플리케이션입니다. 사용자명을 입력하면 해당 사용자의 프로필 정보, 통계, 그리고 최신 저장소 목록을 한눈에 볼 수 있습니다.

### 주요 특징
- 🔍 **간편한 검색**: 사용자명만 입력하면 즉시 정보 표시
- 🎨 **세련된 디자인**: 흑백 모노크롬 테마로 전문적인 느낌
- 📱 **반응형 UI**: 모바일, 태블릿, 데스크톱 모두 지원
- 📚 **초보자 친화적**: 상세한 주석으로 학습 자료로도 활용 가능
- ⚡ **빠른 응답**: 비동기 처리로 부드러운 사용자 경험

---

## 🎯 학습 목표

이 프로젝트를 통해 다음을 학습할 수 있습니다:

1. **REST API 활용**
   - GitHub REST API 사용법
   - HTTP 요청 및 응답 처리
   - API 인증 및 rate limit 이해

2. **Vanilla JavaScript 마스터**
   - DOM 조작 (getElementById, createElement)
   - 이벤트 처리 (addEventListener)
   - 비동기 처리 (async/await, fetch)

3. **에러 처리**
   - HTTP 상태 코드 이해 (200, 404, 403)
   - try/catch 예외 처리
   - 사용자 친화적인 에러 메시지

4. **동적 UI 생성**
   - JavaScript로 HTML 요소 생성
   - 데이터 기반 렌더링
   - CSS 클래스 동적 조작

5. **웹 개발 베스트 프랙티스**
   - 코드 구조화 및 모듈화
   - 주석 작성법
   - 반응형 디자인

---

## 🛠️ 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, 애니메이션, 반응형 디자인
- **Vanilla JavaScript (ES6+)**: 프레임워크 없이 순수 JavaScript 사용

### API
- **GitHub REST API**: 사용자 정보 및 저장소 데이터 제공
  - Users API: `GET /users/{username}`
  - Repositories API: `GET /users/{username}/repos`

### 개발 환경
- **브라우저**: Chrome, Firefox, Safari, Edge (최신 버전)
- **에디터**: Visual Studio Code (권장)
- **버전 관리**: Git

---

## 🚀 실행 방법

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/github-finder.git
cd github-finder
```

### 2. 브라우저에서 실행
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### 3. 사용 방법
1. 검색창에 GitHub 사용자명 입력 (예: `octocat`)
2. 검색 버튼 클릭 또는 Enter 키 입력
3. 프로필 정보, 통계, 저장소 목록 확인

---

## ✨ 주요 기능

### 1. 사용자 검색
- GitHub 사용자명으로 검색
- Enter 키 또는 버튼 클릭으로 검색 실행
- 빈 입력 값 검증

### 2. 프로필 정보 표시
- 프로필 이미지
- 사용자 이름 (또는 사용자명)
- 소개글 (bio)

### 3. 통계 정보
- 팔로워 수
- 팔로잉 수
- 공개 저장소 수

### 4. 저장소 목록
- 최신 업데이트 순으로 최대 10개 표시
- 저장소 이름, 설명, 주 사용 언어, 스타 수
- GitHub 링크 (새 탭에서 열기)

### 5. 에러 처리
- ❌ 404: 사용자를 찾을 수 없음
- ❌ 403: API 요청 한도 초과
- ❌ 네트워크 오류: 인터넷 연결 확인
- ❌ 빈 입력: 사용자명 입력 요청

### 6. UI/UX
- 로딩 상태 표시 (⏳ 아이콘)
- 부드러운 애니메이션 효과
- 호버 인터랙션
- 반응형 디자인 (모바일 대응)

---

## 💬 사용한 프롬프트 기록

이 프로젝트는 AI(Cline)와의 대화를 통해 개발되었습니다. 주요 프롬프트:

### 1단계: 프로젝트 기획
```
"GitHub Finder 앱을 만들기 위해 GitHub REST API에서
어떤 데이터를 요청해야 하는지 정리해 주세요."
```

### 2단계: 구조 설계
```
"기본적인 레이아웃 구조"
"Vanilla JavaScript 사용, DOM 구조 정리"
```

### 3단계: 구현
```
"toggle to Act mode"
→ HTML, CSS, JavaScript 파일 생성
```

### 4단계: UI 개선
```
"제안 1을 적용해줘 (흑백 테마)"
```

### 5단계: 문서화
```
"초보자도 이해할 수 있도록 주석을 사용해 줘"
```

### 6단계: README 작성
```
"현재 프로젝트 내용을 바탕으로 README.md를 작성해줘"
```

---

## 🔍 AI 생성 결과 검토 기준

AI가 생성한 코드를 다음 기준으로 검토했습니다:

### ✅ 체크리스트
- [x] **사용자 정보 요청 목적이 정리되었는가**
  - API 엔드포인트, 응답 필드, 사용 목적 명확히 정리됨
  
- [x] **저장소 목록 요청 목적이 정리되었는가**
  - 쿼리 파라미터, 정렬 방식, 응답 구조 상세히 설명됨
  
- [x] **응답 필드 후보가 정리되었는가**
  - 표 형식으로 필드명, 타입, 설명, 사용 위치 정리됨
  
- [x] **실패 상황이 포함되었는가**
  - 404, 403, 500, 네트워크 오류 등 모든 예외 상황 처리됨
  
- [x] **초보자도 이해할 수 있는 주석이 있는가**
  - 파일 상단 개념 설명, 각 함수별 상세 주석, 학습 포인트 정리

### 📊 코드 품질 평가
- **가독성**: ⭐⭐⭐⭐⭐ (5/5) - 명확한 변수명, 함수 분리
- **주석**: ⭐⭐⭐⭐⭐ (5/5) - 초보자를 위한 상세 설명
- **에러 처리**: ⭐⭐⭐⭐⭐ (5/5) - 모든 예외 상황 대응
- **UI/UX**: ⭐⭐⭐⭐⭐ (5/5) - 세련된 디자인, 반응형
- **성능**: ⭐⭐⭐⭐☆ (4/5) - 최적화 가능 (캐싱 등)

---

## 🔧 수정 요청 내용

AI가 생성한 초기 버전에서 다음 사항을 수정 요청했습니다:

### 1. UI 테마 변경
- **Before**: 보라색 그라디언트 컬러 테마
- **After**: 흑백 모노크롬 테마
- **이유**: 전문적이고 세련된 느낌, 가독성 향상

### 2. 주석 보강
- **Before**: 기본적인 함수 설명 주석
- **After**: 초보자를 위한 상세 주석
- **추가 내용**:
  - REST API 기본 개념
  - fetch(), async/await 설명
  - HTTP 상태 코드 의미
  - DOM 조작 방법
  - 동적 요소 생성 과정

### 3. API 문서 보완
- **Before**: 기본 API 정보만 포함
- **After**: 실패 상황, 예외 처리, 흐름도 추가
- **추가 내용**:
  - API 호출 흐름도
  - 에러 처리 시나리오
  - 쿼리 파라미터 상세 설명

---

## 📚 배운 점

### 1. REST API 실전 활용
- GitHub REST API를 실제로 사용하면서 API 호출 방법 학습
- 쿼리 파라미터로 데이터 필터링 및 정렬하는 방법 이해
- API rate limit의 중요성 인식 (시간당 60회 제한)

### 2. 비동기 처리의 중요성
- `async/await`로 깔끔한 비동기 코드 작성
- `try/catch`로 에러를 우아하게 처리
- 로딩 상태 표시로 사용자 경험 향상

### 3. 동적 DOM 생성 기법
- `createElement()`로 HTML 요소를 JavaScript로 생성
- `appendChild()`로 요소를 동적으로 추가
- 데이터 기반 렌더링의 유연성 체험

### 4. 사용자 경험 고려
- 빈 입력 검증으로 불필요한 API 호출 방지
- 명확한 에러 메시지로 사용자 안내
- 로딩 상태 표시로 피드백 제공

### 5. AI와의 협업
- 명확한 프롬프트의 중요성
- AI 생성 코드의 검토 및 수정 필요성
- 최종 결정은 개발자의 몫

---

## 📝 3줄 보고서

```
1. GitHub REST API를 활용하여 사용자 검색 웹 애플리케이션 구현 완료
2. Vanilla JavaScript로 DOM 조작, 비동기 처리, 에러 처리 등 핵심 기술 학습
3. 초보자를 위한 상세 주석 추가로 학습 자료로도 활용 가능한 프로젝트 완성
```

---

## 🚧 향후 개선 사항

### 단기 개선 (1-2주)
- [ ] **테마 토글 기능**: 라이트/다크 모드 전환 버튼 추가
- [ ] **검색 히스토리**: 최근 검색한 사용자 목록 표시
- [ ] **로컬 스토리지**: 검색 기록 및 설정 저장

### 중기 개선 (1개월)
- [ ] **저장소 필터링**: 언어별, 스타 수별 필터 기능
- [ ] **페이지네이션**: 10개 이상 저장소 보기
- [ ] **즐겨찾기**: 자주 보는 사용자 저장 기능
- [ ] **상세 정보**: 계정 생성일, 위치, 회사 정보 추가

### 장기 개선 (3개월)
- [ ] **GitHub OAuth**: 인증으로 API 한도 증가 (60회 → 5,000회)
- [ ] **저장소 상세**: 커밋 히스토리, 이슈, PR 정보
- [ ] **비교 기능**: 여러 사용자 비교
- [ ] **통계 차트**: 언어 분포, 활동 그래프
- [ ] **PWA 변환**: 오프라인 지원, 앱처럼 설치

---

## 🐛 오류 발생 시 디버깅 가이드

웹 개발 중 오류가 발생하면 당황하지 말고 체계적으로 접근하세요!

### 📋 오류 확인 5단계

#### 1️⃣ Console 오류 확인
```
브라우저에서 F12 키를 누르고 Console 탭을 확인하세요.
빨간색 에러 메시지가 표시됩니다.
```

**확인 방법**:
- Windows/Linux: `F12` 또는 `Ctrl + Shift + I`
- macOS: `Cmd + Option + I`
- Console 탭 클릭
- 에러 메시지 전체 복사

**자주 보는 에러**:
- `Uncaught TypeError`: 변수나 함수가 정의되지 않음
- `Uncaught ReferenceError`: 존재하지 않는 변수 참조
- `SyntaxError`: 문법 오류

#### 2️⃣ Network 요청 확인
```
F12 → Network 탭에서 API 요청이 제대로 전송되었는지 확인하세요.
```

**확인 사항**:
- ✅ 요청이 전송되었는가? (목록에 표시되는가?)
- ✅ 상태 코드는? (200: 성공, 404: 없음, 403: 권한 없음)
- ✅ 응답 데이터는? (Response 탭에서 확인)
- ✅ 요청 URL이 올바른가?

**예시**:
```
GET https://api.github.com/users/octocat
Status: 200 OK ✅
Status: 404 Not Found ❌ → 사용자명 오타 확인
Status: 403 Forbidden ❌ → API 한도 초과
```

#### 3️⃣ HTML id와 JS 선택자 비교
```
JavaScript에서 getElementById()로 찾는 id가 HTML에 실제로 있는지 확인하세요.
```

**확인 방법**:
1. `script.js`에서 `getElementById('searchInput')` 찾기
2. `index.html`에서 `<input id="searchInput">` 있는지 확인
3. 철자가 정확히 일치하는지 확인 (대소문자 구분!)

**자주 하는 실수**:
```javascript
// script.js
const searchBtn = document.getElementById('searchButton'); // ❌

// index.html
<button id="searchBtn">검색</button> // ❌ 이름이 다름!
```

#### 4️⃣ API 응답 구조 확인
```
API가 반환하는 데이터 구조가 예상과 같은지 확인하세요.
```

**확인 방법**:
1. Network 탭에서 API 요청 클릭
2. Response 탭에서 JSON 데이터 확인
3. 코드에서 사용하는 필드명과 비교

**예시**:
```javascript
// 코드에서 사용
userData.username // ❌ 잘못된 필드명

// 실제 API 응답
{
  "login": "octocat",  // ✅ 올바른 필드명
  "name": "The Octocat"
}

// 수정
userData.login // ✅
```

#### 5️⃣ 오류 메시지를 AI에게 붙여넣고 원인 분석 요청
```
위 4단계로 해결되지 않으면 AI에게 도움을 요청하세요!
```

---

### 🤖 AI 오류 분석 프롬프트 템플릿

다음 프롬프트를 복사하여 AI(Cline, ChatGPT 등)에게 붙여넣으세요:

```
아래 오류를 초보자 기준으로 분석해 주세요.

1. 오류의 의미
2. 가능한 원인
3. 확인할 파일
4. 수정 방법
5. 다시 테스트할 방법

오류 메시지:
[여기에 Console 또는 Network 탭의 오류 메시지를 붙여넣으세요]

관련 코드:
[오류가 발생한 부분의 코드를 붙여넣으세요]
```

---

### 🔧 자주 발생하는 오류 및 해결 방법

#### 1. `Uncaught TypeError: Cannot read property 'textContent' of null`

**의미**: JavaScript가 HTML 요소를 찾지 못함

**원인**:
- HTML에 해당 id가 없음
- 철자 오류 (대소문자 구분!)
- `<script>` 태그가 HTML보다 먼저 실행됨

**해결 방법**:
```javascript
// ❌ 잘못된 예
const userName = document.getElementById('username'); // HTML에 없음

// ✅ 올바른 예
const userName = document.getElementById('userName'); // HTML과 일치
```

#### 2. `404 Not Found` (API 요청)

**의미**: 요청한 리소스를 찾을 수 없음

**원인**:
- 사용자명 오타
- API URL 오류
- 존재하지 않는 사용자

**해결 방법**:
```javascript
// 404 에러 처리 추가
if (response.status === 404) {
  showError('사용자를 찾을 수 없습니다.');
}
```

#### 3. `403 Forbidden` (API Rate Limit)

**의미**: API 요청 한도 초과

**원인**:
- 시간당 60회 제한 초과
- 인증 없이 너무 많은 요청

**해결 방법**:
- 1시간 기다리기
- GitHub Personal Access Token 사용 (한도 5,000회)

#### 4. `CORS Error`

**의미**: 브라우저가 다른 도메인의 리소스 접근을 차단

**원인**:
- 로컬 파일(`file://`)에서 API 호출
- 서버 설정 문제

**해결 방법**:
- Live Server 확장 프로그램 사용
- `http://localhost`에서 실행

#### 5. `Uncaught ReferenceError: fetch is not defined`

**의미**: fetch 함수를 사용할 수 없음

**원인**:
- 오래된 브라우저 사용
- Node.js 환경에서 실행

**해결 방법**:
- 최신 브라우저 사용 (Chrome, Firefox, Edge)
- 브라우저에서 실행 (Node.js 아님)

---

### 🛠️ 브라우저 개발자 도구 사용법

#### Console 탭
```
용도: JavaScript 에러 확인, 변수 값 출력
단축키: F12 → Console
```

**활용 팁**:
```javascript
// 변수 값 확인
console.log(userData);

// 함수 실행 테스트
console.log(typeof userData.login); // "string"

// 에러 추적
console.error('에러 발생:', error);
```

#### Network 탭
```
용도: API 요청/응답 확인
단축키: F12 → Network
```

**활용 팁**:
1. Network 탭 열기
2. 페이지 새로고침 (F5)
3. 검색 실행
4. `users` 또는 `repos` 요청 클릭
5. Response 탭에서 JSON 확인

#### Elements 탭
```
용도: HTML 구조 확인, CSS 디버깅
단축키: F12 → Elements
```

**활용 팁**:
- 요소 검사 (Ctrl + Shift + C)
- HTML id 확인
- CSS 스타일 실시간 수정

---

### 💡 디버깅 팁

1. **한 번에 하나씩 수정하기**
   - 여러 곳을 동시에 수정하면 원인 파악이 어려움
   - 하나씩 수정하고 테스트

2. **console.log() 적극 활용**
   ```javascript
   console.log('1. 함수 시작');
   console.log('2. username:', username);
   console.log('3. API 응답:', userData);
   ```

3. **주석으로 코드 비활성화**
   ```javascript
   // renderProfile(userData); // 임시로 비활성화
   console.log('userData:', userData); // 데이터 확인
   ```

4. **브라우저 캐시 삭제**
   - `Ctrl + Shift + Delete` → 캐시 삭제
   - 또는 `Ctrl + F5` (강력 새로고침)

5. **코드 백업**
   - 수정 전 파일 복사 (`script.js` → `script_backup.js`)
   - Git 사용 권장

---

## 📂 프로젝트 구조

```
github-finder/
├── index.html              # 메인 HTML 파일
├── style.css               # 스타일시트 (흑백 테마)
├── script.js               # JavaScript 로직 (상세 주석 포함)
├── GITHUB_API_GUIDE.md     # GitHub API 정리 문서
└── README.md               # 프로젝트 문서 (현재 파일)
```

---

## 📖 참고 자료

### 공식 문서
- [GitHub REST API 공식 문서](https://docs.github.com/en/rest)
- [Users API](https://docs.github.com/en/rest/users/users)
- [Repositories API](https://docs.github.com/en/rest/repos/repos)
- [Rate Limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)

### 학습 자료
- [MDN Web Docs - fetch API](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)
- [MDN Web Docs - async/await](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN Web Docs - DOM 조작](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model)

---

## 🤝 기여 방법

이 프로젝트에 기여하고 싶으시다면:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자유롭게 사용, 수정, 배포할 수 있습니다.

---

## 👨‍💻 개발자

**프로젝트 개발**: AI(Cline) + 개발자 협업  
**개발 기간**: 2026년 5월 14일  
**개발 환경**: Visual Studio Code + Cline Extension

---

## 💡 마지막 한마디

> **"Even if AI writes the code, the final decision is made by the developer."**

AI는 코드를 빠르게 생성할 수 있지만, 다음은 개발자가 해야 합니다:
- ✅ 요구사항 정의 및 명확한 프롬프트 작성
- ✅ 생성된 코드의 품질 검토
- ✅ 버그 및 보안 취약점 확인
- ✅ 사용자 경험 개선
- ✅ 코드 최적화 및 리팩토링
- ✅ 문서화 및 유지보수

**AI는 도구일 뿐, 최종 책임은 개발자에게 있습니다.** 🚀

---

## 🙏 감사의 말

이 프로젝트는 GitHub REST API와 Cline AI의 도움으로 완성되었습니다.  
학습 과정에서 많은 것을 배울 수 있었고, 앞으로도 계속 개선해 나갈 예정입니다.

**Happy Coding! 🎉**
