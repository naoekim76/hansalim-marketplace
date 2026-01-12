---
name: salime-codegen
description: 한살림 통합정보시스템(HSLIM2) 업무 화면 5-파일 구조 자동 생성. Python 템플릿 기반으로 토큰 사용 최소화. "살림이 화면 개발", "살림이 코드 생성" 요청 시 자동 생성.
---

# 한살림 업무 화면 자동 생성 (Template-Based)

## 목적

Python + Jinja2 템플릿 기반으로 5-파일 구조 자동 생성하여 토큰 사용 80% 절감

**생성 파일**: Controller.java, Service.java, JSP, JavaScript, MyBatis SQL

## 워크플로우

### 1. 정보 수집 → JSON 변환

사용자 입력을 JSON 형식으로 변환:
- business_module (hr, pd, st 등)
- screen_id (HROrgInfo 등)
- sub_module (co, rg 등)
- screen_title (부서조회 등)
- crud_type (R, CR, CRU, CRUD 등 - 기본값: R)
- grid_columns (컬럼 정보)
- search_fields (검색 조건)
- tables (테이블 및 JOIN 조건)

### 2. Python 스크립트 실행

**IMPORTANT**: 코드 내용을 읽지 말고 단순 실행만 할 것

```bash
python C:/Users/naoek/.claude/skills/salime-codegen/generate_salime_code.py '<json_string>'
```

### 3. 결과 확인 및 보고

스크립트가 5개 파일을 자동 생성하고 경로 출력

## 사용 예시

```
사용자: "살림이 코드 생성해줘.
# 화면 유형 : Type1
# 업무 모듈 : HR
# 화면 ID : HROrgInfo
# 하위 모듈 : co
# 화면 제목 : 부서조회
# 그리드 표시 : blng_nm(소속명), org_nm(부서명)
# 검색 조건 : blng_nm, org_nm"
# CRUD 유형 : R

Claude: [JSON 변환 → Python 실행 → 결과 보고]
```

## JSON 형식 예시

```json
{
  "business_module": "hr",
  "screen_id": "HROrgInfo",
  "sub_module": "co",
  "screen_title": "부서조회",
  "tables": ["HR_ORG_M", {"name": "SA_BLNG_I", "join_condition": "SBI.BLNG_CD = HOM.BLNG_CD"}],
  "grid_columns": [
    {
      "field": "BLNG_NM",
      "header": "소속명",
      "width": 150,
      "align": "left",
      "dataType": "string",
      "sql_field": "SBI.BLNG_NM"
    },
    {
      "field": "USE_YN",
      "header": "사용여부",
      "width": 80,
      "align": "center",
      "dataType": "string",
      "renderer": {
        "type": "CheckBoxEditRenderer",
        "checkValue": "Y",
        "unCheckValue": "N",
        "editable": true
      }
    }
  ],
  "search_fields": [
    {
      "field": "blng_nm",
      "label": "소속명",
      "type": "text",
      "sql_condition": "SBI.BLNG_NM LIKE '%' || #{blng_nm} || '%'"
    }
  ]
}
```

## 그리드 컬럼 Renderer 타입

그리드 컬럼에서 특수한 렌더링이 필요한 경우 `renderer` 속성을 사용할 수 있습니다:

### CheckBoxEditRenderer (체크박스)
```json
{
  "field": "USE_YN",
  "header": "사용여부",
  "width": 80,
  "align": "center",
  "dataType": "string",
  "renderer": {
    "type": "CheckBoxEditRenderer",
    "checkValue": "Y",
    "unCheckValue": "N",
    "editable": true
  }
}
```

### 기타 Renderer 타입
- **ImageRenderer**: 이미지 표시
- **LinkRenderer**: 링크 표시
- **TemplateRenderer**: 커스텀 템플릿
- **DropDownListRenderer**: 드롭다운 목록

## 경로 및 파일

**스크립트**: `C:/Users/naoek/.claude/skills/salime-codegen/generate_salime_code.py`

**템플릿**: `C:/Users/naoek/.claude/skills/salime-codegen/templates/`
- Controller.java.j2
- Service.java.j2
- View.jsp.j2
- Script.js.j2
- Mapper.sqlx.j2

