import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { TableView } from './tableView'
const ExtendTable = Table.configure({
  resizable: true,
  View: TableView
})

export { ExtendTable, TableCell, TableHeader, TableRow }