export interface Portfolio {
    id: number;
    userId: string;
    symbol: string;
    quantity: number;
    purchasePrice: number;
    createdAt: Date;
}