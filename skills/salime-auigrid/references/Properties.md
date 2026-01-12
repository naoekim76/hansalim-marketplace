# AUIGrid Documentation - Properties

This document lists the properties that can be defined in AUIGrid.

---

## adjustSummaryPosition
**Description**: Specifies whether to align and output grouping summary rows (Summary Rows) uniformly to the last field of the grouping. This property requires `fillValueGroupingSummary=true` to be set first.
**Type**: Boolean
**Version**: 3.0.6
**Also See**: `fillValueGroupingSummary` | [Related Demo](javascript:void(0))
**Default Value**: `false`

---

## applyRestPercentWidth
**Description**: When setting the column width as a percentage (%) in the column layout, this property specifies whether the percentage application target should be the remaining width after excluding explicitly sized columns.
For example, if you create 3 columns with "100", "50%", "50%" respectively:
- If `applyRestPercentWidth = false`: It ignores 100 pixels and allocates 50% of the total grid size to the 2nd and 3rd columns respectively.
- If `applyRestPercentWidth = true`: It allocates 50% each from the space remaining after subtracting 100 pixels from the total grid size.
This property is only valid when mixing explicit and percentage width settings for columns.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `false`

---

## autoEditBeginMode
**Description**: Specifies whether to allow cell editing by tapping when accessing from touch-enabled mobile devices (iPhone, iPad, Android devices, etc.). That is, if `autoEditBeginMode=true` is set, even if `editBeginMode` is "doubleClick", editing is possible by tapping on mobile devices (PC maintains existing double-click behavior).
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `false`

---

## autoEditCompleteMode
**Description**: Specifies whether to complete editing when a grid cell is being edited and the HTML background outside the grid is `mouseDown`ed. If this property is `true`, an edit completion event occurs when another HTML element outside the grid cell is `mouseDown`ed. That is, editing is automatically completed when `mouseDown`ing an area outside the grid.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `true`

---

## autoEditCompleteOnResize
**Description**: Specifies whether to complete editing when a grid cell is being edited and a global resize event occurs. A global resize event generally refers to when the size of the top-level window changes. For touch devices, this property is treated as `false` because a global resize event occurs due to the presence or absence of a soft keyboard.
**Type**: Boolean
**Version**: 3.0.4
**Default Value**: `true`

---

## autoGridHeight
**Description**: Specifies whether to automatically determine the grid height to display all inserted data without a vertical scrollbar and match the data. Before data insertion (or if no data), the grid is displayed with the initially specified height, and the grid height changes dynamically to match when data is inserted or rows are added. If this property is set to `true`, the user cannot specify the height using the `resize` method. This property is ignored if `wordWrap` is set to `true` (however, `autoGridHeight` can be used if `usePaging=true` and `wordWrap=true`). Since all data is displayed without a vertical scrollbar, do not insert large amounts of data initially, as it will negatively impact performance.
**Also See**: `wordWrap`, `usePaging` | [Related Demo](javascript:void(0))
**Type**: Boolean
**Version**: 3.0.5
**Default Value**: `false`

---

## autoScrollSize
**Description**: Specifies whether to automatically reduce the scroll height (or width for vertical scroll) on touch-enabled mobile devices (iPhone, iPad, Android devices, etc.). If set to `true`, the scroll size will be applied as `scrollHeight4Mobile` on mobile devices and `scrollHeight` on general desktops.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `false`

---

## blankNumericToNullOnEditing
**Description**: Specifies whether to treat an empty value ("") entered by the user as an explicit `null` when editing a cell with `dataType` set to "numeric". By default, if the user enters an empty value, it is completed as `0` because it is set as a "numeric" field. If `true`, empty values are applied as `null`; if `false`, empty values are applied as `0`.
**Type**: Boolean
**Version**: 3.0.6
**Default Value**: `false`

---

## blankToNullOnEditing
**Description**: Specifies whether to treat an empty value ("") entered by the user as an explicit `null` when editing. By default, if the user enters an empty value, it is completed as "". If `true`, empty values are applied as `null`; if `false`, empty values are applied as `""`.
**Type**: Boolean
**Version**: 3.0.6
**Default Value**: `false`

---

## cellColMergeFunction
**Description**: This function allows you to specify whether to execute horizontal merging (cellColMerge) for a specific row when horizontal merging is set. `cellColMergeFunction` must be a function with the following signature:
`rowIndex`: Row index
`columnIndex`: Column index
`item`: The row item object (Object) currently being displayed in that row.
**Return**: (Boolean) Returns `true` to execute horizontal merging, `false` to not execute horizontal merging.
Example:
```javascript
cellColMergeFunction : function(rowIndex, column, item) {
  if(item.name === "Anna") {
    // Rows where the name is "Anna" will not be horizontally merged.
    return false; // Returns false to prevent horizontal merging
  }
  return true;
}
```
**Note**: The function specified as the value of this property is called frequently during rendering. Therefore, avoid DOM searches or complex logic here, as it will affect performance.
**Type**: Function
**Version**: 3.0.5.5
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `null`

---

