export const dateCreated = () => {
  let date = new Date(),
    year = date.getFullYear(),
    month = '' + (date.getMonth() + 1),
    day = '' + date.getDate();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

export const formatBody = body => {
  const formattedBody = {...body};
  formattedBody.name = formattedBody.name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  formattedBody.from = formattedBody.from
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  formattedBody.category = formattedBody.category
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  return formattedBody;
};
