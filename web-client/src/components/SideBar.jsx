import { CubeIcon, FaceSmileIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import { NewspaperIcon, TagIcon, UsersIcon, ArrowLeftEndOnRectangleIcon, BanknotesIcon, CreditCardIcon, WalletIcon, ArchiveBoxIcon, MapIcon, HomeIcon, LockClosedIcon} from "@heroicons/react/24/outline";
import React from "react";
import viteLogo from '/logo.svg';

function DashboardSideBar() {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/"
    }

    return (
        <div className="w-1/5 bg-black text-white  ml-0 h-screen">
            <div className="bg-gray-200 p-4 w-full">
                <img className="h-8 w-auto mx-auto" src={viteLogo} alt="Vite Logo" />
            </div>
            <div className="bg-black text-white px-4 py-1 ml-0 h-screen">
                <div className="group relative py-3 px-3 bg-black rounded-xl">
                    <div className="text-center election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                        <div className="rounded-full primary-bg-color py-4 block text-4xl px-6 font-bold mx-auto text-black">
                            C 
                        </div>
                    </div>
                    <div>
                        <p className=" border-black text-xl text-white text-center pt-3">
                            <i>Chabane KELFAOUI</i>
                        </p>
                        <p className=" border-black text-l text-yellow-400 text-center pt-0 mb-0">
                            <i>Admin</i>
                        </p>
                    </div>
                </div>
                <ul className="options">
                <a className="" href="/dashboard/home">
                    <li className="flex my-1 bg-yellow-400 p-3 rounded-3xl text-black">
                        <BanknotesIcon width={24} className="mr-2 " />
                        <span className="text-black">
                            Service commercial
                        </span>
                    </li>
                </a>
                <a href="/dashboard/">
                    <li className="flex my-1 p-1">
                        <NewspaperIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Approvisionnements
                        </span>
                    </li>
                </a>
                <a href="/dashboard/commandes">
                    <li className="flex my-1 p-1">
                        <CreditCardIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Commandes
                        </span>
                    </li>
                </a>
              
                <a href="/dashboard/clients">
                    <li className="flex my-1 p-1">
                        <UsersIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Clients
                        </span>
                    </li>
                </a>
                <a href="/dashboard/produits">
                    <li className="flex my-1 p-1">
                        <TagIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Produits
                        </span>
                    </li>

                </a>
                <a href="/dashboard/demandes-devis">
                    <li className="flex my-1 p-1">
                        <WalletIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Demandes devis
                        </span>
                    </li>

                </a>
                <a href="/dashboard/entrepots">
                    <li className="flex my-1 p-1">
                        <CubeIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Entrepots
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
                <a href="/dashboard/fournisseurs">
                    <li className="flex my-2 p-1">
                        <UsersIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Fournisseurs
                        </span>
                    </li>
                </a>
                <a href="/dashboard/categories">
                    <li className="flex my-2 p-1">
                        <ArchiveBoxIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Catégories produits
                        </span>
                    </li>
                </a>
                <a href="/dashboard/entrepots">
                    <li className="flex my-2 p-1">
                        <HomeIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Entrepots
                        </span>
                    </li>
                </a>
                <a href="/dashboard/employes">
                    <li className="flex my-1 p-1">
                        <LockClosedIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Employes
                        </span>
                    </li>
                </a>
            </ul>
              
            </div>
           
        </div>
        
    );
}

export default DashboardSideBar;
