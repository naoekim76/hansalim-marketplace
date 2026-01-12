# AUIGrid Events Documentation

This document lists the events dispatched by AUIGrid.
---

## addColumn

**Type**: Event
**Version**: 3.0

This event occurs when a column is added using `addColumn()`.
The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `columnIndex`: Index of the added column
*   `dataFields`: KeyFields of the data being output by the added columns (Array)
How to handle this event:
```javascript
AUIGrid.bind(myGridID, "addColumn", function( event ) {
    console.log(event.type + " 이벤트, 삽입된 열 개수 : " + event.dataFields.length);
});
```


---

## addRow

**Type**: Event
**Version**: 2.7

This event occurs when a row is added (inserted) by the user using the Insert key, Ctrl+Insert key, or `addRow()`, `addRow()`, `addTreeRow()`.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `items`: Added row items (Array)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "addRow", function( event ) {
    console.log(event.type + " 이벤트, 삽입된 행 개수 : " + event.items.length);
});
```


---

## addRowFinish

**Type**: Event
**Version**: 2.7

This event occurs when a row is added (inserted) by the user using the Insert key, Ctrl+Insert key, or `addRow()`, `addTreeRow()`.

The difference between `addRowFinish` and `addRow` events is as follows:
*   `addRow`: When a row is added, the grid selects the added row, which triggers a `selectionChange` event. The `addRow` event occurs before the `selectionChange` event.
*   `addRowFinish`: When a row is added, the grid selects the added row, which triggers a `selectionChange` event. The `addRowFinish` event occurs after the `selectionChange` event.

In other words, if you want to do something after the new row is selected, bind the `addRowFinish` event.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `items`: Added row items (Array)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "addRowFinish", function( event ) {
    console.log(event.type + " 이벤트, 삽입된 행 개수 : " + event.items.length);
});
```


---

## addTreeColumn

**Type**: Event
**Version**: 3.0

This event occurs when a column is added as a child of a specific column using `addTreeColumn()`.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `columnIndex`: Index of the added column
*   `index`: Child index of the added column relative to its parent
*   `dataFields`: KeyFields of the data being output by the added columns (Array)
*   `parentDataField`: `dataField` of the parent of the added column

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "addTreeColumn", function( event ) {
    console.log(event.type + " 이벤트, 삽입된 열 개수 : " + event.dataFields.length + ", 부모 dataField : " + event.parentDataField);
});
```


---

## beforeInsertRow

**Type**: Event
**Version**: 2.7

When the grid is editable (`editable=true`), a new row is inserted upon key input such as Insert or Ctrl+Insert.

This event occurs before insertion to determine the initial values of the new row.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `columnInfoList`: Array containing column output information (Array)
*   `isClipboard`: Whether a new row was added due to pasting (Boolean) (v3.0.4 support)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "beforeInsertRow", function(event) {
    const newRow = {};
    const cols = event.columnInfoList;
    for(let i=0, len=cols.length; i<len; i++) {
        const dataField = cols[i]["dataField"];
        if(dataField === "name") {
            newRow[dataField] = "< New Task >";
        } else {
            newRow[dataField] = "";
        }
    }
    return newRow;
});
```

**Return**: (Object) If an Object containing the initial values of the new row item is returned, it will be applied. If not returned, an empty row will be output.

**Note**: This event does not occur when adding rows with `addRow()` or `addTreeRow()`. It only occurs due to user keyboard interface (Insert, Ctrl + Insert).

---

## beforeRemoveColumn

**Type**: Event
**Version**: 3.0

