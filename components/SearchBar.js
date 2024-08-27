"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SearchBar({ onSearch }) {
  const [description, setDescription] = useState("");

  const handleSearch = () => {
    if (description.trim()) {
      onSearch(description);
    }
  };

  return (
    <div className="flex gap-4 w-3/5">
      <Input
        type="text"
        placeholder="Describe your product"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-full"
      />
      <Button onClick={handleSearch} variant="primary" className="self-end">
        Search
      </Button>
    </div>
  );
}
