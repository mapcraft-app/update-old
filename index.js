const process = require('process');
const child = require('child_process');
const fs = require('fs');
const AdmZip = require('adm-zip');

let Resource = new AdmZip(process.env.ZIP_PATH);
Resource.extractAllTo(process.env.UNZIP_PATH, true);
fs.rmSync(process.env.ZIP_PATH, { recursive: true, force: true });

//#region Restart application
var relaunch = child.spawn(process.env.EXECUTE_PATH, {detached: true, stdio: ['ignore', 'ignore', 'ignore']});
relaunch.unref();
process.exit(0);
//#endregion