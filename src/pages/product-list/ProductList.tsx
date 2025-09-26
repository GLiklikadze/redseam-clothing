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
import { FilterAndSortOptions, Product, SortOption } from "./components/types";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";

const initialOptionsObj = {
  priceFrom: "",
  priceTo: "",
};
const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [filters, setFilters] = useState<{
    priceFrom?: string;
    priceTo?: string;
  }>({});
  const [sortBy, setSortBy] = useState<SortOption>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: productListResponse } = useGetList(
    currentPage,
    filters?.priceFrom,
    filters?.priceTo,
    sortBy
  );
  const { control, handleSubmit } = useForm<FilterAndSortOptions>({
    defaultValues: initialOptionsObj,

    mode: "onBlur",
  });

  const handleApplyFilter = (values: FilterAndSortOptions) => {
    setFilters({
      priceFrom: values?.priceFrom.toString(),
      priceTo: values?.priceTo.toString(),
    });
    setSearchParams({
      page: "1",
      priceFrom: values?.priceFrom.toString(),
      priceTo: values?.priceTo.toString(),
    });
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const totalPages = productListResponse?.meta?.last_page || 1;

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
    const newPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
    setCurrentPage(newPage);

    const params: Record<string, string> = { page: String(newPage) };

    if (filters?.priceFrom) {
      params.priceFrom = filters.priceFrom;
    }
    if (filters?.priceTo) {
      params.priceTo = filters.priceTo;
    }
    setSearchParams(params);
  };

  const handleNextPage = (e: React.MouseEvent) => {
    e.preventDefault();

    const newPage = currentPage + 1 < totalPages ? currentPage + 1 : totalPages;
    setCurrentPage(newPage);

    const params: Record<string, string> = { page: String(newPage) };

    if (filters?.priceFrom) {
      params.priceFrom = filters.priceFrom;
    }
    if (filters?.priceTo) {
      params.priceTo = filters.priceTo;
    }
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          <div className="flex flex-row gap-2"></div>
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 bg-white border-gray-300 hover:bg-gray-100"
              >
                <img src={adj_horizontal} alt="filter-icon" />
                <div className="text-base font-normal">Filter</div>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[392px] h-[169px] bg-[FFFFFF] p-0"
              align="end"
            >
              <div className="bg-[#FFFFFF] border-2 border-[#E1DFE1] p-6 rounded-lg">
                <h3 className="font-medium mb-4 text-gray-900">Select price</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <Controller
                      name="priceFrom"
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => {
                        return (
                          <Input
                            id="priceFrom"
                            type="number"
                            value={value}
                            placeholder="From *"
                            onChange={onChange}
                            onBlur={onBlur}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <Controller
                      name="priceTo"
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => {
                        return (
                          <Input
                            id="priceTo"
                            type="number"
                            value={value}
                            placeholder="To *"
                            onChange={onChange}
                            onBlur={onBlur}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row-reverse">
                  <Button
                    onClick={handleSubmit(handleApplyFilter)}
                    className="bg-[#FF4000] hover:bg-orange-500 text-[#FFFFFF] font-normal text-sm px-8 py-2 rounded-md"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
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
              <DropdownMenuContent align="end" className="w-[223px] h-[184px]">
                <div className="p-2">
                  <p className="font-medium text-sm mb-2">Sort by</p>
                  <DropdownMenuItem
                    onClick={() => {
                      setSortBy("created_at");
                      setSearchParams({
                        ...Object.fromEntries(searchParams),
                        sort: "created_at",
                      });
                    }}
                  >
                    New products first
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setSortBy("price");
                      setSearchParams({
                        ...Object.fromEntries(searchParams),
                        sort: "price",
                      });
                    }}
                  >
                    Price, low to high
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setSortBy("-price");
                      setSearchParams({
                        ...Object.fromEntries(searchParams),
                        sort: "-price",
                      });
                    }}
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

                    const params: Record<string, string> = {
                      page: String(page),
                    };
                    if (filters?.priceFrom) {
                      params.priceFrom = filters.priceFrom;
                    }
                    if (filters?.priceTo) {
                      params.priceTo = filters.priceTo;
                    }

                    setSearchParams(params);
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
