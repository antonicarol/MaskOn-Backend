const popular = (value) => {
  return value.popularity.sales * value.popularity.clicks;
};

export const sortBySales = (masks) => {
  const sortedMasks = [...masks];
  sortedMasks.sort((a, b) => {
    if (a.popularity.sales > b.popularity.sales) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedMasks.slice(0, 5);
};

export const sortByPopular = (masks) => {
  const sortedMasks = [...masks];
  sortedMasks.sort((a, b) => {
    if (popular(a) > popular(b)) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedMasks.slice(0, 5);
};

export const sortByTimeStamp = (masks) => {
  const sortedMasks = [...masks];
  sortedMasks.sort((a, b) => {
    if (new Date(a.postedAt) > new Date(b.postedAt)) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedMasks.slice(0, 5);
};