This event occurs before a column is deleted using `removeColumn()`.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `columnIndexes`: Bundle of indexes of columns to be deleted (Array)
*   `dataFields`: Bundle of `dataField`s of columns to be deleted (Array)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "beforeRemoveColumn", function( event ) {
    console.log(event.type + " 이벤트, 삭제될 열 개수 : " + event.dataFields.length);
    //return false; // 반환을 false 로 처리하면 삭제 실행을 취소함.
});
```

**Return**: (Boolean) If `false` is returned, the deletion process is not performed. Therefore, you can go through a confirmation step before actual deletion.

---

## beforeRemoveRow

**Type**: Event
**Version**: 2.7

This event occurs before a row is deleted by the user using Ctrl + Del key, `removeRow()`, or `removeRowByRowId()` method.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `softRemoveRowMode`: Whether soft removal mode is used, i.e., whether the row will actually be deleted from the grid or just marked.
*   `items`: Row items to be deleted (Array)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "beforeRemoveRow", function( event ) {
    console.log(event.type + " 이벤트, 삭제될 행 개수 : " + event.items.length + ", softRemoveRowMode : " + event.softRemoveRowMode);
    //return false; // 반환을 false 로 처리하면 삭제 실행을 취소함.
});
```


**Return**: (Boolean) If `false` is returned, the deletion process is not performed. Therefore, you can go through a confirmation step before actual deletion.

---

## beforeRemoveSoftRows

**Type**: Event
**Version**: 2.7

When `softRemoveRowMode = true` is used and the user deletes a row, the deleted row is marked.

This event occurs before the actual deletion when `AUIGrid.removeSoftRows()` method is called to actually delete these marked rows from the grid.

This event does not occur if `softRemoveRowMode` is set to `false`.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `items`: Row items to be deleted (Array)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "beforeRemoveSoftRows", function( event ) {
    console.log(event.type + " 이벤트, 삭제될 행 개수 : " + event.items.length);
});
```


**Return**: (Boolean) If `false` is returned, the deletion process is not performed. Therefore, you can go through a confirmation step before actual deletion.

---

## cellClick

**Type**: Event
**Version**: 3.0.2.4

This event occurs when a single cell is clicked.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `rowIndex`: Row index
*   `columnIndex`: Column index
*   `dataField`: KeyField of the data being output by the current column in the row item
*   `editable`: Whether the cell is editable
*   `value`: Value displayed in the cell
*   `rowIdValue`: Value for the key specified by `rowIdField`, i.e., the unique value of the row (requires `rowIdField` to be set in advance)
*   `headerText`: Header text of the current column
*   `item`: Row item object being output in that row (Object)
*   `treeIcon`: Whether the open/close button of the tree grid was clicked (Boolean) if it's a tree grid
*   `orgEvent`: Original JavaScript event object (Object)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "cellClick", function( event ) {
    console.log("rowIndex : " + event.rowIndex + ", columnIndex : " + event.columnIndex + " clicked");
});
```


---

## cellDoubleClick

**Type**: Event
**Version**: 2.7

This event occurs when a single cell is double-clicked.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `rowIndex`: Row index
*   `columnIndex`: Column index
*   `editable`: Whether the cell is editable
*   `value`: Value displayed in the cell
*   `rowIdValue`: Value for the key specified by `rowIdField`, i.e., the unique value of the row (requires `rowIdField` to be set in advance)
*   `headerText`: Header text of the current column
*   `item`: Row item object being output in that row (Object)
*   `dataField`: KeyField of the data being output by the current column in the row item
*   `orgEvent`: Original JavaScript event object (Object)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "cellDoubleClick", function( event ) {
    console.log("rowIndex : " + event.rowIndex + ", columnIndex : " + event.columnIndex + " dbl clicked");
});
```


---

## cellEditBegin

**Type**: Event
**Version**: 2.7

This event occurs when cell editing (modification) begins in edit/modify mode.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `rowIndex`: Row index
*   `columnIndex`: Column index
*   `value`: Current cell value of the original data
*   `headerText`: Header text of the current column
*   `item`: Row item object being output in that row (Object)
*   `dataField`: KeyField of the data being output by the current column in the row item
*   `position`: Global coordinate (relative to Body) or local coordinate (relative to grid parent) position of the cell (`x` coordinate: `event.position.x`, `y` coordinate: `event.position.y`, local `x` coordinate: `event.position.localX`, local `y` coordinate: `event.position.localY`)
*   `size`: Width and height of the cell (`width`: `event.size.width`, `height`: `event.size.height`)
*   `isClipboard`: Whether the event occurred due to pasting (Ctrl+V) (Boolean)
*   `which`: Information about how editing was started (String or Number)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "cellEditBegin", function( event ) {
    console.log("rowIndex : " + event.rowIndex + ", columnIndex : " + event.columnIndex + " cellEditBegin");
    // return false; // false, true 반환으로 동적으로 수정, 편집 제어 가능
});
```

