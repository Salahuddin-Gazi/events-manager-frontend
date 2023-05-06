import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ evt }) {
  const image = evt.Image.data?.attributes.formats;
  const url = image ? image.thumbnail.url : null;
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={url ? url : "/images/event-default.png"}
          alt={evt.Name ? evt.Name : "/images/event-default.png"}
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(evt.Date).toLocaleDateString("en-US")} at {evt.Time}
        </span>
        <h3>{evt.Name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.Slug}`} className="btn">
          Details
        </Link>
      </div>
    </div>
  );
}
