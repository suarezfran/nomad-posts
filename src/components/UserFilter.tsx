'use client';

import { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { User } from '@/types';

interface UserOption {
  value: number;
  label: string;
  user: User;
}

interface UserFilterProps {
  onFilter: (userId: number | null) => void;
  disabled?: boolean;
}

export default function UserFilter({ onFilter, disabled }: UserFilterProps) {
  const [options, setOptions] = useState<UserOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadUsers = (inputValue: string) => {
    if (!inputValue || inputValue.length < 2) {
      setOptions([]);
      return;
    }

    setIsLoading(true);
    
    fetch(`/api/users?search=${encodeURIComponent(inputValue)}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
      })
      .then(data => {
        const userOptions = data.users.map((user: User) => ({
          value: user.id,
          label: `${user.name}${user.username ? ` (@${user.username})` : ''}`,
          user
        }));
        setOptions(userOptions);
      })
      .catch(error => {
        console.error('Error loading users:', error);
        setOptions([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (selectedOption: SingleValue<UserOption>) => {
    if (selectedOption) {
      onFilter(selectedOption.value);
    } else {
      onFilter(null);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Filter by User
      </label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Select
            isClearable
            isSearchable
            isLoading={isLoading}
            isDisabled={disabled}
            options={options}
            onInputChange={loadUsers}
            onChange={handleChange}
            placeholder="Search for a user..."
            noOptionsMessage={() => "Type at least 2 characters to search..."}
            loadingMessage={() => "Searching users..."}
            styles={{
              option: (base) => ({
                ...base,
                color: 'black'
              })
            }}
          />
        </div>
      </div>
    </div>
  );
}
