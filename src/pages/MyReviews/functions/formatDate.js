export function formatDate (unixTimestamp)  {
    const date = new Date(unixTimestamp * 1000);
    const now = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (date.toDateString() === now.toDateString()) {
        return `${hours}:${minutes}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday`;
    } else {
        return `${day}/${month}`;
    }
};