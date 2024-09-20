import crypto from "crypto";
import url from "url";

export const apiSign = (
  timestamp: string,
  method: string,
  requestUrl: string,
  body: string,
  secretkey: string
) => {
  const content =
    timestamp + method.toUpperCase() + getPath(requestUrl) + getJsonBody(body);
  const signVal = crypto
    .createHmac("sha256", secretkey)
    .update(content, "utf8")
    .digest("base64");

  return signVal;
};

export const sha256 = (message: string, secret: string) => {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);
  return hmac.digest();
};

export const getPath = (requestUrl: string) => {
  const uri = new URL(requestUrl);
  const path = uri.pathname;
  const params = Array.from(uri.searchParams.entries());

  if (params.length === 0) {
    return path;
  } else {
    const sortedParams = [...params].sort(([aKey], [bKey]) =>
      aKey.localeCompare(bKey)
    );
    const queryString = sortedParams
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    return `${path}?${queryString}`;
  }
};

export const getJsonBody = (body: string) => {
  let map;

  try {
    map = JSON.parse(body);
  } catch (error) {
    map = {};
  }

  if (Object.keys(map).length === 0) {
    return "";
  }

  map = removeEmptyKeys(map);
  map = sortObject(map);

  return JSON.stringify(map);
};

export const parsePath = (requestUrl: string) => {
  const uri = new URL(requestUrl);
  const path = uri.pathname;
  const params = Object.fromEntries(uri.searchParams.entries());

  return { path, params };
};

const isJson = (jsonString: string) => {
  if (!jsonString || jsonString === "") {
    return false;
  }

  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
};

export const removeEmptyKeys = (map: object) => {
  const retMap: any = {};

  for (const [key, value] of Object.entries(map)) {
    if (value !== null && value !== "") {
      retMap[key] = value;
    }
  }

  return retMap;
};

export const sortObject = (obj: object): any => {
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      return sortList(obj);
    } else {
      return sortMap(obj);
    }
  }

  return obj;
};

const sortMap = (map: object) => {
  const sortedMap = new Map(
    Object.entries(removeEmptyKeys(map)).sort(([aKey], [bKey]) =>
      aKey.localeCompare(bKey)
    )
  );

  for (const [key, value] of sortedMap.entries()) {
    if (typeof value === "object" && value !== null) {
      sortedMap.set(key, sortObject(value));
    }
  }

  return Object.fromEntries(sortedMap.entries());
};

const sortList = (list: Array<any>) => {
  const objectList = [];
  const intList = [];
  const floatList = [];
  const stringList = [];
  const jsonArray = [];

  for (const item of list) {
    if (typeof item === "object") {
      jsonArray.push(item);
    } else if (Number.isInteger(item)) {
      intList.push(item);
    } else if (typeof item === "number") {
      floatList.push(item);
    } else if (typeof item === "string") {
      stringList.push(item);
    } else {
      intList.push(item);
    }
  }

  intList.sort((a, b) => a - b);
  floatList.sort((a, b) => a - b);
  stringList.sort();

  objectList.push(...intList, ...floatList, ...stringList, ...jsonArray);
  list.length = 0;
  list.push(...objectList);

  const retList = [];

  for (const item of list) {
    if (typeof item === "object") {
      retList.push(sortObject(item));
    } else {
      retList.push(item);
    }
  }

  return retList;
};

export const getBaseUrl = (testing: true) => {
  let baseUrl = "https://api.alchemytech.io";
  if (testing) {
    return baseUrl;
  }
  return baseUrl;
};
