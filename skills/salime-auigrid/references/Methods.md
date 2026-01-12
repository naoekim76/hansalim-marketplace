The following is the main content from the provided URL, formatted as Markdown:

# AUIGrid Documentation - Methods

This document lists the methods that can be called in AUIGrid.

**Note on `pid` parameter:**
All grid methods require the `pid` (project ID) used during the `create()` method call as the first parameter. In this documentation, the `pid` parameter is omitted from the descriptions. For example, `setFixedRowCount` is described with one parameter (`columnCount`), but actually requires two: the first is `pid`, and `columnCount` is the second. Please be aware of this when applying the parameters described in the document.

---

## Methods

### `addCheckedRowsByIds`
*   **Type**: Method
*   **Version**: 2.11.0
*   **Description**: If extra row checkboxes are set, this method checks specific rows using their unique row ID (`rowIdField` value). This method accumulates checks on existing checked items.
*   **Parameters**:
    *   `rowIds`: (Array) An array containing unique row ID (`rowIdField` value) as elements.
*   **Note**: If you want to remove existing checked items and check only newly set values, use the `setCheckedRowsByIds` method.
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `addCheckedRowsByValue`
*   **Type**: Method
*   **Version**: 2.11.0
*   **Description**: If extra row checkboxes are set, this method checks rows where the `dataField` value matches a specific value. This method accumulates checks on existing checked items.
*   **Parameters**:
    *   `dataField`: (String) The field name in the row item to be checked.
    *   `values`: (Array or String) The value(s) of the field to be checked. If checking multiple values, set as an array (e.g., `["Anna", "Steve"]`).
*   **Example**: To accumulate checks on people named "Anna" in the "name" field:
    ```javascript
    AUIGrid.addCheckedRowsByValue(myGridID, "name", "Anna");
    ```
*   **Note**: If you want to remove existing checked items and check only newly set values, use the `setCheckedRowsByValue` method.
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `addColumn`
*   **Type**: Method
*   **Version**: 3.0
*   **Description**: Adds or inserts a grid column. The added column must have a `dataField` specified, and this `dataField` must be unique and not overlap with existing ones. Columns can be added using this method regardless of the grid's `editable` property.
*   **Parameters**:
    *   `cItem`: (Object or Array) The column object to insert. If inserting multiple columns, group objects into an array.
    *   `columnIndex`: (Number or String) The index where the column will be inserted. Can be "first", "last", "selectionLeft", or "selectionRight".
*   **Example**:
    ```javascript
    const cItem = { dataField : "myNumField1", dataType : "numeric", formatString : "#,##0" };
    // Example 1: Add 1 column at columnIndex 5
    AUIGrid.addColumn(myGridID, cItem, 5);
    // Example 2: Add 1 column at the end
    AUIGrid.addColumn(myGridID, cItem, "last");
    // Example 3: Add 1 column to the right of the selected column
    AUIGrid.addColumn(myGridID, cItem, "selectionRight");
    ```

### `addRow`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Adds or inserts a grid row item. Items can be added using this method regardless of the grid's `editable` property.
*   **Parameters**:
    *   `items`: (Object or Array) The row item(s) to insert. If inserting multiple rows, group objects into an array.
    *   `rowIndex`: (Number or String) The index where the row will be inserted. Can be "first", "last", "selectionUp", or "selectionDown".
*   **Example**:
    ```javascript
    const item = { "name" : "새 이름", "country" : "새 나라", "price" : 0 };
    // Example 1: Add 1 row at rowIndex 5
    AUIGrid.addRow(myGridID, item, 5);
    // Example 2: Add 1 row at the bottom
    AUIGrid.addRow(myGridID, item, "last");
    // Example 3: Add 1 row below the selected row
    AUIGrid.addRow(myGridID, item, "selectionDown");
    // Caution: Do not use addRow method inside a loop to add multiple rows.
    // Process multiple rows with a single addRow method call by grouping them into an array.
    const items = [{...}, {...}, ... ]; // Array of multiple objects
    // Example 4: Add multiple rows at once by grouping them into an array
    AUIGrid.addRow(myGridID, items, "last");
    ```
*   **Note**: This is for adding rows to a regular grid. For adding rows to a tree grid (hierarchical grid), refer to the `addTreeRow()` method.
*   **Also See**: `addTreeRow`
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `addTreeColumn`
*   **Type**: Method
*   **Version**: 3.0
*   **Description**: Adds or inserts a column as a child of a specific column in the grid. The added column must have a `dataField` specified, and this `dataField` must be unique and not overlap with existing ones. Columns can be added using this method regardless of the grid's `editable` property.
*   **Parameters**:
    *   `cItem`: (Object or Array) The column object to insert. If inserting multiple columns, group objects into an array.
    *   `parentDataField`: (String) The `dataField` of the parent. The column will be added as a child of this `dataField`.
    *   `columnIndex`: (Number or String) The index where the column will be inserted. Can be "first" or "last".
*   **Example**:
    ```javascript
    const cItem = { dataField : "myNumField1", dataType : "numeric", formatString : "#,##0" };
    // Example 1: Find the column with dataField "myGroupField" and add 1 column at child index 1.
    AUIGrid.addTreeColumn(myGridID, cItem, "myGroupField", 1);
    // Example 2: Find the column with dataField "myGroupField" and add 1 column at the end.
    AUIGrid.addTreeColumn(myGridID, cItem, "myGroupField", "last");
    ```

