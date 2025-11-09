export const getNextMonth = (date: Date): Date =>
    new Date(date.getFullYear(), date.getMonth() + 1)
  
  export const getPrevMonth = (date: Date): Date =>
    new Date(date.getFullYear(), date.getMonth() - 1)
  
  export const getMonthName = (date: Date): string => {
    const formatter = new Intl.DateTimeFormat("uk-UA", {
      month: "long",
      year: "numeric",
    })
    return formatter.format(date).replace(/^\w/, c => c.toUpperCase())
  }
  