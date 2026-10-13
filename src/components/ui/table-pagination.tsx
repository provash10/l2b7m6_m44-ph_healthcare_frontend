"use client";

import { Dispatch, SetStateAction } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

const getButtonArray = (totalPages : number, page : number) : (number | "ellipsis")[] =>{
    
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    if(page<=4){
        return [1,2,3,4,5,"ellipsis", totalPages];
    }
    if(page>= totalPages - 3){
        return [
            1, 
            "ellipsis", 
            totalPages - 4, 
            totalPages - 3,
            totalPages - 2,
            totalPages - 1, 
            totalPages
        ];
    }
    // return Array.from({length : totalPages},(_, index) => index + 1)
    // return [1, "ellipsis", 4,5,6, "ellipsis", totalPages];
    return [1, "ellipsis", page-1, page, page+1,"ellipsis", totalPages];
}

interface Props {
  totalPages: number;
  handlePageChange: Dispatch<SetStateAction<number>> | ((page: number) => void);
  page: number;
}

export default function TablePagination({
  totalPages,
  handlePageChange,
  page,
}: Props) {

    // const [page, setPage] = useState(1); //keep tabs page
    // const totalPages = 20;  //interface
    // const totalPages = 8;
    // console.log(getButtonArray(totalPages))
    console.log(page);

    const goToPage = (page: number) =>{
        handlePageChange(page);
    }

    if(totalPages <=1){
      return null;
    }

  return (
    <Pagination>
      <PaginationContent>

        <PaginationItem>
            <PaginationPrevious 
            onClick={()=>goToPage(page-1)}
            aria-disabled = {page === 1}
            className={
                page === 1 ? "pointer-events-none opacity-50" : undefined
            }
            >
            </PaginationPrevious>
        </PaginationItem>

        {/* Pagination Ellipsis */}
        {/* <PaginationItem>
            <PaginationEllipsis></PaginationEllipsis>
        </PaginationItem> */}

        {/* <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink isActive>2</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem> */}

        {getButtonArray(totalPages, page).map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                onClick={() => handlePageChange(item as number)}
                isActive={page === item}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
            <PaginationNext
            onClick={()=>goToPage(page+1)}
            aria-disabled = {page === totalPages}
            className={
                page === totalPages ? "pointer-events-none opacity-50" : undefined
            }
            ></PaginationNext>
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
}