## cellMergePolicy
**Description**: Determines the vertical merge policy for null data (null, undefined, "") when cell merging is enabled (`enableCellMerge=true`). This only applies to vertical merging; horizontal merging requires values to be exactly the same. Valid values are "default", "withNull", "valueWithNull".
- `default`: Excludes null from cell merging, so no merging occurs.
- `withNull`: Treats null as a value, merging multiple nulls into a single blank space.
- `valueWithNull`: Merges null with the value above it.
**Type**: String
**Version**: 2.12
**Default Value**: `"default"`

---

## cellMergeRowSpan
**Description**: Specifies whether to actually apply rowspan when performing vertical cell merging (`enableCellMerge=true`). If this property is set to `false`, actual rowspan is not applied, and only the value at the top is displayed, with the cells below appearing empty. If `false` is set, since actual rowspan is not performed, individual cells can be selected and edited instead of merged cell blocks.
**Type**: Boolean
**Version**: 3.0.7
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `true`

---

## checkHeaderText
**Description**: Specifies the text to display in the header of the extra checkbox when the overall checkbox is not displayed.
**Type**: String
**Version**: 3.0.12
**Default Value**: `""`

---

## contextMenuHeaderItems
**Description**: This property allows you to customize header context menu items. Define an array where each element is an Object representing a context menu item.
Example of custom context items:
```javascript
// Custom header context menu
const myContextMenus = [{
  // If $value is set in label, it will be replaced with the header text value at the mouse position.
  label : "$value (Custom)",
  callback : contextItemHeaderHandler
}, {
  label : "_$line" // If _$line is set in label, it is recognized as a line separator item.
}, {
  label: "Sort Ascending",
  callback: contextItemHeaderHandler
}, {
  label: "Sort Descending",
  callback: contextItemHeaderHandler
}];
```
- `label` (String): The text to display in the context menu. If `$value` is set in the label, it will be replaced with the header text value at the mouse position.
- `style` (String): Specifies the style of individual items. Valid value is a CSS class selector name.
- `disable` (Boolean): Specifies whether the context menu is disabled.
- `children` (Array): Defines the context of sub-menus.
- `callback` (Function): A function called when an item is selected from the context menu. The parameter of the callback is an `event` with the following elements:
    - `columnIndex`: Column index
    - `contextIndex`: Context menu configuration index
    - `contextDepth`: Depth of the context menu configuration
    - `contextItem`: Context menu item (Object)
    - `dataField`: KeyField of the data currently being displayed in the current column from the row item
    - `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
    - `depth`: Depth when the header is grouped (hierarchical)
    - `target`: Context menu configuration target. Has "header" value for header context menu.
    - `value`: Header text at the context point
    - `isGroup`: Whether it is a group header when the header is grouped (hierarchical)
**Type**: Array
**Version**: 3.0.15.2
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `Array`

---

## contextMenuItems
**Description**: This property allows you to customize context menu items. Define an array where each element is an Object representing a context menu item.
Example of custom context items:
```javascript
// Custom context menu
const myContextMenus = [{
  // If $value is set in label, it will be replaced with the value at the mouse position.
  label : "$value (Custom)",
  callback : contextItemHandler
}, {
  label : "_$line" // If _$line is set in label, it is recognized as a line separator item.
}, {
  label : "Export To Excel",
  callback : contextItemHandler
}, {
  label : "Open Google.com",
  callback : contextItemHandler
}];
```
- `label` (String): The text to display in the context menu. If `$value` is set in the label, it will be replaced with the value at the mouse position.
- `style` (String): Specifies the style of individual items. Valid value is a CSS class selector name.
- `disable` (Boolean): Specifies whether the context menu is disabled.
- `children` (Array): Defines the context of sub-menus.
- `callback` (Function): A function called when an item is selected from the context menu. The parameter of the callback is an `event` with the following elements:
    - `columnIndex`: Column index
    - `rowIndex`: Row index
    - `contextIndex`: Context menu configuration index
    - `contextDepth`: Depth of the context menu configuration
    - `contextItem`: Context menu item (Object)
    - `dataField`: KeyField of the data currently being displayed in the current column from the row item
    - `item`: The row item object (Object) currently being displayed in that row
    - `pid`: Parent DIV ID of the grid created by the user (matches `myGridID` in the sample)
    - `target`: Context menu configuration target. Has "body" value for body context menu.
    - `value`: Value displayed in the cell
**Type**: Array
**Version**: 3.0.15.2
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `Array`

---

## copyDisplayFunction
**Description**: When copying (Ctrl+C) grid cells or rows, this function allows you to determine whether to copy the original data value or the value formatted by the grid. For example, if the actual data is 1000, but it is formatted and displayed as "1,000 won" by the grid, this dynamically determines whether the target to be copied by Ctrl+C is 1000 or "1,000 won". `copyDisplayFunction` has higher priority than `copyDisplayValue`. Therefore, if `copyDisplayFunction` is specified, `copyDisplayValue` is ignored.
`copyDisplayFunction` must be a function with the following signature:
```javascript
copyDisplayFunction : function(rowIndex, columnIndex, value, item, columnItem) {
  // If the dropdown list is created as an editor, instruct to copy the formatted value.
  if(columnItem.editRenderer && columnItem.editRenderer.type === "DropDownListRenderer") {
    return true
  }
  return false; // Otherwise, instruct to copy the original value.
}
```
- `rowIndex`: Row index
- `columnIndex`: Column index
- `value`: Value of the cell
- `item`: The row item object (Object) currently being displayed in that cell
- `columnItem`: The column item object (Object) currently being displayed in that cell, i.e., the object defined in the column layout.
**Return**: (Boolean) Returns `true` to copy the formatted value, `false` to copy the original (actual) value.
**Type**: Function
**Version**: 2.9.0
**Default Value**: `null`

---

## copyDisplayValue
**Description**: Indicates whether to copy the original data value or the value formatted by the grid when copying (Ctrl+C) grid cells or rows. For example, if the actual data is 1000, but it is formatted and displayed as "1,000 won" by the grid, this specifies whether the target to be copied by Ctrl+C is 1000 or "1,000 won". If `copyDisplayValue = true`, "1,000 won" is copied.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `false`

---

## copySingleCellOnRowMode
**Description**: Specifies whether to copy a single cell when copying (Ctrl+C) if `selectionMode` is "singleRow" or "multipleRows". By default, in "singleRow" or "multipleRows" mode, copying is done row by row. However, if you want to copy a single selected cell in row mode, set this property to `true`.
**Type**: Boolean
**Version**: 2.10
**Default Value**: `false`

---

## copyWithHeaderText
**Description**: Specifies whether to copy the header text along with the cell values when copying (Ctrl+C) cells in blocks. If the header is grouped (hierarchical), the hierarchical relationship is not fully included. Only the actual header text belonging to the lowest level is included. Header text is not added when copying a single cell value (only included if at least 2 are selected).
**Type**: Boolean
**Version**: 3.0.16
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `false`

---

## defaultColumnWidth
**Description**: Specifies the default width of columns. The default value is applied to columns where the `width` property is not specified in the column layout.
**Type**: Number
**Version**: 2.7.0
**Default Value**: `80`

---

## dependentColSpan
**Description**: If column header horizontal merging (`colSpan`) is set, this property specifies whether to hide/show merged columns together when hiding/showing columns using the hide/show column methods. If this property is set to `true`, all columns involved in horizontal merging will be hidden/shown together when using the column hide/show methods.
**Also See**: `hideColumnByDataField` | `showColumnByDataField`
**Type**: Boolean
**Version**: 3.0.5.8
**Default Value**: `true`

---

## dialogId
**Description**: When displaying a grid inside a dialog (HTMLDialogElement) using it as a Modal, set `dialogId`. If the grid property `dialogId` is set, layers that were previously attached as children of the body will be displayed relative to the dialog. If a grid is displayed in a dialog, `dialogId` must be set for layers such as dropdown lists, calendars, and filters to be displayed above the dialog.
**Type**: String
**Version**: 3.0.12.6
**Default Value**: `""`

---

## dispatchSelectionChangeMoving
**Description**: Specifies whether the `selectionChange` event should also occur when the mouse is moved while pressed. That is, it specifies whether to dispatch the `selectionChange` event as a result of dragging the mouse to select multiple cells. By default, it only occurs when the mouse is released after dragging (on `mouseUp`).
**Type**: Boolean
**Version**: 3.0.15.1
**Default Value**: `false`

---

## displaySummaryTreeBranch
**Description**: When grouping, specifies whether to display the summary directly in the grouping tree branch instead of creating separate summary rows (SummaryRows).
**Type**: Boolean
**Version**: 3.0.13
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `false`

---

## displayTreeOpen
**Description**: In a hierarchical grid (tree grid), determines whether the initially displayed grid branch items are shown in an open or closed state. If this value is `true`, all are open; if `false`, only the top-level branches are displayed.
**Note**: This property is ignored when using `treeLazyMode`.
**Also See**: `treeLazyMode`
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `false`

---

## dragKnobColumnWidth
**Description**: Specifies the width of the extra column that assists with row drag & drop.
**Type**: Number
**Version**: 3.0.10.0
**Default Value**: `32`

---

## dragRowsText
**Description**: Specifies the text displayed next to the mouse cursor during row dragging.
**Type**: String
**Version**: 3.0.4
**Default Value**: `"$value row(s)"`

---

## dropAcceptableGridIDs
**Description**: When allowing dropping onto other grids, specifies the `pid` of acceptable grids as array elements. That is, it allows selective permission for drag & drop between grids. If this property is set to `null`, drag & drop between all grids is allowed, provided that `enableDrop=true` is set for all grids. For example, if this property is set to `dropAcceptableGridIDs=["#grid_wrap2"]`, dropping is only allowed onto the grid in `#grid_wrap2`.
**Also See**: `dropToOthers`, `enableDrop` | [Related Demo](javascript:void(0))
**Type**: Array
**Version**: 3.0.4
**Default Value**: `null`

