"use client";

import { useState, useMemo, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { User } from "@/types";

interface UserOption {
  value: number;
  label: string;
}

interface UserFilterProps {
  onFilter: (userId: number | null) => void;
  disabled?: boolean;
}

const fetchUsers = async (search: string): Promise<UserOption[]> => {
  const response = await fetch(
    `/api/users?search=${encodeURIComponent(search)}`
  );
  if (!response.ok) throw new Error("Failed to fetch users");
  const data = await response.json();
  return data.users.map((user: User) => ({
    value: user.id,
    label: `${user.name}${user.username ? ` (@${user.username})` : ""}`,
  }));
};

export default function UserFilter({ onFilter, disabled }: UserFilterProps) {
  const [inputValue, setInputValue] = useState("");

  const debouncedSetInputValue = useMemo(
    () => debounce((value: string) => setInputValue(value), 300),
    []
  );

  const { data: options = [], isLoading, error } = useQuery({
    queryKey: ["users", inputValue],
    queryFn: () => fetchUsers(inputValue),
    enabled: inputValue.length >= 2,
  });

  useEffect(() => {
    if (!error) return;
    console.error("Error loading users:", error);
    toast.error("Failed to search users. Please try again.");
  }, [error]);

  const handleChange = (selectedOption: SingleValue<UserOption>) => {
    onFilter(selectedOption ? selectedOption.value : null);
  };

  return (
    <div>
      <Select
        isClearable
        isSearchable
        isLoading={isLoading}
        isDisabled={disabled}
        options={options}
        onInputChange={debouncedSetInputValue}
        onChange={handleChange}
        placeholder="Search for a user..."
        noOptionsMessage={() => "Type at least 2 characters to search..."}
        loadingMessage={() => "Searching users..."}
        styles={{
          control: (base, state) => ({
            ...base,
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "2px 6px",
            minHeight: "36px",
            boxShadow: state.isFocused
              ? "0 0 0 2px rgba(59, 130, 246, 0.1)"
              : "none",
            borderColor: state.isFocused ? "#3b82f6" : "#e2e8f0",
            "&:hover": {
              borderColor: "#3b82f6",
            },
          }),
          option: (base, state) => ({
            ...base,
            color: "#1f2937",
            backgroundColor: state.isSelected
              ? "#3b82f6"
              : state.isFocused
                ? "#eff6ff"
                : "white",
            borderRadius: "8px",
            margin: "2px 8px",
            width: "calc(100% - 16px)",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#9ca3af",
          }),
        }}
      />
    </div>
  );
}