import { expect, Page } from "@playwright/test";

export default class InfrastructurePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
dismiss = () => this.page.locator('xpath=//span[contains(text(),"Dismiss")]');
sortWaffleByDropdown = () => this.page.getByTestId('waffleSortByDropdown');
sortWaffleByValue = () => this.page.getByTestId('waffleSortByValue');
nodesWaffleMap = () => this.page.locator('xpath=//div[@data-test-subj="waffleMap"]/div[1]/div[1]/div[2]');
nodesWaffleMapContainer = () => this.page.locator('xpath=//div[@data-test-subj="waffleMap"]/div[1]/div[1]/div[2]/*[@data-test-subj="nodeContainer"][1]');
inventorySwitcher = () => this.page.getByTestId('openInventorySwitcher');
inventorySwitcherPods = () => this.page.getByTestId('goToPods');
tableView = () => this.page.locator('xpath=//button[@title="Table view"]');
tableCell = () => this.page.locator('xpath=(//tbody//td)[1]//span[contains(@class, "euiTableCellContent__text")]');
popoverK8sMetrics = () => this.page.locator('xpath=//*[contains(text(),"Kubernetes Pod metrics")]');
hostsLogs = () => this.page.getByTestId('hostsView-tabs-logs');
logsSearchField = () => this.page.locator('xpath=//input[@placeholder="Search for log entries..."]');
visualizationOptions = () => this.page.locator('xpath=//div[@data-test-embeddable-id="hostsViewKPI-cpuUsage"]//button[@data-test-subj="embeddablePanelToggleMenuIcon"]');
inspector = () => this.page.locator('xpath=//..//button[@data-test-subj="embeddablePanelAction-openInspector"]');
inspectorChooser = () => this.page.getByTestId('inspectorViewChooser');
inspectorRequests = () => this.page.getByTestId('inspectorViewChooserRequests');
inspectorRequestDetail = () => this.page.getByTestId('inspectorRequestDetailRequest');
inspectorRequestCopyClipboardButton = () => this.page.getByTestId('inspectorRequestCopyClipboardButton');
flyoutInfraAssetDetailsCloseButton = () => this.page.locator('xpath=//div[@data-component-name="infraAssetDetailsFlyout"]//button[@data-test-subj="euiFlyoutCloseButton"]');
flyoutCloseButton = () => this.page.getByTestId('euiFlyoutCloseButton');
canvas = () => this.page.locator('xpath=//canvas[contains(@class, "echCanvasRenderer")]');
aggregationPicker = () => this.page.getByTestId('infraMetricsExplorerAggregationPickerSelect');
graphPerInput = () => this.page.locator('xpath=//input[@aria-label="Graph per"]');
infraSearchField = () => this.page.locator('xpath=//input[@data-test-subj="infraSearchField"]');
pressEnter = () => this.page.keyboard.press('Enter');
arrowDown = () => this.page.keyboard.press('ArrowDown');

public async clickDismiss() {
    await this.dismiss().click();
    }

public async sortByMetricValue() {
    await this.sortWaffleByDropdown().click();
    await this.sortWaffleByValue().click();
    }

public async switchInventoryToPodsView() {
    await this.inventorySwitcher().click();
    await this.inventorySwitcherPods().click();
    }

public async clickNodeWaffleContainer() {
    await this.nodesWaffleMap().hover();
    await this.nodesWaffleMapContainer().click({ force: true });
    }

public async switchToTableView() {
    await this.tableView().click();
    }
    
public async clickTableCell() {
    await this.tableCell().click();
    }

public async clickPopoverK8sMetrics() {
    await this.popoverK8sMetrics().click();
    }

public async openHostsLogs() {
    await this.hostsLogs().click();
    }

public async searchErrors() {
    await this.logsSearchField().fill('error');
    }

public async openRequestsView() {
    await this.inspector().click();
    await this.inspectorChooser().click();
    await this.inspectorRequests().click();
    }

public async queryToClipboard() {
    await this.inspectorRequestDetail().click();
    await this.inspectorRequestCopyClipboardButton().click();
    }
    
public async closeFlyout() {
    await this.flyoutCloseButton().click();
    }

public async closeInfraAssetDetailsFlyout() {
    await this.flyoutInfraAssetDetailsCloseButton().click();
    }

public async logQuery(title: string) {
    let clipboardData = await this.page.evaluate("navigator.clipboard.readText()");
    console.log(title, ': ', '\n', clipboardData, '\n');
    }

public async hostsVisualizationOptions(title: string) {
    await this.page.locator(`xpath=//div[@data-test-embeddable-id="${title}"]//button[@data-test-subj="embeddablePanelToggleMenuIcon"]`).click();
    }

public async assertVisibilityVisualization(title: string) {
    if (await this.page.locator(`xpath=//div[@data-test-embeddable-id="${title}"]//div[contains(@class, "echChartContent")]`).isHidden()){
    await this.page.keyboard.press('ArrowDown');
  }
  await expect(this.page.locator(`xpath=//div[@data-test-embeddable-id="${title}"]//div[contains(@class, "echChartContent")]`), `"${title}" visualization should be visible`).toBeVisible();
    }

public async assertVisibilityPodVisualization(title: string) {
    await expect(this.page.locator(`xpath=//div[@data-test-subj="infraMetricsPage"]//div[@id="${title}"]//div[contains(@class, "echChartContent")]`), `"${title}" visualization should be visible`).toBeVisible();
    }

public async clickAggregationPicker() {
    await this.aggregationPicker().click();
    }

public async aggregateBy95thPercentile() {
    await this.aggregationPicker().selectOption({ value: 'p95' });
    }

public async assertVisibilityMetricsCanvas() {
    await expect(this.canvas()).toBeVisible();
    }

public async graphPerKubernetesNamespace() {
    await this.graphPerInput().click();
    await this.graphPerInput().fill('kubernetes.namespace');
    await this.arrowDown();
    await this.pressEnter();
    }

public async filterByKubesystemNamespace() {
    await this.infraSearchField().click();
    await this.infraSearchField().fill('kube-system');
    await this.pressEnter();
    }
}