---

## dropToOthers
**Description**: Specifies whether there are other droppable grids (including itself) when dragging rows. This property must be set to `true` for drag & drop between grids. The dragging grid and the dropping grid must exist in the same Document Object Model (DOM). Drag & drop is not possible between different Document Object Models (DOM).
**Also See**: `enableDrag`, `enableDrop` | [Related Demo](javascript:void(0))
**Type**: Boolean
**Version**: 3.0.4
**Default Value**: `false`

---

## editable
**Description**: Specifies whether editing is possible.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `false`

---

## editableMergedCellsAll
**Description**: When editing vertically or horizontally merged cells, specifies whether the edit applies to the entire merged block. For example, if this property is set to `true`, and 3 cells are merged, editing one cell will apply the same value to all 3 merged cells. If this property is set to `false`, only the top cell among the 3 merged cells is edited, and the cell merging is released. If you want pasting (Paste) to also apply to the entire merged block, `selectionMode` must be set to "multipleCells".
**Note**: If this property is set to `true`, `selectionMultiOnMerge = true` and `separatedSelectionOnMerge = false` are enforced.
**Type**: Boolean
**Version**: 3.0.15.2
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `false`

---

## editableOnFixedCell
**Description**: When editing is enabled (`editable=true`) and fixed columns/rows are set, this specifies whether those cells are editable. If `editableOnFixedCell = true` is set, cells designated as fixed columns/rows can be edited.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `false`

