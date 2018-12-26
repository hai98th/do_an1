import axios from "axios";
import * as env from "../../constants/env";

export function loadLoginApi(login, tokenBrowser) {
    let url = env.DOMAIN + "/login";
    return axios.post(url, {
        email: login.email,
        password: login.password,
        token_browser: tokenBrowser,
    });
}