**Return**: (Boolean) If `false` is returned, editing and modification are prevented.

---

## cellEditCancel

**Type**: Event
**Version**: 2.7

This event occurs when cell editing (modification) is canceled in edit/modify mode.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `rowIndex`: Row index
*   `columnIndex`: Column index
*   `value`: Current cell value of the original data
*   `headerText`: Header text of the current column
*   `item`: Row item object being output in that row (Object)
*   `dataField`: KeyField of the data being output by the current column in the row item
*   `isClipboard`: Whether the event occurred due to pasting (Ctrl+V) (Boolean)
*   `which`: Information about how editing was canceled (String or Number)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "cellEditCancel", function( event ) {
    console.log("rowIndex : " + event.rowIndex + ", columnIndex : " + event.columnIndex + " cellEditCancel");
});
```


---

## cellEditEnd

**Type**: Event
**Version**: 2.7

This event occurs when cell editing (modification) ends in edit/modify mode.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `rowIndex`: Row index
*   `columnIndex`: Column index
*   `oldValue`: Cell value before change
*   `value`: Changed cell value
*   `headerText`: Header text of the current column
*   `item`: Row item object being output in that row (Object)
*   `dataField`: KeyField of the data being output by the current column in the row item
*   `isClipboard`: Whether the event occurred due to pasting (Ctrl+V) (Boolean)
*   `which`: Information about how editing was completed (String or Number)
*   `mergeStartIndex`: Start index of merged cells when the entire merged cell is applied for modification (Number)
*   `mergeEndIndex`: End index of merged cells when the entire merged cell is applied for modification (Number)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "cellEditEnd", function( event ) {
    console.log("rowIndex : " + event.rowIndex + ", columnIndex : " + event.columnIndex + " cellEditEnd");
});
```


---

## cellEditEndBefore

**Type**: Event
**Version**: 2.7

This event occurs immediately before cell editing (modification) ends in edit/modify mode.

The return value of this event handler will be applied as the final modified value.

This means the developer can finally judge the value entered by the user. Check the value in this event handler.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `rowIndex`: Row index
*   `columnIndex`: Column index
*   `oldValue`: Cell value before change
*   `value`: Changed cell value
*   `headerText`: Header text of the current column
*   `item`: Row item object being output in that row (Object)
*   `dataField`: KeyField of the data being output by the current column in the row item
*   `isClipboard`: Whether the event occurred due to pasting (Ctrl+V) (Boolean)
*   `which`: Information about how editing was completed (String or Number)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "cellEditEndBefore", function( event ) {
    return removeComma(event.value); // Remove commas from user input and apply
});
```


**Return**: (String) The final value to be applied for modification. The return value of this handler must be specified. This return value is the final modified value.

---

## cellLongTap

**Type**: Event
**Version**: 3.0.2

This event occurs when a single cell is long-tapped on touch devices.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `rowIndex`: Row index
*   `columnIndex`: Column index
*   `value`: Value displayed in the cell
*   `headerText`: Header text of the current column
*   `item`: Row item object being output in that row (Object)
*   `dataField`: KeyField of the data being output by the current column in the row item
*   `orgEvent`: Original JavaScript event object (Object)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "cellLongTap", function( event ) {
    console.log("rowIndex : " + event.rowIndex + ", columnIndex : " + event.columnIndex + " longTapped");
});
```


---

## columnStateChange

**Type**: Event
**Version**: 2.7

