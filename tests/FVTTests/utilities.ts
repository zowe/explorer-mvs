/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */
import { WebDriver, By, WebElement, until } from "selenium-webdriver";

export async function editDatasetQualifierField(driver :WebDriver, searchQualifier :string) {
    const qualifierField: WebElement = await driver.findElement(By.id("datasets-qualifier-field"));
    await qualifierField.clear();
    await qualifierField.sendKeys(searchQualifier);

    await driver.wait(until.elementLocated(By.id('loading-icon')), 20000);
    await driver.wait(until.elementLocated(By.id('refresh-icon')), 20000);
}