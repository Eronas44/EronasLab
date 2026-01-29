export interface Project {
  id: number;
  title: string;
  status: 'Running' | 'Stopped';
  tech: string;
  url: string;
}

export interface UsageStat {
    id: number;
    label: string;
    value: string;
    limit: string;
}
