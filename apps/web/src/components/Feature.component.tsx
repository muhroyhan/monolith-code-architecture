import { get } from '@/api/client'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shadcn/components/ui/empty'
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
import { useSearch } from '@tanstack/react-router'

const FeatureComponent = <K extends keyof Feature>(props: ProgramRegistary<K>) => {
  const search = useSearch({ strict: false })
  const query = search as Feature[K]['queryparam']

  type DataFeature = Feature[K]['data']
  type dataFeedFeature = Feature[K]['dataFeed']

  const { data, isLoading } = useQuery({
    queryKey: [props.api, 'findall', query],
    queryFn: async () => {
      const response = await get<ApiResponseBody<TableDataResponse<DataFeature>>>(props.api, query)
      return response?.data?.data?.dataFeed
    },
  })

  const columnKeys = Object.keys(props.columns) as Array<keyof dataFeedFeature>

  const body = (data: DataFeature[]) =>
    data.map((item, key) => (
      <TableRow key={key}>
        {columnKeys.map((i, key2) => (
          <TableCell key={key2}>{String(props.dataFormat(item)[i])}</TableCell>
        ))}
      </TableRow>
    ))

  const columnValues = Object.values(props.columns)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columnValues.map((item, key) => (
            <TableHead key={key}>{item}</TableHead>
          ))}
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

export default FeatureComponent
