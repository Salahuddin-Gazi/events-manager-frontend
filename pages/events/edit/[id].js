import moment from "moment/moment";
import { FaImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/config";
import styles from "@/styles/Form.module.css";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import parseCookie from "@/helpers";

const NextImage = Image;
export default function EditEventPage({ evt, token }) {
  const {
    attributes: {
      Name,
      Performers,
      Venue,
      Address,
      Date,
      Time,
      Description,
      Image,
    },
  } = evt;

  const url = Image.data?.attributes.formats.thumbnail.url;

  const [values, setValues] = useState({
    Name,
    Performers,
    Venue,
    Address,
    Date,
    Time,
    Description,
  });

  const [iamgePreview, setImagePreview] = useState(url);
  const [showModal, setShowModal] = useState(false);

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
    const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
      method: "PUT",
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

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/api/events/${evt.id}?populate=Image`);

    const data = await res.json();
    const thumbnail =
      data.data.attributes.Image.data?.attributes.formats.thumbnail;

    setImagePreview(thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
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
              value={moment(values.Date).format("yyyy-MM-DD")}
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
        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {iamgePreview ? (
        <NextImage
          src={iamgePreview}
          height={100}
          width={170}
          alt={values.Name}
        />
      ) : (
        <div>
          <p>No Image Uploaded</p>
        </div>
      )}
      <div>
        <button
          className="btn-secondary btn-icon"
          onClick={() => setShowModal(true)}
        >
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=Image`);
  const evt = await res.json();

  // console.log(req.headers.cookie);
  const { token } = parseCookie(req);
  return {
    props: {
      evt: evt.data,
      token,
    },
  };
}
