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
import {
  getPageNumbers,
  handleNextPage,
  handlePreviousPage,
} from "@/pages/product-list/components/utils";
import {
  initialOptionsObj,
  sortObject,
} from "@/pages/product-list/components/staticData";

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
    sortBy,
  );
  const { control, handleSubmit, reset } = useForm<FilterAndSortOptions>({
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterClear = () => {
    setFilters({});
    reset({ priceFrom: "", priceTo: "" });
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("priceFrom");
    newParams.delete("priceTo");
    newParams.set("page", "1");
    setSearchParams(newParams);
    setIsFilterOpen(false);
  };

  return (
    <div className="mt-[72px] px-[100px]">
      <div className="flex flex-row items-center justify-between">
        <h1 className="mb-8 text-[42px] font-semibold">Products</h1>
        <div className="flex flex-row items-center gap-8">
          <p className="text-[12px] font-normal text-[#3E424A]">
            Showing {productListResponse?.meta?.from}-
            {productListResponse?.meta?.to} of{" "}
            {productListResponse?.meta?.total} results
          </p>
          <div className="ml-8 flex flex-row gap-2">
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 border-gray-300 bg-white hover:bg-gray-100"
                >
                  <img src={adj_horizontal} alt="filter-icon" />
                  <div className="text-base font-normal">Filter</div>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="h-[169px] w-[392px] bg-[FFFFFF] p-0"
                align="end"
              >
                <div className="rounded-lg border-2 border-[#E1DFE1] bg-[#FFFFFF] p-6">
                  <h3 className="mb-4 font-medium text-gray-900">
                    Select price
                  </h3>
                  <div className="mb-4 flex items-center gap-4">
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
                  <div className="flex flex-row justify-between">
                    <Button
                      onClick={handleFilterClear}
                      className="rounded-md border-2 border-orange-500 bg-[#FFFFFF] px-8 py-2 text-sm font-normal text-[#FF4000]"
                    >
                      Clear
                    </Button>
                    <Button
                      onClick={handleSubmit(handleApplyFilter)}
                      className="rounded-md bg-[#FF4000] px-8 py-2 text-sm font-normal text-[#FFFFFF] hover:bg-orange-500"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-row gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <div className="text-base font-normal">
                    {sortBy ? sortObject?.[sortBy] : "Sort By"}
                  </div>
                  <img src={arrow_down} alt="arrow-down-icon" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="h-[184px] w-[223px]">
                <div className="p-4">
                  <p className="mb-2 px-2 text-base font-semibold">Sort by</p>
                  <DropdownMenuItem
                    onClick={() => {
                      setSortBy("created_at");
                      setSearchParams({
                        ...Object.fromEntries(searchParams),
                        sort: "created_at",
                      });
                    }}
                    className="text-base"
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
                    className="text-base"
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
                    className="text-base"
                  >
                    Price, high to low
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-8">
        {productListResponse?.data?.map((data: Product) => (
          <ProductContainer key={data?.id} data={data} />
        ))}
      </div>
      <Pagination className="mt-[90px] mb-[256px] flex flex-row">
        <PaginationContent>
          <PaginationPrevious
            onClick={(e) =>
              handlePreviousPage(
                e,
                setCurrentPage,
                currentPage,
                totalPages,
                {
                  priceFrom: filters.priceFrom ?? "",
                  priceTo: filters.priceTo ?? "",
                },
                setSearchParams,
              )
            }
            className="cursor-pointer hover:bg-[#FF4000]"
          />

          {getPageNumbers(currentPage, totalPages).map((page, index) => (
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
                    if (sortBy) {
                      params.sort = sortBy;
                    }
                    setSearchParams(params);
                  }}
                  isActive={currentPage === page}
                  className={`${currentPage === page ? "border-[#FF4000] text-[#FF4000]" : "hover:bg-[#FF4000]"} cursor-pointer`}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={(e) =>
                handleNextPage(
                  e,
                  setCurrentPage,
                  currentPage,
                  totalPages,

                  {
                    priceFrom: filters.priceFrom ?? "",
                    priceTo: filters.priceTo ?? "",
                  },
                  setSearchParams,
                  sortBy,
                )
              }
              className="cursor-pointer hover:bg-[#FF4000]"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductList;
