type DateStatus = {
  isToday: boolean;
  isInCurrentWeek: boolean;
  weekRange: { start: string; end: string };
};

function checkDateStatus(dateStr: string): DateStatus {
  // Use Lagos timezone (UTC+1)
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Parse input like "Sat, Oct 25" — allow any year
  const parsedDate = new Date(`${dateStr}, ${today.getFullYear()}`);
  parsedDate.setHours(0, 0, 0, 0);

  // Start of current week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  // End of current week (Saturday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  // Format helper: "Day, Mon DD"
  const formatDate = (date: Date): string =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "Africa/Lagos",
    });

  const isToday = parsedDate.getTime() === today.getTime();
  const isInCurrentWeek = parsedDate >= startOfWeek && parsedDate <= endOfWeek;

  /*
{
  isToday: false,
  isInCurrentWeek: true,
  weekRange: {
    start: "Sun, Oct 19",
    end: "Sat, Oct 25"
  }
}
*/

  return {
    isToday,
    isInCurrentWeek,
    weekRange: {
      start: formatDate(startOfWeek),
      end: formatDate(endOfWeek),
    },
  };
}

export default checkDateStatus

// const toDateYYYYmmDD = (theDate:Date) => {
  
// const formattedDate = new Date(theDate).toISOString().split('T')[0];
// console.log(formattedDate); // Outputs: yyyy-mm-dd
// return formattedDate;
// }
// const convertDateToFormat = (dateStr: string) => {
//   const dateObj = new Date(dateStr);
// const convertedDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
// return convertedDate
// }
