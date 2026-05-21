/* ========================================
   Step 1: 그리드 렌더링 로직
   ======================================== */

// 그리드 크기 설정 (확장 가능)
const ROWS = 10;
const COLS = 10;

// localStorage 키 이름
const STORAGE_KEY = 'spreadsheet_data';

// 데이터를 저장할 2차원 배열
// data[row][col] 형태로 각 셀의 값을 저장
let data = [];

/**
 * 초기 데이터 배열 생성
 * 모든 셀을 빈 문자열로 초기화
 */
function initializeData() {
    for (let i = 0; i < ROWS; i++) {
        data[i] = [];
        for (let j = 0; j < COLS; j++) {
            data[i][j] = '';
        }
    }
}

/* ========================================
   localStorage 데이터 영속성 기능
   ======================================== */

/**
 * 데이터를 localStorage에 저장
 * 이유: 새로고침 후에도 사용자가 입력한 데이터를 유지하기 위함
 */
function saveToLocalStorage() {
    try {
        // 2차원 배열을 JSON 문자열로 변환하여 저장
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log('💾 데이터 저장 완료');
    } catch (error) {
        console.error('❌ 데이터 저장 실패:', error);
        // localStorage가 가득 찬 경우 등의 오류 처리
        alert('데이터 저장에 실패했습니다. 저장 공간이 부족할 수 있습니다.');
    }
}

/**
 * localStorage에서 데이터 불러오기
 * 이유: 페이지 로드 시 이전에 저장된 데이터를 복원
 * @returns {boolean} - 데이터 로드 성공 여부
 */
function loadFromLocalStorage() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        
        if (savedData) {
            // JSON 문자열을 2차원 배열로 변환
            const parsedData = JSON.parse(savedData);
            
            // 데이터 유효성 검사
            if (Array.isArray(parsedData) && parsedData.length === ROWS) {
                data = parsedData;
                console.log('📂 저장된 데이터 불러오기 완료');
                return true;
            } else {
                console.warn('⚠️ 저장된 데이터 형식이 올바르지 않습니다.');
                return false;
            }
        } else {
            console.log('ℹ️ 저장된 데이터가 없습니다.');
            return false;
        }
    } catch (error) {
        console.error('❌ 데이터 불러오기 실패:', error);
        return false;
    }
}

/**
 * localStorage의 데이터 삭제 및 초기화
 * 이유: 사용자가 모든 데이터를 지우고 새로 시작하고 싶을 때
 */
function clearLocalStorage() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('🗑️ 저장된 데이터 삭제 완료');
        
        // 데이터 배열 초기화
        initializeData();
        
        // 테이블 다시 렌더링 (모든 셀 비우기)
        renderTable();
        
        alert('모든 데이터가 삭제되었습니다.');
    } catch (error) {
        console.error('❌ 데이터 삭제 실패:', error);
    }
}

/**
 * 열 번호를 알파벳으로 변환 (A, B, C, ... Z, AA, AB, ...)
 * @param {number} index - 열 인덱스 (0부터 시작)
 * @returns {string} - 알파벳 열 이름
 */
function getColumnName(index) {
    let name = '';
    let num = index;
    while (num >= 0) {
        name = String.fromCharCode(65 + (num % 26)) + name;
        num = Math.floor(num / 26) - 1;
    }
    return name;
}

/**
 * 테이블 HTML 생성 및 렌더링
 * 이유: JavaScript로 동적 생성하면 그리드 크기 변경이 쉽고,
 *       data 속성을 일관되게 추가할 수 있음
 */
function renderTable() {
    const table = document.getElementById('spreadsheet');
    let html = '<thead><tr>';

    // 첫 번째 셀 (좌측 상단 모서리)
    html += '<th></th>';

    // 열 헤더 생성 (A, B, C, ...)
    for (let col = 0; col < COLS; col++) {
        html += `<th data-col="${col}" class="col-header">${getColumnName(col)}</th>`;
    }
    html += '</tr></thead><tbody>';

    // 데이터 행 생성
    for (let row = 0; row < ROWS; row++) {
        html += '<tr>';
        
        // 행 헤더 (1, 2, 3, ...)
        html += `<th data-row="${row}" class="row-header">${row + 1}</th>`;
        
        // 데이터 셀 생성
        for (let col = 0; col < COLS; col++) {
            // contenteditable: 사용자가 직접 셀을 편집할 수 있게 함
            // data-row, data-col: 셀의 좌표를 저장
            // 저장된 데이터가 있으면 셀에 표시
            const cellValue = data[row][col] || '';
            html += `<td contenteditable="true" data-row="${row}" data-col="${col}">${cellValue}</td>`;
        }
        html += '</tr>';
    }
    html += '</tbody>';

    table.innerHTML = html;
}

/* ========================================
   Step 2: 셀 클릭 시 좌표 감지 및 헤더 하이라이트
   ======================================== */

/**
 * 모든 active 클래스 제거
 * 이유: 새로운 셀을 선택할 때 이전 하이라이트를 지워야 함
 */
function clearActiveHeaders() {
    document.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
    });
}

/**
 * 선택된 셀 표시 제거
 */
function clearSelectedCell() {
    document.querySelectorAll('.selected').forEach(element => {
        element.classList.remove('selected');
    });
}

/**
 * 셀 클릭 이벤트 핸들러
 * @param {number} row - 행 인덱스
 * @param {number} col - 열 인덱스
 * @param {HTMLElement} cell - 클릭된 셀 요소
 * 
 * 이유: 이벤트 위임 패턴을 사용하여 성능 최적화
 *       각 셀마다 이벤트 리스너를 달지 않고, 테이블 하나에만 달아서 관리
 */
