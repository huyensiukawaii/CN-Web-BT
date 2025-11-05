import React from 'react';

export default function SearchForm({ searchKeyword, onSearchChange }) {
  return (
    <div className="search-form">
      <input
        type="text"
        placeholder="Tìm theo name, username"
        value={searchKeyword}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}
