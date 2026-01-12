/*
 *  @id     : STAutoOrdrStorMgnt.js
 *  @title  : 자동발주 매장관리
 *  @author : jhkim
 *  @version: jhkim 2024.06.06 최초작성
 */

/***********************************************************/
/*            ### 전역 변수 ###                              */
/***********************************************************/

const grdMst = new gfn_gridUtil(); // Grid Master


//화면 로딩 시, 처음 작동하는 부분
$(function() {
    gfn_initComponent('.content-wrapper');
    fn_initGrid();

    const obj = [
        { id   : "BLNG_CD" , code : "" , level: "1" }
    ]
    gfn_orgCodeComboInit(obj, { defaultText:'선택' , authYn:"Y" });

    const comboOpt = [
        { ID : "USE_YN", CODE_GROUP : "CO123", USE_YN : "Y" }
    ];

    //공통코드 조회
    const resultObj = gfn_getCommonCdLists(comboOpt);
    gfn_makeBtnRadio($("#AUTO_ORDR_USE_YN"),resultObj["USE_YN"],{defaultText : "전체"});

    fn_initGridEvent();
});

function fn_initGridEvent() {
    // grdMst.bind("rowCheckClick", function(e) {
    //     //
    // });
    grdMst.bind("cellEditEnd", function(e) {
        if (grdMst.isEditedById(e.item._rowIdField)) {
            grdMst.addCheckedRowsByIds(e.item._rowIdField);
        } else {
            grdMst.addUncheckedRowsByIds(e.item._rowIdField);
        }
    });
}

/***********************************************************/
 /*            ### 초기 함수  ###                             */
 /**********************************************************/

 /*
  * 그리드 초기화
  */
function fn_initGrid() {
    const colModel = [
        {
            headerText: "회원생협",
            children: [
                {
                    dataField: "BLNG_CD" , headerText: "코드", width: 100, editable: false, align:'center',
                    filter: {
                        showIcon: true,
                        useExMenu: true
                    }
                },
                {
                    dataField: "BLNG_NM" , headerText: "명", width: 250, editable: false, align:'left',
                    filter: {
                        showIcon: true,
                        useExMenu: true
                    }
                }
            ],
        },
        {
            headerText: "매장",
            children: [
                {
                    dataField: "STOR_NO" , headerText: "번호", width: 100, editable: false, align:'center',
                    filter: {
                        showIcon: true,
                        useExMenu: true
                    }
                },
                {
                    dataField: "STOR_NM" , headerText: "명", width: 250, editable: false, align:'left',
                    filter: {
                        showIcon: true,
                        useExMenu: true
                    }
                }
            ],
        },
        {
            dataField: 'AUTO_ORDR_USE_YN',
            headerText: '자동발주 사용여부',
            align: 'center',
            width: 150,
            headerRenderer: {
                type : 'CheckBoxHeaderRenderer',
                // dependentMode : true,
                position : 'bottom',
                onClick: function (e) {
                    setCheckbox(e);
                }
            },
            renderer: {
                type: "CheckBoxEditRenderer",
                checkValue: "Y",
                unCheckValue: "N",
                editable: true,
            },
            filter: {
                showIcon: true,
                useExMenu: true
            }
        },
        {
            dataField: 'STOP_APC_YN',
            headerText: '정지신청여부',
            align: 'center',
            width: 150,
            editable: false,
            headerTooltip: {
                show: true,
                tooltipHtml: "자동발주 정지 신청 후 승인처리된 매장은 등록된 기간동안 자동발주 대상에서 무조건 제외됩니다.<br/>정지 신청은 자동발주정지신청[STStorAutoOrdrStopApc] 화면에서 처리됩니다."
            },
            renderer: {
                type: "CheckBoxEditRenderer",
                checkValue: "Y",
                unCheckValue: "N",
                editable: false,
            },
            filter: {
                showIcon: true,
                useExMenu: true
            }
        }
    ];

    const props = {
        headerHeight : 20,
        showRowNumColumn: true,
        showRowAllCheckBox: true,
        showRowCheckColumn: true,
        editable: true,
        // rowIdField: "rowId",
        fillColumnSizeMode: false,              // 자동컬럼 맞춤 여부
        enableFilter: true,
        enterKeyColumnBase: false,              // Enter키 입력시 컬럼 이동
        // selectionMode: "multipleCells",			// 다중 셀 지정 multipleCells, singleCells
        copySingleCellOnRowMode: true,          // 선택된 단일 셀을 복사 설정 default : false
        // rowCheckDisabledFunction: function (rowIndex, isChecked, item) {
        //     return false;
        // }
    };

    grdMst.create("#divGrdMst", colModel, props);  		//그리드 생성

 }