---

## editableOnGroupFields
**Description**: When grouping is set, this specifies whether cells corresponding to grouping fields are editable. If you want to edit cells, add rows, or delete rows in a grouped state, you must set the `editableOnGroupFields` property to `true`. When grouping, if editing is required, it is recommended to also set `cellMergeRowSpan` to `true`.
**Also See**: `cellMergeRowSpan` | [Related Demo](javascript:void(0))
**Type**: Boolean
**Version**: 3.0.7
**Default Value**: `false`

---

## editBeginMode
**Description**: Specifies the policy for entering edit/modify mode with the mouse. You can choose between double-click and click. Valid values: `doubleClick`, `click`, `none`. To enter edit/modify mode with the keyboard, use F2.
**Type**: String
**Version**: 2.7.0
**Default Value**: `"doubleClick"`

---

## editingOnKeyDown
**Description**: By default, when in editable state (`editable = true`), entering edit mode is done via F2 or double-click (click). However, this property indicates whether to allow editing immediately upon pressing any key (any keys) in the cell, similar to Excel. If editing mode is entered immediately, editing can be completed not only with Enter/Tab keys but also with keyboard arrow keys (Excel UI).
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `true`

---

## enableCellMerge
**Description**: Specifies whether column cell merging is possible. Cell merging can only be either horizontal or vertical. It is not possible to use both horizontal and vertical merging simultaneously for mixed merging.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `false`

---

## enableClipboard
**Description**: Specifies whether to enable grid data copying (Ctrl+C) and pasting (Ctrl+V).
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `true`

---

## enableColumnResize
**Description**: Specifies whether column resizing is possible. Column resizing can be done by dragging and dropping the boundary between headers. If the header boundary is double-clicked, the size is determined by the longest text among all row cell values. This is ignored if HTML is used in the header. Also, resizing by double-clicking is ignored when using `TemplateRenderer`.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `true`

---

## enableDrag
**Description**: Specifies whether row dragging is possible. If the current grid is sorted or filtered, row dragging is not possible in that state. It must be in an unsorted and unfiltered state.
**Type**: Boolean
**Version**: 3.0.4
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `false`

---

## enableDragByCellDrag
**Description**: Specifies whether rows can be moved (copied) by dragging cells directly, in addition to the row dragging handle. If this property is set, when `selectionMode` is "multipleCells" or "multipleRows", dragging behavior occurs immediately without selecting multiple cells (rows). The `enableDrag=true` property must be set first.
**Also See**: `enableDrag` | [Related Demo](javascript:void(0))
**Type**: Boolean
**Version**: 3.0.4
**Default Value**: `false`

---

## enableDrop
**Description**: Specifies whether dropping is possible when rows are dragged. If this property is set to `false`, dropping is not allowed under any circumstances. This is the highest-level property that allows dropping.
**Also See**: `enableDrag` | [Related Demo](javascript:void(0))
**Type**: Boolean
**Version**: 3.0.4
**Default Value**: `true`

---

## enableDropTreeChild
**Description**: In a tree grid (hierarchical grid), when performing drag & drop, specifies whether to allow dropping as a child (child) instead of just moving a row.
**Type**: Boolean
**Version**: 3.0.15.14
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `false`

---

## enableFilter
**Description**: Specifies whether to enable column field filtering functionality.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `true`

---

## enableFocus
**Description**: Specifies whether to set keyboard focus on the grid. If `enableFocus` is set to `false`, keyboard focus cannot be received, so keyboard usage such as direct cell value editing and movement with arrow keys is not possible.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `true`

---

## enableHScrollByOnlyShiftKey
**Description**: Specifies whether the mouse wheel reacts to horizontal scrolling only when the Shift key is pressed. If this property is set to `false`, for grids without a vertical scrollbar, the mouse wheel will react to horizontal scrolling instead of vertical scrolling without the Shift key.
**Type**: Boolean
**Version**: 3.0.15.11
**Default Value**: `true`

---

## enableHScrollByWheel
**Description**: Specifies whether the mouse wheel reacts to horizontal scrolling. If `enableHScrollByOnlyShiftKey` is not set, horizontal scrolling reacts by default when Shift + wheel is used. If `enableMouseWheel=false` is set, `enableHScrollByWheel` is ignored.
**Type**: Boolean
**Version**: 3.0.14
**Default Value**: `true`

---

