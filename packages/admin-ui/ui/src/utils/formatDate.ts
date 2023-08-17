export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate: string = new Date(dateString).toLocaleDateString(undefined, options);
    
    const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime: string = new Date(dateString).toLocaleTimeString(undefined, timeOptions);
    
    return `${formattedDate} at ${formattedTime}`;
}
  