export const findOptionOrDefault = <T extends { value: string }>(
  options: T[],
  value: string
): T => {
  return options.find(option => option.value === value) || options[options.length - 1]
}

