# Guide

## Installation

`vue-xlsx` is released on npm so:

```bash
npm install -save vue-xlsx
```

or

```bash
yarn add vue-xlsx
```

## Quick Start

`vue-xlsx` uses a completely modular approach, you can mix and match our components however you want to.
The only rule is that `importing` components must not be mixed with `exporting` components

### Importing an XLSX file

```html
<template>
    <section>
      <input type="file" @change="onChange" />
      <xlsx-read :file="file">
        <xlsx-json :sheet="selectedSheet">
          <template #default="{collection}">
            <div>
              {{ collection }}
            </div>
          </template>
        </xlsx-json>
      </xlsx-read>
    </section>
</template>
<script>
import XlsxRead from "./components/XlsxRead";
import XlsxJson from "./components/XlsxJson";

export default {
  components: {
    XlsxRead,
    XlsxJson
  },
  data() {
    return {
      file: null,
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
  }
}
</script>
```

::: tip
In this example we are using `xlsx-read` to take a sheet of the xlsx and transforms it in a json via `xlsx-json`
:::

### Exporting an XLSX file

```html
<template>
  <section>
    <xlsx-workbook>
      <xlsx-sheet
        :collection="sheet.data"
        v-for="sheet in sheets"
        :key="sheet.name"
        :sheet-name="sheet.name"
      />
      <xlsx-download>
        <button>Download</button>
      </xlsx-download>
    </xlsx-workbook>
  </section>
</template>

<script>
import XlsxWorkbook from "./components/XlsxWorkbook";
import XlsxSheet from "./components/XlsxSheet";
import XlsxDownload from "./components/XlsxDownload";

export default {
  components: {
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload
  },
  data() {
    return {
      sheets: [{ name: "SheetOne", data: [{ c: 2 }] }],
    };
  }
};
</script>
```

::: tip
Here we are using `xlsx-workbook` to create a new workbook and then `xlsx-sheet` to add one or more sheet to the workbook. Via `xlsx-download` we can download the resulting `xlsx`
:::

## Example

### Code

<<< @/docs/.vuepress/components/FullExample.vue


### Try It

<FullExample />
