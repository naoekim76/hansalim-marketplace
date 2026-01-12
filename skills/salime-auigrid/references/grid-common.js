/* ================ CMM (공통관리) AUIDGrid Utility 정의 시작 ================================ */

function gfn_gridUtil() {
	var _t = this;
	var _pid;

	var commonBodyContextMenus = new Array();
	var commonBodyContextMenusOpt = new Array();
	var commonBodyContextMenusStatus = new Object();
	var defaultColumnLayout;
	var selectionSum = "-";//bodyContextMenus 합계
	var selectionCount;
	var gridSavePositionFilterStr;//저장위치 필터 정보

	/**
	 * 그리드 생성
	 */
	this.create = function(wrapId, colModel, props) {
		var defProps = {
			//그리드 기본속성
			rowIdField: '_rowIdField'		//행 고유 id
			,editable: true					//수정가능여부
			,showRowNumColumn: false		//인덱스 넘버 컬럼 표시여부
			,showStateColumn: false			//상태컬럼 표시여부
			,enableRestore:true            //수정, 추가, 삭제 행을 원래 상태로 복구
			,showRowAllCheckBox: false		//전체선택 체크박스 표시여부
			,showRowCheckColumn: false		//행선택 체크박스 표시여부
			,showFooter: false				//푸터 사용여부		
			,fixedColumnCount: 0			//열고정 컬럼 수
			,useGroupingPanel: false		//그룹핑 패널 사용여부
			,displayTreeOpen: true			//그리드의 브랜치 아이템이 모두 열린 상태로 출력 (그룹핑시 필요한듯)
			,enableCellMerge: true			//칼럼 셀 병합(cell merge) 가능 여부 (false 로 지정시 tree 구조로 표현됨)
			,showBranchOnGrouping: false	//그룹핑 시 브랜치에 해당되는 행 출력 여부 (enableCellMerge가 tru1e인 경우에만 동작)
			,headerHeight: 24				//헤더높이
			,rowHeight: 31					//행높이 - 렌더러 사용으로 줄번호,상태컬럼과 일반컬럼 높이가 다른경우 변경하여 사용해야함.(ex:ButtonRenderer인 경우 30이 적당함)
			,enableSorting: true			//소팅기능 사용여부 (AUIGrid 기본페이징시에만 동작)
			,usePaging: false				//그리드 기본페이징 사용여부
			,useCustomPaging:false          //그리드 커스텀 페이징 사용여부
			,customPagingOpt:{pageRowCount:20,pageButtonCount:10}//커스텀페이징 옵션 - pageRowCount:페이지에서 보여줄 행 수, pageButtonCount:페이지 네비게이션에서 보여줄 페이지의 수
			,useScrollPaging: false         // 스크롤 페이징 여부
			,scrollPagingOpt:{startRow:0,listCount:20,nowRequesting:false,isLast:false} // 스크롤페이징 옵션 - startRow:조회데이터Offset, listCount:조회데이터개수, nowRequesting:현재 요청중인지 여부, isLast:마지막여부
			,selectionMode: 'multipleRows'	//셀/행 선택모드 (행선택모드. Master/Detail인 경우 Master그리드에 설정) multipleRows
			,editBeginMode: 'doubleClick'	        //편집모드 진입 방법 (doubleClick, click)
			,softRemoveRowMode: false		//삭제모드 (true면 삭제표시만 하고, false면 그리드에서 삭제)
			,wrapSelectionMove: true		//칼럼 끝에서 오른쪽 이동시 다음행으로 이동
			,showEditedCellMarker: true	    //셀편집 후 셀 수정 마크 표시 여부
			,keepEditing: true				//셀편집 후 탭/엔터시 다음 셀을 수정 가능 상태로 만들지 여부
			,onlyEnterKeyEditEnd: false		// 셀을 수정하고 완료를 하기 위해 엔터(Enter) 키를 입력할 때 수정 완료 행위만 하고 다음 행으로 선택자를 내리지 않습니다. 기본값(default) : false.
			,enableMovingColumn: true		//컬럼 이동기능 사용여부
			,copyDisplayValue: true			//셀/행 복사시 포매팅된 값을 복사할 지 여부 (기본은 false)
			,blankNumericToNullOnEditing:true//dataType을 "numeric" 으로 설정한 셀을 수정할 때 사용자가 입력한 빈 값("")을 명시적인 null 로 처리할지 여부를 지정합니다.
			,blankToNullOnEditing:true      //수정할 때 사용자가 입력한 빈 값("")을 명시적인 null 로 처리할지 여부를 지정합니다.
			//추가속성
			,autoResize: true				//그리드 자동 리사이징 여부
			,resizeOnShow: true				//그리드 show 시 리사이징 여부 (그리드 show/hide 기능이 있는 경우 true로 지정)
			,selectFirstRow: false			//그리드 로드시 첫번째 행 선택 여부 (Master 그리드에 true로 지정)
			,focusDataField: null			//그리드 행추가시 포커스를 위치할 dataField명 (미지정시 입력가능한 첫번째 컬럼에 포커싱됨)
			,useSearchbox:true              //그리드 검색창 사용여부
			,initHideColInfo:[]             //colModel.hideTopFldInfo에 open:false로 설정된 컬럼을 그리드생성시 숨김처리한다.
			,useSaveColumnLayout:false      //SaveColumnLayout 여부
			,useLocalStorage:true           //LocalSstorage 여부
			,treeRenderInfo:{useTreeRender:false,tempColumnIndex:0,treeIdObj:{},treeEditableObj:{}}//트리렌더러 정보
			,customColumnIndex:0			
			//그리드 컨텍스트 메뉴 관련 속성
			,useContextMenu:true// 컨텍스트 메뉴 사용
			,contextMenuOpt:{useHeader:true,useBody:true}//컨텍스트 메뉴 header, body 사용유무(useContextMenu가 true인 경우)
			,contextMenuItems : commonBodyContextMenus // 컨텍스트 메뉴 아이템들
			,useExcelDownload  : true //컨텍스트 메뉴 엑셀다운로드 기능 사용여부			
			,insertRow  : ''    //그리도 InsertRow 처리 
			,editableOnFixedCell :true // 고정 칼럼, 고정 행을 설정했을 때 해당 셀 편집 가능 여부
			,rowNumHeaderText: "No"
			,enableFilter: true
		};

		if ($(wrapId).length <= 0) {
			gfn_showMessage("Can't find [" + wrapId + "]");
			return;
		}
		
		_t._wrapId = wrapId;
		_t._adjustProps(props);//그리드 속성 보정
		_t.opts = $.extend(true, defProps, props);

		colModel = _t._setHideColModel(colModel);//숨김능 컬럼 보정
		defaultColumnLayout = colModel;//기본 레이아웃 저장
		colModel = _t._adjustColModel(colModel, false);//컬럼 속성 보정
		colModel = _t._getSaveColumnLayout(colModel);//저장된 layout 가져오기
		
		
		_pid = AUIGrid.create(wrapId, colModel, _t.opts);
		_t.pid = _pid; //Grid 고유 ID (wrapId와 동일)
		
		//컬럼숨김처리
		if(!_t.opts.useSaveColumnLayout){
			_t._setFoldHideColumn();//컬럼숨김처리
		}
		
		//검색창 사용여부
		if(_t.opts.useSearchbox){
			_t._createSearchBox();
		}
		
		//컨텍스트 메뉴 사용
		if(_t.opts.useContextMenu){
			_t._createContextMenu();//컨텍스트 메뉴 생성
		}
		
		//그리드 커스텀 페이징 사용여부
		if(_t.opts.useCustomPaging){
			_t._createCustomPaging();
		}
		
		//그리드 자동 리사이징
		if (_t.opts.autoResize) {
			$(window).resize(function(){
				_t.resize();
			});
		}

		//그리드 show시 리사이징
		if (_t.opts.resizeOnShow) {
			$(_pid).on('show', function() {
				_t.resize();
			});
		}
		
		//ready 기본 이벤트 등록
		_t.bind("ready",function(){
			_t._gridReadyHandler();
		});
		
		// keyDown 이벤트
		_t.bind("keyDown",function(){		
		});
		
		// Sort 인경우 처리 
		_t.bind("sorting", function() {			
			_t.prevSelItem = null;
			
	    });
		
		//top hide 이벤트 등록
		if(_t.opts.enableHideTop){
			_t.bind("headerClick",function(){});
		}
		
		//트리렌더러 기본이벤트 등록
		if(_t.opts.treeRenderInfo.useTreeRender){
			_t.bind("cellClick", function(event) {});//클릭시 트리렌더러 보이기
			_t.bind("vScrollChange", function(event) {});//스크롤 이동 트리렌더러 감추기
		 	_t.bind("hScrollChange", function(event) {});//스크롤 이동 트리렌더러 감추기
		}

  		/***
  			cleck 시 처리로 로직 추가
  		 */
  	    $(document).on('click', function (e) {
				
	         if($(e.target).closest(_pid).length == 0) {
				try{
					let targetCalssName = e.target.className;					
					if(targetCalssName.indexOf("grid-drop-list") == -1 && targetCalssName.indexOf("aui-calendar") == -1  && targetCalssName.indexOf("aui-grid-cell-editor-button") == -1 ) {
		            	AUIGrid.forceEditingComplete(_pid, null);
		            }
		        }catch(e) {}
	         }
			    
			 
		    
      	});
      	
      	
		
		return _pid;
	};
	
	/**
	 * Grid Ready 이벤트 Handler
	 */
	this._gridReadyHandler=function(){
		// Grid 상태저장을 사용하는 경우만 localStorage Load
		if(!gfn_isNull(_t.opts.localStorageId)){
			if(typeof(Storage) != "undefined") { // Check browser support
				var rowIdx = localStorage.getItem(_t.opts.localStorageId+".auigridRow");
				var hPos = localStorage.getItem(_t.opts.localStorageId+".auigridCol");
				if(rowIdx && hPos) {
					rowIdx = Number(rowIdx); // 이동 시킬 행 인덱스
					hPos = Number(hPos); // 수평스크롤 값
					_t.setRowPosition(rowIdx); // 수직 스크롤 이동 시킴...행 인덱스
					_t.setHScrollPositionByPx(hPos); // 수평 스크롤 이동 시킴(픽셀 단위)
				}
				
			} else {
				alert("localStorage를 지원하지 않는 브라우저입니다.");
			}
		}
	}
	
	/**
	 * 검색창 생성
	 */
	this._createSearchBox=function(){
		var dialogId = _pid.substring(1);
		var searchDialogHtml;
		searchDialogHtml =  '<div id="'+dialogId+'SearchDialog" title="Grid 검색" class="ns-modal-popup--msg mt-4" style="width:360px;height:155px">';
		searchDialogHtml += '	<ul>';
		searchDialogHtml += '		<li><input class="ctn-checkbox-input mr-1" type="checkbox" id="'+dialogId+'Direction" value="direction" checked="checked" ><label for="direction">진행 방향 : forward(or backword)</label></li>';
		searchDialogHtml += '		<li><input class="ctn-checkbox-input mr-1" type="checkbox" id="'+dialogId+'CaseSensitive" value="caseSensitive"><label for="caseSensitive">대소문자 구분(caseSensitive)</label></li>';
		searchDialogHtml += '		<li><input class="ctn-checkbox-input mr-1" type="checkbox" id="'+dialogId+'WholeWord" value="wholeWord"><label for="wholeWord">온전한 단어(wholeWord)</label></li>';
		searchDialogHtml += '		<li><input class="ctn-checkbox-input mr-1" type="checkbox" id="'+dialogId+'WrapSearch" value="wrapSearch" checked="checked"><label for="wrapSearch">끝에서 되돌리기(wrapSearch)</label></li>';
		searchDialogHtml += '	</ul>';
		searchDialogHtml += '	<div class="xy-start mt-4">';
		
	
		searchDialogHtml += '	<select style="display:none" class="option-input w-ch-5 mr-1" id="'+dialogId+'DataFieldSelect">';
		searchDialogHtml += '		<option value="all" selected="selected">전체</option>';

		searchDialogHtml += '	</select>';
		
		
		searchDialogHtml += '	<input type="text" class="option-input w-ch-8 mr-1" name="'+dialogId+'Keyword" id="'+dialogId+'Keyword" value="" />';
		searchDialogHtml += '	<input type="button" class="ctn-btn ctn-btn--primary text-xs" id="'+dialogId+'DialogSearchBtn" value="검색" />';
		searchDialogHtml += '	</div>';
		searchDialogHtml += '</div>';
		
		$('body').prepend(searchDialogHtml);
		
		// 검색 UI 다이얼로그 위젯 만들기
		$( "#"+dialogId+"SearchDialog" ).dialog({
	      autoOpen: false,
	      resizable:false,
	      position : { my: "center", at: "center", of: _pid  },
	      width : 440,
	      height : 'auto'
	    });
		$("#" + dialogId + "DialogSearchBtn").bind("click", this._searchClickHandler);
		$("#" + dialogId + "Keyword").bind("keydown", function(e){
			if(e.keyCode == 13){
				_t._searchClickHandler();
			}
		});
		// 검색(search) Not Found 이벤트 바인딩
		AUIGrid.bind(_pid, "notFound", this._searchNotFoundHandler);
	};
	
	/**
	 * 컨텍스트 메뉴 생성
	 */
	this._createContextMenu=function(){		
		//header, body 컨텍스트 메뉴 사용여부
		if(_t.opts.contextMenuOpt.useHeader || _t.opts.contextMenuOpt.useBody){
			if(_t.opts.contextMenuOpt.useHeader){
				_t.opts.contextMenuOpt.contextMenuHeaderId = "_contextMenuHeader_"+_pid.substring(1);//컨텍스트 메뉴 헤더 ID
				_t.opts.contextMenuOpt.nowHeaderMenuVisible = false;//헤더 컨텍스트 메뉴가 현재 보이고 있는지 여부
				$(_t.pid).before("<ul id='"+_t.opts.contextMenuOpt.contextMenuHeaderId+"' class='scmContextMenuheader'></ul>");
				$(document).on("click", function(event) { 
					_t._hideContextMenu();
				});
			 	_t.bind("vScrollChange", function(event) {
			 		_t._hideContextMenu();// 컨텍스트 메뉴 감추기
			 	});
			 	_t.bind("hScrollChange", function(event) {
			 		_t._hideContextMenu();// 컨텍스트 메뉴 감추기
			 	});
			}
			
			// 컨텍스트 메뉴 이벤트 바인딩
			AUIGrid.bind(_pid, "contextMenu", this._auiGridContextEventHandler);
			
			// 그리드 selectionChange 이벤트 바인딩
			AUIGrid.bind(_pid, "selectionChange", this._gridSelectionChangeHandler);
		}
	};
	
	/**
	 * 사용자 컨텍스트 메뉴 닫기
	 */
	this._hideContextMenu=function(e){
		if(_t.opts.contextMenuOpt.nowHeaderMenuVisible) { // 메뉴 감추기
			$("#"+_t.opts.contextMenuOpt.contextMenuHeaderId).menu("destroy");
			$("#"+_t.opts.contextMenuOpt.contextMenuHeaderId).hide();
			_t.opts.contextMenuOpt.nowHeaderMenuVisible = false;
		}
	};
	
	/**
	 *  컨텍스트 메뉴중 선택하면 선택한 메뉴에 따라 기능을 실행한다.
	 */
	this._contextItemHandler=function(event, ui){
		var menuId;
		if(gfn_isNull(event.contextIndex)){
			menuId = ui.item.prop("id").replace("__"+_pid.substring(1),"");
			event = _t.opts.contextMenuOpt.headerEvent;
		}else{
			menuId = commonBodyContextMenusOpt[event.contextIndex].menuId;
		}
		
		switch(menuId) {
		case 'rowFixed': //행고정
			AUIGrid.setFixedRowCount(_pid, event.rowIndex);
			commonBodyContextMenusStatus['rowFixed'] = true;
			break;
		case 'rowFixedCancel': //행고정 해제
			AUIGrid.setFixedRowCount(_pid, 0);
			commonBodyContextMenusStatus['rowFixed'] = false;
			break;
		case 'cellFixed': //열고정
			//AUIGrid.setFixedColumnCount(_pid, event.columnIndex);
			AUIGrid.setFixedColumnCount(_pid, event.columnIndex);
			commonBodyContextMenusStatus['cellFixed'] = true;
			break;
		case 'cellFixedCancel': //열고정 해제
			AUIGrid.setFixedColumnCount(_pid, 0);
			//_t.setFixedColumnCount(_pid, 0);
			commonBodyContextMenusStatus['cellFixed'] = false;
			break;
		case 'searchDialog'://찾기
			_t._searchDialogOpen();
			break;
		case 'columnHide'://열 숨김
			AUIGrid.hideColumnByDataField(_pid, event.dataField);
			commonBodyContextMenusStatus['columnHide'] = true;
			if($.isArray(commonBodyContextMenusStatus['columnHideField'])) commonBodyContextMenusStatus['columnHideField'].push(event.dataField);
			else commonBodyContextMenusStatus['columnHideField'] = [event.dataField]; 
			break;
		case 'columnHideCancel'://열 숨김 해제
			AUIGrid.showColumnByDataField(_pid, commonBodyContextMenusStatus['columnHideField']);
			commonBodyContextMenusStatus['columnHide'] = false;
			commonBodyContextMenusStatus['columnHideField'] = [];
			break;
		case 'saveFormat': //형태 기억
			var localStorageId = AUIGrid.getProp(_pid, "localStorageId");
			
			if(typeof(Storage) != "undefined") { // Check browser support
				if(!gfn_isNull(localStorageId)){
					localStorage.setItem(localStorageId+".auigridLayout", JSON.stringify(_t.getColumnLayout()));// 칼럼 레이아웃 정보 가져오기
					localStorage.setItem(localStorageId+".auigridRow", AUIGrid.getRowPosition(_pid)); // 수직 스크롤 값
					localStorage.setItem(localStorageId+".auigridCol",  AUIGrid.getProp(_pid, "hScrollPosition")); // 수평 스크롤 값(픽셀)
					commonBodyContextMenusStatus['saveFormat'] = true;
				}
			} else {
				alert("localStorage 를 지원하지 않는 브라우저입니다.");
			}
			break;
		case 'saveFormatCancel': //형태 기억 삭제
			if(typeof(Storage) != "undefined") { // Check browser support
				var localStorageId = AUIGrid.getProp(_pid, "localStorageId");
				localStorage.removeItem(localStorageId + ".auigridLayout");
				try{
					_t.changeColumnLayout(_t._adjustColModel(defaultColumnLayout, true));
				}catch(e){}
				_t._setFoldHideColumn();//컬럼숨김처리
				commonBodyContextMenusStatus['saveFormat'] = false;
			} else {
				alert("localStorage 를 지원하지 않는 브라우저입니다.");
			}
			break;
		case 'resetFormat': //원래 형태로
			try{
				_t.changeColumnLayout(_t._adjustColModel(defaultColumnLayout, true));
			}catch(e){}
			_t._setFoldHideColumn();//컬럼숨김처리
			break;
		case 'cellMerge': //셀병합/취소
			var isMerged = AUIGrid.getProp(_pid, "enableCellMerge");
			_t.setCellMerge(_pid, !isMerged);
			break;
		case 'excelDownload': //엑셀다운로드
			_t.exportToXlsx({});
			break;
		 case 'insertRow' : // 그리드 InsertRow
		    _t.insertRow(_t.opts.insertRow);
		}
	};
	
	
	/**
	 * 검색 UI 표시
	 */ 
	this._searchDialogOpen=function(){
		$(_pid+"Keyword").val('');
		$(_pid+"SearchDialog").dialog("open");
		$(_pid+"Keyword").focus();
	};
	
	/**
	 * 그리드 이벤트 핸들러 - 우클릭시 컨텍스트 메뉴를 생성한다.
	 */
	this._auiGridContextEventHandler=function(event){
		
		//컨텍스트 메뉴 초기화
		_t._commonBodyContextMenusClear();
		if(event.target == 'header' && _t.opts.contextMenuOpt.useHeader){
			if(event.columnIndex > 0) _t._commonBodyContextMenusPush({label : '열 고정', callback : _t._contextItemHandler, menuId:'cellFixed'});
			if(commonBodyContextMenusStatus['cellFixed']) _t._commonBodyContextMenusPush({label : '열 고정 해제', callback : _t._contextItemHandler, menuId:'cellFixedCancel'});
			_t._commonBodyContextMenusPush({label : '찾기(Ctrl+F)', callback :  _t._contextItemHandler, menuId:'searchDialog'});
			_t._commonBodyContextMenusPush({label : '열 숨김', callback : _t._contextItemHandler, menuId:'columnHide'});
			if(commonBodyContextMenusStatus['columnHide']) _t._commonBodyContextMenusPush({label : '열 숨김 해제', callback : _t._contextItemHandler, menuId:'columnHideCancel'});
			
			if(_t.opts.useLocalStorage) {
				_t._commonBodyContextMenusPush({label : '형태 기억', callback : _t._contextItemHandler, menuId:'saveFormat'});
				if(commonBodyContextMenusStatus['saveFormat']) _t._commonBodyContextMenusPush({label : '형태 기억 삭제', callback : _t._contextItemHandler, menuId:'saveFormatCancel'});
				_t._commonBodyContextMenusPush({label : '원래 형태로', callback : _t._contextItemHandler, menuId:'resetFormat'});
			}

			//헤더컨텍스트 메뉴 열려있으면 닫기
			if(_t.opts.contextMenuOpt.nowHeaderMenuVisible) {
				_t._hideContextMenu();
			}
			_t.opts.contextMenuOpt.nowHeaderMenuVisible = true;
			
			// 컨텍스트 메뉴 생성된 event 보관.
			_t.opts.contextMenuOpt.headerEvent = event;
			
			var contextHeaderHtml = "";
			for(var i=0; i<commonBodyContextMenus.length; i++){
				var itemHeaderId = commonBodyContextMenus[i].menuId+"__"+_pid.substring(1);
				contextHeaderHtml += "<li id='"+itemHeaderId+"'>"+commonBodyContextMenus[i].label+"</li>";
			}
			
			$("#"+_t.opts.contextMenuOpt.contextMenuHeaderId).html(contextHeaderHtml);
			
			// 헤더 에서 사용할 메뉴 위젯 구성
			$("#"+_t.opts.contextMenuOpt.contextMenuHeaderId).menu({select: _t._contextItemHandler});
			
			//헤더 컨텍스트 메뉴 열기
			$("#"+_t.opts.contextMenuOpt.contextMenuHeaderId).css({left:event.pageX, top:event.pageY - 150}).show();
			
			return true;
		}else if(_t.opts.contextMenuOpt.useBody){
			//Body 컨텍스트 메뉴 정의
			if(event.rowIndex > 0) _t._commonBodyContextMenusPush({label : '행 고정', callback : _t._contextItemHandler, menuId:'rowFixed'});
			if(commonBodyContextMenusStatus['rowFixed']) _t._commonBodyContextMenusPush({label : '행 고정 해제', callback : _t._contextItemHandler, menuId:'rowFixedCancel'});
			if(event.columnIndex > 0) _t._commonBodyContextMenusPush({label : '열 고정', callback : _t._contextItemHandler, menuId:'cellFixed'});
			if(commonBodyContextMenusStatus['cellFixed']) _t._commonBodyContextMenusPush({label : '열 고정 해제', callback : _t._contextItemHandler, menuId:'cellFixedCancel'});
			_t._commonBodyContextMenusPush({label : '찾기(Ctrl+F)', callback :  _t._contextItemHandler, menuId:'searchDialog'});
			_t._commonBodyContextMenusPush({label : '열 숨김', callback : _t._contextItemHandler, menuId:'columnHide'});
			if(commonBodyContextMenusStatus['columnHide']) _t._commonBodyContextMenusPush({label : '열 숨김 해제', callback : _t._contextItemHandler, menuId:'columnHideCancel'});
			
			if(_t.opts.useLocalStorage) {
				_t._commonBodyContextMenusPush({label : '형태 기억', callback : _t._contextItemHandler, menuId:'saveFormat'});
				if(commonBodyContextMenusStatus['saveFormat']) _t._commonBodyContextMenusPush({label : '형태 기억 삭제', callback : _t._contextItemHandler, menuId:'saveFormatCancel'});
				_t._commonBodyContextMenusPush({label : '원래 형태로', callback : _t._contextItemHandler, menuId:'resetFormat'});
			}
			
			if(!gfn_isNull(_t.opts.insertRow)){
				if(! gfn_isNull(PRG_INFO.PAGE_BUTTON)) {
					var _newAuth = _.filter(PRG_INFO.PAGE_BUTTON, {EVENT_NAME: 'new'});
					if(! gfn_isNull(_newAuth)) {
						_t._commonBodyContextMenusPush({label : 'InsertRow', callback : _t._contextItemHandler, menuId:'insertRow'});
					}
				}
			}			
			if(_t.opts.useExcelDownload){
				if(! gfn_isNull(PRG_INFO.PAGE_BUTTON)) {
					var _excelAuth = _.filter(PRG_INFO.PAGE_BUTTON, {EVENT_NAME: 'excel'});
					if(! gfn_isNull(_excelAuth)) {
						_t._commonBodyContextMenusPush({label : '엑셀다운로드', callback : _t._contextItemHandler, menuId:'excelDownload'});
					}
				}
			}
			
			//헤더컨텍스트 메뉴 열려있으면 닫기
			if(_t.opts.contextMenuOpt.nowHeaderMenuVisible) {
				_t._hideContextMenu();
			}
			
			return true;
		}
		return false;
	};
	
	/**
	 * 컨텍스트 메뉴 등록
     */
	this._commonBodyContextMenusPush = function(contextMenuOpt){
		commonBodyContextMenus.push(contextMenuOpt);
		commonBodyContextMenusOpt.push(contextMenuOpt);
	};
	
	/**
	 * 컨텍스트 메뉴 초기화
	 */
	this._commonBodyContextMenusClear = function(){
		if(commonBodyContextMenus.length > 0) commonBodyContextMenus.splice(0,commonBodyContextMenus.length);
		if(commonBodyContextMenusOpt.length > 0) commonBodyContextMenusOpt.splice(0,commonBodyContextMenusOpt.length);
	};
	
	
	/**
	 * 셀렉션 체인지 이벤트 핸들러
	 */
	this._gridSelectionChangeHandler = function(event) {
		var items = event.selectedItems;
		var val;
		var count = items.length;
		var sum = 0;
		var numCount = 0;
		var msg = '';

		if(count <= 1) {
			selectionSum = "-";
		}

		for(i=0; i<count; i++) {
			val = String(items[i].value).replace(/,/gi, ""); // 컴마 모두 제거
			if(val == ""){
				continue;  //null 제외
			}

			val = Number(val);
			if(isNaN(val)) {
				continue;
			}
			sum += val;
			numCount++;
		}

		selectionCount = count;

		if(numCount > 0) {
			selectionSum = sum;
		} else {
			selectionSum = "-"
		}
	};
	
	/**
	 * 검색 버턴 클릭
	 */
	this._searchClickHandler = function () {
		var dialogId = _pid.substring(1);
		var dataField = document.getElementById(dialogId+"DataFieldSelect").value;
		var term = document.getElementById(dialogId+"Keyword").value;
		if(term.trim() == "") {
			gfn_showMessage("MSG.COM.VAL.014", '검색 하고자 하는 단어를 입력하십시오.');
			return;
		}
		
		var options = {
			direction : document.getElementById(dialogId+"Direction").checked,
			caseSensitive : document.getElementById(dialogId+"CaseSensitive").checked,
			wholeWord : document.getElementById(dialogId+"WholeWord").checked,
			wrapSearch : document.getElementById(dialogId+"WrapSearch").checked
		};

		dataField = "all"
		// 전체 검색 지정한 경우
		if(dataField == "all") {
			// 전체 dataField 에 대하여 검색 실시
			//options 를 지정하지 않으면 기본값이 적용됨(기본값은 direction : true, wrapSearch : true)
			
			AUIGrid.searchAll(_pid, term, options );
		} else {
			// 검색 실시
			//options 를 지정하지 않으면 기본값이 적용됨(기본값은 direction : true, wrapSearch : true)
			AUIGrid.search(_pid, dataField, term, options );
		}
	};
	
	/**
	 * 검색 notFound 이벤트 핸들러
	 */
	this._searchNotFoundHandler = function(event) {
		var term = event.term; // 찾는 문자열
		var wrapFound = event.wrapFound; // wrapSearch 한 경우 만족하는 term 이 그리드에 1개 있는 경우.
		
		if(wrapFound) {
			return;
		} else {
			gfn_showMessage("MSG.COM.VAL.014","'"+ term +"' 문자열을 찾을 수 없습니다");
		}
	};
	
	/**
	 * 페이징 네비게이터 생성
	 */
	this._createPagingNavigator=function(){
		var totalRowCount   = _t.opts.customPagingOpt.totalRowCount;  // 전체 데이터 건수
		var goPage          = _t.opts.customPagingOpt.currentPage;    // 현재 페이지
		var pageRowCount    = _t.opts.customPagingOpt.pageRowCount;   // 페이지에서 보여줄 행 수
		var pageButtonCount = _t.opts.customPagingOpt.pageButtonCount;// 페이지 네비게이션에서 보여줄 페이지의 수
		var totalPage       = Math.ceil(totalRowCount / pageRowCount);// 전체 페이지 계산
		
		var retStr = "";
		var prevPage = parseInt((goPage - 1)/pageButtonCount) * pageButtonCount;
		var nextPage = ((parseInt((goPage - 1)/pageButtonCount)) * pageButtonCount) + pageButtonCount + 1;
		
		prevPage = Math.max(0, prevPage);
		nextPage = Math.min(nextPage, totalPage);
		
		if(goPage > pageButtonCount){
			// 처음
			retStr += "<a page=1><span class='aui-grid-paging-number aui-grid-paging-first'>first</span></a>";
			// 이전
			retStr += "<a page="+Math.max(1, prevPage)+"><span class='aui-grid-paging-number aui-grid-paging-prev'>prev</span></a>";
		}
		
		for (var i=(prevPage+1), len=(pageButtonCount+prevPage); i<=len; i++) {
			if (goPage == i) {
				retStr += "<span class='aui-grid-paging-number aui-grid-paging-number-selected'>" + i + "</span>";
			} else {
				retStr += "<a page="+i+"><span class='aui-grid-paging-number'>";
				retStr += i;
				retStr += "</span></a>";
			}
			
			if (i >= totalPage) {
				break;
			}
		}
		
		var tmp = Math.ceil(totalPage / pageButtonCount) * pageButtonCount - pageButtonCount;
	    if(goPage <= tmp){
			// 다음
			retStr += "<a page="+nextPage+"><span class='aui-grid-paging-number aui-grid-paging-next'>next</span></a>";
			// 마지막
			retStr += "<a page="+totalPage+"><span class='aui-grid-paging-number aui-grid-paging-last'>last</span></a>";
		}
		
		$("#"+_t.opts.customPagingOpt.pagingId).html(retStr);
	};
	
	/**
	 * 커스텀 페이징 생성
	 */
	this._createCustomPaging=function(){
		_t.opts.customPagingOpt.totalRowCount=0;// 전체 데이터 건수
		_t.opts.customPagingOpt.currentPage=1;// 현재 페이지
		_t.opts.customPagingOpt.isPagingCall = false;//그리드 transaction 호출 여부
		_t.opts.customPagingOpt.pagingId = "_grid_paging_"+_pid.substring(1);//페이징 ID
		$(_t.pid).after('<div id="'+_t.opts.customPagingOpt.pagingId +'" class="aui-grid-paging-panel my-grid-paging-panel"></div>');
		_t._createPagingNavigator();
		$("#"+_t.opts.customPagingOpt.pagingId).on('click', 'a', function(evt){
			var goPage = $(this).attr('page');
			// 현재 페이지 보관
			_t.opts.customPagingOpt.currentPage = goPage;
			
			// pageRowCount 만큼 데이터 요청
			_t.opts.customPagingOpt.isPagingCall = true;
			var startRow = (_t.opts.customPagingOpt.pageRowCount*(goPage-1)); // +1;
			var endRow = _t.opts.customPagingOpt.pageRowCount*goPage;
			_t.clearGridData();
			$.extend(_t.opts.customPagingOpt.transaction.param, {START_ROW:startRow, END_ROW:endRow,  LIST_COUNT: _t.opts.customPagingOpt.pageRowCount});
			gfn_auiTransaction(_t.opts.customPagingOpt.transaction);
		});
	};
		
	/**
	 * 셀 병합을 활성화 또는 비활성화 시킵니다.
	 * @param flag : true인 경우 셀 병합 홥성화 false인 경우 셀 병합 비활성화
	 */
	this.setCellMerge = function(flag){
		AUIGrid.setCellMerge(_pid, flag);
	};

	/**
	 * 작성된 그리드를 완전히 제거
	 * 동적으로 그리드를 생성, 제거해야 할 경우 반드시 이 메소드를 사용하여 제거
	 */
	this.destroy = function() {
		AUIGrid.destroy(_pid);
	};

	/**
	 * 그리드 속성 보정
	 */
	this._adjustProps = function(props) {
		//그룹핑시 합계행 스타일 자동 지정
		if (props && !props.rowStyleFunction) {
			props.rowStyleFunction = function(rowIndex, item) {
				if(item._$isGroupSumField) { // 그룹핑으로 만들어진 합계 필드인지 여부
					// 그룹핑을 더 많은 필드로 하여 depth 가 많아진 경우는 그에 맞게 스타일을 정의하십시오.
					// 현재 3개의 스타일이 기본으로 정의됨.(AUIGrid_style.css)
					switch(item._$depth) {  // 계층형의 depth 비교 연산
					case 2:
						return "aui-grid-row-depth1-style";
					case 3:
						return "aui-grid-row-depth2-style";
					case 4:
						return "aui-grid-row-depth3-style";
					default:
						return "aui-grid-row-depth-default-style";
					}
				}

				return null;
			};
		}

	};
	
	/**
	 * 숨김기능 컬럼 보정
	 */
	this._setHideColModel = function(colModel){
		//상단 숨김기능 사용여부
		if(_t.opts.enableHideTop){
			var sIdx = -1;
			var eIdx = -1;
			var open = true;
			var tempColModel = new Array();
			var tempchildern = new Array();
			for(var i = 0; i < colModel.length; i++) {
				if(colModel[i].hideTopFldInfo){
					if(tempchildern.length > 0){
						tempColModel.push({headerText: "", dataField:'', headerStyle:'hideColRow', children:$.extend(true, [], tempchildern)});
						tempchildern = new Array();
					}
					
					sIdx = colModel[i].hideTopFldInfo.sIdx;
				 	eIdx = colModel[i].hideTopFldInfo.eIdx;
				 	
				 	open = true;
				 	if(!gfn_isNull(colModel[i].hideTopFldInfo['open'])) open = colModel[i].hideTopFldInfo['open'];
				 	
				 	if(!open) _t.opts.initHideColInfo.push({sHideIdx:colModel[i].hideTopFldInfo.sHideIdx, eHideIdx:colModel[i].hideTopFldInfo.eHideIdx});
				 	tempColModel.push({headerText: open ? "-" : '+', align:'right', dataField:'_HIDE_FIELD_SIDX_'+sIdx+'_EIDX_'+eIdx, hideTopFldInfo:colModel[i].hideTopFldInfo, headerStyle:'hideColRow foldTrigger', children:[colModel[i]]});				 	
				}else if(sIdx <= i && eIdx >= i){
					tempchildern.push(colModel[i]);
					if(eIdx == i || colModel.length == (i+1)){						
						tempColModel.push({headerText: "", dataField:'', headerStyle:'hideColRow foldTarget', children:$.extend(true, [], tempchildern)});
						tempchildern = new Array();
					}
				}else{
					tempchildern.push(colModel[i]);					
				}
			}
			if(tempchildern.length > 0){
				tempColModel.push({headerText: "", dataField:'', headerStyle:'hideColRow', children:$.extend(true, [], tempchildern)});
			}
			colModel = tempColModel;
		}
		
		return colModel;
	}
	
	/**
	 * 저장된 layout 가져오기
	 */
	this._getSaveColumnLayout=function(colModel){
		if(typeof(Storage) != "undefined") { // Check browser support
			//localStorageId 기본값 설정
			if (_t.opts.useContextMenu && !_t.opts.localStorageId && gfn_toStr(CONST.PROG_CD) != '') {
				_t.opts.localStorageId = CONST.PROG_CD + _t._wrapId.replace('#', '.');
			}
			
			//저장 된 상태가 있다면 저장된 레이아웃을 로드 한다.
			var columnLayout = null;
			var columnStr;
			if(!gfn_isNull(_t.opts.localStorageId) && !gfn_isNull(_t.opts)){
				columnStr =  localStorage.getItem(_t.opts.localStorageId+".auigridLayout");//localStorage.getItem("AAAA.GGGG");
				if(columnStr && typeof columnStr != "undefined") {
					columnLayout = JSON.parse(columnStr);
				}
				// localStorage 에 보관된 정보가 있다면 저장된 정보로 출력.
				if(columnLayout) {
					try{
						colModel = step1(colModel, columnLayout);
						commonBodyContextMenusStatus['saveFormat'] = true;
						_t.opts.useSaveColumnLayout = true;
					}catch(e){
						localStorage.removeItem(_t.opts.localStorageId+".auigridLayout");
						dc(e);
					}
				}
			}
		}
		return colModel;
		
		function step1(colModel, saveColModel){
			for(var i = 0; i < saveColModel.length; i++) {
				if(gfn_isNull(saveColModel[i]['customColumnIndex'])) throw "saveColModel customColumnIndex error";
				
				if (saveColModel[i].children && saveColModel[i].children.length > 0) {
					step1(colModel, saveColModel[i].children);
				}

				var newModel = {};
				newModel['customColumnIndex'] = saveColModel[i]['customColumnIndex'];
				if(saveColModel[i]['headerText'] == '-' || saveColModel[i]['headerText'] == '+') newModel['headerText'] = saveColModel[i]['headerText']; 
				if(!gfn_isNull(saveColModel[i]['visible'])) newModel['visible'] = saveColModel[i]['visible'];
				if(!gfn_isNull(saveColModel[i]['width'])) newModel['width'] = saveColModel[i]['width'];
				
				var colModelItem = step2(colModel, newModel['customColumnIndex']);
				if(colModelItem == null) throw "colModel layout not find error";
				delete colModelItem['children'];
				newModel = $.extend(true,colModelItem,newModel);
				
				saveColModel[i] = $.extend(true,saveColModel[i],newModel);
				
			}
			return saveColModel;
		};
		
		function step2(colModel, customColumnIndex){
			var rtnItem = null;
			for(var i = 0; i < colModel.length; i++) {
				if(gfn_isNull(colModel[i]['customColumnIndex'])) throw "colModel customColumnIndex error";
					
				if(colModel[i]['customColumnIndex'] == customColumnIndex){
					rtnItem = $.extend(true,{},colModel[i]);
					break;
				}else{
					if (colModel[i].children && colModel[i].children.length > 0) {
						rtnItem = step2(colModel[i].children, customColumnIndex);
						if(rtnItem != null) break;
					}
				}
			}
			return rtnItem;
		};
	}
	
	/**
	 * 컬럼 숨김처리
	 */
	this._setFoldHideColumn = function(){
		if(_t.opts.initHideColInfo.length > 0){
			for(var i=0; i<_t.opts.initHideColInfo.length; i++)	AUIGrid.hideColumnByDataField(_pid,_t._getDataFieldArrByColumnIndex(_t.opts.initHideColInfo[i].sHideIdx, _t.opts.initHideColInfo[i].eHideIdx));
		}
	};

	/**
	 * 컬럼 속성 보정
	 */
	this._adjustColModel = function(colModel, isFooter, isFirst) {
		if(gfn_isNull(isFirst)) isFirst = true;
		
		if(isFirst){
			_t.opts.customColumnIndex = 0;
			_t.opts.treeRenderInfo.tempColumnIndex = 0;
		}
		
		for(var i = 0; i < colModel.length; i++) {
			if(gfn_isNull(colModel[i]['customColumnIndex'])) colModel[i]['customColumnIndex'] = _t.opts.customColumnIndex++;
			if (colModel[i].children && colModel[i].children.length > 0) {
				_t._adjustColModel(colModel[i].children, false, false);
			} else {
				_setColModel(colModel[i]);
				_t.opts.treeRenderInfo.tempColumnIndex++;
			}
		}
		return colModel;
		
		//colModel 설정
		function _setColModel(colInfo) {
			var headerStyles = [];
			var colStyles = [];

			//정렬불가 컬럼이면 헤더의 커서 제거
			if (colInfo.sortable === false) {
				headerStyles.push('no-cursor');
			}

			//기존스타일 있으면 추가
			if (colInfo.style) {
				colStyles.push(colInfo.style);
			}
			
			//정렬 스타일 추가 && 입력가능여부 스타일 추가
			if(!isFooter){
				if (!gfn_isNull(colInfo.align) && (colInfo.align == 'right' || colInfo.align == 'left')) {
					if(colInfo.align == 'right'){
						if(!gfn_isNull(colInfo.editable) && _t.opts.editable){
							if(colInfo.editable) colStyles.push("aui-grid-align-right-editable");//입력가능
							else colStyles.push("aui-grid-align-right-noneditable");//입력불가
						}else{
							if(_t.opts.editable)  colStyles.push("aui-grid-align-right-editable");//입력가능
							else colStyles.push("aui-grid-align-right-noneditable");//입력불가
						}
					}else if(colInfo.align == 'left'){
						if(!gfn_isNull(colInfo.editable) && _t.opts.editable){
							if(colInfo.editable) colStyles.push("aui-grid-align-left-editable");//입력가능
							else colStyles.push("aui-grid-align-left-noneditable");//입력불가
						}else{
							if(_t.opts.editable)  colStyles.push("aui-grid-align-left-editable");//입력가능
							else colStyles.push("aui-grid-align-left-noneditable");//입력불가
						}
					}
				}else{
					if(!gfn_isNull(colInfo.editable) && _t.opts.editable){
						if(colInfo.editable) colStyles.push("aui-grid-editable");//입력가능
						else colStyles.push("aui-grid-noneditable");//입력불가
					}else{
						if(_t.opts.editable)  colStyles.push("aui-grid-editable");//입력가능
						else colStyles.push("aui-grid-noneditable");//입력불가
					}
				}
			}
			
			//필수입력 체크 
			if (gfn_nvl(colInfo.required, false) == true) {
				//colInfo.headerText = "<i class='asterisk'></i>" + colInfo.headerText;
				if(gfn_isNull(colInfo.orgHeaderText)) {
					colInfo.orgHeaderText = colInfo.headerText;
				}else{
					colInfo.headerText = colInfo.orgHeaderText;
				}
				
				colInfo.headerText = '<i class="asterisk">*</i>  ' + colInfo.headerText;
			}
			
			
			//수정가능 컬럼
			if (_t.opts.star === true) {
				if (gfn_nvl(colInfo.markEditable, false) === true) {
					colInfo.headerText = '<img src="' + CONST.CONTEXT_PATH + '/images/bul_search_star.png" style="vertical-align:middle;"> ' + colInfo.headerText;
				}
			}

			//focusDataField 설정
			if (_t.opts.focusDataField == null) {
				_t._pickFocusDataField(colInfo);
			}

			var nullable = gfn_isNull(colInfo.nullable) ? false : colInfo.nullable;
			
			//renderer별 설정
			if (colInfo.renderType) {
				var renderType = colInfo.renderType.toLowerCase();

				//DropDownListRenderer
				if (renderType == 'dropdown') {
					colInfo.editRenderer = g_keyValueDropDown.renderer(colInfo.renderList, gfn_nvl(colInfo.keyField, null), gfn_nvl(colInfo.valueField, null), colInfo);
					colInfo.labelFunction = g_keyValueDropDown.labelFunction(colInfo.renderList, gfn_nvl(colInfo.keyField, null), gfn_nvl(colInfo.valueField, null), colInfo, _t);
					
					if(colStyles.join(',').indexOf("noneditable") > -1){//수정불가 항목 에디터 버턴을 미출력
						colInfo.editRenderer.showEditorBtn = false;
						colInfo.editRenderer.showEditorBtnOver = false;
					}
					
					//검색기능 사용여부
					if(!gfn_isNull(colInfo.autoCompletMode)){
						colInfo.editRenderer.type = "ComboBoxRenderer";
						colInfo.editRenderer.autoCompleteMode = colInfo.autoCompletMode;
						colInfo.editRenderer.matchFromFirst = false;//앞부분 일치검색 여부
						colInfo.editRenderer.autoEasyMode = true;
					}
				}
				//숫자(소수점가능)만 입력 가능한 InputEditRenderer
				else if (renderType == 'number') {
					colInfo.dataType = "numeric";					
					if(gfn_isNull(colInfo.align)) colInfo.align = "right";
					if(gfn_isNull(colInfo.formatString)) colInfo.formatString = nullable ? g_localeOptions.floatType.replace(/0/g,'#') : g_localeOptions.floatType;
					
					var defEditRenderer = {
						type : 'InputEditRenderer',
						onlyNumeric : true,
						allowPoint : true,
						allowNegative :true	// 마이너스 부호(-)허용 여부
					};
					colInfo.editRenderer = $.extend({}, defEditRenderer, colInfo.editRenderer);
					colInfo.validatorSet = $.extend({}, { onlyNum: true }, colInfo.validatorSet);
				}
				//숫자(소수점불가)만 입력 가능한 InputEditRenderer
				else if (renderType == 'onlynumber') {
					colInfo.dataType = "numeric";
					if(gfn_isNull(colInfo.align)) colInfo.align = "right";
					if(gfn_isNull(colInfo.formatString)) colInfo.formatString = nullable ? g_localeOptions.numberType.replace(/0/g,'#') : g_localeOptions.numberType;
					
					var defEditRenderer = {
						type: 'InputEditRenderer',
						onlyNumeric: true,
						allowNegative :true	// 마이너스 부호(-)허용 여부
					};
					colInfo.editRenderer = $.extend({}, defEditRenderer, colInfo.editRenderer);
					colInfo.validatorSet = $.extend({}, { onlyNum: true }, colInfo.validatorSet);
				}
				//통화만 입력 가능한 InputEditRenderer
				else if (renderType == 'currency') {
					colInfo.dataType = "numeric";
					if(gfn_isNull(colInfo.align)) colInfo.align = "right";
					if(gfn_isNull(colInfo.formatString)) colInfo.formatString = nullable ? g_localeOptions.currencyType.replace(/0/g,'#') : g_localeOptions.currencyType;

					var defEditRenderer = {
						type : 'InputEditRenderer',
						onlyNumeric : true,
						allowNegative :true	// 마이너스 부호(-)허용 여부
					};
					colInfo.editRenderer = $.extend({}, defEditRenderer, colInfo.editRenderer);
					colInfo.validatorSet = $.extend({}, { onlyNum: true }, colInfo.validatorSet);
				}
				//통화만 입력 가능한 InputEditRenderer
				else if (renderType == 'fcurrency') {
					colInfo.dataType = "numeric";
					if(gfn_isNull(colInfo.align)) colInfo.align = "right";
					if(gfn_isNull(colInfo.formatString)) colInfo.formatString = nullable ? g_localeOptions.floatType.replace(/0/g,'#') : g_localeOptions.floatType;

					var defEditRenderer = {
						type : 'InputEditRenderer',
						onlyNumeric : true,
						allowPoint : true,
						allowNegative :true	// 마이너스 부호(-)허용 여부
					};
					colInfo.editRenderer = $.extend({}, defEditRenderer, colInfo.editRenderer);
					colInfo.validatorSet = $.extend({}, { onlyNum: true }, colInfo.validatorSet);
				}
				//CheckBoxEditRenderer
				else if (renderType == 'checkbox') {
					if(gfn_isNull(colInfo.align)) colInfo.align = "center";
					var defRenderer = {
						type : 'CheckBoxEditRenderer'
						,editable : true
						,checkValue : 'Y'
						,unCheckValue : 'N'
					};
					
					
					colInfo.renderer = $.extend({}, defRenderer, colInfo.renderer);
				}
				else if (renderType == 'unablecheckbox') {
					if(gfn_isNull(colInfo.align)) colInfo.align = "center";
					var defRenderer = {
						type : 'CheckBoxEditRenderer'
						,editable : false
						,checkValue : 'Y'
						,unCheckValue : 'N'
					};
					colInfo.renderer = $.extend({}, defRenderer, colInfo.renderer);
				}
				//HHmm형식 input
				else if (renderType == 'hhmm') {
					var defEditRenderer = {
		                type : 'InputEditRenderer'
		                ,validator : _t._validator.HHmm(colInfo.addValidator)
					};
					colInfo.editRenderer = $.extend({}, defEditRenderer, colInfo.editRenderer);
				}	
				//onlyAlphaNum input
				else if (renderType == 'onlyalphanum') {
					
					var defEditRenderer = {
		                 type : 'InputEditRenderer'
		                ,validator : _t._validator.onlyAlphaNum(colInfo.addValidator)
					};
					colInfo.editRenderer = $.extend({}, defEditRenderer, colInfo.editRenderer);
				}		
				//onlyAlphaNumSpec input
				else if (renderType == 'onlyalphanumspec') {
					
					
					var defEditRenderer = {
		                 type : 'InputEditRenderer'
		                ,validator : _t._validator.onlyAlphaNumSpec(colInfo.addValidator)
					};
					colInfo.editRenderer = $.extend({}, defEditRenderer, colInfo.editRenderer);
				}
				
				//날짜(YYYYMMDD)
				else if (renderType == 'hcalyymmdd') {
					
					colInfo.dataType = 'date';
					
					if(gfn_isNull(colInfo.dateInputFormat)) colInfo.dateInputFormat = "yyyymmdd";  // 실제 데이터의 형식 지정
					if(gfn_isNull(colInfo.formatString))    colInfo.formatString = "yyyy-mm-dd";   //기본 날짜포맷 설정
					var onlyCal = true;
					if(renderType == 'calendar_e') onlyCal = false;
									
					
					var defRenderer = {
							type : "IconRenderer",
							iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
		                    iconHeight : 16,
		                    showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 출력 여부
							iconPosition : "aisleRight",
									iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
										"default" :  CONST.CONTEXT_PATH + "/hansalim/images/icon/icon-calendar-sm.svg"
						},
						onClick : function(event) {							
							gfn_cmmnGridCal(event);
						}
					}
					
					colInfo.renderer = $.extend({}, defRenderer);
				}
				//팝업
				else if (renderType == 'popup') {
					
					let _callFunc = colInfo.callFunction; 
				
					var defRenderer = {
							type : "IconRenderer",
							iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
		                    iconHeight : 16,
		                    showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 출력 여부
							iconPosition : "aisleRight",
									iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
										//"default" :  CONST.CONTEXT_PATH + "/hansalim/images/icon/icon-popup.svg"
										"default" :  CONST.CONTEXT_PATH + "/hansalim/images/icon/icon-search-sm.svg"
						},
						onClick : function(event) {		
							
							
							let ele = AUIGrid.getCellElementByIndex(event.pid, event.rowIndex, event.columnIndex);		
							let _callFunction = eval(_callFunc);
		   					if ($.isFunction(_callFunction)) { 
								_callFunction(event, ele);
							} 			
						    
						}
					}
					
					colInfo.renderer = $.extend({}, defRenderer, colInfo.editRenderer);
				}
									
				//날짜(YYYYMMDD)
				else if (renderType == 'calendar' || renderType == 'calendar_e') {
					colInfo.dataType = 'date';
					
					
					if(gfn_isNull(colInfo.dateInputFormat)) colInfo.dateInputFormat = "yyyymmdd";  // 실제 데이터의 형식 지정
					if(gfn_isNull(colInfo.formatString))    colInfo.formatString = "yyyy-mm-dd";   //기본 날짜포맷 설정
					var onlyCal = true;
					if(renderType == 'calendar_e') onlyCal = false;
					
					var defRenderer = {
							type : "CalendarRenderer",
							defaultFormat : "yyyymmdd", // 달력 선택 시 데이터에 적용되는 날짜 형식
							showEditorBtnOver : true, // 마우스 오버 시 에디터버턴 출력 여부
							onlyCalendar : onlyCal, // 사용자 입력 불가, 즉 달력으로만 날짜입력 (기본값 : true)
							showExtraDays : true, // 지난 달, 다음 달 여분의 날짜(days) 출력
							showTodayBtn : true, // 오늘 날짜 선택 버턴 출력
							showUncheckDateBtn : true, // 날짜 선택 해제 버턴 출력
							todayText : "오늘 선택", // 오늘 날짜 버턴 텍스트
							uncheckDateText : "날짜 선택 해제", // 날짜 선택 해제 버턴 텍스트
							uncheckDateValue : "", // 날짜 선택 해제 버턴 클릭 시 적용될 값.
					};
					colInfo.editRenderer = $.extend({}, defRenderer, colInfo.editRenderer);
				}
				//년월(YYYYMM)
				else if (renderType == 'calendar_ym' || renderType == 'calendar_ym_e') {
					colInfo.dataType = 'date';
					if(gfn_isNull(colInfo.dateInputFormat)) colInfo.dateInputFormat = "yyyymm"; // 실제 데이터의 형식 지정
					if(gfn_isNull(colInfo.formatString))    colInfo.formatString = g_localeOptions.yymmFormat;	//기본 날짜포맷 설정
					var onlyCal = true;
					if(renderType == 'calendar_ym_e') onlyCal = false;
					
					var defRenderer = {
							type : "CalendarRenderer",
							defaultFormat : "yyyymm", // 달력 선택 시 데이터에 적용되는 날짜 형식
							firstDay : 1, // 요일 시작 날짜 지정 (일요일인 경우 0, 월요일인 경우 1 등)
							showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 출력 여부
							onlyCalendar : onlyCal, // 사용자 입력 불가, 즉 달력으로만 날짜입력 (기본값 : true)
							onlyMonthMode : true // 일 단위 달력이 아닌 월 단위 달력 출력
					};
					
					colInfo.editRenderer = $.extend({}, defRenderer, colInfo.editRenderer);
				}
				
				// 우편번호 InputEditRenderer
				else if (renderType == 'zip_code') {
					var defEditRenderer = {
						type : 'InputEditRenderer'
					};
					colInfo.editRenderer = $.extend({}, defEditRenderer, colInfo.editRenderer);
					colInfo.validatorSet = $.extend({}, _t._getLocaleValidSet(g_localeOptions.zipCheckCd, g_localeOptions.zipLength), colInfo.validatorSet);
				}
				// 은행계좌번호 InputEditRenderer
				else if (renderType == 'bank_code') {
					var defEditRenderer = {
						type : 'InputEditRenderer'
					};
					colInfo.editRenderer = $.extend({}, defEditRenderer, colInfo.editRenderer);
					colInfo.validatorSet = $.extend({}, _t._getLocaleValidSet(g_localeOptions.bankCheckCd, g_localeOptions.bankLength), colInfo.validatorSet);
				}
				// 전화번호 InputEditRenderer
				else if (renderType == 'phone') {
					//colInfo.dataType = "numeric";
					var defEditRenderer = {
						type : 'InputEditRenderer',
						onlyNumeric : true
					};
					colInfo.editRenderer = $.extend({}, defEditRenderer, colInfo.editRenderer);
					colInfo.validatorSet = $.extend({}, _t._getLocaleValidSet(g_localeOptions.fmTelnoCd, g_localeOptions.fmTelnoCnt), colInfo.validatorSet);
				}
				// 핸드폰번호 InputEditRenderer
				else if (renderType == 'handphone') {
					//colInfo.dataType = "numeric";
					var defEditRenderer = {
						type : 'InputEditRenderer',
						onlyNumeric : true
					};
					colInfo.editRenderer = $.extend({}, defEditRenderer, colInfo.editRenderer);
					colInfo.validatorSet = $.extend({}, _t._getLocaleValidSet(g_localeOptions.fmHpnoCd, g_localeOptions.fmHpnoCnt), colInfo.validatorSet);
				}
				// 주민번호 InputEditRenderer
				else if (renderType == 'mbrid') {
					//colInfo.dataType = "numeric";
					var defEditRenderer = {
						type : 'InputEditRenderer'
					};
					colInfo.editRenderer = $.extend({}, defEditRenderer, colInfo.editRenderer);
					colInfo.validatorSet = $.extend({}, _t._getLocaleValidSet(g_localeOptions.fmMbrIdCd, g_localeOptions.fmMbrIdCnt), colInfo.validatorSet);
				}
				// 주민번호 InputEditRenderer
				else if (renderType == 'bizrgsno') {
//					colInfo.dataType = "numeric";
					var defEditRenderer = {
						type : 'InputEditRenderer'
					};
					colInfo.editRenderer = $.extend({}, defEditRenderer, colInfo.editRenderer);
					colInfo.validatorSet = $.extend({}, _t._getLocaleValidSet('03', '10'), colInfo.validatorSet);
				}
				else if (renderType == 'searchicon') {
					var defRenderer = {
						type : 'IconRenderer'
						,iconPosition:"aisleRight"  // 아이콘 위치
						,iconTableRef:{ // icon 값 참조할 테이블 레퍼런스
							"default":CONST.CONTEXT_PATH + '/grid/auigrid/css/images/icon_aui_search.png' // default
						}
					};
					colInfo.renderer = $.extend({}, defRenderer, colInfo.renderer);
				}
				else if (renderType == 'tree') {
					_t.opts.treeRenderInfo.useTreeRender = true;
					var treeId = _t._wrapId.substring(1)+"_tree_"+"_"+_t.opts.treeRenderInfo.tempColumnIndex;//트리 렌더러 아이디
					_t.opts.treeRenderInfo.treeIdObj[_t.opts.treeRenderInfo.tempColumnIndex] = treeId;
					if(!gfn_isNull(colInfo.editable)){
						if(colInfo.editable) _t.opts.treeRenderInfo.treeEditableObj[_t.opts.treeRenderInfo.tempColumnIndex] = true;//입력가능
						else _t.opts.treeRenderInfo.treeEditableObj[_t.opts.treeRenderInfo.tempColumnIndex] = false;//입력불가
					}else{
						if(_t.opts.editable) _t.opts.treeRenderInfo.treeEditableObj[_t.opts.treeRenderInfo.tempColumnIndex] = true;//입력가능
						else _t.opts.treeRenderInfo.treeEditableObj[_t.opts.treeRenderInfo.tempColumnIndex] = false;//입력불가
					}
					
					if ($("#"+treeId).length == 0 ){
						var html = "";
						html += '<div id="'+treeId+'Context" class="extension form-field context-tree-wrap"> ';
						html += '	<div class="ext-header"> ';
						html += '		<input type="text" class="form-control tree-filter" id="'+treeId+'SearchBox"> ';
						html += '	</div> ';
						html += '	<div class="ext-cont"> ';
						html += '		<div id="'+treeId+'" class="fancytree fancytreeFilter fancySelectSingle fancySelectTree" onchange='+colInfo.onclick+' data-bind="'+colInfo.renderList+'" levelLimit="'+colInfo.levelLimit+'"> ';
						html += '	</div> ';
						html += '</div>';
						$("#container").prepend(html);
					}
					
					var defRenderer = {
							type : "TemplateRenderer",
				            aliasFunction : function (rowIndex, columnIndex, value, headerText, item ) { // 엑셀, PDF 등 내보내기 시 값 가공 함수
				            	if(gfn_isNull(value)) value = ''; 
				            	return value;
				            }
					};
					colInfo.renderer = $.extend({}, defRenderer, colInfo.renderer);
					colInfo.editable = false;
					
					var alignClass = "tac";
					if(!gfn_isNull(colInfo.align) && colInfo.align == 'left') alignClass = "tal";
					else if(!gfn_isNull(colInfo.align) && colInfo.align == 'right') alignClass = "tar";
					
					colInfo.labelFunction = function (rowIndex, columnIndex, value, headerText, item ) { //HTML 템플릿 작성
						if(gfn_isNull(value)) value = '';
			            return '<div class="custom-renderer '+alignClass+'">' + value + '</div>';
					}
				}
			}

			if (colInfo.showCurrUnit == 'true') {
				var currUnit = "";
				// 통화 labeltype일 경우만 적용
				if (colInfo.labelType.toLowerCase() == 'currency') {
					//로케일 DB의 통화 표기 값
					currUnit = !gfn_isNull(g_localeOptions.currencyUnit) ? g_localeOptions.currencyUnit : "";
					if (g_localeOptions.fmCurrPlaceCd == "01"){
						colInfo.prefix = currUnit;
					}else {
						colInfo.postfix = currUnit;
					}
				}
			}

			//lable형식별 설정
			if (colInfo.labelType) {

				var labelType = colInfo.labelType.toLowerCase();
				if (labelType == 'version') {
					if (!colInfo.labelFunction) {
						colInfo.labelFunction = function(rowIndex, columnIndex, value, headerText, item) {
							if(!gfn_isNull(value) && value.length == 10){
								return value.substr(2,2)+'/'+value.substr(4,2)+'/'+value.substr(6,2)+'('+value.substr(8,2)+'주)';
							}else{
								return null;
							}

						};
					}
				} else if (labelType == 'bizrgsno') {
					if (!colInfo.labelFunction) {
						colInfo.labelFunction = function(rowIndex, columnIndex, value, headerText, item) {
							if( !gfn_isNull(value) ){
								if( value.length == 10 ){
									return value.substr(0,3)+'-'+value.substr(3,2)+'-'+value.substr(5,5);
								}
							}else{
								return null;
							}

						};
					}
				} else if (labelType == 'yn') {//Y/N 형식
					if (!colInfo.labelFunction) {
						colInfo.labelFunction = function(rowIndex, columnIndex, value, headerText, item) {
							return g_formatYN(value);
						};
					}
				} else if (labelType == 'currency') {//통화 형식
					colInfo.dataType = 'numeric';
					if(gfn_isNull(colInfo.formatString)) colInfo.formatString = nullable ? g_localeOptions.currencyType.replace(/0/g,'#') : g_localeOptions.currencyType;
						
				} else if (labelType == 'fcurrency') {//통화 형식
					colInfo.dataType = 'numeric';
					if(gfn_isNull(colInfo.formatString)) colInfo.formatString = nullable ? g_localeOptions.floatType.replace(/0/g,'#') : g_localeOptions.floatType;
					
				} else if (labelType == 'comma') {//콤마(소숫점 미포함) 형식
					colInfo.dataType = 'numeric';
					if(gfn_isNull(colInfo.formatString)) colInfo.formatString = nullable ? g_localeOptions.numberType.replace(/0/g,'#') : g_localeOptions.numberType;
					
				} else if (labelType == 'fcomma') {//콤마(소숫점 포함) 형식
					colInfo.dataType = 'numeric';
					if(gfn_isNull(colInfo.formatString)) colInfo.formatString = nullable ? g_localeOptions.floatType.replace(/0/g,'#') : g_localeOptions.floatType;
					
				} else if (labelType == 'yyyymmdd') {//년월일 형식
					if (!colInfo.labelFunction) {
						colInfo.labelFunction = function(rowIndex, columnIndex, value, headerText, item) {
							if(typeof gfn_formatDate(value) != "undefined"){
								return gfn_formatDate(value);
							}else{
								return '';
							}
						};
					}
				} else if (labelType == 'yyyy-mm-dd') {//년월일 형식
					if (!colInfo.labelFunction) {
						colInfo.labelFunction = function(rowIndex, columnIndex, value, headerText, item) {
							if(typeof gfn_formatDate(value) != "undefined" && !gfn_isNull(value) ){
								return gfn_formatDate(value,'YYYYMMDD','YYYY-MM-DD');
							}else{
								return '';
							}
						};
					}
				} else if (labelType == 'yyyymm') {//년월 형식
					if (!colInfo.labelFunction) {
						colInfo.labelFunction = function(rowIndex, columnIndex, value, headerText, item) {
							return gfn_formatDate(value,'YYYYMM','YYYY-MM');
						};
					}
				} else if (labelType == 'yyyy-mm') {//년월 형식
					if (!colInfo.labelFunction) {
						colInfo.labelFunction = function(rowIndex, columnIndex, value, headerText, item) {
							if(typeof gfn_formatDate(value) != "undefined"){
								return gfn_formatDate(value,'YYYYMM','YYYY-MM');
							}else{
								return '';
							}
						};
					}
				} else if (labelType == 'hh:mm') {//년월 형식
					if (!colInfo.labelFunction) {
						colInfo.labelFunction = function(rowIndex, columnIndex, value, headerText, item) {
							if(typeof gfn_formatDate(value) != "undefined" && !gfn_isNull(value) ){
								return gfn_formatDate(value,'HHmm', 'HH:mm');
							}else{
								return '';
							}
						};
					}
				} else if (labelType == 'hh:mm:ss') {//년월 형식
					if (!colInfo.labelFunction) {
						colInfo.labelFunction = function(rowIndex, columnIndex, value, headerText, item) {
							if(typeof gfn_formatDate(value) != "undefined" && !gfn_isNull(value) ){
								return gfn_formatDate(value,'HHmmss', 'HH:mm:ss');
							}else{
								return '';
							}
						};
					}
				} else if (labelType == 'datetime') {//일시 형식
					if (!colInfo.labelFunction) {
						colInfo.labelFunction = function(rowIndex, columnIndex, value, headerText, item) {
							return gfn_formatDate(value,'YYYYMMDDHHmmSS','YYYY-MM-DD HH:mm:SS');
						};
					}
				}
			}

			//editRenderer validator 공통 설정
			if (colInfo.validatorSet) {
				if (!colInfo.editRenderer) {
					colInfo.editRenderer = { type: 'InputEditRenderer' };
				}
				
				if (!colInfo.editRenderer.validator) {
					colInfo.editRenderer.validator = _t._validator.common(colInfo);
				}
			}

			//헤더 스타일 적용
			if (headerStyles.length > 0) {
				if(gfn_isNull(colInfo.headerStyle)) colInfo.headerStyle = headerStyles.join(' ');
				else colInfo.headerStyle = colInfo.headerStyle+' '+headerStyles.join(' ');
			}

			//onlyNumeric/current/comma 컬럼인 경우 style 값이 없으면 우측정렬로 설정
				if (!colInfo.style && gfn_toStr(colInfo.renderType).toLowerCase().indexOf('phone') == -1) {
					
				    
					if(colStyles.indexOf("aui-grid-editable") > -1) colStyles.splice(colStyles.indexOf("aui-grid-editable"),1);
					if(colStyles.indexOf("aui-grid-noneditable") > -1 )colStyles.splice(colStyles.indexOf("aui-grid-noneditable"),1);
					
					if(colStyles.join(',').indexOf("aui-grid-align") == -1){
						
						let editableStyle = "aui-grid-align-center-editable";
						let noneditableStyle = "aui-grid-align-center-noneditable";
						
						if(!gfn_isNull(colInfo.align)) {
							
							if(colInfo.align == 'left') {
								editableStyle = "aui-grid-align-left-editable";
								noneditableStyle  = "aui-grid-align-left-noneditable";
							}else if(colInfo.align == 'right') {								
								editableStyle = "aui-grid-align-right-editable";
								noneditableStyle  = "aui-grid-align-right-noneditable";								
							}else{
								editableStyle = "aui-grid-align-center-editable";
								noneditableStyle  = "aui-grid-align-center-noneditable";
							}
							
						}

						if(!gfn_isNull(colInfo.editable) && _t.opts.editable){
							if(colInfo.editable) colStyles.push(editableStyle);//입력가능
							else colStyles.push(noneditableStyle);//입력불가
						}else{
							if(_t.opts.editable)  colStyles.push(editableStyle);//입력가능
							else colStyles.push(noneditableStyle);//입력불가
						}
					}
				}

			//컬럼 스타일 적용
			if (colStyles.length > 0) {
				colInfo.style = colStyles.join(' ');
			}

			//공통코드명
			if (colInfo.codeList) {
			    colInfo.labelFunction = g_labelFunction.codeValue(colInfo);
			}
		}
	};
	
	/**
	 * 그리드 트리렌더러 노출
	 */
	this._treeRenderView = function(event, treeId){
		var pid = event.pid;
		var td = _t.getCellElementByIndex(event.rowIndex, event.columnIndex);
		var context = $(td);
		var offset = context.offset();
		var maxHeight = 260;
		var winHeight = $("#container").height();
		// 레이어 이동 시키기 (이부분 추가)
		var ext = $("#"+treeId+"Context"),
			tree = $.ui.fancytree.getTree("#"+treeId);
		
		var extInput = ext.find(".ext-header input[type=text]");
		
		tree.expandAll(false);//열린트리 닫기
		extInput.val("");//검색창 검색어 삭제
		tree.clearFilter();//검색된 트리 초기화
		var activeNode = tree.getActiveNode();
		if(!gfn_isNull(activeNode)) activeNode.setActive(false);//선택노트 -> 미선택으로 상태변경
		
		ext.addClass("active", function(){
			if ( extInput.length ) {
				extInput.focus();
			};
			
			//요소 밖 클릭시 닫히기
			$("body").on("click.aClick", function(e){
				if (!$(e.target).closest('#'+treeId+'Context').length) {
					ext.removeClass("active");
					$("body").off("click.aClick");
				}
			});
		}).css({left: offset.left});
		
		if( (offset.top + maxHeight) > winHeight ) {
			var offsetTop = Math.ceil(offset.top) - maxHeight;
			ext.css({left: offset.left, top: offsetTop});
		} else {
			ext.css({top: Math.ceil(offset.top) + context.outerHeight()});
		}
	};

	/**
	 * focusDataField 자동선택
	 */
	this._pickFocusDataField = function(colInfo) {
		if (colInfo.children && colInfo.children.length > 0) {
			$.each(colInfo.children, function(idx, childCols) {
				if (childCols.children && childCols.children.length > 0) {
					$.each(childCols.children, function(idx2, childCols2) {
						return chkEnableCol(childCols2);
					});
				} else {
					return chkEnableCol(childCols);
				}
			});
		} else {
			return chkEnableCol(colInfo);
		}

		function chkEnableCol(col) {
			//그리드전체가 수정불가인 경우
			if (gfn_nvl(_t.opts.editable, true) == false) {
				if (gfn_toStr(colInfo.width) == '0' || !gfn_nvl(colInfo.visible, true)) {
					return false;
				} else {
					_t.opts.focusDataField = col.dataField;
					return true;
				}
			} else {
				if (_t._isEditableColumn(col)) {
					_t.opts.focusDataField = col.dataField;
					return false;
				} else {
					return true;
				}
			}
		}
	};
	
	/**
	 * 그리드 resize
	 */
	this.resize = function(w, h) {
		AUIGrid.resize(_pid, w, h);  //w, h 파라미터가 없으면 부모 Div의 크기에 따라 resize
	};

	/**
	 * 푸터 객체 세팅
	 */
	this.setFooter = function(footerModel) {
		_t._adjustColModel(footerModel, true);
		AUIGrid.setFooter(_pid, footerModel);
	};

	/**
	 * 푸터 데이터 리턴
	 * @return (Array) 출력된 푸터 데이터
	 */
	this.getFooterData = function() {
		return AUIGrid.getFooterData(_pid);
	};
	
	/**
	 * 푸터를 설정한 경우 푸터의 특정 필드 값을 반환합니다.
	 * @param dataField : (String) 푸터의 출력 위치 dataField 
	 * @return (Number or String) 해당 열의 푸터 값
	 */
	this.getFooterValueByDataField = function(dataField){
		return AUIGrid.getFooterValueByDataField(_pid, dataField);
	};

	/**
	 * 푸터를 설정한 경우 푸터의 특정 필드 포매팅된 값을 반환합니다.
	 * 
	 * 참고 : getFooterValueByDataField 과 getFooterFormatValueByDataField 의 차이는 
	 *        값의 포매팅 여부 입니다.
	 * @param dataField : (String) 푸터의 출력 위치 dataField 
	 * @return (Number or String) 해당 열의 푸터 포매팅된 값
	 */
	this.getFooterFormatValueByDataField = function(dataField){
		return AUIGrid.getFooterFormatValueByDataField(_pid, dataField);
	};

	/**
	 * 그리드 전체 컬럼정보 리턴
	 */
	this.getColumnInfoList = function() {
		return AUIGrid.getColumnInfoList(_pid);
	};
	
	/**
	 * 데이터 필드(dataField)에 맞는 칼럼 레이아웃의 칼럼 객체를 반환합니다.
	 * @param dataField : (String) 컬럼이 출력하고 있는 데이터필드명
	 * @return (Object) 칼럼 레이아웃의 칼럼 객체
	 */
	this.getColumnItemByDataField = function(dataField){
		return AUIGrid.getColumnItemByDataField(_pid, dataField);
	};
	
	/**
	 * 그리드에 출력된 현재 칼럼 레이아웃을 반환합니다.
	 */
	this.getColumnLayout = function(){
		return AUIGrid.getColumnLayout(_pid);
	};

	/**
	 * 그리드에 출력된 푸터 레이아웃을 반환합니다.
	 */
	this.getFooterLayout = function(){
		return AUIGrid.getFooterLayout(_pid);
	};
	
	/**
	 * 그리드의 칼럼이 출력하는 모든 값들을 반환합니다.
	 * @param dataField : (String) 칼럼의 dataField 명
	 * @param total : (Boolean) 그리드의 원래 데이터를 대상으로 할지 여부. 즉, 필터링이 된 경우 필터링 된 상태의 값만 원한다면 false 지정
	 * @return  (Array) 해당 칼럼이 출력하고 있는 모든 값들
	 */
	this.getColumnValues = function(dataField, total){
		return AUIGrid.getColumnValues(_pid, dataField, total);
	};

	/**
	 * 그리드 특정 컬럼정보 리턴
	 */
	this._getColumnInfo = function(dataField) {
		var colInfos = _t.getColumnInfoList();
		var grepCols = gfn_grepData(colInfos, 'dataField', dataField);

		if (grepCols.length > 0) {
			return grepCols[0];
		}
		else {
			return null;
		}
	};

	/**
	 * 숨겨진 컬럼의 dataFiled명을 배열로 리턴
	 */
	this.getHiddenColumnDataFields = function(propName) {
		return AUIGrid.getHiddenColumnDataFields(_pid);
	};

	/**
	 * 그리드 property 조회
	 */
	this.getProp = function(propName) {
		return AUIGrid.getProp(_pid, propName);
	};

	/**
	 * 그리드 property 설정
	 */
	this.setProp = function(propName, propVal) {
		AUIGrid.setProp(_pid, propName, propVal);
	};

	/**
	 * 그리드 컬럼속성 변경
	 * @ex setColProp( 'dataFiled', { headerText : "헤더 텍스트", width : 100 } );
	 */
	this._setColProp = function(dataField, propObj) {
		AUIGrid.setColumnProp(_pid, _t.getColumnIndexByDataField(dataField), propObj);
	};
	
	/**
	 * 최초 설정한 칼럼 레이아웃의 columnIndex 에 맞는 칼럼의 속성을 변경합니다.
	 * @param columnIndex (Number) : 변경하고자 하는 칼럼 인덱스
	 * @param propObj (Object) : 변경하고자 하는 칼럼의 속성명과 값을 갖는 Object
	 */
	this.setColumnProp = function(columnIndex, propObj){
		AUIGrid.setColumnProp(_pid, columnIndex, propObj);
	};
	
	/**
	 * 스크롤에 영향을 받지 않는 고정칼럼(FixedColumn)을 주어진 개수만큼 지정합니다.
	 * @param count : (Number) 고정칼럼(FixedColumn) 실행시킬 개수
	 */
	this.setFixedColumnCount = function(count){
		_t.opts.fixedColumnCount = count;
		AUIGrid.setFixedColumnCount(_pid, count);
	};
	
	/**
	 * 스크롤에 영향을 받지 않는 고정행(FixedRow)을 주어진 개수만큼 지정합니다.
	 * @param count : (Number) 고정행(FixedRow) 실행시킬 개수
	 */
	this.setFixedRowCount = function(count){
		AUIGrid.setFixedRowCount(_pid, count);
	};
	
	/**
	 * 최초 설정한 칼럼 레이아웃의 columnIndex 에 맞는 칼럼의 headerRenderer 속성을 변경합니다.
	 * @param columnIndex (Number) : 변경하고자 하는 칼럼 인덱스
     * @param propObj (Object) : 변경하고자 하는 헤더렌더러(headerRenderer)의 속성명과 값을 갖는 Object
	 */
	this.setHeaderRendererProp = function(columnIndex, propObj){
		AUIGrid.setHeaderRendererProp(_pid, columnIndex, propObj);
	};
	
	/**
	 * 수평 스크롤이 생성되어 있을 때 수평 스크롤을 칼럼 인덱스 단위로 이동 시킬 수 있는 메소드입니다.
	 * columnIndex (Number) : 수평 스크롤의 시작점이 될 칼럼의 인덱스
	 */
	this.setHScrollPosition = function(columnIndex){
		AUIGrid.setHScrollPosition(_pid, columnIndex);
	};
	
	/**
	 * 수평 스크롤이 생성되어 있을 때 수평 스크롤을 픽셀 단위로 이동 시킬 수 있는 메소드입니다.
	 * @param px (Number) : 수평 스크롤이 이동할 픽셀 단위의 값
	 */
	this.setHScrollPositionByPx = function(px){
		AUIGrid.setHScrollPositionByPx(_pid, px);
	};
	
	/**
	 * 페이징을 사용하는 경우 1 페이지에 출력되는 행의 개수를 변경합니다.
	 * @param pageRowCount : (Number) 1 페이지에 출력 시킬 행의 개수
	 */
	this.setPageRowCount = function(pageRowCount){
		AUIGrid.setPageRowCount(_pid, pageRowCount);
	};
	
	/**
	 * 페이징을 사용하는 경우(usePaging=true) 원하는 페이지로 이동시키는 메소드입니다.
	 * @param pageNum (Number) : 이동하고자 하는 페이지 번호
	 * @param keepVScrollPos (Boolean) : 이동할 때 수직 스크롤의 위치 유지 여부(기본값:false)
	 * @param keepHScrollPos (Boolean) : 이동할 때 수평 스크롤의 위치 유지 여부(기본값:false)
	 */
	this.movePageTo = function(pageNum, keepVScrollPos, keepHScrollPos){
		AUIGrid.movePageTo(_pid, pageNum, gfn_nvl(keepVScrollPos, false), gfn_nvl(keepHScrollPos,false));
	};

	/**
	 * 그리드 renderer 속성 변경
	 */
	this.setRendererProp = function(dataField, propObj) {
		AUIGrid.setRendererProp(_pid, _t.getColumnIndexByDataField(dataField), propObj);
	};

	/**
	 * 데이터 필드에 맞는 현재 그리드의 칼럼인덱스를 반환합니다.
	 */
	this.getColumnIndexByDataField = function(dataField) {
		return AUIGrid.getColumnIndexByDataField(_pid, dataField);
	};
	
	/**
	 * 현재 그리드의 칼럼인덱스에 출력 중인 데이터필드(dataField)를 반환합니다.
	 */
	this.getDataFieldByColumnIndex = function(columnIndex){
		return AUIGrid.getDataFieldByColumnIndex(_pid, columnIndex);
	};
	
	/**
	 * 컬럼 인덱스 from~to로 데이터필드를 Array형태로 반환한다.
	 */
	this._getDataFieldArrByColumnIndex = function(fIdx, tIdx){
		var rtnArr = new Array();
		for(var i=fIdx; i <= tIdx; i++){
			rtnArr.push(AUIGrid.getDataFieldByColumnIndex(_pid, i));
		}
		return rtnArr;
	};

	/**
	 * 입력 가능한 컬럼인지 여부 리턴
	 */
	this._isEditableColumn = function(colInfo) {
		if (gfn_toStr(colInfo.width) == '0' || !gfn_nvl(colInfo.visible, true) || !gfn_nvl(colInfo.editable, true)) {
			return false;
		}
		else {
			return true;
		}
	};
	
	/**
	 * 그리드에 프리로더를 표시합니다.
	 */
	this.showAjaxLoader = function(){
		AUIGrid.showAjaxLoader(_pid);
	};
	
	/**
	 * 그리드에 표시된 프리로더가 있다면 삭제합니다.
	 */
	this.removeAjaxLoader = function(){
		AUIGrid.removeAjaxLoader(_pid);
	};
	
	/**
	 * 그리드 칼럼을 숨기기 한 경우, 원래 설정한 칼럼 모두를 보이는 상태로 만듭니다.
	 */
	this.showAllColumns = function(){
		AUIGrid.showAllColumns(_pid);
	};
	
	/**
	 * 그리드 선택 셀의 값을 텍스트로 반환합니다.
	 * @return (String) 선택 셀 값 텍스트
	 */
	this.getSelectedText = function(){
		return AUIGrid.getSelectedText(_pid);
	};
	
	/**
	 * 트리 그리드의 계층적 구조를 갖는 데이터의 자손행들까지 포함하여 모두 1차원 배열 형태로 반환합니다.
	 * @return Return : (Array) 전체 행 아이템들
	 */
	this.getTreeFlatData = function(){
		return AUIGrid.getTreeFlatData(_pid);
	};
	
	/**
	 * 트리 그리드의 계층적 구조를 갖는 데이터를 반환합니다.
	 * @return  (Array) 계층적 구조 행 아이템들
	 */
	this.getTreeGridData = function(){
		return AUIGrid.getTreeGridData(_pid);
	};
	
	/**
	 * 트리 그리드 또는 그룹형으로 계층형으로 만든 경우 계층형 데이터의 전체 depth 를 반환합니다.
	 * @return (Number) 전체 depth 
	 */
	this.getTreeTotalDepth = function(){
		return AUIGrid.getTreeTotalDepth(_pid);
	};

	/**
	 * 컬럼 보이기
	 * @param dataField (String or Array) : 칼럼의 데이터 필드명(들)
	 */
	this.showColumnByDataField = function(dataFields) {
		AUIGrid.showColumnByDataField(_pid, dataFields);
	};
	
	/**
	 * 전체컬럼 보이기
	 */
	this._showColumnAll = function(){
		var colInfos = _t.getColumnInfoList();
		for(var i = 0;  i < colInfos.length; i++) {
			_t.showColumnByDataField(colInfos[i].dataField);
		}
	}

	/**
	 * 컬럼 숨기기
	 * @param dataField (String or Array) : 칼럼의 데이터 필드명(들)
	 */
	this.hideColumnByDataField = function(dataFields) {
		AUIGrid.hideColumnByDataField(_pid, dataFields);
	};
	
	/**
	 * 전체컬럼 숨기기
	 */
	this._hideColumnAll = function(){
		var colInfos = _t.getColumnInfoList();
		for(var i = 0;  i < colInfos.length; i++) {
			_t.hideColumnByDataField(colInfos[i].dataField);
		}
	}
	
	/**
	 * 필터링을 설정하고 실행합니다.
	 * @param dataField (String) : 칼럼이 출력하고 있는 데이터의 필드명
	 * @param filterFunction (Function) : 필터링 비교 함수
	 */
	this.setFilter = function(dataField, fnc){
		AUIGrid.setFilter(_pid, dataField,  fnc);
	};
	
	/**
	 * 칼럼의 값(들)만을 이용하여 필터링하고 실행합니다.
	 * @param dataField (String) : 칼럼이 출력하고 있는 데이터의 필드명
	 * @param values (String or Array) : 해당 dataField 에서 필터링하고자 하는 값(들)
	 */
	this.setFilterByValues = function(dataField, values){
		AUIGrid.setFilterByValues(_pid, dataField,  values);
	};
	
	/**
	 * 그리드 필터를 설정한 경우, 지정한 dataField 에 맞는 필터 레이어(필터 메뉴)를 오픈합니다. 만약, 동일한 칼럼의 필터 레이어(필터 메뉴)가 이미 열려진 경우, 이 메소드는 닫는 역할(즉, 토글 역할)을 하게 됩니다.
	 * @param dataField (String) : 칼럼의 dataField 명
	 */
	this.openFilterLayer = function(dataField){
		AUIGrid.openFilterLayer(_pid, dataField);
	};
	
	/**
	 * 그리드 선택 행(들)의 인덱스를 위로 한 단계 이동시킵니다. 
	 */
	this.moveRowsToUp = function(){
		AUIGrid.moveRowsToUp(_pid);
	};
	
	/**
	 * 그리드 선택 행(들)의 인덱스를 아래로 한 단계 이동시킵니다.
	 */
	this.moveRowsToDown = function(){
		AUIGrid.moveRowsToDown(_pid);
	};
	
	/**
	 * 최초 설정한 칼럼 레이아웃의 데이터필드(dataField)에 맞는 칼럼의 속성을 변경합니다.
	 * @param dataField (String) : 변경하고자 하는 칼럼의 데이터필드명
     * @param propObj (Object) : 변경하고자 하는 칼럼의 속성명과 값을 갖는 Object
	 */
	this.setColumnPropByDataField = function(dataField, propObj){
		AUIGrid.setColumnPropByDataField(_pid, dataField, propObj);
	};

	/**
	 * 칼럼 가로 크기(width size) 지정
	 * @param columnSizes (Array) : 칼럼들 가로 크기 배열
	 */
	this.setColumnSizeList = function(columnSizes) {
		AUIGrid.setColumnSizeList(_pid, columnSizes);
	};
	
	/**
	 * 필터링이 설정되어 있다면 해당 칼럼의 필터링을 해제합니다. 
	 */
	this.clearFilter = function(dataField){
		AUIGrid.clearFilter(_pid, dataField);
	};
	
	/**
	 * 필터링이 설정되어 있다면 해당 칼럼의 필터링을 해제합니다. 
	 */
	this.clearFilterAll = function(){
		AUIGrid.clearFilterAll(_pid);
	};

	/**
	 * 컬럼 보이기/숨기기
	 * @param dataField (String or Array) : 칼럼의 데이터 필드명(들)
	 */
	this._showHideColumn = function(dataFields, flg) {
		if (flg === true) {
			_t.showColumnByDataField(dataFields);
		}
		else {
			_t.hideColumnByDataField(dataFields);
		}
	};

	/**
	 * 그리드에 데이터 바인딩
	 * (ex) 데이터셋 변수가 data.ds_codeList.data 와 같이 서브데이터셋이 존재하는 경우 : setGridData(data, 'ds_codeList')
	 * (ex) 데이터셋 변수가 arrCodeList 와 같이 object array인 경우 : setGridData(arrCodeList)
	 */
	this.setGridData = function(data, ds_name) {
		_t.setAllCheckedRows(false); //조회시 전체선택에 체크되어 있는 경우 행체크상태가 남아있는 버그가 있어 임시로 fix
		_t.prevSelItem = null; //이전 선택행 item null 처리
		
		var myData = [];
		if (!gfn_isNull(ds_name)) {
			if (!gfn_isNull(data[ds_name])) {
				myData = data[ds_name].data;
			}
		} else {
			myData = data;
		}
		
		AUIGrid.setGridData(_pid, myData);
	};

	/**
	 * 그리드에 데이터 바인딩(Append)
	 * (ex) 데이터셋 변수가 data.ds_codeList.data 와 같이 서브데이터셋이 존재하는 경우 : appendGridData(data, 'ds_codeList')
	 * (ex) 데이터셋 변수가 arrCodeList 와 같이 object array인 경우 : appendGridData(arrCodeList)
	 */
	this.appendGridData = function(data, ds_name) {
		var myData = [];
		if (!gfn_isNull(ds_name)) {
			if (!gfn_isNull(data[ds_name])) {
				myData = data[ds_name].data;
			}
		} else {
			myData = data;
		}

		AUIGrid.appendData(_pid, myData);
	};
	
	/**
	 * 그리드의 열(column) 을 추가, 삭제했을 때 해당 데이터필드(dataField)를 그리드가 캐시에 보관합니다. 이 보관된 데이터필드(dataField)를 모두 초기화하여 그리드 열이 수정되지 않은 상태로 만듭니다.
	 * @param option (String) : 추가, 삭제된 해당 캐시를 초기화 할 옵션을 지정합니다. 유효 값은 "c", "d", "a" 입니다. 
	 */
	this.resetUpdatedColumns = function(option){
		AUIGrid.resetUpdatedColumns(_pid, option);
	};
	
	/**
	 * 편집모드에서 그리드의 데이터를 추가, 수정, 삭제했을 때 특정 행의 추가, 수정, 삭제된 상태를 초기화 합니다.
	 * 그러나 그리드 속성 softRemoveRowMode 를 false 설정한 경우 삭제 상태는 초기화 할 수 없습니다.
	 * rowId (String) : 상태를 초기화 할 행의 rowId 값
	 * option (String) : 추가, 수정, 삭제된 해당 데이터 캐시를 초기화 할 옵션을 지정합니다. 유효 값은 "c", "u"("e"), "d", "a" 입니다. 
		"c" : 추가된 데이터만 흔적을 제거하고 초기화 시킵니다.
		"u"(or "e") : 수정된 데이터만 흔적을 제거하고 초기화 시킵니다.
		"d" : 삭제된 데이터만 흔적을 제거하고 초기화 시킵니다.
		"a" : 추가, 수정, 삭제 모두 흔적을 제거하고 초기화 시킵니다. (기본값)
	 */
	this.resetUpdatedItemById = function(rowId, option){
		AUIGrid.resetUpdatedItemById(_pid, rowId, option);
	};
	
	/**
	 * 그리드의 특정 셀의 값을 변경합니다.
	 */
	this.setCellValue = function(rowIndex, dataField , value){
		AUIGrid.setCellValue(_pid, rowIndex, dataField, value);
	};
	
	/**
	 * 수직 스크롤이 생긴 경우 해당 rowIndex 를 그리드 최상단으로 보이도록 지정합니다.
	 * @param rowPosition (Number) : 그리드 상단으로 위치할 rowIndex
	 */
	this.setRowPosition = function(rowPosition){
		AUIGrid.setRowPosition(_pid, rowPosition);
	};
	
	
	/**
	 * 그리드의 셀에 선택 블록(selection block) 을 강제로 지정합니다.
	 * @param startRowIndex (Number) : 블록을 만들 시작 행 인덱스
	 * @param endRowIndex (Number) : 블록을 만들 종료 행 인덱스
	 * @param startColumnIndex (Number) : 블록을 만들 시작 칼럼 인덱스
	 * @param endColumnIndex (Number) : 블록을 만들 종료 칼럼 인덱스
	 */
	this.setSelectionBlock = function(startRowIndex, endRowIndex, startColumnIndex, endColumnIndex){
		AUIGrid.setSelectionBlock(_pid, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex);
	};
	
	/**
	 * 선택모드(selectionMode)가 "none" 이 아닌 경우 특정 아이템을 선택하도록 지시합니다.
	 * @param rowIndex : (Number) 선택하고자 하는 행 인덱스
     * @param columnIndex : (Number) 선택하고자 하는 칼럼 인덱스
	 */
	this.setSelectionByIndex = function(rowIndex, columnIndex){
		AUIGrid.setSelectionByIndex(_pid, rowIndex, columnIndex);
	};
	
	/**
	 * 선택모드(selectionMode) 를 변경합니다.
	 * @param selectionMode (String) : 설정하고자 하는 selectionMode(유효값 : singleCell, singleRow, multipleCells, multipleRows, none)
	 */
	this.setSelectionMode = function(selectionMode){
		AUIGrid.setSelectionMode(_pid, selectionMode);
	};

	/**
	 * 그리드 데이터 정렬
	 */
	this.setSorting = function(_sortingOption) {
		AUIGrid.setSorting(_pid, _sortingOption) ;
	};

	/**
	 * 그리드 데이터를 모두 초기화하여 빈 그리드로 만듭니다.
	 */
	this.clearGridData = function() {
		AUIGrid.clearGridData(_pid);
	};

	/**
	 * 그리드 편집상태 강제 완료 (Detail그리드의 Inputer가 활성화 된 상태에서 Master그리드의 행선택 변경시 Inputer가 남아있는 버그 Fix용)
	 */
	this.forceEditingComplete = function(value, cancel) {
		AUIGrid.forceEditingComplete(_pid, value, cancel);
	};
	
	/**
	 * 그리드에서 추가된 열(column) 의 dataField 들의 묶음(배열)을 반환합니다.
	 * @return (Array) 추가된 열의 dataField 들
	 */
	this.getAddedColumnFields = function(){
		return AUIGrid.getAddedColumnFields(_pid);
	};

	/**
	 * 그리드의 행을 수정한 해당 행 전체 셀 값을 수정 취소(복구) 합니다.
	 * @param rowIndex (Number or Array) : 행번호(미지정시 현재 선택된 행)
	 */
	this.restoreEditedRows = function(rowIndex) {
		return AUIGrid.restoreEditedRows(_pid, gfn_nvl(rowIndex, 'selectedIndex'));
	};
	
	/**
	 * 편집모드에서 그리드의 데이터를 추가, 수정, 삭제했을 때 해당 데이터를 그리드가 캐시에 보관합니다.
	 * @param option (String) : 추가, 수정, 삭제된 해당 데이터 캐시를 초기화 할 옵션을 지정합니다. 유효 값은 "c", "u"("e"), "d", "a" 입니다. 
	 */
	this.resetUpdatedItems = function(option){
		AUIGrid.resetUpdatedItems(_pid, option);
	};

	/**
	 * 그리드의 셀을 수정한 해당 셀 값을 수정 취소(복구) 합니다.
	 * @param rowIndex (Number or Array) : 행인덱스와 dataField 요소로 갖는 배열(미지정시 현재 선택된 셀)
	 */
	this.restoreEditedCells = function(cellIndex) {
		return AUIGrid.restoreEditedCells(_pid, gfn_nvl(cellIndex, 'selectedIndex'));
	};

	/**
	 * 선택된 행의 index 조회
	 * @return Array : 선택된 행/열의 index 리턴
	 */
	this.getSelectedIndex = function() {
		return AUIGrid.getSelectedIndex(_pid);
	};
	
	/**
	 * 선택모드(selectionMode)가 "none" 이 아닌 경우 현재 선택된 행(rows) 아이템을 반환
	 * @return Array : 선택된 행 아이템들을 요소로 갖는 배열
	 */
	this.getSelectedRows = function() {
		return AUIGrid.getSelectedRows(_pid);
	};

	/**
	 * 선택된 행의 rowId 조회
	 */
	this._getSelectedRowId = function() {
		return _t.indexToRowId(_t._getSelectedRowIndex());
	};

	/**
	 * rowIndex, columeIndex로 셀 데이터 조회
	 * @param rowIndex : 행번호(미지정시 현재 선택된 행)
	 */
	this._getColumnValue = function(rowIndex, colFieldName) {
		var rowItem = AUIGrid.getItemByRowIndex(_pid, gfn_nvl(rowIndex, _t._getSelectedRowIndex()));
		return rowItem[colFieldName];
	};

	/**
	 * 선택된행 또는 지정된 rowIndex의 데이터 조회
	 * @param rowIndex : 행번호(미지정시 현재 선택된 행)
	 */
	this._getRowItem = function(rowIndex) {
		var rowItem = AUIGrid.getItemByRowIndex(_pid, gfn_nvl(rowIndex, _t._getSelectedRowIndex()));
		return rowItem;
	};
	
	/**
	 * 선택된행 또는 지정된 rowIndex의 데이터 조회
	 * @param rowIndex : 행번호(미지정시 현재 선택된 행)
	 */
	this.getRowItem = function(rowIndex) {
		var rowItem = AUIGrid.getItemByRowIndex(_pid, gfn_nvl(rowIndex, _t._getSelectedRowIndex()));
		return rowItem;
	};
	
	
	/**
	 * 행 인덱스에 맞는 행 아이템을 반환합니다.
     * @param rowIndex (Number) : 행인덱스
     * @Return : (Object) 행아이템 객체
	 */
	this.getItemByRowIndex = function(rowIndex){
		return AUIGrid.getItemByRowIndex(_pid, rowIndex);
	};
	
	/**
	 * 필드 값에 맞는 행 아이템을 반환한다.
	 * @param dataField : 필드코드
	 * @param value : 검색값
	 * @return (Array) 행아이템 객체
	 */
	this.getItemsByValue = function(dataField, value){
		return AUIGrid.getItemsByValue(_pid, dataField, value);
	};

	/**
	 * 선택된행 정보 조회
	 * @desc - getRowItem은 데이터만조회, getSelectedItems은 데이터 및 rowIndex, columnIndex 등의 정보도 함께 조회됨
	 *        - 데이터는 getSelectedItems[].item 으로 접근
	 * @return Array
	 */
	this.getSelectedItems = function() {
		return AUIGrid.getSelectedItems(_pid);
	};

	/**
	 * 선택된행 정보 조회
	 * @desc - getSelectedItems의 첫번째 array 리턴
	 *        - 데이터는 getSelectedItems[].item 으로 접근
	 * @return Object
	 */
	this._getSelectedItem = function() {
		var selItems = _t.getSelectedItems();
		return selItems[0];
	};

	/**
	 * 그리드의 전체 row 수 리턴
	 */
	this.getRowCount = function() {
		return AUIGrid.getRowCount(_pid);
	};

	/**
	 * 특정 행/열에 포커스
	 */
	this._setFocus = function(rowIndex, colIndex) {
		AUIGrid.setSelectionByIndex(_pid, gfn_nvl(rowIndex, 0), gfn_nvl(colIndex, 0));
	};
	
	
	/**
	 * 특정 행/열에 포커스
	 */
	this.setGridFocus = function(rowIndex, colIndex) {
		AUIGrid.setSelectionByIndex(_pid, gfn_nvl(rowIndex, 0), gfn_nvl(colIndex, 0));
	};
	
	/**
	 * 그리드에 키보드 포커싱이 되도록 지정합니다.
	 */
	this.setFocus = function(){
		AUIGrid.setFocus(_pid);
	};

	/**
	 * 선택되어진 모든 아이템들을 초기화합니다.
	 */
	this.clearSelection = function() {
		AUIGrid.clearSelection(_pid);
	};

	/**
	 * 특정 행/열 입력박스 활성화
	 */
	this._setInputer = function(rowIndex, colIndex) {
		_t._setFocus(rowIndex, colIndex);	//행선택
		AUIGrid.openInputer(_pid);	//입력란 open
	};

	/**
	 * 그리드 행추가
	 * @param items (Object or Array) : 삽입하고자 하는 행 아이템
	 * @param rowPos : "first"-첫 행, "last"-최하단, "selectionUp"-선택행 위, "selectionDown"-선택행 아래 (기본값='last')
	 */
	this.addRow = function(items, rowPos) {
		AUIGrid.addRow(_pid, items, gfn_nvl(rowPos, 'last'));
	};
	
	/**
	 * 기존 그리드 데이터의 하단에 추가로 데이터를 붙입니다.
	 * @param additionalData (Array) : 추가시키고자 하는 데이터
	 */
	this.appendData = function(additionalData){
		AUIGrid.appendData(_pid, additionalData);
	};
	
	/**
	 * 그리드의 칼럼 레이아웃(columnLayout) 을 변경합니다.
	 * @param columnLayout : (Array-Object) 변경하고자 하는 새로운 칼럼 레이아웃
	 */
	this.changeColumnLayout = function(columnLayout){
		AUIGrid.changeColumnLayout(_pid, columnLayout);
	};
	
	/**
	 * 그리드의 푸터 레이아웃(footerLayout) 을 변경합니다.
	 * @param footerLayout : (Array-Object) 변경하고자 하는 새로운 푸터 레이아웃
	 */
	this.changeFooterLayout = function(footerLayout){
		AUIGrid.changeFooterLayout(_pid, footerLayout);
	};
	
	/**
	 * 정렬(Sorting)이 설정되어 있다면 모든 정렬을 초기화 합니다.
	 */
	this.clearSortingAll = function(){
		AUIGrid.clearSortingAll(_pid);
	};
	
	/**
	 * 계층 구조 데이터 표현(트리 데이터)인 경우 모든 노드들을 닫고 최상위 Branch 만 표시합니다.
	 */
	this.collapseAll = function(){
		AUIGrid.collapseAll(_pid);
	};
	
	/**
	 * 계층형 그리드(트리 그리드)인 경우 rowId 값에 맞는 아이템이 브랜치(branch)일 때 열기/닫기를 실행합니다.
	 * @param rowIds (Array 또는 String) : rowId 값 (복수인 경우 Array 로 지정)
	 * @param open (Boolean) : 열기 할지 닫기 할지 여부(true 인 경우 열기 실행)
	 * @param recursive (Boolean) : 해당 아이템의 자손까지 모두 열지 여부
	 */
	this.expandItemByRowId = function(rowIds, open, recursive){
		AUIGrid.expandItemByRowId(_pid, rowIds, open, recursive);
	};
	
	/**
	 * 계층 구조 데이터 표현인 경우 모든 노드들을 열어 전체 펼치기를 실행합니다.
	 */
	this.expandAll = function(){
		AUIGrid.expandAll(_pid);
	};
	
	/**
	 * 그리드 필터를 설정한 경우, 필터 레이어(필터 메뉴)가 오픈되어 있을 때 닫도록 지시합니다.
	 */
	this.closeFilterLayer = function(){
		AUIGrid.closeFilterLayer(_pid);
	};
	
	/**
	 * 실행 취소(Undo), 다시 실행(Redo) 커맨드 스택을 초기화 합니다.
	 */
	this.clearUndoRedoStack = function(){
		AUIGrid.clearUndoRedoStack(_pid);
	};
	
	/**
	 * 그리드에서 특정 열(column)의 자식으로 열을 추가, 삽입합니다.
	 * @param columnObj (Object or Array) : 삽입하고자 하는 열 객체(columnm Object), 복수의 열을 삽입하고자 하는 경우 Object 를 배열로 묶으십시오.
	 * @param parentDataField (String) : 부모 dataField 명, 해당 dataField 의 자식으로 칼럼이 추가됩니다.
	 * @param columnIndex (Number or String) : 삽입될 열의 인덱스, columnIndex 에 다음 문자를 설정한 경우. "first" : 맨처음, "last" : 맨끝에 추가 열이 삽입됩니다.
	 */
	this.addTreeColumn = function(columnObj, parentDataField, columnIndex){
		AUIGrid.addTreeColumn(_pid, columnObj, parentDataField, gfn_nvl(columnIndex, 'last'));
	};
	
	/**
	 * 트리 그리드 행(row) 아이템을 추가, 삽입합니다.
	 * @param items (Object or Array) : 삽입하고자 하는 행 아이템, 복수의 행을 삽입하고자 하는 경우 Object 를 배열로 묶으십시오.
	 * @param parentRowId (String) : 추가될 행의 부모 rowId 값. 
	 * @param •rowPosition (String) : 삽입될 행의 위치 값, 유효값은 다음과 같습니다. "first" : 첫 행, "last" : 최하단, "selectionUp" : 선택행 위, "selectionDown" : 선택행 아래에 추가행이 삽입됩니다.
	 */
	this.addTreeRow = function(items , parentRowId, rowPosition){
		AUIGrid.addTreeRow(_pid, items, parentRowId, gfn_nvl(rowPosition, 'last'));
	};
	
	/**
	 * 엑스트라 행 체크박스가 설정된 경우 rowIdField 를 이용해 특정 행에 체크 해제를 설정합니다.
	 * @param ids : (Array) 행의 rowId 값들을 요소로 갖는 배열
	 */
	this.addUncheckedRowsByIds = function(ids){
		AUIGrid.addUncheckedRowsByIds(_pid, ids);
	};
	
	/**
	 * 그리드 열(column)을 삭제합니다.
	 * @param columnIndex (Number or String) : 삭제하고자 하는 열의 인덱스, columnIndex 대신 "selectedIndex" 문자열을 설정한 경우 현재 선택된 열이 삭제됩니다.
	 */
	this.removeColumn = function(columnIndex){
		AUIGrid.removeColumn(_pid, gfn_nvl(columnIndex, 'selectedIndex'));
	};
	
	/**
	 * 그리드에 메세지가 출력되었다면 제거합니다.
	 */
	this.removeInfoMessage = function(){
		AUIGrid.removeInfoMessage(_pid);
	};

	/**
	 * 그리드 행삭제
	 * @param rowIndex : 행번호(미지정시 현재 선택된 행)
	 * @param isOnlyNewRow : 그리드에 신규로 추가된 행만 삭제할 것인지 여부(기본값=false)
	 */
	this.removeRow = function(rowIndex, isOnlyNewRow) {
		if(gfn_isNull(rowIndex)){
			var selItem = AUIGrid.getSelectedItems(_pid);
			if (selItem.length == 0) {
				gfn_showMessage('MSG.COM.VAL.043'); //삭제할 대상이 없습니다.
				return;
			}
		}

		//신규행만 삭제 가능시
		if (gfn_nvl(isOnlyNewRow, false)) {
			var isAdded = AUIGrid.isAddedById(_pid, selItem[0].rowIdValue);
			if (!isAdded) {
				gfn_showMessage('MSG.COM.VAL.045');  //신규행만 삭제가 가능합니다.
				return;
			}
		}

		AUIGrid.removeRow(_pid, gfn_nvl(rowIndex, 'selectedIndex'));
	};

	/**
	 * 그리드 행삭제
	 * @param rowIndex : 행번호(미지정시 현재 선택된 행)
	 */
	this._removeRowIndex = function(rowIndex) {
		AUIGrid.removeRow(_pid, rowIndex);
	};
	
	/**
	 * 엑스트라 체크박스 체크된 행삭제
	 */
	this.removeCheckedRows = function() {
		AUIGrid.removeCheckedRows(_pid);
	};

	/**
	 * 엑스트라 체크박스 체크된 행 아이템 가져오기 (row 정보 + 데이터 리턴)
	 */
	this.getCheckedRowItemsAll = function() {
		return AUIGrid.getCheckedRowItemsAll(_pid);
	};

	/**
	 * 엑스트라 체크박스 체크된 행 아이템 가져오기 (row 정보 + 데이터 리턴)
	 */
	this.getCheckedRowItems = function() {
		return AUIGrid.getCheckedRowItems(_pid);
	};
	
	/**
	 * 현재 그리드에서 출력하고 있는 전체 열(columns)의 개수를 반환합니다.
	 * @return (Number) 전체 열(columns) 수 
	 */
	this.getColumnCount = function(){
		return AUIGrid.getColumnCount(_pid);
	};
	
	/**
	 * 데이터 필드(dataField)에 맞는 칼럼 레이아웃의 칼럼 객체를 반환합니다.
	 * @param dataField : (String) 칼럼의 dataField 명
	 * @param total : (Boolean) 그리드의 원래 데이터를 대상으로 할지 여부. 즉, 필터링이 된 경우 필터링 된 상태의 값만 원한다면 false 지정
	 * @return (Array) 해당 칼럼이 출력하고 있는 모든 값들(중복된 값이 제거된 고유값들만 반환)
	 */
	this.getColumnDistinctValues = function(dataField, total){
		return AUIGrid.getColumnDistinctValues(_pid, dataField, total);
	};

	/**
	 * 엑스트라 체크박스 체크된 행 데이터 가져오기 (row 정보 없이 데이터만 리턴)
	 */
	this._getCheckedRowData = function() {
		var rowItems = AUIGrid.getCheckedRowItems(_pid);
		var ret = [];

		for(var i = 0; i < rowItems.length; i++) {
			ret.push(rowItems[i].item);
		}
		return ret;
	};
	
	/**
	 * 그리드 열(column) 을 추가, 삽입합니다
	 * @param columnObj (Object or Array) : 삽입하고자 하는 열 객체(columnm Object), 복수의 열을 삽입하고자 하는 경우 Object 를 배열로 묶으십시오.
	 * @param columnIndex (Number or String) : 삽입될 열의 인덱스, columnIndex 에 다음 문자를 설정한 경우. "first" : 맨처음, "last" : 맨끝, "selectionLeft" : 선택 열 왼쪽에, "selectionRight" : 선택 열 오른쪽에 추가 열이 삽입됩니다.
	 */
	this.addColumn = function(columnObj, columnIndex){
		AUIGrid.addColumn(_pid, columnObj, columnIndex);
	};
	
	/**
	 * 엑스트라 행 체크박스가 설정된 경우 rowIdField 를 이용해 특정 행에 체크를 표시합니다.
	 * @param ids : (Array) 행의 rowId 값들을 요소로 갖는 배열
	 */
	this.addCheckedRowsByIds = function(ids){
		AUIGrid.addCheckedRowsByIds(_pid, ids);
	};

	/**
	 * 엑스트라 체크박스의 특정 dataField의 값이 일치하면 checked 처리
	 */
	this.setCheckedRowsByValue = function(dataField, values) {
		AUIGrid.setCheckedRowsByValue(_pid, dataField, values);
	};

	/**
	 * 엑스트라 체크박스의 특정 dataField의 값이 일치하면 addCheckedRowsByValue 처리
	 */
	this.addCheckedRowsByValue = function(dataField, values) {
		AUIGrid.addCheckedRowsByValue(_pid, dataField, values);
	};

	/**
	 * 엑스트라 체크박스의 특정 dataField의 값이 일치하면 addUncheckedRowsByValue 처리
	 */
	this.addUncheckedRowsByValue = function(dataField, values) {
		AUIGrid.addUncheckedRowsByValue(_pid, dataField, values);
	};

	/**
	 * 엑스트라 체크박스의 특정 dataField의 값이 일치하면 checked 처리 (rowIdField 를 이용)
	 */
	this.setCheckedRowsByIds = function(ids) {
		AUIGrid.setCheckedRowsByIds(_pid, ids);
	};
	
	/**
	 * 그리드의 특정 칼럼에서 문자열을 검색합니다.
	 * @param dataField : (String) 검색하고자 하는 칼럼의 데이터필드명
	 * @param term : (String) 검색하고자 하는 문자열
     * @param options : (Object) 검색 옵션
	 */
	this.search = function(dataField, term , options){
		AUIGrid.search(_pid, dataField, term, gfn_nvl(options,{direction:true,caseSensitive:false,wholeWord:false,wrapSearch:true}));
	};
	
	/**
	 * 그리드의 전체 칼럼을 대상으로 문자열을 검색합니다.
	 * @param term : (String) 검색하고자 하는 문자열
     * @param options : (Object) 검색 옵션
	 */
	this.searchAll = function(term , options){
		AUIGrid.searchAll(_pid, term, gfn_nvl(options,{direction:true,caseSensitive:false,wholeWord:false,wrapSearch:true}));
	};
	
	/**
	 * 선택모드(selectionMode)가 "none" 이 아닌 경우 특정 행 아이템들을 선택하도록 지시합니다.
	 * @param rowIds : (Array 또는 String) 선택하고자 하는 rowId 값(들)
	 */
	this.selectRowsByRowId = function(rowIds){
		AUIGrid.selectRowsByRowId(_pid, rowIds);
	};

	/**
	 * 엑스트라 체크박스 전체 선택/해제
	 */
	this.setAllCheckedRows = function(flag) {
		AUIGrid.setAllCheckedRows(_pid, flag);
	};

	/**
	 * 엑스트라 체크박스에서 체크박스를 1개만 선택가능하게 처리
	 */
	this._setCheckableOne = function(uniqueDataField, values) {
		if (_t.getCheckedRowItems().length > 1) {
            _t.setAllCheckedRows(false);
            _t.setCheckedRowsByValue(uniqueDataField, values);
        }
	};
	
	/**
	 * 그리드에 메세지를 출력시킵니다.
	 * @param msgHTML (String) : 그리드에 표시될 메세지를 포함한 HTML 구문입니다.
	 */
	this.showInfoMessage = function(msgHTML){
		AUIGrid.showInfoMessage(_pid, msgHTML);
	}
	
	/**
	 * 계층형 그리드(트리 그리드)인 경우 주어진 depth 까지만 Open 하여 보이도록 지정합니다.
	 * @param depth (Number) : 표현하고자 하는 계층 깊이(depth)
	 */
	this.showItemsOnDepth = function(depth){
		AUIGrid.showItemsOnDepth(_pid, depth);
	};
	
	/**
	 * 지정한 특정 셀에 메세지를 출력합니다.
	 * @param rowIndex (Number) : 행 인덱스
	 * @param columnIndex (Number) : 칼럼 인덱스
	 * @param message (String) : 행, 열로 대표되는 셀에 출력할 메시지
	 */
	this.showToastMessage = function(rowIndex, columnIndex, message){
		AUIGrid.showToastMessage(_pid, rowIndex, columnIndex, message);
	};
	
	/**
	 * 특정 셀에 출력된 메세지를 제거합니다.
	 */
	this.removeToastMessage = function(){
		AUIGrid.removeToastMessage(_pid);
	};
	
	/**
	 * 편집 가능한 그리드에서 enableUndoRedo=true 설정한 경우, 실행 취소(Undo) 를 실행합니다.
	 */
	this.undo = function(){
		AUIGrid.undo(_pid);
	};
	
	/**
	 * 실행 취소(Undo) 가 가능한지 여부를 반환합니다.
	 * @return (Boolean) 실행 취소 가능 여부
	 */
	this.undoable = function(){
		return AUIGrid.undoable(_pid);
	};
	
	/**
	 * 그리드 셀의 내용을 갱신합니다.
	 */
	this.update = function(){
		AUIGrid.update(_pid);
	};
	
	/**
	 * 그룹핑(Grouping) 및 소계(Summary Rows) 를 다시 계산하여 갱신합니다.
	 */
	this.updateGrouping = function(){
		AUIGrid.updateGrouping(_pid);
	};

	/**
	 * 지정된 행 데이터 수정
	 * @param item : 수정할 컬럼 정보 json 객체
	 * @param rowInde : 수정할 rowIndex
	 * @param isMarkEdited : 수정마커 표시여부 (기본값: true)
	 */
	this.updateRow = function(item, rowIndex, isMarkEdited) {
		AUIGrid.updateRow(_pid, item, gfn_nvl(rowIndex, 'selectedIndex'), gfn_nvl(isMarkEdited, true));
	};

	/**
	 * 그리드의 전체 데이터를 대상으로 dataField 의 값을 지정한 value 로 모두 변경
	 */
	this.updateAllToValue = function(dataField, value) {
		AUIGrid.updateAllToValue(_pid, dataField, value);
	};
	
	/**
	 * 엑스트라 행 체크박스가 설정된 경우 rowIdField 를 이용해 해당 행 아이디(rowId)가 체크됐는지 여부를 반환합니다.
	 * @param rowId : (String) 행의 고유 ID 값(rowId)
	 * @return (Boolean) 현재 체크 박스에 체크된 행인지 여부
	 */
	this.isCheckedRowById = function(rowId){
		return AUIGrid.isCheckedRowById(_pid, rowId);
	};
	
	/**
	 * 그리드가 생성되었는지 여부를 반환합니다.
	 * @return (Boolean) 생성되었는지 여부
	 */
	this.isCreated = function(){
		return AUIGrid.isCreated(_pid);
	};
	
	/**
	 * 특정 셀(rowId 에 맞는 행, dataField 에 맞는 열 부합하는 셀)이 수정되었는지 여부를 반환합니다. (rowIdField 속성 설정 필수)
	 * @param rowId : (String) 행 아이템의 rowId 값
	 * @param dataField : (String) 열의 dataField
	 * @return (Boolean) 수정된 셀인 경우 true 반환.
	 */
	this.isEditedCell = function(rowId, dataField){
		return AUIGrid.isEditedCell(_pid, rowId, dataField);
	};
	
	/**
	 * 현재 그리드 데이터가 필터링(filtering) 되었는지 여부를 반환합니다.
	 * @return (Boolean) 필터링 여부 반환
	 */
	this.isFilteredGrid = function(){
		return AUIGrid.isFilteredGrid(_pid, rowId);
	};
	
	/**
	 * 계층형 그리드(트리 그리드)인 경우 rowId 값에 맞는 행 아이템이 브랜치(branch) 인지 여부를 반환합니다.
	 * @param rowId (String) : rowId 값
	 * @return (Boolean) 브랜치(branch) 여부
	 */
	this.isItemBranchByRowId = function(rowId){
		return AUIGrid.isItemBranchByRowId(_pid, rowId);
	};
	
	/**
	 * 계층형 그리드(트리 그리드)인 경우 rowId 값에 맞는 행 아이템이 현재 열려진 상태인지 여부를 반환합니다.
	 * @param rowId (String) : rowId 값
	 * @return (Boolean) 열린 상태 여부
	 */
	this.isItemOpenByRowId = function(rowId){
		return AUIGrid.isItemOpenByRowId(_pid, rowId);
	};
	
	/**
	 * rowId 값에 맞는 행 아이템이 현재 그리드에 출력된 상태인지 여부를 나타냅니다.
	 * @param rowId (String) : rowId 값
	 * @return (Boolean) 보여지는 행 아이템인지 여부
	 */
	this.isItemVisibleByRowId = function(rowId){
		return AUIGrid.isItemVisibleByRowId(_pid, rowId);
	};
	
	/**
	 * 셀이 병합된 셀인지 여부를 반환합니다.
	 * @param rowIndex : (Number) 셀의 행 인덱스
	 * @param columnIndex : (Number) 셀의 열 인덱스
	 */
	this.isMergedCell = function(rowIndex, columnIndex){
		return AUIGrid.isMergedCell(_pid, rowIndex, columnIndex);
	};

	/**
	 * 세로 병합된 셀에 대하여 해당 병합의 시작 행 인덱스를 반환합니다.
	 * @param rowIndex : (Number) 셀의 행 인덱스
	 * @param columnIndex : (Number) 셀의 열 인덱스
	 */
	this.getMergeStartRowIndex = function(rowIndex, columnIndex){
		return AUIGrid.getMergeStartRowIndex(_pid, rowIndex, columnIndex);
	};

		/**
	 * 세로 병합된 셀에 대하여 해당 병합의 마지막 행 인덱스를 반환합니다.
	 * @param rowIndex : (Number) 셀의 행 인덱스
	 * @param columnIndex : (Number) 셀의 열 인덱스
	 */
	this.getMergeEndRowIndex = function(rowIndex, columnIndex){
		return AUIGrid.getMergeEndRowIndex(_pid, rowIndex, columnIndex);
	};

	/**
	 * 주어진 셀이 세로 병합된 경우 해당 셀의 세로 병합의 대상이 된 모든 행 아이템을 반환합니다.
	 * @param rowIndex : (Number) 셀의 행 인덱스
	 * @param columnIndex : (Number) 셀의 열 인덱스
	 */
	this.getMergeItems = function(rowIndex, columnIndex) {
		return AUIGrid.getMergeItems(_pid, rowIndex, columnIndex);
	}

	/**
	 * 그리드 필터를 설정한 경우, 필터 레이어의 현재 오픈 여부를 반환합니다.
	 * @return  (Boolean) 현재 열려 있는지 여부 반환
	 */
	this.isOpenFilterLayer = function(){
		return AUIGrid.isOpenFilterLayer(_pid);
	};
	
	/**
	 * rowId 에 맞는 행 아이템이 삭제된 행인지 여부를 반환합니다. (rowIdField 속성 설정 필수)
	 * @param rowId : (String) 행 아이템의 rowId 값
	 * @return (Boolean) 삭제된 행인 경우 true 반환
	 */
	this.isRemovedById = function(rowId){
		return AUIGrid.isRemovedById(_pid, rowId);
	};

	/**
	 * 특정 컬럼에 중복되는 값이 존재하는지 여부 리턴
	 */
	this.isUniqueValue = function(dataField, value) {
		return AUIGrid.isUniqueValue(_pid, dataField, value);
	};
	
	/**
	 * 현재 그리드 데이터가 정렬(sorting) 되었는지 여부를 반환합니다.
	 * @return (Boolean) 정렬 여부 반환
	 */
	this.isSortedGrid = function(){
		return AUIGrid.isSortedGrid(_pid);
	};
	
	/**
	 * 현재 그리드의 상태가 트리 그리드(TreeGrid) 인지 여부를 반환합니다.
	 * @return (Boolean) 현재 그리드의 상태가 트리 그리드인지 여부
	 */
	this.isTreeGrid = function(){
		return AUIGrid.isTreeGrid(_pid);
	};

	/**
	 * 특정 칼럼의 값과 일치하는 값이 있는 행을 모두 찾아 행인덱스(rowIndex)를 반환
	 * @param dataField : dataFiled
	 * @param arrVal : (String or Array) dataField 에서 찾고자 하는 값(복수의 값인 경우 Array)
	 */
	this.getRowIndexesByValue = function(dataField, arrVal) {
		return AUIGrid.getRowIndexesByValue(_pid, dataField, arrVal);
	};

	/**
	 * 현재 브라우저에서 그리드의 기능인 PDF 내보내기(Export) 사용 가능 여부를 반환합니다.
     * 완전히 HTML5 를 지원하는 브라우저에서 true를 반환합니다. 즉, 완전히 HTML5 를 지원하는 브라우저에서 PDF 내보내기 사용 가능합니다.
     * @Return : (Boolean) PDF 내보내기 가능 여부
	 */
	this.isAvailabePdf = function() {
		return AUIGrid.isAvailabePdf(_pid);
	};
	
	/**
	 * 지정한 다수의 행을 대상으로 지정한 dataFields(단수 or 복수)의 값을 일괄적으로 모두 변경합니다.
	 * @param startRowIndex : 시작 행 인덱스
     * @param endRowIndex : 종료 행 인덱스
     * @param dataFields : (String or Array) 데이터 필드 명
     * @param values : (Object or Array) 변경할 값
	 */
	this.updateRowBlockToValue = function(startRowIndex, endRowIndex, dataFields, values){
		AUIGrid.updateRowBlockToValue(_pid, startRowIndex, endRowIndex, dataFields, values);
	};
	
	/**
	 * 편집 가능한 그리드에서 enableUndoRedo=true 설정한 경우, 다시 실행(Redo) 를 실행합니다.
	 */
	this.redo = function(){
		AUIGrid.redo(_pid);
	};
	
	/**
	 * 다시 실행(Redo) 이 가능한지 여부를 반환합니다.
	 * @return (Boolean) 다시 실행 가능 여부
	 */
	this.redoable = function(){
		return AUIGrid.redoable(_pid);
	};
	
	/**
	 * 그리드의 상태가 변경된 경우 이 메소드를 호출하여 실제 적용시킵니다.
	 * 그리드의 속성을 동적으로 변경한 후 그리드 상태가 시각적으로 변경되어야 할 때 이 메소드를 호출하십시오.
	 * 주의 : refresh 메소드는 속성 변경을 참조하여 DOM 을 재작성합니다.
	 * 단순 셀의 내용만 갱신하고자 한다면 update 메소드를 사용하십시오.
	 * refresh 메소드를 불필요하게 자주 호출하지 마십시오. 성능에 영향을 미칩니다.
	 */
	this.refresh = function(){
		AUIGrid.refresh(_pid);
	};
	
	/**
	 * 그리드에 데이터를 삽입해 이미 출력된 모습에서 특정 행들 찾아 갱신(refresh)합니다. (rowIdField 속성 설정 필수)
	 * @param items (Array or Object) : 복수 또는 1개의 행을 갱신 합니다.
     * @param flashStyle (String) : 갱신 시 갱신된 셀이 깜빡이도록 표시해 주는 CSS 클래스명(스타일)을 지정합니다.
     * @param flashTime (Number) : flashStyle 이 출력되는 시간을 밀리세컨드 단위로 지정합니다. 예를 들어 이 값이 300 이라면 0.3 초 후 flashStyle 이 사라집니다.
	 */
	this.refreshRows = function(items, flashStyle, flashTime){
		AUIGrid.refreshRows(_pid, items, flashStyle, flashTime);
	};
	
	/**
	 * 그리드 rowIdField 의 값에 해당되는 행을 수정합니다.(rowIdField 속성 설정 필수)
	 * @param items (Array or Object) : 복수 또는 1개의 행을 업데이트 합니다.
     * @param isMarkEdited (Boolean) : 셀 수정 마커(marker) 표시를 할지 여부를 나타냅니다.(기본값 : true)
	 */
	this.updateRowsById = function(items, isMarkEdited){
		AUIGrid.updateRowsById(_pid, items, gfn_nvl(isMarkEdited, true));
	};
	
	/**
	 * 그리드 데이터를 사용자가 수정 또는 행 추가를 한 경우 그 수정, 추가된 행의 필드들 중 빈값(undefined, null, "")에 해당되는 값이 있는지 검사합니다.
	 * @param requireFields (String or Array) : 필수로 값이 있어야 하는 dataField 들. 즉, 모두 값이 채워 졌는지 체크 하고자 하는 dataField
	 * @return (Boolean) 빈값 없이 모두 정상적이라면 true 반환
	 */
	this.validateChangedGridData = function(requireFields){
		return AUIGrid.validateChangedGridData(_pid,requireFields);
	};
	
	/**
	 * 그리드 데이터의 필드들 중 빈값(undefined, null, "")에 해당되는 값이 있는지 검사합니다.
	 * @param requireFields (String or Array) : 필수로 값이 있어야 하는 dataField 들. 즉, 모두 값이 채워 졌는지 체크 하고자 하는 dataField ex) ["name", "country"]
	 * @return (Boolean) 빈값 없이 모두 정상적이라면 true 반환
	 */
	this.validateGridData = function(requireFields){
		return AUIGrid.validateGridData(_pid,requireFields);
	};
	
	/**
	 * 특정 데이터 칼럼 필드로 그룹핑을 실행합니다.
	 * @param groupingFields (Array) : 그룹핑을 하고자 하는 필드명을 요소로 갖는 배열
	 * @param (Optional)summaryFields (Array) : 그룹핑 시 그룹핑 합계를 출력하고자 하는 경우 합계 필드 배열
	 */
	this.setGroupBy = function(groupingFields, summaryFields) {
		AUIGrid.setGroupBy(_pid, groupingFields, summaryFields); //그룹핑 임시해제
	};

	/**
	 * 그룹핑 해제
	 */
	this._clearGroupBy = function() {
		AUIGrid.setGroupBy(_pid, []);
	};

	/**
	 * 그리드 데이터 조회
	 */
	this.getOrgGridData = function() {
		return AUIGrid.getOrgGridData(_pid);
	};
	
	/**
	 * 그리드에 출력된 현재 데이터를 반환합니다.
	 * 필터링, 정렬 등으로 현재 그리드에 보여지는 데이터가 변했다면, 그 상태의 모습 그대로를 반환합니다.
     * 필터링, 정렬 등으로 변한 데이터가 아닌 전체 데이터를 얻고자 한다면 getOrgGridData 메소드를 사용하십시오
	 */
	this.getGridData = function(){
		return AUIGrid.getGridData(_pid);
	}

	/**
	 * 변경된 행데이터를 공통데이터셋 형식으로 리턴
	 * @param dataType : DUI:삭제,수정,신규(미지정시 default),  D:삭제, U:수정, I:신규, CHK:체크박스 그리드(체크된 데이터만 요청)
	 * @param isSepDel : true면 삭제 로우들만 따로 저장하는 deletedData 데이터셋과 그 외 데이터를(추가/수정)을 담은 data 데이터셋을 리턴(기본값 : false)
	 */
	this.getGridDataset = function(dataType, isSepDel) {
		var ret = { 'data': [], 'deletedData': [] };
		var i;
		dataType = gfn_nvl(dataType, 'DUI');
		
		//현재 그리드에 표시된 전체 데이터 리턴
		if (dataType == 'A') {
			var groupingFields = _t.getProp('groupingFields'); //그룹핑필드 정보
			var summaryFields = _t.getProp('summaryFields'); //그룹핑 합계필드 정보

			if (groupingFields.length > 0) {
				_t._clearGroupBy(); //그룹핑 임시해제
			}

			var allData = _t.getOrgGridData();

			if (groupingFields.length > 0) {
				_t.setGroupBy(groupingFields, summaryFields); //그룹핑 원상복구
			}
			
			for (var i = 0; i < allData.length; i++) {
				allData[i].__rowStatus = 'I';
				ret['data'].push(allData[i]);
			}
		}else if(dataType == 'D'){
			var rowItems = AUIGrid.getRemovedItems(_pid);
			for (var i = 0; i < rowItems.length; i++) {
				rowItems[i].__rowStatus = 'D';

				if (gfn_nvl(isSepDel, false) == true) {
					ret['deletedData'].push(rowItems[i]);
				}
				else {
					ret['data'].push(rowItems[i]);
				}
			}
		}else if(dataType == 'U'){
			var rowItems = AUIGrid.getEditedRowItems(_pid);
			for (var i = 0; i < rowItems.length; i++) {
				rowItems[i].__rowStatus = 'U';
				ret['data'].push(rowItems[i]);
			}
		}else if(dataType == 'I'){
			rowItems = AUIGrid.getAddedRowItems(_pid);
			for (var i = 0; i < rowItems.length; i++) {
				rowItems[i].__rowStatus = 'I';
				ret['data'].push(rowItems[i]);
			}
		} else if(dataType == 'IU'){		
			
			var rowItems = AUIGrid.getEditedRowItems(_pid);	
			for (var i = 0; i < rowItems.length; i++) {
				rowItems[i].__rowStatus = 'U';
				ret['data'].push(rowItems[i]);
			}

			rowItems = AUIGrid.getAddedRowItems(_pid);
			for (var i = 0; i < rowItems.length; i++) {
				rowItems[i].__rowStatus = 'I';
				ret['data'].push(rowItems[i]);
			}
		}else if(dataType == 'CRUD'){		
			
			var rowItems = AUIGrid.getRemovedItems(_pid);
			for (var i = 0; i < rowItems.length; i++) {
				rowItems[i].__rowStatus = 'D';

				if (gfn_nvl(isSepDel, false) == true) {
					ret['deletedData'].push(rowItems[i]);
				}
				else {
					ret['data'].push(rowItems[i]);
				}
			}
			
			rowItems = AUIGrid.getGridDataWithState(_pid, "__rowStatus", {added:"I", removed:"D", edited:"U"});
			for (var i = 0; i < rowItems.length; i++) {
				if(gfn_isNull(rowItems[i].__rowStatus)){
					rowItems[i].__rowStatus = 'N';
				}				
				ret['data'].push(rowItems[i]);
			}					
		}else {//변경된 데이터만 리턴 (삭제->수정->신규행 순으로 저장)
			var rowItems = AUIGrid.getRemovedItems(_pid);
			for (var i = 0; i < rowItems.length; i++) {
				rowItems[i].__rowStatus = 'D';

				if (gfn_nvl(isSepDel, false) == true) {
					ret['deletedData'].push(rowItems[i]);
				}
				else {
					ret['data'].push(rowItems[i]);
				}
			}

			rowItems = AUIGrid.getEditedRowItems(_pid);
			for (var i = 0; i < rowItems.length; i++) {
				rowItems[i].__rowStatus = 'U';
				ret['data'].push(rowItems[i]);
			}

			rowItems = AUIGrid.getAddedRowItems(_pid);
			for (var i = 0; i < rowItems.length; i++) {
				rowItems[i].__rowStatus = 'I';
				ret['data'].push(rowItems[i]);
			}
		}

		return ret;
	};
	

	/**
	 * rowId에 해당하는 행이 신규추가된 행인지 여부 리턴 (rowIdField 속성 설정 필수)
	 */
	this.isAddedById = function(rowId) {
		return AUIGrid.isAddedById(_pid, rowId);
	};

	/**
	 * rowId에 해당하는 행이 수정된 행인지 여부 리턴 (rowIdField 속성 설정 필수)
	 */
	this.isEditedById = function(rowId) {
		return AUIGrid.isEditedById( _pid, rowId);
	};
	
	
	/**
	 * rowId에 해당하는 행 수정되거나 신규 입력시 true 아니면 false
	 */
	this.isModifiedById = function(rowId) {
		
		AUIGrid.forceEditingComplete(_pid, null);
		
		if(AUIGrid.isEditedById(_pid, rowId) || AUIGrid.isAddedById(_pid, rowId) ) return true;
		return false;
	};

	/**
	 * rowIndex에 해당하는 행이 신규추가된 행인지 여부 리턴
	 */
	this.isAddedByRowIndex = function(rowIndex) {
		return AUIGrid.isAddedByRowIndex(_pid, rowIndex);
	};

	/**
	 * rowIndex 에 해당하는 행이 수정된 행인지 여부 리턴
	 */
	this.isEditedByRowIndex = function(rowIndex) {
		return AUIGrid.isEditedByRowIndex( _pid, rowIndex);
	};
	
	
	/**
	 * rowIndex 에 해당하는 행 수정되거나 신규 입력시 true 아니면 false
	 */
	this.isModifiedByRowIndex = function(rowIndex) {
		AUIGrid.forceEditingComplete(_pid, null);
		return AUIGrid.isEditedByRowIndex( _pid, rowIndex ) || AUIGrid.isAddedByRowIndex( _pid, rowIndex );
	};

	/**
	 * 신규추가된 행인지 여부 리턴
	 */
	this._isAddedRow = function(rowIndex) {
		var addedRowItems = AUIGrid.getAddedRowItems(_pid);

		for(var i = 0; i < addedRowItems.length; i++) {
			if (JSON.stringify(addedRowItems[i]) == JSON.stringify(_t._getRowItem(rowIndex))) {
				return true;
			}
		}

		return false;
	};

	/**
	 * 그리드가 수정중인지(추가/수정/삭제 데이터가 있는지) 여부 리턴
	 */
	this._isGridEditing = function() {
		if (AUIGrid.getAddedRowItems(_pid).length > 0 || AUIGrid.getEditedRowColumnItems(_pid).length > 0 || AUIGrid.getRemovedItems(_pid).length > 0) {
			return true;
		}

		return false;
	};
	
	/**
	 * 그리드가 수정중인지(추가/수정/삭제 데이터가 있는지) 여부 리턴
	 */
	this.isGridEditing = function() {
		
		if (AUIGrid.getAddedRowItems(_pid).length > 0 || AUIGrid.getEditedRowColumnItems(_pid).length > 0 || AUIGrid.getRemovedItems(_pid).length > 0) {
			return true;
		}

		return false;
	};
	
	
	/*	 
	 * 그리가가 추가/삭제 정보가 있는지 리턴 
	 */
	this.isGridAddOrRemove = function(){
		
		if (AUIGrid.getAddedRowItems(_pid).length > 0 || AUIGrid.getRemovedItems(_pid).length > 0) {
			return true;
		}
	}

	/**
	 * 트리 그리드(계층형 그리드)에서 rowId 에 해당되는 모든 조상(ascendants) 행 아이템을 찾아 배열로 반환합니다.(rowIdField 속성 설정 필수)
	 * @param rowId : (String) 행 아이템의 rowId 값
	 * @return (Array) 주어진 rowId 에 따른 모든 조상 행 아이템들
	 */
	this.getAscendantsByRowId = function(rowId){
		return AUIGrid.getAscendantsByRowId(_pid, rowId);
	};
	
	/**
	 * 그리드의 특정 셀의 포매팅된 값을 반환합니다.
	 * @param rowIndex (Number) : 얻고자하는 행 인덱스
	 * @param dataField or columnIndex(String or Number) : 얻고자 하는 칼럼의 dataField 또는 칼럼 인덱스
	 * @return 선택 셀 포매팅된 값
	 */
	this.getCellFormatValue = function(rowIndex, dataFieldOrcolumnIndex){
		return AUIGrid.getCellFormatValue(_pid, rowIndex, dataFieldOrcolumnIndex);
	};
	
	/**
	 * 그리드에서 수정된 아이템들의 묶음(배열)을 반환합니다.
	 * @return (Array) 수정된 행 아이템들
	 */
	this.getEditedRowItems = function(){
		return AUIGrid.getEditedRowItems(_pid);
	};
	
	/**
	 * 그리드가 수정중인지(추가/수정/삭제 데이터가 있는지) 여부 리턴
	 */
	this.getAddedRowItems = function() {
		return AUIGrid.getAddedRowItems(_pid);
	};

	/**
	 * 그리드의 수정 된 아이템 리턴. 2019.04.02.arlee.
	 */
	this.getEditedRowColumnItems = function() {
		return AUIGrid.getEditedRowColumnItems(_pid);
	};
	
	/**
	 * 현재 출력된 헤더 텍스트를 모함하여 모든 셀들의 길이를 조사하여 최적의 칼럼 사이즈를 배열 형태로 반환합니다.
	 * @param fitToGrid (Boolean) : 모든 칼럼 사이즈들의 총합이 그리드 전체 크기보다 작은 경우 그리드 크기에 맞출지 여부를 지정합니다. (기본값: false)
	 * @return (Array) 모든 칼럼들의 크기를 담은 배열
	 */
	this.getFitColumnSizeList = function(fitToGrid){
		return AUIGrid.getFitColumnSizeList(_pid, fitToGrid);
	};
	
	/**
	 * 그리드의 특정 셀의 값을 반환합니다.
	 * @param rowIndex (Number) : 얻고자하는 행 인덱스
	 * @param dataField or columnIndex(String or Number) : 얻고자 하는 칼럼의 dataField 또는 칼럼 인덱스
	 */
	this.getCellValue = function(rowIndex, dataFieldOrcolumnIndex){
		return AUIGrid.getCellValue(_pid, rowIndex, dataFieldOrcolumnIndex);
	};
	
	/**
	 * 셀인덱스로 TD 엘리먼트 얻기
	 */
	this.getCellElementByIndex = function(rowIndex, columnIndex){
		return AUIGrid.getCellElementByIndex(_pid, rowIndex, columnIndex);
	}

	/**
	 * Master/Detail 그리드에서 selectionChange 이벤트 발생시 Detail 그리드가 수정중인지 체크하여 confirm 메세지
	 * @param e : 그리드의 selectionChange 이벤트에서 받은 이벤트변수
	 * @param ghDtls : 수정중인지 체크할 detail 그리드의 helper 변수 (여러개인 경우 array로 넘겨준다)
	 * @param errCd : 에러코드 (기본값: MSG_CM_0027 변경사항이 있습니다. 계속 진행하시겠습니까?)
	 * @param errBind : 에러코드 바인딩값
	 * @param callbackYes : confirm의 Yes인경우 실행할 콜백 함수
	 * @param callbackNo : confirm의 No인경우 실행할 콜백 함수
	 */
	this.chkEditingOnSelectionChange = function(e, ghDtls, errCd, errBind, callbackYes, callbackNo) {
		
	    if (gfn_isNull(_t.prevSelItem)) {
			yesFn();
	    }
	    
	    if (e.selectedItems.length > 0 && e.selectedItems[0].rowIndex == _t.prevSelItem.rowIndex) {
			return;
		}
	    var isEditing = false; //수정중인지 여부

	    if (!$.isArray(ghDtls)) ghDtls = [ghDtls];
    	for (var i = 0; i < ghDtls.length; i++) {
          if (ghDtls[i]._isGridEditing()) {
             isEditing = true;
             break;
          } else {
            let pid = ghDtls[i].pid,
               gridInst = AUIGrid._getInstance(pid);

            if (gridInst._nowEditing === true) {
               AUIGrid.forceEditingComplete(pid, null);
               isEditing = true;
               break;
            }
         }
       }
    	
    	//수정중이면 confirm
    	if (isEditing) {
    		errCd = errCd || 'MSG.COM.CFM.009';	//변경사항이 있습니다. 계속 진행하시겠습니까?
    		var msg = gfn_getMessage(errCd, errBind);

			 setTimeout( function() {	
	   			showModalConfirmByText(msg).then(function(answer){
	            if (answer) {
	            	yesFn();
	            } else {
	            	noFn();
	            }
	        });
  	     
	  		}, 100);
		} else {
    		yesFn();
    	}

	    function yesFn() {
	    	if (e.selectedItems.length > 0) {
            	_t.prevSelItem = e.selectedItems[0]; //이전행 정보 저장
            }
	    	if (callbackYes) {
	    		callbackYes.call(this);
	    	}
        }

	    function noFn() {
        	_t._setFocus(_t.prevSelItem.rowIndex, _t.prevSelItem.columnIndex);	//이전 행 선택

        	if (callbackNo) {
				callbackNo.call(this);
			}
	    }
	};

	/**
	 *	
	 */
	this.exportToXlsxLog = function( progCd ) {
		//로그 저장
		try{
			if (gfn_isNull(progCd)) {
				return;
			}
			let inDs = {
						'SERVICE_ID'  :	progCd,
						'LOG_TYPE'    : "EXCEL",
						'LOG_MSG'     : "엑셀 다운"
			};
					
			//트랜젝션 파라미터 설정
			let param = {
						svcId 	: 'insertPgmLog',						    // tranCallBack 에서 처리할 ID
						strUrl  : CONST.CONTEXT_PATH + "/common/main/insertPgmLog", // 전송 url
						param : {'ds_pgmLog' : gfn_wrapDatasetParam(inDs)},
			 			pLoad : false
			};
			//트랜젝션 실행
			gfn_transaction(param);
		}catch(e){};

	}

	/**
	 * excel download
	 */
	this.exportToXlsx = function(exportProps){

		//	로그 남김
		_t.exportToXlsxLog( CONST.PROG_CD );
		
		// 그리드 엑셀 저장 처리 
		if (Array.isArray(exportProps) && exportProps.length > 0) {
			_t.exportToXlsxMulti(exportProps[0].gridIds, exportProps);
			return;
		} else if(!gfn_isNull(exportProps.gridIds)) {
			_t.exportToXlsxMulti(exportProps.gridIds, [exportProps]);
			return;
		} else{
			//_t.exportToXlsxWcbnm(exportProps);
			_t._exportToXlsx(exportProps);
			return;
		}
		
	};
	
	/**
	 * excel download
	 */
	this._exportToXlsx = function(exportProps){
		
		if(gfn_isNull(exportProps)) exportProps = new Object();

		exportProps.postToServer = false;  // postToServer 를 true 설정하지 않은 경우, 기본적으로 로컬 다운로딩 처리됩니다.
		exportProps.progressBar = true;    // 내보내기 진행 상황을 퍼센티지로 보여줄지 여부를 나타냅니다.(기본값 : false)

		if(! gfn_isNull(exportProps.fileName)) {
			exportProps.fileName = exportProps.fileName.replaceAll('\n', '').replaceAll('/', '_').replaceAll('*', '');
		}else{
			var fileName = document.title;
			try{
				fileName =  PAGE_INFO['MENU_NM'];
			}catch(e) {				
			}
			exportProps.fileName = gfn_nvl(_t.opts.excelFileName, fileName  + '_' + gfn_gridDateFormatString("%Y%m%d%H%M%S"));//파일명
		}
		
		_t.opts.excelDownMode = true;
		
		AUIGrid.exportToXlsx(_pid, exportProps);
		_t.opts.excelDownMode = false;
		
	};

	/**
	 *	EXCEL DOWNLOAD
	 *	
	 *	그리드에 DropDownListRenderer 를 사용하는 경우
	 *	엑셀 저장시 코드로 표시됨
	 *	=> 코드명으로 표시 되도록... 우째 우째...
	 *	
	 *	exportProps 파라미터에 
	 *	width 를 설정하지 않은 컬럼의 사이즈 목록을 추가해 줘야 이쁘게(?) 나옴...
	 *	ex) columnSizeOfDataField : { 'ETC_RMK' : 500, 'ColID2': 300 , ... },	//	width 를 설정하지 않은 컬럼
	 */
	this.exportToXlsxWcbnm = function(exportProps){

		//	로그 남김
		_t.exportToXlsxLog( CONST.PROG_CD );
		
		fn_getMyExpToXlsxWcbnm().fn_export( this , exportProps );
	};

	/**
	 * excel download
	 */
	this.exportToXlsxMulti = function(subGridIds, exportProps){
		let gridProps;
		if (!Array.isArray(exportProps)) {
			exportProps = [];
		}

		if (exportProps.length == 0) {
			exportProps.push({});
		}

		gridProps = exportProps[0];

		var excelLimitCnt = 10000;//엑셀다운로드 제한건수
		gridProps.postToServer = false;// postToServer 를 true 설정하지 않은 경우, 기본적으로 로컬 다운로딩 처리됩니다.
		gridProps.progressBar = true;//내보내기 진행 상황을 퍼센티지로 보여줄지 여부를 나타냅니다.(기본값 : false)

		if(! gfn_isNull(gridProps.fileName))
			gridProps.fileName = gridProps.fileName.replaceAll('\n', '').replaceAll('/', '_').replaceAll('*', '');
		else
			gridProps.fileName = gfn_nvl(_t.opts.excelFileName, document.title+'_'+gfn_gridDateFormatString("%Y%m%d%H%M%S"));//파일명

		var exportURL = CONST.CONTEXT_PATH + "/comfunc/func/common/excel/download/xlsx?SERVICE_ID="+CONST.PROG_CD+"&logDownCount="+_t.getRowCount()+"&logGridPid="+_pid.substring(1)
			+"&LOG_TYPE=EXCEL" +"&filename="+ gridProps.fileName;

		_t.opts.excelDownMode = true;
		AUIGrid.exportToXlsxMulti(_pid, subGridIds, exportProps);
		_t.opts.excelDownMode = false;
		_t.setProp("exportURL", null);
	};
	
	
	/**
	 * excel download
	 */
	this.insertRow = function(obj){
		let callFunction = eval(obj);
		
	    if($.isFunction(callFunction)){
	        callFunction("I");
	    }		
	};
	
	/**
	 * AUIGrid 이벤트 바인딩
	 */
	this.bind = function(eventName, func) {
		if (eventName == 'selectionChange') {
			AUIGrid.bind(_pid, 'selectionChange', function(e) {
				_t._gridSelectionChangeHandler(e);
				return func.call(this, e);
			});
		} else if(eventName == 'ready'){
			AUIGrid.bind(_pid, "ready", function(e){
				if(_t.getRowCount() > 0){
					if(gridSavePositionFilterStr != null) {
						// KDY  
						setTimeout( function() {	
						 	_t._gotoSavePosition();//저장된 위치로 이동
  	     				}, 100);			
					} else if(_t.opts.selectFirstRow) _t._setFocus(0, 0);//그리드 로드시 첫번째 행 선택
				}
				return func.call(this, e);
			});
		} else if(eventName == 'keyDown'){
			AUIGrid.bind(_pid, "keyDown", function(e) {
				
				if((e.ctrlKey && e.keyCode == 70) && _t.opts.useContextMenu) {// Ctrl + F 키코드 || 스페이스바
					_t._searchDialogOpen();  //검색 UI 표시
					return false;            // 브라우저의 Ctrl+F 막기
				}
				
				//단축키 처리 
				if(e.keyCode >= 114 && e.keyCode <= 123){
					// 그리드 이벤트 Function Key 처리 
					gfn_keyDownEvent("G", e);
					return false;
				}
				
				
				if(e.ctrlKey && e.shiftKey && e.keyCode == 46) {// Ctrl + SHIFT + DELETE					
					return false;            // 브라우저의 Ctrl+F 막기
				}
				
				// 단축키 CTRL + A 
				if(e.ctrlKey && e.keyCode == 65) {					
					let _selectionMode = AUIGrid.getProp(_pid, "selectionMode");
					
					if (_selectionMode == "multipleRows") {
						// 전체 Row 선택
						AUIGrid.setSelectionBlock(_pid ,0, AUIGrid.getRowCount(_pid), 0,AUIGrid.getColumnCount(_pid));							
					}			
				}
				
				// Ctrl + Insert ( Aui 에서 기본기능으로 제공 하는 이벤트인데 제어가 불가능 )				
				if(e.ctrlKey && e.keyCode == 45) {// Ctrl + Insert Key
					return false;            // 브라우저의 Ctrl + Insert 막기
				}
				
				// Ctrl + Delete ( Aui 에서 기본기능으로 제공 하는 이벤트인데 제어가 불가능 )				
				if(e.ctrlKey && e.keyCode == 46) {// Ctrl + Delete Key
					return false;            // 브라우저의 Ctrl + Key 막기
				}
				return func.call(this, e);
			});
		} else if(eventName == 'vScrollChange'){
			AUIGrid.bind(_pid, 'vScrollChange', function(e) {
				if(_t.opts.treeRenderInfo.useTreeRender){//트리렌더러 사용여부
					$(".context-tree-wrap").each(function(){
						$(this).removeClass("active");
					});
				}
				
				_t._hideContextMenu(e);
				return func.call(this, e);
			});
		} else if(eventName == 'hScrollChange'){
			AUIGrid.bind(_pid, 'hScrollChange', function(e) {
				if(_t.opts.treeRenderInfo.useTreeRender){//트리렌더러 사용여부
					$(".context-tree-wrap").each(function(){
						$(this).removeClass("active");
					});
				}
				
				_t._hideContextMenu(e);
				return func.call(this, e);
			});
		} else if(eventName == 'headerClick'){
			AUIGrid.bind(_pid, "headerClick", function(e){
				//top hide
				if(_t.opts.enableHideTop){//상단 숨김기능 사용여부
					if(e.item.headerStyle && (e.headerText == "-" || e.headerText == "+")){
						var hdrTxt;
						var headerCss = "hideColRow foldTrigger";
						var sHideIdx = e.item.hideTopFldInfo.sHideIdx;
						var eHideIdx = e.item.hideTopFldInfo.eHideIdx;
						
						if(e.headerText == '-'){
							hdrTxt = "+";
							headerCss = "hideColRow foldTrigger";
							AUIGrid.hideColumnByDataField(e.pid,_t._getDataFieldArrByColumnIndex(sHideIdx,eHideIdx));
						}else{
							hdrTxt = "-"
							headerCss = "hideColRow foldTrigger";
							AUIGrid.showColumnByDataField(e.pid,_t._getDataFieldArrByColumnIndex(sHideIdx,eHideIdx));
						}
						AUIGrid.setColumnPropByDataField(e.pid, e.item.dataField, {headerText:hdrTxt,headerStyle:headerCss});
					}
				}
				
				return func.call(this, e);
			});
		}else if(eventName == 'cellClick'){
			AUIGrid.bind(_pid, "cellClick", function(e) {
				if(_t.opts.treeRenderInfo.useTreeRender && _t.opts.treeRenderInfo.treeEditableObj[e.columnIndex]){//트리렌더러 사용여부 && 수정가능여부
					if(!gfn_isNull(_t.opts.treeRenderInfo.treeIdObj[e.columnIndex])){
						_t._treeRenderView(e, _t.opts.treeRenderInfo.treeIdObj[e.columnIndex]);//트리렌더러 노출
					}
				}
				return func.call(this, e);
			 });
		} else {
			AUIGrid.bind(_pid, eventName, func);
		}
	};

	/**
	 * AUIGrid 이벤트 바인딩 해제
	 */
	this.unbind = function(eventName) {
		AUIGrid.unbind(_pid, eventName);
	};
	
	/**
	 * 공통 validator
	 */
	this._validator = {
		//HHmm 형식 체크 validator
		HHmm : function(addValidator) {
			return function(oldValue, newValue, rowItem) {
				var isValid = gfn_toStr(newValue) != '' ? g_isHHmm(newValue) : true;
				var msg;

				if (!isValid) {
					msg = gfn_getMessage('MSG_COM_VAL_057'); //4자리 숫자의 시간분(hhmm) 형식으로 입력해 주세요.
					return _t._validator.returnRslt(isValid, msg);
				}

				//추가 validator 가 있으면 실행
				if (addValidator && $.isFunction(addValidator)) {
					return addValidator.call(this, oldValue, newValue, rowItem);
				}
	        };
		}
		,onlyAlphaNum : function(addValidator) {
			return function(oldValue, newValue, rowItem) {
				var msg;
				var isValid = newValue.isAlphaNum();
				

				if (!isValid) {
					msg = gfn_getMessage('MSG.COM.VAL.040');         //숫자와 영문만 입력 가능 합니다.
					return _t._validator.returnRslt(oldValue, msg);
				}
	        };
		}
		,onlyAlphaNumSpec : function(addValidator) {
			return function(oldValue, newValue, rowItem) {
				var msg;
				var isValid = newValue.isAlphaNumSpec();

				if (!isValid) {
					msg = gfn_getMessage('MSG.COM.VAL.122');         //한글인 입력이 불가합니다.
					return _t._validator.returnRslt(oldValue, msg);
				}
	        };
		}		
		//값 비교 validator
		,compareValue : function(compareField, compareDir, errCd, dataType) {
			return function(oldValue, newValue, rowItem) {
	            return _t._validator.fnChkCompare(newValue, rowItem, compareField, compareDir, errCd, dataType);
	        };
		}

		//compareValue용 체크함수
		,fnChkCompare : function(newValue, rowItem, compareField, compareDir, errCd, dataType) {
			dataType = dataType || 'N';	//N:숫자 S:문자
			var isValid = true;
            var msg = '';
            var newVal = $.trim(newValue);
            var compareVal = $.trim(rowItem[compareField]);

            if (newVal != '' && compareVal != '') {
            	newVal = (dataType == 'N') ? gfn_toNum(newVal) : gfn_toStr(newVal);
                compareVal = (dataType == 'N') ? gfn_toNum(compareVal) : gfn_toStr(compareVal);

            	if (compareDir == '>=') {
                	if (newValue >= compareVal) {
                		errCd = errCd || 'MSG_COM_VAL_058'; //{0}보다 작아야 합니다.
                		isValid = false;
                		msg = gfn_getMessage(errCd, _t._getColumnInfo(compareField).headerText.stripTags());
                	}
            	}
            	else if (compareDir == '<=') {
                	if (newValue <= compareVal) {
                		errCd = errCd || 'MSG_COM_VAL_059'; //{0}보다 커야 합니다.
                		isValid = false;
                		msg = gfn_getMessage(errCd, _t._getColumnInfo(compareField).headerText.stripTags());
                	}
            	}
            	else if (compareDir == '>') {
                	if (newValue > compareVal) {
                		errCd = errCd || 'MSG_COM_VAL_060'; //{0}보다 클 수 없습니다.
                		isValid = false;
                		msg = gfn_getMessage(errCd, _t._getColumnInfo(compareField).headerText.stripTags());
                	}
            	}
            	else if (compareDir == '<') {
                	if (newValue < compareVal) {
                		errCd = errCd || 'MSG_COM_VAL_061'; //{0}보다 작을 수 없습니다.
                		isValid = false;
                		msg = gfn_getMessage(errCd, _t._getColumnInfo(compareField).headerText.stripTags());
                	}
            	}
            }
            return _t._validator.returnRslt(isValid, msg);
		}

		//공통 validator
		,common : function(colInfo) {
			return function(oldValue, newValue, rowItem) {
				var validSet = colInfo.validatorSet;
				
				
				var newVal = $.trim(gfn_toStr(newValue));

				if (newVal != '') {
					//최소 byte수 체크
					if (!gfn_isNull(validSet.minByte)) {
						if (newVal.getByte() < validSet.minByte) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.062', gfn_toStr(validSet.minByte))); //최소 {0} Byte 이상 입력하셔야 합니다.
						}
					}
					//최대 byte수 체크
					if (!gfn_isNull(validSet.maxByte)) {
						if (newVal.getByte() > validSet.maxByte) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.063', gfn_toStr(validSet.maxByte))); //최대 {0} Byte 까지 입력할 수 있습니다.
						}
					}
					//숫자 최소값 체크
					if (!gfn_isNull(validSet.min)) {
						if (!newVal.isNumber()) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.038')); //숫자만 입력하실 수 있습니다.
						}
						
						
						if (gfn_toNum(newVal) < gfn_toNum(validSet.min)) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.064', gfn_toStr(validSet.min))); //최소 {0} 이상 입력하셔야 합니다.
						}
					}
					//숫자 최대값 체크
					if (!gfn_isNull(validSet.max)) {
						if (!newVal.isNumber()) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.038')); //숫자만 입력하실 수 있습니다.
						}
						if (gfn_toNum(newVal) > gfn_toNum(validSet.max)) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.065', gfn_toStr(validSet.max))); //최대 {0} 까지 입력할 수 있습니다.
						}
					}
					//소수점 최대자리수 체크
					if (!gfn_isNull(validSet.maxPoint)) {
						if (!newVal.isNumber()) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.038')); //숫자만 입력하실 수 있습니다.
						}
						if (newVal.indexOf('.') != -1) {
							var arrVal = gfn_toStr(newVal).split('.');
							if (arrVal[1].length > validSet.maxPoint) {
								return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.066', gfn_toStr(validSet.maxPoint))); //소수점 {0} 자리까지 입력할 수 있습니다.
							}
						}
					}
					//숫자 입력단위 체크
					if (!gfn_isNull(validSet.unit)) {
						if (!newVal.isNumber()) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.038')); //숫자만 입력하실 수 있습니다.
						}
						if (gfn_toNum(newVal) % gfn_toNum(validSet.unit) != 0) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.067', gfn_toStr(validSet.unit))); //{0} 단위로 입력해 주세요.
						}
					}
					//영문만 입력가능
					if (validSet.onlyAlpha) {
						if (!newVal.isAlpha()) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.039')); //영문자만 입력하실 수 있습니다.
						}
					}
					//영문/공백만 입력가능
					if (validSet.onlyAlphaBlank) {
						if (!newVal.isAlphaBlank()) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.068')); //영문 및 공백만 입력할 수 있습니다.
						}
					}
					//영문/숫자만 입력가능
					if (validSet.onlyAlphaNum) {
						if (!newVal.isAlphaNum()) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.040')); //영문자 혹은 숫자만 입력하실 수 있습니다.
						}
					}
					
						//영문/숫자/특수문 만 입력가능
					if (validSet.onlyAlphaNumSpec) {
						if (!newVal.isAlphaNumSpec()) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.122')); //한글은 입력할수 없습니다.
						}
					}
					
					//숫자만 입력가능
					if (validSet.onlyNum) {
						if (!newVal.isNumber()) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.038')); //숫자만 입력하실 수 있습니다.
						}
					}
					//email 형식 체크
					if (validSet.email) {
						if (!newVal.isEmail()) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.034')); //올바른 이메일 주소를 입력하여 주십시오.
						}
					}
					//날짜 형식 체크
					if (validSet.date) {
						if (!g_isDateYmd(newVal)) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.069')); //유효한 날짜 형식이 아닙니다.\nYYYYMMDD 형식으로 입력해 주세요.
						}
					}
					//년월 형식 체크
					if (validSet.date_ym) {
						var tmpVal = g_fixDate(newVal);
						if (tmpVal.length != 6 || !moment(tmpVal, 'YYYYMM').isValid()) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.070')); //유효한 년월 형식이 아닙니다.\nYYYYMM 형식으로 입력해 주세요.
						}
					}
					//월일 형식 체크
					if (validSet.date_md) {
						var tmpVal = g_fixDate(newVal);
						if (tmpVal.length != 6 || !moment(tmpVal, 'MMDD').isValid()) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.071')); //유효한 년월 형식이 아닙니다.\nMMDD 형식으로 입력해 주세요.
						}
					}
					//자리수 체크
					if (!gfn_isNull(validSet.lenDigit)) {
						if (gfn_toStr(newVal).length != validSet.lenDigit) {
							return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.065', gfn_toStr(validSet.lenDigit))); //최대 {0} 까지 입력할 수 있습니다.
						}
					}
					
					//중복체크
					if (validSet.uniqueValue) {
						if (oldValue != newValue) {
							if(! AUIGrid.isUniqueValue(_pid, validSet.uniqueValue, newVal)){
								return _t._validator.returnRslt(false, gfn_getMessage('MSG.COM.VAL.126')); //중복체크
							}
						}
					}

					//추가 validator 가 있으면 실행
					if (colInfo.addValidator && $.isFunction(colInfo.addValidator)) {
						return colInfo.addValidator.call(this, oldValue, newValue, rowItem);
					}
				}

				return _t._validator.returnRslt(true, '');
	        };
		}

		//validation 결과 리턴
		,returnRslt : function(isValid, msg) {
			//리턴값은 Object 이며 validate 의 값이 true 라면 패스, false 라면 message 를 띄움
			return { 'validate': isValid, 'message': msg };
		}
	};

	/**
	 * locale에 따른 validatorset 반환
	 */
	this._getLocaleValidSet = function(limitCd, maxlength) {
		var validSet = {};

		// 제한 조건 처리 하기
		switch (limitCd) {
			case '01': { /* 제한없음 */
				break;
			}
			case '02': { /* 자리수만 제한 */
				validSet = { lenDigit : maxlength };
				break;
			}
			case '03': { /* 자리수+숫자제한 */
				validSet = {
					lenDigit : maxlength,
					onlyNum  : true
				};
				break;
			}
			case '04': { /* 최대값 제한 */
				validSet = { maxByte : maxlength };
				break;
			}
			case '05': { /* 최대값 제한+숫자제한 */
				validSet = {
					maxByte : maxlength,
					onlyNum  : true
				};
				break;
			}
			case '06': { /* 최소값제한 */
				validSet = { minByte : maxlength };
				break;
			}
			case '07': { /* 최소값제한+숫자제한 */
				validSet = {
					minByte : maxlength,
					onlyNum  : true
				};
				break;
			}
			default: {
				break
			}
		}

		return validSet;
	}
	
	/**
	 * rowIdField 를 지정한 한 경우 rowId 값을 통해 그리드 행(row) 아이템을 삭제합니다.
	 * @param rowIdValue (Array or String) : 삭제하고자 하는 행의 rowId 값 (복수를 삭제하고자 할 때 rowId 값들을 배열로 묶으십시오.)
	 */
	this.removeRowByRowId = function(rowIdValue){
		AUIGrid.removeRowByRowId(_pid, rowIdValue);
	};
	
	/**
	 * 그리드 삭제 모드가 소프트 삭제(softRemoveRowMode=true)인 경우 행을 삭제하면 삭제된 표시가 된 채로 그리드에 남아 있습니다.
	 * @param rowIds (String or Array) : 삭제할 행의 rowId 값(들) (단수 또는 복수)
	 */
	this.removeSoftRows = function(rowIds){
		AUIGrid.removeSoftRows(_pid, rowIds);
	};
	
	/**
	 * 그리드 삭제 모드가 소프트 삭제(softRemoveRowMode=true)인 경우 행을 삭제하면 삭제된 표시가 된 채로 그리드에 남아 있습니다. 그 표시된 삭제 행을 복원 할 수 있는 메소드입니다.(삭제 취소)
     * @param option (String or Number) : 복구할 대상을 지정할 수 있는 옵션. 유효 값은 "selectedIndex", "all", rowIndex 입니다. "selectedIndex" : 현재 선택되어 있는 행을 복구 합니다.(선택된 행이 삭제 표시된(softRemoveRow) 아이템이여야 함)rowIndex : 지정된 행 인덱스의 삭제 표시된 행을 복구합니다.(Number)
	 */
	this.restoreSoftRows = function(option){
		AUIGrid.restoreSoftRows(_pid, gfn_nvl(option, 'selectedIndex'));
	};

	/**
	 * 사용자가 rowIdField 속성을 설정한 경우 rowId 값을 통해 행 인덱스를 반환합니다
	 * @param rowId : (String) rowIdField 에 맞는 값
	 * @return rowIndex : (Number) 행 인덱스
	 */
	this.rowIdToIndex = function(rowId){
		return AUIGrid.rowIdToIndex(_pid, rowId);
	};
	
	/**
	 * 사용자가 rowIdField 속성을 설정한 경우 rowIndex 에 맞는 행의 rowId 값을 반환합니다
	 */
	this.indexToRowId = function(rowIndex){
		return AUIGrid.indexToRowId(_pid, rowIndex);
	};
	
	/**
	 * 추가된 행인 경우만 에디팅 진입 허용
	 * @param dataFields : ex)dataField1,dataField2
	 */
	this._chkAddRowCellEditing = function(event, dataFields){
		var arrDataField = dataFields.split(',');
		if($.inArray(event.dataField, arrDataField) !== -1){
			if(_t.isAddedById(event.item[_t.opts.rowIdField])) return true;
			else return false;
		}else{
			return true;
		}
	};
	
	/**
	 * 선택한 행의 rowIndex를 반환한다.
	 */
	this._getSelectedRowIndex = function(){
		var item = _t.getSelectedItems();
		if(item.length == 0){
			return null;
		}else{
			return item[0].rowIndex;
		}
	};
	
	/**
	 * 선택된 행의 컬럼의 값을 기억한다 ex)colName1,colName2,colName3
	 */
	this._setSavePosition = function(colStr){
		var idx = _t._getSelectedRowIndex();
		if(idx != null){
			var item = _t.getItemByRowIndex(idx);
			var colArr = colStr.split(",");
			var savePositionFilterStr = "";
			for(var i=0; i<colArr.length; i++){
				savePositionFilterStr += colArr[i]+"="+item[colArr[i]]+"&";
			}
			gridSavePositionFilterStr = new Array();
			gridSavePositionFilterStr.push(savePositionFilterStr.substring(0, savePositionFilterStr.length - 1));//마지막 & 삭제
			gridSavePositionFilterStr.push(_t.getSelectedIndex()[1]);
		}else{
			gridSavePositionFilterStr = null;
		}
	};
	
	/**
	 * 저장된 위치로 이동한다.
	 */
	this._gotoSavePosition = function(){
		if(gridSavePositionFilterStr != null){
			var item = _t._getItemByFilter(gridSavePositionFilterStr[0],true);
			if(item != null){
				_t._setFocus(_t.rowIdToIndex(item[_t.opts.rowIdField]), gridSavePositionFilterStr[1]);
			}
			gridSavePositionFilterStr = null;
		}
	};
	
	/**
	 * 필터된 행을 반환한다.
	 * @param filterStr : colName=value&colName=value
	 * @param oneDataFlag  false:필터된 전체 행(default),true:필터된 첫번재 행   
	 */
	this._getItemByFilter = function(filterStr, oneDataFlag){
		if(gfn_isNull(oneDataFlag)) oneDataFlag = false;
		var gridData = AUIGrid.getGridData(_pid);
		var filterArr = filterStr.split("&");
		var rtnItem = [];
		var item = new Object();
		var chk = true;
		var filterDataArr = new Array();;
		for(var i=0; i<gridData.length; i++){
		 	item = gridData[i];
		 	chk = true;
		 	for(var j=0; j<filterArr.length; j++){
		 		if(filterArr[j].indexOf("=") == -1) continue;
		 		filterDataArr = filterArr[j].split("=");
		 		if(item[filterDataArr[0]] != filterDataArr[1]){
		 			chk = false;
		 			break;
		 		}
		 	}
		 	if(chk){
		 		if(oneDataFlag){
		 			rtnItem = item;
		 			break;
		 		}else{
		 			rtnItem.push(item);
		 		}
		 	}
		}
		return rtnItem;
	};
	
	/**
	 * 특정 컬럼에 중복되는 값이 존재하면 메세지출력 후 결과 리턴
	 * @param cols : 컬럼명 ex)dataField1,dataField2
	 * @param inValues : 비교 값 ex)value1,value2
	 * @param findCompareCnt : 비교할 중복값 검색건수 (기본값: 2)
	 */
	this._chkDuplicateVal = function(cols, inValues, findCompareCnt) {
		var allData = _t.getOrgGridData();
		cols = cols.split(',');
		if(!gfn_isNull(inValues)) inValues = inValues.split(',');
	
		for(var i = 0; i < _t.getRowCount(); i++) {
			var rowItem = _t._getRowItem(i);
			var arrHeader = [];
			var arrDataFiled = [];
			var arrVal = [];
			findCompareCnt = findCompareCnt || 2;
	
			for(var c = 0; c < cols.length; c++) {
				var dataField = cols[c];
				arrHeader.push(gfn_nvl(_t._getColumnInfo(dataField).headerText, dataField).stripTags());
				arrDataFiled.push(dataField);
				if (!inValues) arrVal.push(rowItem[dataField]);
			}
	
			if (inValues) arrVal = inValues;
	
			var findRows = gfn_grepData(allData, arrDataFiled, arrVal);
	
			//중복된값 존재시
			if (findRows.length >= findCompareCnt) {
				gfn_showMessage('MSG.COM.VAL.026', arrHeader.join('/'));	//[{0}] 항목은 중복된 값을 입력할 수 없습니다.
				//if (!inValues) {
					_t._setFocus(i, _t.getColumnIndexByDataField(cols[0]));
				//}
				return false;
			}
		}
	
	    return true;
	};

	/**
	 * 특정 컬럼에 중복되는 값이 존재하면 메세지출력 후 결과 리턴
	 * @param cols : 컬럼명 ex)dataField1,dataField2
	 * @param inValues : 비교 값 ex)value1,value2
	 * @param findCompareCnt : 비교할 중복값 검색건수 (기본값: 2)
	 */
	this._chkDuplicateValForIndex = function(cols, inValues, findCompareCnt) {
		var allData = _t.getOrgGridData();
		cols = cols.split(',');
		if(!gfn_isNull(inValues)) inValues = inValues.split(',');

		for(var i = 0; i < _t.getRowCount(); i++) {
			var rowItem = _t._getRowItem(i);
			var arrHeader = [];
			var arrDataFiled = [];
			var arrVal = [];
			findCompareCnt = findCompareCnt || 2;

			for(var c = 0; c < cols.length; c++) {
				var dataField = cols[c];
				arrHeader.push(gfn_nvl(_t._getColumnInfo(dataField).headerText, dataField).stripTags());
				arrDataFiled.push(dataField);
				if (!inValues) arrVal.push(rowItem[dataField]);
			}

			if (inValues) arrVal = inValues;

			var findRows = gfn_grepData(allData, arrDataFiled, arrVal);

			//중복된값 존재시
			if (findRows.length >= findCompareCnt) {

				gfn_showMessage('{0} 항목은 중복된 값을 입력할 수 없습니다. <br /> ({1})', arrHeader.join('/') + '|' + arrVal.join(' / '));
				//if (!inValues) {
				_t._setFocus(i, _t.getColumnIndexByDataField(cols[0]));
				//}
				return false;
			}
		}

		return true;
	};

	/**
	 * 그리드 필수 값 체크
	 * @param type : A 전체데이터 체크(미입력시 수정,추가,삭제)
	 * @param requiredField : (Array)필수 필드 추가
	 */
	this._gridRequiredCheck = function(type, requiredField){
		var isValid = true;
        var cellValue;     // 그리드 Cell Value
        var rowIndex;      // 그리드 행번호
		var colInfos = $.extend(true, [],_t.getColumnInfoList());
		var dataList;
		if(!gfn_isNull(type) && "A" == type.toUpperCase()){
			dataList = AUIGrid.getOrgGridData(_pid);
		}else{
			dataList = gfn_getMergedArray(AUIGrid.getAddedRowItems(_pid),AUIGrid.getEditedRowItems(_pid),_t._getCheckedRowData());
		}
		
		if(!gfn_isNull(requiredField) && $.isArray(requiredField)){
			for(var j = 0;  j < colInfos.length; j++) {
				var colInfo = colInfos[j];
				if($.inArray(colInfo.dataField, requiredField) > -1){
					colInfo['required'] = true;
				}
			}
		}

		VALID_LOOP :
		for(var i=0; i<dataList.length; i++){
			var rowItem = dataList[i];
			for(var j = 0;  j < colInfos.length; j++) {
				var colInfo = colInfos[j];
				
				// Validation Check할 Rule이 없을 경우 Skip
                if(gfn_isNull(colInfo.required)) continue;
				
                cellValue   = rowItem[colInfo.dataField];
                if(gfn_isNull(cellValue)) cellValue = "";
                cellValue += "";
                rowIndex  = _t.rowIdToIndex(rowItem[_t.opts.rowIdField]);

                //유효성검사 메시지에 칼럼헤더명을 그대로 사용할 수 없을 경우, colModel의 valid_title 속성에 유효성검사 타이틀을 별도 지정한다.
                var valid_title = colInfo.valid_title || colInfo.headerText;
				// 1. 필수 입력 체크
                if(colInfo.required){
                	if(gfn_toStr(colInfo.renderType).toLowerCase().indexOf('number') != -1 && colInfo.nullable === true){
						if(gfn_toNum(rowItem[colInfo.dataField]) === 0 || gfn_toStr(rowItem[colInfo.dataField]).trim() == ''){
							isValid = false;
						}
					}else if(gfn_toStr(rowItem[colInfo.dataField]).trim() == ''){
						isValid = false;
					}
                	
					if(!isValid){
						setTimeout(function() {
		   				   gfn_showMessage('MSG.COM.VAL.001', gfn_nvl(colInfo.headerText, colInfo.dataField).stripTags());	//{0} 항목은 필수 입력입니다.
		   				}, 100); 
		   
						if(!gfn_isNull(rowIndex)){
							_t._setFocus(rowIndex, colInfo.columnIndex);
						}
						
						break VALID_LOOP;
					}
                }
               
			}
		}
		
		return isValid;
	};
	
	/* 20220907 KDY 추가 */
	/* 
	 * 그리도 Row Position
	 */
	this.getGridRowPosition = function(){
		return AUIGrid.getSelectedIndex(_pid)[0];
	};
	
	/* 
	 * 그리도 Row Position
	 * row : rowIndex
	 * columName:"컬럼ID"
	 */
	this.setGridRowFocus = function(row, columName){
		AUIGrid.setSelectionByIndex(_pid, row, _t.getColumnIndexByDataField(columName))
	};
	
	/* 
	 * 그리도 변경되고 닫을시 값 저장용 일단 적용
	 */
	this.setLocalStorageGridData = function(isModified){
		
		if(isModified) {
			var gridData = AUIGrid.getGridData(_pid);
			
			if(!gfn_isNull(_t.opts.localStorageId)){
				if(typeof(Storage) != "undefined") { // Check browser support
					localStorage.setItem(_t.opts.localStorageId+".auigridData", JSON.stringify(gridData));
			   }
			}
		}else{
			if(!gfn_isNull(_t.opts.localStorageId)){
				if(typeof(Storage) != "undefined") { // Check browser support
					localStorage.removeItem(_t.opts.localStorageId + ".auigridData");
				}
			}
		}
	}
	
	
	/**
   *  json Data를 Grid Data로 전환 
   */
   this.setGridJsonRowData = function(rowId, jsonData){
	  
	   let columObj = AUIGrid.getColumnInfoList(_pid);
	   //console.log("columnObj", columObj );
	   let targObjKey = Object.keys(jsonData);
	   for(var i in targObjKey){
		 let columnInfo = _t._getColumnInfo(targObjKey[i]);
		 
		 if(! gfn_isNull(columnInfo)) { 
			 		 
			 var jsonValue = jsonData[targObjKey[i]];
			 
			 if(jsonValue == "")  jsonValue =  null;
			 
			 // RenderType 이 Number 이면서 align이 Right인경우 숫자로 인식 처리 한다.
			 if (columnInfo.renderType == "onlynumber" && columnInfo.align == "right" ) {
				jsonValue = parseInt(jsonValue);
			 }
 			 if (columnInfo.dataType == "numeric") {
				jsonValue = parseInt(jsonValue);
			 }
			 
			 AUIGrid.setCellValue(_pid, rowId, targObjKey[i], jsonValue);
		 }
			 
	   }
   }

	
	
	/** 
	 * 추가 검색메뉴 열기
 	 */
	$(document).on("mousedown", ".show-extension",function(){
		var ext = $(this).siblings(".extension");
		var container = $("#container");
		ext.addClass("active", function(){
			var extInput = ext.find(".ext-header input[type=text]");
			if ( extInput.length ) {
				extInput.focus();
			};
			//화면 아래에 노출될 경우 스크롤 생성 안되게끔
			if ( $(this).closest(".dialog-body").length == 0 ) {
				if ( $(this).offset().left > container.width() * 0.6 ) {
				};
				var offsetB = $(this).offset().top + $(this).outerHeight();
				if ( offsetB > container.height() ) {
				};
			};
			//요소 밖 클릭시 닫히기
			$("body").on("click.aClick", function(e){
				if ( $(e.target).closest(ext).length == 0 ) {
					ext.removeClass("active");
					$("body").off("click.aClick");
				};
			});
		});
	});	
	
	return _t;
};

