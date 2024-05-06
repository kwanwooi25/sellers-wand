import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { LucideCheck, LucideChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

export default function SelectProduct({ values, onChange, options = [] }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-auto justify-between my-2"
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
        >
          상품 선택
          <LucideChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0 z-aboveHeader">
        <Command>
          <CommandInput placeholder="상품명 검색" />
          <CommandList>
            <CommandEmpty>표시할 결과가 없습니다.</CommandEmpty>
            <CommandGroup>
              {options.map((value) => (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={() => {
                    const newValues = values.includes(value)
                      ? values.filter((v) => v !== value)
                      : [...values, value];
                    onChange(newValues);
                  }}
                >
                  <LucideCheck
                    className={cn(
                      'mr-2 h-4 w-4',
                      values.includes(value) ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type Props = {
  values: string[];
  onChange: (values: string[]) => void;
  options: string[];
};
