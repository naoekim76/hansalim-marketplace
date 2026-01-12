---
name: salime-auigrid
description: AUIGrid 상용 그리드 라이브러리 사용법 검색 및 화면 그리드 코드 수정 지원. "그리드 스킬", "AUIGrid 스킬", "그리드 사용법", "그리드 검색", "그리드 기능" 키워드 시 사용. 컬럼 설정, 렌더러, 이벤트, property, methods 등 그리드 관련 모든 기능 지원.
---

# AUIGrid 사용법 가이드

## 개요

한살림 통합정보 시스템(HSLIM2)에서 사용하는 AUIGrid 상용 그리드 라이브러리의 사용법을 빠르게 검색하고, 화면의 그리드 관련 코드를 수정하는 것을 지원한다.

**주요 기능:**
1. AUIGrid 사용법 검색 및 설명 (컬럼, 렌더러, 이벤트, property, methods 등)
2. 프로젝트 표준 패턴에 맞는 실제 예제 코드 제공
3. 화면의 그리드 코드 자동 수정 및 검토

## 워크플로우 결정 트리

사용자 요청을 다음과 같이 분류하여 처리한다:

```
사용자 요청
    │
    ├─ "~사용법 알려줘" / "~어떻게 해?" → [그리드 사용법 조회]
    │
    └─ "~추가해줘" / "~수정해줘" / "~적용해줘" → [그리드 코드 수정]
```

## 그리드 사용법 조회

사용자가 AUIGrid 기능의 사용법을 문의할 때 사용한다.

### 단계 1: 매뉴얼 검색

사용자 요청에서 키워드를 추출하고, references 폴더의 매뉴얼 파일에서 관련 내용을 검색한다.

**매뉴얼 파일:** 스킬의 `references/` 폴더에 위치

| 파일명 | 내용 | 검색 키워드 예시 |
|--------|------|-----------------|
| `ColumnLayout.md` | 컬럼 레이아웃 설정 | dataField, headerText, width, renderer, editRenderer |
| `Events.md` | 그리드 이벤트 | cellClick, cellDoubleClick, selectionChange, addRow |
| `Methods.md` | 그리드 메서드 | addRow, removeRow, updateRow, getGridData |
| `Properties.md` | 그리드 속성 | editable, showRowNumColumn, enableCellMerge |
| `StaticUtils.md` | 정적 유틸리티 | AUIGrid.bind, AUIGrid.create |
| `Desc.md` | 일반 설명 | 기본 개념, 용어 설명 |
| `Footer.md` | 푸터 설정 | footer, footerLayout |

**검색 방법:**
```bash
# Grep tool 사용 - references 폴더 내에서 검색
Grep(pattern="cellClick", path="references/Events.md")
Grep(pattern="CheckBoxEditRenderer", path="references/ColumnLayout.md")
```

### 단계 2: 프로젝트 예제 참조

매뉴얼 검색 후, references 폴더의 실제 프로젝트 예제를 함께 제공한다.

**참조 파일:**
1. **그리드 공통 함수:** `references/grid-common.js`
2. **예제 화면:** `references/example_screen.js`

### 단계 3: 설명 제공

검색된 매뉴얼 내용과 프로젝트 예제를 바탕으로 설명을 제공한다.

## 그리드 코드 수정

사용자가 화면의 그리드 기능을 추가/수정/삭제 요청할 때 사용한다.

### 단계 1: 기능 사용법 검색

[그리드 사용법 조회]와 동일한 방법으로 해당 기능의 사용법을 먼저 검색한다.

### 단계 2: 대상 파일 읽기

수정할 화면의 JavaScript 파일과 JSP 파일을 읽는다.

### 단계 2.5: CSS 스타일 확인 (조건부)

**CSS 스타일이 필요한 경우 (예: styleFunction 사용 시) 다음 순서로 확인:**

