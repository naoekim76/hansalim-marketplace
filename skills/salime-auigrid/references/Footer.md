# Footer Layout Settings - AUIGrid Documentation

AUIGrid Documentation > AUISoft > AUIGrid 3.0.16 Documentation > Footer

Footer Layout is declared as an Array-Object, similar to how column layouts are declared. Each value you want to output in the footer is a single Object. The order of the Footer Array is independent of the column order. It specifies the `dataField` to operate on and the `positionField` where the result should be displayed.

For example, to calculate the sum of "price" and display it in the footer cell where "price" is outputted:
```javascript
{dataField: "price", operation: "SUM", positionField: "price"}
```

The defined footer layout is set using the grid's `setFooter` method. Below is a configuration example:

```javascript
// Grid footer layout settings
const footerLayout = [
  { labelText : "총 합계", positionField : "#base" },
  { dataField : "price", positionField : "price", operation : "SUM", formatString : "#,##0", style : "aui-grid-my-footer-sum-total" },
  { dataField : "price", positionField : "date", operation : "COUNT", style : "aui-grid-my-footer-sum-total2" },
  { labelText : "Count=>", positionField : "phone", style : "aui-grid-my-footer-sum-total2" }
];

// Set footer layout on the grid
AUIGrid.setFooter(myGridID, footerLayout);
```

## Properties

### `colSpan`
*   **Type**: Number
*   **Version**: 3.0
*   **Description**: Specifies horizontal merging of footer cells. For example, `colSpan: 3` merges 3 footer cells including itself.
*   **Default**: `NaN`

### `dataField`
*   **Type**: String
*   **Description**: Specifies the data field that the footer's operator (`operation` property) will reference. For example, to calculate the "SUM" for "price" and display it below "price", `dataField`, `operation`, and `positionField` would all be "price", "SUM", and "price" respectively.
*   **Default**: `null`

### `expFunction`
*   **Type**: Function
*   **Description**: The footer typically displays values calculated by `dataField` and a predefined operator (`operation`). However, if more extended operations are needed, this function allows custom calculations beyond the basic operations. `expFunction` is a formula function and must return a `Number`.
    *   **Parameters**:
        *   `columnValues (Array)`: All values outputted in the corresponding column if `dataField` is set.
    *   **Example**:
        ```javascript
        expFunction : function(columnValues) {
          // Output the sum of the 0th and last values of the specified dataField
          return Number( columnValues[0] + columnValues[columnValues.length-1] );
        }
        ```
    The return value of the function will be displayed in the footer cell. Ensure the return type is `Number`. If you do not want the calculated value from `expFunction` to be displayed in the footer, do not set `positionField`. This is useful when `expFunction` calculates an intermediate value to be referenced by `labelFunction` in another footer cell.
*   **Default**: `null`

### `formatString`
*   **Type**: String
*   **Description**: Specifies the number format for numeric values displayed in the footer. It is the same as the column's `formatString`; refer to the column's `formatString` property for details (e.g., `#,##0`). If the value is not a number, the specified `formatString` is ignored.
*   **Default**: `null`

### `labelFunction`
*   **Type**: Function
*   **Description**: A function to customize the text displayed in the footer cell. Use this property if you want to process and display the calculated value (from `dataField` and `operation`) or `labelText` using JavaScript.
    *   **Parameters**:
        *   `value`: The calculated cell value (if `dataField` and `operation` are set) or the `labelText` value.
        *   `columnValues (Array)`: All values outputted in the corresponding column if `dataField` is set.
        *   `footerValues (Array)`: An array containing all values that the footer will output.
    *   **Example**:
        ```javascript
        labelFunction : function(value, columnValues, footerValues) {
          const myValue = 1000; // Logic processing
          return myString;
        }
        ```
    The return value of the function will be displayed in the cell.
*   **Default**: `null`

### `labelText`
*   **Type**: String
*   **Description**: Used to specify plain text in the footer instead of an operated value. For example, use this property to display general text like "Total Sum".
*   **Default**: `null`