### `addTreeRow`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Adds or inserts a tree grid row item. Items can be added using this method regardless of the grid's `editable` property.
*   **Parameters**:
    *   `items`: (Object or Array) The row item(s) to insert. If inserting multiple rows, group objects into an array.
    *   `parentRowId`: (String) The unique row ID (`rowIdField` value) of the parent row to which the new row will be added.
    *   `rowPosition`: (String) The position where the row will be inserted. Valid values are "first", "last", "selectionUp", "selectionDown".
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `addTreeRowByIndex`
*   **Type**: Method
*   **Version**: 3.0.10
*   **Description**: Adds or inserts a tree grid row item at a specific row index (`rowIndex`). Parent-child relationships are automatically set according to the specified row position. If you want to explicitly define parent-child relationships, use the `addTreeRow` method.
*   **Parameters**:
    *   `items`: (Object or Array) The row item(s) to insert. If inserting multiple rows, group objects into an array.
    *   `rowIndex`: (Number) The row index where the new row will be positioned.

### `addUncheckedRowsByIds`
*   **Type**: Method
*   **Version**: 2.11.0
*   **Description**: If extra row checkboxes are set, this method unchecks specific rows using their unique row ID (`rowIdField` value). This is useful when you want to partially uncheck extra row checkboxes.
*   **Parameters**:
    *   `rowIds`: (Array) An array containing unique row ID (`rowIdField` value) as elements.
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `addUncheckedRowsByValue`
*   **Type**: Method
*   **Version**: 2.11.0
*   **Description**: If extra row checkboxes are set, this method unchecks rows where the `dataField` value matches a specific value. This is useful when you want to partially uncheck extra row checkboxes.
*   **Parameters**:
    *   `dataField`: (String) The field name in the row item to be unchecked.
    *   `values`: (Array or String) The value(s) of the field to be unchecked. If unchecking multiple values, set as an array (e.g., `["Anna", "Steve"]`).
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `appendData`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Appends additional data to the bottom (end) of the existing grid data.
*   **Parameters**:
    *   `additionalData`: (Array) The data to append.
*   **Also See**: `prependData`
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `bind`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Binds events to handle grid events.
*   **Parameters**:
    *   `type`: (String or Array) The type of event(s) to bind.
    *   `function`: (Function) The event handler function.
*   **Example**:
    ```javascript
    // To handle cellClick event:
    AUIGrid.bind(myGridID, "cellClick", function( event ) {
        console.log("rowIndex : " + event.rowIndex + ", "columnIndex : " + event.columnIndex + " clicked");
    });
    // To handle multiple events at once (set event types as an array):
    AUIGrid.bind(myGridID, ["cellClick", "headerClick", "footerClick"], function( event ) {
        if(event.type === "cellClick") console.log("You clicked cell : " + event.value);
        else if(event.type === "headerClick") console.log("You clicked header : " + event.headerText);
    });
    ```
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `changeColumnLayout`
*   **Type**: Method
*   **Version**: 3.0
*   **Description**: Changes the column layout of the grid. Changes the column structure of the initially displayed grid to a different column layout.
*   **Parameters**:
    *   `columnLayout`: (Array-Object) The new column layout to change to.
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `changeExtraColumnOrders`
*   **Type**: Method
*   **Version**: 3.0.16.1
*   **Description**: Changes the order of extra columns: row drag & drop handle (`showDragKnobColumn`), row number (`showRowNumColumn`), row status (`showStateColumn`), and row checkbox (`showRowCheckColumn`).
*   **Parameters**:
    *   `orders`: (Array) An array specifying the extra column property names in the desired order.
*   **Example**:
    ```javascript
    // Reorder extra columns: row number, status, dragging handle, checkbox
    AUIGrid.changeExtraColumnOrders(myGridID, ["showRowNumColumn", "showStateColumn", "showDragKnobColumn", "showRowCheckColumn"]);
    // Move extra checkbox column to the front, maintain default order for others (by not specifying them in the array)
    AUIGrid.changeExtraColumnOrders(myGridID, ["showRowCheckColumn"]);
    ```
*   **See Also**: `extraColumnOrders`, `changeExtraColumnWidth`, `showExtraColumn`, `hideExtraColumn`
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `changeExtraColumnWidth`
*   **Type**: Method
*   **Version**: 3.0.16.1
*   **Description**: Changes the width of extra columns: row drag & drop handle (`showDragKnobColumn`), row number (`showRowNumColumn`), row status (`showStateColumn`), and row checkbox (`showRowCheckColumn`). The width properties for extra columns are:
    *   Row drag & drop handle: `"dragKnobColumnWidth"`
    *   Row checkbox: `"rowCheckColumnWidth"`
    *   Row number: `"rowNumColumnWidth"`
    *   Row status: `"stateColumnWidth"`
*   **Parameters**:
    *   `name`: (String) The name of the extra column width property.
    *   `width`: (Number) The new width to set.
*   **Example**:
    ```javascript
    // Change row number column width to 150
    AUIGrid.changeExtraColumnWidth(myGridID, "rowNumColumnWidth", 150);
    // Change extra checkbox column width to 100
    AUIGrid.changeExtraColumnWidth(myGridID, "rowCheckColumnWidth", 100);
    ```