This event occurs when the user changes the position or size of a grid column by dragging.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `property`: Property of the changed column (`columnIndex` or `width`) (String)
*   `dataField`: `dataField` value of the applied column (String)
*   `headerText`: Header text of the applied column (String)
*   `depth`: Depth of the applied column (valid for hierarchical types) (Number)
*   `isBranch`: Whether the applied column is a branch column (valid for hierarchical types) (Boolean)
*   `old`: Value before change (Object)
*   `current`: New value changed by the user (current value) (Object)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "columnStateChange", function(event) {
    let str = "event type : " + event.type;
    str += ", dataField : " + event.dataField;
    str += ", prop : " + event.property;
    str += ", old : " + event.old + ", current : " + event.current;
    console.log(str);
});
```


---

## contextMenu

**Type**: Event
**Version**: 3.0.8

This event occurs when the right mouse button, i.e., the context menu, is activated in the grid.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `target`: Indicates whether it occurred in the header or body
*   `dataField`: `dataField` name of the column at the point where the context was activated (String)
*   `headerText`: Header text of the column at the point where the context was activated (String)
*   `columnIndex`: Column index at the point where the context was activated (Number)
*   `rowIndex`: Row index at the point where the body context was activated (valid only if `target` value is "body") (Number)
*   `depth`: Header grouping depth value at the point where the header context was activated (valid only if `target` value is "header") (Number)
*   `item`: Row item object being output in that row (Object)
*   `pageX`: Global X coordinate value at the point where the context was activated (Number)
*   `pageY`: Global Y coordinate value at the point where the context was activated (Number)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "contextMenu", function( event ) {
    console.log("이벤트명: " + event.type + ", 컨텍스트 활성화 된 곳 : " + event.target);
});
```


**Return**: (Boolean or Array) If `false` is returned, the default behavior of displaying the basic context menu is not performed. If it occurred in the body, returning a user-defined context menu as an Array will configure a dynamic context menu.

---

## copyBegin

**Type**: Event
**Version**: 3.0.8

This event occurs when copying starts (Ctrl + C) in the grid.

The user can parse and apply it directly without relying on the grid.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `data`: Value to be copied to the clipboard (String)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "copyBegin", function(event) {
    console.log("복사 시작!!");
    console.log(event.data);
    const rows = event.data.split("\r\n"); // Separate rows by carriage return
    console.log(rows); // The value copied to the clipboard consists of 2 rows: 1st row-"a,b,c", 2nd row-"1,2,3"
    // Write clipboard data as TSV.
    return "a\tb\tc\r\n1\t2\t3"; // The returned value is copied to the clipboard.
});
```


**Return**: (Boolean or String) If `false` is returned, the default copy behavior is not performed. Also, if a string consisting of TSV data with rows separated by carriage returns (`\r\n`) is returned, that value will be applied to the clipboard.

---

## copyEnd

**Type**: Event
**Version**: 3.0.8

This event occurs when the value has been successfully copied to the system clipboard after copying (Ctrl + C) in the grid.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `data`: Value copied to the clipboard (String)

---

## dragBegin

**Type**: Event
**Version**: 3.0.4

This event occurs when row dragging begins.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `rowIndex`: Starting row index of dragging
*   `items`: Row items being dragged (Array)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "dragBegin", function( event ) {
    if(event.rowIndex === 0) { // Prevent dragging of the 0th row
        return false;
    }
});
```


**Return**: (Boolean or String) If `false` is returned, the default row dragging behavior is not performed. If a String is returned, that String will be displayed as the dragging text.

---

## dropCancel

**Type**: Event
**Version**: 3.0.4

This event occurs when a row drag-and-drop operation fails, i.e., the drop is unsuccessful.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `pidToDrop`: Parent DIV ID of the grid where the drop is occurring
*   `fromRowIndex`: Row index at the point where dragging started
*   `toRowIndex`: Row index at the point where the drop is occurring in the target grid
*   `direction`: `true` if the row index at the drop point increased from the dragging point (Boolean)
*   `items`: Row items being dragged and to be dropped (Array)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "dropCancel", function(event ) {
    console.log(event.pidToDrop + " 그리드에 " + event.items.length + " 행(들)을 드랍하는데 실패하였습니다.");
});
```

---

## dropEnd

**Type**: Event
**Version**: 3.0.4

This event occurs at the end of a row drag-and-drop operation.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `pidToDrop`: Parent DIV ID of the grid where the drop is occurring
*   `fromRowIndex`: Row index at the point where dragging started
*   `toRowIndex`: Row index at the point where the drop is occurring in the target grid
*   `dropColumnIndex`: Column index at the point where the drop is occurring in the target grid
*   `direction`: `true` if the row index at the drop point increased from the dragging point (Boolean)
*   `items`: Row items being dragged and to be dropped (Array)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "dropEnd", function(event ) {
    console.log(event.pidToDrop + " 그리드에 " + event.items.length + " 행(들)을 드랍 완료하였습니다.");
});
```


