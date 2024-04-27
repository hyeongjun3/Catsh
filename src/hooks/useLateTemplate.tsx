import { QUERY_KEYS } from "@Constant/queryKeys";
import { getTemplate } from "@Utils/templateManager";
import { useQuery } from "@tanstack/react-query";

// HJ TODO: base interface 만들기
export default function useLateTemplate() {
  const templateQuery = useQuery({
    queryKey: [QUERY_KEYS.template],
    queryFn: getTemplate,
    staleTime: Infinity,
  });

  return templateQuery;
}
