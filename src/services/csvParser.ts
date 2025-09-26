import Papa from 'papaparse';
import { userInterface } from "../types/user";

export class csvParser {
   // convert JSON to CSV
  readonly config = { delimiter: ',', header: true };

  parseCSV(data: userInterface[]): string {
    return Papa.unparse(data, this.config)
  }

  downloadCSV(data: userInterface[], filename: string = 'users.csv') {

    const csvString = this.parseCSV(data);

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8'});

    const url = URL.createObjectURL(blob);

    // temporary link to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);

    // append link to dom
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // clean URL to free up memory
    URL.revokeObjectURL(url);
  }
}