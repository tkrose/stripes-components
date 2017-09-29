import queryString from 'query-string';

export function getUrlParams(props) {
  return props.location.search ? queryString.parse(props.location.search) : {};
}

export function getEmbeddedParams(props) {
  return props.stripes.embedded.params;   
}

export function setUrlParams(props, params) {
  const location = props.location;
  let query = location.query;
  if (query === undefined)
    query = queryString.parse(location.search);

  const allParams = Object.assign({}, query, params);
  const keys = Object.keys(allParams);

  let url = location.pathname;
  if (keys.length) {
    url += `?${keys.map(key => `${key}=${encodeURIComponent(allParams[key])}`).join('&')}`;
  }

  props.history.push(url);
}

export function setEmbeddedParams(props, params) {
  console.log(props.stripes);
  Object.assign(props.stripes.embedded.params, params);
}