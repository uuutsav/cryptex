import { getChartData, tradeCoin } from "@/api/trade/route";
import { UpdateBalance } from "@/api/users";
import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SelectedCoinContext } from "@/contexts/SelectCoin";
import { UserContext } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CoinDetails = () => {
  const { selectedCoin } = useContext(SelectedCoinContext);
  const { user, isLoaded } = useContext(UserContext);
  const [chartData, setChartData] = useState([]);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!selectedCoin) return;

    const fetchCoinData = async () => {
      try {
        const data = await getChartData(selectedCoin.id);

        const formattedChartData = data.prices.map(
          ([timestamp, price]: [number, number]) => ({
            date: new Date(timestamp).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            price,
          })
        );

        setChartData(formattedChartData);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoinData();
  }, [selectedCoin]);

  const chartConfig = {
    price: {
      label: "Price (CAD)",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  const handleTrade = async () => {
    if (!user || !isLoaded) {
      setError("Please log in to trade.");
      return;
    }
    if (!quantity || quantity <= 0) {
      setError("Please enter a valid quantity.");
      return;
    }
    if (!selectedCoin) {
      setError("Please select a coin to trade.");
      return;
    }
    const total = quantity * selectedCoin.current_price;
    if (user.type == "FREE" && user.balance && total > user.balance) {
      setError("Insufficient balance.");
      return;
    }
    try {
      await tradeCoin(selectedCoin.id, quantity, selectedCoin.current_price);
      if (user.type == "FREE") {
        await UpdateBalance(total);
      }
      toast({
        title: "Trade successful!",
        description: `You have traded ${quantity} ${
          selectedCoin.symbol
        } for a total of $${total.toLocaleString()}`,
      });
      setQuantity(0);
      setError("");
      setOpen(false);
    } catch (error) {
      console.error("Error trading coin:", error);
    }
  };

  return (
    <div className="w-full h-full p-2 mt-5 md:mt-0">
      {selectedCoin && (
        <div>
          <h1 className="text-xl font-semibold flex justify-between items-center">
            <p className="flex gap-2">
              <Image
                className="h-full md:h-fit w-full md:w-fit"
                alt={selectedCoin.id}
                src={selectedCoin.image}
                width={30}
                height={20}
              />
              <div className="flex flex-col md:flex-row">
                <span>{selectedCoin.name}</span>
                <span className="uppercase">({selectedCoin.symbol})</span>
              </div>
            </p>
            <div className="flex flex-col items-end md:flex-row md:items-center gap-2">
              <p>
                ${" "}
                {selectedCoin?.current_price
                  ? selectedCoin?.current_price
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                  : "N/A"}
              </p>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="px-6 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                    Trade
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-[#121212]">
                  <DialogHeader>
                    <DialogTitle>Buy {selectedCoin.name}</DialogTitle>
                    <DialogDescription>
                      Please note that this is a simulated buy order and does
                      not reflect real-world market conditions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      step={"any"}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                    <span className="text-red-500">{error}</span>
                  </div>
                  <DialogFooter className="flex items-center justify-between">
                    {user?.type == "FREE" && <p>Balance: ${user?.balance}</p>}
                    <div className="flex items-center gap-4">
                      <p>
                        Total: $
                        {String(
                          quantity
                            ? (selectedCoin.current_price * quantity).toFixed(2)
                            : 0
                        ).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                      </p>
                      <Button
                        type="submit"
                        className="px-6 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
                        onClick={() => handleTrade()}
                      >
                        Buy
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </h1>
          {chartData.length > 0 && (
            <ChartContainer config={chartConfig} className="mt-4 h-1/2 w-full">
              <LineChart
                width={600}
                height={300}
                data={chartData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis domain={["dataMin", "dataMax"]} />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="linear"
                  dataKey="price"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          )}
          <div className="grid grid-cols-3 md:grid-cols-3 mt-2 p-4">
            <h2 className="flex flex-col lg:flex-row lg:gap-2 items-center justify-center mt-8">
              24h High:{" "}
              <span className="font-medium text-xl">
                ${" "}
                {selectedCoin?.high_24h
                  ? selectedCoin?.high_24h
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                  : "N/A"}
              </span>
            </h2>
            <h2 className="flex flex-col lg:flex-row lg:gap-2 items-center justify-center mt-8">
              24h Low:{" "}
              <span className="font-medium text-xl">
                ${" "}
                {selectedCoin?.low_24h
                  ? selectedCoin?.low_24h
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                  : "N/A"}
              </span>
            </h2>
            <h2 className="flex flex-col lg:flex-row lg:gap-2 items-center justify-center mt-8">
              24h Change:{" "}
              <span className="font-medium text-xl">
                ${" "}
                {selectedCoin?.price_change_24h
                  ? selectedCoin?.price_change_24h
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                  : "N/A"}
              </span>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinDetails;
