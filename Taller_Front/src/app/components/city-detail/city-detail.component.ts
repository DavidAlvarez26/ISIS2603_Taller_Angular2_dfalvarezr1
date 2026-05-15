import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { City } from '../../models/city.model';
import { WeatherDetail } from '../../models/weather.model';
import { WeatherRecord } from '../../models/weather-record.model';
import { WeatherService } from '../../services/weather.service';
import { WeatherRecordService } from '../../services/weather-record.service';

@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-detail.component.html'
})
export class CityDetailComponent implements OnChanges {
  private weatherService = inject(WeatherService);
  private weatherRecordService = inject(WeatherRecordService);

  @Input() city!: City;

  weatherDetail: WeatherDetail | null = null;
  weatherRecords: WeatherRecord[] = [];
  loading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && this.city) {
      this.loadRecords();
      this.loadWeather();
    }
  }

  saveWeather(): void {
    if (!this.weatherDetail) {
      return;
    }

    const record = {
      tempC: this.weatherDetail.temp_c,
      condition: this.weatherDetail.condition,
      humidity: this.weatherDetail.humidity
    };

    this.weatherRecordService.saveRecord(this.city.id, record)
      .subscribe(() => this.loadRecords());
  }

  private loadWeather(): void {
    this.weatherDetail = null;
    this.loading = true;

    this.weatherService.getWeather(this.city.name)
      .subscribe({
        next: weather => {
          this.weatherDetail = weather;
          this.loading = false;
        },
        error: () => {
          this.weatherDetail = null;
          this.loading = false;
        }
      });
  }

  private loadRecords(): void {
    this.weatherRecordService.getRecords(this.city.id)
      .subscribe(records => this.weatherRecords = records);
  }
}
