import {getAllEvents} from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import {Fragment} from 'react';
import {useRouter} from 'next/router';

function AllEventsPage(props) {
    const events = props.events
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

export async function getStaticProps() {
    const events = await getAllEvents();

    return{
        props:{
            events:events
        },
        revalidate:60
    }
}

export default AllEventsPage;