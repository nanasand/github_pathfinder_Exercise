# VanillaSheet (바닐라 스프레드시트)

> **"AI may write the code, but the final call is the developer's."**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📋 목차
1. [프로젝트 소개](#-프로젝트-소개)
2. [학습 목표](#-학습-목표)
3. [기술 스택](#-기술-스택)
4. [실행 방법](#-실행-방법)
5. [주요 기능](#-주요-기능)
6. [사용한 프롬프트 기록](#-사용한-프롬프트-기록)
7. [AI 생성 결과 검토 기준](#-ai-생성-결과-검토-기준)
8. [수정 요청 내용](#-수정-요청-내용)
9. [배운 점](#-배운-점)
10. [3줄 보고서](#-3줄-보고서)
11. [향후 개선 사항](#-향후-개선-사항)

---

## 🎯 프로젝트 소개

**VanillaSheet**는 외부 라이브러리 없이 순수 JavaScript(Vanilla JS)만으로 구현한 웹 기반 스프레드시트 애플리케이션입니다.

### 프로젝트 개요
- **목적**: 브라우저에서 간단한 데이터 입력 및 관리, CSV 파일로 내보내기
- **특징**: 
  - 🚫 외부 라이브러리 없음 (No jQuery, No React, No Vue)
  - 💾 새로고침 후에도 데이터 유지 (localStorage)
  - 📥 엑셀/구글 시트 호환 CSV 내보내기
  - 🧪 자동 테스트 포함

### 실습 환경
- **브라우저**: Chrome, Firefox, Safari, Edge (최신 버전)
- **개발 도구**: Visual Studio Code
- **버전 관리**: Git/GitHub

---

## 🎓 학습 목표

이 프로젝트를 통해 다음을 학습할 수 있습니다:

### 1. DOM 조작
- 동적 HTML 생성 (Template Literals)
- 요소 선택 및 조작 (querySelector, classList)
- data-* 속성 활용

### 2. 이벤트 처리
- 이벤트 위임 (Event Delegation) 패턴
- click, input 이벤트 처리
- 이벤트 버블링 활용

### 3. 데이터 구조
- 2차원 배열 (data[row][col])
- JSON 직렬화/역직렬화

### 4. 브라우저 API
- **localStorage**: 데이터 영속성
- **Blob API**: 파일 생성
- **URL API**: 다운로드 링크 생성

### 5. 파일 처리
- CSV 형식 생성
- UTF-8 BOM 처리 (한글 깨짐 방지)
- 이스케이프 처리 (쉼표, 따옴표)

---

## 🛠️ 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업, contenteditable
- **CSS3**: Flexbox, Sticky Positioning, Transitions
- **JavaScript (ES6+)**: 
  - const/let, Arrow Functions
  - Template Literals
  - Array Methods (map, filter, forEach)
  - Destructuring

### 브라우저 API
- **localStorage**: 데이터 저장/불러오기
- **Blob API**: CSV 파일 생성
- **URL.createObjectURL()**: 다운로드 링크
- **JSON**: 데이터 직렬화

### 개발 도구
- Visual Studio Code
- Chrome DevTools (F12)
- Git/GitHub

---

## 🚀 실행 방법

### 1. 기본 실행
```bash
# 프로젝트 클론
git clone https://github.com/nanasand/github_pathfinder_Exercise.git
cd "과제4(20260521)"

# 브라우저에서 열기 (Windows)
start index.html

# 브라우저에서 열기 (Mac)
open index.html

# 브라우저에서 열기 (Linux)
xdg-open index.html
```

### 2. 자동 테스트 실행
```bash
# 테스트 페이지 열기
start test.html
```

### 3. 파일 구조
```
과제4(20260521)/
├── index.html                    # 메인 페이지
├── style.css                     # 스타일시트
├── script.js                     # JavaScript 로직
├── test.html                     # 자동 테스트 페이지
├── project-specification.md      # PRD/SRS/TRD 문서
├── implementation-guide.md       # 구현 가이드
└── README.md                     # 이 파일
```

---

## ✨ 주요 기능

### 1. 그리드 렌더링
- **10×10 편집 가능한 테이블**
- 행 번호 (1, 2, 3, ...)
- 열 알파벳 (A, B, C, ...)
- contenteditable로 직접 편집

### 2. 셀 선택 및 하이라이트
- 셀 클릭 시 좌표 감지
- 해당 행/열 헤더 하늘색(#87CEEB) 하이라이트
- 이벤트 위임 패턴으로 성능 최적화

### 3. 데이터 동기화
- 셀 입력 시 실시간 data 배열 업데이트
- 2차원 배열 구조: `data[row][col]`

### 4. CSV 내보내기
- 📥 "CSV로 내보내기" 버튼
- 쉼표(,) 구분자
- UTF-8 BOM으로 한글 깨짐 방지
- 타임스탬프 파일명 (예: `spreadsheet_20260521_2020.csv`)

### 5. 데이터 영속성 (localStorage)
- ✅ **자동 저장**: 셀 값 변경 시 자동 저장
- ✅ **자동 불러오기**: 페이지 로드 시 자동 복원
- 🗑️ **데이터 초기화**: 모든 데이터 삭제 버튼

### 6. 자동 테스트
- ✅ 하이라이트 검증
- ✅ 데이터 입력 검증
- ✅ CSV 생성 검증
- ✅ 경계값 확인 (A1, J10 등)

---

## 💬 사용한 프롬프트 기록

### 1단계: 프로젝트 기획
```
PRD (기능 목적): 브라우저 내에서 간단한 수치 입력이 가능한 표를 제공하고, 
데이터를 CSV 파일로 추출하여 엑셀/구글 시트에서 즉시 활용할 수 있게 한다.

SRS (행동 규칙):
- 사용자가 셀을 클릭하면 해당 셀의 row, col을 감지한다.
- 선택된 셀의 행 헤더와 열 헤더에 active 클래스를 추가하여 하늘색 스타일을 적용한다.
- 데이터는 data[row][col] 형태의 2차원 배열로 메모리상에 유지한다.
- Export 버튼 클릭 시, 2차원 배열을 순회하며 쉼표(,)로 구분된 문자열을 생성하고 
  Blob 객체를 이용해 .csv 파일로 다운로드한다.

TRD (기술 스택):
- HTML: <table> 태그 혹은 div grid 시스템.
- CSS: :hover, .active 클래스를 활용한 상태 표시.
- JS: DOM 조작 및 데이터 동기화 로직.

위 내용을 md파일로 만들어 줘
```

### 2단계: 코드 구현 요청
```
너는 10년 차 웹 프론트엔드 개발자이자, 코드의 가독성을 최우선으로 생각하는 멘토야.
사용자가 정의한 웹 스프레드시트의 핵심 기능(그리드 렌더링, 하이라이트, CSV Export)을 
바닐라 JS로 구현해 줘.

HTML/CSS/JS(바닐라)만 사용하며, 외부 라이브러리는 일절 금지한다.

작업 단계:
Step 1: HTML/CSS 구조 설계 및 그리드 렌더링 로직.
Step 2: 셀 클릭 시 좌표 감지 및 헤더 하이라이트 로직.
Step 3: 데이터 수집 및 CSV 다운로드 기능 구현.

모든 코드에는 초보자가 이해할 수 있도록 한글 주석을 상세히 작성한다.
```

### 3단계: 파일 분리
```
html파일 하나로만 만든거야?
→ 3개 파일로 분리 (index.html, style.css, script.js)
```

### 4단계: 자동 테스트
```
자동테스트 코드를 작성해서 테스트 가능한 부분에 대해 테스트 해 주세요

검증 항목:
1. 하이라이트 검증: 셀 클릭 시 행/열 헤더가 하늘색으로 변경되는가?
2. 데이터 입력 검증: 셀에 값 입력 시 data 배열에 동기화되는가?
3. CSV 호환성 검증: 쉼표로 구분된 데이터가 정상적으로 생성되는가?
4. 경계값 확인: 모서리 셀(A1, J10 등)에서 정상 작동하는가?
```

### 5단계: 데이터 영속성
```
사용자가 입력한 데이터를 새로고침해도 유지하려면, 브라우저의 어떤 기능을 사용해야 할까?
→ localStorage 구현
```

### 6단계: README 작성
```
현재 프로젝트 내용을 바탕으로 README.md를 작성해줘.
```

---

## 🔍 AI 생성 결과 검토 기준

### 자동 테스트 (test.html)

#### 1. 하이라이트 검증 ✅
- **테스트 내용**: B3 셀 클릭 시 행 3과 열 B 헤더가 하늘색으로 변경
- **검증 방법**: 
  - `classList.contains('active')` 확인
  - `getComputedStyle().backgroundColor` 확인
  - RGB(135, 206, 235) = #87CEEB 검증

#### 2. 데이터 입력 검증 ✅
- **테스트 내용**: 4개 셀에 값 입력 후 data 배열 동기화 확인
- **검증 방법**:
  - `cell.textContent` 설정
  - `input` 이벤트 트리거
  - `data[row][col]` 값 비교

#### 3. CSV 생성 검증 ✅
- **테스트 내용**: CSV 형식 올바른지 확인
- **검증 방법**:
  - 쉼표 구분자 존재 확인
  - 빈 셀이 빈 문자열로 처리되는지 확인
  - 총 10행 생성 확인

#### 4. 경계값 확인 ✅
- **테스트 내용**: A1, J1, A10, J10 모서리 셀 정상 작동
- **검증 방법**:
  - 각 모서리 셀 클릭
  - 행/열 헤더 active 클래스 확인

### 수동 검증 항목

#### 1. 사용자 경험
- [ ] 셀 클릭 시 즉각적인 반응
- [ ] 호버 효과 부드러움
- [ ] 버튼 클릭 시 명확한 피드백

#### 2. 데이터 영속성
- [ ] 새로고침 후 데이터 유지
- [ ] 브라우저 종료 후 재실행 시 데이터 유지
- [ ] 초기화 버튼으로 데이터 삭제 가능

#### 3. CSV 호환성
- [ ] 엑셀에서 정상 열림
- [ ] 구글 시트에서 정상 열림
- [ ] 한글 깨짐 없음

---

## 🔧 수정 요청 내용

### 1차 수정: 파일 분리
**요청 사유**: 유지보수성 향상, 관심사 분리
- ✅ index.html (26줄) - HTML 구조만
- ✅ style.css (133줄) - CSS 스타일만
- ✅ script.js (293줄) - JavaScript 로직만

### 2차 수정: localStorage 추가
**요청 사유**: 새로고침 후 데이터 유지
- ✅ `saveToLocalStorage()` 함수 추가
- ✅ `loadFromLocalStorage()` 함수 추가
- ✅ `clearLocalStorage()` 함수 추가
- ✅ 자동 저장: 셀 input 이벤트 시
- ✅ 자동 불러오기: 페이지 로드 시

### 3차 수정: UI 개선
**요청 사유**: 사용자 편의성
- ✅ "데이터 초기화" 버튼 추가
- ✅ 버튼 스타일링 (녹색/빨간색)
- ✅ 확인 대화상자 추가

### 4차 수정: 테스트 자동화
**요청 사유**: 품질 보증
- ✅ test.html 생성
- ✅ 4가지 자동 테스트 구현
- ✅ 시각적 결과 표시

---

## 📚 배운 점

### 1. 이벤트 위임 (Event Delegation)
**문제**: 100개 셀에 각각 이벤트 리스너를 달면 메모리 낭비
**해결**: 부모 요소(table)에 하나의 리스너만 등록
```javascript
table.addEventListener('click', (event) => {
    if (event.target.tagName === 'TD') {
        // 셀 클릭 처리
    }
});
```
**장점**: 메모리 효율, 동적 요소에도 자동 적용

### 2. 데이터 영속성 (localStorage)
**문제**: 새로고침 시 데이터 손실
**해결**: localStorage에 JSON 형태로 저장
```javascript
// 저장
localStorage.setItem('key', JSON.stringify(data));

// 불러오기
const data = JSON.parse(localStorage.getItem('key'));
```
**주의**: 문자열만 저장 가능, 5-10MB 제한

### 3. CSV 이스케이프 처리
**문제**: 셀 값에 쉼표가 있으면 CSV 형식 깨짐
**해결**: 따옴표로 감싸고 이스케이프
```javascript
if (cellValue.includes(',') || cellValue.includes('"')) {
    return `"${cellValue.replace(/"/g, '""')}"`;
}
```

### 4. UTF-8 BOM
**문제**: 엑셀에서 한글 깨짐
**해결**: BOM(Byte Order Mark) 추가
```javascript
const BOM = '\uFEFF';
const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
```

### 5. 함수형 프로그래밍
**활용**: Array.map() 체인으로 CSV 생성
```javascript
const csvContent = data.map(row => 
    row.map(cell => /* 처리 */).join(',')
).join('\n');
```
**장점**: 가독성, 간결성, 불변성

### 6. data-* 속성
**활용**: HTML에 메타데이터 저장
```html
<td data-row="0" data-col="1"></td>
```
```javascript
const row = cell.dataset.row; // "0"
```

### 7. contenteditable
**활용**: input 요소 없이 직접 편집
```html
<td contenteditable="true">편집 가능</td>
```
**장점**: 간단한 구현, 자연스러운 UX

---

## 📝 3줄 보고서

1. **바닐라 JavaScript만으로 엑셀과 유사한 웹 스프레드시트를 구현**하여, 외부 라이브러리 없이도 충분히 실용적인 애플리케이션을 만들 수 있음을 증명했습니다.

2. **이벤트 위임, localStorage, Blob API 등 브라우저 표준 API를 활용**하여 성능과 사용자 경험을 모두 만족시키는 데이터 영속성 및 파일 내보내기 기능을 구현했습니다.

3. **자동 테스트 시스템을 구축**하여 AI가 생성한 코드의 품질을 객관적으로 검증하고, "AI may write the code, but the final call is the developer's" 원칙을 실천했습니다.

---

## 🚀 향후 개선 사항

### 단기 개선 (1-2주)
- [ ] **실행 취소/다시 실행** (Undo/Redo)
  - Command 패턴 활용
  - Ctrl+Z, Ctrl+Y 단축키

- [ ] **셀 범위 선택**
  - 드래그로 여러 셀 선택
  - Shift+클릭으로 범위 선택

- [ ] **복사/붙여넣기**
  - Ctrl+C, Ctrl+V
  - Clipboard API 활용

### 중기 개선 (1개월)
- [ ] **수식 계산**
  - SUM, AVERAGE, COUNT 등
  - 셀 참조 (=A1+B1)

- [ ] **셀 서식**
  - 글꼴, 색상, 정렬
  - 숫자 포맷 (통화, 퍼센트)

- [ ] **행/열 추가/삭제**
  - 우클릭 컨텍스트 메뉴
  - 동적 그리드 크기 조절

### 장기 개선 (3개월)
- [ ] **차트 생성**
  - Canvas API 활용
  - 막대, 선, 원 그래프

- [ ] **다중 시트**
  - 탭으로 시트 전환
  - 시트 간 데이터 참조

- [ ] **협업 기능**
  - WebSocket으로 실시간 동기화
  - 여러 사용자 동시 편집

- [ ] **CSV 가져오기**
  - File API로 CSV 파일 읽기
  - 데이터 파싱 및 표시

- [ ] **모바일 최적화**
  - 터치 이벤트 지원
  - 반응형 디자인

### 기술 부채 해결
- [ ] **TypeScript 마이그레이션**
  - 타입 안정성 향상
  - IDE 자동완성 개선

- [ ] **단위 테스트 확대**
  - Jest 도입
  - 커버리지 80% 이상

- [ ] **성능 최적화**
  - Virtual Scrolling (대용량 데이터)
  - Web Worker (백그라운드 계산)

---

## 📄 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.

---

## 👨‍💻 개발자

**nanasand**
- GitHub: [@nanasand](https://github.com/nanasand)
- Repository: [github_pathfinder_Exercise](https://github.com/nanasand/github_pathfinder_Exercise)

---

## 🙏 감사의 말

이 프로젝트는 AI(Claude)와의 협업을 통해 완성되었습니다. AI가 코드를 작성했지만, 최종 결정은 항상 개발자의 몫이었습니다.

> **"AI may write the code, but the final call is the developer's."**

AI는 도구일 뿐, 프로젝트의 방향과 품질은 개발자가 결정합니다. 이 프로젝트를 통해 AI를 효과적으로 활용하는 방법을 배웠고, 동시에 개발자로서의 판단력과 책임감의 중요성을 깨달았습니다.

---

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!**