/* ================ CMM (공통관리) AUIDGrid Utility 정의 끝 ================================ */


/**
 * Key-Value 형식의 드랍다운 공통 처리
 */
var g_keyValueDropDown = {
	//editRenderer 정의
	renderer: function(arrList, keyField, valueField, colInfo) {
		keyField = keyField || 'code';
		valueField = valueField || 'value';

		var defColInfo = {
        	type : 'DropDownListRenderer'
	        ,list : arrList
	        ,keyField : keyField
	        ,valueField : valueField
	        ,showEditorBtnOver : true
	        ,listAlign:'left'
	    };

		if (colInfo) {
			var editRenderer = $.extend(true, defColInfo, colInfo.editRenderer);
			return editRenderer;
		}
		else {
			return defColInfo;
		}
	}

	//드랍다운 목록에서 셀의 dataFiled 값과 일치하는 항목을 찾아서 selected 처리
	,labelFunction: function(arrList, keyField, valueField, colInfo, _t) {
		keyField = keyField || 'code';
		valueField = valueField || 'value';

		if (colInfo && $.isFunction(colInfo.labelFunction)) {
			return colInfo.labelFunction;
		} else {
			return function (rowIndex, columnIndex, value, headerText, item) {
		        var retStr = '';

		        if (colInfo && $.isFunction(colInfo.editRenderer.listFunction)) {
		        	arrList = colInfo.editRenderer.listFunction(rowIndex, columnIndex, item, colInfo.dataField);
		        }

		        if ($.isArray(arrList)) {
		        	if (gfn_isNull(value)) value = "";
		        	if (colInfo.editRenderer.multipleMode) {
		        		var delimiter = colInfo.editRenderer.delimiter || ', ';
						var arrValue = value.split(delimiter);
						var arrTemp = [];

						for(var i = 0; i < arrList.length; i++) {
							if(arrValue.indexOf(arrList[i][keyField]) >= 0) {
								arrTemp.push( arrList[i][valueField] );
							}
						}
						retStr = arrTemp.join(delimiter);
		        	} else if(colInfo.xlsxKeyDown){
		        		for(var i = 0; i < arrList.length; i++) {
			        		if(arrList[i][keyField] == value) {
				                if(_t.opts.excelDownMode) retStr = arrList[i][keyField];
				                else retStr = arrList[i][valueField];
				                break;
				            }
			        	}
		        	} else {
	        			for(var i = 0; i < arrList.length; i++) {
			        		if(arrList[i][keyField] == value) {
				                retStr = arrList[i][valueField];
				                break;
				            }
			        	}
			        }
		        }

		        return retStr;
		    };
		}
	}

};


