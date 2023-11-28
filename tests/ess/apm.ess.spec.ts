import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('toggleNavButton').click();
  await page.getByRole('link', { name: 'APM' }).click();
});

test('APM - Services', async ({ page }) => {
  // Navigates to Observability > APM > Services.
  await expect(page.getByRole('link', { name: 'Services' })).toBeVisible();
  await page.getByRole('link', { name: 'Services' }).click();
  await expect(page.locator('xpath=//table[@class="euiTable css-0 euiTable--responsive"]//tbody[@class="css-0"]//tr[@class="euiTableRow"][1]//a')).toBeVisible();
  
  // Clicks on the service name with the highest error rate from the Inventory.
  // await page.getByTestId('superDatePickerToggleQuickMenuButton').click();
  // await page.getByLabel('Commonly used').getByRole('button', { name: process.env.DATE_PICKER }).click();
  // await page.waitForLoadState('networkidle');
  // await page.locator('xpath=//span[@title="Failed transaction rate"]').click();
  // await page.locator('xpath=//span[@title="Failed transaction rate"]').click();
  // await expect(page.locator('xpath=//*[@data-icon-type="sortUp"]')).toBeVisible();
  // await page.locator('xpath=//table[@class="euiTable css-0 euiTable--responsive"]//tbody[@class="css-0"]//tr[@class="euiTableRow"][1]//a').click();
  await page.locator('xpath=//span[contains(text(),"opbeans-go")]').click();
  await page.waitForLoadState('networkidle');
  
  // Filters data by selected date picker option.
  await page.getByTestId('superDatePickerToggleQuickMenuButton').click();
  await page.getByLabel('Commonly used').getByRole('button', { name: process.env.DATE_PICKER }).click();
  await page.waitForLoadState('networkidle');
  
  // Opens the "Transactions" tab. Clicks on the most impactful transaction.
  await page.getByTestId('transactionsTab').click();
  await page.getByTestId('superDatePickerToggleQuickMenuButton').click();
  await page.getByLabel('Commonly used').getByRole('button', { name: process.env.DATE_PICKER }).click();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('xpath=//div[@data-test-subj="throughput"]//div[contains(@class, "echChartContent")]')).toBeVisible();
  await page.waitForLoadState('networkidle');
  await page.locator('xpath=//table[@class="euiTable css-0 euiTable--responsive"]//tbody[@class="css-0"]//tr[@class="euiTableRow"][1]//td[@class="euiTableRowCell euiTableRowCell--middle"][1]//a').click();
  await expect(page.locator('xpath=//div[@data-test-subj="throughput"]//div[contains(@class, "echChartContent")]')).toBeVisible();
  await page.waitForLoadState('networkidle');
  
  // Clicks on the "Failed transaction correlations" tab.
  await page.getByRole('tab', { name: 'Failed transaction correlations' }).click();
  await page.waitForLoadState('networkidle');
  
  // Sorts the result by field value. Filters the result by a particular field value by clicking on the "+".
  await expect(page.locator('xpath=//table[@class="euiTable css-0 euiTable--responsive"]//tbody[@class="css-0"]//tr[@class="euiTableRow euiTableRow-hasActions euiTableRow-isClickable"][1]//td[@class="euiTableRowCell euiTableRowCell--hasActions euiTableRowCell--middle"]//span[1]//button')).toBeVisible();
  await page.getByRole('button', { name: 'Field value', exact: true }).click();
  await page.locator('xpath=//table[@class="euiTable css-0 euiTable--responsive"]//tbody[@class="css-0"]//tr[@class="euiTableRow euiTableRow-hasActions euiTableRow-isClickable"][1]//td[@class="euiTableRowCell euiTableRowCell--hasActions euiTableRowCell--middle"]//span[1]//button').click();
  await page.waitForLoadState('networkidle');
  
  // Clicks on "Investigate", selects "Host logs".
  // await page.getByRole('button', { name: 'Investigate' }).click();
  // await page.getByRole('link', { name: 'Host logs' }).click();
  // await page.waitForLoadState('networkidle');
  
  // Filters logs by selected date picker option, then filters by error messages.
  // await page.getByTestId('superDatePickerToggleQuickMenuButton').click();
  // await page.getByLabel('Commonly used').getByRole('button', { name: process.env.DATE_PICKER }).click();
  // await page.waitForLoadState('networkidle');
  // await page.getByTestId('addFilter').click();
  // await page.getByTestId('filterFieldSuggestionList').click();
  // await page.locator('xpath=//input[@aria-label="Select a field"]').fill('error.log.message');
  // await page.getByTestId('filterOperatorList').click();
  // await page.locator('xpath=//input[@aria-label="Select operator"]').fill('exists');
  // await page.keyboard.press('Enter');
  // await page.getByTestId('saveFilter').click();
  // await page.waitForLoadState('networkidle');
});

