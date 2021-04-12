import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {getFeaturedEvents} from '../helpers/api-util';
import EventList from '../components/events/event-list';

function Home(props) {

  return (
    <div>
      <EventList items={props.events}/>
    </div>
  )
};

export async function getStaticProps() {

  const featuredEvents = await getFeaturedEvents()
  return{
    props:{
      events: featuredEvents
    }
  }
}

export default Home;
