export function percentageOfTotal(part: number = 0, total: number = 1): number {
    if (total === 0) return 0
    return Math.round((part / total) * 100)
}
