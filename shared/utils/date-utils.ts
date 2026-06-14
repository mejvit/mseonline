export function plusOneWeekMidnight(date: Date): Date {
    const plusOneWeekMidnight = startOfDay(date);
    plusOneWeekMidnight.setDate(plusOneWeekMidnight.getDate() + 7);
    return plusOneWeekMidnight;
}

export function startOfDay(date: Date): Date {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay;
}