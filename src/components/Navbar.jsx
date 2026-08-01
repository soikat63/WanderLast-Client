"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
const Navbar = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  console.log(user);

  //  console.log(session);

  return (
    <nav className="flex justify-between items-center py-5 px-5 ">
      <ul className="flex items-center gap-6">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/destinations"}>Destinations</Link>
        </li>
        <li>
          <Link href={"/my-bookings"}>My Bookings</Link>
        </li>
        <li>
          <Link href={"/admin"}>Admin</Link>
        </li>
        <li>
          <Link href={"/add-destination"}>Add Destination</Link>
        </li>
      </ul>

      <div>
        <Image
          src={"/assets/Wanderlast.png"}
          alt="Nav logo"
          width={150}
          height={100}
        />
      </div>
      <ul className="flex items-center gap-6">
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>

        {user ? (
          <>
            <li>
              <Avatar>
                <Avatar.Image
                  alt= {user?.name}
                  src={user?.image}
                />
                <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
            </li>
            <li>
              <Button>Logout</Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
            <li>
              <Link href={"/sign-up"}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;



//53.4