### `operation`
*   **Type**: String
*   **Description**: Specifies the operator. Supported footer operations are `SUM`, `AVG`, `MIN`, `MAX`, `COUNT`. Operations other than these can be calculated using `expFunction`. If `expFunction` is defined, `operation` is ignored.
*   **Default**: `null`

### `positionField`
*   **Type**: String
*   **Description**: Specifies the data field where the footer value will be positioned. It will be displayed below the corresponding column's `dataField` as defined in the column layout. For example, to calculate the "SUM" for "price" and display it below "price", `dataField`, `operation`, and `positionField` would all be "price", "SUM", and "price" respectively. The `dataField` and `positionField` do not need to be the same. If you want to display the sum of "price" below the "date" column, set `positionField` to "date". If `positionField` is not set, it will not be displayed in the footer. Setting `positionField` to `"#base"` will display it below the row number column.
*   **Default**: `null`

### `postfix`
*   **Type**: String
*   **Description**: Specifies a suffix for the text displayed in the footer cell. For example, to add "만원" (Korean Won) to the number 1000, set this property to '만원'.
*   **Default**: `""`

### `prefix`
*   **Type**: String
*   **Description**: Specifies a prefix for the text displayed in the footer cell. For example, to add a dollar sign ($) to the number 1000, set this property to '$'.
*   **Default**: `""`

### `rounding`
*   **Type**: String
*   **Version**: 3.0.6
*   **Description**: Determines how decimal places are rounded, floored, or ceiled when processed by `formatString`. For example, if `formatString` is `#,##0` and the actual value is 12345.6, the default is rounded to "12,346". This property controls the decimal processing method.
    *   **Valid values**:
        *   `"ceil"`: Rounds up decimal places.
        *   `"floor"`: Rounds down decimal places.
        *   `"round"`: Rounds to the nearest decimal place.
*   **Default**: `"round"`

### `style`
*   **Type**: String
*   **Description**: Assigns an individual style to the footer cell. This property's value is a CSS class name. For example, if you have defined a CSS class `.my-custom { color:#ff0000; }`, you would set `style: "my-custom"` to use it. Do not include the dot (`.`). Multiple CSS classes are not supported (e.g., "right-style bold-style font12-style" is not supported). When exporting to Excel, only the font color, background color, bold, and italic styles of the corresponding CSS class are applied.
*   **Default**: `null`

### `styleFunction`
*   **Type**: Function
*   **Description**: A function to dynamically assign individual styles to the cells displayed in the footer. `styleFunction` must be a function.
    *   **Parameters**:
        *   `value`: The calculated cell value (if `dataField` and `operation` are set) or the `labelText` value.
        *   `footerValues (Array)`: An array containing all values that the footer will output.
    *   **Example**:
        ```javascript
        styleFunction : function(value, footerValues) {
          const myStyle = "my-custom-style"; // Logic processing
          return myStyle;
        }
        ```
    The return value of the function must be a CSS class name that has already been declared in CSS. Multiple CSS classes are not supported (e.g., "right-style bold-style font12-style" is not supported).
*   **Default**: `null`

### `xlsxNumeric`
*   **Type**: Boolean
*   **Version**: 3.0.6
*   **Description**: When `formatString` is specified, this determines whether to export the actual numeric value to Excel. For example, if the value is 95.87 and `formatString` is `#,##0`, it will be displayed as 96. `xlsxNumeric` determines whether to export the formatted value (96) or the actual value (95.87) to Excel. If `xlsxNumeric` is set to `true`, the value displayed in the Excel cell will still be 96, but the value seen when double-clicking the cell (or in the Excel formula bar) will be 95.87. `xlsxNumeric` is ignored if formatting is done via `prefix`, `postfix`, or `labelFunction` (it can only be used with `formatString`). It is also only valid when `rounding` is used for decimal place rounding.
*   **Default**: `false`

Copyright(c) 2025 AUISoft Co., Ltd. All Right Reserved