*   **See Also**: `changeExtraColumnOrders`, `showExtraColumn`, `hideExtraColumn`
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `changeFooterLayout`
*   **Type**: Method
*   **Version**: 3.0
*   **Description**: Changes the footer layout of the grid. Changes the footer of the initially displayed grid to a different footer.
*   **Parameters**:
    *   `footerLayout`: (Array-Object) The new footer layout to change to.
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `clearFilter`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: If filtering is set, this method clears the filtering for the specified column. Requires `enableFilter` property to be set to `true`.
*   **Parameters**:
    *   `dataField`: (String) The `dataField` of the column whose filter is to be cleared.

### `clearFilterAll`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Clears all filtering.

### `clearGridData`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Initializes all grid data, making the grid empty.

### `clearSelection`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Initializes all selected items.

### `clearSortingAll`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: If sorting is set, this method initializes all sorting.

### `clearUndoRedoStack`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Initializes the Undo/Redo command stack.
*   **Also See**: `undo`, `redo`, `redoable`
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `closeFilterLayer`
*   **Type**: Method
*   **Version**: 2.9.3
*   **Description**: If a grid filter is set and the filter layer (filter menu) is open, this method closes it.
*   **Example**:
    ```javascript
    // Closes the filter layer (filter menu) if it is open.
    AUIGrid.closeFilterLayer(myGridID);
    ```
*   **Also See**: `openFilterLayer`, `isOpenFilterLayer`
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `collapseAll`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: If the data is represented in a hierarchical structure (tree data), this method closes all nodes and displays only the top-level branches.
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `create`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: This method creates the grid for the first time.
*   **Parameters**:
    *   `pid`: (String) The ID of the Div where the grid will be created.
    *   `columnLayout`: (Object) The column layout to create the grid with.
    *   `gridProps`: (Object) An object of grid properties (key-value) to change during grid creation.
*   **Return**: (String) Returns the ID of the Div where the grid will be created (i.e., returns the `pid` passed as a parameter).
*   **Also See**: `destroy`
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `destroy`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Completely removes the created grid. If you need to dynamically create and remove grids, always use this method to remove them.
*   **Also See**: `create`
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `expandAll`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: If the data is represented in a hierarchical structure, this method opens all nodes, performing a full expansion.
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `expandItemByRowId`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: For a hierarchical grid (tree grid), if the item corresponding to the unique row ID (`rowIdField` value) is a branch, this method opens/closes it.
*   **Parameters**:
    *   `rowIds`: (Array or String) The unique row ID (`rowIdField` value) (specify as an Array for multiple).
    *   `open`: (Boolean) Whether to open or close (if `true`, opens).
    *   `recursive`: (Boolean) Whether to open all descendants of the item.

### `exportToCsv`
*   **Type**: Method
*   **Version**: 3.0.13
*   **Description**: Exports the current data displayed in the grid to a downloadable CSV format.
*   **Parameters**:
    *   `exportProps`: (Object) Parameters for specifying file name, etc., when exporting.
        *   **`exportProps` Parameters**:
            *   `afterRequestCallback`: (Function) Specifies a callback function to be called after export.
            *   `alwaysQuotes`: (Boolean) Specifies whether to enclose all values in double quotes. Performance may be lower if this property is set to `false` (when checking for commas in values).
            *   `beforeRequestCallback`: (Function) Specifies a callback function to be called before export.
            *   `fileName`: (String) If a file name is specified for export, it can be received as a parameter on the server side.
            *   `localControl`: (Boolean) Specifies whether to return data as a Blob instead of handling download (default: `false`).
            *   `localControlFunc`: (Function) If `localControl` is set to `true`, this function returns a Blob after the grid completes CSV formatting.
            *   `localAsText`: (Boolean) If `localControl` is set to `true`, specifies whether to replace the `localControlFunc` parameter with a String instead of a Blob (default: `false`).
            *   `progressBar`: (Boolean) Indicates whether to show export progress as a percentage (default: `false`).
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `exportToJson`
*   **Type**: Method
*   **Version**: 3.0.13
*   **Description**: Exports the current data displayed in the grid to a downloadable JSON format.
*   **Parameters**:
    *   `exportProps`: (Object) Parameters for specifying file name, etc., when exporting.
        *   **`exportProps` Parameters**:
            *   `afterRequestCallback`: (Function) Specifies a callback function to be called after export.
            *   `beforeRequestCallback`: (Function) Specifies a callback function to be called before export.
            *   `fileName`: (String) If a file name is specified for export, it can be received as a parameter on the server side.
            *   `keyValueMode`: (Boolean) Indicates whether to export row data as an array matching column indexes or as an array of objects with key-value pairs.
            *   `localControl`: (Boolean) Specifies whether to return data as a Blob instead of handling download (default: `false`).
            *   `localControlFunc`: (Function) If `localControl` is set to `true`, this function returns a Blob after the grid completes JSON formatting.
            *   `localAsText`: (Boolean) If `localControl` is set to `true`, specifies whether to replace the `localControlFunc` parameter with a String instead of a Blob (default: `false`).
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `exportToObject`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Exports the current data displayed in the grid to a JavaScript Array-Object.
*   **Parameters**:
    *   `keyValueMode`: (Boolean) Indicates whether to export row data as an array matching column indexes or as an array of objects with key-value pairs.
        *   If `keyValueMode` is `true`, the structure of one row is: `[{"name" : "Anna", "country" : "USA" .... }]`
        *   If `keyValueMode` is `false`, the structure of one row is: `[ "Anna", "USA", .... ]`
