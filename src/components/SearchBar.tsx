// import Search from '../assets/search.svg';
import { ChangeEvent } from 'react';
import { ReactComponent as Search } from '../assets/search.svg'
import { SearchQuery } from '../types/search';
import React from 'react';

interface SearchBarProps {
  setSubmittedQuery: React.Dispatch<React.SetStateAction<SearchQuery>>
}

const SearchBar = ({ setSubmittedQuery}: SearchBarProps ) => {
  const [searchQuery, setSearchQuery] = React.useState<SearchQuery>({
    nome: "",
    sobrenome: "",
    email: ""
  })

  function handleSearch() {   
    setSubmittedQuery(searchQuery);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value } = event.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  return (
    <div className="searchbar custom-shadow">
      <label htmlFor="nome" className="visually-hidden">Nome</label>
      <input type="text" name="nome" id="nome" placeholder="Nome" className="input" onChange={handleInputChange} value={searchQuery.nome} />

      <label htmlFor="sobrenome" className="visually-hidden">Sobrenome</label>
      <input type="text" name="sobrenome" id="sobrenome" placeholder="Sobrenome" className="input" onChange={handleInputChange} value={searchQuery.sobrenome} />

      <label htmlFor="email" className="visually-hidden">E-mail</label>
      <input type="text" name="email" id="email" placeholder="E-mail" className="input" onChange={handleInputChange} value={searchQuery.email} />

      <button className="btn-search" onClick={handleSearch}><Search />Buscar</button>
    </div>
  )
}

export default SearchBar;