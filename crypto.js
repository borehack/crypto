// https://stackoverflow.com/questions/34309988/byte-array-to-hex-string-conversion-in-javascript
function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#pkcs_8_import
function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

async function getPublicKey(shaStr) {
    // this is the content from TEST-publickey.pem
    const b64 = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmAZVWtwk53KexTvoNV99fx/NzfKWKQVp05M7TePYo6EDTbfyHa/Yk24CLObsI0FC5xDEprYT6IsZYaZZlHDrrLzo81RtTMCNH+wCuzw2RSZz/khLN5qyJ5SW71h2iLb08apuX3Ufwxf5PZ5cVkkWm1UPx1q6j417gGR6l5tUn4K1lT/d0UXT5Url9Ybo32SqdNw7svMtkvQ7eF6HaJ8DaYul2ZZAHLva+TPOjPfSXbVy7h1nlgn+kL49R51cQ/YMEGgp/u1Bl88QlMRzylU88IcEjPqGqeLEsgzE8aG3XptKpCu/5eqIr7TLN76xWylTxWHTNZAbsyYLRKKeNl7ebwIDAQAB"; // Fill in with your own base64 string

    const binaryDerString = window.atob(b64);
    const binaryDer = str2ab(binaryDerString);

    const publicKey = await window.crypto.subtle.importKey(
        "spki",
        binaryDer,
        {
            name: "RSA-OAEP",
            hash: shaStr,
        },
        true,
        ["encrypt"]
    );

    return publicKey;
}

async function encryptData(shaStr, data) {
    let enc = new TextEncoder();
    let encData = enc.encode(data);

    let publicKey = await getPublicKey(shaStr);

    let encrypted = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
        hash: shaStr,
      },
      publicKey,
      encData
    );

    return encrypted;
}