*   **Return**: (Array) The grid's Array-Object data.
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `exportToPdf`
*   **Type**: Method
*   **Version**: 3.0.12
*   **Description**: Exports the current data displayed in the grid to a downloadable PDF.
    *   When exporting to PDF, cell merge related properties are ignored, and only uniform row heights are exported. Variable row heights due to `wordWrap` cannot be exported.
    *   PDF export is not suitable for long texts. The column size must be large enough to accommodate the text.
    *   Only font color, background color, italic, bold, and underline styles set in the grid are considered for export.
    *   Provides only minimal PDF export functionality.
    *   Available in browsers that fully support HTML5.
    *   PDFs have a defined size limit for export. The maximum size is 4A0 paper size: 1682 x 2378mm (66.2 x 93.6 inches).
*   **Parameters**:
    *   `exportProps`: (Object) Parameters for specifying file name, header, and footer text when exporting to PDF.
        *   **`exportProps` Parameters**:
            *   `fontPath` must be specified for PDF saving.
            *   `afterRequestCallback`: (Function) Specifies a callback function to be called after export.
            *   `beforeRequestCallback`: (Function) Specifies a callback function to be called before export.
            *   `fontPath`: (String) The URL path to the font to be used when creating the PDF file (required).
            *   `compress`: (Boolean) Specifies whether to compress the PDF file (default: `false`).
            *   `fileName`: (String) If a file name is specified for PDF export, it can be received as a parameter on the server side.
            *   `isRowStyleFront`: (Boolean) Specifies whether row styles are applied above column styles (default: `true`).
            *   `localControl`: (Boolean) Specifies whether to return data as a Blob instead of handling download (default: `false`).
            *   `localControlFunc`: (Function) If `localControl` is set to `true`, this function returns a Blob after the grid completes PDF formatting.
            *   `headers`: (Array) Specifies additional rows to display at the top of the grid. Can be titles or subtitles.
            *   `footers`: (Array) Specifies additional rows to display at the bottom of the grid.
        *   `headers` and `footers` are Arrays, containing Objects as elements, where each Object represents one row.
        *   Each Object has `text`, `height`, and `style` fields:
            *   `text`: (String) The text to display in the PDF.
            *   `height`: (Number) Specifies the height of the row in the PDF (in px units; actual PDF is pt. Grid converts px to pt, so specify in px units).
            *   `style`: (Object) Specifies the style of the row (valid values: `fontSize`, `textAlign`, `underline`, `background`, `color`).
*   **Example**:
    ```javascript
    // PDF export properties
    const exportProps = {
        // File name for saving
        fileName : "2024년_지역별_매출_내역(AUIGrid)",
        // Font path (required)
        fontPath : "./pdfkit/jejugothic-regular.ttf",
        // Header content
        headers : [{ text : "", height:20 }, // First row empty
                   { text : "2024년 지역별 매출 내역", height:24, style : { fontSize:20, textAlign:"center", underline:true, background:"#DAD9FF"} },
                   { text : "작성자 : 에이유아이", style : { textAlign:"right"} },
                   { text : "작성일 : 2025. 03. 29", style : { textAlign:"right"} },
                   { text : "", height:5, style : { background:"#555555"} }], // Empty row for border
        // Footer content
        footers : [{ text : "", height:5, style : { background:"#555555"} }, // Empty row for border
                   { text : "참고 : 문의 사항은 전산팀으로 연락 하십시오.", style : { fontSize:15, color:"#2F9D27"} },
                   { text : "Copyright AUISoft", height:24, style : { textAlign:"right", color:"#ffffff", background:"#222222"} }]
    };
    // Execute export
    AUIGrid.exportToPdf(myGridID, exportProps);
    ```
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `exportToTxt`
*   **Type**: Method
*   **Version**: 3.0.13
*   **Description**: Exports the current data displayed in the grid to a downloadable TXT format.
*   **Parameters**:
    *   `exportProps`: (Object) Parameters for specifying file name, etc., when exporting.
        *   **`exportProps` Parameters**:
            *   `afterRequestCallback`: (Function) Specifies a callback function to be called after export.
            *   `beforeRequestCallback`: (Function) Specifies a callback function to be called before export.
            *   `fileName`: (String) If a file name is specified for export, it can be received as a parameter on the server side.
            *   `localControl`: (Boolean) Specifies whether to return data as a Blob instead of handling download (default: `false`).
            *   `localControlFunc`: (Function) If `localControl` is set to `true`, this function returns a Blob after the grid completes TXT formatting.
            *   `localAsText`: (Boolean) If `localControl` is set to `true`, specifies whether to replace the `localControlFunc` parameter with a String instead of a Blob (default: `false`).
            *   `progressBar`: (Boolean) Indicates whether to show export progress as a percentage (default: `false`).
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `exportToXlsx`
*   **Type**: Method
*   **Version**: 3.0.14
*   **Description**: Exports the current data displayed in the grid to a downloadable Excel (xlsx) format.
    *   When exporting to Excel, the overall content of the grid is exported as is.
    *   However, not all styles set in the grid are exported to Excel. Only font color (`color`), background color (`background-color`), italic (`font-style: italic`), bold (`font-weight: bold`), and underline (`text-decoration: underline`) are considered for export.
