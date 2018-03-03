/* eslint-disable */
const readline = require('readline')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const shell = require('shelljs')
const zip = require('node-native-zip')
const log = console.log
const archive = new zip()
const manifestJson = path.resolve(__dirname, '../public', 'manifest.json')
const contents = JSON.parse(fs.readFileSync(manifestJson, 'utf8'))
const currentVersion = contents.version


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

log(chalk.blue.bold(`current version: ${currentVersion}`))

rl.question('what is next release version?: ', answer => {
    if (answer !== null || answer !== '')
        contents.version = answer
    rl.close()

    fs.writeFileSync(manifestJson, JSON.stringify(contents))
    shell.ls('*.zip').forEach(file => shell.rm(file))
    shell.exec('yarn build')

    shell.cd('build')
    const files = shell.find('.')
        .filter(file => fs.lstatSync(file).isFile())
        .map(file => ({
          name: `build/${file}`,
            path: path.resolve(process.cwd(), file)
        }))

    archive.addFiles(files, error => {
        if (error) return log(chalk.red(error))

        const buffer = archive.toBuffer()

        shell.cd('../')
        fs.writeFile(path.resolve(process.cwd(), 'release.zip'), buffer, () => {
            log(path.resolve(process.cwd(), 'release.zip'))
            log(chalk.blueBright.bold('Finished'))
            process.exit(0)
        })
    })
})

