import { useMemo } from "react";
export function useDateFormat(date: Date): string {
    const formatedDate = useMemo(() => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        } as Intl.DateTimeFormatOptions
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }, [date])
    return formatedDate
}