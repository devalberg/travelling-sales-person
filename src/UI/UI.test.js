import UI from './UI';
import puppeteer from 'puppeteer';

describe("Test UI content change", () => {
    
    let ui;
    let browser;
    let page;

    beforeEach(async() => {
        browser = await puppeteer.launch({
            headless: false
        });
        page = await browser.newPage();
        const htmlPath = 'file://C:/Users/danie/Desktop/travelling-sales-person/dist/index.html'
        await page.goto(htmlPath);
        ui = new UI();
        page.addScriptTag(ui);
    });

    afterEach(async() => {
        await browser.close();
    });

    it('Should update the status to "Running"', async() => {
        const statusElement = await page.$('#status');
        const text = await page.evaluate(el => el.textContent, statusElement);
        ui.displayStatus(false);
        expect(text).toBe("Running");
    });

})