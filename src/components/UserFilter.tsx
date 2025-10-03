import dynamic from "next/dynamic";

// Required to use react-select, which does not support ssr
const UserFilterClient = dynamic(() => import("./UserFilterClient"), {
  ssr: false,
});

interface UserOption {
  value: number;
  label: string;
}

interface UserFilterProps {
  onFilter: (userId: number | null) => void;
  disabled?: boolean;
  initialUser?: UserOption | null;
}

export default function UserFilter({
  onFilter,
  disabled,
  initialUser,
}: UserFilterProps) {
  return (
    <UserFilterClient
      onFilter={onFilter}
      disabled={disabled}
      initialUser={initialUser}
    />
  );
}
