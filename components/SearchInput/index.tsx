import { LucideSearch, LucideX } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function SearchInput({ onSearch, placeholder = 'Search...' }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <form className="flex items-stretch gap-2" onSubmit={handleSubmit}>
      <div className="relative w-[400px]">
        <Input
          className="pr-10"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          onClick={handleClear}
          className="absolute right-0 top-[50%] translate-y-[-50%]"
          variant="ghost"
          size="icon"
          type="button"
        >
          <LucideX />
        </Button>
      </div>
      <Button className="shrink-0" type="submit" size="icon">
        <LucideSearch />
      </Button>
    </form>
  );
}

type Props = {
  onSearch: (input: string) => void;
  placeholder?: string;
};
