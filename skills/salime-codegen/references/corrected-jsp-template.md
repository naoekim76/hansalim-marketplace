# 올바른 JSP 템플릿 구조

## 프로젝트 표준 JSP 구조

한살림 프로젝트는 **특정 CSS 프레임워크 및 레이아웃 시스템**을 사용합니다.

### 필수 구조 요소

1. **DOCTYPE 및 Tiles 선언**
2. **content-wrapper gap-y-3** - 메인 컨테이너
3. **content-header** - 헤더 영역 (즐겨찾기, 제목, 도움말, 페이지 버튼)
4. **option-group p-3 grid-col-4** - 검색 옵션 영역
5. **content-container** - 메인 컨텐츠 영역
6. **ctn-contents_nav** - 그리드 타이틀 영역
7. **Tiles 기반 script 경로**

---

## Type 1 (단순 그리드) 템플릿

```jsp
<!DOCTYPE html>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!--
    @id      : {화면ID}.jsp
    @title   : {화면제목}
    @author  : Claude Code
    @version : {생성일자}
    @상세설명  : {업무코드대문자} > {하위모듈} > {화면제목}
 -->

<div class="content-wrapper gap-y-3">
    <header class="content-header">
        <section class="p-3 xy-between">
            <div class="xy-center">
                <button type="button" class="btn-favToggle mr-1"><i class="icon-m favorite"></i><em class="sr-only">즐겨찾기</em></button>
                <h1 class="content-header--title" id="pageTitle"></h1>
                <button type="button" class="ctn-btn-sm ctn-btn--secondary text-xs ml-1" id="titleHelp" name="titleHelp">도움말</button>
            </div>
            <div class="control-bar page-button" id="pageButton"></div>
        </section>
        <!----------------------- 업무영역 start     ------------------->
        <form name="searchForm" id="searchForm" method="post" action="" onsubmit="return false" data-oldheight="90">
            <section class="option-group p-3 grid-col-4">
                <!-- 검색 조건 1 -->
                <div class="option">
                    <label for="SEARCH_PARAM1" class="label">검색조건1</label>
                    <input type="text" class="option-input w-ch-10" name="SEARCH_PARAM1" id="SEARCH_PARAM1" maxlength="50">
                </div>
                <!-- 검색 조건 2 -->
                <div class="option">
                    <label for="SEARCH_PARAM2" class="label">검색조건2</label>
                    <input type="text" class="option-input w-ch-10" name="SEARCH_PARAM2" id="SEARCH_PARAM2" maxlength="50">
                </div>
            </section>
        </form>
        <!----------------------- 업무영역 end     ------------------->
    </header>
    <!----------------------- 메인 content start     ------------------->
    <main class="content-container">
        <!---- 첫번째 섹션 ---->
        <section class="flex-1 table-y">
            <nav class="ctn-contents_nav">
                <div class="xy-center">
                    <h2 class="ctn-contents_title mr-2-5">{화면제목} 목록</h2>
                    <span id="master_cnt" class="badge badge-secondary">0건</span>
                </div>
            </nav>
            <div id="grid-box" class="h-full">
                <div id="divGrdMst" class="table-wrapper h-full"></div>
            </div>
        </section>
    </main>
    <!----------------------- 메인 content end     ------------------->
</div>

<script type="text/javascript" src="${staticPath}/{업무코드}/{하위모듈}/<tiles:getAsString name='contents_name' />.js"></script>
```

---

## 주요 CSS 클래스 설명

### 레이아웃 클래스
- `content-wrapper gap-y-3` - 메인 래퍼 (세로 간격 포함)
- `content-header` - 헤더 영역
- `content-container` - 메인 컨텐츠 컨테이너
- `p-3` - padding 3
- `xy-between` - flex justify-between align-center
- `xy-center` - flex justify-center align-center

### 검색 영역 클래스
- `option-group` - 검색 옵션 그룹
- `grid-col-4` - 4컬럼 그리드 레이아웃
- `option` - 개별 옵션 아이템
- `label` - 라벨
- `option-input` - 입력 필드
- `w-ch-10` - 너비 10자

### 버튼 클래스
- `btn-favToggle` - 즐겨찾기 토글 버튼
- `ctn-btn-sm` - 작은 버튼
- `ctn-btn--secondary` - 보조 버튼
- `control-bar` - 컨트롤 바
- `page-button` - 페이지 버튼 영역