*   **Parameters**:
    *   `exportProps`: (Object) Parameters for specifying file name, header, and footer text when exporting to Excel.
        *   **`exportProps` Parameters**:
            *   `afterRequestCallback`: (Function) Specifies a callback function to be called after Excel export.
            *   `beforeRequestCallback`: (Function) Specifies a callback function to be called before Excel export.
            *   `baseFontSize`: (Number) Explicitly specifies the base font size for Excel.
            *   `columnSizeOfDataField`: (Object) Specifies the size of columns when exporting to Excel.
            *   `compress`: (Boolean) Specifies whether to compress the Excel file (default: `false`).
            *   `exceptColumnFields`: (Array) Specifies the `dataField`s of columns to exclude from Excel saving.
            *   `exportWithStyle`: (Boolean) Indicates whether to export style information (font, color, etc.) along with Excel data.
            *   `fileName`: (String) If a file name is specified for Excel export, it can be received as a parameter on the server side.
            *   `fontFamily`: (String) Specifies the font name to be applied when saving to Excel (default: "맑은 고딕"). For example, set to "Arial" to apply Arial font.
            *   `isRowStyleFront`: (Boolean) Specifies whether row styles are applied above column styles (default: `true`).
            *   `localControl`: (Boolean) Specifies whether to return Excel data as a Blob instead of handling download (default: `false`).
            *   `localControlFunc`: (Function) If `localControl` is set to `true`, this function returns a Blob after the grid completes Excel formatting.
            *   `preserveSpace`: (Boolean) Specifies whether to preserve leading or trailing spaces in values (default: `false`).
            *   `progressBar`: (Boolean) Indicates whether to show export progress as a percentage (default: `false`).
            *   `rowHeight`: (Number) Explicitly specifies the row height in Excel. Ignored if `wordWrap` is used. Default follows the grid's `rowHeight` property.
            *   `sheetName`: (String) Specifies the sheet name in Excel when exporting (default: "Sheet 1").
            *   `showRowNumColumn`: (Boolean) Indicates whether to show the row number column when exporting to Excel. Default follows the grid's `showRowNumColumn` property.
            *   `fixedColumnCount`: (Number) Arbitrarily specifies the fixed columns in Excel when exporting.
            *   `fixedRowCount`: (Number) Arbitrarily specifies the fixed rows in Excel when exporting.
            *   `headers`: (Array) Specifies additional rows to display at the top of the grid. Can be titles or subtitles.
            *   `footers`: (Array) Specifies additional rows to display at the bottom of the grid.
            *   `rectangles`: (Array) Specifies text boxes in Excel.
        *   `headers` and `footers` are Arrays, containing Objects as elements, where each Object represents one row in Excel.
        *   Each Object has `text`, `height`, and `style` fields:
            *   `text`: (String) The text to display in Excel.
            *   `height`: (Number) Specifies the height of the row in Excel (in px units; actual Excel is pt. Grid converts px to pt, so specify in px units).
            *   `style`: (Object) Specifies the style of the row.
                *   `fontSize`: (Number) Font size.
                *   `textAlign`: (String) Text alignment (valid values: "left", "center", "right").
                *   `verticalAlign`: (String) Vertical alignment of text (valid values: "top", "middle", "bottom").
                *   `color`: (String) Font color RGB.
                *   `background`: (String) Background color RGB.
                *   `fontStyle`: (String) Italic style (valid values: "normal", "italic").
                *   `fontWeight`: (String) Bold style (valid values: "normal", "bold").
                *   `underline`: (Boolean) Underline.
        *   `rectangles` is an Object with `text`, `dimension`, and `style` fields.
            *   `text`: (String) The text to output in the text box.
            *   `dimension`: (Object) Information about the text box position.
                *   `fromColIdx`: (Number) Starting `columnIndex` where the box is located (i.e., horizontal start point).
                *   `toColIdx`: (Number) Ending `columnIndex` of the box (i.e., horizontal end point).
                *   `fromRowIdx`: (Number) Starting `rowIndex` where the box is located (i.e., vertical start point).
                *   `toRowIdx`: (Number) Ending `rowIndex` of the box (i.e., vertical end point).
                *   `fromRowOff`, `toRowOff`, `fromColOff`, `toColOff`: (Number) Specifies the offset in px from each index.
            *   `style`: Specifies the style of the text box.
                *   `fontSize`: (Number) Font size.
                *   `textAlign`: (String) Text alignment (valid values: "left", "center", "right").
                *   `verticalAlign`: (String) Vertical alignment of text (valid values: "top", "middle", "bottom").
                *   `color`: (String) Font color RGB.
                *   `background`: (String) Background color RGB.
                *   `fontStyle`: (String) Italic style (valid values: "normal", "italic").
                *   `fontWeight`: (String) Bold style (valid values: "normal", "bold").
                *   `underline`: (Boolean) Underline.
                *   `borderColor`: (String) Border color RGB.
                *   `borderThickness`: (Number) Border thickness.
*   **Example**:
    ```javascript
    // Excel export properties
    const exportProps = {
        // File name for saving
        fileName : "2024년_지역별_매출_내역(AUIGrid)",
        // Exclude columns with dataField "name" and "product" from saving
        exceptColumnFields : ["name", "product"],
        // Set width of "price" column to 200 for export
        columnSizeOfDataField : { "price" : 200 },
        // Header content
        headers : [{ text : "", height:20 }, // First row empty
                   { text : "2024년 지역별 매출 내역", height:24, style : { fontSize:20, textAlign:"center", fontWeight:"bold", underline:true, background:"#DAD9FF"} },
                   { text : "작성자 : 에이유아이", style : { textAlign:"right"} },
                   { text : "작성일 : 2025. 03. 29", style : { textAlign:"right"} },
                   { text : "", height:5, style : { background:"#555555"} }], // Empty row for border
        // Footer content
        footers : [{ text : "", height:5, style : { background:"#555555"} }, // Empty row for border
                   { text : "참고 : 문의 사항은 전산팀으로 연락 하십시오.", style : { fontSize:15, color:"#2F9D27"} },
                   { text : "Copyright AUISoft", height:24, style : { textAlign:"right", fontWeight:"bold", color:"#ffffff", background:"#222222"} }]
    };
    // Execute export
    AUIGrid.exportToXlsx(myGridID, exportProps);
    ```
