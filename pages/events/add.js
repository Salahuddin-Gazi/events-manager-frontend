import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "@/config";
import styles from "@/styles/Form.module.css";
import Layout from "@/components/Layout";
import parseCookie from "@/helpers";

export default function AddEventPage({ token }) {
  const [values, setValues] = useState({
    Name: "",
    Performers: "",
    Venue: "",
    Address: "",
    Date: "",
    Time: "",
    Description: "",
  });

  const router = useRouter();

  const toastId = "#gg#";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyField = Object.values(values).some((elem) => elem === "");
    if (hasEmptyField) {
      toast.dismiss(toastId);
      toast.error("Please fill in all the fields", {
        theme: "colored",
        toastId,
      });
      return;
    }
    // console.log(JSON.stringify(values));
    // console.log(token);
    // console.log(
    //   JSON.stringify({
    //     data: {
    //       ...values,
    //     },
    //   })
    // );
    const res = await fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          ...values,
        },
      }),
    });

    if (!res.ok) {
      toast.dismiss(toastId);
      if (res.status === 403 || res.status === 401) {
        toast.error("You are not authorized!", {
          theme: "colored",
          toastId,
        });
        return;
      }
      toast.error("Something Went Wrong", {
        theme: "colored",
        toastId,
      });
    } else {
      const evt = await res.json();
      const {
        attributes: { Slug },
      } = evt.data;
      router.push(`/events/${Slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="Name"
              value={values.Name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="Performers"
              value={values.Performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="Venue"
              value={values.Venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="Address"
              value={values.Address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="Date"
              value={values.Date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="Time"
              value={values.Time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            name="Description"
            value={values.Description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  return {
    props: {
      token,
    },
  };
}
