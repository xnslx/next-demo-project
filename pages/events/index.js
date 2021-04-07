import {getAllEvents} from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import {Fragment} from 'react';
import {useRouter} from 'next/router';

function AllEventsPage() {
    const events = getAllEvents()
    const router = useRouter()
    const findEventsHandler = (year, month) => {
        const fullpath = `/events/${year}/${month}`
        router.push(fullpath)
    }
    return(
        <Fragment>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList items={events}/>
        </Fragment>
    )
};

export default AllEventsPage;