---

## dropEndBefore

**Type**: Event
**Version**: 3.0.4

This event occurs immediately before a row drag-and-drop operation ends.

In this event handler, you can determine whether the drop action is "move" or "copy".

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `pidToDrop`: Parent DIV ID of the grid where the drop is occurring
*   `fromRowIndex`: Row index at the point where dragging started
*   `toRowIndex`: Row index at the point where the drop is occurring in the target grid
*   `dropColumnIndex`: Column index at the point where the drop is occurring in the target grid
*   `direction`: `true` if the row index at the drop point increased from the dragging point (Boolean)
*   `items`: Row items being dragged and to be dropped (Array)
*   `isMoveMode`: Property to determine if the drop action is move or copy (Boolean)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "dropEndBefore", function( event ) {
    // Setting the event's isMoveMode property to false will perform row copying.
    event.isMoveMode = false;
    if(confirm("드랍하시겠습니까?")) {
        return true;
    }
    return false; // Do not perform default action.
});
```


**Return**: (Boolean) If `false` is returned, the default row drop behavior is not performed.

---

## filtering

**Type**: Event
**Version**: 2.7

This event occurs when the user sets, changes, or clears filtering.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `filterCache`: Currently set filtering information (Object)

If filtering is set to display only "Anna" and "Lawrence" in the `name` field, `filterCache` will contain the following information:
```json
{
    "name" : [ "Anna", "Lawrence" ]
}
```


How to handle this event:
```javascript
AUIGrid.bind(myGridID, "filtering", function( event ) {
    for(let n in event.filterCache) {
        console.log( event.filterCache[n] );
    }
});
```


---

## footerClick

**Type**: Event
**Version**: 2.7

This event occurs when the grid footer is clicked.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `footerIndex`: Footer column index
*   `footerText`: Footer text
*   `footerValue`: Footer value before formatting
*   `pageX`: Global X coordinate value at the point where the click occurred
*   `pageY`: Global Y coordinate value at the point where the click occurred
*   `orgEvent`: Original JavaScript event object (Object)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "footerClick", function( event ) {
    console.log(event.type + " : " + event.footerIndex + " text : " + event.footerText);
});
```


---

## footerDoubleClick

**Type**: Event
**Version**: 2.7

This event occurs when the grid footer is double-clicked.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `footerIndex`: Footer column index
*   `footerText`: Footer text
*   `footerValue`: Footer value before formatting
*   `pageX`: Global X coordinate value at the point where the double-click occurred
*   `pageY`: Global Y coordinate value at the point where the double-click occurred
*   `orgEvent`: Original JavaScript event object (Object)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "footerDoubleClick", function( event ) {
    console.log(event.type + " : " + event.footerIndex + " text : " + event.footerText);
});
```


---

## grouping

**Type**: Event
**Version**: 2.7

This event occurs when the user sets, changes, or clears grouping.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `groupingFields`: Currently grouped fields (Array)
*   `groupingSummary`: Summary object applied if grouping summary is set (Object)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "grouping", function( event ) {
    console.log("이벤트명: " + event.type + ", 현재 그룹핑 필드들 : " + event.groupingFields.join(", ") );
});
```


---

## headerClick

**Type**: Event
**Version**: 2.7