/**
 * labelFunction  공통 처리
 */
var g_labelFunction = {
	//HHmm형식 또는 분단위의 데이터를 시간:분(HH:mm / HH시간 mm분) 포맷팅
	formatHourMin: function(fmtType, isFromMins) {
		return function(rowIndex, columnIndex, value, headerText, item) {
			var ret = value;

			if(gfn_toStr(value) != '') {
				//분단위인 경우 HHmm형식으로 변환
				if (isFromMins) {
					ret = g_minToHHmm(ret);
				}

				ret = g_formatHourMin(ret, fmtType);
			}
			return ret;
		}
	}

	//공통코드명 노출
	,codeValue: function(colInfo) {
		return function(rowIndex, columnIndex, value, headerText, item) {
			var ret = value;

			for(var i = 0; i < colInfo.codeList.length; i++) {
	            if(colInfo.codeList[i].code == value) {
	            	ret = colInfo.codeList[i].value;
	                break;
	            }
	        }
			return ret;
		}
	}
};

/**
 * 필수값 체크
 * @param reqGrid : 요청 그리드 ex)'ds_master=_ghMaster ds_detail=_ghDetail'
 */
function gfn_auiGridRequiredCheck(reqGrid){
	var isValid = true;
	var reqGridList = reqGrid.split(' ');
	for(var k=0; k<reqGridList.length; k++){
		var reqGridObj;
		if(reqGridList[k] != null && reqGridList[k].indexOf('=') > 0){
			reqGridObj = reqGridList[k].split('=')[1];
			if(reqGridObj.indexOf(':') > 0) reqGridObj  = reqGridObj.split(':')[0];
			if(!eval(reqGridObj)._gridRequiredCheck()){
				isValid = false;
				break;
			}
		}
	}
	return isValid;
}

