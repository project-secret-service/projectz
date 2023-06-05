import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Enter Username').click();
  await page.getByPlaceholder('Enter Username').fill('swarnim@kamaal.com');
  await page.getByPlaceholder('Enter Password').click();
  await page.getByPlaceholder('Enter Password').fill('kamal');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByRole('link', { name: 'Profile Swarnim Kamal' }).click();
  await page.getByRole('link', { name: ' My Profile' }).click();
  await page.getByRole('link', { name: ' Dashboard' }).click();
  await page.getByRole('link', { name: ' Duties ' }).click();
  await page.getByRole('link', { name: ' List Duties' }).click();
  await page.getByRole('button', { name: ' Add Duties' }).click();
  await page.getByRole('button', { name: 'BACK' }).click();
  await page.getByRole('button', { name: ' Print Duty Log' }).click();
  await page.getByRole('button', { name: ' ASCENDING' }).click();
  await page.getByRole('button', { name: ' DESCENDING' }).click();
});