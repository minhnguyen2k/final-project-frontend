export const generateComicDetailLink = (comicId: string) => {
  return `/details/${comicId}`;
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
export const isNotNull = <T>(item: T | null): item is T => {
  return item !== null;
};
export const bookNameTransform = (comicName: string) => {
  return comicName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/ - /g, '-')
    .replace(/ /g, '-');
};
export const getShortImageName = (image: string) => {
  const index = image.lastIndexOf('/');
  return image.substring(index + 1);
};
export const getFolderImageName = (image: string) => {
  const slashList = image.split('/');
  return slashList[slashList.length - 2];
};
export const getFormatImageName = (image: string) => {
  const index = image.lastIndexOf('.');
  return image.substring(index + 1).toUpperCase();
};
export const getImageNameExcludeFormat = (image: string) => {
  const index = image.lastIndexOf('.');
  return image.slice(0, index);
};
export const getLastPage = (image: string) => {
  const lastDashIndex = image.lastIndexOf('-');
  const lastDotIndex = image.lastIndexOf('.');
  return image.slice(lastDashIndex + 1, lastDotIndex);
};