test('APM - Traces', async ({ page }) => {
  // Navigates to Observability > APM > Traces.
  await page.getByTestId('observability-nav-apm-traces').click();
  await page.waitForLoadState('networkidle');
  
  // Opens the "Explorer" tab, filters data by http.response.status_code : 502.
  await page.getByRole('tab', { name: 'Explorer' }).click();
  await page.waitForLoadState('networkidle');
  await page.getByTestId('superDatePickerToggleQuickMenuButton').click();
  await page.getByLabel('Commonly used').getByRole('button', { name: process.env.DATE_PICKER }).click();
  await page.waitForLoadState('networkidle');
  await page.getByPlaceholder('Filter your data using KQL syntax').click();
  await page.getByPlaceholder('Filter your data using KQL syntax').fill('http.response.status_code : 502');
  await page.getByTestId('apmTraceSearchBoxSearchButton').click();
  await page.waitForLoadState('networkidle');
  
  // Clicks on the "View related error" in the timeline.
  const relatedError = page.locator('xpath=(//a[@title="View related error"])[1]');
  const relatedErrors = page.locator('xpath=(//a[@title="View 2 related errors"])[1]');

  if (await relatedError.isVisible()){
    await relatedError.click();
  } else {
    await relatedErrors.click();
  }
  
  await page.waitForLoadState('networkidle');
});

test('APM - Dependencies', async ({ page }) => {  
  // Navigates to Observability > APM > Dependencies.
  await page.getByRole('link', { name: 'Dependencies' }).click();
  await expect(page.locator('xpath=//table[@class="euiTable css-0 euiTable--responsive"]//tbody[@class="css-0"]//tr[@class="euiTableRow"][1]//td[1]//a')).toBeVisible();

  // Filters data by selected date picker option.
  await page.getByTestId('superDatePickerToggleQuickMenuButton').click();
  await page.getByLabel('Commonly used').getByRole('button', { name: process.env.DATE_PICKER }).click();
  await page.waitForLoadState('networkidle');

  // Selects the dependency, then navigates to the "Operations" tab.
  await page.locator('xpath=//table[@class="euiTable css-0 euiTable--responsive"]//tbody[@class="css-0"]//tr[@class="euiTableRow"][1]//td[1]//a').click();
  await expect(page.locator('xpath=//table[@class="euiTable css-0 euiTable--responsive"]//tbody[@class="css-0"]//tr[@class="euiTableRow"][1]//td[1]')).toBeVisible();
  await page.getByRole('tab', { name: 'Operations' }).click();
  await expect(page.locator('xpath=//table[@class="euiTable css-0 euiTable--responsive"]//tbody[@class="css-0"]//tr[@class="euiTableRow"][1]//td[1]')).toBeVisible();

  // Clicks on the most impactful operation.
  await page.locator('xpath=//table[@class="euiTable css-0 euiTable--responsive"]//tbody[@class="css-0"]//tr[@class="euiTableRow"][1]//td[1]//a').click();
  await expect (page.locator('xpath=//*[@type="transaction"]//*[@color]')).toBeVisible();

  // Clicks on the transaction in the timeline to open the detailed view.
  await page.locator('xpath=//*[@type="transaction"]//*[@color]').click();
  await expect (page.locator('xpath=//*[@role="tabpanel"]')).toBeVisible();

  // Clicks on "Investigate", selects "View transaction in Discover".
  await page.locator('xpath=//*[@role="dialog"]//*[@data-test-subj="apmActionMenuButtonInvestigateButton"]').click();
  await page.getByRole('link', { name: 'View transaction in Discover' }).click();
  await expect (page.locator('xpath=//div[@data-grid-row-index="0"]')).toBeVisible();
});