import { test, expect } from '@playwright/test';

test.describe('Playwright Demo', () => {
  test('Has title', async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/)
  })

  test.skip('Google into Playwright', async ({ page }) => {
    await page.goto("https://www.google.com/");
    await page.getByRole('combobox', { name: 'Buscar' }).fill('playwright');
    await page.getByRole('combobox', { name: 'Buscar' }).press('Enter');

    await expect(page).toHaveTitle(/Playwright/)
  });

  //Actividad 1
  test('Github login fail', async ({ page }) => {
    await page.goto("https://github.com/");
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('textbox', { name: 'Username or email address' }).fill('Anigo');
    await page.getByRole('textbox', { name: 'Password' }).fill('Hola');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Incorrect username or')).toHaveText("Incorrect username or password.");
  });
})

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
