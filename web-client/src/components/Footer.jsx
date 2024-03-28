import { Navigate, Outlet, Link } from "react-router-dom";
import axios from 'axios';
import logo from '/logo.svg';
import twitterX from '/TwitterX.svg';
import printerest from '/Pinterest.svg';
import linkedIn from '/LinkedIn.svg';
import facebook from '/Facebook.svg';

import { DocumentCheckIcon, DocumentIcon, EnvelopeIcon, FaceSmileIcon, TagIcon } from "@heroicons/react/24/outline";
import { GlobeAltIcon, LockClosedIcon, PhoneIcon, UserPlusIcon, UsersIcon } from "@heroicons/react/20/solid";

function Footer() {
  return (
    <footer className="mt-10 bg-gray-200 pt-10">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 my-10">
        <div className="group relative p-5 rounded-xl">
          <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 items-center flex">
            <img width={200} src={logo} ></img>
          </div>
          <div className="mt-4 flex text-lg pt-2">
            <EnvelopeIcon width={24} /> <a className="mx-2">contact@coup-acier.com</a>
          </div>
          <div className="flex text-lg pt-2">
            <GlobeAltIcon width={24} /> <a className="mx-2">Nanterre 92000, France</a>
          </div>
          <div className="flex text-lg pt-2">
            <PhoneIcon width={24} /> <a className="mx-2">Nanterre 92000, France</a>
          </div>
        </div>
        <div>

        </div>
        <div className="group relative p-5 rounded-xl">
          <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 items-center flex">
            <div className="text-left text-l mb-4 w-full">
              <h2 className="text-3xl font-bold">Application</h2>
              <div className="flex my-5">
                <GlobeAltIcon width={36} /> <span className="mt-0 ml-3 text-2xl font-bold"> App Store</span>
              </div>
              <div className="flex my-5">
                <TagIcon width={36} /> <span className="mt-0 ml-3 text-2xl font-bold"> Google Play</span>
              </div>
            </div>
          </div>
        </div>
        <div className="group relative p-5 rounded-xl">
          <div className="election:aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 items-center flex">
            <div className="text-left text-l mb-4 w-full">
              <h2 className="text-3xl font-bold">Suivez-nous !</h2>
              <div className="flex my-5">
                <img className="mr-3" src={twitterX} width={48} />
                <img src={printerest} width={48} />
              </div>
              <div className="flex my-5">
                <img className="mr-3" src={linkedIn} width={48} />
                <img src={facebook} width={48} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 footer-border">
        <div className="p-3 flex ">
          <img src={twitterX} width={24} />
        </div>
        <div className="p-3 flex">
          <UsersIcon className="mx-2" width={24} /> Développé par Les Big Bosses
        </div>
        <div className="p-3 flex">
          <DocumentCheckIcon className="mx-2" width={24} /> Mensions légales
        </div>
        <div className="p-3 flex">
          <DocumentIcon className="mx-2" width={24} /> CGU
        </div>
      </div>
    </footer>
  );
}

export default Footer;