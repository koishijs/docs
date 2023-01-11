import { AnalyzedPackage, User } from '@koishijs/registry'

export function getUsers(data: AnalyzedPackage) {
  const result: Record<string, User> = {}
  for (const user of data.contributors) {
    result[user.email] ||= user
  }
  if (!data.maintainers.some(user => result[user.email])) {
    return [data.publisher]
  }
  return Object.values(result)
}
