import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {getFeaturedEvents} from '../helpers/api-util';
import EventList from '../components/events/event-list';

function Home(props) {

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve."/>
      </Head>
      <EventList items={props.events}/>
    </div>
  )
};

export async function getStaticProps() {

  const featuredEvents = await getFeaturedEvents()
  return{
    props:{
      events: featuredEvents
    },
    revalidate:600
  }
}

export default Home;
