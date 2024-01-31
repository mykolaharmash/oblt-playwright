import {test} from '../../tests/fixtures/serverless/basePage';

test.beforeEach(async ({ page, landingPage }) => {
  await landingPage.goto();
  await landingPage.clickInfrastructure();
});

test('Infrastructure - Cluster Overview dashboard', async ({ page, landingPage, dashboardPage, datePicker }) => {
  const coresUsedVsTotal = "Cores used vs total cores";
  const topMemoryIntensivePods = "Top memory intensive pods";

  // Navigates to Dashboards, filters dashboards by Kubernetes tag.
  await landingPage.clickDashboards();
  await dashboardPage.assertVisibilityHeading();
  await dashboardPage.assertVisibilityTable();
  await dashboardPage.filterByKubernetesTag();
  await page.waitForLoadState('networkidle');

  // Opens [Metrics Kubernetes] Cluster Overview dashboard.
  await page.getByRole('link', { name: "[Metrics Kubernetes] Cluster Overview" }).click();
  await page.waitForLoadState('networkidle');

  // Filters data by last 1 hour.
  await datePicker.clickDatePicker();
  await datePicker.fillTimeValue('1');
  await datePicker.selectTimeUnit('Hours');
  await datePicker.clickApplyButton();
  
  // Asserts "Cores used vs total cores" visualization visibility.
  await dashboardPage.assertVisibilityVisualization(coresUsedVsTotal);
  
  // Logs Elasticsearch query.
  await dashboardPage.kubernetesVisualizationOptions(coresUsedVsTotal);
  await dashboardPage.openRequestsView();
  await dashboardPage.queryToClipboard();
  console.log('[Metrics Kubernetes] Cores used vs total cores.');
  await dashboardPage.logQuery();
  await dashboardPage.closeFlyout();
  
  // Asserts "Top memory intensive pods" visualization visibility.
  await dashboardPage.assertVisibilityVisualization(topMemoryIntensivePods);
  
  // Logs Elasticsearch query.
  await dashboardPage.kubernetesVisualizationOptions(topMemoryIntensivePods);
  await dashboardPage.openRequestsView();
  await dashboardPage.queryToClipboard();
  console.log('[Metrics Kubernetes] Top memory intensive pods.');
  await dashboardPage.logQuery();
  await dashboardPage.closeFlyout();
});

test('Infrastructure - Inventory', async ({ page, infrastructurePage, landingPage, datePicker }) => {
  const cpuUsage = "infraAssetDetailsKPIcpuUsage";
  const memoryUsage = "infraAssetDetailsHostMetricsChartmemoryUsage";
  const podCpuUsage = "podCpuUsage";
  const podMemoryUsage = "podMemoryUsage";

  // Navigates to Observability > Infrastructure > Inventory.
  await landingPage.clickInventory();

  // Ensures "Hosts" is selected as "Show" option. Clicks on any displayed host to open the detailed view.
  await infrastructurePage.clickDismiss();
  await infrastructurePage.sortByMetricValue();
  await infrastructurePage.clickNodeWaffleContainer(); 
  await datePicker.clickDatePicker();
  if (await datePicker.assertSelectedDate()) {
    await datePicker.selectDate();
  } else {    
    await datePicker.fillTimeValue('30');
    await datePicker.selectTimeUnit('Days');
    await datePicker.clickApplyButton();
  }
  await page.waitForLoadState('networkidle');
  // Asserts "Host CPU Usage" & "Host Memory Usage" visualizations visibility.
  await infrastructurePage.assertVisibilityVisualization(cpuUsage);
  await infrastructurePage.assertVisibilityVisualization(memoryUsage);

  // Returns back to Observability > Infrastructure > Inventory.
  await infrastructurePage.closeInfraAssetDetailsFlyout();

  // Selects "Pods" as "Show" option.
  await infrastructurePage.switchInventoryToPodsView();
  await page.waitForLoadState('networkidle');
  // Clicks on the tile of some pod, then clicks on the "Kubernetes Pod metrics" link.
  await infrastructurePage.sortByMetricValue();
  await infrastructurePage.switchToTableView();
  await page.waitForLoadState('networkidle');
  await infrastructurePage.clickTableCell();
  await infrastructurePage.clickPopoverK8sMetrics();
  // Filters data by selected date picker option.
  await datePicker.assertVisibilityDatePicker();
  await datePicker.clickDatePicker();
  await datePicker.selectDate();
  // Asserts "Pod CPU Usage" & "Pod Memory Usage" visualization visibility.
  await infrastructurePage.assertVisibilityPodVisualization(podCpuUsage);
  await infrastructurePage.assertVisibilityPodVisualization(podMemoryUsage);
});

test('Infrastructure - Hosts', async ({ page, infrastructurePage, landingPage, datePicker }) => {
  const cpuUsage = "hostsViewKPI-cpuUsage";
  const normalizedLoad = "hostsView-metricChart-normalizedLoad1m";

  // Navigates to Observability > Infrastructure > Hosts.
  await landingPage.clickHosts();
  await datePicker.clickDatePicker();
  await datePicker.selectDate();
  await page.waitForLoadState('networkidle');

  // Asserts "Host CPU Usage" & "Host Normalized Load" visualizations visibility.
  await infrastructurePage.assertVisibilityVisualization(cpuUsage);
  await infrastructurePage.assertVisibilityVisualization(normalizedLoad);

  // Clicks on the "Logs" tab, filters logs by searching "error".
  await infrastructurePage.openHostsLogs();
  await infrastructurePage.searchErrors();
});