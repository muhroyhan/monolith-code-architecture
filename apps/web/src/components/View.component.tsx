import { get } from '@/api/client'
import { Card, CardContent } from '@/shadcn/components/ui/card'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shadcn/components/ui/empty'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/ui/table'
import { Feature, ProgramRegistary } from '@/types'
import { ApiResponseBody } from '@monolith-code-architecture/types'
import { RiFileListLine } from '@remixicon/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import React, { useEffect } from 'react'

const ViewComponent = <K extends keyof Feature>(props: ProgramRegistary<K>) => {
  const { id } = useParams({ strict: false })
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [props.path, 'findOne'] })
  }, [])

  const { data: result } = useQuery({
    queryKey: [props.api, 'findOne', id],
    queryFn: async () => {
      const res = await get<ApiResponseBody<Feature[K]['data']>>(props.api + `/${id}`)
      return res?.data?.data ? props.dataFormat(res.data.data) : undefined
    },
  })
  type DataFeedFeature = Feature[K]['dataFeed']

  return (
    <Card className="mt-6">
      <CardContent>
        {!result && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <RiFileListLine />
              </EmptyMedia>
              <EmptyTitle>No Data found</EmptyTitle>
            </EmptyHeader>
          </Empty>
        )}
        {result && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result &&
                Object.keys(result).map((k, key) => (
                  <TableRow key={key}>
                    <TableCell>{k}</TableCell>
                    <TableCell>{String(result[k as keyof DataFeedFeature])}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

export { ViewComponent }
