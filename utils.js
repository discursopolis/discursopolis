import Diacritic from 'diacritic';

const makeHTMLSafeText = (text) => {
  return text.replace(/"/g, '&quot;');
}

const generateUrlName = (name) => {
  const urlName = Diacritic.clean(name)
    .toLowerCase()
    .replace(/["'#¿?:.]/g, "")
    .trim()
    .replace(/\s\s+/g, "-")
    .replace(/\s/g, "-");
  return urlName;
}

export {makeHTMLSafeText, generateUrlName};
