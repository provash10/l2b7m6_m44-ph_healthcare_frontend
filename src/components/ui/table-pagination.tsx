"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

const getButtonArray = (totalPages : number) =>{
    return Array.from({length : totalPages},(_, index) => index + 1)
}
export default function TablePagination() {

    const [page, setpage] = useState(1);
    const totalPages = 7;
    // console.log(getButtonArray(totalPages))
    console.log(page);



  return (
    <Pagination>
      <PaginationContent>

        <PaginationItem>
            <PaginationPrevious></PaginationPrevious>
        </PaginationItem>

        {/* Pagination Ellipsis */}
        <PaginationItem>
            <PaginationEllipsis></PaginationEllipsis>
        </PaginationItem>

        {/* <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink isActive>2</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem> */}

        {
            getButtonArray(totalPages).map((item) => (
                 <PaginationItem key={item}>
          <PaginationLink onClick={()=>setpage(item)} isActive={page === item}>
            {item}
            </PaginationLink>
        </PaginationItem> 
            ))
        }

        <PaginationItem>
            <PaginationNext></PaginationNext>
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
}
