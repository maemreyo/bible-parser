import * as fs from 'fs';
import * as path from 'path';

class FolderSynchronizer {
  private readonly srcDir = path.resolve(__dirname, '../../src');
  private readonly defaultSourceFolderPath = path.join(
    this.srcDir,
    'data/source',
  );
  private readonly defaultTargetFolderPath = path.join(
    this.srcDir,
    'data/target',
  );
  private readonly sourceFolderPath: string;
  private readonly targetFolderPath: string;

  constructor(sourceFolderPath?: string, targetFolderPath?: string) {
    this.sourceFolderPath = sourceFolderPath || this.defaultSourceFolderPath;
    this.targetFolderPath = targetFolderPath || this.defaultTargetFolderPath;
  }

  private createJsonFoldersRecursive(
    sourceFolderPath: string,
    targetFolderPath: string,
  ) {
    const files = fs.readdirSync(sourceFolderPath);
    for (const file of files) {
      const filePath = path.join(sourceFolderPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        const newJsonFolderPath = path.join(targetFolderPath, file);
        fs.mkdirSync(newJsonFolderPath);
        this.createJsonFoldersRecursive(filePath, newJsonFolderPath);
      }
    }
  }

  private checkTargetExists = (targetPath: string): boolean =>
    fs.existsSync(targetPath);

  public createJsonFolders() {
    // Check if target folder already exists
    if (this.checkTargetExists(this.targetFolderPath)) {
      console.log(
        `Target folder ${this.targetFolderPath} already exists in data folder.`,
      );
      return;
    }

    fs.mkdirSync(this.targetFolderPath, { recursive: true });

    this.createJsonFoldersRecursive(
      this.sourceFolderPath,
      this.targetFolderPath,
    );
  }
}

export default FolderSynchronizer;
