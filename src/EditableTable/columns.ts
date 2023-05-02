import { createColumnHelper } from '@tanstack/react-table'
import { EditableCell } from './EditableCell'
import { Student } from './data'
import { EditAction } from './EditAction'

const columnHelper = createColumnHelper<Student>()

export const columns = [
  columnHelper.accessor('id', {
    header: 'Student ID',
    cell: EditableCell,
    meta: {
      type: 'number',
    },
  }),
  columnHelper.accessor('name', {
    header: 'Full Name',
    cell: EditableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('dateOfBirth', {
    header: 'Date Of Birth',
    cell: EditableCell,
    meta: {
      type: 'date',
    },
  }),
  columnHelper.accessor('major', {
    header: 'Major',
    cell: EditableCell,
    meta: {
      type: 'select',
      options: [
        { value: 'Computer Science', label: 'Computer Science' },
        { value: 'Communications', label: 'Communications' },
        { value: 'Business', label: 'Business' },
        { value: 'Psychology', label: 'Psychology' },
      ],
    },
  }),
  columnHelper.display({
    id: 'edit',
    cell: EditAction,
  }),
]
