const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Ensure reports directory exists
const reportsDir = path.join(__dirname, 'cypress', 'reports');
const htmlReportDir = path.join(reportsDir, 'html');

if (!fs.existsSync(htmlReportDir)) {
  fs.mkdirSync(htmlReportDir, { recursive: true });
}

report.generate({
  jsonDir: path.join(reportsDir, 'cucumber-json'),
  reportPath: htmlReportDir,
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest',
    },
    device: 'Local Machine',
    platform: {
      name: process.platform,
      version: process.version,
    },
  },
  customData: {
    title: 'Cypress Automation Test Report',
    data: [
      { label: 'Project', value: 'DemoQA Automation Challenge' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Date', value: new Date().toLocaleString() },
      { label: 'Environment', value: process.env.CYPRESS_ENVIRONMENT || 'dev' },
    ],
  },
});

console.log('HTML Report generated successfully!');
console.log(`Report location: ${htmlReportDir}/index.html`);
