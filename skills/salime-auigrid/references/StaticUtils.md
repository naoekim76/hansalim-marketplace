# AUIGrid StaticUtils Documentation

This document lists utility static properties and functions available in AUIGrid. These utility static properties and functions can be used anywhere, regardless of whether an AUIGrid instance has been created.

---

## `create`

*   **Type**: Method
*   **Version**: 2.7.0
*   **Description**: This method is used to create a grid for the first time.

    **Parameters**:
    *   `pid`: (String) The ID of the `Div` element where the grid will be created.
    *   `columnLayout`: (Object) The column layout object for creating the grid.
    *   `gridProps`: (Object) An object containing key-value pairs of grid properties to modify during creation.

    **Return**: (String) Returns the `Div` ID where the grid was created (i.e., returns the `pid` passed as a parameter).

---

## `defaultProps`

*   **Type**: Object
*   **Version**: 2.11.0
*   **Description**: This static property allows you to set the default properties for AUIGrid. When an AUIGrid is created, it extends these `defaultProps`. Therefore, you should define common settings or text properties for internationalization here, which will be applied to every grid created on the page.

    **Usage Example**:
    ```javascript
    AUIGrid.defaultProps = {
        editable : true,
        filterOkText : "Okay",
        filterCancelText : "Cancel"
    };
    ```
    Add this code to a common project file (e.g., `common.js`, or `AUIGridDefault.js`). Then, when grids are created, `defaultProps` will be applied as default values.
    **Default**: `null`

---

## `formatDate`

*   **Type**: Function
*   **Version**: 2.8.1
*   **Description**: This function can be used to format dates using the same date formatting method as AUIGrid.

    **Parameters**:
    *   `date`: (String) The date to format.
    *   `formatString`: (String) The format string to output the date in the desired form.

    **Available Date Format Strings (`formatString`)**:
    *   `yy`: Year (2 digits, e.g., 15)
    *   `yyyy`: Year (4 digits, e.g., 2015)
    *   `m`: Month (1 digit)
    *   `mm`: Month (2 digits)
    *   `mmm`: Month (3-letter English name, e.g., Jan)
    *   `mmmm`: Month (Full English name, e.g., January)
    *   `d`: Day (1 digit, e.g., 1)
    *   `dd`: Day (2 digits, e.g., 01)
    *   `ddd`: Korean day of the week (e.g., 월, 화, 수)
    *   `dddd`: English day of the week (3-letter name, e.g., Mon, Tue)
    *   `h`: Hours (12-hour format, 1 digit)
    *   `hh`: Hours (12-hour format, 2 digits)
    *   `H`: Hours (24-hour format, 1 digit)
    *   `HH`: Hours (24-hour format, 2 digits)
    *   `M`: Minutes (1 digit)
    *   `MM`: Minutes (2 digits)
    *   `s`: Seconds (1 digit)
    *   `ss`: Seconds (2 digits)
    *   `t`: AM/PM in Korean (e.g., 오전, 오후)
    *   `tt`: AM/PM as `am` or `pm`
    *   `T`: AM/PM as `A` or `P`
    *   `TT`: AM/PM as `AM` or `PM`

    **Usage Example**:
    ```javascript
    const fd = AUIGrid.formatDate("2017/01/01", "yyyy년 mm월 dd일");
    console.log(fd); // "2017년 01월 01일" 출력됨.
    const fd2 = AUIGrid.formatDate("20170101", "yyyy. m. d");
    console.log(fd2); // "2017. 1. 1." 출력됨
    const fd3 = AUIGrid.formatDate(new Date(), "yyyy. m. d. hh:MM:ss");
    console.log(fd3); // 오늘 현재 날짜 및 시간 출력됨
    ```
    **Return**: (String) Returns the date formatted according to the specified format string.

---

## `formatNumber`