## enableLongTap
**Description**: Specifies whether to activate long tap events on touch devices.
**Type**: Boolean
**Version**: 3.0.2
**Default Value**: `false`

---

## enableMouseWheel
**Description**: Specifies whether to enable the mouse wheel. If this property is set to `false`, the grid's scroll will not react to the mouse wheel.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `true`

---

## enableMovingColumn
**Description**: Specifies whether to enable the functionality of moving column headers by drag and drop. If `enableMovingColumn = true`, users can change the position of column headers by dragging them. However, columns set as fixed columns (`fixedColumnCount`) cannot be changed by dragging.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `false`

---

## enableMultipleDrag
**Description**: Specifies whether multiple rows can be dragged at once. This is valid when `selectionMode` is "multipleCells" or "multipleRows". Also, the `enableDrag=true` property must be set first. If it is a hierarchical grid (TreeGrid), this property is treated as `false` because hierarchical grids do not support dragging multiple rows by default.
**Also See**: `selectionMode`, `enableDrag` | [Related Demo](javascript:void(0))
**Type**: Boolean
**Version**: 3.0.4
**Default Value**: `true`

---

## enableMultipleSorting
**Description**: Specifies whether multiple column field sorting is possible (Prerequisite: `enableSorting` property set to `true`). If this value is `true`, multi-sorting will be executed when clicking multiple column headers according to `multiSortingKey` (default: `shiftKey`).
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `true`

---

## enableRestore
**Description**: In an editable grid (`editable=true`), specifies whether to allow restoring modified, added, or deleted rows to their original state. If `enableRestore` is set to `true`, clicking the status icon in the row status column (`showStateColumn=true`) will restore the row. That is, if a modification was made, a pencil icon appears, and clicking it restores to the state before modification. If a row was added, a plus icon appears, and clicking it cancels the addition. Similarly, clicking the delete icon cancels the deletion.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `true`

---

## enableRightDownFocus
**Description**: Specifies whether the cell at the clicked point should be selected when the right mouse button is clicked. That is, it indicates whether the clicked point should select a cell, similar to a left click, when right-clicking to view the context menu.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `false`

---

## enableRowCheckShiftKey
**Description**: In the extra checkbox (`showRowCheckColumn`), specifies whether to allow multiple checks by clicking while holding down the Shift key.
**Type**: Boolean
**Version**: 3.0.9.0
**Default Value**: `false`

---

## enableSelectionAll
**Description**: Specifies whether to enable selecting all cells of the current grid data (Ctrl + A). `selectionMode` must be set to "multipleCell" or "multipleRows". If this property is enabled, you can select all with the Ctrl + A shortcut, and you can also select all by clicking "No" in the row number column header. Selecting thousands of data items can cause browser performance degradation, temporary freezing, or script termination. Therefore, this function should be used carefully considering the amount of data.
**Caution**: Selecting thousands of cell data can cause browser performance degradation, temporary freezing, or script termination.
**Note**: If this property is enabled, `simplifySelectionEvent` is enforced to `true`.
**See Also**: `selectionMode` | `simplifySelectionEvent`
**Type**: Boolean
**Version**: 3.0.16
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `false`

---

## enableSorting
**Description**: Specifies whether sorting is possible.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `true`

---

## enableSummaryMerge
**Description**: Specifies whether to execute horizontal merging of grouping summary fields (subtotals) cells. The grid property `enableCellMerge` must be set to `true` first.
**Note**: If `keepColumnOrderOnGrouping` is set to `true`, this property is ignored.
**Type**: Boolean
**Version**: 3.0
**Default Value**: `false`

---

## enableUndoRedo
**Description**: In an editable grid (`editable=true`), specifies whether to use Undo (Ctrl+Z) and Redo (Ctrl+Y) functionalities. If `enableUndoRedo` is set to `true`, Ctrl+Z and Ctrl+Y shortcuts are activated.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `true`

---

## enterKeyColumnBase
**Description**: Specifies whether the Enter key moves to the next column instead of the next row.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `false`

---

## excludeFixedRowsOnFiltering
**Description**: If fixed rows (`fixedRows`) are specified, this property determines whether rows set as fixed rows are excluded from filtering. If set to `true`, rows designated as fixed rows will always remain as they are. That is, fixed rows will always be displayed regardless of filtering.
**Note**: This property is irrelevant to hierarchical grids (tree grids). If displayed as a hierarchical grid, this property is ignored.
**Type**: Boolean
**Version**: 3.0.16.5
**Default Value**: `false`

---

## excludeFixedRowsOnSorting
**Description**: If fixed rows (`fixedRows`) are specified, this property determines whether rows set as fixed rows are excluded from sorting. If set to `true`, rows designated as fixed rows will always remain as they are.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `true`

---

## exportURL
**Description**: [deprecated Ver 3.0.15.16]
**Type**: String
**Version**: 2.7.0
**Default Value**: `null`

---

