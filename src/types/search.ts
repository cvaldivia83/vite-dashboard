export interface SearchQuery {
  nome: string;
  sobrenome: string;
  email: string;
}

export interface SearchBarProps {
  searchQuery: SearchQuery;
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>;
}