import { get } from '@/api/client'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shadcn/components/ui/empty'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/shadcn/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/ui/select'
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
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { startCase } from 'es-toolkit'

const FeatureComponent = <K extends keyof Feature>(props: ProgramRegistary<K>) => {
  const search = useSearch({ strict: false })
  const query = search as Feature[K]['queryparam']
  const navigate = useNavigate()

  type DataFeature = Feature[K]['data']
  type DataFeedFeature = Feature[K]['dataFeed']

  const { data, isLoading } = useQuery({
    queryKey: [props.api, 'findall', query],
    queryFn: async () => {
      const response = await get<ApiResponseBody<TableDataResponse<DataFeature>>>(props.api, query)
      return response?.data
    },
  })

  const columnKeys = Object.keys(props.columns) as Array<keyof DataFeedFeature>
  const formatted = data?.data?.dataFeed.map((item) => props.dataFormat(item)) ?? []

  const body = () =>
    formatted?.map((item, key) => (
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

  const pagination = () => {
    const limits = [10, 25, 50, 100]
    return (
      <div className="flex justify-end gap-x-6">
        <Select
          value={query.page?.size.toString()}
          onValueChange={(value) =>
            navigate({
              replace: true,
              search: (prev: Feature[K]['queryparam']) =>
                ({
                  ...prev,
                  page: { ...prev.page, size: value },
                }) as never,
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {limits.map((item) => (
                <SelectItem
                  key={item}
                  value={item.toString()}
                >
                  {item} Rows
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Pagination className="inline-block w-max mx-0">
          <PaginationContent>
            {Array.from({ length: data?.meta && data.meta.totalPages > 6 ? 6 : 6 }, (_, k) => {
              const currentPage = Number(data!.meta!.currentPage)
              const totalPages = Number(data!.meta!.totalPages)
              if (k === 5 && totalPages > 6) {
                return (
                  <PaginationItem key={k}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }
              if (currentPage > 4 && totalPages > 6) {
                if (k === 0) {
                  return (
                    <PaginationItem key={k}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
                const pagenumber = currentPage - 3 + k
                return (
                  <PaginationItem key={k}>
                    <PaginationLink
                      isActive={query.page?.number === pagenumber}
                      size="default"
                      search={(prev: Feature[K]['queryparam']) => ({
                        ...prev,
                        page: { ...query.page, number: pagenumber },
                      })}
                    >
                      {pagenumber}
                    </PaginationLink>
                  </PaginationItem>
                )
              }
              return (
                <PaginationItem key={k}>
                  <PaginationLink
                    isActive={query.page?.number === k + 1}
                    size="default"
                    search={(prev: Feature[K]['queryparam']) => ({
                      ...prev,
                      page: { ...query.page, number: k + 1 },
                    })}
                  >
                    {k + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            })}
          </PaginationContent>
        </Pagination>
      </div>
    )
  }

  const columnValues = Object.values(props.columns)

  return (
    <>
      {data?.meta && pagination()}
      <Table className="mt-6 w-full">
        <TableHeader>
          <TableRow>
            {columnValues.map((item, key) => (
              <TableHead key={key}>{item}</TableHead>
            ))}
            {props.rowActions.length > 0 && (
              <TableHead key={columnValues.length}>Actions</TableHead>
            )}
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
          {!isLoading && (!data || formatted.length <= 0) && (
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
          {!isLoading && data && formatted.length > 0 && body()}
        </TableBody>
      </Table>
      {data?.meta && pagination()}
    </>
  )
}

export { FeatureComponent }