### 그리드 영역 클래스
- `flex-1 table-y` - flex 1, 세로 테이블 레이아웃
- `ctn-contents_nav` - 컨텐츠 네비게이션
- `ctn-contents_title` - 컨텐츠 제목
- `badge badge-secondary` - 뱃지 (건수 표시)
- `table-wrapper` - 테이블 래퍼
- `h-full` - height 100%

---

## 검색 조건 입력 타입별 예시

### 1. 텍스트 입력
```html
<div class="option">
    <label for="FIELD_NAME" class="label">필드명</label>
    <input type="text" class="option-input w-ch-10" name="FIELD_NAME" id="FIELD_NAME" maxlength="50">
</div>
```

### 2. 셀렉트 박스
```html
<div class="option">
    <label for="FIELD_NAME" class="label">필드명</label>
    <select class="option-input w-ch-5" name="FIELD_NAME" id="FIELD_NAME">
        <option value="">전체</option>
    </select>
</div>
```

### 3. 필수 입력 (별표 표시)
```html
<div class="option">
    <label for="FIELD_NAME" class="label"><i class="asterisk">*</i>필드명</label>
    <input type="text" class="option-input w-ch-10" name="FIELD_NAME" id="FIELD_NAME" required>
</div>
```

### 4. 팝업 버튼 포함
```html
<div class="option">
    <label for="GDS_CD" class="label">물품</label>
    <div class="flex">
        <input type="text" class="option-input w-ch-3" name="GDS_CD" id="GDS_CD" maxlength="10">
        <button type="button" id="GDS_CD_BTN" onclick="openPopup('S', 'pop', 'GI01')">
            <i class="icon search"></i>
        </button>
    </div>
    <input type="text" class="option-input w-ch-5" name="GDS_NM" id="GDS_NM" readonly>
</div>
```

---

## 잘못된 패턴 (절대 사용 금지)

### ❌ 잘못된 구조
```html
<!-- ❌ 틀린 예시 -->
<div class="content-wrapper">  <!-- gap-y-3 누락 -->
    <div class="content-header">  <!-- section 구조 누락 -->
        <h2>제목</h2>  <!-- 즐겨찾기, 도움말 버튼 누락 -->
    </div>

    <div class="search-area">  <!-- option-group 대신 잘못된 클래스 -->
        <table class="search-table">  <!-- table 구조 사용 금지 -->
            ...
        </table>
    </div>

    <div class="grid-area">  <!-- content-container 구조 누락 -->
        ...
    </div>
</div>

<script src="/static/path/script.js"></script>  <!-- Tiles 사용 안 함 -->
```

---

## Script 경로 패턴

### ✅ 올바른 패턴 (Tiles 사용)
```html
<script type="text/javascript" src="${staticPath}/{업무코드}/{하위모듈}/<tiles:getAsString name='contents_name' />.js"></script>
```

### 예시
- HR/co 모듈: `${staticPath}/hr/co/<tiles:getAsString name='contents_name' />.js`
- PD/rg 모듈: `${staticPath}/pd/rg/<tiles:getAsString name='contents_name' />.js`
- ST/sa 모듈: `${staticPath}/st/sa/<tiles:getAsString name='contents_name' />.js`

---

## 검증 체크리스트

JSP 생성 시 다음 사항을 반드시 확인:

- [ ] `<!DOCTYPE html>` 선언
- [ ] `<%@ taglib prefix="tiles" %>` 선언
- [ ] `content-wrapper gap-y-3` 클래스 사용
- [ ] `content-header` > `section p-3 xy-between` 구조
- [ ] 즐겨찾기 버튼, 제목, 도움말 버튼 포함
- [ ] `option-group p-3 grid-col-4` 검색 영역
- [ ] `content-container` > `section flex-1 table-y` 그리드 영역
- [ ] `ctn-contents_nav` 그리드 타이틀 영역
- [ ] `${staticPath}` 및 Tiles 기반 script 경로
- [ ] 한글 주석 (`@상세설명`) 포함

---

## 참고

- 실제 샘플: `hslim2-svc-portal/src/main/resources/META-INF/resources/WEB-INF/jsp/portal/st/sa/STPosGdsInqView.jsp`
- CSS 프레임워크: 프로젝트 커스텀 Tailwind 기반 유틸리티 클래스
- 레이아웃 시스템: Apache Tiles 3.0.8