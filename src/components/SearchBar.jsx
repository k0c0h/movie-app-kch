import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

export default function SearchBar({ onSearch }){
  const [q, setQ] = useState('');
  return (
    <InputGroup>
      <FormControl
        placeholder="Search for movie..."
        value={q}
        onChange={e => setQ(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') onSearch(q); }}
      />
      <Button variant="primary" onClick={() => onSearch(q)}>Search</Button>
    </InputGroup>
  );
}
