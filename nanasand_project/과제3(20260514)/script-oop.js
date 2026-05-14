/*
 * ============================================
 * GitHub Finder - OOP 버전 (학습용)
 * ============================================
 * 
 * 이 파일은 절차적 방식(script.js)을 OOP 방식으로 리팩토링한 버전입니다.
 * 
 * [OOP란?]
 * - Object-Oriented Programming (객체 지향 프로그래밍)
 * - 프로그램을 "객체"라는 단위로 구성하는 방식
 * - 데이터와 기능을 하나의 클래스로 묶어서 관리
 * 
 * [OOP의 장점]
 * - 코드 재사용성 증가
 * - 유지보수 용이
 * - 대규모 프로젝트에 적합
 * - 관심사의 분리 (Separation of Concerns)
 * 
 * [이 파일의 구조]
 * 1. GitHubAPI 클래스: API 호출 전담
 * 2. UIRenderer 클래스: UI 렌더링 전담
 * 3. GitHubFinder 클래스: 메인 앱 로직
 */

// ===== GitHubAPI 클래스 =====
/**
 * GitHub REST API 호출을 담당하는 클래스
 * 
 * [역할]
 * - API 요청 URL 관리
 * - HTTP 요청 보내기
 * - 에러 처리
 * 
 * [캡슐화]
 * - API 관련 로직을 하나의 클래스로 묶음
 * - 다른 클래스는 API 내부 구현을 몰라도 됨
 */
class GitHubAPI {
    /**
     * 생성자: 클래스 인스턴스가 만들어질 때 자동 실행
     * 
     * [this란?]
     * - 현재 객체(인스턴스)를 가리키는 키워드
     * - this.baseURL = 이 객체의 baseURL 속성
     */
    constructor() {
        // API 기본 URL (모든 요청에 공통으로 사용)
        this.baseURL = 'https://api.github.com';
    }

    /**
     * 사용자 프로필 정보 가져오기
     * 
     * @param {string} username - GitHub 사용자명
     * @returns {Promise<Object>} 사용자 정보 객체
     * @throws {Object} 에러 객체 (status, message 포함)
     */
    async getUserProfile(username) {
        // [1단계] API URL 생성
        const url = `${this.baseURL}/users/${username}`;
        
        // [2단계] HTTP GET 요청
        const response = await fetch(url);
        
        // [3단계] 에러 체크
        this.checkResponse(response);
        
        // [4단계] JSON 파싱 후 반환
        return await response.json();
    }

    /**
     * 사용자 저장소 목록 가져오기
     * 
     * @param {string} username - GitHub 사용자명
     * @returns {Promise<Array>} 저장소 목록 배열
     * @throws {Object} 에러 객체
     */
    async getUserRepos(username) {
        // 쿼리 파라미터: 최신 업데이트 순, 최대 10개
        const url = `${this.baseURL}/users/${username}/repos?sort=updated&per_page=10`;
        
        const response = await fetch(url);
        this.checkResponse(response);
        
        return await response.json();
    }

    /**
     * HTTP 응답 상태 코드 확인
     * 
     * [메서드 분리의 장점]
     * - 중복 코드 제거
     * - 에러 처리 로직을 한 곳에서 관리
     * 
     * @param {Response} response - fetch 응답 객체
     * @throws {Object} 에러 객체
     */
    checkResponse(response) {
        // 404: 사용자를 찾을 수 없음
        if (response.status === 404) {
            throw { 
                status: 404, 
                message: '사용자를 찾을 수 없습니다. (404)' 
            };
        }
        
        // 403: API rate limit 초과
        if (response.status === 403) {
            throw { 
                status: 403, 
                message: 'API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.' 
            };
        }
        
        // 기타 에러
        if (!response.ok) {
            throw { 
                status: response.status, 
                message: '서버 오류가 발생했습니다.' 
            };
        }
    }
}