/**
 * 전송 데이터 반환
 * @param reqGrid : 요청 그리드 ex)'ds_master=_ghMaster ds_detail=_ghDetail'
 */
function gfn_getAuiGridReqData(reqGrid){
	var reqData = new Object();
	var reqGridList = reqGrid.split(' ');
	for(var i=0; i<reqGridList.length; i++){
		var reqGridObj, reqParamNm;
		if(reqGridList[i] != null && reqGridList[i].indexOf('=') > 0){
			var dataArray = new Object();
			reqParamNm = reqGridList[i].split('=')[0];
			reqGridObj = reqGridList[i].split('=')[1];
			var reqDataType;
			if(reqGridObj.indexOf(':') > 0){
				reqDataType = reqGridObj.split(':')[1].toUpperCase();
				reqGridObj = reqGridObj.split(':')[0];
			}
			reqGridObj = eval(reqGridObj);
			reqData[reqParamNm] = reqGridObj.getGridDataset(reqDataType, true);
		}
	}

	return {inDs:reqData};
}

/**
 * 응답 데이터 그리드에 바인딩
 * @param resData : 응답 데이터
 * @param resGrid : 응답 그리드 ex)'_ghMaster=ds_master _ghDetail=ds_detail'
 */
function gfn_setAuiGridResData(resData, resGrid){
	var resGridList = resGrid.split(' ');
	for(var i=0; i<resGridList.length; i++){
		var resGridObj, resParamNm;
		if(resGridList[i] != null && resGridList[i].indexOf('=') > 0){
			resGridObj = resGridList[i].split('=')[0];
			resParamNm = resGridList[i].split('=')[1];
			if(!gfn_isNull(resData[resParamNm])){
				resGridObj = eval(resGridObj);
				var rowIdField = resGridObj.opts.rowIdField;
				if(gfn_isNull(rowIdField)){
					for(var j=0; j<resData[resParamNm]['data'].length; j++){
						resData[resParamNm]['data'][j] = JSON.parse(JSON.stringify(resData[resParamNm]['data'][j]));
					}
				}else{
					for(var j=0; j<resData[resParamNm]['data'].length; j++){
						resData[resParamNm]['data'][j] = JSON.parse(JSON.stringify(resData[resParamNm]['data'][j]));
						(resData[resParamNm]['data'][j])[rowIdField] = j;
					}
				}
				if(resGridObj.opts.useScrollPaging){
					if(resGridObj.opts.scrollPagingOpt.startRow > 0){
						resGridObj.appendGridData(resData, resParamNm); // 데이터 추가
					} else{
						resGridObj.setGridData(resData, resParamNm); // 데이터 셋
					}
					resGridObj.opts.scrollPagingOpt.nowRequesting = false;
					if(resData[resParamNm]['data'].length < resGridObj.opts.scrollPagingOpt.listCount){ // 페이징 마지막 체크
						resGridObj.opts.scrollPagingOpt.isLast = true;
					} else{
						resGridObj.opts.scrollPagingOpt.isLast = false;
					}
				} else{
					resGridObj.setGridData(resData, resParamNm);
				}
				//페이징 사용여부
				if(resGridObj.opts.useCustomPaging && !gfn_isNull(resData.totalCount)){
					resGridObj.opts.customPagingOpt.totalRowCount=resData.totalCount;// 전체 데이터 건수					
					resGridObj._createPagingNavigator();// 페이징 네비게이터 업데이트
				}
			}
		}
	}
}

