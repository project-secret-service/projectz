import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import { useEffect, useState, useRef } from "react";
import { GetMemoDetails } from "@/functions/apiHandlers/workshop";
import AdminLayout from "@/components/admin/AdminLayout";

const Post = () => {
  const [memo, setMemos] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    GetMemoDetails(id).then((data) => {
      setMemos(data);
    });
  }, [router.isReady]);
  const componentRef = useRef();
  return (
    <>
      <AdminLayout title={`Memo Details`}>
        <main className={styles.main}>
          <main id="main" className="main col-10 mt-0 opac-90">
            Hello Bhai
          </main>
        </main>
      </AdminLayout>
    </>
  );
};
export default Post;