This event occurs when the grid header is clicked.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `columnIndex`: Header column index
*   `headerText`: Header text
*   `depth`: Depth of the header, i.e., if headers are defined as grouping, the top level is 1 depth (depth is 1 for single hierarchy)
*   `item`: Column item object defined in the column layout (Object)
*   `dataField`: KeyField of the data being output by the current column
*   `pageX`: Global X coordinate value at the point where the click occurred
*   `pageY`: Global Y coordinate value at the point where the click occurred
*   `orgEvent`: Original JavaScript event object (Object)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "headerClick", function( event ) {
    console.log(event.type + " : " + event.headerText + ", dataField : " + event.dataField + ", index : " + event.columnIndex + ", depth : " + event.item.depth);
    // If false is returned in the event handling function, the default action is not performed.
    // The default action of headerClick is sorting.
    // return false; // Do not perform sorting.
});
```


**Return**: (Boolean) If `false` is returned, the default sorting behavior is not performed.

---

## hScrollChange

**Type**: Event
**Version**: 2.7

This event occurs when the value of the horizontal scroll (horizontal scroll) changes, if the grid has a horizontal scroll.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `position`: Current scroll position (Number)
*   `oldPosition`: Scroll position before change (Number)
*   `minPosition`: Maximum position of vertical scroll (Number)
*   `maxPosition`: Minimum position of vertical scroll (Number)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "hScrollChange", function( event ) {
    console.log( event.type + ", position : " + event.position + ", (min : " + event.minPosition + ", max : " + event.maxPosition + ")" );
});
```


**Note**: If excessive work is done in this event handler, grid scrolling performance will degrade.

---

## indent

**Type**: Event
**Version**: 3.0.12

This event occurs when the user increases the row depth (Indent) using Alt + Shift + Right Arrow keys or the `indentTreeDepth` method.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `items`: Row items to which row depth was actually applied (Array)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "indent", function( event ) {
    console.log(event.type + " 이벤트, 적용된 행 개수 : " + event.items.length);
});
```


---

## keyDown

**Type**: Event
**Version**: 2.7

This is a `keyDown` event that occurs when a key is pressed in the grid.

Certain keys in the grid perform pre-assigned actions (e.g., arrow keys - move selection, Insert key - insert row).

This event can prevent these predefined actions and execute user-desired code.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `keyCode`: Key code number of the pressed key (Number)
*   `ctrlKey`: Whether the Ctrl key was pressed together (Boolean)
*   `shiftKey`: Whether the Shift key was pressed together (Boolean)
*   `orgEvent`: Original JavaScript event object (Object)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "keyDown", function(event) {
    if(event.keyCode === 13) { // Enter key
        console.log("엔터 키 누름");
        return false; // Do not move selection down (i.e., do not perform default action)
    }
    return true;
});
```


**Return**: (Boolean) If `false` is returned, the pre-assigned action in the grid is not performed.

**Reference**: This event can be used to change default shortcuts or add new shortcuts to the grid.

---

## notFound

**Type**: Event
**Version**: 2.7

This event occurs when the user searches for a specific string in the grid and the string is not found.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `term`: String the user was trying to find (String)
*   `wrapFound`: If `wrapSearch` was performed and the same row was found after wrapping around. That is, `true` if there is only one row corresponding to the string.

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "notFound", function( event ) {
    console.log('다음 문자열을 찾을 수 없습니다 - "' + event.term + '"');
});
```


---

## outdent

**Type**: Event
**Version**: 3.0.12

This event occurs when the user decreases the row depth (Outdent) using Alt + Shift + Left Arrow keys or the `outdentTreeDepth` method.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `items`: Row items to which row depth was actually applied (Array)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "outdent", function( event ) {
    console.log(event.type + " 이벤트, 적용된 행 개수 : " + event.items.length);
});
```


---

## pageChange

**Type**: Event
**Version**: 2.11

This event occurs when paging changes if paging is used (`usePaging=true`).

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `currentPage`: Current page number (Number)
*   `oldPage`: Page number before change (Number)
*   `totalPageCount`: Total number of pages (Number)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "pageChange", function(event) {
    console.log("eventType : " + event.type + ", currentPage : " + event.currentPage + ", oldPage : " + event.oldPage);
});
```


---

## pageRowCountChange

**Type**: Event
**Version**: 3.0.5

This event occurs when the number of rows displayed per page changes if paging is used.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `rowCount`: Current number of rows displayed per page (Number)
*   `oldRowCount`: Previous number of rows displayed per page (Number)
*   `totalPageCount`: Total number of pages (Number)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "pageRowCountChange", function(event ) {
    console.log("페이지 행 개수 변경 이벤트 : " + event.oldRowCount + " → " + event.rowCount + ", 전체 페이지 수 : " + event.totalPageCount);
});
```


