import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import EventItem from "@/components/EventItem";
import Link from "next/link";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>

      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((ev) => {
        const { attributes } = ev;
        return <EventItem key={ev.id} evt={attributes} />;
      })}

      {events.length > 0 && (
        <Link href="/events" className="btn-secondary">
          View All Events
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const query = `?populate=Image&sort[0]=Date:asc&pagination[limit]=3`;
  const res = await fetch(`${API_URL}/api/events${query}`);
  const events = await res.json();

  return {
    // props: { events: events.slice(0, 3) },
    props: { events: events.data },
    revalidate: 1,
  };
}
