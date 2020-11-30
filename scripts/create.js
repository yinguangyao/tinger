const yargs = require('yargs')
const fs = require('fs')

const { p: project } = yargs.argv
const dirname = process.cwd()

// 拷贝文件夹到目标目录
const copy = (source, target) => {
  console.log(`source=${source}|target=${target}`)
  try {
    const stats = fs.statSync(source)
    if (stats.isDirectory()) {
      fs.readdir(source, (err, files) => {
        if (err) {
          console.error('copy files error', err);
          process.exit(1)
        }
        fs.access(target, (err) => {
          if (err) {
            fs.mkdirSync(target)
          }
          files.forEach(file => {
            copy(`${source}/${file}`, `${target}/${file}`)
          })
        })
      })
    } else {
      if (target.indexOf('package.json') > -1) {
        return;
      }
      fs.createReadStream(source).pipe(fs.createWriteStream(target))
    }
  } catch (err) {
    console.error(`err.stack=${err.stack}|err.message=${err.message}`);
    process.exit(1)
  }
}

const template = `${dirname}/packages/example`
const target = `${dirname}/packages/${project}`
try {
  const stats = fs.statSync(target)
  // 检查目录是否存在
  if (stats.isDirectory()) {
    console.error(`Sub project ${project} has been existed!`)
    process.exit(1)
  }
} catch (err) {
  console.error(`err.stack=${err.stack}|err.message=${err.message}`);
}

fs.mkdirSync(target)
copy(template, target);
// 替换 package 里面的字段
const package = require(`${template}/package.json`);
package.name = project;
fs.writeFile(
  `${target}/package.json`,
  JSON.stringify(package, null, "\t"),
  (err) => {
    if (err) {
      console.error('write err', err);
      process.exit(1)
    }
  }
)