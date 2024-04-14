import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import crypto from "crypto";
const countObject = (data: object): number => {
  return Object.keys(data).length || 0;
};
const nowTimeSpan = () => {
  return Math.floor(Date.now() / 1000);
};
const toTimestamp = (strDate: string): any => {
  if (new Date(strDate).toString() == "Invalid Date") return strDate;
  const datum = Date.parse(strDate);
  return datum / 1000;
};

const dateToTimestamp = (strDate: string) => {
  const date = new Date(Date.parse(strDate));
  date.toLocaleString();
  const unixTimestamp = Math.floor(date.getTime() / 1000);
  return unixTimestamp;
};

const strToLower = (str: string) => {
  if (str) return str.toLowerCase();
  else return "";
};

const formatPrice = (price: number) => {
  return Number(price).toFixed(2);
};

const replaceAll = (str: string, search: string, replace: string) => {
  return str.split(search).join(replace);
};

const formatDateTrack = (timeString: any) => {
  const now = new Date(timeString * 1000);
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var year = now.getFullYear();

  return year + "-" + month + "-" + day;
};
const formatDate = (now: any) => {
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var year = now.getFullYear();

  return year + "-" + month + "-" + day;
};
const tomorrowDate = (addDate: number = 1) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + addDate);
  return formatDate(tomorrow);
};
const eddDays = (dateString: string, addDays: number = 1) => {
  const dateObj = new Date(dateString);
  dateObj.setDate(dateObj.getDate() + addDays);
  return formatDate(dateObj);
};
const previousDate = (dateStr: string, addDate: number = 1) => {
  const yesterday = new Date(dateStr);
  yesterday.setDate(yesterday.getDate() - addDate);
  return formatDate(yesterday);
};
const todayMDYDate = () => {
  const now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var year = now.getFullYear();
  return month + "-" + day + "-" + year;
};
const getRandomInteger = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const convertToSlug = (str: string, seprator: any = "-") => {
  //replace all special characters | symbols with a space
  str = str
    .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
    .toLowerCase();

  // trim spaces at start and end of string
  str = str.replace(/^\s+|\s+$/gm, "");

  // replace space with dash/hyphen
  str = str.replace(/\s+/g, seprator);
  return str;
};
const removeSpecial = (str: string, seprator: any = "-") => {
  //replace all special characters | symbols with a space
  str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ");

  // trim spaces at start and end of string
  str = str.replace(/^\s+|\s+$/gm, "");

  // replace space with dash/hyphen
  str = str.replace(/\s+/g, seprator);
  return str;
};

