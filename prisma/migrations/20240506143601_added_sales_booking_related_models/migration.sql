-- CreateEnum
CREATE TYPE "UserGrade" AS ENUM ('GUEST', 'GENERAL', 'POWER', 'ADMIN');

-- CreateEnum
CREATE TYPE "DeliveryType" AS ENUM ('ROCKET', 'GROWTH', 'WING', 'GLOBAL');

-- CreateEnum
CREATE TYPE "InventoryGrade" AS ENUM ('NEW', 'REFUND_UNOPENED', 'REFUND_BEST', 'REFUND_BETTER', 'REFUND_GOOD');

-- CreateEnum
CREATE TYPE "ExpenseType" AS ENUM ('AD', 'ETC');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('KRW', 'CNY');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "grade" "UserGrade" NOT NULL DEFAULT 'GUEST';

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "vendorProductId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "vendorProductCode" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "vendorProductName" TEXT NOT NULL,
    "vendorOptionName" TEXT NOT NULL,
    "deliveryType" "DeliveryType" NOT NULL,
    "salesFeeRate" DOUBLE PRECISION NOT NULL,
    "deliveryCost" INTEGER NOT NULL,
    "couponPrice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "leadtime" INTEGER NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "grade" "InventoryGrade" NOT NULL,
    "availableQuantity" INTEGER NOT NULL,
    "expectedRestockQuantity" INTEGER NOT NULL,
    "productOptionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "netSalesAmount" INTEGER NOT NULL,
    "netSalesQuantity" INTEGER NOT NULL,
    "grossSalesAmount" INTEGER NOT NULL,
    "grossSalesQuantity" INTEGER NOT NULL,
    "canceledSalesAmount" INTEGER NOT NULL,
    "canceledSalesQuantity" INTEGER NOT NULL,
    "immediatelyCanceledSalesQuantity" INTEGER NOT NULL,
    "productOptionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "deliveryCost" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL,
    "currencyExchangeRate" INTEGER,
    "stockingFee" INTEGER NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "stockingDate" TIMESTAMP(3),
    "productOptionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "detail" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "ExpenseType" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_optionId_key" ON "Product"("optionId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productOptionId_key" ON "Inventory"("productOptionId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "Product"("optionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "Product"("optionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "Product"("optionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
