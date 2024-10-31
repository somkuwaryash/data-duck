export interface PlotData {
    x: number[] | string[];
    y: number[];
    type: 'scatter' | 'bar' | 'line' | 'pie';
    mode?: 'lines' | 'markers' | 'lines+markers';
    name?: string;
  }
  
  export interface PlotLayout {
    title: string;
    xaxis: { title: string };
    yaxis: { title: string };
  }
  
  export interface PlotlyData {
    data: PlotData[];
    layout: PlotLayout;
    [key: string]: unknown; // This line makes PlotlyData compatible with Record<string, unknown>
  }