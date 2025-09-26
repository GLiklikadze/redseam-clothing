import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetList } from "../../react-query/query/productList/productListQuery";
import ProductContainer from "./components/ProductContainer";
import { Product } from "./components/types";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import adj_horizontal from "../../assets/adj-horizontal.svg";
import arrow_down from "../../assets/chevron-down.svg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const { data: productListResponse } = useGetList(currentPage);

  const totalPages = productListResponse?.meta?.last_page || 1;
  // const totalProducts = productListResponse?.meta?.total || 0;
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 4;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis logic
      if (currentPage <= 3) {
        // Show first pages
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last pages
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show middle pages
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };
  const handlePreviousPage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage((prevPage) => (prevPage - 1 > 0 ? prevPage - 1 : 1));
    setSearchParams({
      page: currentPage - 1 > 0 ? String(currentPage - 1) : "1",
    });
  };
  const handleNextPage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage((prevPage) =>
      prevPage + 1 < totalPages ? prevPage + 1 : totalPages
    );
    setSearchParams({
      page:
        currentPage + 1 < totalPages
          ? String(currentPage + 1)
          : String(totalPages),
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  console.log("productListData", productListResponse);
  return (
    <div className="bg-[#FFFFFF] px-[100px]">
      <div className="flex flex-row justify-between items-center">
        <h1 className="mb-8 text-[42px] font-semibold">Products</h1>
        <div className="flex flex-row items-center gap-16">
          <p className="text-[12px] font-normal text-gray-500">
            Showing {productListResponse?.meta?.from}-
            {productListResponse?.meta?.to} of{" "}
            {productListResponse?.meta?.total} results
          </p>
          <div className="flex flex-row gap-2">
            <img src={adj_horizontal} alt="filter-icon" />
            <div className="text-base font-normal">Filter</div>
          </div>
          <div className="flex flex-row gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <div className="text-base font-normal">Sort By</div>
                  <img src={arrow_down} alt="arrow-down-icon" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="p-2">
                  <p className="font-medium text-sm mb-2">Sort by</p>
                  <DropdownMenuItem
                    onClick={() => {}}
                    // className={sortBy === "newest" ? "bg-accent" : ""}
                  >
                    New products first
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {}}
                    // className={sortBy === "price-low" ? "bg-accent" : ""}
                  >
                    Price, low to high
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {}}
                    // className={sortBy === "price-high" ? "bg-accent" : ""}
                  >
                    Price, high to low
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex gap-x-4 gap-y-8 flex-wrap ">
        {productListResponse?.data?.map((data: Product) => (
          <ProductContainer key={data?.id} data={data} />
        ))}
      </div>
      <Pagination className="flex flex-row mt-[90px] mb-[256px]">
        <PaginationContent>
          <PaginationPrevious onClick={(e) => handlePreviousPage(e)} />

          {getPageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => {
                    handlePageChange(page as number);
                    setSearchParams({
                      page: page as string,
                    });
                  }}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext onClick={(e) => handleNextPage(e)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductList;
