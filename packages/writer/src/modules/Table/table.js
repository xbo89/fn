import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { TableView } from './tableView'

const ExtendTableCell = TableCell.extend({
  // addAttributes() {
  //   return {
  //     ...this.parent(),
  //     colwidth: {
  //       default: 300,
  //       parseHTML: element => {
  //         const colwidth = element.getAttribute('colwidth')
  //         const value = colwidth
  //           ? [parseInt(colwidth, 10)]
  //           : null

  //         return value
  //       },
  //     },
  //   }
  // },
})
const ExtendTable = Table.configure({
  draggable: true,
  resizable: true,
  View: TableView,
})

export { ExtendTable, ExtendTableCell, TableHeader, TableRow }
