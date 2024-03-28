import { UserPlusIcon } from "@heroicons/react/20/solid";
import { NewspaperIcon, TagIcon, UsersIcon } from "@heroicons/react/24/outline";
import React from "react";

function DashboardSideBar() {
    return (
        <div className="w-1/5 bg-blue-700 text-white p-4 ml-5 rounded-l-3xl rounded-r-md h-full">
            <ul className="options h-full">
                <a href="/dashboard/clients">
                    <li className="flex my-4">
                        <UsersIcon width={24} className="mr-2 " />
                        <span className="text-white">
                            Clients
                        </span>
                    </li>
                </a>
                <a href="/dashboard/clients">
                    <li className="flex my-4">
                        <NewspaperIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Commandes
                        </span>
                    </li>
                </a>
                <a href="/dashboard/clients">
                    <li className="flex my-4">
                        <TagIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Produits
                        </span>
                    </li>
                </a>
                <a href="/dashboard/clients">
                    <li className="flex my-4">
                        <UserPlusIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Fournisseurs
                        </span>
                    </li>
                </a>
            </ul>
            <hr className="mt-4" />
        </div>
    );
}

export default DashboardSideBar;