/**
 * 페이징 그리드 파라메터 세팅
 */
function gfn_setCustomPagingParam(o){
	var resGrid = o.resGrid;
	var resGridList = resGrid.split(' ');
	for(var i=0; i<resGridList.length; i++){
		if(resGridList[i] != null && resGridList[i].indexOf('=') > 0){
			var resGridObj = eval(resGridList[i].split('=')[0]);
			// 네비게이션 페이징
			if(resGridObj.opts.useCustomPaging){
				resGridObj.opts.customPagingOpt.transaction = o;
				if(!resGridObj.opts.customPagingOpt.isPagingCall){
					o.param.START_ROW = 0;
					o.param.END_ROW = resGridObj.opts.customPagingOpt.pageRowCount;
					o.param.LIST_COUNT = resGridObj.opts.customPagingOpt.pageRowCount;
					resGridObj.opts.customPagingOpt.currentPage = 1;
				}
				resGridObj.opts.customPagingOpt.isPagingCall = false;
			}
			// 스크롤 페이징
			if(resGridObj.opts.useScrollPaging){
				if(o.pAppendData){
					resGridObj.opts.scrollPagingOpt.startRow += resGridObj.opts.scrollPagingOpt.listCount;
				} else{
					resGridObj.opts.scrollPagingOpt.startRow = 0;
				}
				o.param.START_ROW = resGridObj.opts.scrollPagingOpt.startRow;
				o.param.LIST_COUNT = resGridObj.opts.scrollPagingOpt.listCount;
				o.param.SKIP_COUNT = true;
				resGridObj.opts.scrollPagingOpt.nowRequesting = true;
			}
		}
	}
}


