import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { BarChartComponent } from './pages/bar-chart/bar-chart.component';
import { LineChartComponent } from './pages/line-chart/line-chart.component';

const routes: Routes = [
  {
    path: '',
    component:StatisticsComponent,
    data: { titulo:null , showCard:false,icon:null},
  },
  {
    path: 'barras',
    component:BarChartComponent,
    data:{titulo:'Grafica de barras',icon:'equalizer'}
  },
  {
    path:'lineas',
    component:LineChartComponent,
    data:{titulo:'Graficos de lineas',icon:'timeline'}
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
