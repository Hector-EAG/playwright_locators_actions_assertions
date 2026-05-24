import { test, expect, firefox, chromium } from '@playwright/test';

test.describe("Browser Context", () => {
    //Actividad 1
    test('Github login fail', async ({ page }) => {
      await page.goto("https://github.com/");
      await page.getByRole('link', { name: 'Sign in' }).click();
      await page.getByRole('textbox', { name: 'Username or email address' }).fill('Anigo');
      await page.getByRole('textbox', { name: 'Password' }).fill('Hola');
      await page.getByRole('button', { name: 'Sign in', exact: true }).click();
      await expect(page.getByText('Incorrect username or')).toBeVisible();
    });

    //Actividad 2
    test('Should create a new Browser context', async ({ }) => {
    const browser = await firefox.launch();
    console.log('browser: ', browser.contexts().length);
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://playwright.dev/");
    console.log('browser: ', browser.contexts().length);
    await context.close();
    await browser.close();
    });

    //Actividad 3
    test('Multiple pages', async ({ }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://playwright.dev/docs/intro");
    const page2 = await context.newPage();
    await page2.goto("https://playwright.dev/docs/writing-tests");
    await page.screenshot({path: "./e2e/screenshots/basic_exercises/screenshot1.png"})
    await page2.screenshot({path: "./e2e/screenshots/basic_exercises/screenshot2.png"})
    await browser.close();
    });

    //Actividad 4
    test('Pages Methods', async ({ }) => {
    const browser = await firefox.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://playwright.dev/");
    await page.screenshot({path: "./e2e/screenshots/basic_exercises/test5/playwright_main_page.png"})
    await page.goto("https://github.com/");
    await page.screenshot({path: "./e2e/screenshots/basic_exercises/test5/github_main_page.png"})
    page.once('load', () => {
      console.log('Page loaded!');
    });
    await page.goBack();
    await page.screenshot({path: "./e2e/screenshots/basic_exercises/test5/page_final_page.png"})
    await browser.close();
    });
});
