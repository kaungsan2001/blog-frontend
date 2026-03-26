import {
  Pagination,
  PaginationContent,
  PaginationLink,
} from "@/components/ui/pagination";

const CustomPagination = ({
  totalPages,
  page,
  setPage,
}: {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}) => {
  return (
    <div className="mt-5">
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationLink
              key={i}
              onClick={() => setPage(i + 1)}
              isActive={page === i + 1}
            >
              {i + 1}
            </PaginationLink>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
