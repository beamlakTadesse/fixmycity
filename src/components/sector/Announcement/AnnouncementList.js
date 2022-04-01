import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import AnnouncementCard from './mycard';

export default function AnnouncementList() {


    const products = ['Custom users', 'Banned Users', 'Sectors'];

    const list = products.map(product => <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14 mr-8">
        <AnnouncementCard />

    </div>)


    return (
        <>
            {list}
        </>

    )
}