import { useContext } from 'react'
import { UserContext } from '@/lib/data-source'
import { API, setToken } from '@/lib/API'

/**
 * 判断当前用户是否有指定权限
 *
 * const hasRoles = useHasRoles()
 * return <div>
 *   <a>详情</a>
 *   { hasRoles('edit') ? <a>编辑</a> : null }
 * </div>
 */
export function useHasRoles() {
  const user = useContext(UserContext)

  const hasRoles = useCallback(
    (roles: string | string[]) => {
      if (typeof roles === 'string') roles = [roles]
      return roles.every(role => user.menuAutos.includes(role))
    },
    [user]
  )

  return hasRoles
}

let logoutCallback: (() => void) | null = null
export function setLogoutCallback(callback: () => void) {
  logoutCallback = callback
}
export function logout() {
  void API('/login/v1/logout')
  setToken('')
  localStorage.removeItem('token')
  localStorage.clear()
  logoutCallback?.()
  location.replace('#')
  location.reload()
}
