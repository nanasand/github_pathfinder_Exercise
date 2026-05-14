# 절차적 vs OOP 방식 비교

## 📋 개요

이 문서는 같은 GitHub Finder 앱을 **절차적 방식**과 **OOP 방식** 두 가지로 구현한 것을 비교합니다.

---

## 🎯 실행 방법

### 절차적 방식
```bash
# Windows
start index-procedural.html

# macOS/Linux
open index-procedural.html
```

### OOP 방식
```bash
# Windows
start index-oop.html

# macOS/Linux
open index-oop.html
```

---

## 📊 비교표

| 항목 | 절차적 방식 | OOP 방식 |
|------|------------|----------|
| **파일** | `script.js` | `script-oop.js` |
| **코드 구조** | 함수 중심 | 클래스 중심 |
| **전역 변수** | 많음 (DOM 요소들) | 없음 (클래스 속성) |
| **코드 길이** | 약 260줄 | 약 450줄 |
| **학습 난이도** | 쉬움 ⭐⭐⭐⭐⭐ | 어려움 ⭐⭐⭐ |
| **코드 재사용** | 보통 ⭐⭐⭐ | 좋음 ⭐⭐⭐⭐⭐ |
| **유지보수** | 보통 ⭐⭐⭐ | 좋음 ⭐⭐⭐⭐⭐ |
| **작은 프로젝트** | 적합 ✅ | 과도함 ❌ |
| **큰 프로젝트** | 복잡함 ❌ | 적합 ✅ |
| **초보자** | 추천 ✅ | 비추천 ❌ |
| **팀 협업** | 어려움 ❌ | 좋음 ✅ |

---

## 🔍 코드 구조 비교

### 1. 변수 선택 및 관리

#### 절차적 방식
```javascript
// 전역 스코프에 변수 선언
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const errorMessage = document.getElementById('errorMessage');
// ... 더 많은 전역 변수
```

**특징:**
- ✅ 간단하고 직관적
- ❌ 전역 스코프 오염
- ❌ 변수명 충돌 가능성

#### OOP 방식
```javascript
// 클래스 내부에 속성으로 관리
class UIRenderer {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.errorMessage = document.getElementById('errorMessage');
    }
}
```

**특징:**
- ✅ 캡슐화 (클래스 내부에 숨김)
- ✅ 전역 스코프 깨끗
- ✅ 네임스페이스 제공

---

### 2. 함수 vs 메서드

#### 절차적 방식
```javascript
// 독립적인 함수
async function fetchUserProfile(username) {
    const url = `https://api.github.com/users/${username}`;
    const response = await fetch(url);
    
    if (response.status === 404) {
        throw { status: 404, message: '사용자를 찾을 수 없습니다.' };
    }
    
    return await response.json();
}

// 함수 호출
const userData = await fetchUserProfile('octocat');
```

**특징:**
- ✅ 간단하고 직접적
- ❌ 관련 함수들이 흩어져 있음
- ❌ 중복 코드 발생 가능

#### OOP 방식
```javascript
// 클래스 메서드
class GitHubAPI {
    constructor() {
        this.baseURL = 'https://api.github.com';
    }
    
    async getUserProfile(username) {
        const url = `${this.baseURL}/users/${username}`;
        const response = await fetch(url);
        
        this.checkResponse(response);  // 메서드 재사용
        
        return await response.json();
    }
    
    checkResponse(response) {
        if (response.status === 404) {
            throw { status: 404, message: '사용자를 찾을 수 없습니다.' };
        }
        // ... 기타 에러 체크
    }
}

// 메서드 호출
const api = new GitHubAPI();
const userData = await api.getUserProfile('octocat');
```

**특징:**
- ✅ 관련 기능을 클래스로 묶음
- ✅ 메서드 재사용 (checkResponse)
- ✅ 코드 중복 감소

---

### 3. 이벤트 처리

#### 절차적 방식
```javascript
// 이벤트 리스너 등록
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// 핸들러 함수
async function handleSearch() {
    const username = searchInput.value.trim();
    // ...
}
```

**특징:**
- ✅ 간단하고 명확
- ❌ 함수와 변수가 분리되어 있음

#### OOP 방식
```javascript
class GitHubFinder {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.initEventListeners();
    }
    
    initEventListeners() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
    }
    
    async handleSearch() {
        const username = this.searchInput.value.trim();
        // ...
    }
}
```

**특징:**
- ✅ 모든 것이 하나의 클래스에 캡슐화
- ✅ this로 속성과 메서드 접근
- ✅ 초기화 로직 명확 (constructor)

---

### 4. 책임 분리 (Separation of Concerns)

#### 절차적 방식
```javascript
// 모든 기능이 한 파일에 섞여 있음
async function fetchUserProfile(username) { /* API 호출 */ }
function renderProfile(userData) { /* UI 렌더링 */ }
function showError(message) { /* 에러 표시 */ }
```

**특징:**
- ❌ API, UI, 에러 처리가 섞여 있음
- ❌ 기능별 구분이 명확하지 않음

#### OOP 방식
```javascript
// 기능별로 클래스 분리
class GitHubAPI {
    // API 호출만 담당
    async getUserProfile(username) { /* ... */ }
    async getUserRepos(username) { /* ... */ }
}