// ===== UIRenderer 클래스 =====
/**
 * UI 렌더링을 담당하는 클래스
 * 
 * [역할]
 * - DOM 요소 선택 및 관리
 * - 데이터를 화면에 표시
 * - 에러 메시지 표시
 * 
 * [단일 책임 원칙]
 * - 이 클래스는 오직 UI 렌더링만 담당
 * - API 호출이나 비즈니스 로직은 다른 클래스에서 처리
 */
class UIRenderer {
    /**
     * 생성자: DOM 요소 초기화
     * 
     * [왜 생성자에서 초기화?]
     * - 객체가 만들어질 때 한 번만 실행
     * - 모든 메서드에서 this.element 형태로 접근 가능
     */
    constructor() {
        // 에러 메시지 영역
        this.errorMessage = document.getElementById('errorMessage');
        
        // 프로필 섹션
        this.profileSection = document.getElementById('profileSection');
        this.avatar = document.getElementById('avatar');
        this.userName = document.getElementById('userName');
        this.userBio = document.getElementById('userBio');
        
        // 통계 섹션
        this.statsSection = document.getElementById('statsSection');
        this.followersEl = document.getElementById('followers');
        this.followingEl = document.getElementById('following');
        this.reposEl = document.getElementById('repos');
        
        // 저장소 목록 섹션
        this.reposSection = document.getElementById('reposSection');
    }

    /**
     * 프로필 정보 렌더링
     * 
     * @param {Object} userData - 사용자 정보 객체
     */
    renderProfile(userData) {
        // 프로필 이미지 설정
        this.avatar.src = userData.avatar_url;
        this.avatar.alt = `${userData.login} 프로필 이미지`;
        
        // 사용자 이름 설정
        this.userName.textContent = userData.name || userData.login;
        
        // 소개글 설정
        this.userBio.textContent = userData.bio || '소개가 없습니다.';
        
        // 프로필 섹션 표시
        this.profileSection.classList.remove('hidden');
    }

    /**
     * 통계 정보 렌더링
     * 
     * @param {Object} userData - 사용자 정보 객체
     */
    renderStats(userData) {
        // 천 단위 콤마 추가
        this.followersEl.textContent = userData.followers.toLocaleString();
        this.followingEl.textContent = userData.following.toLocaleString();
        this.reposEl.textContent = userData.public_repos.toLocaleString();
        
        // 통계 섹션 표시
        this.statsSection.classList.remove('hidden');
    }

    /**
     * 저장소 목록 렌더링
     * 
     * @param {Array} reposData - 저장소 목록 배열
     */
    renderRepos(reposData) {
        // 기존 내용 초기화
        this.reposSection.innerHTML = '';
        
        // 저장소가 없는 경우
        if (reposData.length === 0) {
            this.reposSection.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 20px;">공개 저장소가 없습니다.</p>';
            this.reposSection.classList.remove('hidden');
            return;
        }
        
        // 각 저장소마다 DOM 요소 생성
        reposData.forEach(repo => {
            // 저장소 아이템 생성 (메서드 분리)
            const repoItem = this.createRepoItem(repo);
            this.reposSection.appendChild(repoItem);
        });
        
        // 저장소 목록 섹션 표시
        this.reposSection.classList.remove('hidden');
    }

