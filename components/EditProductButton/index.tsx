import DeliveryBadge from '@/components/icons/DeliveryBadge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeliveryType, Prisma, Product } from '@prisma/client';
import { LucideEdit3 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  vendorProductId: z.string(),
  productId: z.string(),
  optionId: z.string(),
  status: z.string(),
  barcode: z.string(),
  vendorProductCode: z.string(),
  productName: z.string(),
  vendorProductName: z.string(),
  vendorOptionName: z.string(),
  deliveryType: z.enum([
    DeliveryType.GLOBAL,
    DeliveryType.GROWTH,
    DeliveryType.ROCKET,
    DeliveryType.WING,
  ]),
  salesFeeRate: z.string(),
  deliveryCost: z.string(),
  couponPrice: z.string(),
  quantity: z.string(),
  leadtime: z.string(),
  isMain: z.boolean(),
});

export default function EditProductButton<T extends Product | Prisma.ProductCreateManyUserInput>({
  data,
  onChange,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendorProductId: data.vendorProductId,
      productId: data.productId,
      optionId: data.optionId,
      status: data.status,
      barcode: data.barcode,
      vendorProductCode: data.vendorProductCode,
      productName: data.productName,
      vendorProductName: data.vendorProductName,
      vendorOptionName: data.vendorOptionName,
      deliveryType: data.deliveryType,
      salesFeeRate: `${data.salesFeeRate}`,
      deliveryCost: `${data.deliveryCost}`,
      couponPrice: `${data.couponPrice}`,
      quantity: `${data.quantity}`,
      leadtime: `${data.leadtime}`,
      isMain: data.isMain,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onChange({
      ...data,
      salesFeeRate: +values.salesFeeRate,
      deliveryCost: +values.deliveryCost,
      couponPrice: +values.couponPrice,
      quantity: +values.quantity,
      leadtime: +values.leadtime,
    } as T);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <LucideEdit3 />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="z-aboveHeader">
          <DialogHeader>
            <DialogTitle>상품 수정</DialogTitle>
            <DialogDescription>{data.productName}</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <FormField
              name="deliveryType"
              render={() => (
                <FormItem>
                  <FormLabel>배송유형</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      {Object.values(DeliveryType).map((type) => {
                        const isSelected = type === form.getValues().deliveryType;

                        return (
                          <Button
                            key={type}
                            size="icon"
                            variant={isSelected ? 'default' : 'outline'}
                            onClick={() => form.setValue('deliveryType', type)}
                          >
                            <DeliveryBadge type={type} />
                          </Button>
                        );
                      })}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>구성수량</FormLabel>
                  <FormControl>
                    <Input {...field} autoFocus />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salesFeeRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>판매 수수료율</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>입출고 배송비</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="couponPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>쿠폰 할인가</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leadtime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>입고 소요 기간 (주)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">취소</Button>
            </DialogClose>
            <Button onClick={form.handleSubmit(onSubmit)}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

type Props<T> = {
  data: T;
  onChange: (data: T) => void;
};
