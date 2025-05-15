import React, { useMemo, useContext } from 'react'
import { UserContext } from '@/lib/data-source'

/**
 * 仅对有权限的用户显示内容
 */
export function Roles({
  allowed,
  admin = false,
  children,
}: {
  allowed?: string | string[]
  admin?: boolean // 是否要求管理员权限，若为 true，不再检查 allowed 参数
  children?: React.ReactNode
}) {
  const user = useContext(UserContext)

  const show = useMemo(() => {
    if (admin === true) return user.isAdmin === 1 || user.parentId === -1 // parentId === -1 代表是平台管理员

    const allowedList = typeof allowed === 'string' ? [allowed] : allowed ?? []
    return allowedList.find(role => user.menuAutos?.includes(role)) !== undefined
  }, [user, allowed, admin])

  return show ? <>{children ?? null}</> : null
}