---

## pasteBegin

**Type**: Event
**Version**: 3.0.5

This event occurs when pasting (Ctrl + V) begins in an editable grid.

The user can parse and apply it directly without relying on the grid.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `clipboardData`: Value stored in the clipboard (String)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "pasteBegin", function(event) {
    console.log("붙여 넣기 시작!!");
    console.log(event.clipboardData);
    // return false; // Do not paste (cancel)
    // If the user parses event.clipboardData and returns a 2D array, that value will be applied to the grid's paste.
    // For example, returning [["a1", "a2"], ["b1", "b2"]] will apply "a1", "a2" to the first row and "b1", "b2" to the second row for 4 cells.
    // return [["a1", "a2"], ["b1", "b2"]];
});
```


**Return**: (Boolean or Array) If `false` is returned, the default paste behavior is not performed. Also, if an Array is returned, that return value will be applied to the grid for pasting.

---

## pasteEnd

**Type**: Event
**Version**: 2.8

This event occurs when pasting (Ctrl + V) is completed in an editable grid.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `clipboardData`: Data pasted into the grid (Array)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "pasteEnd", function(event) {
    AUIGrid.setSelectionByIndex(0, 0); // Move selection to 0, 0.
    console.log("붙여 넣기 완료!!");
});
```


---

## ready

**Type**: Event
**Version**: 2.7

This event occurs when data is inserted, grid rendering is complete, and it becomes accessible to the user.

This event is re-triggered when data changes.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "ready", function(event) {
    console.log(event.type);
});
```


---

## removeColumn

**Type**: Event
**Version**: 3.0

This event occurs when a column is deleted using `removeColumn()`.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `dataFields`: Bundle of `dataField`s of the deleted columns (Array)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "removeColumn", function( event ) {
    console.log(event.type + " 이벤트, 삭제된 열 개수 : " + event.dataFields.length);
});
```


---

## removeRow

**Type**: Event
**Version**: 2.7

This event occurs when a row is deleted by the user using Ctrl + Del key, `removeRow()`, or `removeRowByRowId()` method.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `softRemoveRowMode`: Whether soft removal mode is used, i.e., whether the row was actually deleted from the grid or just marked.
*   `items`: Deleted row items (Array)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "removeRow", function( event ) {
    console.log(event.type + " 이벤트, 삭제된 행 개수 : " + event.items.length + ", softRemoveRowMode : " + event.softRemoveRowMode);
});
```


---

## removeSoftRows

**Type**: Event
**Version**: 2.7

When `softRemoveRowMode = true` is used and the user deletes a row, the deleted row is marked.

This event occurs when `AUIGrid.removeSoftRows()` method is called to actually delete these marked rows from the grid.

This event does not occur if `softRemoveRowMode` is set to `false`.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `items`: Deleted row items (Array)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "removeSoftRows", function( event ) {
    console.log(event.type + " 이벤트, 삭제된 행 개수 : " + event.items.length);
});
```


---

## rowAllCheckClick

**Type**: Event
**Version**: 2.7

**[deprecated Ver 2.8]** This event takes `checked` value as a parameter, not an event object. Use the `rowAllChkClick` event.

Occurs when the "Select All" checkbox in the extra checkbox column is clicked.

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "rowAllCheckClick", function( checked ) {
    console.log("전체 선택 checked : " + checked);
}
```


---

## rowAllChkClick

**Type**: Event
**Version**: 2.7

Occurs when the "Select All" checkbox in the extra checkbox column is clicked.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `checked`: Check status (Boolean)
*   `orgEvent`: Original JavaScript event object (Object)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "rowAllChkClick", function( event ) {
    console.log("전체 선택 checked : " + event.checked);
}
```


---

## rowCheckClick

**Type**: Event
**Version**: 3.0.9

