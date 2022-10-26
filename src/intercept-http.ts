import UploadData = browser.webRequest.UploadData;
/**
 * Intercepter la requête HTTP d'envoi de mail, et la modifier pour enlever la pièce jointe.
 * Ne fonctionne pas comme on voudrait car ne modifie par le corps de la requête (en lecture seule)
 */

browser.webRequest.onBeforeRequest.addListener((details) => {
    if (details.url.includes("SendMsgRequest")) {
        console.log("LOOK:", details.url);
        const data: UploadData[] | undefined = details.requestBody?.raw;
        if (data == undefined) {
            return;
        }
        const msgBody = decode_body(data);
        msgBody.Body.SendMsgRequest.m.attach = [];
        if (details.requestBody == undefined) {
            details.requestBody = {}
        }
        details.requestBody.raw = encode_body(msgBody);
    }
    // console.log(url, requestBody);
}, {urls: ["<all_urls>"]}, ["requestBody"])

export interface SendMsgRequest {
    Body: {
        SendMsgRequest: {
            m: {
                attach: Array<any>
            }
        }
    }
}

function encode_body(body: SendMsgRequest): UploadData[] {
    return [{bytes: body}]
}

function decode_body(data: UploadData[]): SendMsgRequest {
    if (data[0].bytes != undefined) {
        const str = new TextDecoder().decode(data[0].bytes);
        return JSON.parse(str);
    }
    throw Error();
}

function dl_file(arrayBuffer: ArrayBuffer) {
    const dataview = new DataView(arrayBuffer);
    const blob = new Blob([dataview], {type: "image/png"});
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = "test.png";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(downloadUrl);
}
