import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {  LayoutDashboard, LogIn, LogOut, UserPlus } from "lucide-react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
const ProfileAvatar = () => {
  const user =  null;
  const handleLogout = async () => {
    // dispatch(logout());
    // await logoutUser(undefined).unwrap();
    // if (res?.success === true) {
    //   navigate("/");
    // }
  };

  return (
    <div className="font-medium ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {user ? (
            <Avatar className=" cursor-pointer flex items-center justify-center border-4 border-light-border dark:border-dark-muted-bg ml-4 lg:ml-0 w-12 h-12">
              <AvatarImage src={user ? user?.avatarUrl : "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
          ) : (
            <span>
              <CgProfile className="text-3xl text-white hover:text-white transition hover:scale-105 ml-4 lg:ml-0 cursor-pointer" />
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-44 bg-primary-100 border-2 border-secondary text-white font-medium rounded-2xl mt-3 p-2"
        >
          <DropdownMenuLabel>
            {user ? (
              <div className="flex items-center gap-2 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">DP</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-light-primary-text dark:text-dark-primary-txt">{user?.name}</span>
                  <span className="truncate text-xs font-medium text-light-secondary-text dark:text-dark-secondary-txt">{user?.email}</span>
                </div>
              </div>
            ) : (
              "My Account"
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-secondary"/>
          <DropdownMenuGroup className="space-y-1.5">
            {!user && (
              <>
                <Link href={"/login"}>
                  <DropdownMenuItem className="cursor-pointer text-white flex items-center  hover:bg-secondary py-1 rounded-lg hover:text-white px-3">
                    <LogIn className="w-4 h-4 mr-2 text-white" />
                    Sign In
                  </DropdownMenuItem>
                </Link>

                <Link href={"/register"}>
                  <DropdownMenuItem className="cursor-pointer text-white flex items-center  hover:bg-secondary py-1 rounded-lg hover:text-white px-3">
                    <UserPlus className="w-4 h-4 mr-2 text-white" />
                    Register
                  </DropdownMenuItem>
                </Link>
              </>
            )}
            {user && (
              <Link href={user?.role === "admin" ? "/dashboard/admin/overview" : "/dashboard/user/overview"}>
                <DropdownMenuItem className="cursor-pointer flex items-center  hover:bg-secondary py-1 rounded-lg hover:text-white px-3">
                  <LayoutDashboard className="w-4 h-4 mr-2 text-white     " />
                  Dashboard
                </DropdownMenuItem>
              </Link>
            )}
          </DropdownMenuGroup>
          {user && (
            <>
              <DropdownMenuSeparator className="bg-secondary"/>
              <DropdownMenuItem
                className="cursor-pointer flex items-center hover:text-primary-bg hover:bg-secondary py-1 rounded-lg hover:text-red-500 px-3"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2 text-red-500" />
                Log out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileAvatar;
