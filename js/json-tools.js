class JsonTools {
  static parse(json) {
    let m = 'getJSON function must receive a valid json parameter';
    if (json === undefined) throw new Error(m + ', but not an "undefined" value');
    if (json === null)  throw new Error(m + ', but not an "null" value');
    if (typeof json === 'boolean') throw new Error(m + ', but not an "boolean" value');
    if (typeof json === 'number') throw new Error(m + ', but not an "number" value');
    if (json instanceof Date) throw new Error(m + ', but not an "Date" object');
    if (typeof json === 'object') return json;
    if (typeof json === 'string') {
      try {
        return JSON.parse(json);
      } catch (e) {
        throw new Error(m + ', but string sent is not a valid json');
      }
    }
    throw new Error('getJSON function could not determine if parameter is a valid json');
  }
}