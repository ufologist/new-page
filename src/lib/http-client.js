import StandardHttpClient from 'standard-http-client';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

class HttpClient extends StandardHttpClient {
    constructor() {
        super({
            withCredentials: true,
            timeout: 10000
        });
    }

    beforeSend(config) {
        NProgress.start();
    }
    afterSend(responseOrError) {
        NProgress.done();
    }
    handleError(error) {
        if (error._errorType === 'B') {
            alert(error.message + '\n' + error._errorCode);
        } else {
            alert(error._desc + '\n' + error._errorCode);
        }
        console.log('handle error', error);
    }
}

var httpClient = new HttpClient();
export default httpClient;