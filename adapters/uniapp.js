import settle from "axios/unsafe/core/settle.js"
import buildURL from "axios/unsafe/helpers/buildURL.js"
import buildFullPath from "axios/unsafe/core/buildFullPath.js"

export default function adapter(config) {
    return new Promise((resolve, reject) => {
        let fullUrl = buildFullPath(config.baseURL, config.url)
        uni.request({
            method: config.method.toUpperCase(),
            url: buildURL(fullUrl, config.params, config.paramsSerializer),
            header: config.headers,
            data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };
                settle(resolve, reject, response);
            }
        })
    })
}