function handleCellClick(row, col, cell) {
    // 1. 이전 하이라이트 제거
    clearActiveHeaders();
    clearSelectedCell();

    // 2. 선택된 셀 표시
    cell.classList.add('selected');

    // 3. 해당 행 헤더 하이라이트
    const rowHeader = document.querySelector(`th.row-header[data-row="${row}"]`);
    if (rowHeader) {
        rowHeader.classList.add('active');
    }

    // 4. 해당 열 헤더 하이라이트
    const colHeader = document.querySelector(`th.col-header[data-col="${col}"]`);
    if (colHeader) {
        colHeader.classList.add('active');
    }

    console.log(`셀 선택: 행 ${row + 1}, 열 ${getColumnName(col)}`);
}

/**
 * 셀 입력 이벤트 핸들러
 * @param {number} row - 행 인덱스
 * @param {number} col - 열 인덱스
 * @param {string} value - 입력된 값
 * 
 * 이유: 사용자가 셀에 입력한 내용을 실시간으로 data 배열에 동기화
 *       나중에 CSV로 내보낼 때 이 배열을 사용
 */
function handleCellInput(row, col, value) {
    // 데이터 배열 업데이트
    data[row][col] = value;
    console.log(`데이터 업데이트: [${row}][${col}] = "${value}"`);
    
    // 자동 저장: 셀 값이 변경될 때마다 localStorage에 저장
    saveToLocalStorage();
}

/* ========================================
   Step 3: CSV 다운로드 기능
   ======================================== */

/**
 * CSV 형식으로 데이터 변환 및 다운로드
 * 
 * 이유: 
 * 1. map()으로 각 행을 쉼표로 연결된 문자열로 변환
 * 2. join('\n')으로 행들을 줄바꿈으로 연결
 * 3. Blob API로 파일 객체 생성
 * 4. URL.createObjectURL()로 다운로드 링크 생성
 * 5. 가상의 <a> 태그를 만들어 클릭 이벤트 트리거
 */
function exportToCSV() {
    // 1. 2차원 배열을 CSV 문자열로 변환
    // 각 셀의 값에 쉼표가 있을 경우를 대비해 따옴표로 감싸기
    const csvContent = data.map(row => {
        return row.map(cell => {
            // 셀 값에 쉼표나 따옴표가 있으면 따옴표로 감싸고 이스케이프 처리
            const cellValue = String(cell || '');
            if (cellValue.includes(',') || cellValue.includes('"') || cellValue.includes('\n')) {
                return `"${cellValue.replace(/"/g, '""')}"`;
            }
            return cellValue;
        }).join(',');
    }).join('\n');

    // 2. Blob 객체 생성 (파일 데이터)
    // UTF-8 BOM 추가로 한글 깨짐 방지
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { 
        type: 'text/csv;charset=utf-8;' 
    });

    // 3. 다운로드 링크 생성
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // 4. 파일명 설정 (현재 날짜/시간 포함)
    const now = new Date();
    const filename = `spreadsheet_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.display = 'none';

    // 5. DOM에 추가하고 클릭 후 제거
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 6. 메모리 해제
    URL.revokeObjectURL(url);

    console.log('CSV 파일 다운로드 완료:', filename);
    alert(`CSV 파일이 다운로드되었습니다!\n파일명: ${filename}`);
}

/* ========================================
   이벤트 리스너 등록
   ======================================== */

/**
 * 테이블 이벤트 위임 설정
 * 이유: 모든 셀에 개별 리스너를 달지 않고, 
 *       부모 요소(table)에 하나만 달아서 성능 향상
 */
function setupEventListeners() {
    const table = document.getElementById('spreadsheet');

    // 클릭 이벤트 (셀 선택)
    table.addEventListener('click', (event) => {
        const cell = event.target;
        
        // td 요소만 처리
        if (cell.tagName === 'TD') {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            handleCellClick(row, col, cell);
        }
    });

    // input 이벤트 (셀 내용 변경)
    table.addEventListener('input', (event) => {
        const cell = event.target;
        
        // td 요소만 처리
        if (cell.tagName === 'TD') {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const value = cell.textContent;
            handleCellInput(row, col, value);
        }
    });

    // Export 버튼 이벤트
    document.getElementById('exportBtn').addEventListener('click', exportToCSV);
}

/* ========================================
   초기화 함수
   ======================================== */

/**
 * 페이지 로드 시 실행
 * 이유: DOM이 완전히 로드된 후에 테이블을 생성하고 이벤트를 등록해야 함
 */
function init() {
    console.log('웹 스프레드시트 초기화 시작...');
    
    // 1. 데이터 배열 초기화
    initializeData();
    console.log(`데이터 배열 생성 완료: ${ROWS}행 × ${COLS}열`);
    
    // 2. localStorage에서 저장된 데이터 불러오기 (있으면)
    const dataLoaded = loadFromLocalStorage();
    if (dataLoaded) {
        console.log('💡 이전 세션의 데이터를 복원했습니다.');
    }
    
    // 3. 테이블 렌더링 (저장된 데이터 포함)
    renderTable();
    console.log('테이블 렌더링 완료');
    
    // 4. 이벤트 리스너 등록
    setupEventListeners();
    console.log('이벤트 리스너 등록 완료');
    
    // 5. 데이터 초기화 버튼 이벤트 등록 (있으면)
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('모든 데이터를 삭제하시겠습니까?')) {
                clearLocalStorage();
            }
        });
    }
    
    console.log('✅ 초기화 완료! 스프레드시트를 사용할 수 있습니다.');
}

// DOM 로드 완료 후 초기화 실행
document.addEventListener('DOMContentLoaded', init);
