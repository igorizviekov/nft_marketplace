export const useDateCountdown = (date: Date): string => {
  const today = new Date().getTime();

  var timeleft = date.getTime() - today;

  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
    return 'end';
  } else {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
};
