import { createColumnHelper } from '@tanstack/react-table'
import { TableCell } from './TableCell'
import { Student } from './data'
import { EditCell } from './EditCell'

const columnHelper = createColumnHelper<Student>()

export const columns = [
  columnHelper.accessor('studentId', {
    header: 'Student ID',
    cell: TableCell,
    meta: {
      type: 'number',
    },
  }),
  columnHelper.accessor('name', {
    header: 'Full Name',
    cell: TableCell,
    meta: {
      type: 'text',
      required: true,
      pattern: '^[a-zA-Z ]+$',
    },
  }),
  columnHelper.accessor('dateOfBirth', {
    header: 'Date Of Birth',
    cell: TableCell,
    meta: {
      type: 'date',
      required: true,
      validate: (value: string) => {
        const date = new Date(value);
        const today = new Date();
        return date <= today;
      },
      validationMessage: 'Date cannot be in the future',
    },
  }),
  columnHelper.accessor('major', {
    header: 'Major',
    cell: TableCell,
    meta: {
      type: 'select',
      options: [
        { value: '', label: 'Select' },
        { value: 'Computer Science', label: 'Computer Science' },
        { value: 'Communications', label: 'Communications' },
        { value: 'Business', label: 'Business' },
        { value: 'Psychology', label: 'Psychology' },
      ],
      required: true,
    },
  }),
  columnHelper.display({
    id: 'edit',
    cell: EditCell,
  }),
]