## extraColumnOrders
**Description**: Determines the display order of extra renderers. There are four extra renderers: dragging handle (`showDragKnobColumn`), row number (`showRowNumColumn`), row status (`showStateColumn`), and row checkbox (`showRowCheckColumn`). Specifying the extra renderer activation property names in an array will display them in that order.
Example:
```javascript
// Place the extra checkbox column at the very front, maintaining the default order for other columns (other columns are maintained if not specified in the array).
extraColumnOrders = ["showRowCheckColumn"];
// Specify the order as extra checkbox, row number, status, dragging handle.
extraColumnOrders = ["showRowCheckColumn", "showRowNumColumn", "showStateColumn", "showDragKnobColumn"];
```
**Type**: Array
**Version**: 3.0.11.0
**Default Value**: `["showDragKnobColumn", "showRowNumColumn", "showStateColumn", "showRowCheckColumn"]`

---

## fillColumnSizeMode
**Description**: Calculates columns as a ratio to fill the current grid area without a horizontal scrollbar, based on the defined column layout. If this property is set to `true`, no horizontal scrollbar will be created under any circumstances. Also, the width of all columns will be calculated and applied as a ratio.
**Note**: If `fillColumnSizeMode` is set to `true`, the `fixedColumnCount` property is ignored.
**Also See**: `fixedColumnCount` | [Related Demo](javascript:void(0))
**Type**: Boolean
**Version**: 3.0.2
**Default Value**: `false`

---

## fillValueGroupingSummary
**Description**: Specifies whether to fill values in the front part of grouping summary rows (Summary Rows). If this property is set to `true`, cells corresponding to grouping fields in grouping summary rows also become targets for vertical merging.
**Type**: Boolean
**Version**: 3.0.6
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `false`

---

## filterCancelText
**Description**: Specifies alternative text to replace "취 소" (Cancel) displayed in the filter menu.
**Type**: String
**Version**: 2.7.0
**Default Value**: `"취 소"`

---

## filterCheckAllText
**Description**: Specifies alternative text to replace "전체선택" (Select All) displayed in the filter menu.
**Type**: String
**Version**: 2.7.0
**Default Value**: `"(전체선택)"`

---

## filterClearText
**Description**: Specifies alternative text to replace "필터 초기화" (Clear Filter) displayed in the filter menu.
**Type**: String
**Version**: 2.7.0
**Default Value**: `"필터 초기화"`

---

## filterItemMoreMessage
**Description**: In the filtering menu that appears when clicking the column's filter icon, a message can be displayed indicating that there are more actual values. That is, if the actual filterable values are greater than `filterMenuItemMaxCount`, `filterItemMoreMessage` is displayed at the bottom.
**Type**: String
**Version**: 2.7.0
**Default Value**: `"Too many items...Search words"`

---

## filterLayerHeight
**Description**: Specifies the height in pixels of the default filter menu that appears when clicking the header's filter icon.
**Type**: Number
**Version**: 2.7.0
**Default Value**: `320`

---

## filterLayerWidth
**Description**: Specifies the width in pixels of the default filter menu that appears when clicking the header's filter icon.
**Type**: Number
**Version**: 2.7.0
**Default Value**: `260`

---

## filterMenuItemMaxCount
**Description**: In the filtering menu that appears when clicking the column's filter icon, if there are many values for that column, not all will be displayed as checkboxes. `filterMenuItemMaxCount` specifies the maximum number of filterable checkboxes. To filter values that are not visible, search using the auto-complete function and select the checkbox.
**Type**: Number
**Version**: 2.7.0
**Default Value**: `50`

---

## filterNoValuePosition
**Description**: Specifies the position of "필드 값 없음" (No Field Value) to be displayed in the filter menu. If there are empty cells in the grid data, "필드 값 없음" is displayed in the filter menu. If you want "필드 값 없음" to be positioned at the top, set this to "top". Valid values are "top" and "bottom".
**Type**: String
**Version**: 2.7.0
**Default Value**: `"bottom"`

---

## filterNoValueText
**Description**: If there are empty cells in the grid data, specifies alternative text to replace "필드 값 없음" (No Field Value) displayed in the filter menu.
**Type**: String
**Version**: 2.7.0
**Default Value**: `"(필드 값 없음)"`

---

## filterNumberOperatorList
**Description**: When the filter type is numeric, specifies the comparison operator names to display in the filtering checkbox.
**Type**: Array
**Version**: 2.7.0
**Default Value**: `["같다(=)", "크다(>)", "크거나 같다(>=)", "작다(<)", "작거나 같다(<=)", "같지 않다(!=)"]`

---

## filterOkText
**Description**: Specifies alternative text to replace "확 인" (Confirm) displayed in the filter menu.
**Type**: String
**Version**: 2.7.0
**Default Value**: `"확인"`

---

## filterSearchCheckAllText
**Description**: Specifies alternative text to replace "검색 전체선택" (Search Select All) displayed in the filter menu.
**Type**: String
**Version**: 2.7.0
**Default Value**: `"(검색 전체선택)"`

---

## filterSearchPlaceholder
**Description**: Specifies the placeholder text for the search input field in the default filter menu that appears when clicking the header's filter icon.
**Type**: String
**Version**: 2.9.4
**Default Value**: `"검색"`

---

## fixedColumnCount
**Description**: Specifies the number of fixed columns. Fixed columns are columns that are always displayed regardless of horizontal scrolling (frozen panes).
**Type**: Number
**Version**: 2.7.0
**Default Value**: `0`

---

