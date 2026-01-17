import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

import { UserImportResult } from '@/models/interfaces/user-import.model';
import { UserImportService } from '../service/user-import-service';

@Component({
  selector: 'app-import-user',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadModule,
    TableModule,
    ButtonModule,
    MessageModule
  ],
  templateUrl: './import-user.html',
  styleUrls: ['./import-user.scss']
})
export class ImportUserComponent {

  selectedFile: File | null = null;

  previewColumns: string[] = [];
  previewRows: any[] = [];

  readonly PREVIEW_LIMIT = 5;

  loading = false;
  errorMessage = '';
  result: UserImportResult | null = null;

  constructor(private userImportService: UserImportService) {}

  // ================= FILE SELECT =================
  onFileSelect(event: any): void {
    const file = event.files?.[0];
    this.resetState();

    if (!file) return;

    if (file.type !== 'text/csv') {
      this.errorMessage = 'Only CSV files are supported.';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.errorMessage = 'File size must be less than 5 MB.';
      return;
    }

    this.selectedFile = file;
    this.parseCsv(file);
  }

  // ================= CSV PREVIEW =================
  private parseCsv(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;

      const lines = text
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(Boolean);

      if (lines.length < 2) {
        this.errorMessage = 'CSV file has no data rows.';
        return;
      }

      this.previewColumns = lines[0].split(',').map(c => c.trim());

      this.previewRows = lines
        .slice(1, this.PREVIEW_LIMIT + 1)
        .map(line => {
          const values = line.split(',');
          const row: any = {};

          this.previewColumns.forEach((col, index) => {
            row[col] = values[index]?.trim() ?? '';
          });

          return row;
        });
    };

    reader.readAsText(file);
  }

  // ================= IMPORT =================
  importUsers(): void {
    if (!this.selectedFile) return;

    this.loading = true;
    this.errorMessage = '';
    this.result = null;

    this.userImportService.importUsers(this.selectedFile).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Import failed. Please check file and try again.';
        this.loading = false;
      }
    });
  }

  // ================= RESET =================
  private resetState(): void {
    this.errorMessage = '';
    this.result = null;
    this.previewColumns = [];
    this.previewRows = [];
  }
}