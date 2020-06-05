import Diacritic from 'diacritic';

const generateUrlName = (name) => {
  const urlName = Diacritic.clean(name.trim())
    .toLowerCase()
    .replace(/["']/g, "")
    .replace(/\s\s+/g, "-")
    .replace(/\s/g, "-");
  return urlName;
}

export {generateUrlName};
