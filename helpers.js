import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";


const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const getJSON = async function (url) {
    try {
        const fetchPro = fetch(url);
        // const awaitfetchPro = await fetchPro;
        // console.log(awaitfetchPro);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        // console.log(res);
        const data = await res.json();
        // console.log(data);

        if (!res.ok) throw Error(`${data.message} (${res.status})`);
        return data;
    }
    catch (err) {
        throw err;
    }
};