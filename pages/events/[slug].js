import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
// import EventMap from "@/components/EventMap";
import { API_URL } from "@/config";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

const toastId = "#pp#";

export default function EventsPage({ evt }) {
  const { attributes } = evt;
  const image = attributes.Image.data?.attributes.formats;
  const url = image ? image.large.url : null;
  const router = useRouter();

  // const deleteEvent = async () => {
  //   if (confirm("Are you sure?")) {
  //     const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
  //       method: "DELETE",
  //       // headers: {
  //       //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjgyNTAzNjA4LCJleHAiOjE2ODUwOTU2MDh9.BlYEZ6dkej1U4w4glbd71RRtZStfSLfc1rEYdsW_G7k`,
  //       // },
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       data.error?.message &&
  //         toast.error(data.error?.message, {
  //           toastId,
  //           theme: "colored",
  //         });
  //     } else {
  //       router.push("/events");
  //     }
  //   }
  // };

  return (
    <Layout>
      <div className={styles.event}>
        {/* <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div> */}
        <span>
          {new Date(attributes.Date).toLocaleDateString("en-US")} at{" "}
          {attributes.Time}
        </span>
        <h1>{attributes.Name}</h1>
        <ToastContainer />
        {url && (
          <div className={styles.image}>
            <Image
              src={url ? url : "/images/event-default.png"}
              width={960}
              height={600}
              alt={attributes.Name}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{attributes.Performers}</p>
        <h3>Description:</h3>
        <p>{attributes.Description}</p>
        <h3>Venue: {attributes.Venue}</h3>
        <p>{attributes.Address}</p>

        {/* <EventMap attributes={attributes} /> */}

        <Link href="/events" className={styles.back}>
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/events`);
//   if (res.status === 200) {
//     const { data } = await res.json();

//     const paths = data.map((evt) => {
//       const { attributes } = evt;
//       // console.log(attributes.Slug);
//       if (attributes.Slug != "null") {
//         return {
//           params: { slug: attributes.Slug },
//         };
//       }
//     });

//     return {
//       paths,
//       fallback: true,
//     };
//   }
// }

// // context.params.slug
// export async function getStaticProps({ params: { slug } }) {
//   const query = `?filters[Slug][$eq]=${slug}&populate=Image`;
//   const res = await fetch(`${API_URL}/api/events${query}`);

//   if (res.status == 200) {
//     const singleEvent = await res.json();
//     return {
//       props: {
//         evt: singleEvent.data[0],
//       },
//       revalidate: 1,
//     };
//   }
// }

// context.query.slug
export async function getServerSideProps({ query: { slug } }) {
  const query = `?filters[Slug][$eq]=${slug}&populate=Image`;
  const res = await fetch(`${API_URL}/api/events${query}`);

  if (res.status == 200) {
    const singleEvent = await res.json();
    return {
      props: {
        evt: singleEvent.data[0],
      },
    };
  }
}

EventsPage.defaultProps = {
  evt: {
    name: "not found",
  },
};
