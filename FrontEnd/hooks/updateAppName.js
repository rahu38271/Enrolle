const fs = require('fs');
const path = require('path');
const et = require('elementtree');
const http = require('http');

const appName = 'Matadarmaza'; // Replace this with the dynamic app name you want

const configPath = path.join(__dirname, '..', 'config.xml');

// Read the config.xml file
fs.readFile(configPath, 'utf8', function (err, data) {
  if (err) {
    throw new Error('Error reading config.xml: ' + err);
  }

  // Parse the XML
  const etree = et.parse(data);

  // Find and update the app name
  const nameElement = etree.find('./name');
  nameElement.text = appName;

  // Save the modified XML back to the config.xml file
  fs.writeFile(configPath, etree.write({ indent: 4 }), function (err) {
    if (err) {
      throw new Error('Error writing to config.xml: ' + err);
    }
    console.log('App name updated to: ' + appName);
  });
});