**생성 위치**: `{현재 작업 디렉토리}/hslim2-svc-portal/src/main/`
- 기본적으로 스크립트 실행 시 현재 작업 디렉토리를 프로젝트 루트로 사용
- 환경 변수 `SALIME_PROJECT_ROOT`로 경로 오버라이드 가능

## CRUD 유형 (crud_type)

CRUD 기능을 선택적으로 생성할 수 있습니다:

- **R** (기본값): Read (조회만)
  - Controller: `/page`, `/search`
  - 그리드: editable=false

- **CR**: Create + Read (생성 + 조회)
  - Controller: `/page`, `/search`, `/save`
  - 그리드: editable=true, 행추가 버튼
  - SQL: INSERT

- **CRU**: Create + Read + Update (생성 + 조회 + 수정)
  - Controller: `/page`, `/search`, `/save`
  - 그리드: editable=true, 행추가 버튼
  - SQL: INSERT, UPDATE

- **CRUD**: Create + Read + Update + Delete (전체)
  - Controller: `/page`, `/search`, `/save`
  - 그리드: editable=true, 행추가/행삭제 버튼
  - SQL: INSERT, UPDATE, DELETE

### CRUD 예제

```
사용자: "살림이 코드 생성해줘.
# 업무 모듈 : HR
# 화면 ID : HRDeptMgnt
# 하위 모듈 : co
# 화면 제목 : 부서관리
# CRUD 유형 : CRUD
# 그리드 표시 : dept_cd(부서코드), dept_nm(부서명), use_yn(사용여부)
# 검색 조건 : dept_nm"

생성 결과:
- 조회 기능 + 행추가/삭제 버튼
- 그리드 편집 가능
- INSERT, UPDATE, DELETE SQL
```

## 주의사항

### 템플릿 표준 준수 (자동 적용)

- ✅ Controller: `VIEW_PREFIX_CONTENTS` 사용
- ✅ Service: `CommonDao`, `FrameOneDataset` Import
- ✅ JSP: `content-wrapper gap-y-3`, `option-group` 구조
- ✅ UTF-8 인코딩, 한글 주석

## UI 유형 (ui_type)

화면 구조에 따라 type1 또는 type2를 선택할 수 있습니다:

### **Type1: 단순 조회 또는 인라인 편집**
- **구조**: 검색 조건 + 단일 그리드
- **레이아웃**: `content-container` (단일 영역)
- **용도**: 조회 전용 또는 그리드 인라인 편집
- **예**: HRCoCdMgnt (인사공통코드조회)

### **Type2: 마스터-디테일 관리형**
- **구조**: 마스터 그리드 + 상세 정보 폼
- **레이아웃**: 
  - 좌우 분할 (`table-x`): 마스터 그리드(좌) + 상세 폼(우)
  - 상하 분할 (`table-y`): 마스터 그리드(상) + 상세 폼(하)
- **용도**: CRUD 전체, 복잡한 폼 입력
- **참조 화면**: STStorInfoRegMgnt (매장정보등록관리), ACDntnFndStgupRegMgnt (기부금조성등록관리)

## Type2 전용 파라미터

Type2 화면 생성 시 다음 파라미터를 추가로 지정할 수 있습니다:

### layout_type (레이아웃 방향)
- **horizontal** (기본값): 좌우 분할
- **vertical**: 상하 분할

### master_grid_flex (마스터 그리드 비율)
- **flex-one**: 1/3 비율
- **flex-two**: 2/5 비율

### detail_form_flex (상세 폼 비율)
- **flex-two**: 2/5 비율 (기본값)
- **flex-three**: 3/5 비율

### detail_sections (상세 정보 섹션 구성)
상세 폼을 여러 섹션으로 구성할 수 있습니다:

```json
"detail_sections": [
  {
    "title": "기본정보",
    "grid_class": "grid-col-2",
    "fields": [
      {
        "field": "DEPT_CD",
        "label": "부서코드",
        "type": "text",
        "required": true,
        "span": null
      },
      {
        "field": "DEPT_NM",
        "label": "부서명",
        "type": "text",
        "required": true
      }
    ]
  }
]
```