## fixedRowCount
**Description**: Specifies the number of fixed rows. Fixed rows are rows that are always displayed regardless of vertical scrolling (frozen panes).
**Note**: If paging mode (`usePaging=true`) is enabled, the `fixedRowCount` property is ignored.
**Type**: Number
**Version**: 2.7.0
**Default Value**: `0`

---

## flat2tree
**Description**: Indicates whether to display data as a tree grid if the data input to the grid is not hierarchical but has an `id`, `parent` structure. The order of general data is important; parent rows must precede child rows. The `flat2tree` property must be preceded by `treeIdField` and `treeIdRefField` being set.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `false`

---

## footerHeight
**Description**: Specifies the height of the footer.
**Type**: Number
**Version**: 2.7.0
**Default Value**: `30`

---

## footerHeights
**Description**: If multiple footer rows are set, specifies the height of individual footer rows. For example, if there are 3 footer rows, specify 3 individual values in an array as follows:
```javascript
const gridPros = {
  footerHeights :,
  ....
};
```
If `footerHeights` is not specified, it follows the `footerHeight` property. This means that if the array arguments of `footerHeights` are not integers, `headerHeight` is applied.
**Type**: Array
**Version**: 3.0.7
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `null`

---

## footerPosition
**Description**: Specifies the position of the footer. By default, the footer is displayed at the bottom of the grid. However, if you want to position the footer at the top of the grid to use it as a Header Summary function, set this value to "top". Valid values are "top", "bottom".
**Type**: String
**Version**: 2.7.0
**Default Value**: `"bottom"`

---

## footerRowCount
**Description**: If the footer is set, specifies the number of footer rows.
**Type**: Number
**Version**: 3.0.7
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `1`

---

## footerVGap
**Description**: Specifies the gap or spacing between the footer and the main grid.
**Type**: Number
**Version**: 2.7.0
**Default Value**: `4`

---

## forceTreeView
**Description**: Specifies whether to display the grid as a hierarchical grid (tree grid) regardless of the data inserted into the grid. By default, a hierarchical grid (tree grid) is displayed as a tree grid if the inserted data is hierarchical. However, if `forceTreeView = true` is set, it is displayed as a hierarchical (tree grid) regardless of the data.
**Type**: Boolean
**Version**: 3.0.10.0
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `false`

---

## groupingFields
**Description**: Specifies the data fields of columns to be grouped. Grouping bundles data with the same values and displays them hierarchically. For example, if this value is set to `["country", "product"]`, it will first group by identical `country` values, and then within each `country` group, it will group by identical `product` values. After grouping, subtotal rows (Summary Rows) can be displayed for each group.
**Also See**: `groupingSummary` | [Related Demo](javascript:void(0))
**Note**: The number of grouping fields set determines the number of hierarchy levels. Many levels can lead to significant time for grouping, negatively impacting performance.
**Type**: Array
**Version**: 2.7.0
**Default Value**: `null`

---

## groupingMessage
**Description**: Specifies the message displayed in the groupable panel at the top of the grid.
**Type**: String
**Version**: 2.7.0
**Default Value**: `"Drag a column header and drop here to group by that"`

---

## groupingPanelHeight
**Description**: Specifies the height of the groupable panel at the top of the grid.
**Type**: Number
**Version**: 2.7.0
**Default Value**: `40`

---

## groupingSummary
**Description**: Set this property to create summary rows (Summary Rows) during grouping. `groupingFields` must be set first for summary row display. The `groupingSummary` property is defined as an Object, and its keys can have the following elements:
- `dataFields` (Array): Fields for summary calculation. Only valid if the column's `dataType` is "numeric". (`dataFields` is mandatory for summary display.)
- `excepts` (Array): Defines fields to exclude from summary during grouping. By default, summary rows are displayed for all depths of fields set in `groupingFields`. Define here if you want to exclude summaries for unwanted depths.
**Related Demo**: [Related Demo](javascript:void(0))
- `labelTexts` (Array): Defines summary texts displayed below the grouping items during grouping. Sets text to replace "Value Total" when displaying summaries by depth.
**Related Demo**: [Related Demo](javascript:void(0))
- `rows` (Array): Defines specific settings for summary rows. By default, summaries display the total for each group depth. Here, you can define specific settings such as operations other than total, custom operations, and defining multiple summary rows at the same depth. The number of array elements defined in `rows` determines how many summary rows are displayed at the same depth, and individual summary rows are controlled here. `rows` defines an Array, with Objects as array elements. The following describes the elements of the Object:
    - `operation` (String): Defines the specific operation to output as a summary. Valid values are "SUM", "MIN", "MAX", "AVG", "COUNT".
    **Related Demo**: [Related Demo](javascript:void(0))
    - `text` (String or Object): Sets the text to be displayed below the grouping item of the summary row. If an Object is defined, arbitrary text can be set for that summary row.
    **Related Demo**: [Related Demo](javascript:void(0))
    - `constraintField` (String): If you want to apply summary calculation only to values that meet a condition, set the field name corresponding to the condition.
    **Related Demo**: [Related Demo](javascript:void(0))
    - `constraint` (String): Specifies the actual value of the field defined in `constraintField`. `constraint` can be extended to specify a Function to derive desired results. This is for advanced users, so refer to the demo for specific details.
    - `exceptFunction` (Function): A function that determines whether to display a summary row only if a condition is met. For example, you can instruct not to display a summary row if the number of items for the summary is 1. If this function returns `false`, the summary row is not displayed.
    **Related Demo**: [Related Demo](javascript:void(0))
    - `expFunction` (Function): A formula function that allows user-defined operations instead of predefined operations. The value returned by this function is output as the summary.
    **Related Demo**: [Related Demo](javascript:void(0))
