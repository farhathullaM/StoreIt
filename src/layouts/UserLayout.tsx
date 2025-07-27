import Header from "@/components/Navbar/Header";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <ProtectedRoute>
      <Header />
      <Outlet />
    </ProtectedRoute>
  );
};

export default UserLayout;
