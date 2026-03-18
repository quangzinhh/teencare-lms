import type { ApiStatus } from '../types'

type StatusBannerProps = {
  status: ApiStatus
}

export const StatusBanner = ({ status }: StatusBannerProps) => {
  if (!status.message) {
    return null
  }

  return <div className={`status ${status.type}`}>{status.message}</div>
}