const ksort = (unordered: any) => {
  const sortRecord = Object.keys(unordered)
    .sort()
    .reduce((obj: any, key: any) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
  return sortRecord;
};
const vsort = (unordered: any) => {
  const sortObj = Object.entries(unordered)
    .sort(([, a], [, b]) => {
      let c: any = a;
      let d: any = b;
      return d - c;
    })
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  return sortObj;
};
const pincodeValid = (pincode: any) => {
  if (pincode.length != 6) return false;
  let regex: any = new RegExp("^[1-9]{1}[0-9]{5}$");
  return regex.test(pincode);
};
const formatTimeToDate = (timeString: any) => {
  const now = new Date(timeString * 1000);
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var year = now.getFullYear();

  return year + "-" + month + "-" + day;
};
const formatDateTime = (timeString: any) => {
  const now = new Date(timeString * 1000);
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var year = now.getFullYear();
  var hours = ("0" + now.getHours()).slice(-2);
  var getMinutes = ("0" + now.getMinutes()).slice(-2);
  var getSeconds = ("0" + now.getSeconds()).slice(-2);

  return (
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    getMinutes +
    ":" +
    getSeconds
  );
};
const generateUUID = () => {
  return uuidv4();
};

const convertBase64toString = (conditions: any) => {
  let bufferObj = Buffer.from(conditions, "base64");
  // Encode the Buffer as a utf8 string
  let decodedString = bufferObj.toString("utf8");
  return decodedString;
};

const parseJwt = (token: string) => {
  return JSON.parse(atob(token.split(".")[0]));
};

const sanitizeFields = (
  defaultAllowedFields: any,
  notAllowedFields: any,
  fieldsToFetch: string
) => {
  try {
    fieldsToFetch = fieldsToFetch.replace(/,\s*$/, "");
    console.log("fieldsToFetch  in sanitize fields:>> ", fieldsToFetch);
    // Split the comma delimited string into an array
    let fieldsArray = fieldsToFetch.split(",");

    // Filter out any fields that are not allowed
    fieldsArray = fieldsArray.filter(
      (field) => !notAllowedFields.includes(field)
    );
    //adding a default fields to handel null field condition.
    fieldsToFetch = [defaultAllowedFields, ...fieldsArray].join(",");
    return fieldsToFetch;
  } catch (e) {
    console.log(e);
  }
};

// const sanitizeFieldsReq = (defaultAllowedFields: any, notAllowedFields: any, fieldsToFetch: string) => {
//   try {
//     fieldsToFetch = fieldsToFetch.replace(/,\s*$/, "");

//     // Split the comma delimited string into an array
//     let fieldsArray = fieldsToFetch.split(",");

//     // Filter out any fields that are not allowed
//     fieldsArray = fieldsArray.filter((field) => !notAllowedFields.includes(field));
//     //adding a default fields to handel null field condition.
//     fieldsToFetch = fieldsArray.join(',');
//     return fieldsToFetch
//   } catch (e) { console.log(e) }
// };

const sanitizeAllowedFields = (
  defaultAllowedFields: any,
  notAllowedFields: any = "",
  fieldsToFetch: string = ""
) => {
  try {
    let fieldsArray: any = defaultAllowedFields.split(",");
    if (fieldsToFetch) fieldsArray = fieldsToFetch.split(",");

    notAllowedFields = notAllowedFields.split(",");

    // Filter out any fields that are not allowed
    fieldsArray = fieldsArray.filter(
      (field: string) => !notAllowedFields.includes(field)
    );
    fieldsToFetch = fieldsArray.join(",");

    //adding a default fields to handel null field condition.

    if (!fieldsToFetch) {
      fieldsArray = defaultAllowedFields.split(",");
      fieldsArray = fieldsArray.filter(
        (field: string) => !notAllowedFields.includes(field)
      );
      fieldsToFetch = fieldsArray.join(",");
    }

    return fieldsToFetch;
  } catch (e) {
    console.log(e);
  }

  // if (!fieldsToFetch) return defaultAllowedFields;

  // fieldsToFetch = fieldsToFetch.replace(/,\s*$/, "");

  // // Split the comma delimited string into an array
  // let fieldsArray = fieldsToFetch.split(",");
  // let allowedFields = defaultAllowedFields.split(",");

  // fieldsArray = fieldsArray.filter((field) => allowedFields.includes(field));

  // fieldsToFetch = defaultAllowedFields;
  // if (countObject(fieldsArray) > 0)
  //   fieldsToFetch = fieldsArray.join(",");

  // return fieldsToFetch;
};

const sanitizeAllowedFields_ = (
  defaultAllowedFields: any,
  notAllowedFields: any = "",
  fieldsToFetch: string = ""
) => {
  try {
    let fieldsArray: any = defaultAllowedFields.split(",");
    if (fieldsToFetch) fieldsArray = fieldsToFetch.split(",");

    notAllowedFields = notAllowedFields.split(",");

    // Filter out any fields that are not allowed
    fieldsArray = fieldsArray
      .filter((field: string) => !notAllowedFields.includes(field))
      .filter((x: any) => {
        return defaultAllowedFields.split(",").includes(x.trim());
      });
    fieldsToFetch = fieldsArray.join(",");

    //adding a default fields to handel null field condition.

    if (!fieldsToFetch) {
      fieldsArray = defaultAllowedFields.split(",");
      fieldsArray = fieldsArray.filter(
        (field: string) => !notAllowedFields.includes(field)
      );
      fieldsToFetch = fieldsArray.join(",");
    }

    return fieldsToFetch;
  } catch (e) {
    console.log(e);
  }
};

const trimArray = (items: any) => {
  let newArray: any = [];
  _.forEach(items, function (value) {
    newArray.push(value.trim());
  });
  return newArray;
};

const getEncryptedPassword = (password: any) => {
  let hash: any = "";
  hash = crypto.createHash("sha1");
  hash.update(password);
  const encryptedPassword = hash.digest("hex");
  return encryptedPassword;
};
function generateUniqueRandomNumber(digits: number): number {
  if (digits <= 0) {
    throw new Error("Number of digits must be greater than 0");
  }

  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;

  const generatedNumbers = new Set<number>();
  let randomNumber = 0;

  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (generatedNumbers.has(randomNumber));

  generatedNumbers.add(randomNumber);

  return randomNumber;
}
function calculateDistance(coord1: [any, any], coord2: [any, any]) {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const R = 6371; // Earth radius in kilometers

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
}
export {
  sanitizeAllowedFields,
  sanitizeAllowedFields_,
  ksort,
  removeSpecial,
  eddDays,
  generateUUID,
  vsort,
  previousDate,
  countObject,
  formatDateTime,
  formatTimeToDate,
  pincodeValid,
  nowTimeSpan,
  toTimestamp,
  strToLower,
  formatPrice,
  replaceAll,
  formatDate,
  getRandomInteger,
  tomorrowDate,
  todayMDYDate,
  convertToSlug,
  convertBase64toString,
  dateToTimestamp,
  parseJwt,
  sanitizeFields,
  trimArray,
  formatDateTrack,
  getEncryptedPassword,
  generateUniqueRandomNumber,
  calculateDistance,
};
