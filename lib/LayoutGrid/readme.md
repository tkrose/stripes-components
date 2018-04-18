## Flex-box layout grid
Automagical support for right-to-left languages (rtl), dynamic sizing of columns, responsive behavior, to boot.

## Basics
Every `<Row>` contains a series of `<Col>`s. Each `<Col>` has different size properties that apply to different media query breakpoints. Each property accepts an integer from 1 to 12, representing the fraction x/12 of the total width of the `<Row>`. `xs` is the base, dominant prop that would be used most often, as the grid is 'mobile first.' Other breakpoint props, increasing in size: `sm`, `md`, `lg`, can be used to adjust the layout of the row as the size of the viewport increases.

Basic examples:
```
// Most common usage for basic layout:
<Row>
  <Col xs={4}> 33.33% of the row      </Col>
  <Col xs={6}> 50% of the row         </Col>
  <Col xs={2}> 16.6666.. % of the row </Col>
</Row>

// Responsive adjustment
<Row>
  <Col xs={12} sm={3} md={2} lg={1} />
  <Col xs={6} sm={6} md={8} lg={10} />
  <Col xs={6} sm={3} md={2} lg={1} />
</Row>
```

More examples can be found [here](https://roylee0704.github.io/react-flexbox-grid/)


### Upgrading from float-based grid.

Simply replace imports:

Change
```
import { Row, Col } from 'react-bootstrap';
```
To
```
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

```

## Pane-Query Layout Grid: `<PQRow>`, `<PQCell>`

Works within the Pane layout system by assigning css classes to the grid components based on the width of the pane (sent down in React Context.)

### Example 
Similar to the flexbox grid, the `<PQCell>`s work with props named after the breakpoints with numbers, representing the number of columns (out of 16) that the cell's width will take up.
```
<PQRow classes="padded">
  <PQCell lgClasses="collapse" lg={13} xl={16}>
    <Button fullWidth>{`<PQCell lg={3} xl={16}>`}</Button>
  </PQCell>
  <PQCell md={3} lg={6} xl={14}>
    <Button fullWidth>{`<PQCell md={3} lg={10} xl={14}>`}</Button>
  </PQCell>
</PQRow>
```
### Query control
Class props specific to each query can be used to control appearances catered to the needs of each layout. In this contrived example, the `alignSelfEnd` is applied to the `lgClasses` prop of the first cell. When the `lg` query is met, this will cause the first cell to align itself to the bottom of the row, even with the bottom of the lengthy paragraph in the second cell.
```
  <PQRow classes="justifyStart">
    <PQCell lgClasses="**alignSelfEnd**" lg={10} xl={16}>
      <Button fullWidth>{`<PQCell lg={3} xl={16}>`}</Button>
    </PQCell>
    <PQCell md={3} lg={6} xl={14}>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
    </PQCell>
  </PQRow>
```
### Pane breakpoints

Query | min-width (px)
--- | --- 
sm | 321
md | 641
lg | 1025
xl | 1441
xxl | 1921

### PQRow classes
Different classes apply various flexbox properties to the row. By default, they're justified with `space-between` with items aligned `middle`.
className | description
`padded` | applies padding to each of the `<PCol>` elements within.
`alignBottom` | bottom-aligns items in the row.
`alignTop` | top-aligns items in the row.
`justifyEnd` | justifies items towards flex-end.
`justifyStart` | justifies items towards flex-start.


### PQRow Props
Name | type | description | default | required
--- | --- | --- | --- | ---
`classes` | string | class names in this prop will be applied to the row regardless of the met width query. | | 
`smClasses` | string | class names in this prop will be applied only at the `sm` query | | 
`mdClasses` | string | class names in this prop will be applied only at the `md` query | |
`lgClasses` | string | class names in this prop will be applied only at the `lg` query | |
`xlClasses` | string | class names in this prop will be applied only at the `xl` query | |
`xxlClasses` | string | class names in this prop will be applied only at the `xxl` query | |

### PQCell classes
className | description
`collapse` | removes padding from the column.
`collapseStart` | removes padding from the flex-start side of the column.
`collapseEnd` | removes padding from the flex-end side of the column.
`alignSelfEnd` | bottom-aligns the column with the other columns of the row.
`alignSelfStart` | top-aligns the column with the other columns of the row.

### PQCell Props
`<PQCells>` have the same query-based class props as the `<PQRow>`, applying the PQCell classes at that particular query, or in the case of the `classes` prop, across all of the queries.
Name | type | description | default | required
--- | --- | --- | --- | ---
`sm` | number |  Can be set to an integer, from 1 to 16, representing the fraction of a pane's width that the column will consume. | 16 | 
`md` | number | " | | 
`lg` | number | " | |
`xl` | number | " | |
`xxl` | number | " | |
