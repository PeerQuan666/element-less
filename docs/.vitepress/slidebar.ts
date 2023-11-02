import * as fs from 'fs';
import * as path from 'path';
const extension = '.md';
function getSidebar(rootPath: string, directoryPath: string) {
  const fullPath = path.join(rootPath, '../', directoryPath);
  var files = fs.readdirSync(fullPath);
  const currFiles = files.filter(ele => ['demo', 'pages', 'design'].includes(ele))
 
  const result: any = []
  const folds = currFiles.filter(file => !path.extname(file));
  folds.forEach(ele => {
    const currPath = path.join(fullPath, ele);
    const cfiles = fs.readdirSync(currPath)
    result.push(getMdSidebar(currPath, cfiles, ele))
  })
  result.sort(function (a, b) {
    return a.order - b.order;
  });

  return result

}
function getMdSidebar(fullPath, files, directoryPath) {
  const result: any = { text: '', order: 0, items: [] }
  //查找index文件

  const indexFile = files.find(ele => ele === 'index.md')
  if (indexFile) {
    const currPath = path.join(fullPath, indexFile);
    const dataStr = fs.readFileSync(currPath, 'utf8')
    const mathResult = dataStr.match(/title:\s+(?<title>[^\s]+)/)
    const orderResult = dataStr.match(/order:\s+(?<order>[^\s]+)/)
    let order = 0;
    if (orderResult && orderResult.groups) {
      order = parseFloat(orderResult.groups['order'])
 
    }
    result['order'] = order;
    if (mathResult && mathResult.groups) {
      const title = mathResult.groups['title']
      result['text'] = title;
    } else {
      result['text'] = indexFile;
    }
  }
  const otherFiles = files.filter(file => path.extname(file) === extension && file !== 'index.md');
  result.items.push(...otherFiles.map(file => {
    const currPath = path.join(fullPath, file);
    const dataStr = fs.readFileSync(currPath, 'utf8')
    const mathResult = dataStr.match(/title:\s+(?<title>[^\s]+)/)
    const orderResult = dataStr.match(/order:\s+(?<order>[^\s]+)/)
    let order = 0;
    if (orderResult && orderResult.groups) {
      order = parseFloat(orderResult.groups['order'])
    }

    if (mathResult && mathResult.groups) {
      return {
        text: mathResult.groups['title'],
        order: order,
        link: '/' + directoryPath + '/' + path.basename(file, extension)
      }
    } else {
      return {
        text: path.basename(file, extension),
        order: 0,
        link: path.join(directoryPath, path.basename(file, extension)).replace(/\\/gi, "/")
      }
    }
  }));
  result.items.sort(function (a, b) {
    return a.order - b.order;
  });
  return result


}
export default getSidebar