*   **Related Demo**: [View Related Demo](javascript:void(0)) | [View Related Demo](javascript:void(0))

### `exportToXlsxMulti`
*   **Type**: Method
*   **Version**: 3.0.6
*   **Description**: Exports the current data displayed in multiple grids to separate sheets within a single Excel (xlsx) file.
*   **Parameters**:
    *   `subGridIds`: (Array) An array of `pid`s for sub-grids to be exported together into separate sheets.
    *   `exportProps`: (Array) An array defining the export properties for each grid.
        *   **`exportProps` Parameters**:
            *   `exportProps` is an Array containing Objects as elements. Each Object has the following properties.
            *   The first element of the array corresponds to the master grid for Sheet 1, and subsequent elements correspond to sub-grids.
            *   Refer to `exportToXlsx`'s `exportProps` for master grid `exportProps` creation.
            *   The following are specific properties available for sub-grids in `exportProps`:
                *   `exceptColumnFields`: (Array) Specifies the `dataField`s of columns to exclude from Excel saving.
                *   `exportWithStyle`: (Boolean) Indicates whether to export style information (font, color, etc.) along with Excel data.
                *   `isRowStyleFront`: (Boolean) Specifies whether row styles are applied above column styles (default: `true`).
                *   `sheetName`: (String) Specifies the sheet name in Excel when exporting (default: "Sheet 1").
                *   `fixedColumnCount`: (Number) Arbitrarily specifies the fixed columns in Excel when exporting.
                *   `fixedRowCount`: (Number) Arbitrarily specifies the fixed rows in Excel when exporting.
                *   `headers`: (Array) Specifies additional rows to display at the top of the grid. Can be titles or subtitles.
                *   `footers`: (Array) Specifies additional rows to display at the bottom of the grid.
*   **Example**:
    ```javascript
    const exportProps = [{ sheetName : "일반 데이터" },
                         { sheetName : "그룹핑 셀병합 Type 1" },
                         { sheetName : "그룹핑 셀병합 Type 2", },
                         { sheetName : "그룹핑 셀병합 Type 3" }];
    // Export multiple grids to a single Excel file
    AUIGrid.exportToXlsxMulti(myGridID1, [myGridID2, myGridID3, myGridID4], exportProps);
    ```
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `exportToXml`
*   **Type**: Method
*   **Version**: 3.0.13
*   **Description**: Exports the current data displayed in the grid to a downloadable XML format.
*   **Parameters**:
    *   `exportProps`: (Object) Parameters for specifying file name, etc., when exporting.
        *   **`exportProps` Parameters**:
            *   `afterRequestCallback`: (Function) Specifies a callback function to be called after export.
            *   `beforeRequestCallback`: (Function) Specifies a callback function to be called before export.
            *   `fileName`: (String) If a file name is specified for export, it can be received as a parameter on the server side.
            *   `localControl`: (Boolean) Specifies whether to return data as a Blob instead of handling download (default: `false`).
            *   `localControlFunc`: (Function) If `localControl` is set to `true`, this function returns a Blob after the grid completes XML formatting.
            *   `localAsText`: (Boolean) If `localControl` is set to `true`, specifies whether to replace the `localControlFunc` parameter with a String instead of a Blob (default: `false`).
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `forceEditingComplete`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: If in editing mode (`editable=true`), this method forces the input value to complete or cancel editing. This method is only valid when editing has been initiated (e.g., by double-click or F2 key). Use this method if you want to force the value of a custom edit renderer to complete or cancel. If you want to complete editing with the current value in the input, set `value` to `null`.
*   **Parameters**:
    *   `value`: (Object) The value to set.
    *   `cancel`: (Boolean) If `true`, editing will be canceled.

### `getAddedColumnFields`
*   **Type**: Method
*   **Version**: 3.0
*   **Description**: Returns an array of `dataField`s of columns added to the grid. If a user adds a column and then deletes it, it will not be included in the added columns.
*   **Return**: (Array) `dataField`s of added columns.

### `getAddedRowItems`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Returns an array of items added to the grid.
*   **Return**: (Array) Added row items.
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `getAscendantsByRowId`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: For a tree grid (hierarchical grid), finds and returns an array of all ancestor row items corresponding to the unique row ID (`rowIdField` value).
*   **Parameters**:
    *   `rowId`: (String) The unique row ID (`rowIdField` value).
*   **Return**: (Array) All ancestor row items for the given unique row ID (`rowIdField` value).

### `getCellElementByIndex`
*   **Type**: Method
*   **Version**: 3.0.7.13
*   **Description**: Returns the element of the grid cell corresponding to the given index. The cell element refers to the TD element.
*   **Parameters**:
    *   `rowIndex`: (Number) The row index of the cell.
    *   `columnIndex`: (Number) The column index of the cell.