Example `groupingSummary` setting:
```javascript
// Grouping by country, product, name in order.
// That is, grouping by country, then by users who purchased each product within each country.
groupingFields : ["country", "product", "name"],
// Set to display summary fields after grouping.
groupingSummary : {
  // Summary field is performed for only one price.
  dataFields : [ "price" ],
  // By default, summary rows are displayed for all depths of fields set in groupingFields.
  // However, exclude summaries you don't want.
  // That is, set fields to exclude from summary display.
  excepts : [ "name"],
  // Specific settings for grouping summary rows
  // Two Objects represent sum and count respectively.
  rows: [{ operation: "SUM", text : "$value Total" }, { operation: "COUNT", text : "$value Count" }]
}
```
**Also See**: `groupingFields`
**Note**: The number of grouping fields set determines the number of hierarchy levels, and `groupingSummary` calculates summaries for all levels. Many levels can negatively impact performance.
**Type**: Object
**Version**: 3.0.6
**Default Value**: `null`

---

## groupingSummaryPosition
**Description**: Specifies the display position of grouping summary rows (Summary Rows). By default, summary rows are displayed at the bottom. If you want to display them at the top, set this to "top". Valid values are "top", "bottom".
**Type**: String
**Version**: 3.0.6
**Related Demo**: [Related Demo](javascript:void(0))
**Default Value**: `"bottom"`

---

## headerHeight
**Description**: Specifies the height of the header.
**Type**: Number
**Version**: 2.7.0
**Default Value**: `26`

---

## headerHeights
**Description**: If the header is grouped (hierarchical), specifies individual header heights per hierarchy (depth). For example, if there are 3 header hierarchy levels (i.e., 3 header rows), specify 3 individual values in an array as follows:
```javascript
const gridPros = {
  headerHeights :,
  ....
};
```
If `headerHeights` is not specified for a grouped header, it follows the `headerHeight` property. This means that if the array arguments of `headerHeights` are not integers, `headerHeight` is applied.
**Type**: Array
**Version**: 2.11.0
**Default Value**: `null`

---

## height
**Description**: Specifies the vertical size of the grid in pixels. If this vertical size is not specified, it will be allocated as much as the height of the parent DIV (i.e., 100% of the parent's height).
**Type**: Number
**Version**: 2.7.0
**Default Value**: `NaN`

---

## hoverMode
**Description**: Specifies the mode to display on mouse hover. Valid property values are: "singleCell", "singleRow", "none".
**Type**: String
**Version**: 3.0.13
**Default Value**: `"singleCell"`

---

## hScrollPosition
**Description**: Represents the position of the horizontal scrollbar. This value is in pixels.
**Type**: Number
**Version**: 2.7.0
**Default Value**: `0`

---

## ignoreColumnMinWidth
**Description**: When a user resizes a column by dragging, this specifies whether to ignore the `minWidth` property of the column if it is set. By default, the horizontal size of a column does not become smaller than the `minWidth` value. However, if `ignoreColumnMinWidth=true` is set, `minWidth` is ignored.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `false`

---

## independentAllCheckBox
**Description**: If the extra checkbox (`showRowCheckColumn=true`) is set, this specifies whether the "Select All/Deselect All" checkbox located in the header acts independently. Independent action means that, by default, when "Select All/Deselect All" is performed, individual row checkboxes are selected/deselected. However, if `independentAllCheckBox=true` is set, only the "Select All/Deselect All" event occurs, and individual row checkboxes are not selected/deselected. If you want to customize "Select All/Deselect All" in a desired way, set `independentAllCheckBox` to `true` and bind the `rowAllCheckClick` event to control it.
**Type**: Boolean
**Version**: 2.8.0
**Default Value**: `false`

---

## inlineFilterDelay
**Description**: Sets the reaction delay when entering filter values in the inline filter. For example, if set to 500, filtering is executed 500ms after the user finishes typing. If set to 0, filtering is executed with every input. For a large amount of data or if you don't want unnecessary filtering with every user input, 300-500 is recommended.
**Type**: Number
**Version**: 3.0.11.0
**Default Value**: `300`

---

## isColumnOriented
**Description**: If `isColumnOriented = true` is set, the Home and End keys move to the beginning and end of the column, respectively. If you want the keyboard's Home and End keys to move to the beginning and end of the row instead of the column, set this property to `false`.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `true`

---

## isFitColumnSizeHeaderText
**Description**: When double-clicking the separator between columns, the size is optimized to fit the content of that column's cells. At this time, this specifies whether to consider the header text. If this property is set to `false`, the header text is ignored, and the column size is adjusted to fit the actual cell text.
**Type**: Boolean
**Version**: 2.7.0
**Default Value**: `true`

---

## isGenNewRowsOnPaste
**Description**: Specifies whether to generate new rows when pasting (Ctrl+V).
**Type**: Boolean
**Version**: ... (truncated)
