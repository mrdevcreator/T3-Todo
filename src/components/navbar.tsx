/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import Link from "next/link";

import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const getUserInitials = () => {
    if (session) {
      const newLocal = session?.user?.name;
      const initial = newLocal?.charAt(0);
      return initial;
    }
    return "";
  };

  const getUserName = () => {
    if (session) {
      const newLocal = session?.user?.name;
      return newLocal?.concat("'s Todo");
    }
    return "My Todo";
  };

  return (
    <AppBar position="static" className="border-1 bg-gray-500">
      <Toolbar className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {session && (
            <Avatar className="avatar text-1.6xl bg-white/30 text-center  text-black">
              {getUserInitials()}
            </Avatar>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="rounded-lg border-2 border-b-4 border-r-4 border-black/60 px-2 py-1 text-xl transition-all hover:-translate-y-[2px]"
          >
            {getUserName()}
          </Typography>
        </div>
        <div className="flex items-center">
          <Link href="/">
            <Button
              color="inherit"
              className=" text-white hover:bg-white/30 hover:text-black"
            >
              Home
            </Button>
          </Link>
          <Button
            color="inherit"
            className="text-white hover:bg-white/30 hover:text-black"
          >
            About
          </Button>
          {session && (
            <Button
              color="inherit"
              className="text-white hover:bg-white/30 hover:text-black"
            >
              Team
            </Button>
          )}
          {session ? (
            <>
              <Button
                color="inherit"
                onClick={handleSignOut}
                className="text-white hover:bg-white/30 hover:text-black"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => signIn()}
              className="text-white hover:bg-white/30 hover:text-black"
            >
              Sign In
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