/**
 * AUIGrid 데이터를 전송/저장하는 함수.
 */
function gfn_auiTransaction(options){
	//페이징 그리드 파라메터 세팅
	gfn_setCustomPagingParam(options);
	//개발 환경 세팅 체크 및 적용
	gfn_setDevParam(options);

	// 전송할 데이터 셋팅
	var data = {};
	var isAsync = options.async;
	if (typeof (isAsync) == "undefined" || isAsync == null) {
		isAsync = true;
	}

	var reqData = gfn_getAuiGridReqData(options.reqGrid);
	$.extend(data, options.param, reqData.inDs);
	
	
	$.ajax({
		url : options.strUrl,
		data : JSON.stringify(data),
		method : 'POST',
		async : isAsync,
		crossDomain: false, // jquery cors Ajax 호출 시 "X-Requested-With" request 헤더에 포함
		contentType : "application/json; charset=UTF-8",
		//timeout: 300000,
		beforeSend : function(jqXHR, settings) {
			jqXHR.setRequestHeader("AJAX","true");
			jqXHR.setRequestHeader("SERVICE_ID",CONST.PROG_CD);
			jqXHR.setRequestHeader("LOG_TYPE",options.pSvcFlag);
			
			gfn_openLoadingImage({pLoad : options.pLoad}); // 로딩이미지 노출
		},
		xhrFields : {
			withCredentials : options.withCredential != null && options.withCredential == true ? true : false
		},
		complete : function(jqXHR, textStatus) {
			gfn_closeLoadingImage(); // 로딩이미지 닫기

			// 서버에서 에러 발생시 HtmlErrorHandlingFilter에서 SVC_ERR_DETAIL에 에러메세지를 담는데,
			// 이 에러메세지에 JSON parsing이 불가능한 문자가 들어 있을 경우 JSON.parse()에서 에러가 발생하고
			// 200 에러와 함께 이후 콜백이 수행되지 않는 문제 때문에 try ~ catch로 감싸주고, catch절에서 빈
			// 메세지를 셋팅함.
			var returnData;
			try {
				if (jqXHR.responseJSON) {
					returnData = jqXHR.responseJSON;
				} else {
					returnData = JSON.parse(jqXHR.responseText);
				}

				gfn_setAuiGridResData(returnData,options.resGrid);
			} catch (e) {

				returnData = {};
				if ( jqXHR.status == '403' || jqXHR.status == '401') {
					returnData[ERROR_CODE] = -10;
					returnData[ERROR_MESSAGE_CODE] = '-10';
					returnData[ERROR_MESSAGE_TEXT] = '';
				} else if ( jqXHR.statusText.toUpperCase().indexOf("TIMEOUT") != -1){
					
					
					returnData[ERROR_CODE] = -9;
					returnData[ERROR_MESSAGE_CODE] = '-9';
					returnData[ERROR_MESSAGE_TEXT] = jqXHR.statusText + ' 연결시간이 초과 되었습니다.';
				} else {
					//console.log("error message : " + e.message);
					returnData[ERROR_CODE] = -1;
					returnData[ERROR_MESSAGE_CODE] = '-1';
					returnData[ERROR_MESSAGE_TEXT] = '';
				}
			}

			// ajax 응답객체로부터 수행결과코드 및 출력해 주어야할 메세지를 선별하여 리턴.
			var retMsg = gfn_getReturnMsg(returnData);

			if (returnData[ERROR_CODE] == ERR_CD_NO_AUTH) {
				// 세션이 만료 되었을때 쿠키 저장
				if(! gfn_isNull(CONST.PROG_CD)) {
					Cookies.set("hslim-session-prog", CONST.PROG_CD, { expires: 1 })					
				}
	  			
	  			// 사용자정의 콜백 실행
				if ($.isFunction(options.pCall)) { // 사용자정의 에러처리를 해야 할 수도 있기 때문에 수정함
					options.pCall(options.svcId, returnData, retMsg.errCd, retMsg.msgTp, retMsg.msgCd, retMsg.msgText);
				}

				setTimeout( function() {
					gfn_goSessionExpiredPage({alert:true});
				}, 50);

				return;
			}
			
			let pAlertMsg = gfn_isNull(options.pAlertMsg) ? true : options.pAlertMsg;			
			if(pAlertMsg) {
				gfn_outMessage(retMsg);
			}
			// 사용자정의 콜백 실행
			if ($.isFunction(options.pCall)) { // 사용자정의 에러처리를 해야 할 수도 있기 때문에 수정함
				options.pCall(options.svcId, returnData, retMsg.errCd, retMsg.msgTp, retMsg.msgCd, retMsg.msgText);
			} 
		}
	});
}

