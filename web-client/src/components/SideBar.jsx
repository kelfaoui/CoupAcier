import { UserPlusIcon } from "@heroicons/react/20/solid";
import { NewspaperIcon, TagIcon, UsersIcon, ArrowLeftEndOnRectangleIcon, BanknotesIcon, CreditCardIcon} from "@heroicons/react/24/outline";
import React from "react";
import viteLogo from '/logo.svg';

function DashboardSideBar() {
    return (
        <div className="w-1/5 bg-black text-white  ml-0 h-screen">
            <div className="bg-gray-200 p-4 w-full">
                <img className="h-8 w-auto mx-auto" src={viteLogo} alt="Vite Logo" />
            </div>
            <div className="bg-black text-white p-4 ml-0 h-screen">
                <div className="group relative p-5 bg-black rounded-xl">
                    <div className="text-center election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-50 items-center flex">
                        <div className="rounded-full primary-bg-color py-4 block text-4xl px-6 font-bold mx-auto text-black">
                            C 
                        </div>
                    </div>
                    <div>
                        <p className=" border-black text-xl text-white text-center pt-5">
                            <i>Chabane KELFAOUI</i>
                        </p>
                        <p className=" border-black text-l text-yellow-400 text-center pt-0">
                            <i>Admin</i>
                        </p>
                    </div>
                </div>
                <ul className="options">
                    <a className="" href="/dashboard/clients">
                        <li className="flex my-10 bg-yellow-400 p-3 rounded-3xl text-black">
                            <BanknotesIcon width={24} className="mr-2 " />
                            <span className="text-black">
                                Service commercial
                            </span>
                        </li>
                    </a>
                    <a href="/dashboard/clients">
                        <li className="flex my-10 p-3 ">
                            <NewspaperIcon width={24} className="mr-2" />
                            <span className="text-white">
                                Approvisionnement
                            </span>
                        </li>
                    </a>
                    <a href="/dashboard/clients">
                        <li className="flex my-10 p-3 ">
                            <CreditCardIcon width={24} className="mr-2" />
                            <span className="text-white">
                                Commandes
                            </span>
                        </li>
                    </a>
                </ul>
                <a className="fixed bottom-5" href="/dashboard/clients">
                    <li className="flex my-4">
                        <ArrowLeftEndOnRectangleIcon width={24} className="mr-2" />
                        <span className="text-white">
                            Déconnexion
                        </span>
                    </li>
                </a>
                <hr className="mt-4" />
            </div>
        </div>
    );
}

export default DashboardSideBar;
