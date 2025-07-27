import Header from "@/components/Navbar/Header";
import { useAuth } from "@/context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) navigate("/login");

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default UserLayout;
