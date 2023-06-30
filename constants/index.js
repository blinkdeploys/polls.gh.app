import images from "./images";
import icons from "./icons";
import { COLORS, FONT, SIZES, SHADOWS } from "./theme";

// 'http://127.0.0.1:50002', 'https://www.localhost.architect.sh'
// const URL_BASE = 'https://app.blinkdeploys-env.blinkdeploys.arc.domains'
const URL_BASE = 'http://10.0.0.100:50002'
const URL_API = `${URL_BASE}/api/poll/app`
// async storage keys
const ASKEY_TOKEN = 'auth_token'
const ASKEY_CSRF_TOKEN = 'csrf_token'
const ASKEY_PROFILE = 'user_profile'
const ASKEY_URL = 'api_url'
const ASKEY_PRESIDENTIAL = `presidential_sheet`
const ASKEY_PARLIAMENTARY = `parliamentary_sheet`



export {
    URL_BASE, URL_API,
    ASKEY_URL, ASKEY_TOKEN, ASKEY_CSRF_TOKEN, ASKEY_PROFILE,
    ASKEY_PRESIDENTIAL, ASKEY_PARLIAMENTARY,
    images, icons, COLORS, FONT, SIZES, SHADOWS
};
