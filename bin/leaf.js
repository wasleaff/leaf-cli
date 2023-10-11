#! /usr/bin/env node

import {program} from 'commander'
import chalk from 'chalk'
import create from '../lib/create.js'

//脚手架基本信息（描述、版本号、用法）
program.name('leaf-cli')
.description('CLI to some project init')
//TODO 版本获取
// .version(`leaf-cli@${require('../package.json').version}`,'-v,--version')
.version(`leaf-cli@1.0.0}`,'-v,--version')
.usage('<command> [options]')

//脚手架修改配置信息command
program.command('config [value]')
.description('inspect and modify the config')
.option('-g,--get <path> [value]','get value from option')
.option('-s,--set <path> [value]','set value to option')
.option('-d,--delete <path>','delete option from config')
.action((value,option,cmd)=>{
  console.log(value,option)
})

//脚手架创建项目command(已经存在的覆盖)
program.command('create <app-name>')
.description('create a new project with your project-name')
.usage('<app-name> [options]')
.option('-f,--force','overwrite target director if it exists')
.action((appName,option,cmd)=>{
  console.log(appName,option)
  //调用create模块
  create(appName,option)
})

program.on('--help',()=>{
  console.log()
  console.log(chalk.green.bold('Run leaf-cli <command> --help for show more detail'))
  console.log()
})

program.parse(process.argv)


