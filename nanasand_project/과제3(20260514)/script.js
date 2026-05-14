/*
 * ============================================
 * GitHub Finder - 초보자를 위한 가이드
 * ============================================
 * 
 * 이 프로그램은 GitHub REST API를 사용하여 사용자 정보를 검색합니다.
 * 
 * [REST API란?]
 * - REST API는 웹에서 데이터를 주고받는 표준 방법입니다
 * - URL을 통해 서버에 요청하면 JSON 형식으로 응답을 받습니다
 * - 예: https://api.github.com/users/octocat 에 접속하면 octocat 사용자 정보를 받음
 * 
 * [GitHub REST API]
 * - GitHub의 공개 데이터(사용자 정보, 저장소 등)를 가져올 수 있는 무료 서비스
 * - 인증 없이도 시간당 60회까지 사용 가능
 * - 공식 문서: https://docs.github.com/en/rest
 * 
 * [fetch()란?]
 * - JavaScript에서 서버에 HTTP 요청을 보내는 내장 함수
 * - Promise를 반환하므로 async/await와 함께 사용
 * - 예: fetch(url).then(response => response.json())
 * 
 * [async/await란?]
 * - 비동기 작업(서버 요청 등)을 동기적으로 작성할 수 있게 해주는 문법
 * - async: 함수가 Promise를 반환한다는 표시
 * - await: Promise가 완료될 때까지 기다림
 */

// ===== DOM 요소 선택 =====
// DOM(Document Object Model): HTML 문서를 JavaScript로 조작할 수 있게 해주는 인터페이스
// getElementById(): HTML에서 id 속성으로 요소를 찾아옴

// 검색 관련 요소
const searchInput = document.getElementById('searchInput');  // 사용자명 입력 필드
const searchBtn = document.getElementById('searchBtn');      // 검색 버튼
const errorMessage = document.getElementById('errorMessage'); // 에러 메시지 영역

// 프로필 섹션 요소
const profileSection = document.getElementById('profileSection'); // 프로필 전체 영역
const avatar = document.getElementById('avatar');                 // 프로필 이미지
const userName = document.getElementById('userName');             // 사용자 이름
const userBio = document.getElementById('userBio');               // 소개글

// 통계 섹션 요소
const statsSection = document.getElementById('statsSection'); // 통계 전체 영역
const followersEl = document.getElementById('followers');     // 팔로워 수
const followingEl = document.getElementById('following');     // 팔로잉 수
const reposEl = document.getElementById('repos');             // 저장소 수

// 저장소 목록 섹션
const reposSection = document.getElementById('reposSection'); // 저장소 목록 영역

// ===== 이벤트 리스너 =====
// 이벤트 리스너: 사용자의 행동(클릭, 키 입력 등)을 감지하여 함수를 실행

// 검색 버튼 클릭 시 handleSearch 함수 실행
searchBtn.addEventListener('click', handleSearch);