*   **Return**: (Element Object) The TD element of the corresponding cell.

### `getCellFormatValue`
*   **Type**: Method
*   **Version**: 2.8.1
*   **Description**: Returns the formatted value of a specific cell in the grid.
*   **Parameters**:
    *   `rowIndex`: (Number) The row index to get.
    *   `dataField` or `columnIndex`: (String or Number) The `dataField` or column index of the column to get.
*   **Example**:
    ```javascript
    // Get the formatted value of the "price" column in the 0th row
    const myValue = AUIGrid.getCellFormatValue(myGridID, 0, "price");
    // Get the formatted value of the cell at (3, 1) (3rd row, 1st column)
    const myValue = AUIGrid.getCellFormatValue(myGridID, 3, 1);
    ```
*   **Return**: The formatted value of the selected cell.
*   **Note**: The difference between `getCellValue` and `getCellFormatValue` is whether the value is formatted. For example, when the output format of a value is changed with `labelFunction` or `formatString` in a column, `getCellValue` returns the original value, and `getCellFormatValue` returns the value with `labelFunction` or `formatString` applied.
*   **Also See**: `getItemByRowIndex`, `setCellValue`, `getCellValue`

### `getCellValue`
*   **Type**: Method
*   **Version**: 2.8.0
*   **Description**: Returns the value of a specific cell in the grid.
*   **Parameters**:
    *   `rowIndex`: (Number) The row index to get.
    *   `dataField` or `columnIndex`: (String or Number) The `dataField` or column index of the column to get.
*   **Return**: The value of the selected cell.
*   **Example**:
    ```javascript
    // Get the value of the "name" column in the 0th row
    const myValue = AUIGrid.getCellValue(myGridID, 0, "name");
    // Get the value of the cell at (3, 1) (3rd row, 1st column)
    const myValue = AUIGrid.getCellValue(myGridID, 3, 1);
    ```
*   **Note**: The difference between `getCellValue` and `getCellFormatValue` is whether the value is formatted. For example, when the output format of a value is changed with `labelFunction` or `formatString` in a column, `getCellValue` returns the original value, and `getCellFormatValue` returns the value with `labelFunction` or `formatString` applied.
*   **Also See**: `getItemByRowIndex`, `setCellValue`, `getCellFormatValue`
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `getCheckedRowItems`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: If extra row checkboxes are set, this method returns an array containing all checked row items and their row indexes.
*   **Return**: (Array) Array of checked row items and row indexes.
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `getCheckedRowItemsAll`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: If extra row checkboxes are set, this method returns all checked row items. This method returns an array containing pure row items as elements. That is, while `getCheckedRowItems` returns an array of row items and row indexes, this method returns an array containing pure row items as elements. For tree grids, if a checked row is hidden due to a parent's open/close state, `getCheckedRowItems()` does not return the hidden row item. If you want to get hidden row items in a tree grid, use `getCheckedRowItemsAll()`.
*   **Return**: (Array) Array of checked row items.
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `getColumnCount`
*   **Type**: Method
*   **Version**: 3.0
*   **Description**: Returns the total number of columns currently displayed in the grid.
*   **Return**: (Number) Total number of columns.

### `getColumnDistinctValues`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Returns all values output by the grid column, with duplicate values removed.
*   **Note**: `getColumnDistinctValues` returns unique values, while `getColumnValues` returns all values.
*   **Parameters**:
    *   `dataField`: (String) The `dataField` name of the column.
    *   `total`: (Boolean) Whether to target the original grid data. If `false`, it will only target values in the filtered state if filtering is applied.
*   **Return**: (Array) All unique values output by the column (duplicate values removed).

### `getColumnIndexByDataField`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Returns the column index of the current grid that matches the `dataField`.
*   **Parameters**:
    *   `dataField`: (String) The `dataField` name.
*   **Return**: (Number) Column index.

### `getColumnInfoList`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Returns a one-dimensional array containing column information displayed in the grid. If the column layout is set to grouped (hierarchical), this method returns an array containing only information about the lowest-level children. If not grouped, this return value is the same as the value of the `getColumnLayout()` method.
*   **Return**: (Array) Current grid column layout.

### `getColumnItemByDataField`
*   **Type**: Method
*   **Version**: 2.8.0
*   **Description**: Returns the column object from the column layout that matches the `dataField`.
*   **Parameters**:
    *   `dataField`: (String) The `dataField` name output by the column.
*   **Return**: (Object) Column object from the column layout.

### `getColumnItemByIndex`
*   **Type**: Method
*   **Version**: 3.0.12.0
*   **Description**: Returns the column object from the column layout that matches the column index (`columnIndex`).
*   **Parameters**:
    *   `columnIndex`: (Number) The index where the column is displayed.
*   **Return**: (Object) Column object from the column layout.

### `getColumnLayout`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Returns the current column layout displayed in the grid.
*   **Return**: (Array) Current grid column layout.

### `getColumnValues`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Returns all values output by the grid column.
*   **Note**: `getColumnDistinctValues` returns unique values, while `getColumnValues` returns all values.
*   **Parameters**:
    *   `dataField`: (String) The `dataField` name of the column.
    *   `total`: (Boolean) Whether to target the original grid data. For example, if filtering is applied, specify `true` to ignore filtering and target all data.
*   **Return**: (Array) All values output by the column.

