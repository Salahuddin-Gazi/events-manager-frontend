import qs from "qs";
import { useRouter } from "next/router";
import { API_URL } from "@/config";

import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Link from "next/link";

export default function HomePage({ events }) {
  const {
    query: { term },
  } = useRouter();
  return (
    <Layout>
      <Link href="/events">Go Back</Link>

      <h1>Search Results for {term}</h1>

      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((ev) => {
        const { attributes } = ev;
        return <EventItem key={ev.id} evt={attributes} />;
      })}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            Name: {
              $containsi: term,
            },
          },
          {
            Venue: {
              $containsi: term,
            },
          },
          {
            Address: {
              $containsi: term,
            },
          },
          {
            Performers: {
              $containsi: term,
            },
          },
          {
            Description: {
              $containsi: term,
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const res = await fetch(`${API_URL}/api/events?populate=Image&${query}`);
  const events = await res.json();
  return {
    props: { events: events.data },
  };
}
