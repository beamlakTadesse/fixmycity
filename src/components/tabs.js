import React from "react";
import { NavLink } from 'react-router-dom';
import MapExample from "./MapExample";
import UserTable from "./user/userTable";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Tabs = ({ color }) => {
    const defaultCenter = {
        lat: 40.748817,
        lng: -73.985428,
    };
    const center = {
        lat: 70.748817,
        lng: -73.985428,
    };
    const [openTab, setOpenTab] = React.useState(1);
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablist"
                    >
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 1
                                        ? "text-white bg-purple-600"
                                        : "text-" + color + "-600 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                Map
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 2
                                        ? "text-white bg-" + color + "-600"
                                        : "text-" + color + "-600 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                Table
                            </a>
                        </li>

                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    {/* <MapExample /> */}
                                    <NavLink
                                        to="/maps">Maps</NavLink>
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <UserTable />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};

export default function TabsRender() {


    return (
        <>
            <Tabs color="purple" />


        </>
    );
}