function gfn_gridDateFormatString(strFormat) {
	if (this.gfn_isNull(strFormat))	return "";

	var date = new Date();
	var fY = String(date.getFullYear());
	var fY2 = fY.substr(fY.length-2, 2);

	strFormat = strFormat.toString();
	strFormat = strFormat.split("%Y").join(String(date.getFullYear()));
	strFormat = strFormat.split("%y").join(fY2);
	strFormat = strFormat.split("%m").join(String(date.getMonth() + 1).lpad(2, "0"));
	strFormat = strFormat.split("%d").join(String(date.getDate()).lpad(2, "0"));
	strFormat = strFormat.split("%H").join(String(date.getHours()).lpad(2, "0"));
	strFormat = strFormat.split("%M").join(String(date.getMinutes()).lpad(2, "0"));
	strFormat = strFormat.split("%S").join(String(date.getSeconds()).lpad(2, "0"));

	return strFormat;
}

/*배열 ARR*/
function gfn_getMergedArray(){
	var ret=[];

	for(var i=0; i < arguments.length; i++){
		var ret = $.merge(ret,arguments[i]);
	}
	
	return ret;
}

function gfn_addCommas(nStr, groupSeparator, radixPoint) {
	if (gfn_toNum(nStr) == 0) return 0;

	nStr += '';
	if (gfn_isNull(groupSeparator)) groupSeparator = ',';
	if (gfn_isNull(radixPoint)) radixPoint = '.';
	x = nStr.split(radixPoint);
	x1 = x[0];
	x2 = x.length > 1 ? radixPoint + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + groupSeparator + '$2');
	}
	return x1 + x2;
}

