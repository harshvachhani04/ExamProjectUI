import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { UserDto } from '@/models/dto/UserDto';
import { UserService } from '../service/user-service';
import { PagedRequest, PagedResponse } from '@/models/dto/PaginationDto';
import { TableColumn } from '@/models/interfaces/TableColumn';
import { FluidModule } from 'primeng/fluid';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    MultiSelectModule,
    FluidModule
  ],
  templateUrl: './user-list.html'
})
export class UserListComponent implements OnInit {

  users: UserDto[] = [];
  totalRecords = 0;
  loading = false;

  // server-side state
  pageNumber = 1;
  pageSize = 10;
  sortField: string = 'createdDate';
  sortOrder: 'asc' | 'desc' = 'desc';
  search = '';

  // column configuration
  allColumns: TableColumn[] = [
    { field: 'firstName', header: 'First Name', sortable: true, visible: true },
    { field: 'lastName', header: 'Last Name', sortable: true, visible: true },
    { field: 'username', header: 'Username', sortable: true, visible: true },
    { field: 'email', header: 'Email', sortable: true, visible: true },
    { field: 'role', header: 'Role', sortable: true, visible: true },
    { field: 'phoneNumber', header: 'Phone', visible: true },

    // audit (hidden by default)
    { field: 'createdDate', header: 'Created Date', sortable: true, visible: false },
    { field: 'preparedBy', header: 'Created By', visible: false },
    { field: 'lastModifiedDate', header: 'Last Modified Date', sortable: true, visible: false },
    { field: 'lastUpdatedBy', header: 'Last Modified By', visible: false }
  ];

   // ✅ SELECTED COLUMNS (user controls this)
  selectedColumns: TableColumn[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // initialize selection = visible columns
    this.selectedColumns = this.allColumns.filter(c => c.visible);
    this.loadUsers();
  }

  get visibleColumns(): TableColumn[] {
    return this.selectedColumns;
  }

  onColumnChange(): void {
    // sync visibility flag (optional but clean)
    this.allColumns.forEach(col => {
      col.visible = this.selectedColumns.some(c => c.field === col.field);
    });
  }

  loadUsers(): void {
    const request: PagedRequest = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sortBy: this.sortField,
      sortOrder: this.sortOrder,
      search: this.search
    };

    this.loading = true;

    this.userService.getAll(request).subscribe({
      next: (res: PagedResponse<UserDto>) => {
        this.users = res.records;
        this.totalRecords = res.totalRecords;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // ✅ STRICT NULL FIX APPLIED HERE
  onLazyLoad(event: any): void {
    this.pageNumber = event.first / event.rows + 1;
    this.pageSize = event.rows;

    this.sortField = event.sortField ?? this.sortField;
    this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';

    this.loadUsers();
  }

  onSearch(): void {
    this.pageNumber = 1;
    this.loadUsers();
  }

  getRoleLabel(role: number): string {
    switch (role) {
      case 1: return 'Super Admin';
      case 2: return 'Tenant Admin';
      case 3: return 'User';
      default: return 'Unknown';
    }
  }

  getRoleSeverity(role: number): 'danger' | 'warning' | 'info' {
    switch (role) {
      case 1: return 'danger';
      case 2: return 'warning';
      default: return 'info';
    }
  }
}