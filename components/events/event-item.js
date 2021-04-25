import Image from 'next/image';

import Link from 'next/link';
import classes from './event-item.module.css';
import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

function EventItem(props) {

    const {title, image, location, date, id} = props;
    const humanReadableDate = new Date(date).toLocaleDateString('en-us', {
        day:'numeric',
        month: 'long',
        year: 'numeric'
    })

    const formattedAddress = location.replace(', ', '\n');

    const exploreLink = `/events/${id}`;
    console.log('explorelink', exploreLink)
    return(
        <li className=" flex bg-gray-200 mb-8 ml-auto mr-auto w-3/5 h-56">
            <Image src={'/' + image} alt={title} width={250} height={160} className="object-cover"/>
            <div className="h-56">
                <div className="h-56">
                    <h2 className="text-lg mb-4 bold">{title}</h2>
                    <div className="flex pb-2">
                        <DateIcon />
                        <time className="text-sm ml-2">{humanReadableDate}</time>
                    </div>
                    <div className="flex">
                        <AddressIcon/>
                        <address className="text-sm ml-2">{formattedAddress}</address>
                    </div>
                </div>
                <div className="flex flex-row bg-green-500 rounded -mt-20 h-10 ml-2 w-48 text-center ">
                    <Button link={exploreLink}>
                        <span className="">Explore Event</span>
                        <span><ArrowRightIcon /></span>
                    </Button>
                </div>
            </div>
        </li>
    )
};

export default EventItem;