/**
 * json array에서 특정 컬럼값을 검색하여 검색된 행을 배열로 리턴 (keys의 item갯수는 총 3개까지만 가능)
 * @param data (json array) : 검색할 데이터
 * @param keys (String or Array) : 컬럼명
 * @param vals (String or Array) : 검색할 값
 */
function gfn_grepData(data, keys, vals) {
    if (gfn_isNull(data)) return [];
    var ret;

    if ($.isArray(keys)) {
    	if (keys.length == 1) {
	    	ret = $.grep(data, function(item, z) {
    			return gfn_toStr(item[keys[0]]) == gfn_toStr(vals[0]);
	        });
    	}
    	else if (keys.length == 2) {
	    	ret = $.grep(data, function(item, z) {
    			return gfn_toStr(item[keys[0]]) == gfn_toStr(vals[0])
    				&& gfn_toStr(item[keys[1]]) == gfn_toStr(vals[1]);
	        });
    	}
    	else if (keys.length == 3) {
	    	ret = $.grep(data, function(item, z) {
	    		return gfn_toStr(item[keys[0]]) == gfn_toStr(vals[0])
					&& gfn_toStr(item[keys[1]]) == gfn_toStr(vals[1])
					&& gfn_toStr(item[keys[2]]) == gfn_toStr(vals[2]);
	        });
    	}
    	else if (keys.length == 4) {
	    	ret = $.grep(data, function(item, z) {
	    		return gfn_toStr(item[keys[0]]) == gfn_toStr(vals[0])
					&& gfn_toStr(item[keys[1]]) == gfn_toStr(vals[1])
					&& gfn_toStr(item[keys[2]]) == gfn_toStr(vals[2])
					&& gfn_toStr(item[keys[3]]) == gfn_toStr(vals[3]);
	        });
    	}
    	else if (keys.length == 5) {
	    	ret = $.grep(data, function(item, z) {
	    		return gfn_toStr(item[keys[0]]) == gfn_toStr(vals[0])
					&& gfn_toStr(item[keys[1]]) == gfn_toStr(vals[1])
					&& gfn_toStr(item[keys[2]]) == gfn_toStr(vals[2])
					&& gfn_toStr(item[keys[3]]) == gfn_toStr(vals[3])
					&& gfn_toStr(item[keys[4]]) == gfn_toStr(vals[4]);
	        });
    	}
    }
    else {
    	ret = $.grep(data, function(item, z) {
            return gfn_toStr(item[keys]) == gfn_toStr(vals);
        });
    }

    return ret;
 }

  /**
   * 달력 호출
   * @param   id ( input Box), gubun
   * @returns jsonObject
   */
	function gfn_cmmnGridCal(event){
		CalendarUtil.openGridCalendar(event);
	   
	}

var _myExpToXlsxWcbnm = {
	//	엑셀 다운로드용 템플릿 그리드를 생성할 영역(DIV) ID
	divGrdExpToXlsxWcbnmTmp	: 'divGrdExpToXlsxWcbnmTmp',

	//	엑셀 다운로드용 템플릿 그리드 생성
	grdExpToXlsxWcbnmTmp	: null,

	//	템플릿 그리드 생성 및 엑셀 다운로드
	fn_export				: function ( grdObj, exportProps ) {
		const $this = fn_getMyExpToXlsxWcbnm();
		const dataFieldInfo = $this.fn_getDataFieldInfo( grdObj.getColumnLayout() );
		const colModel  = dataFieldInfo.colModel;
		const comboInfo = dataFieldInfo.comboInfo;

		//	Grid Data (전체)
		//	DropDownListRenderer 가 적용된 컬럼 값을, 코드에서 valueField 값으로 변경
		const grdData = $this.fn_getConvertedData( grdObj.getGridData(), comboInfo );
		const props = grdObj.opts;
		const pid = grdObj.pid.substring(1);	//	앞에 '#' 제거
		const footerLayout = grdObj.getFooterLayout();
		const grdOptions = {
			pid,
			colModel, 
			props, 
			footerLayout, 
		};

		//	엑셀 다운로드용 템플릿 그리드 생성
		$this.grdExpToXlsxWcbnmTmp = $this.fn_createTemplateGrid( grdOptions );
		$this.grdExpToXlsxWcbnmTmp.clearGridData();

		//	데이터 바인드
		gfn_setAuiGridResData( $this.fn_fakeAuiGridResData( 'ds_grdExpToXlsxWcbnmTmp', grdData ) , 'fn_getMyExpToXlsxWcbnm().grdExpToXlsxWcbnmTmp=ds_grdExpToXlsxWcbnmTmp' );
		exportProps.exportWithStyle = true;
		$this.grdExpToXlsxWcbnmTmp._exportToXlsx(exportProps );
	},

	//	DropDownListRenderer 가 적용된 컬럼 값을, 코드에서 valueField 값으로 변경
	fn_getConvertedData		: function ( grdDataList, comboInfo ) {
		const list = _.cloneDeep( grdDataList );
		if ( comboInfo.length > 0 ) {
			//	DropDownListRenderer 가 적용된 컬럼 값을, 코드에서 valueField 값으로 변경
			list.forEach( row => {
				comboInfo.forEach( item => {
					const key = Object.keys(item);	//	리스트이지만, 1건
					row[key[0]] = item[key[0]][row[key[0]]];
				} );
			} );
		}
		return list;
	},

	//	엑셀 다운로드용 템플릿 그리드 생성
	//	
	fn_createTemplateGrid	: function ( grdOptions ) {
		const $this = fn_getMyExpToXlsxWcbnm();
		const grdObj = new gfn_gridUtil();

		//	엑셀 다운로드용 템플릿 그리드 영역(DIV) 생성
		const grdTmpId = $this.fn_createDivElement( grdOptions.pid );

		if ( grdObj.isCreated() ) {
			grdObj.destroy();
		}

		grdObj.create( `#${grdTmpId}`, grdOptions.colModel, grdOptions.props );		//	그리드 생성

		if ( grdOptions.footerLayout.length > 0 ) {
			grdObj.setFooter( grdOptions.footerLayout );
		}

		return grdObj;
	},


	//	List 를 JSON 으로...
	//	ex) [ { keyField: 'keyField1', valueField: 'valueField1', ... } ... ]
	//	    => { 'keyField1' : 'valueField1' , 'keyField2': 'valueField2' , ... }
	fn_getComboItemObj		: function ( list, keyField, valueField ) {
		const obj = {};
		list.forEach( item => {
			obj[item[keyField]] = item[valueField];
		} );
		return obj;
	},

	//	DropDownListRenderer 가 적용된, 컬럼ID(dataField) 정보 리턴
	fn_getComboInfo		: function ( item ) {
		const $this = fn_getMyExpToXlsxWcbnm();
		const obj  = {};
		const cols = _.cloneDeep( item );
		if ( item.renderer && item.renderer.type == 'DropDownListRenderer' ) {
			obj[ item.dataField ] = $this.fn_getComboItemObj( item.renderer.list     , item.renderer.keyField    , item.renderer.valueField     );
			delete cols.renderer;
		} else if ( item.editRenderer && item.editRenderer.type == 'DropDownListRenderer' ) {
			obj[ item.dataField ] = $this.fn_getComboItemObj( item.editRenderer.list , item.editRenderer.keyField, item.editRenderer.valueField );
			delete cols.editRenderer;
		}
		return { obj, cols };
	},

	//	그리드에 표시 되지 않는 컬럼을 제외한, 컬럼 Layout 과, 
	//	DropDownListRenderer 가 적용된, 컬럼ID(dataField) 정보 리턴
	//	comboInfo 는 콤보 목록을 JSON 형태로 변환해서 연결한 목록
	//	ex) [ { 'dataField1' : { 'keyField1' : 'valueField1' , 'keyField2': 'valueField2' , ... } , 'dataField2' : { ... } , ... ]
	fn_getDataFieldInfo	: function ( columnLayout ) {
		const $this = fn_getMyExpToXlsxWcbnm();
		const colModel  = []
		const comboInfo = [];
		columnLayout.forEach( item => {
			if ( item.children && item.children.length > 0 ) {
				const result = $this.fn_getDataFieldInfo( item.children );
				if ( result.colModel.length > 0 ) {
					item.children = result.colModel;
					colModel.push( item );
					comboInfo.push( ... result.comboInfo );
				}
			} else {
				if ( gfn_isNull( item.visible ) || ( item.visible !== false ) ) {

					//	align 처리
					//	그리드 create 시, align 은 사라지고, style 로 변경됨.
					//	이정보로 그리드를 create 할 경우, 화면에서는 정상으로 보이지만
					//	엑셀 다운로드시, 모든 컬럼이 중앙 정렬이 되는 문제가 발생 함
					if ( item.style && item.style.indexOf( 'aui-grid-align' ) > -1 ) {
						const styles = item.style.split( ' ' );
						const align  = styles.filter( style => style.startsWith( 'aui-grid-align-' ) )	//	아마도 1건...
											.map( style => style.split('-')[3] )
										;
						item.align = align[0];	//	align 속성 설정
						delete item.style;		//	스타일은 삭제
					}

					if (   ( item.renderer     && item.renderer.type     == 'DropDownListRenderer' ) 
						|| ( item.editRenderer && item.editRenderer.type == 'DropDownListRenderer' )
					) {
						const info = $this.fn_getComboInfo( item );
						comboInfo.push( info.obj )
						colModel.push( info.cols );
					} else {
						colModel.push( item ); 
					}
				}
			}
		} );
		return { colModel , comboInfo };
	},

	/**
	 *	dataList 를 gfn_setAuiGridResData() 함수를 를 사용하여, 
	 *	그리드의 데이터로 적용 시키기 위해
	 *	gfn_auiTransaction() 으로 조회한것 처럼 생성
	 *	
	 *	@param dsName
	 *	@param dataList 리스트(Array) 형태의 데이터
	 *	@return { daName : { data: dataList , deletedData: null } }
	 */
	fn_fakeAuiGridResData	: function ( dsName, dataList ) {
		const resData = {}
		resData[dsName] = { 
				'data'        : _.cloneDeep( dataList ), 
				'deletedData' : null 
			}
		return resData;
	},

	/**
	 *	ID 로 DIV 엘리먼트 검색하고 
	 *	없을 경우, 동적으로 생성 한 후 리턴
	 *	
	 *	@param  pid 검색할 DIV element 의 ID
	 *	@return     DIV element
	 */
	fn_createDivElement	: function ( pid ) {
		const grdId = `${pid}ExpTmp`;
		const tableWrappper = document.getElementById( pid );
		const divGrd = document.createElement( 'DIV' );
		divGrd.id           = grdId;
		divGrd.style.height = 0;
		divGrd.style.width  = 0;
		tableWrappper.parentElement.appendChild( divGrd );
		return grdId;
	},

}	//	End of 

function fn_getMyExpToXlsxWcbnm() {
	return _myExpToXlsxWcbnm;
}