    /**
     * 저장소 아이템 DOM 요소 생성
     * 
     * [메서드 분리의 장점]
     * - renderRepos() 메서드가 너무 길어지는 것을 방지
     * - 저장소 아이템 생성 로직을 독립적으로 관리
     * 
     * @param {Object} repo - 저장소 정보 객체
     * @returns {HTMLElement} 생성된 DOM 요소
     */
    createRepoItem(repo) {
        // 컨테이너
        const repoItem = document.createElement('div');
        repoItem.className = 'repo-item';
        
        // 헤더 (이름 + 링크)
        const repoHeader = document.createElement('div');
        repoHeader.className = 'repo-header';
        
        const repoName = document.createElement('h3');
        repoName.className = 'repo-name';
        repoName.textContent = repo.name;
        
        const repoLink = document.createElement('a');
        repoLink.className = 'repo-link';
        repoLink.href = repo.html_url;
        repoLink.target = '_blank';
        repoLink.rel = 'noopener noreferrer';
        repoLink.textContent = '→';
        repoLink.title = 'GitHub에서 보기';
        
        repoHeader.appendChild(repoName);
        repoHeader.appendChild(repoLink);
        
        // 설명
        const repoDesc = document.createElement('p');
        repoDesc.className = 'repo-description';
        repoDesc.textContent = repo.description || '설명이 없습니다.';
        
        // 메타 정보
        const repoMeta = document.createElement('div');
        repoMeta.className = 'repo-meta';
        
        if (repo.language) {
            const repoLang = document.createElement('span');
            repoLang.className = 'repo-language';
            repoLang.textContent = `📝 ${repo.language}`;
            repoMeta.appendChild(repoLang);
        }
        
        const repoStars = document.createElement('span');
        repoStars.className = 'repo-stars';
        repoStars.textContent = `⭐ ${repo.stargazers_count.toLocaleString()}`;
        repoMeta.appendChild(repoStars);
        
        // 조립
        repoItem.appendChild(repoHeader);
        repoItem.appendChild(repoDesc);
        repoItem.appendChild(repoMeta);
        
        return repoItem;
    }

    /**
     * 에러 메시지 표시
     * 
     * @param {string} message - 표시할 에러 메시지
     */
    showError(message) {
        // 에러 메시지 설정
        this.errorMessage.textContent = message;
        this.errorMessage.classList.remove('hidden');
        
        // 다른 섹션 숨김
        this.hideAllSections();
    }

    /**
     * 모든 결과 섹션 숨기기
     */
    hideAllSections() {
        this.profileSection.classList.add('hidden');
        this.statsSection.classList.add('hidden');
        this.reposSection.classList.add('hidden');
        this.errorMessage.classList.add('hidden');
    }
}

// ===== GitHubFinder 클래스 (메인 앱) =====
/**
 * GitHub Finder 메인 애플리케이션 클래스
 * 
 * [역할]
 * - 전체 앱의 진입점
 * - 이벤트 처리
 * - API와 UI를 연결하는 컨트롤러 역할
 * 
 * [의존성 주입]
 * - GitHubAPI와 UIRenderer 인스턴스를 생성하여 사용
 * - 각 클래스의 책임을 명확히 분리
 */
class GitHubFinder {
    /**
     * 생성자: 앱 초기화
     * 
     * [초기화 순서]
     * 1. API 클래스 인스턴스 생성
     * 2. UI 클래스 인스턴스 생성
     * 3. DOM 요소 선택
     * 4. 이벤트 리스너 등록
     */
    constructor() {
        // [1단계] 의존성 주입
        // API 호출을 담당하는 객체 생성
        this.api = new GitHubAPI();
        
        // UI 렌더링을 담당하는 객체 생성
        this.ui = new UIRenderer();
        
        // [2단계] DOM 요소 선택
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        
        // [3단계] 이벤트 리스너 등록
        this.initEventListeners();
    }

    /**
     * 이벤트 리스너 초기화
     * 
     * [화살표 함수 사용 이유]
     * - () => this.handleSearch()
     * - this가 GitHubFinder 인스턴스를 가리키도록 보장
     * - 일반 함수를 사용하면 this가 버튼 요소를 가리킴
     */
    initEventListeners() {
        // 검색 버튼 클릭 이벤트
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        
        // Enter 키 이벤트
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
    }

