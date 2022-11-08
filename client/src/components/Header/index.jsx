import Welcome from "./Welcome";
import Desc from "./Desc";
import MenuButtons from "./MenuButtons";

function Header({setCurrentPage}) {
  return (
    <>
      <Welcome />
      <Desc />
      <MenuButtons setCurrentPage={setCurrentPage} />
    </>
  );
}

export default Header;
