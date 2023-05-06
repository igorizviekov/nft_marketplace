export function formatAddress(address: string): string {
  const addressStart = address.slice(0, 4);
  const addressEnd = address.slice(39, 42);

  return addressStart + '...' + addressEnd;
}

export const formatDate = (date: Date): string => {
  const now = new Date().getTime();

  var timeleft = now - date.getTime();

  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  if (days > 0) {
    if (days === 1) return `${days} day ago`;
    return `${days} days ago`;
  } else if (hours > 0) {
    if (hours === 1) return `${hours} hour ago`;
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    if (minutes === 1) return `${minutes} minute ago`;
    return `${minutes} minutes ago`;
  } else {
    if (seconds === 1) return `${seconds} second ago`;
    return `${seconds} seconds ago`;
  }
};

export function formatTooltipDate(date: Date): string {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const refactoredHours = date.getHours().toString().padStart(2, '0');
  const refactoredMinutes = date.getMinutes().toString().padStart(2, '0');
  const refactoredSeconds = date.getSeconds().toString().padStart(2, '0');

  return `Time: ${monthNames[month]} ${day} ${year} - ${refactoredHours}:${refactoredMinutes}:${refactoredSeconds}`;
}
