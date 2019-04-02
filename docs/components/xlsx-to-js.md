# XLSX to JS Components

## xlsx-read

This is the basic `import` component it gets an xlsx file and converts it in a js worksheet.

### Props

| Name| Type| Default|Description|
| :--: |:--:|:--:| :--:|
| file   | `File` | `null` | the file to parse from |
| options   | `Object` | `{}` | [options object](https://github.com/SheetJS/js-xlsx#parsing-options) to pass to the parse function |

### Events

| Name | Payload |Description|
| :--: | :--:| :--: |
| parsed | workbook | emit the processed workbook when ready |
| loading | loading | emit at the start and end of the parsing process |

### Scoped Slots

#### Default

| Name | Value |Description|
| :--: | :--:| :--: |
| loading | `Boolean` | loading state |

### Example

<<< @/docs/.vuepress/components/ReadExample.vue

### Try It!

<ReadExample />

## xlsx-table

`xlsx-table` is meant to be a child of `xlsx-read` it automatically detect when a new xlsx file is converted to a workbook and print in the DOM as an HTML table

### Props

| Name| Type| Default|Description|
| :--: |:--:|:--:| :--:|
| sheet   | `[String, Number]` |`0` | the sheet number or name to print in the DOM|
| options   | `Object` | `{}` | [options object](https://github.com/SheetJS/js-xlsx#html-output) to pass to the conversion function |

### Events

`xlsx-table` does not emit any event

### Example

<<< @/docs/.vuepress/components/TableExample.vue

### Try It!

<TableExample />

## xlsx-json

`xlsx-json` is meant to be a child of `xlsx-read` it automatically detect when a new xlsx file is converted to a workbook and emits a js object representation of the selected sheet, it also exposes the js object to his first slot trough scopes

### Props

| Name| Type| Default|Description|
| :--: |:--:|:--:| :--:|
| sheet   | `[String, Number]` |`0` | the sheet number or name to parse|
| options   | `Object` | `{}` | [options object](https://github.com/SheetJS/js-xlsx#html-output) to pass to the conversion function |

### Events

| Name | Payload |Description|
| :--: | :--:| :--: |
| parsed | `Array` | emit the array of objects representing the selected sheet |

### Scoped Slots

#### Default

| Name | Value |Description|
| :--: | :--:| :--: |
| collection | `Array` |  array of objects representing the selected sheet |


### Example

<<< @/docs/.vuepress/components/JsonExample.vue

### Try It!

<JsonExample />

## xlsx-sheets

`xlsx-sheets` is meant to be a child of `xlsx-read` it automatically detect when a new xlsx file is converted to a workbook and parse the available sheets

### Props

`xlsx-sheets` does not have any props

### Events

| Name | Payload |Description|
| :--: | :--:| :--: |
| parsed | `Array` | emit the array of `Strings` containing the name of the sheets |

### Scoped Slots

#### Default

| Name | Value |Description|
| :--: | :--:| :--: |
| sheets | `Array` | array  of `Strings` containing the name of the sheets |

### Example

<<< @/docs/.vuepress/components/SheetsExample.vue

### Try It!

<SheetsExample />