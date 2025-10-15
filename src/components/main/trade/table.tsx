"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectedCoinContext } from "@/contexts/SelectCoin";
import { UserContext } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";

import Image from "next/image";
import {
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { User } from "@/types/user";
import { Coin } from "@/types/coin";
import { getCoinsList } from "@/api/trade/route";

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isLoaded: boolean;
};

const ListingTable = () => {
  const { user, isLoaded } = useContext(UserContext) as UserContextType;
  const [listing, setListing] = useState<Coin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchListing = async () => {
      const data = await getCoinsList();
      setListing(data);
    };
    fetchListing();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listing
    .filter((coin) =>
      coin.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(listing.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const { setSelectedCoin } = useContext(SelectedCoinContext);

  const handleCoinSelect = (coin: Coin) => {
    setSelectedCoin(coin);
  };

  return (
    <>
      {isLoaded && user && (
        <div className="w-full md:px-1">
          <div className="flex items-center py-4">
            <Input
              placeholder="Search by name..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="rounded-md border h-fit">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Last 24hrs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((coin) => (
                  <TableRow
                    key={coin.id}
                    className="cursor-pointer"
                    onClick={() => handleCoinSelect(coin)}
                  >
                    <TableCell className="font-medium flex gap-2 uppercase py-5">
                      <Image
                        alt={coin.id}
                        src={coin.image}
                        width={20}
                        height={20}
                      />{" "}
                      {coin.symbol}
                    </TableCell>
                    <TableCell>{coin.name}</TableCell>
                    <TableCell>$ {coin.current_price}</TableCell>
                    <TableCell
                      className={cn(
                        "text-right",
                        coin.price_change_24h > 0
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    >
                      {coin.price_change_24h.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="space-x-2 mt-2 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage == 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage == totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingTable;
