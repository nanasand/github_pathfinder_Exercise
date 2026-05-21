# 브라우저 기반 스프레드시트 애플리케이션

## 프로젝트 개요
브라우저 내에서 간단한 수치 입력이 가능한 표를 제공하고, 데이터를 CSV 파일로 추출하여 엑셀/구글 시트에서 즉시 활용할 수 있는 웹 애플리케이션입니다.

---

## PRD (Product Requirements Document)
### 기능 목적
브라우저 내에서 간단한 수치 입력이 가능한 표를 제공하고, 데이터를 CSV 파일로 추출하여 엑셀/구글 시트에서 즉시 활용할 수 있게 한다.

### 주요 기능
- 브라우저 기반 데이터 입력 인터페이스
- 실시간 셀 편집 기능
- CSV 형식으로 데이터 내보내기
- 엑셀/구글 시트와의 호환성

---

## SRS (Software Requirements Specification)
### 행동 규칙

#### 1. 셀 선택 및 감지
- 사용자가 셀을 클릭하면 해당 셀의 `row`, `col`을 감지한다.
- 선택된 셀의 위치 정보를 메모리에 저장한다.

#### 2. 시각적 피드백
- 선택된 셀의 **행 헤더**와 **열 헤더**에 `active` 클래스를 추가한다.
- `active` 클래스가 적용되면 하늘색 스타일이 표시된다.
- 다른 셀을 선택하면 이전 셀의 `active` 클래스는 제거된다.

#### 3. 데이터 구조
- 데이터는 `data[row][col]` 형태의 **2차원 배열**로 메모리상에 유지한다.
- 각 셀의 값은 배열의 해당 인덱스에 저장된다.
- 예시:
  ```javascript
  data = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
  ]
  ```

#### 4. CSV 내보내기
- **Export 버튼** 클릭 시 다음 동작을 수행한다:
  1. 2차원 배열을 순회하며 각 행의 데이터를 쉼표(`,`)로 구분된 문자열로 변환
  2. 각 행은 줄바꿈(`\n`)으로 구분
  3. `Blob` 객체를 이용해 `.csv` 파일로 생성
  4. 브라우저의 다운로드 기능을 통해 파일 저장

- CSV 생성 예시:
  ```
  10,20,30
  40,50,60
  70,80,90
  ```

---

## TRD (Technical Requirements Document)
### 기술 스택

#### 1. HTML
**옵션 A: `<table>` 태그 사용**
```html
<table>
  <thead>
    <tr>
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
    </tr>
  </tbody>
</table>
```

**옵션 B: `<div>` Grid 시스템**
```html
<div class="grid-container">
  <div class="grid-cell" data-row="0" data-col="0"></div>
  <div class="grid-cell" data-row="0" data-col="1"></div>
  <!-- ... -->
</div>
```

#### 2. CSS
**`:hover` 및 `.active` 클래스 활용**
```css
/* 호버 효과 */
td:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

/* 활성 상태 스타일 */
th.active {
  background-color: #87CEEB; /* 하늘색 */
  font-weight: bold;
}

/* 선택된 셀 */
td.selected {
  border: 2px solid #4CAF50;
}
```

#### 3. JavaScript
**DOM 조작 및 데이터 동기화 로직**

```javascript
// 데이터 구조
let data = [];

// 셀 클릭 이벤트
function handleCellClick(row, col) {
  // 이전 active 클래스 제거
  document.querySelectorAll('.active').forEach(el => {
    el.classList.remove('active');
  });
  
  // 새로운 active 클래스 추가
  const rowHeader = document.querySelector(`th[data-row="${row}"]`);
  const colHeader = document.querySelector(`th[data-col="${col}"]`);
  rowHeader.classList.add('active');
  colHeader.classList.add('active');
}

// CSV 내보내기
function exportToCSV() {
  let csvContent = data.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'spreadsheet.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 데이터 동기화
function updateData(row, col, value) {
  if (!data[row]) {
    data[row] = [];
  }
  data[row][col] = value;
}
```

---

## 구현 우선순위

1. **Phase 1**: 기본 테이블 구조 및 셀 선택 기능
2. **Phase 2**: 데이터 입력 및 2차원 배열 동기화
3. **Phase 3**: 행/열 헤더 활성화 스타일링
4. **Phase 4**: CSV 내보내기 기능
5. **Phase 5**: UI/UX 개선 및 테스트

---

## 참고사항
- 브라우저 호환성: Chrome, Firefox, Safari, Edge 최신 버전
- 파일 인코딩: UTF-8
- 최대 데이터 크기: 브라우저 메모리 제한 내에서 동작
