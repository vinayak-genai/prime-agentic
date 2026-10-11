export type StatusBadgeStatus = 'In Development' | 'Early Access' | 'Live';

const STATUS_STYLES: Record<StatusBadgeStatus, string> = {
  'In Development': 'bg-warning-soft text-warning',
  'Early Access': 'bg-info-soft text-info',
  Live: 'bg-success/10 text-success',
};

export function StatusBadge({ status }: { status: StatusBadgeStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
