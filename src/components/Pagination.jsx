import React from 'react';
import { Pagination as BSPagination } from 'react-bootstrap';

export default function Pagination({ totalResults=0, currentPage=1, onChange }){
  const totalPages = Math.ceil(totalResults / 10);
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = Math.max(1, currentPage-2); i <= Math.min(totalPages, currentPage+2); i++) pages.push(i);

  return (
    <div className="d-flex justify-content-center mt-4">
      <BSPagination>
        <BSPagination.First onClick={()=>onChange(1)} disabled={currentPage===1}/>
        <BSPagination.Prev onClick={()=>onChange(Math.max(1, currentPage-1))} disabled={currentPage===1}/>
        {pages.map(p => (
          <BSPagination.Item key={p} active={p===currentPage} onClick={()=>onChange(p)}>{p}</BSPagination.Item>
        ))}
        <BSPagination.Next onClick={()=>onChange(Math.min(totalPages, currentPage+1))} disabled={currentPage===totalPages}/>
        <BSPagination.Last onClick={()=>onChange(totalPages)} disabled={currentPage===totalPages}/>
      </BSPagination>
    </div>
  );
}
