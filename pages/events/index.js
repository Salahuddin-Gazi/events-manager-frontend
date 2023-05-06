import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

export default function HomePage({ events, page, total }) {
  // console.log(page, total);

  return (
    <Layout>
      <h1>Events</h1>

      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((ev) => {
        const { attributes } = ev;
        return <EventItem key={ev.id} evt={attributes} />;
      })}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

// export async function getStaticProps() {
//   const query = `?populate=Image&sort[0]=Date:asc`;
//   const res = await fetch(`${API_URL}/api/events${query}`);
//   const events = await res.json();

//   return {
//     props: { events: events.data },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate start page
  const start = +page == 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/api/events`);
  const data = await totalRes.json();
  const total = data.meta?.pagination?.total;

  // fetch events
  const queryEvent = `?populate=Image&sort[0]=Date:asc&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`;
  const eventRes = await fetch(`${API_URL}/api/events${queryEvent}`);
  const events = await eventRes.json();

  return {
    props: { events: events.data, page: +page, total },
  };
}
