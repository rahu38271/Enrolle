export class FileData {
    name: string;
    type: string;
    size: number;
  
    constructor(name: string, type: string, size: number) {
        
      this.name = name;
      this.type = type;
      this.size = size;
    }
  }