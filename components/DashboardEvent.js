import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/DashboardEvent.module.css";

export default function DashboardEvent({
  evt: { id, Name, Slug },
  handleDelete,
}) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${Slug}`}>{Name}</Link>
      </h4>
      <Link href={`/events/edit/${id}`} className={styles.edit}>
        <FaPencilAlt /> <span>Edit Event</span>
      </Link>
      <a href="#" className={styles.delete} onClick={() => handleDelete(id)}>
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  );
}