*   **Type**: Function
*   **Version**: 2.8.1
*   **Description**: This function can be used to format numbers using the same number formatting method as AUIGrid.

    **Parameters**:
    *   `number`: (Number) The number to format.
    *   `formatString`: (String) The format string to output the number in the desired form.
    *   `rounding`: (String) Specifies whether to round (`"rounding"`, default), ceil (`"ceil"`), or floor (`"floor"`) the decimal places when formatting. (Valid values: `"rounding"`, `"ceil"`, `"floor"`)

    **Number Format Strings**:
    *   `"0"` vs. `"#"`: `"0"` always fills the digit, `"#"` prints only if present.
    *   `###0`: Integer representation without comma separators.
    *   `####`: Integer representation without comma separators; displays as blank if 0.
    *   `#,##0`: Integer representation with comma separators for thousands.
    *   `#,###`: Integer representation with comma separators for thousands; displays as blank if 0.
    *   `#,##0.0`: Integer with comma separators, one decimal place mandatory (rounds from second decimal place by default).
    *   `#,##0.#`: Integer with comma separators, one decimal place if present (rounds from second decimal place by default); displays as blank if 0.
    *   `#,##0.00`: Integer with comma separators, two decimal places mandatory (rounds from third decimal place by default).
    *   `#,##0.0#`: Integer with comma separators, one decimal place mandatory, two if present (rounds from third decimal place by default).
    *   Supports international formats like `# ##0,00` or `#.#0,00` (e.g., space or dot for thousands, comma for decimals).
    *   Extended: `"000000"` will mandatorily output 6 integer digits. If the value is 1, it will be formatted as `"000001"`.

    **Usage Example**:
    ```javascript
    const fn = AUIGrid.formatNumber(123456.789, "#,##0");
    console.log(fn); // "123,457" 출력됨. (소수점이 기본적으로 반올림됨)
    const fn2 = AUIGrid.formatNumber("123456.789", "#,##0", "floor");
    console.log(fn2); // "123,456" 출력됨
    const fn3 = AUIGrid.formatNumber("123456.789", "#,##0.00");
    console.log(fn3); // "123,456.79" 출력됨
    ```
    **Return**: (String) Returns the number formatted according to the specified format string.

---

## `getActiveGrid`

*   **Type**: Function
*   **Version**: 3.0.6
*   **Description**: Returns the grid that currently has focus within the same Document Object Model (DOM). For example, if two grids are created on a single page, you can get the grid that the user has focused on.

    **Usage Example**:
    ```javascript
    const curActiveGridID = AUIGrid.getActiveGrid();
    console.log(curActiveGridID);
    ```
    **Return**: (Boolean) If there is a currently focused grid, returns the `Div` ID that was set when the grid was created (i.e., returns the `pid` passed as a parameter during creation). If focus is on an element other than a grid, it returns `null`.

---

## `getCreatedGridAll`

*   **Type**: Function
*   **Version**: 3.0.6
*   **Description**: Returns all grids created within the same Document Object Model (DOM).

    **Usage Example**:
    ```javascript
    const gridIds = AUIGrid.getCreatedGridAll();
    console.log(gridIds.length);
    ```
    **Return**: (Array) Returns an array containing the `Div` IDs of the parent elements of the created grids (i.e., returns the `pid` passed as a parameter during creation).

---

## `isCreated`

*   **Type**: Function
*   **Version**: 3.0.0
*   **Description**: Returns whether a grid for the given `pid` has been created.

    **Parameters**:
    *   `pid`: (String) The `pid` of the grid.

    **Return**: (Boolean) Returns `true` if a grid for the given `pid` has been created, otherwise `false`.

---

## `makeValueMasked`

*   **Type**: Function
*   **Version**: 3.0.11
*   **Description**: Applies a mask to the given value and returns the masked value.

    **Parameters**:
    *   `mask`: (String) The mask setting.
    *   `value`: (String) The value to apply the mask to.

    **Usage Example**:
    ```javascript
    const masked = AUIGrid.makeValueMasked("99:99:99", "123456");
    console.log(masked); // "12:34:56" 출력됨
    const masked = AUIGrid.makeValueMasked("(999) 999-999-999", "123456789123");
    console.log(masked); // "(123) 456-789-123" 출력됨
    ```
    **Return**: (String) The masked value. Returns `null` if the given value is not valid for the mask.

---

## `makeValueUnmasked`

*   **Type**: Function
*   **Version**: 3.0.11
*   **Description**: Removes the mask from a masked value and returns the unmasked value.

    **Parameters**:
    *   `mask`: (String) The mask setting.
    *   `value`: (String) The masked value.

    **Usage Example**:
    ```javascript
    const masked = AUIGrid.makeValueUnmasked("99:99:99", "12:34:56");
    console.log(masked); // "123456" 출력됨
    const masked = AUIGrid.makeValueUnmasked("(999) 999-999-999", "(123) 456-789-123");
    console.log(masked); // "123456789123" 출력됨
    ```
    **Return**: (String) The unmasked value. Returns `null` if the given value is not a valid masked value.

---

## `releaseDate`

*   **Type**: Property
*   **Version**: 2.7.0
*   **Description**: Returns the release date of AUIGrid. You can find the release information of the currently used AUIGrid as follows:

    **Usage Example**:
    ```javascript
    console.log(AUIGrid.releaseDate);
    ```

---

## `version`

*   **Type**: Property
*   **Version**: 2.7.0
*   **Description**: Returns the version information of AUIGrid. You can find the version information of the currently used AUIGrid as follows:

    **Usage Example**:
    ```javascript
    console.log(AUIGrid.version);
    ```

---

Copyright(c) 2025 AUISoft Co., Ltd. All Right Reserved
