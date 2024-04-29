type TCreateQueryString = (
  params: Record<string, string | number | undefined>
) => string

const сreateQueryString: TCreateQueryString = (params) => {
  const result = Object.entries(params).filter(item => item[1]).map(param => param.join('=')).join('&')
  return result
}

export default сreateQueryString