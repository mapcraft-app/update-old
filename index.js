const process = require('process');
const child = require('child_process');
const path = require('path');
const fs = require('fs');
const OS = require('os');
const AdmZip = require('adm-zip');
const DIRNAME = process.cwd();

let Resource = new AdmZip(path.join(DIRNAME, 'temp', 'update_archive.zip'));
Resource.extractAllTo(DIRNAME, true);
fs.rm(path.join(DIRNAME, 'temp'), { recursive: true, force: true });

//#region Restart application
var MAPCRAFT_EXEC;
if (OS.platform() === 'win32') MAPCRAFT_EXEC = 'mapcraft.exe';
else MAPCRAFT_EXEC = 'mapcraft';
const EXECUTABLE = path.join(process.cwd(), MAPCRAFT_EXEC);
var relaunch = child.exec(EXECUTABLE, (error, stdout, stderr) => {
	if (error)
		throw error;
});
relaunch.unref();
process.exit(0);
//#endregion