// 입력 필드에서 키를 누를 때마다 실행
searchInput.addEventListener('keypress', (e) => {
    // Enter 키(key === 'Enter')를 누르면 검색 실행
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// ===== 메인 검색 핸들러 =====
/**
 * 사용자 검색 메인 함수
 * 
 * [동작 순서]
 * 1. 입력값 가져오기 및 검증
 * 2. 로딩 상태 표시
 * 3. GitHub API에 사용자 정보 요청
 * 4. GitHub API에 저장소 목록 요청
 * 5. 받은 데이터를 화면에 표시
 * 6. 에러 발생 시 에러 메시지 표시
 */
async function handleSearch() {
    // [1단계] 입력값 가져오기
    // trim(): 앞뒤 공백 제거 (예: "  octocat  " → "octocat")
    const username = searchInput.value.trim();
    
    // [2단계] 빈 입력 값 검증
    // 필수 구현 기능 3: 빈 입력 값 예외 처리
    if (!username) {
        showError('사용자명을 입력해주세요.');
        return; // 함수 종료
    }
    
    // [3단계] 로딩 상태 설정
    // 사용자에게 "검색 중"임을 알림 (버튼 비활성화, 아이콘 변경)
    setLoadingState(true);
    hideAllSections(); // 이전 검색 결과 숨김
    
    try {
        // [4단계] GitHub API 데이터 요청
        // 필수 구현 기능 1: GitHub API에서 데이터 요청
        // await: API 응답이 올 때까지 기다림 (비동기 처리)
        const userData = await fetchUserProfile(username);    // 사용자 정보 가져오기
        const reposData = await fetchUserRepos(username);     // 저장소 목록 가져오기
        
        // [5단계] 받은 데이터를 화면에 렌더링
        // 필수 구현 기능 2: 응답받은 데이터를 화면에 출력
        renderProfile(userData);   // 프로필 정보 표시
        renderStats(userData);     // 통계 정보 표시
        renderRepos(reposData);    // 저장소 목록 표시
        
    } catch (error) {
        // [6단계] 에러 처리
        // 필수 구현 기능 3: 예외 상황 처리
        // try 블록에서 에러가 발생하면 여기로 옴
        handleError(error);
    } finally {
        // [7단계] 로딩 상태 해제
        // finally: 성공/실패 관계없이 항상 실행
        setLoadingState(false);
    }
}

// ===== API 호출 함수 =====

/**
 * 사용자 프로필 정보 가져오기
 * 
 * [GitHub Users API]
 * - 엔드포인트: GET https://api.github.com/users/{username}
 * - 응답: 사용자의 기본 정보 (이름, 프로필 이미지, 팔로워 등)
 * 
 * @param {string} username - 검색할 GitHub 사용자명
 * @returns {Promise<Object>} 사용자 정보 객체
 * 
 * [응답 예시]
 * {
 *   "login": "octocat",              // 사용자명
 *   "avatar_url": "https://...",     // 프로필 이미지 URL
 *   "name": "The Octocat",           // 실제 이름
 *   "bio": "GitHub's mascot",        // 소개글
 *   "public_repos": 8,               // 공개 저장소 수
 *   "followers": 9000,               // 팔로워 수
 *   "following": 9                   // 팔로잉 수
 * }
 */
async function fetchUserProfile(username) {
    // [1단계] API URL 생성
    // 템플릿 리터럴(``)을 사용하여 username을 URL에 삽입
    const url = `https://api.github.com/users/${username}`;
    
    // [2단계] HTTP GET 요청 보내기
    // fetch(): 서버에 요청을 보내고 응답을 기다림
    const response = await fetch(url);
    
    // [3단계] HTTP 상태 코드 확인
    // HTTP 상태 코드: 요청의 성공/실패를 나타내는 숫자
    // - 200: 성공
    // - 404: 찾을 수 없음 (Not Found)
    // - 403: 권한 없음 (Forbidden) - API 한도 초과
    // - 500: 서버 오류 (Internal Server Error)
    
    // 필수 구현 기능 3: 404 에러 처리 (사용자 없음)
    if (response.status === 404) {
        throw { status: 404, message: '사용자를 찾을 수 없습니다. (404)' };
    }
    
    // API rate limit 초과 (시간당 60회 제한)
    if (response.status === 403) {
        throw { status: 403, message: 'API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.' };
    }
    
    // 기타 에러 (500번대 등)
    if (!response.ok) {
        throw { status: response.status, message: '서버 오류가 발생했습니다.' };
    }
    
    // [4단계] JSON 응답 파싱
    // response.json(): 응답 본문을 JSON 객체로 변환
    return await response.json();
}

/**
 * 사용자 저장소 목록 가져오기
 * 
 * [GitHub Repositories API]
 * - 엔드포인트: GET https://api.github.com/users/{username}/repos
 * - 응답: 사용자의 공개 저장소 목록 (배열)
 * 
 * [쿼리 파라미터]
 * - sort=updated: 최근 업데이트 순으로 정렬
 * - per_page=10: 최대 10개만 가져오기
 * 
 * @param {string} username - 검색할 GitHub 사용자명
 * @returns {Promise<Array>} 저장소 목록 배열
 * 
 * [응답 예시]
 * [
 *   {
 *     "name": "Hello-World",           // 저장소 이름
 *     "description": "My first repo",  // 저장소 설명
 *     "html_url": "https://...",       // 저장소 링크
 *     "stargazers_count": 1500,        // 스타 수
 *     "language": "JavaScript"         // 주 사용 언어
 *   },
 *   ...
 * ]
 */
async function fetchUserRepos(username) {
    // [1단계] API URL 생성 (쿼리 파라미터 포함)
    // ?sort=updated: 최신 업데이트 순 정렬
    // &per_page=10: 10개만 가져오기
    const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`;
    
    // [2단계] HTTP GET 요청
    const response = await fetch(url);
    
    // [3단계] 에러 체크
    if (!response.ok) {
        throw { status: response.status, message: '저장소 목록을 가져올 수 없습니다.' };
    }
    
    // [4단계] JSON 배열 반환
    return await response.json();
}

// ===== 렌더링 함수 =====
// 렌더링: 데이터를 받아서 화면(HTML)에 표시하는 것

/**
 * 프로필 정보 렌더링
 * 
 * [DOM 조작]
 * - element.src: 이미지 소스 변경
 * - element.textContent: 텍스트 내용 변경
 * - classList.remove('hidden'): CSS 클래스 제거하여 요소 표시
 * 
 * @param {Object} userData - API에서 받은 사용자 정보 객체
 */
function renderProfile(userData) {
    // [1단계] 프로필 이미지 설정
    avatar.src = userData.avatar_url;  // 이미지 URL 설정
    avatar.alt = `${userData.login} 프로필 이미지`;  // 대체 텍스트 (접근성)
    
    // [2단계] 사용자 이름 설정
    // userData.name이 없으면(null) userData.login 사용 (|| 연산자)
    userName.textContent = userData.name || userData.login;
    
    // [3단계] 소개글 설정
    userBio.textContent = userData.bio || '소개가 없습니다.';
    
    // [4단계] 프로필 섹션 표시
    // 'hidden' 클래스를 제거하여 화면에 보이게 함
    profileSection.classList.remove('hidden');
}

/**
 * 통계 정보 렌더링
 * 
 * [toLocaleString()]
 * - 숫자를 지역 형식으로 변환 (예: 1000 → "1,000")
 * - 가독성 향상
 * 
 * @param {Object} userData - API에서 받은 사용자 정보 객체
 */
function renderStats(userData) {
    // [1단계] 각 통계 값 설정
    // toLocaleString(): 천 단위 콤마 추가 (9000 → "9,000")
    followersEl.textContent = userData.followers.toLocaleString();
    followingEl.textContent = userData.following.toLocaleString();
    reposEl.textContent = userData.public_repos.toLocaleString();
    
    // [2단계] 통계 섹션 표시
    statsSection.classList.remove('hidden');
}

/**
 * 저장소 목록 렌더링 (동적 DOM 생성)
 * 
 * [동적 DOM 생성이란?]
 * - JavaScript로 HTML 요소를 만들어서 페이지에 추가하는 것
 * - createElement(): 새로운 HTML 요소 생성
 * - appendChild(): 부모 요소에 자식 요소 추가
 * 
 * [왜 동적으로 생성하나?]
 * - 저장소 개수가 사용자마다 다르기 때문
 * - API 응답에 따라 유연하게 화면 구성
 * 
 * @param {Array} reposData - API에서 받은 저장소 목록 배열
 */
function renderRepos(reposData) {
    // [1단계] 기존 내용 초기화
    // innerHTML = '': 이전 검색 결과 삭제
    reposSection.innerHTML = '';
    
    // [2단계] 저장소가 없는 경우 처리
    if (reposData.length === 0) {
        reposSection.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 20px;">공개 저장소가 없습니다.</p>';
        reposSection.classList.remove('hidden');
        return; // 함수 종료
    }
    
    // [3단계] 각 저장소마다 HTML 요소 생성
    // forEach(): 배열의 각 항목에 대해 함수 실행
    reposData.forEach(repo => {
        // === 저장소 아이템 컨테이너 생성 ===
        const repoItem = document.createElement('div');  // <div> 요소 생성
        repoItem.className = 'repo-item';                // CSS 클래스 추가
        
        // === 헤더 영역 (저장소 이름 + GitHub 링크) ===
        const repoHeader = document.createElement('div');
        repoHeader.className = 'repo-header';
        
        // 저장소 이름
        const repoName = document.createElement('h3');
        repoName.className = 'repo-name';
        repoName.textContent = repo.name;  // API에서 받은 저장소 이름
        
        // GitHub 링크 (→ 아이콘)
        const repoLink = document.createElement('a');
        repoLink.className = 'repo-link';
        repoLink.href = repo.html_url;           // 저장소 URL
        repoLink.target = '_blank';              // 새 탭에서 열기
        repoLink.rel = 'noopener noreferrer';    // 보안 설정
        repoLink.textContent = '→';              // 화살표 아이콘
        repoLink.title = 'GitHub에서 보기';      // 마우스 오버 시 툴팁
        
        // 헤더에 이름과 링크 추가
        repoHeader.appendChild(repoName);
        repoHeader.appendChild(repoLink);
        
        // === 저장소 설명 ===
        const repoDesc = document.createElement('p');
        repoDesc.className = 'repo-description';
        repoDesc.textContent = repo.description || '설명이 없습니다.';
        
        // === 메타 정보 (언어, 스타 수) ===
        const repoMeta = document.createElement('div');
        repoMeta.className = 'repo-meta';
        
        // 주 사용 언어 (있는 경우만 표시)
        if (repo.language) {
            const repoLang = document.createElement('span');
            repoLang.className = 'repo-language';
            repoLang.textContent = `📝 ${repo.language}`;
            repoMeta.appendChild(repoLang);
        }
        
        // 스타 수
        const repoStars = document.createElement('span');
        repoStars.className = 'repo-stars';
        repoStars.textContent = `⭐ ${repo.stargazers_count.toLocaleString()}`;
        repoMeta.appendChild(repoStars);
        
        // === 모든 요소 조립 ===
        // 컨테이너에 헤더, 설명, 메타 정보 추가
        repoItem.appendChild(repoHeader);
        repoItem.appendChild(repoDesc);
        repoItem.appendChild(repoMeta);
        
        // === 페이지에 추가 ===
        // 완성된 저장소 아이템을 목록에 추가
        reposSection.appendChild(repoItem);
    });
    
    // [4단계] 저장소 목록 섹션 표시
    reposSection.classList.remove('hidden');
}

// ===== 에러 처리 함수 =====

/**
 * 에러 처리 및 메시지 표시
 * 
 * [에러 종류]
 * - 404: 사용자를 찾을 수 없음
 * - 403: API 요청 한도 초과
 * - TypeError: 네트워크 연결 오류
 * - 기타: 알 수 없는 오류
 * 
 * @param {Object} error - 에러 객체
 */
function handleError(error) {
    // 기본 에러 메시지
    let message = '오류가 발생했습니다. 다시 시도해주세요.';
    
    // 에러 종류에 따라 메시지 변경
    if (error.status === 404) {
        // 사용자를 찾을 수 없음
        message = error.message;
    } else if (error.status === 403) {
        // API 요청 한도 초과
        message = error.message;
    } else if (error.message) {
        // 기타 에러 메시지가 있는 경우
        message = error.message;
    } else if (error.name === 'TypeError') {
        // 네트워크 연결 오류 (인터넷 끊김 등)
        message = '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
    }
    
    // 에러 메시지 표시
    showError(message);
}

/**
 * 에러 메시지 표시
 * 
 * @param {string} message - 표시할 에러 메시지
 */
function showError(message) {
    // [1단계] 에러 메시지 설정
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');  // 에러 영역 표시
    
    // [2단계] 다른 섹션 숨김
    // 에러가 발생하면 프로필, 통계, 저장소 목록을 모두 숨김
    profileSection.classList.add('hidden');
    statsSection.classList.add('hidden');
    reposSection.classList.add('hidden');
}

// ===== 헬퍼 함수 =====
// 헬퍼 함수: 반복적으로 사용되는 기능을 모아놓은 함수

/**
 * 모든 결과 섹션 숨기기
 * 
 * [용도]
 * - 새로운 검색을 시작할 때 이전 결과 지우기
 * - 깔끔한 UI 유지
 */
function hideAllSections() {
    // 'hidden' 클래스 추가 = display: none (CSS에서 정의)
    profileSection.classList.add('hidden');
    statsSection.classList.add('hidden');
    reposSection.classList.add('hidden');
    errorMessage.classList.add('hidden');
}

/**
 * 로딩 상태 토글
 * 
 * [로딩 상태란?]
 * - API 요청 중임을 사용자에게 알리는 것
 * - 버튼 비활성화 + 아이콘 변경
 * 
 * @param {boolean} isLoading - true: 로딩 중, false: 로딩 완료
 */
function setLoadingState(isLoading) {
    // [1단계] 입력 필드와 버튼 비활성화/활성화
    // disabled = true: 클릭 불가, disabled = false: 클릭 가능
    searchBtn.disabled = isLoading;
    searchInput.disabled = isLoading;
    
    // [2단계] 버튼 텍스트 변경
    if (isLoading) {
        searchBtn.textContent = '⏳';  // 로딩 중: 모래시계 아이콘
    } else {
        searchBtn.textContent = '🔍';  // 로딩 완료: 검색 아이콘
    }
}

/*
 * ============================================
 * 학습 포인트 정리
 * ============================================
 * 
 * 1. REST API 사용법
 *    - fetch()로 HTTP 요청 보내기
 *    - async/await로 비동기 처리
 *    - JSON 응답 파싱
 * 
 * 2. DOM 조작
 *    - getElementById()로 요소 선택
 *    - createElement()로 요소 생성
 *    - appendChild()로 요소 추가
 *    - classList로 CSS 클래스 조작
 * 
 * 3. 이벤트 처리
 *    - addEventListener()로 이벤트 감지
 *    - click, keypress 이벤트
 * 
 * 4. 에러 처리
 *    - try/catch로 에러 잡기
 *    - HTTP 상태 코드 확인
 *    - 사용자 친화적인 에러 메시지
 * 
 * 5. 코드 구조
 *    - 함수로 기능 분리
 *    - 주석으로 설명 추가
 *    - 가독성 있는 변수명
 */
