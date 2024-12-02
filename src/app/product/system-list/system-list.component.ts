import { Component, inject, OnInit } from '@angular/core';
import { SystemService } from '../../core/services/system.service';
import { Systems } from '../../core/models/system.model';
import { LoaderComponent } from "../../shared/components/loader/loader.component";

@Component({
  selector: 'app-systems',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss'],
  standalone: true,
  imports: [LoaderComponent],
})
export class SystemListComponent implements OnInit {
  private systemService = inject(SystemService);

  systems: Systems[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.fetchSystems();
  }

  fetchSystems() {
    this.loading = true;
    this.systemService.getResources().subscribe({
      next: (data) => {
        this.systems = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los sistemas', error);
        this.loading = false;
      },
    });
  }
}
