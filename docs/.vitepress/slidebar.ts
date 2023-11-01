import * as fs from 'fs';
import * as path from 'path';
const extension = '.md';
function getSidebar(rootPath: string, directoryPath: string, excludeFileName: string[] = []): Promise<{ text: string, link: string }[]> {


  const fullPath = path.join(rootPath, '../', directoryPath);

  return new Promise((resolve, reject) => {

    fs.readdir(fullPath, (err, files) => {

      if (err) {
        reject(err);
      } else {
        const result: any = []
        const folds = files.filter(file => !path.extname(file));
    
        folds.forEach(ele => {
          const currPath = path.join(fullPath, ele);
          fs.readdir(currPath, (err, cfiles) => {
          result.push(...getMdSidebar(cfiles, excludeFileName, currPath))
          })
        })
        result.push(...getMdSidebar(files, excludeFileName, directoryPath))

        resolve(result);
      }
    });
  });
}
function getMdSidebar(files, excludeFileName, directoryPath) {
  const filteredFiles = files.filter(file => path.extname(file) === extension && !excludeFileName.includes(path.basename(file, extension)));
  console.info(filteredFiles)
  const result = filteredFiles.map(file => {
    
    return {
      text: path.basename(file, extension),
      link: path.join(directoryPath, path.basename(file, extension)).replace(/\\/gi, "/")
    }
  });
  return result


}
export default getSidebar