import { test, expect } from '@playwright/test';

//Actividad 1
test.describe('Mercado Libre', () => {
  test('7 Locators', async ({ page }) => {
    await page.goto("https://www.mercadolibre.com.mx/");
    await expect(page.getByRole('combobox', { name: 'Ingresa lo que quieras' })).toBeVisible();
    await expect(page.getByTestId('text:main-text')).toBeVisible();
    await expect(page.getByAltText('MLM FSNB')).toBeVisible();
    await expect(page.getByText('Crea tu cuentaIngresaMis compras0 productos en tu carrito')).toBeVisible();
    await expect(page.getByLabel('0 productos en tu carrito')).toBeVisible();
    await expect(page.getByPlaceholder('Buscar productos, marcas y más…')).toBeVisible();
    await expect(page.getByTitle('Carrito')).toBeVisible();
  })
})

//Actividad 2
//I could not find AltText, Lable and Title (for this last one I "replaced" it with toHaveTitle)
test.describe('ToDo ', () => {
  test('Has Correct Title @initialLoading', async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");
    await expect(page.getByText('This is just a demo of')).toBeVisible();
    await expect(page).toHaveTitle('React • TodoMVC');
    await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  });
  test('Adding Tasks @Functionality', async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");
    await page.screenshot({path: "./e2e/screenshots/locators_actions_assertions/adding_tasks/before.png"});
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Hacer Tests');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('No Reprobar');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.screenshot({path: "./e2e/screenshots/locators_actions_assertions/adding_tasks/after.png"});
    await expect(page.getByTestId('todo-title')).toContainText(['Hacer Tests', 'No Reprobar']);
  });
  test('Editing Tasks @Functionality', async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('No me Repruebe');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.screenshot({path: "./e2e/screenshots/locators_actions_assertions/edit_tasks/before.png"});
    await page.getByTestId('todo-title').dblclick();
    await page.getByRole('textbox', { name: 'Edit' }).fill('Porfavor...');
    await page.getByRole('textbox', { name: 'Edit' }).press('Enter');
    await page.screenshot({path: "./e2e/screenshots/locators_actions_assertions/edit_tasks/after.png"});
    //Use not for the sake of the requirements of the activity, 
    //I would Hvae put a simple toContainText otherwise
    await expect(page.getByTestId('todo-title')).not.toContainText('No me Repruebe');
  });
  test('Removing Tasks @Functionality', async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('No se que poner');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    const txt = await page.getByTestId('todo-title').textContent();
    await page.screenshot({path: "./e2e/screenshots/locators_actions_assertions/remove_tasks/before.png"});
    expect(txt).toBe('No se que poner');
    await page.getByTestId('todo-title').hover();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.screenshot({path: "./e2e/screenshots/locators_actions_assertions/remove_tasks/after.png"});
    await expect(page.getByTestId('todo-title')).toBeHidden();
  });
  test.fail('Should not work @Fail', async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");
    await expect.soft(page).toHaveTitle('Esto no es un titulo');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('No se que poner');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await expect(page.getByTestId('todo-title')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
  });
})
