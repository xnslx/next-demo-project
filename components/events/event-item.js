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
        <li className="grid grid-cols-3 bg-gray-200 mb-8 ml-auto mr-auto w-3/5 h-56 ">
            <Image src={'/' + image} alt={title} width={250} height={160} className="object-cover h-1"/>
            <div className="h-56">
                <div className="">
                    <h2 className="text-sm bold">{title}</h2>
                    <div className="">
                        <DateIcon/>
                        <time className="text-sm">{humanReadableDate}</time>
                    </div>
                    <div className="">
                        <AddressIcon />
                        <address className="text-sm">{formattedAddress}</address>
                    </div>
                </div>
                <div className="">
                    <Button link={exploreLink} >
                        <span>Explore Event</span>
                        <span><ArrowRightIcon /></span>
                    </Button>
                </div>
            </div>
        </li>
    )
};

export default EventItem;