**field 타입**:
- `text`: 텍스트 입력
- `select`: 드롭다운 선택
- `date`: 날짜 선택
- `checkbox`: 체크박스

## Type2 사용 예시

```
사용자: "살림이 코드 생성해줘.
# UI 유형 : type2
# 레이아웃 : horizontal (좌우 분할)
# 업무 모듈 : HR
# 화면 ID : HRDeptMgnt
# 하위 모듈 : co
# 화면 제목 : 부서관리
# CRUD 유형 : CRUD
# 마스터 그리드 : dept_cd(부서코드), dept_nm(부서명), use_yn(사용여부)
# 검색 조건 : dept_nm
# 상세 섹션 : 기본정보 (dept_cd, dept_nm, use_yn, reg_dt)"

Claude: [JSON 변환 → Python 실행 → 결과 보고]
```

## Type2 JSON 예시

```json
{
  "business_module": "hr",
  "screen_id": "HRDeptMgnt",
  "sub_module": "co",
  "screen_title": "부서관리",
  "ui_type": "type2",
  "crud_type": "CRUD",
  "layout_type": "horizontal",
  "master_grid_flex": "flex-one",
  "detail_form_flex": "flex-two",
  "tables": ["HR_DEPT_M"],
  "grid_columns": [
    {
      "field": "DEPT_CD",
      "header": "부서코드",
      "width": 120,
      "align": "center",
      "dataType": "string"
    },
    {
      "field": "DEPT_NM",
      "header": "부서명",
      "width": 200,
      "align": "left",
      "dataType": "string"
    }
  ],
  "search_fields": [
    {
      "field": "dept_nm",
      "label": "부서명",
      "type": "text"
    }
  ],
  "detail_sections": [
    {
      "title": "기본정보",
      "grid_class": "grid-col-2",
      "fields": [
        {
          "field": "DEPT_CD",
          "label": "부서코드",
          "type": "text",
          "required": true
        },
        {
          "field": "DEPT_NM",
          "label": "부서명",
          "type": "text",
          "required": true
        },
        {
          "field": "USE_YN",
          "label": "사용여부",
          "type": "checkbox",
          "required": false
        },
        {
          "field": "REG_DT",
          "label": "등록일자",
          "type": "date",
          "required": false
        }
      ]
    }
  ]
}
```


### **Type3: 그리드 + 상세 폼 (버튼 기반 CRUD)**
- **구조**: 그리드 (좌) + 상세 정보 폼 (우)
- **레이아웃**: 좌우 분할 (`table-x`): 그리드 (flex-one) + 상세 폼 (flex-three)
- **용도**: 그리드 선택 → 상세 폼 표시/수정, 신규/저장/삭제 버튼 기반 CRUD
- **참조 화면**: STStorInfoRegMgnt (매장정보등록관리)
- **주요 기능**:
  - **검색**: 검색 조건으로 그리드 데이터 조회
  - **그리드 선택**: 행 선택 시 우측 상세 폼에 데이터 로드
  - **신규**: 상세 폼 초기화, 신규 데이터 입력 → 저장
  - **저장**: 상세 폼 데이터 INSERT/UPDATE
  - **삭제**: 선택된 행 데이터 삭제
  - **권한 버튼**: 검색, 신규, 저장, 삭제 버튼은 우측 상단 pageButton 영역에 표시

## Type3 전용 파라미터

Type3 화면 생성 시 다음 파라미터를 추가로 지정할 수 있습니다:[Mapper.sqlx.j2](templates/Mapper.sqlx.j2)

### layout_type (레이아웃 방향)
- **horizontal** (기본값): 좌우 분할 (그리드 좌측, 상세 폼 우측)
- **vertical**: 상하 분할 (그리드 상단, 상세 폼 하단)

### master_grid_flex (그리드 비율)
- **flex-one**: 1/4 비율 (기본값)
- **flex-two**: 2/5 비율
- **flex-three**: 3/5 비율