class UIRenderer {
    // UI 렌더링만 담당
    renderProfile(userData) { /* ... */ }
    renderStats(userData) { /* ... */ }
}

class GitHubFinder {
    // 전체 앱 로직 조율
    constructor() {
        this.api = new GitHubAPI();
        this.ui = new UIRenderer();
    }
}
```

**특징:**
- ✅ 각 클래스가 하나의 책임만 가짐
- ✅ 코드 수정 시 영향 범위 최소화
- ✅ 테스트 및 유지보수 용이

---

## 💡 실전 예시 비교

### 예시 1: API URL 변경

#### 절차적 방식
```javascript
// 모든 함수에서 URL을 직접 작성
async function fetchUserProfile(username) {
    const url = `https://api.github.com/users/${username}`;  // 변경 필요
    // ...
}

async function fetchUserRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;  // 변경 필요
    // ...
}
```

**문제점:**
- ❌ 여러 곳을 수정해야 함
- ❌ 실수로 놓칠 가능성

#### OOP 방식
```javascript
class GitHubAPI {
    constructor() {
        this.baseURL = 'https://api.github.com';  // 한 곳만 변경!
    }
    
    async getUserProfile(username) {
        const url = `${this.baseURL}/users/${username}`;
        // ...
    }
    
    async getUserRepos(username) {
        const url = `${this.baseURL}/users/${username}/repos`;
        // ...
    }
}
```

**장점:**
- ✅ 한 곳만 수정하면 됨
- ✅ 실수 가능성 감소

---

### 예시 2: 새로운 기능 추가 (로딩 스피너)

#### 절차적 방식
```javascript
// 여러 함수를 수정해야 함
async function handleSearch() {
    showLoadingSpinner();  // 추가
    try {
        const userData = await fetchUserProfile(username);
        hideLoadingSpinner();  // 추가
        renderProfile(userData);
    } catch (error) {
        hideLoadingSpinner();  // 추가
        handleError(error);
    }
}
```

**문제점:**
- ❌ 여러 곳에 코드 추가
- ❌ finally 블록 사용 어려움

#### OOP 방식
```javascript
class GitHubFinder {
    async handleSearch() {
        this.ui.showLoadingSpinner();  // UI 클래스에 메서드 추가
        try {
            const userData = await this.api.getUserProfile(username);
            this.ui.renderProfile(userData);
        } catch (error) {
            this.handleError(error);
        } finally {
            this.ui.hideLoadingSpinner();  // 한 곳에서 처리
        }
    }
}

class UIRenderer {
    showLoadingSpinner() { /* ... */ }
    hideLoadingSpinner() { /* ... */ }
}
```

**장점:**
- ✅ UI 관련 기능은 UIRenderer에만 추가
- ✅ finally 블록으로 깔끔하게 처리

---

## 🎓 학습 포인트

### 절차적 방식을 먼저 배워야 하는 이유

1. **기초 개념 이해**
   - 변수, 함수, 조건문, 반복문
   - 프로그래밍의 기본 흐름 이해

2. **빠른 결과 확인**
   - 코드 작성 → 즉시 실행
   - 학습 동기 부여

3. **OOP 이해의 기반**
   - 절차적 방식을 알아야 OOP의 장점 이해 가능
   - "왜 OOP가 필요한가?"를 체감

### OOP를 배워야 하는 이유

1. **실무 필수 기술**
   - 대부분의 프레임워크가 OOP 기반
   - React, Vue, Angular 모두 클래스/컴포넌트 사용

2. **대규모 프로젝트 대비**
   - 코드가 길어질수록 OOP의 장점 부각
   - 팀 협업 시 필수

3. **디자인 패턴 학습**
   - OOP를 알아야 디자인 패턴 이해 가능
   - Singleton, Factory, Observer 등

---

## 📈 언제 어떤 방식을 사용할까?

### 절차적 방식 사용 시기

✅ **작은 프로젝트**
- 단일 페이지 앱
- 간단한 유틸리티 스크립트
- 프로토타입 제작

✅ **빠른 개발**
- 시간이 촉박한 경우
- 일회성 스크립트

✅ **초보자 학습**
- 프로그래밍 입문
- 기본 개념 학습

### OOP 방식 사용 시기

✅ **대규모 프로젝트**
- 여러 페이지가 있는 웹 앱
- 복잡한 비즈니스 로직
- 장기 유지보수 필요

✅ **팀 협업**
- 여러 개발자가 함께 작업
- 코드 리뷰 및 품질 관리

✅ **코드 재사용**
- 비슷한 기능을 여러 곳에서 사용
- 라이브러리/프레임워크 개발

---

## 🔄 리팩토링 과정

### 절차적 → OOP 변환 단계

#### 1단계: 관련 함수 그룹화
```javascript
// Before: 흩어진 함수들
function fetchUserProfile() { }
function fetchUserRepos() { }
function renderProfile() { }
function renderStats() { }

