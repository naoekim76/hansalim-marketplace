# 2. 데이터 구조 및 작성 방법에 대하여 (About Data Structure and Creation Method)

### 2.1 데이터 구조 개요 (Data Structure Overview)
AUIGrid primarily uses JSON-based one-dimensional object array data. It can also process and use tree structures, XML, and CSV data. Each data item represents a row, and the property name of the object must match the `dataField` setting of the grid column.

### 2.2 JSON 데이터 구조 (기본) (JSON Data Structure (Basic))
```json
[
  { "id": 1, "name": "홍길동", "product": "iPhone", "price": 1200000 },
  { "id": 2, "name": "김영희", "product": "Galaxy", "price": 950000 }
]
```
**구조 설명 (Structure Description)**
*   Array form where each object is a row.
*   Uses key values corresponding to `dataField` defined in the grid column layout.

**AUIGrid 컬럼 레이아웃 설정 예시 (AUIGrid Column Layout Setting Example)**
```javascript
// 그리드 칼럼 레이아웃 설정
const columnLayout = [
  { dataField: "id", headerText: "ID" },
  { dataField: "name", headerText: "이름" },
  { dataField: "product", headerText: "제품" },
  { dataField: "price", headerText: "가격", dataType: "numeric" }
];
```

### 2.3 XML 데이터 구조 (XML Data Structure)
```xml
<rows>
  <row>
    <id>1</id>
    <name>홍길동</name>
    <product>iPhone</product>
    <price>1200000</price>
  </row>
  <row>
    <id>2</id>
    <name>김영희</name>
    <product>Galaxy</product>
    <price>950000</price>
  </row>
</rows>
```
**주의사항 (Note):** AUIGrid does not directly process XML. It converts XML to JSON using `DOMParser` in the browser before use. Therefore, JSON offers superior performance.

### 2.4 CSV 데이터 구조 (CSV Data Structure)
```
id,name,product,price
1,홍길동,iPhone,1200000
2,김영희,Galaxy,950000
```
**주의사항 (Note):** AUIGrid parses CSV strings and converts them into a JSON array before use. Therefore, JSON offers superior performance.

### 2.5 트리(Tree)형 JSON 구조 (Tree-type JSON Structure)
```json
[
  {
    "name": "관리부",
    "manager": "홍길동",
    "children": [
      { "name": "총무팀", "manager": "김철수" },
      { "name": "회계팀", "manager": "이영희" }
    ]
  }
]
```
**참고 사항 (Reference):** If the data inserted into AUIGrid has a hierarchical data structure with `children`, the grid will display a hierarchical tree grid without additional settings.

If you want to represent general one-dimensional object array data as a hierarchical data structure, you must set three properties.

**트리 뷰 속성 설정 예시 (Tree View Property Setting Example)**
```javascript
// 그리드 속성 설정
const gridProps = {
  // 일반 데이터를 트리로 표현할지 여부(treeIdField, treeIdRefField 설정 필수)
  flat2tree: true,
  // 트리의 고유 필드명
  treeIdField: "id",
  // 계층 구조에서 내 부모 행의 treeIdField 참고 필드명
  treeIdRefField: "parent"
};
```

### 2.6 데이터 유형별 특징 요약 (Summary of Data Type Characteristics)

| 형식 (Format) | 사용 권장도 (Recommendation) | 특징 (Characteristics) | 처리 방식 (Processing Method) |
| :------------ | :--------------------------- | :--------------------- | :---------------------------- |
| JSON          | 매우 우수 (Excellent)        | AUIGrid 표준 형식      | 바로 사용 가능 (Directly usable) |
| XML           | 일반 (General)               | 구조 명확, 브라우저 파싱 필요 | JSON으로 변환 필요 (Needs conversion to JSON) |
| CSV           | 일반 (General)               | 단순 구조, 라인 기반   | 문자열 파싱 후 JSON 변환 필요 (Needs string parsing and JSON conversion) |

### 2.7 데이터 속성별 주의사항 (Notes by Data Property)

| dataType | 설명 (Description) | 정렬 기준 (Sort Standard) | 예시 (Example) |
| :------- | :----------------- | :------------------------ | :------------- |
| string   | 문자열             | 알파벳 순                 | "홍길동"       |
| numeric  | 숫자               | 숫자 크기                 | 1000, 3500     |
| date     | 날짜               | 날짜 순서                 | "2024-01-01"   |
| boolean  | 참/거짓            | false 우선                | false, true    |

💡 **TIP:** For real-time integration, REST API or `fetch`/`ajax` using JSON structure is recommended.[1]

Sources:
[1] 2. 데이터 구조 및 작성 방법에 대하여 - AUIGrid Documentation (https://www.auisoft.net/documentation/auigrid/Desc/data-desc.html)