This event occurs when a row checkbox in the extra checkbox column is clicked.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `checked`: Check status (Boolean)
*   `rowIndex`: Row index
*   `item`: Row item object being output in that row (Object)
*   `shiftKey`: Whether the Shift key was pressed during the click (Boolean)
*   `shiftIndex`: Relative row index for multiple selection/deselection when Shift key is pressed during click
*   `orgEvent`: Original JavaScript event object (Object)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "rowCheckClick", function( event ) {
    const {item, rowIndex, checked} = event;
    if(item._$groupParentValue && item._$isBranch) { // If grouped and output as hierarchical
        console.log("rowIndex : " + rowIndex + ", group : " + item._$groupParentValue + ", isBranch : " + item._$isBranch + ", checked : " + checked);
    } else { // Normal grid mode
        console.log("rowIndex : " + rowIndex + ", id : " + item.id + ", name : " + item.name + ", checked : " + checked);
    }
});
```


---

## rowNumCellClick

**Type**: Event
**Version**: 2.8

This event occurs when the extra row number column is clicked.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `rowNum`: Row number text value
*   `rowIndex`: Row index
*   `orgEvent`: Original JavaScript event object (Object)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "rowNumCellClick", function(event) {
    console.log("eventType : " + event.type + ", rowNum : " + event.rowNum + ", rowIndex : " + event.rowIndex);
    // return false; // Do not perform default action
    return false;
});
```


**Return**: (Boolean) If `false` is returned, the default row (or cell) selection behavior is not performed.

---

## rowNumHeaderClick

**Type**: Event
**Version**: 3.0.11.17

This event occurs when the extra row number header is clicked.

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `orgEvent`: Original JavaScript event object (Object)

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "rowNumHeaderClick", function(event) {
    console.log("eventType : " + event.type);
});
```


---

## rowStateCellClick

**Type**: Event
**Version**: 2.7

This event occurs when the extra row state column is set (`showStateColumn=true`) and that cell is clicked.

If it's an editable grid (`editable=true`) and restore is enabled (`enableRestore=true`), clicking the state icon will restore the row to its previous state.

The meaning of restoring to the previous state for modification, deletion, and addition is as follows:
*   **Clicking modified state**: Restores to the original data value before modification (i.e., cancels modification).
*   **Clicking deleted state**: Cancels deletion (only applicable if `softRemoveRowMode=true`).
*   **Clicking added state**: Cancels row addition (only applicable if `softRemoveRowPolicy = "exceptNew"`).

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `item`: Row item object being output in that row (Object)
*   `rowIndex`: Index of that row
*   `orgEvent`: Original JavaScript event object (Object)
*   `marker`: Edit state of that row. Valid values are:
    *   `"added"`: Indicates the clicked row state is an added row.
    *   `"added-edited"`: Indicates the clicked row state is an added and modified row.
    *   `"edited"`: Indicates the clicked row state is a modified row.
    *   `"normal"`: Indicates the clicked row state is a normal row with no editing actions performed.
    *   `"removed"`: Indicates the clicked row state is a deleted row.

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "rowStateCellClick", function( event ) {
    if(event.marker === "edited") { // If a modified state is clicked
        if(confirm("수정 취소 즉, 원래 값으로 복구 하시겠습니까?")) {
            return true;
        }
        return false;
    }
});
```


**Return**: (Boolean) If `false` is returned, the restore action is not performed.

---

## selectionChange

**Type**: Event
**Version**: 2.7

This event occurs when cell or row selection changes, if `selectionMode` is not "none".

The `event` object parameters passed to the event handler are as follows:
*   `type`: Event type
*   `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
*   `primeCell`: Primary cell information among multiple selected cells (Object)
*   `selectedItems`: Array containing selected items as elements (Array-Object)

`selectedItems` is an array, and each individual item in the array has the following elements:
The elements of `primeCell` are also as follows:
*   `rowIndex`: Index of the row
*   `columnIndex`: Index of the column
*   `dataField`: Field name of the grid data being output by the selected column
*   `headerText`: Header text of the selected column
*   `editable`: Whether the selected column is editable
*   `value`: Current grid value of the selected cell
*   `rowIdValue`: Value for the key specified by `rowIdField`, i.e., the unique value of the row (requires `rowIdField` to be set in advance)
*   `item`: Object containing selected row items

How to handle this event:
```javascript
AUIGrid.bind(myGridID, "selectionChange", function(event) {
    // ... (example code was truncated in the original content)
});
```