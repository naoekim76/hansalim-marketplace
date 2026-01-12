#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Type2 Script.js.j2 템플릿 생성 스크립트"""

template_content = '''/*
     @id      : {{ screen_id }}.js
     @title   : {{ screen_title }}
     @author  : {{ author }}
     @version : {{ date }}
     @상세설명  : {{ business_module_upper }} > {{ sub_module }} > {{ screen_title }}
*/

/***********************************************************/
/*            ### 전역 변수 ###                              */
/***********************************************************/

const grdMst = new gfn_gridUtil();  // 마스터 그리드
const grdDtl = new gfn_gridUtil();  // 상세 그리드

// 화면 로딩 시 작동
$(function(){
    gfn_initComponent('.content-wrapper');

    fn_initCombos();      // 콤보 초기화
    fn_initGrid();        // 그리드 초기화
    fn_initEvent();       // 이벤트 초기화
    fn_initGridEvent();   // 그리드 이벤트 초기화
});

/***********************************************************/
/*            ### 초기 함수  ###                             */
/**********************************************************/

/*
 ### 그리드 초기화 ###
*/
function fn_initGrid() {
    // 마스터 그리드
    let colModelMst = [
{% for col in grid_columns %}
        {
            dataType   : '{{ col.dataType }}',
            headerText : '{{ col.header }}',
            dataField  : '{{ col.field }}',
            width      : {{ col.width }},
            align      : '{{ col.align }}'{% if col.renderer %},
            renderer: {
                type         : '{{ col.renderer.type }}',
{% if col.renderer.type == 'CheckBoxEditRenderer' %}
                checkValue   : '{{ col.renderer.checkValue }}',
                unCheckValue : '{{ col.renderer.unCheckValue }}',
                editable     : {{ col.renderer.editable|lower }}
{% endif %}
            }
{% endif %}
        }{{ "," if not loop.last else "" }}
{% endfor %}
    ];

    let propsMst = {
        showRowNumColumn  : true,
        editable          : false,
        fillColumnSizeMode: true,
        selectFirstRow    : true,
        localStorageId    : PAGE_INFO['MENU_ID'] + "master",
    };

    grdMst.create("#divGrdMst", colModelMst, propsMst);

    // 상세 그리드
    let colModelDtl = [
{% for col in detail_grid_columns %}
        {
            dataType   : '{{ col.dataType }}',
            headerText : '{{ col.header }}',
            dataField  : '{{ col.field }}',
            width      : {{ col.width }},
            align      : '{{ col.align }}',
            editable   : {{ col.editable|default(true)|lower }},
            required   : {{ col.required|default(false)|lower }}{% if col.renderer %},
            renderer: {
                type         : '{{ col.renderer.type }}',
{% if col.renderer.type == 'CheckBoxEditRenderer' %}
                checkValue   : '{{ col.renderer.checkValue }}',
                unCheckValue : '{{ col.renderer.unCheckValue }}',
                editable     : {{ col.renderer.editable|lower }}
{% endif %}
            }
{% endif %}
        }{{ "," if not loop.last else "" }}
{% endfor %}
    ];

    let propsDtl = {
        showRowNumColumn  : true,
        editable          : {% if detail_crud_enabled %}true{% else %}false{% endif %},
        fillColumnSizeMode: true,
{% if detail_crud_enabled %}
        enterKeyColumnBase: true,
{% endif %}
        localStorageId    : PAGE_INFO['MENU_ID'] + "detail",
{% if detail_crud_enabled %}
        insertRow         : "fn_addGridDetail",
        selectionMode     : "multipleRows"
{% endif %}
    };

    grdDtl.create("#divGrdDtl", colModelDtl, propsDtl);
{% if detail_crud_enabled %}

    // 추가된 행인 경우만 에디팅 진입 허용
    grdDtl.bind("cellEditBegin", function (event) {
        return grdDtl._chkAddRowCellEditing(event, "{{ detail_grid_columns[1].field }}");
    });

    // Insert 키로 행 추가 시 기본값 설정
    grdDtl.bind("beforeInsertRow", function (e) {
        if (!e.isClipboard) {
            const selectedItem = grdMst._getRowItem();
            if (selectedItem !== undefined && selectedItem !== '') {
                return { {{ grid_columns[0].field }}: selectedItem.{{ grid_columns[0].field }}, USE_YN: "Y" }
            }
        }
    });
{% endif %}
}

/***********************************************************/
/*            ### 콤보 초기화   ###                          */
/**********************************************************/

function fn_initCombos(){
    // TODO: 공통코드 조회 및 콤보 바인딩
}

/***********************************************************/
/*            ### 이벤트 초기화   ###                        */
/**********************************************************/

function fn_initEvent () {
}

/***********************************************************/
/*            ### 그리드 이벤트   ###                        */
/**********************************************************/

function fn_initGridEvent(){
    // 마스터 그리드 선택 변경 이벤트
    grdMst.bind('selectionChange', function(e) {
        grdMst.chkEditingOnSelectionChange(e, grdDtl, null, null, fn_grdSelectionChange);
    });
}

/***********************************************************/
/*            ###  CALL 함수   ###                          */
/**********************************************************/

function fn_tranCallBack(svcId, data, errCd, msgTp, msgCd, msgText) {
    if (errCd != ERR_CD_SUCCESS) {
        return;
    }

    switch(svcId) {
        case 'search':
            // 마스터 그리드 조회 건수 표시
            $('#master_cnt').text(grdMst.getRowCount() + " 건");
            grdDtl.clearGridData();
            $('#detail_cnt').text("0 건");
            break;
        case 'searchDetail':
            // 디테일 그리드 조회 건수 표시
            $('#detail_cnt').text(grdDtl.getRowCount() + " 건");
            break;
{% if detail_crud_enabled %}
        case 'save':
            grdDtl.clearGridData();
            fn_inq();
            break;
{% endif %}
    }
}

/***********************************************************/
/*            ### 업무 함수   ###                            */
/**********************************************************/

/*
 ### 조회 버튼 ###
*/
async function fn_inq(){
{% if detail_crud_enabled %}
    // 디테일 그리드 변경여부 체크
    const isModified = grdDtl._isGridEditing();
    if (isModified && !await gfn_showConfirm("MSG.COM.CFM.005")) {
        return;
    }

{% endif %}
    // 폼 유효성 검사
    if (!$("#searchForm").gfn_checkFormValidation()) {
        return;
    }

    let options = {
        svcId   : "search",
        strUrl  : "/portal/func/{{ business_module }}/{{ sub_module }}/{{ screen_id }}/searchMaster",
        reqGrid : "",
        resGrid : "grdMst=ds_master",
        param   : gfn_getFormParam("#searchForm"),
        pCall   : fn_tranCallBack,
        pLoad   : true,
        pSvcFlag: "SELECT",
    };

    gfn_auiTransaction(options);
}

/*
 ### 마스터 그리드 선택 이벤트 ###
*/
function fn_grdSelectionChange(){
    let selected = grdMst._getRowItem();

    if (!selected) return;

    // 상세 조회
    fn_inqDetail(selected.{{ grid_columns[0].field }});
}

/*
 ### 상세 조회 ###
*/
function fn_inqDetail(keyValue){
    if (!keyValue) {
        grdDtl.setGridData([]);
        return;
    }

    let options = {
        svcId   : "searchDetail",
        strUrl  : "/portal/func/{{ business_module }}/{{ sub_module }}/{{ screen_id }}/searchDetail",
        reqGrid : "",
        resGrid : "grdDtl=ds_detail",
        param   : { {{ grid_columns[0].field|lower }}: keyValue },
        pCall   : fn_tranCallBack,
        pLoad   : true,
        pSvcFlag: "SELECT",
    };

    gfn_auiTransaction(options);
}
{% if detail_crud_enabled %}

/*
 ### 디테일 그리드 행추가 ###
*/
function fn_addGridDetail(flag) {
    const selectedItem = grdMst._getRowItem();

    if (!selectedItem || selectedItem === '') {
        gfn_showMessage("MSG.COM.VAL.055");
        return false;
    }

    const item = {
        {{ grid_columns[0].field }}: selectedItem.{{ grid_columns[0].field }},
        USE_YN: "Y"
    };

    if (flag == "I") {
        grdDtl.addRow(item, "selectionDown");
    } else {
        grdDtl.addRow(item);
    }

    grdDtl.setGridRowFocus(grdDtl.getGridRowPosition(), "{{ detail_grid_columns[1].field }}");
}

/*
 ### 디테일 그리드 행삭제 ###
*/
function fn_delGridDetail() {
    grdDtl.removeRow(null, false);
}

/*
 ### 저장 버튼 ###
*/
async function fn_save() {
    // 디테일 그리드 변경 여부 체크
    if (!grdDtl._isGridEditing()) {
        gfn_showMessage("MSG.COM.VAL.020");
        return;
    }

    // 필수값 체크
    if (!grdDtl._gridRequiredCheck()) {
        return;
    }

    // 저장 확인
    if (!await gfn_showConfirm("MSG.COM.CFM.003")) {
        return;
    }

    // 선택된 행 위치 저장(저장 후 저장 위치로 이동)
    grdDtl._setSavePosition("{{ detail_grid_columns[1].field }}");

    let options = {
        svcId   : "save",
        strUrl  : "/portal/func/{{ business_module }}/{{ sub_module }}/{{ screen_id }}/save",
        reqGrid : "ds_detail=grdDtl",
        resGrid : "",
        pCall   : fn_tranCallBack,
        pLoad   : true,
        pSvcFlag: "SAVE",
    };

    gfn_auiTransaction(options);
}
{% endif %}

/*
 ### 엑셀 다운로드 ###
*/
function fn_excel() {
    // 엑셀 다운로드 할 건수 체크
    if (grdDtl.getRowCount() <= 0) {
        gfn_showMessage("MSG.COM.VAL.099");
        return;
    }

    let exportProps = {fileName : PAGE_INFO['MENU_NM'] + "_" + Date.now()};
    exportProps.fileName = exportProps.fileName.replaceAll('\\n', '').replaceAll('/', '_');
    grdDtl.exportToXlsx(exportProps);
}

/***********************************************************/

/*            ### 종료시 호출 함수   ###                     */
/**********************************************************/

/*
 ### 폼 닫을시 변경사항 체크 ###
*/
async function checkForUpdate(){
{% if detail_crud_enabled %}
    const isModified = grdDtl._isGridEditing();

    if (isModified) {
        if (!await gfn_showConfirm("MSG.COM.CFM.005")) {
            return false;
        }
    }

    return true;
{% else %}
    return true;
{% endif %}
}
'''

# 파일 작성
output_path = 'C:/Users/naoek/.claude/skills/salime-codegen/templates/type2/Script.js.j2'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(template_content)

print(f"Type2 Script.js.j2 template created: {output_path}")