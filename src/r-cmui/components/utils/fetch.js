export default async (url = '', data = {}, type = 'GET', fail, header)=>{
    type = type.toUpperCase();
    let dataStr = ''; //数据拼接字符串
    /**
     * cailuwei add
     * 2018-01-04
     */
    /**
     * cailuwei update
     * 2018-01-05
     * 表单提交 要求json格式
     */
    if(data instanceof Array){
        dataStr = JSON.stringify(data);
    }else {
        if(header) {
            dataStr = JSON.stringify(data);
        }else {
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&';
            });
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        }
    }

    let requestConfig = {
        method: type,
        headers: header ? header : {
            'Accept': 'application/json',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        mode: 'cors',
        cache: 'force-cache',
        credentials: 'include'
    };

    if (type === 'GET') {
        if (dataStr !== '') {
            url = url + '?' + dataStr;
        }
    }

    if (type == 'POST') {
        // Object.defineProperty(requestConfig, 'body', {
        //     value: dataStr
        // });
        requestConfig.body = dataStr;
    }

    try {
        const response = await fetch(url, requestConfig);
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
        if(fail) {
            fail(error);
        }
    }
};