1. **기존 CSS 파일 검색**
   - `fo-lib-static/src/main/resources/css/contents.css`
   - `fo-lib-static/src/main/resources/css/layout.css`
   - `fo-lib-static/src/main/resources/css/main.css`

2. **Grep tool을 사용하여 필요한 스타일 클래스 검색**
   ```bash
   Grep(pattern="클래스명", path="fo-lib-static/src/main/resources/css/")
   ```

3. **결과에 따른 처리**
   - **스타일 클래스가 이미 존재:** 해당 클래스를 JavaScript 코드에서 사용
   - **스타일 클래스가 없음:** JSP 파일에 새로운 `<style>` 태그 추가

4. **검색할 스타일 키워드 예시**
   - 배경색: `background`, `bg`, 색상명 (예: `pink`, `red`)
   - 텍스트색: `color`, `text-color`
   - 기타: 원하는 스타일 속성명

### 단계 3: 코드 수정

references 폴더의 예제를 참조하여 프로젝트 표준 패턴에 맞춰 코드를 수정한다.

**CSS 스타일 추가 시 원칙:**
- 기존 CSS 파일에 적합한 스타일이 있으면 재사용
- 없는 경우에만 JSP 파일에 새로운 스타일 정의
- 스타일 클래스명은 명확하고 재사용 가능하도록 작성

### 단계 4: 변경 사항 검토

수정된 코드를 요약하고 사용자 확인을 요청한다.

## 자주 사용하는 패턴

### 1. 체크박스 컬럼

```javascript
{
    dataField: "useYn",
    headerText: "사용여부",
    width: 80,
    renderer: {
        type: "CheckBoxEditRenderer",
        checkValue: "Y",
        unCheckValue: "N",
        editable: true
    }
}
```

### 2. 날짜 컬럼

```javascript
{
    dataField: "regDt",
    headerText: "등록일",
    width: 100,
    dataType: "date",
    formatString: "yyyy-mm-dd"
}
```

### 3. 셀 클릭 이벤트

```javascript
AUIGrid.bind(myGridID, "cellClick", function(event) {
    var item = event.item;
    console.log("클릭한 데이터:", item);
});
```

## Resources

이 스킬은 references 폴더에 다음과 같은 참조 파일들을 포함한다:

### AUIGrid 매뉴얼
- `ColumnLayout.md` - 컬럼 레이아웃 설정
- `Events.md` - 이벤트
- `Methods.md` - 메서드
- `Properties.md` - 속성
- `StaticUtils.md` - 정적 유틸리티
- `Desc.md` - 일반 설명
- `Footer.md` - 푸터 설정

### 프로젝트 참조 파일
- `grid-common.js` - 한살림 프로젝트의 그리드 공통 함수
- `example_screen.js` - 실제 화면 예제

## 사용 예시

### 예시 1: 사용법 조회
"그리드 스킬을 사용해서 CheckBoxEditRenderer 사용법 알려줘"

### 예시 2: 코드 수정
"STAutoOrdrStorMgnt 화면의 그리드에 날짜 컬럼 추가해줘"

### 예시 3: 이벤트 추가
"그리드 더블클릭 이벤트 처리 방법 검색해줘"

## 주의사항

1. **references 폴더 우선 참조:** 모든 매뉴얼과 예제는 스킬의 references 폴더에서 검색한다.
2. **파일 읽기 필수:** 코드 수정 전에 반드시 Read tool로 대상 파일을 읽어야 한다.
3. **프로젝트 패턴 준수:** references/grid-common.js의 공통 함수를 우선 활용한다.
4. **인코딩:** 모든 파일은 UTF-8 인코딩을 사용한다.
5. **CSS 스타일 재사용 우선:** JSP에 새 스타일을 추가하기 전에 반드시 기존 CSS 파일(`contents.css`, `layout.css`, `main.css`)을 Grep으로 검색하여 재사용 가능한 스타일이 있는지 확인한다.
