"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import SignoutButton from "./SignoutButton";
import { useCurrentUserQuery } from "@/redux/slices/createApi";

export default function Nav() {
  const { data: currentUserData } = useCurrentUserQuery();

  return (
    <>
      <div className="flex justify-between p-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="/pulpit"
              >
                Pulpit
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="/pulpit/moje-rozliczenia"
              >
                Moje roliczenia
              </NavigationMenuLink>
            </NavigationMenuItem>

            {currentUserData?.role === "admin" && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    href="/pulpit/admin/kierowcy"
                  >
                    Kierowcy
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    href="/pulpit/admin/rozliczenia"
                  >
                    Rozliczenia
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <SignoutButton />
      </div>
      <Separator />
    </>
  );
}
