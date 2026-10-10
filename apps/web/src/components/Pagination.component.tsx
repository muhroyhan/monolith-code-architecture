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
import { Feature } from '@/types'
import { ApiResponseMeta } from '@monolith-code-architecture/types'
import { useNavigate, useSearch } from '@tanstack/react-router'

const PaginationComponent = <K extends keyof Feature>(props: ApiResponseMeta) => {
  const limits = [10, 25, 50, 100]
  const search = useSearch({ strict: false })
  const query = search as Feature[K]['queryparam']
  const navigate = useNavigate()

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
          {Array.from({ length: props.totalPages > 6 ? 6 : props.totalPages }, (_, k) => {
            const currentPage = Number(props.currentPage)
            const totalPages = Number(props.totalPages)
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
                  className="active:bg-accent hover:bg-accent hover:text-white"
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

export { PaginationComponent }
