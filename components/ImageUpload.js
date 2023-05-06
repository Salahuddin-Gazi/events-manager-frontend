import { useState } from "react";
import { API_URL } from "@/config";
import styles from "@/styles/Form.module.css";

export default function ImageUpload({ evtId, imageUploaded, token }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const attributes = {
    //   ref: "events",
    //   refId: evtId,
    //   field: "Image",
    // };
    const formData = new FormData();
    formData.append("files", image);
    // formData.append("ref", "event");
    formData.append("ref", "api::event.event");
    formData.append("refId", evtId);
    formData.append("field", "Image");
    // formData.append("data", JSON.stringify(attributes));

    // console.log(formData.get("files"));
    // console.log(evtId);

    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    // console.log(res.ok);

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      //   console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
