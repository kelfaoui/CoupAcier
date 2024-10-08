import { CubeIcon, FaceSmileIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import { NewspaperIcon, TagIcon, UsersIcon, ArrowLeftEndOnRectangleIcon, BanknotesIcon, CreditCardIcon, WalletIcon, ArchiveBoxIcon, MapIcon, HomeIcon, LockClosedIcon} from "@heroicons/react/24/outline";
import React from "react";
import viteLogo from '/logo.svg';

function ClientSidebar() {
    if(!localStorage["user_id"]) return (<p>Unauthorized!</p>)

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        window.location.href = "/"
    }

    return (
        <div className="w-1/5 bg-black text-white  ml-0 h-screen">
            <div className="bg-black text-white px-4 py-1 ml-0 h-screen">
                <ul className="options">
                <a className="" href="/tableau-de-bord/">
                    <li className="flex my-5  mt-10">
                        <BanknotesIcon width={24} className="mr-2 " />
                        <span className="text-white">
                            Tableau de bord
                        </span>
                    </li>
                </a>
                <a href="/tableau-de-bord/mes-commandes" className="mt-10">
                    <li className="flex my-5 p-1">
                        <NewspaperIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Mes commandes
                        </span>
                    </li>
                </a>
                <a href="/tableau-de-bord/favoris"className="mt-10">
                    <li className="flex my-5 p-1">
                        <CreditCardIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Favoris
                        </span>
                    </li>
                </a>
                <a href="/tableau-de-bord/profile"className="mt-10">
                    <li className="flex my-5 p-1">
                        <CreditCardIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Mon profil
                        </span>
                    </li>
                </a>
                <a className="fixed bottom-5" onClick={() => logout()}>
                    <li className="flex my-4" >
                        <ArrowLeftEndOnRectangleIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Déconnexion
                        </span>
                    </li>
                </a>
            </ul>
            </div>
        </div>
    );
}

export default ClientSidebar;