# 웹 스프레드시트 구현 가이드

## 📋 목차
1. [Step 1: HTML/CSS 구조 설계 및 그리드 렌더링](#step-1-htmlcss-구조-설계-및-그리드-렌더링)
2. [Step 2: 셀 클릭 시 좌표 감지 및 헤더 하이라이트](#step-2-셀-클릭-시-좌표-감지-및-헤더-하이라이트)
3. [Step 3: 데이터 수집 및 CSV 다운로드](#step-3-데이터-수집-및-csv-다운로드)
4. [전체 통합 코드](#전체-통합-코드)

---

## Step 1: HTML/CSS 구조 설계 및 그리드 렌더링

### 🎯 목표
- 10×10 그리드 테이블 생성
- 행/열 헤더 표시
- 편집 가능한 셀 구현

### 💡 핵심 구현 내용

#### 1-1. HTML 구조
```html
<div class="container">
    <h1>📊 웹 스프레드시트</h1>
    <div class="controls">
        <button id="exportBtn">📥 CSV로 내보내기</button>
    </div>
    <div class="table-container">
        <table id="spreadsheet">
            <!-- JavaScript로 동적 생성 -->
        </table>
    </div>
</div>
```

**왜 이렇게 구현했나요?**
- `<table>` 태그를 사용한 이유: 시맨틱하고 접근성이 좋으며, 스프레드시트 구조에 가장 적합
- JavaScript로 동적 생성하는 이유: 그리드 크기를 쉽게 변경할 수 있고, data 속성을 일관되게 추가 가능

#### 1-2. CSS 스타일링
```css
/* 테이블 기본 스타일 */
table {
    border-collapse: collapse;
    width: 100%;
    background-color: white;
}

/* 헤더 셀 스타일 */
th {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    font-weight: bold;
    position: sticky;  /* 스크롤 시 고정 */
}

/* 데이터 셀 스타일 */
td {
    border: 1px solid #ddd;
    padding: 8px;
    min-width: 80px;
    cursor: cell;
}

/* 호버 효과 */
td:hover {
    background-color: #f9f9f9;
}
```

**왜 이렇게 구현했나요?**
- `border-collapse: collapse`: 셀 경계선이 겹치지 않도록 하여 깔끔한 외관
- `position: sticky`: 스크롤 시 헤더가 고정되어 사용성 향상
- `cursor: cell`: 사용자에게 편집 가능한 셀임을 시각적으로 알림

#### 1-3. 그리드 렌더링 로직
```javascript
const ROWS = 10;
const COLS = 10;
let data = [];

// 데이터 배열 초기화
function initializeData() {
    for (let i = 0; i < ROWS; i++) {
        data[i] = [];
        for (let j = 0; j < COLS; j++) {
            data[i][j] = '';
        }
    }
}

// 열 이름 생성 (A, B, C, ...)
function getColumnName(index) {
    let name = '';
    let num = index;
    while (num >= 0) {
        name = String.fromCharCode(65 + (num % 26)) + name;
        num = Math.floor(num / 26) - 1;
    }
    return name;
}

// 테이블 렌더링
function renderTable() {
    const table = document.getElementById('spreadsheet');
    let html = '<thead><tr><th></th>';
    
    // 열 헤더
    for (let col = 0; col < COLS; col++) {
        html += `<th data-col="${col}" class="col-header">${getColumnName(col)}</th>`;
    }
    html += '</tr></thead><tbody>';
    
    // 데이터 행
    for (let row = 0; row < ROWS; row++) {
        html += `<tr><th data-row="${row}" class="row-header">${row + 1}</th>`;
        for (let col = 0; col < COLS; col++) {
            html += `<td contenteditable="true" data-row="${row}" data-col="${col}"></td>`;
        }
        html += '</tr>';
    }
    html += '</tbody>';
    table.innerHTML = html;
}
```

**왜 이렇게 구현했나요?**
- **2차원 배열 사용**: `data[row][col]` 형태로 엑셀과 동일한 구조, 직관적이고 CSV 변환이 쉬움
- **data-* 속성**: 각 셀의 좌표를 HTML에 저장하여 이벤트 처리 시 쉽게 접근
- **contenteditable="true"**: 별도의 input 요소 없이 셀을 직접 편집 가능
- **getColumnName() 함수**: 엑셀처럼 A, B, C... Z, AA, AB... 형식으로 열 이름 생성

---

## Step 2: 셀 클릭 시 좌표 감지 및 헤더 하이라이트

### 🎯 목표
- 셀 클릭 시 행/열 좌표 감지
- 해당 행/열 헤더를 하늘색으로 하이라이트
- 이전 선택 해제

### 💡 핵심 구현 내용

#### 2-1. Active 클래스 스타일
```css
/* 선택된 행/열 헤더 하이라이트 */
th.active {
    background-color: #87CEEB; /* 하늘색 */
    font-weight: bold;
    color: #000;
}

/* 선택된 셀 표시 */
td.selected {
    background-color: #e3f2fd;
    border: 2px solid #2196F3;
}
```

**왜 이렇게 구현했나요?**
- **하늘색(#87CEEB)**: 요구사항에 명시된 색상, 시각적으로 부드럽고 눈에 잘 띔
- **별도의 selected 클래스**: 셀 자체도 하이라이트하여 현재 선택 위치를 명확히 표시

#### 2-2. 하이라이트 로직
```javascript
// 이전 하이라이트 제거
function clearActiveHeaders() {
    document.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
    });
}

function clearSelectedCell() {
    document.querySelectorAll('.selected').forEach(element => {
        element.classList.remove('selected');
    });
}

// 셀 클릭 핸들러
function handleCellClick(row, col, cell) {
    // 1. 이전 하이라이트 제거
    clearActiveHeaders();
    clearSelectedCell();
    
    // 2. 선택된 셀 표시
    cell.classList.add('selected');
    
    // 3. 행 헤더 하이라이트
    const rowHeader = document.querySelector(`th.row-header[data-row="${row}"]`);
    if (rowHeader) {
        rowHeader.classList.add('active');
    }
    
    // 4. 열 헤더 하이라이트
    const colHeader = document.querySelector(`th.col-header[data-col="${col}"]`);
    if (colHeader) {
        colHeader.classList.add('active');
    }
    
    console.log(`셀 선택: 행 ${row + 1}, 열 ${getColumnName(col)}`);
}
```

**왜 이렇게 구현했나요?**
- **querySelectorAll + forEach**: 모든 active 클래스를 한 번에 제거, 간결하고 효율적
- **data 속성 활용**: `data-row`, `data-col`로 정확한 헤더를 찾아 하이라이트
- **null 체크**: 요소가 없을 경우를 대비한 방어적 프로그래밍

#### 2-3. 이벤트 위임 패턴
```javascript
function setupEventListeners() {
    const table = document.getElementById('spreadsheet');
    
    // 클릭 이벤트 (이벤트 위임)
    table.addEventListener('click', (event) => {
        const cell = event.target;
        
        if (cell.tagName === 'TD') {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            handleCellClick(row, col, cell);
        }
    });
}
```

**왜 이렇게 구현했나요?**
- **이벤트 위임**: 100개 셀에 각각 리스너를 달지 않고, 부모(table)에 하나만 등록
- **성능 최적화**: 메모리 사용량 감소, 동적으로 추가되는 셀에도 자동 적용
- **유지보수성**: 이벤트 로직이 한 곳에 집중되어 관리가 쉬움

---

## Step 3: 데이터 수집 및 CSV 다운로드

### 🎯 목표
- 셀 입력 시 2차원 배열에 실시간 동기화
- CSV 형식으로 변환
- 파일 다운로드 기능

### 💡 핵심 구현 내용

#### 3-1. 데이터 동기화
```javascript
// 셀 입력 핸들러
function handleCellInput(row, col, value) {
    data[row][col] = value;
    console.log(`데이터 업데이트: [${row}][${col}] = "${value}"`);
}

// input 이벤트 리스너
table.addEventListener('input', (event) => {
    const cell = event.target;
    
    if (cell.tagName === 'TD') {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const value = cell.textContent;
        handleCellInput(row, col, value);
    }
});
```

**왜 이렇게 구현했나요?**
- **input 이벤트**: 사용자가 타이핑할 때마다 실시간으로 감지
- **textContent 사용**: contenteditable 요소의 텍스트를 가져오는 표준 방법
- **즉시 동기화**: 사용자가 언제든 Export 버튼을 눌러도 최신 데이터 보장

#### 3-2. CSV 변환 및 다운로드
```javascript
function exportToCSV() {
    // 1. CSV 문자열 생성
    const csvContent = data.map(row => {
        return row.map(cell => {
            const cellValue = String(cell || '');
            // 쉼표, 따옴표, 줄바꿈이 있으면 이스케이프 처리
            if (cellValue.includes(',') || cellValue.includes('"') || cellValue.includes('\n')) {
                return `"${cellValue.replace(/"/g, '""')}"`;
            }
            return cellValue;
        }).join(',');
    }).join('\n');
    
    // 2. Blob 생성 (UTF-8 BOM 추가)
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { 
        type: 'text/csv;charset=utf-8;' 
    });
    
    // 3. 다운로드 링크 생성
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // 4. 파일명 설정 (타임스탬프 포함)
    const now = new Date();
    const filename = `spreadsheet_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.display = 'none';
    
    // 5. 다운로드 실행
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 6. 메모리 해제
    URL.revokeObjectURL(url);
    
    alert(`CSV 파일이 다운로드되었습니다!\n파일명: ${filename}`);
}
```

