import { getDriver as getBrowserDriver, setApimlAuthTokenCookie } from 'explorer-fvt-utilities';
import { WebDriver } from 'selenium-webdriver';
import { BASE_URL, BASE_URL_WITH_PATH, TEST_BROWSER, USERNAME, PASSWORD }  from './environment';

export async function getDriver():Promise<WebDriver> {
    let driver: WebDriver;
    try {
        driver = await getBrowserDriver(TEST_BROWSER) as WebDriver;
        await setApimlAuthTokenCookie(driver, USERNAME, PASSWORD, `${BASE_URL}/api/v1/gateway/auth/login`, BASE_URL_WITH_PATH);
        return driver;
    } catch (err) {
        console.error(err);
    }
};