// After: 기능별로 그룹화
class GitHubAPI {
    fetchUserProfile() { }
    fetchUserRepos() { }
}

class UIRenderer {
    renderProfile() { }
    renderStats() { }
}
```

#### 2단계: 전역 변수 → 클래스 속성
```javascript
// Before: 전역 변수
const searchInput = document.getElementById('searchInput');

// After: 클래스 속성
class GitHubFinder {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
    }
}
```

#### 3단계: 함수 → 메서드
```javascript
// Before: 독립 함수
function handleSearch() { }

// After: 클래스 메서드
class GitHubFinder {
    handleSearch() { }
}
```

---

## 💻 실습 과제

### 과제 1: 두 버전 비교하기
1. `index-procedural.html` 열기
2. `index-oop.html` 열기
3. 같은 사용자 검색 (예: `octocat`)
4. 기능이 동일한지 확인

### 과제 2: 코드 읽기
1. `script.js` 읽기 (절차적)
2. `script-oop.js` 읽기 (OOP)
3. 같은 기능이 어떻게 다르게 구현되었는지 비교

### 과제 3: 새 기능 추가해보기
**목표**: 사용자 프로필 링크 추가

#### 절차적 방식
```javascript
// script.js에 추가
function renderProfile(userData) {
    // ... 기존 코드
    
    // 프로필 링크 추가
    const profileLink = document.createElement('a');
    profileLink.href = userData.html_url;
    profileLink.textContent = 'GitHub 프로필 보기';
    // ...
}
```

#### OOP 방식
```javascript
// script-oop.js의 UIRenderer 클래스에 추가
class UIRenderer {
    renderProfile(userData) {
        // ... 기존 코드
        
        // 프로필 링크 추가
        const profileLink = document.createElement('a');
        profileLink.href = userData.html_url;
        profileLink.textContent = 'GitHub 프로필 보기';
        // ...
    }
}
```

**질문**: 어느 방식이 더 수정하기 쉬웠나요?

---

## 📚 추가 학습 자료

### OOP 핵심 개념

1. **캡슐화 (Encapsulation)**
   - 데이터와 기능을 하나로 묶음
   - 외부에서 직접 접근 제한

2. **상속 (Inheritance)**
   - 기존 클래스의 기능을 물려받음
   - 코드 재사용

3. **다형성 (Polymorphism)**
   - 같은 메서드가 다르게 동작
   - 오버라이딩

4. **추상화 (Abstraction)**
   - 복잡한 구현을 숨김
   - 인터페이스만 노출

### 추천 학습 순서

1. ✅ 절차적 프로그래밍 마스터
2. ✅ 클래스와 객체 이해
3. ✅ this 키워드 이해
4. ✅ 생성자와 메서드
5. ✅ 캡슐화 연습
6. ✅ 상속과 다형성
7. ✅ 디자인 패턴

---

## 🎯 결론

### 절차적 방식
- ✅ 초보자에게 적합
- ✅ 작은 프로젝트에 효율적
- ✅ 빠른 프로토타이핑
- ❌ 대규모 프로젝트에 부적합

### OOP 방식
- ✅ 대규모 프로젝트에 적합
- ✅ 유지보수 용이
- ✅ 팀 협업에 유리
- ❌ 초보자에게 어려움
- ❌ 작은 프로젝트에 과도함

### 최종 조언

> **"도구는 상황에 맞게 선택하세요!"**

- 작은 프로젝트: 절차적 방식
- 큰 프로젝트: OOP 방식
- 학습 단계: 절차적 → OOP 순서로

**두 방식 모두 장단점이 있으며, 상황에 맞게 선택하는 것이 중요합니다!** 🚀

---

## 📞 질문이 있다면?

이 비교 문서를 통해 두 방식의 차이를 이해하셨나요?

더 궁금한 점이 있다면:
1. 코드를 직접 실행해보세요
2. 주석을 꼼꼼히 읽어보세요
3. 작은 수정을 시도해보세요
4. AI에게 질문하세요!

**Happy Coding! 🎉**
