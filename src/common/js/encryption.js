/* import aes from 'static/js/aes.js'; */

var encryption = function(md5) {
    var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");


    var encryptedData = CryptoJS.AES.encrypt(md5, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    /*  console.log("加密前：" + md5);
     console.log("加密后：" + encryptedData); */

    return encryptedData;
};

export default encryption;