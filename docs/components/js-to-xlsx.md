# JS to XLSX Components

## xlsx-workbook

This is the basic `export` component it's responsible for creating a new basic workbook and handling it

### Props

`xlsx-workbook` does not have any props

### Events

| Name | Payload |Description|
| :--: | :--:| :--: |
| created | workbook | emit the newly created workbook |
| change | workbook | emit the updated workbook |

### Example

<<< @/docs/.vuepress/components/WorkbookExample.vue

## xlsx-sheet

`xlsx-sheet` is meant to be a child of `xlsx-workbook` it creates a new sheet inside it and maintain it updated

::: warning
`xlsx-sheet` and `xlsx-sheets` are two distinct components with completely separated functionalities
:::

### Props

| Name| Type| Default|Description|
| :--: |:--:|:--:| :--:|
| sheetName   | `String` |`null` | sheet name, this property is **required**|
| collection   | `Array` | `null` | An `Array` of `Array` **OR** an `Array` of `Object` containing the data to add to the spreadsheet|

### Events

| Name | Payload |Description|
| :--: | :--:| :--: |
| parsed | sheet | emit the newly created sheet |

### Example

<<< @/docs/.vuepress/components/SheetExample.vue

### Try It!

<SheetExample />

## xlsx-download

`xlsx-download` is meant to be a child of `xlsx-workbook` it accepts a slot and trigger a workbook download when the content of the slot is clicked

### Props

| Name| Type| Default|Description|
| :--: |:--:|:--:| :--:|
| filename   | `String` |`"my-workbook.xlsx` | the name of the downloaded file|
| options   | `Object` | `{}` | [options object](https://github.com/SheetJS/js-xlsx#writing-options) to pass to the file writing function |
| disableWrapperClick   | `Boolean` |`false` | disable listening to click on the wrapper of the slot, use the slot-scope `download` function instead|

### Events

`xlsx-download` does not have any events

### Scoped Slots

#### Default

| Name | Value |Description|
| :--: | :--:| :--: |
| download | `Function` |  function to call to trigger the download of the workbook |


### Example

<<< @/docs/.vuepress/components/DownloadExample.vue

### Try It!

<DownloadExample />