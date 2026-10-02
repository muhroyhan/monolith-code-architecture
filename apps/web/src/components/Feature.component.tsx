import { get } from '@/api/client'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shadcn/components/ui/empty'
import { Separator } from '@/shadcn/components/ui/separator'
import { Spinner } from '@/shadcn/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/ui/table'
import { Feature, ProgramRegistary } from '@/types'
import { ApiResponseBody, TableDataResponse } from '@monolith-code-architecture/types'
import { RiFileListLine } from '@remixicon/react'
import { useQuery } from '@tanstack/react-query'
import { Link, useSearch } from '@tanstack/react-router'
import { startCase } from 'es-toolkit'

const FeatureComponent = <K extends keyof Feature>(props: ProgramRegistary<K>) => {
  const search = useSearch({ strict: false })
  const query = search as Feature[K]['queryparam']

  type DataFeature = Feature[K]['data']
  type DataFeedFeature = Feature[K]['dataFeed']

  const { data, isLoading } = useQuery({
    queryKey: [props.api, 'findall', query],
    queryFn: async () => {
      const response = await get<ApiResponseBody<TableDataResponse<DataFeature>>>(props.api, query)
      return response?.data?.data?.dataFeed.map((item) => props.dataFormat(item))
    },
  })

  const columnKeys = Object.keys(props.columns) as Array<keyof DataFeedFeature>

  const body = (data: DataFeedFeature[]) =>
    data.map((item, key) => (
      <TableRow key={key}>
        {columnKeys.map((i, key2) => (
          <TableCell
            className="whitespace-normal wrap-break-words"
            key={key2}
          >
            {String(item[i])}
          </TableCell>
        ))}
        {props.rowActions.length > 0 && (
          <TableCell
            className="p-0 flex items-center text-sm"
            key={columnKeys.length}
          >
            {props.rowActions.reduce(
              (comps, action, key) => {
                let path = `${props.path}/${item['id']}`
                if (action === 'edit') path = path + '/edit'
                return (
                  <>
                    {comps}
                    <Link
                      className="p-3 transition-colors hover:bg-accent hover:text-white"
                      key={key}
                      to={path}
                    >
                      {startCase(action)}
                    </Link>
                    {key < props.rowActions.length - 1 && <Separator orientation="vertical" />}
                  </>
                )
              },
              <div />,
            )}
          </TableCell>
        )}
      </TableRow>
    ))

  const columnValues = Object.values(props.columns)

  return (
    <Table className="mt-6 w-full">
      <TableHeader>
        <TableRow>
          {columnValues.map((item, key) => (
            <TableHead key={key}>{item}</TableHead>
          ))}
          {props.rowActions.length > 0 && <TableHead key={columnValues.length}>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && (
          <TableRow>
            <TableCell colSpan={columnValues.length}>
              <div className="flex flex-col items-center justify-center">
                <div>
                  <Spinner className="size-20 my-2" />
                </div>
                <div className="text-lg">Loading...</div>
              </div>
            </TableCell>
          </TableRow>
        )}
        {!isLoading && (!data || data.length <= 0) && (
          <TableRow>
            <TableCell colSpan={columnValues.length}>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <RiFileListLine />
                  </EmptyMedia>
                  <EmptyTitle>No Data found</EmptyTitle>
                </EmptyHeader>
              </Empty>
            </TableCell>
          </TableRow>
        )}
        {!isLoading && data && data.length > 0 && body(data)}
      </TableBody>
    </Table>
  )
}

export { FeatureComponent }
