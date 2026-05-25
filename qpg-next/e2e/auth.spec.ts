import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('landing page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Question Paper');
    await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible();
  });

  test('login page renders', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('register page renders', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('heading', { name: /create.*account/i })).toBeVisible();
    await expect(page.getByPlaceholder(/name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
  });

  test('login form validation', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /sign in/i }).click();
    // Form should show validation errors
    await expect(page.locator('text=email')).toBeVisible();
  });

  test('redirect to login when accessing dashboard unauthenticated', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL(/login/);
    expect(page.url()).toContain('/login');
  });
});

test.describe('Navigation', () => {
  test('landing page navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /features/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /pricing/i })).toBeVisible();
  });

  test('login link navigates to login page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /sign in/i }).click();
    await page.waitForURL(/login/);
    expect(page.url()).toContain('/login');
  });
});
