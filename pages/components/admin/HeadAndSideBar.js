import Header from "../Header";
import Sidebar from "../Sidebar";
import TheHead from "../Head";

export default function HeadAndSideBar({ title }) {
  return (
    <>
      <TheHead title={title} />
      <Header />
      <Sidebar />
    </>
  );
}
