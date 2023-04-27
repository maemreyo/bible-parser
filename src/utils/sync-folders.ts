import * as fs from 'fs';
import * as path from 'path';

export class FolderSynchronizer {
  //   private readonly sourceFolderName: string;
  //   private readonly dataFolderPath: string;
  private folderPath: string;

  //   constructor(sourceFolderName: string, dataFolderPath: string, folderPath: string) {
  constructor(folderPath: string) {
    // this.sourceFolderName = sourceFolderName;
    // this.dataFolderPath = dataFolderPath;
    this.folderPath = folderPath;
  }

  //   private createTargetFolderRecursively(folderPath: string): void {
  //     // Get the list of files and sub-folders in the current folder
  //     const folders = fs.readdirSync(folderPath);

  //     // Loop through each item
  //     for (const folderItem of folders) {
  //       const folderItemPath = path.join(folderPath, folderItem);

  //       // Check if the folderItem is a directory
  //       if (fs.statSync(folderItemPath).isDirectory()) {
  //         // Recursively create the directory in the JSON folder
  //         const relativePath = path.relative(
  //           this.sourceFolderName,
  //           folderItemPath,
  //         );
  //         const jsonFolderPath = path.join(this.dataFolderPath, relativePath);
  //         fs.mkdirSync(jsonFolderPath, { recursive: true });
  //         this.createTargetFolderRecursively(folderItemPath);
  //       }
  //     }
  //   }

  createJsonFolders(targetPath: string): void {
    const files = fs.readdirSync(this.folderPath, { withFileTypes: true });
    for (const file of files) {
      const sourcePath = path.join(this.folderPath, file.name);
      const targetFolderPath = path.join(targetPath, file.name);
      if (file.isDirectory()) {
        fs.mkdirSync(targetFolderPath);
        const subFolder = new FolderSynchronizer(sourcePath);
        subFolder.createJsonFolders(targetFolderPath);
      }
    }
  }
}