### `getColumnWidthByDataField`
*   **Type**: Method
*   **Version**: 3.0.16.13
*   **Description**: Returns the current width of the column that matches the `dataField`.
*   **Parameters**:
    *   `dataField`: (String) The `dataField` name.
*   **Return**: (Number) Current width of the column.
*   **Example**:
    ```javascript
    // Get the current width of "name"
    const width = AUIGrid.getColumnWidthByDataField(myGridID, "name");
    ```

### `getColumnWidthList`
*   **Type**: Method
*   **Version**: 3.0.16.13
*   **Description**: Returns an array of all current widths of the columns. That is, it returns the widths of the columns in their currently displayed state.
*   **Return**: (Array) Array of all column widths.

### `getCurrentPageData`
*   **Type**: Method
*   **Version**: 3.0.11.0
*   **Description**: If in paging mode (`usePaging=true`), returns only the data displayed on the current page.

### `getDataFieldByColumnIndex`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Returns the `dataField` currently displayed at the given column index of the grid.
*   **Parameters**:
    *   `columnIndex`: (Number) The column index.
*   **Return**: (String) `dataField` name.

### `getDepthByRowId`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: For a hierarchical grid (tree grid), returns the depth of the row item corresponding to the unique row ID (`rowIdField` value). The depth starts at 1 for the top level and increases by 1 for each subsequent level.
*   **Parameters**:
    *   `rowId`: (String) The unique row ID (`rowIdField` value).
*   **Return**: (Number) Depth in the hierarchical structure.

### `getDescendantsByRowId`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: For a tree grid (hierarchical grid), finds and returns an array of all descendant row items corresponding to the unique row ID (`rowIdField` value).
*   **Parameters**:
    *   `rowId`: (String) The unique row ID (`rowIdField` value).
*   **Return**: (Array) All descendant row items for the given unique row ID (`rowIdField` value).

### `getEditedRowColumnItems`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Returns an array of modified items in the grid. Unlike `getEditedRowItems()`, this method does not return the entire row item. For example, if there are 10 columns in total and only 2 columns are modified, it returns only those 2 columns. If you want to get the entire row item, use `getEditedRowItems()`. If you want to get only the truly modified columns in a row, use this method. Modified items do not include items that were added using the `addRow` method and then modified, because items added with `addRow` are ultimately considered added items (can be checked with `getAddedRowItems`).
*   **Return**: (Array) Modified row items.
*   **Also See**: `getEditedRowItems`
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `getEditedRowItems`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Returns an array of modified items in the grid. Modified items do not include items that were added using the `addRow` method and then modified, because items added with `addRow` are ultimately considered added items (can be checked with `getAddedRowItems`).
*   **Return**: (Array) Modified row items.
*   **Also See**: `getEditedRowColumnItems`
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `getFilterCache`
*   **Type**: Method
*   **Version**: 3.0.11.2
*   **Description**: If filtering is applied, returns information about which fields and values are currently being used for filtering. This method is generally used with the `setFilterCache` method.
*   **Return**: (Object) Information about filtering fields and currently filtered values.
*   **Also See**: `setFilterCache`

### `getFilterInlineTexts`
*   **Type**: Method
*   **Version**: 3.0.11.9
*   **Description**: If inline filter rows are displayed and filtering is applied, returns the current texts (input values) of those inline filters. This method is generally used with the `setFilterInlineTexts` method.
*   **Return**: (Array) Text values for columns filtered by inline filters.
*   **Also See**: `setFilterInlineTexts`
*   **Related Demo**: [View Related Demo](javascript:void(0))

### `getFitColumnSizeByDataField`
*   **Type**: Method
*   **Version**: 3.0.15.2
*   **Description**: Returns the optimal column size for the specified column. The optimal column size refers to the column size that matches the length of the text displayed in that column. For renderers like `ImageRenderer`, `TemplateRenderer` (not text), the set `widthFit` value is applied.
*   **Parameters**:
    *   `dataField`: (String) The `dataField` name of the column.
*   **Return**: (Number) The size of the column.

### `getFitColumnSizeList`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Investigates the length of all cells, including the currently displayed header text, and returns the optimal column sizes as an array. The optimal column size refers to the column size that matches the length of the text displayed in that column. For renderers like `ImageRenderer`, `TemplateRenderer` (not text), the set `widthFit` value is applied.
*   **Parameters**:
    *   `fitToGrid`: (Boolean) Specifies whether to adjust to the grid size if the sum of all column sizes is smaller than the total grid size (default: `false`).
*   **Return**: (Array) An array containing the sizes of all columns.
*   **Note**: Use the values obtained from `getFitColumnSizeList` with the `setColumnSizeList` method.

### `getFooterData`
*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: Returns the footer data currently displayed in the grid. The return type is an array containing Objects as elements. Each Object consists of the following key-value pairs:
    *   `index`: The column index of the displayed value (for footer values displayed in the row number column, `index` is -1).
    *   `value`: The pure value of the footer before formatting (if arbitrarily specified by the user with `labelFunction`, `value` is the same as `text`).
    *   `text`: The actually displayed formatted value in the footer cell.
*   **Return**: (Array) Displayed footer data.

### `getFooterFormatValueByDataField`
*   **Type**: Method
*   **Version**: 3.0.5.8
*   **Description**: If a footer is set, returns the formatted value of a specific field in the footer.
*   **Parameters**:
    *   `dataField`: (String) The `dataField` of the footer's display position.
*   **Return**: (String) Formatted footer value for the corresponding column.
