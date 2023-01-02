export interface celebrityInterface {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
  age?: number | string;
  isExpanded?: boolean;
  isEditing?: boolean;
}
