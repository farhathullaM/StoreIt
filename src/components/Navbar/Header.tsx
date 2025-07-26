import { useAuth } from "@/context/AuthContext";
import { Box, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import Confirmation from "../ui/Confirmation";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div className="h-20 w-full flex justify-between sticky top-0 right-0 bg-[#e8d4d4] items-center max-sm:px-2 px-5">
      <Link
        to="/"
        className="flex gap-1 font-bold text-[#662121] select-none text-2xl items-center"
      >
        <Box className="w-8 h-8" />
        StoreIT
      </Link>
      <div className="p-2 flex gap-3 items-center  text-[#3a1818]">
        <div>
          <h2>{user?.username}</h2>
          <h2>{user?.email}</h2>
        </div>

        <Confirmation
          title="Logout"
          trigger={<LogOut className="cursor-pointer" />}
          description="Are you sure you want to logout?"
          btnText="Logout"
          onClick={() => logout()}
        />
      </div>
    </div>
  );
};

export default Header;
