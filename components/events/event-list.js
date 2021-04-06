import EventItem from './event-item';

function EventList(props) {
    const {items} = props;

    return (
        <ul>{items.map(event => <li></li>)}</ul>
    )
};

export default EventList;