async function fn_inq() {
    //폼 엘리먼트 유효성 검사
    if (!$("#searchForm").gfn_checkFormValidation()) { return; }

    const isModified = grdMst._isGridEditing() ;

    //변경여부 체크
    if (isModified && ! await gfn_showConfirm("MSG.COM.CFM.005")) {
        return;
    }

    const options = {
        svcId   : "search",
        strUrl  : "/portal/func/st/or/STAutoOrdrStorMgnt/search",
        reqGrid : "",										                //요청Key=그리드ID
        resGrid : "grdMst=ds_menu",					                        //그리드ID=응답Key
        param   : gfn_getFormParam("#searchForm"),                    //전송할 파라미터
        pCall   : fn_tranCallBack, 							                // 콜백함수 - 함수명이 아닌 참조값을 직접 전달한다.
        pLoad   : true	      								                // 로딩이미지 노출 여부
    };
    gfn_auiTransaction(options);
}

async function fn_save() {
    const checkedData = grdMst.getCheckedRowItems();

    if (checkedData.length === 0) {
        gfn_showMessage("체크된 행이 없습니다.");
        return;
    }

    if (!grdMst._isGridEditing()) {
        gfn_showMessage("MSG.COM.VAL.020");
        return;
    }

    //저장여부  체크
    if (! await gfn_showConfirm("MSG.COM.CFM.021", "저장")) {
        return;
    }

    const options = {
        svcId   : "save",
        strUrl  : "/portal/func/st/or/STAutoOrdrStorMgnt/save",	         // url
        reqGrid : "",                						            // 요청Key=그리드ID
        resGrid : "",	                    				            // 그리드ID=응답Key
        param   : {
            checkedData : grdMst.getCheckedRowItemsAll()
        },
        pCall   : fn_tranCallBack, 						                // 콜백함수 - 함수명이 아닌 참조값을 직접 전달한다.
        pLoad   : true	      							                // 로딩이미지 노출 여부
    };

    gfn_auiTransaction(options);
}

function fn_tranCallBack(svcId, data, errCd, msgTp, msgCd, msgText) {
    if (errCd != ERR_CD_SUCCESS) {
        return;
    }

    switch (svcId) {
        case 'search':          //	조회
            $('#gridCnt').text(grdMst.getRowCount() + " 건");
            // grdMst.expandAll(); // 트리메뉴 전체 펼치기
            break;
        case 'save':            //	저장
            grdMst.clearGridData();
            fn_inq();
            break;
    }
}

/*
 * 체크박스 전체선택 및 해제
 */
function setCheckbox(event) {
    const data = {};
    if (event.checked)
        data[event.dataField] = 'Y';
    else
        data[event.dataField] = 'N';
    const rowCnt = grdMst.getRowCount();
    let checkObj;
    let rowId;
    for (let i = 0; i < rowCnt; i++) {
        checkObj = grdMst.getCellValue(i, event.dataField);
        grdMst.updateRow(data, i);

        // rowId = grdMst.
        if (grdMst.isEditedById(i)) {
            grdMst.addCheckedRowsByIds(i);
        } else {
            grdMst.addUncheckedRowsByIds(i);
        }
    }
 }