**왜 이렇게 구현했나요?**

1. **map() 체인 사용**
   - 외부 map: 각 행을 처리
   - 내부 map: 각 셀을 처리
   - 함수형 프로그래밍 스타일로 가독성 향상

2. **CSV 이스케이프 처리**
   - 쉼표(,): CSV 구분자이므로 따옴표로 감싸기
   - 따옴표("): 두 개로 변환 ("" → "")
   - 줄바꿈(\n): 따옴표로 감싸서 보존
   - 엑셀/구글 시트에서 정확히 읽을 수 있도록 표준 준수

3. **UTF-8 BOM 추가**
   - `\uFEFF`: Byte Order Mark
   - 한글 깨짐 방지
   - 엑셀에서 UTF-8 파일을 올바르게 인식하도록 함

4. **Blob API 사용**
   - 브라우저 메모리에 파일 객체 생성
   - 서버 없이 클라이언트에서 파일 생성 가능
   - 모던 브라우저 표준 API

5. **가상 링크 방식**
   - `<a>` 태그를 동적으로 생성
   - `download` 속성으로 파일명 지정
   - 프로그래밍 방식으로 클릭 이벤트 트리거
   - 사용 후 DOM에서 제거하여 깔끔하게 정리

6. **타임스탬프 파일명**
   - 중복 방지
   - 언제 다운로드했는지 추적 가능
   - `padStart(2, '0')`로 두 자리 숫자 포맷팅

7. **메모리 관리**
   - `URL.revokeObjectURL()`: 생성된 URL 해제
   - 메모리 누수 방지
   - 브라우저 성능 유지

---

## 전체 통합 코드

### 📁 파일 구조
```
index.html          (HTML + CSS + JavaScript 통합)
```

### 🔄 실행 흐름

```
1. 페이지 로드
   ↓
2. DOMContentLoaded 이벤트 발생
   ↓
3. init() 함수 실행
   ├─ initializeData(): 2차원 배열 초기화
   ├─ renderTable(): 테이블 HTML 생성
   └─ setupEventListeners(): 이벤트 리스너 등록
   ↓
4. 사용자 상호작용
   ├─ 셀 클릭 → handleCellClick() → 헤더 하이라이트
   ├─ 셀 입력 → handleCellInput() → 데이터 동기화
   └─ Export 버튼 → exportToCSV() → CSV 다운로드
```

### 🎨 주요 기능 요약

| 기능 | 구현 방법 | 핵심 기술 |
|------|----------|----------|
| **그리드 렌더링** | JavaScript 동적 생성 | Template literals, data-* 속성 |
| **셀 편집** | contenteditable | HTML5 API |
| **좌표 감지** | data 속성 읽기 | dataset API |
| **헤더 하이라이트** | CSS 클래스 토글 | classList API |
| **이벤트 처리** | 이벤트 위임 | Event bubbling |
| **데이터 동기화** | input 이벤트 | 실시간 감지 |
| **CSV 변환** | Array.map() 체인 | 함수형 프로그래밍 |
| **파일 다운로드** | Blob + URL API | 브라우저 API |

---

## 🚀 사용 방법

1. **파일 열기**
   ```bash
   # 브라우저에서 index.html 파일 열기
   start index.html  # Windows
   open index.html   # Mac
   ```

2. **데이터 입력**
   - 원하는 셀을 클릭
   - 키보드로 값 입력
   - 다른 셀 클릭 시 자동 저장

3. **CSV 내보내기**
   - "📥 CSV로 내보내기" 버튼 클릭
   - 자동으로 파일 다운로드
   - 엑셀/구글 시트에서 열기

---

## 💡 핵심 설계 원칙

### 1. **가독성 우선**
- 명확한 함수명 (renderTable, handleCellClick, exportToCSV)
- 상세한 한글 주석
- 단계별 번호 매기기

### 2. **단순성**
- 복잡한 패턴 지양
- 직관적인 로직
- ES6+ 문법 활용 (const, let, arrow function, template literals)

### 3. **확장성**
- ROWS, COLS 상수로 그리드 크기 조절 가능
- 함수 단위로 기능 분리
- 재사용 가능한 구조

### 4. **성능**
- 이벤트 위임으로 리스너 최소화
- 효율적인 DOM 조작
- 메모리 관리 (URL.revokeObjectURL)

### 5. **사용자 경험**
- 시각적 피드백 (hover, active, selected)
- 직관적인 인터페이스
- 엑셀과 유사한 UX

---

## 🔍 디버깅 팁

브라우저 개발자 도구(F12)의 콘솔에서 다음 정보를 확인할 수 있습니다:

```javascript
// 초기화 로그
웹 스프레드시트 초기화 시작...
데이터 배열 생성 완료: 10행 × 10열
테이블 렌더링 완료
이벤트 리스너 등록 완료
✅ 초기화 완료! 스프레드시트를 사용할 수 있습니다.

// 셀 선택 로그
셀 선택: 행 3, 열 B

// 데이터 업데이트 로그
데이터 업데이트: [2][1] = "100"

// CSV 다운로드 로그
CSV 파일 다운로드 완료: spreadsheet_20260521_1955.csv
```

---

## 📚 참고 자료

- **contenteditable**: [MDN Web Docs](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/contenteditable)
- **Blob API**: [MDN Web Docs](https://developer.mozilla.org/ko/docs/Web/API/Blob)
- **이벤트 위임**: [JavaScript.info](https://ko.javascript.info/event-delegation)
- **CSV 표준**: [RFC 4180](https://tools.ietf.org/html/rfc4180)

---

## ✅ 체크리스트

- [x] 10×10 그리드 테이블 생성
- [x] 행/열 헤더 표시 (1,2,3... / A,B,C...)
- [x] 셀 편집 기능 (contenteditable)
- [x] 셀 클릭 시 좌표 감지
- [x] 행/열 헤더 하늘색 하이라이트
- [x] 2차원 배열 데이터 동기화
- [x] CSV 형식 변환
- [x] 파일 다운로드 기능
- [x] 한글 깨짐 방지 (UTF-8 BOM)
- [x] 상세한 한글 주석
- [x] 바닐라 JS만 사용 (외부 라이브러리 없음)

---

## 🎓 학습 포인트

이 프로젝트를 통해 배울 수 있는 것들:

1. **DOM 조작**: 동적 HTML 생성, 클래스 토글
2. **이벤트 처리**: 이벤트 위임, 버블링
3. **데이터 구조**: 2차원 배열 활용
4. **파일 처리**: Blob API, 다운로드 구현
5. **CSS 레이아웃**: Sticky positioning, 테이블 스타일링
6. **함수형 프로그래밍**: map, filter, join 활용
7. **문자열 처리**: CSV 이스케이프, 템플릿 리터럴
8. **브라우저 API**: dataset, classList, URL API

---

**작성자**: 10년 차 웹 프론트엔드 개발자  
**작성일**: 2026년 5월 21일  
**버전**: 1.0
