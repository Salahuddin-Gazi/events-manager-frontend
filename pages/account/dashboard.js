import { useRouter } from "next/router";

import parseCookie from "@/helpers";
import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import styles from "@/styles/Dashboard.module.css";
import DashboardEvent from "@/components/DashboardEvent";

export default function DashboardPage({ events, token }) {
  // console.log(events);
  const {
    attributes: { results },
  } = events;
  // console.log(results);

  const router = useRouter();

  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        data.error?.message &&
          toast.error(data.error?.message, {
            toastId,
            theme: "colored",
          });
      } else {
        router.push("/account/dashboard");
      }
    }
  };
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {results.map((evt) => {
          return (
            <DashboardEvent evt={evt} key={evt.id} handleDelete={deleteEvent} />
          );
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  //   console.log(token);

  const res = await fetch(`${API_URL}/api/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: { events: events.data, token },
  };
}
