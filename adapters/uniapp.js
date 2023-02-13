export default function adapter(config) {
    return new Promise((resolve, reject) => {
        let settle = require('axios/lib/core/settle');
        let buildURL = require('axios/lib/helpers/buildURL');
        let buildFullPath = require('axios/lib/core/buildFullPath');

        let fullUrl = buildFullPath(config.baseURL, config.url)

        uni.request({
            method: config.method.toUpperCase(),
            url: buildURL(fullUrl, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
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
