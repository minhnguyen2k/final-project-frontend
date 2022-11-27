export const generateComicDetailLink = (comicId: string) => {
  return `details/${comicId}`;
};
export const generateReadComicLink = (comicName: string, chapName: string, chapId: string) => {
  const bookNameTransform = comicName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/ - /g, '-')
    .replace(/ /g, '-');
  return `/comic/read/${bookNameTransform}/${chapName.replace(/ /g, '-')}/${chapId}`;
};
export const shortenString = (str: string, length: number) => {
  if (str.length > length) {
    let shortStr = str.slice(0, length);
    const lastIndex = shortStr.lastIndexOf(' ');
    shortStr = shortStr.slice(0, lastIndex);
    return `${shortStr} ...`;
  }
  return str;
};
export const sortObj = (dataList: any, property: any, sortWithNumber: boolean = false): [] => {
  if (!sortWithNumber) {
    return dataList.sort((a: any, b: any) => {
      const nameA = a[property].toUpperCase();
      const nameB = b[property].toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  }

  return dataList.sort((a: any, b: any) => {
    return a[property]
      .substring(a[property].lastIndexOf('/') + 1)
      .localeCompare(b[property].substring(b[property].lastIndexOf('/') + 1), undefined, {
        numeric: true,
        sensitivity: 'base',
      });
  });
};