### detail_form_flex (상세 폼 비율)
- **flex-one**: 1/4 비율
- **flex-two**: 2/5 비율
- **flex-three**: 3/4 비율 (기본값)

### grid_columns (그리드 컬럼 정의)
Type1과 동일한 형식으로 그리드 컬럼 정의

### detail_sections (상세 정보 섹션 구성)
Type2와 동일한 형식으로 상세 폼 섹션 구성

```json
"detail_sections": [
  {
    "title": "기본정보",
    "grid_class": "grid-col-2",
    "fields": [
      {
        "field": "STOR_NO",
        "label": "매장번호",
        "type": "text",
        "required": true,
        "readonly": true
      },
      {
        "field": "STOR_NM",
        "label": "매장명",
        "type": "text",
        "required": true,
        "maxlength": 10
      },
      {
        "field": "USE_YN",
        "label": "사용여부",
        "type": "checkbox"
      }
    ]
  }
]
```

**field 타입**:
- `text`: 텍스트 입력 (readonly, maxlength 옵션 가능)
- `select`: 드롭다운 선택
- `date`: 날짜 선택
- `checkbox`: 체크박스
- `textarea`: 텍스트 영역 (rows 옵션 가능)

## Type3 사용 예시

```
사용자: "살림이 코드 생성해줘.
# UI 유형 : type3
# 업무 모듈 : ST
# 화면 ID : STStorMgnt
# 하위 모듈 : co
# 화면 제목 : 매장관리
# 그리드 : stor_no(매장번호), stor_nm(매장명), use_yn(사용여부)
# 검색 조건 : stor_nm(매장명)
# 상세 섹션 : 기본정보 (stor_no, stor_nm, addr, tel_no, use_yn)"

Claude: [JSON 변환 → Python 실행 → 결과 보고]
```

## Type3 JSON 예시

```json
{
  "business_module": "st",
  "screen_id": "STStorMgnt",
  "sub_module": "co",
  "screen_title": "매장관리",
  "ui_type": "type3",
  "layout_type": "horizontal",
  "master_grid_flex": "flex-one",
  "detail_form_flex": "flex-three",
  "tables": ["ST_STOR_M"],
  "grid_columns": [
    {
      "field": "STOR_NO",
      "header": "매장번호",
      "width": 100,
      "align": "center",
      "dataType": "string"
    },
    {
      "field": "STOR_NM",
      "header": "매장명",
      "width": 200,
      "align": "left",
      "dataType": "string"
    },
    {
      "field": "USE_YN",
      "header": "사용여부",
      "width": 80,
      "align": "center",
      "dataType": "string",
      "renderer": {
        "type": "CheckBoxEditRenderer",
        "checkValue": "Y",
        "unCheckValue": "N",
        "editable": false
      }
    }
  ],
  "search_fields": [
    {
      "field": "stor_nm",
      "label": "매장명",
      "type": "text"
    }
  ],
  "detail_sections": [
    {
      "title": "기본정보",
      "grid_class": "grid-col-2",
      "fields": [
        {
          "field": "STOR_NO",
          "label": "매장번호",
          "type": "text",
          "required": true,
          "readonly": true
        },
        {
          "field": "STOR_NM",
          "label": "매장명",
          "type": "text",
          "required": true,
          "maxlength": 10
        },
        {
          "field": "ADDR",
          "label": "주소",
          "type": "text",
          "span": 2
        },
        {
          "field": "TEL_NO",
          "label": "전화번호",
          "type": "text"
        },
        {
          "field": "USE_YN",
          "label": "사용여부",
          "type": "checkbox"
        }
      ]
    }
  ]
}
```

## Type3 주요 특징

1. **그리드는 조회 전용** (editable=false)
2. **상세 폼에서 데이터 편집**
3. **버튼 기반 CRUD 작업**:
   - 검색: 그리드 데이터 조회
   - 신규: 폼 초기화 후 신규 데이터 입력
   - 저장: INSERT (신규) 또는 UPDATE (수정)
   - 삭제: DELETE
4. **폼 변경 감지**: 행 이동 시 변경사항 확인
5. **권한 기반 버튼 표시**: pageButton 영역에 권한에 따라 버튼 표시

