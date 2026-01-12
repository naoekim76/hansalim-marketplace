# 올바른 Import 패턴

## 주의사항

**Java 17 환경에서 빌드 에러 발생 이력**:
- 잘못된 import로 인한 빌드 실패
- Lombok 1.18.24 → 1.18.30 업그레이드 필요 (Java 17+ 호환성)

## Service.java 올바른 Import

### ✅ 올바른 패턴

```java
package hslim2.portal.func.{업무코드}.{하위모듈}.service;

import fo.core.dataaccess.CommonDao;
import fo.core.model.FrameOneDataset;
import fo.core.model.Parameters;
import fo.core.model.factory.ParametersFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
```

### ❌ 잘못된 패턴 (절대 사용 금지)

```java
// 잘못된 import 예시
import fo.core.dataset.FrameOneDataset;  // ❌ 틀림!
import hslim2.portal.common.dao.CommonDao; // ❌ 틀림!
```

## Service.java 올바른 DAO 사용 패턴

### ✅ 올바른 패턴

```java
@Service
public class {화면ID}Service {

    private static final String DS_SEARCH = "ds_search";

    @Autowired
    private CommonDao commonDao;  // ✅ commonDao 사용

    public Parameters get{화면ID}(Parameters inParams) {
        Parameters outParams = ParametersFactory.createParameters(inParams);

        // ✅ commonDao.selectDataset() 사용
        outParams.setFrameOneDataset(DS_SEARCH, commonDao.selectDataset("{화면ID}.selectList", inParams));

        return outParams;
    }
}
```

### ❌ 잘못된 패턴

```java
@Autowired
private CommonDao dao; // ❌ dao 대신 commonDao 사용

// ❌ 잘못된 메서드들
FrameOneDataset ds = dao.selectList(...);  // selectList() 대신 selectDataset() 사용
outParams.setDataset("ds_search", ds);     // setDataset() 대신 setFrameOneDataset() 사용
```

## Controller.java 올바른 Import

### ✅ 올바른 패턴

```java
package hslim2.portal.func.{업무코드}.{하위모듈}.controller;

import fo.core.common.FrameOneConstants;
import fo.core.model.Parameters;
import fo.core.model.ParametersAndView;
import fo.core.model.factory.ParametersFactory;
import hslim2.portal.func.{업무코드}.{하위모듈}.service.{화면ID}Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
```

## Controller.java 올바른 ViewName 설정

### ✅ 올바른 패턴

**ViewName 설정 시 반드시 `VIEW_PREFIX_CONTENTS` 사용**:
```java
@RequestMapping("/page")
public ParametersAndView page(Parameters inParams) {
    ParametersAndView pav = new ParametersAndView();
    // ✅ 올바른 패턴: VIEW_PREFIX_CONTENTS + "portal/{업무코드}/{하위모듈}/{화면ID}"
    pav.setViewName(FrameOneConstants.VIEW_PREFIX_CONTENTS + "portal/{업무코드}/{하위모듈}/{화면ID}");
    return pav;
}

// 예시:
pav.setViewName(FrameOneConstants.VIEW_PREFIX_CONTENTS + "portal/hr/co/HROrgInfo");
```

### ❌ 잘못된 패턴 (절대 사용 금지)

```java
// ❌ TILES_PREFIX는 존재하지 않음!
pav.setViewName(FrameOneConstants.TILES_PREFIX + "hr/co/HROrgInfo");  // 컴파일 에러 발생!

// ❌ portal/ 경로 누락
pav.setViewName(FrameOneConstants.VIEW_PREFIX_CONTENTS + "hr/co/HROrgInfo");  // JSP 찾기 실패
```

**중요**:
- 반드시 `VIEW_PREFIX_CONTENTS` 상수 사용
- 경로는 `"portal/{업무코드}/{하위모듈}/{화면ID}"` 형식
- `TILES_PREFIX`는 존재하지 않는 상수이므로 사용 금지

## 전체 Service.java 템플릿 (Type 1 기준)

```java
/**
 * Copyright (c) 2025 Hansalim<br>
 * All rights reserved.<br>
 */

package hslim2.portal.func.{업무코드}.{하위모듈}.service;

import fo.core.dataaccess.CommonDao;
import fo.core.model.FrameOneDataset;
import fo.core.model.Parameters;
import fo.core.model.factory.ParametersFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/******************************************************************
 * <pre>
 * <b>Description  : {화면제목} 서비스</b>
 * package  : hslim2.portal.func.{업무코드}.{하위모듈}.service
 * </pre>
 *
 * @author   : Claude Code
 * @version  : 1.0
 * <pre>
 * Modification Information
 *    수정일            수정자                   수정내용
 * ------------   ------------------   ----------------------------
 *  {생성일자}    Claude Code          최초생성
 * </pre>
 * *******************************************************************/

@Service
public class {화면ID}Service {

    private static final String DS_SEARCH = "ds_search";

    @Autowired
    private CommonDao commonDao;

    /**
     * {화면제목} 목록 조회<br>
     * @param inParams 입력 파라미터 (검색 조건)
     * @return Parameters 조회 결과 데이터셋
     */
    public Parameters get{화면ID}(Parameters inParams) {
        Parameters outParams = ParametersFactory.createParameters(inParams);

        // {화면제목} 목록 조회
        outParams.setFrameOneDataset(DS_SEARCH, commonDao.selectDataset("{화면ID}.selectList", inParams));

        return outParams;
    }

}
```

## 검증 체크리스트

화면 생성 시 다음 사항을 반드시 확인:

### Controller.java
- [ ] `import fo.core.common.FrameOneConstants` 사용
- [ ] `FrameOneConstants.VIEW_PREFIX_CONTENTS` 상수 사용
- [ ] ViewName 경로: `"portal/{업무코드}/{하위모듈}/{화면ID}"` 형식
- [ ] `TILES_PREFIX` 사용 금지 (존재하지 않음)

### Service.java
- [ ] `import fo.core.dataaccess.CommonDao` 사용
- [ ] `import fo.core.model.FrameOneDataset` 사용
- [ ] `private CommonDao commonDao` 변수명 사용
- [ ] `commonDao.selectDataset()` 메서드 사용
- [ ] `outParams.setFrameOneDataset()` 메서드 사용
- [ ] `private static final String DS_SEARCH = "ds_search"` 상수 선언

### 빌드 설정
- [ ] `settings.gradle`에서 Lombok 버전 1.18.30 이상 확인
- [ ] `gradle.properties`에서 Java 17 경로 설정 확인
- [ ] 빌드 전 Gradle 데몬 재시작 (`./gradlew --stop`)

## MyBatis resultType 설정

### ✅ 올바른 패턴

```xml
<select id="selectList" parameterType="Parameters" resultType="HMap">
```

### ❌ 잘못된 패턴 (절대 사용 금지)

```xml
<!-- ❌ 잘못된 예시 -->
<select id="selectList" parameterType="Parameters" resultType="DataMap">  <!-- ❌ -->
<select id="selectList" parameterType="Parameters" resultType="frameone.pframe.dataset.FrameOneRow">  <!-- ❌ -->
```

**중요**: MyBatis SQL 파일(.sqlx)에서는 반드시 `resultType="HMap"`을 사용해야 합니다.[corrected-jsp-template.md](corrected-jsp-template.md)

## 참고 샘플

올바른 패턴은 다음 샘플 파일을 참조:
- `references/type1-sample.md` - STPosGdsInqViewService.java
- 실제 프로젝트 파일: `hslim2-svc-portal/src/main/java/hslim2/portal/func/st/sa/service/STPosGdsInqViewService.java`