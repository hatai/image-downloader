/* eslint-disable */
const readline = require('readline')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const shell = require('shelljs')
const log = console.log
const manifestJson = path.resolve(__dirname, '../public', 'manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestJson, 'utf8'))
const currentVersion = manifest.version


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

log(chalk.blue.bold(`current version: ${currentVersion}`))

rl.question('what is next release version?: ', answer => {
  if (answer !== null && answer !== '')
    manifest.version = answer

  rl.close()

  fs.writeFileSync(manifestJson, JSON.stringify(manifest))
  // shell.ls('*.zip').forEach(file => shell.rm(file))
  shell.exec('yarn build')

  shell.cd('build')
  shell.exec(`${path.resolve(__dirname, '../node_modules/.bin/crx')} pack -o ${path.resolve(__dirname, '../extension.crx')}`)
  process.exit(0)
})

