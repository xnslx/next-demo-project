import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {getFeaturedEvents} from '../dummy-data';

export default function Home() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <h1>The Home Page</h1>
    </div>
  )
}
