export type Election = any;

export type Ballot = any;

export interface Meta {
  current_page?: number;
  next_page?: number;
  prev_page?: number;
  total_pages?: number;
  total_count?: number;
}
export type DropdownOption = {
  selected: boolean;
  value: string;
  display: string;
};

export type RouteGroups = { [key: string]: string[] };

export type Locale = "en" | "es"