    /**
     * 검색 핸들러 (메인 로직)
     * 
     * [async 메서드]
     * - 비동기 작업을 포함하는 메서드
     * - await 키워드 사용 가능
     */
    async handleSearch() {
        // [1단계] 입력값 가져오기
        const username = this.searchInput.value.trim();
        
        // [2단계] 빈 입력 검증
        if (!username) {
            this.ui.showError('사용자명을 입력해주세요.');
            return;
        }
        
        // [3단계] 로딩 상태 설정
        this.setLoadingState(true);
        this.ui.hideAllSections();
        
        try {
            // [4단계] API 호출
            // this.api를 통해 API 클래스의 메서드 호출
            const userData = await this.api.getUserProfile(username);
            const reposData = await this.api.getUserRepos(username);
            
            // [5단계] UI 렌더링
            // this.ui를 통해 UI 클래스의 메서드 호출
            this.ui.renderProfile(userData);
            this.ui.renderStats(userData);
            this.ui.renderRepos(reposData);
            
        } catch (error) {
            // [6단계] 에러 처리
            this.handleError(error);
        } finally {
            // [7단계] 로딩 상태 해제
            this.setLoadingState(false);
        }
    }

    /**
     * 에러 처리
     * 
     * @param {Object} error - 에러 객체
     */
    handleError(error) {
        let message = '오류가 발생했습니다. 다시 시도해주세요.';
        
        if (error.status === 404) {
            message = error.message;
        } else if (error.status === 403) {
            message = error.message;
        } else if (error.message) {
            message = error.message;
        } else if (error.name === 'TypeError') {
            message = '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
        }
        
        this.ui.showError(message);
    }

    /**
     * 로딩 상태 토글
     * 
     * @param {boolean} isLoading - 로딩 중 여부
     */
    setLoadingState(isLoading) {
        this.searchBtn.disabled = isLoading;
        this.searchInput.disabled = isLoading;
        
        if (isLoading) {
            this.searchBtn.textContent = '⏳';
        } else {
            this.searchBtn.textContent = '🔍';
        }
    }
}

// ===== 앱 시작 =====
/**
 * 앱 초기화
 * 
 * [인스턴스 생성]
 * - new GitHubFinder()를 호출하면:
 *   1. GitHubFinder 생성자 실행
 *   2. GitHubAPI 인스턴스 생성
 *   3. UIRenderer 인스턴스 생성
 *   4. 이벤트 리스너 등록
 *   5. 앱 사용 준비 완료!
 * 
 * [절차적 방식과의 차이]
 * - 절차적: 함수들이 전역 스코프에 흩어져 있음
 * - OOP: 모든 것이 app 객체 안에 캡슐화됨
 */
const app = new GitHubFinder();

/*
 * ============================================
 * OOP vs 절차적 방식 비교
 * ============================================
 * 
 * [절차적 방식 (script.js)]
 * - 함수 중심
 * - 전역 변수 사용
 * - 함수들이 독립적으로 존재
 * 
 * 예시:
 * const searchBtn = document.getElementById('searchBtn');
 * function handleSearch() { ... }
 * searchBtn.addEventListener('click', handleSearch);
 * 
 * [OOP 방식 (script-oop.js)]
 * - 클래스 중심
 * - 객체의 속성으로 관리
 * - 관련 기능을 클래스로 묶음
 * 
 * 예시:
 * class GitHubFinder {
 *   constructor() {
 *     this.searchBtn = document.getElementById('searchBtn');
 *     this.searchBtn.addEventListener('click', () => this.handleSearch());
 *   }
 *   handleSearch() { ... }
 * }
 * 
 * [언제 OOP를 사용할까?]
 * ✅ 대규모 프로젝트
 * ✅ 여러 개발자 협업
 * ✅ 코드 재사용이 많은 경우
 * ✅ 유지보수가 중요한 경우
 * 
 * [언제 절차적 방식을 사용할까?]
 * ✅ 작은 프로젝트
 * ✅ 빠른 프로토타입
 * ✅ 간단한 스크립트
 * ✅ 초보자 학습용
 */
