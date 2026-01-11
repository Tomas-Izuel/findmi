"use client";

import { useState } from "react";
import { SearchFilters, type SearchFilters as Filters } from "@/components/search/search-filters";
import { SearchResults } from "@/components/search/search-results";

export default function BuscarPage() {
    const [filters, setFilters] = useState<Filters>({
        name: "",
        location: "",
        instrumentId: "",
        minSeniority: "",
    });

    const handleSearch = (newFilters: Filters) => {
        setFilters(newFilters);
    };

    return (
        <div className="fixed inset-0 pt-14 pb-16 flex flex-col">
            <SearchFilters onSearch={handleSearch} />
            <SearchResults filters={filters} />
        </div>
    );
}
