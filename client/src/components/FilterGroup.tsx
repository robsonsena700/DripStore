import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FilterGroupProps {
  onFiltersChange: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  priceRange: string;
  sizes: string[];
}

export default function FilterGroup({ onFiltersChange }: FilterGroupProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: "",
    sizes: [],
  });

  const categories = [
    { id: "clothing", label: "Clothing" },
    { id: "footwear", label: "Footwear" },
    { id: "accessories", label: "Accessories" },
  ];

  const priceRanges = [
    { id: "0-50", label: "Under $50" },
    { id: "50-100", label: "$50 - $100" },
    { id: "100+", label: "Over $100" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(c => c !== categoryId);
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeChange = (priceRange: string) => {
    const newFilters = { ...filters, priceRange };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    
    const newFilters = { ...filters, sizes: newSizes };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters: FilterState = {
      categories: [],
      priceRange: "",
      sizes: [],
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-dark-gray">FILTERS</h3>
          <Button variant="ghost" onClick={clearFilters} className="text-light-gray hover:text-primary-color">
            Clear All
          </Button>
        </div>
        
        {/* Category Filter */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-dark-gray">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  className="data-[state=checked]:bg-primary-color data-[state=checked]:border-primary-color"
                />
                <Label htmlFor={category.id} className="text-light-gray cursor-pointer">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-dark-gray">Price Range</h4>
          <RadioGroup value={filters.priceRange} onValueChange={handlePriceRangeChange}>
            {priceRanges.map((range) => (
              <div key={range.id} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={range.id} 
                  id={range.id}
                  className="text-primary-color border-primary-color data-[state=checked]:bg-primary-color"
                />
                <Label htmlFor={range.id} className="text-light-gray cursor-pointer">
                  {range.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        {/* Size Filter */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-dark-gray">Size</h4>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant="outline"
                size="sm"
                onClick={() => handleSizeToggle(size)}
                className={`${
                  filters.sizes.includes(size)
                    ? "border-primary-color bg-primary-color text-white"
                    : "border-light-gray-2 hover:border-primary-color hover:text-primary-color"
                } transition-colors`}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
