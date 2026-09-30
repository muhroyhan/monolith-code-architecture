import { get } from '@/api/client'
import { Feature, ProgramRegistary } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'

const FeatureComponent = <K extends keyof Feature>(props: ProgramRegistary<K>) => {
  const search = useSearch({ strict: false })
  const query = search as Feature[K]['queryparam']
  const { data, isLoading } = useQuery({
    queryKey: [props.api, 'findall', query],
    queryFn: async () => {
      const response = await get<Feature[K]['response']>(props.api, query)
      return response.data
    },
  })
  console.log(isLoading, data)
  return <div>FeatureComponent</div>
}

export default FeatureComponent
