import Header from "../Header";
import Sidebar from "../Sidebar";
import TheHead from "../Head";

export default function HeadAndSideBar({ title, user }) {
  return (
    <>
      <TheHead title={title} user={user} />
      <Header user={user} />
      <Sidebar />
    </>
  );
}
